MyApp.controller('NoSQL', [
    '$scope', '$rootScope', 'noSQLService', '$compile',
    function ($scope, $rootScope, service, $compile) {
        $rootScope.sideBarKey = 'NoSQL';

        $scope.title = ['概览'];
        $scope.isOverview = true; // 是否概览
        $scope.isFirst = false; // 是否进入第一层
        $scope.isSecond = false; // 是否进入第二层

        // 进入第一层
        $scope.enterFirst = function (i) {
            $scope.isOverview = false;
            $scope.isFirst = true;
            $scope.isSecond = false;
            var current = $scope.instanceList[i];
            $scope.title = [current.name];
            change(current);
        }
        // 进入第二层
        $scope.enterSecond = function (method, instance) {
            $scope.isOverview = false;
            $scope.isFirst = false;
            $scope.isSecond = true;
            $scope.title = [instance.name, method.name];
            change(instance, method);
        }
        // 返回概览页
        $scope.backOverview = function (isGetDbInstanceList) {
            $scope.isOverview = true;
            $scope.isFirst = false;
            $scope.isSecond = false;
            $scope.title = ['概览'];
            change(isGetDbInstanceList);
        }

        //数据库类型列表
        $scope.dbModuleList = []; // 一级列表
        $scope.currentDbModule = [{}, {}]; //当前
        $scope.dbModuleSecList = []; // 二级列表

        // 二级列表选中
        var checkSecDbModule = $scope.checkSecDbModule = function (index, isFirst) {
            var current = $scope.currentDbModule[1] = $scope.dbModuleSecList[index];
            service.setFlag(current.value);
            if (!isFirst) {
                change();
            }
        };
        // 一级列表选中
        var checkDbModule = $scope.checkDbModule = function (index) {
            var current = $scope.currentDbModule[0] = $scope.dbModuleList[index];
            service.setType(current.value);
            // 重置flag
            service.setFlag();
            // 二级列表操作
            $scope.dbModuleSecList = [];
            if (current.list && current.list.length > 0) {
                $scope.dbModuleSecList = current.list;
                checkSecDbModule(0, true);
            }

            $scope.backOverview(true);
        };

        // 重置
        service.setType();
        service.setFlag();

        // 加载数据库类型列表
        service.getDbModuleList().then(function (data) {
            $scope.dbModuleList = data;
            if (data.length > 0) {
                checkDbModule(0);
            }
        });

        // 数据库模块和实例列表
        $scope.instanceList = [];
        function change(instance, method) {

            if ($scope.isOverview) {
                // 点击返回概览按钮不重新加载数据实例列表
                if (instance) {
                    // 数据库模块和实例列表
                    service.getDbInstanceList().then(function (data) {
                        $scope.instanceList = data;
                    });
                }
                // 响应时间变化曲线(TOP5)
                service.respTrendTop5();
                // 吞吐率(TOP5)
                service.rpmTrendTop5();
                // 实例列表
                $('#js_instance_list').html($compile('<nosql-instance-list ' +
                    'type="' + $scope.currentDbModule[0].value + '"  ' +
                    'flag="' + ($scope.currentDbModule[1].value || 0) + '"></nosql-instance-list>')($scope));
            }

            if ($scope.isFirst) {
                // 响应时间变化曲线(TOP5)
                service.respTrendTop5(instance.value);
                // 吞吐率(TOP5)
                service.rpmTrendTop5(instance.value);
                //调用耗时百分比
                service.callerRate(instance.value);
                //方法列表
                $('#js_caller_list').html($compile('<nosql-pst-list ' +
                    'instance="' + instance.value + '"' +
                    '"type="' + $scope.currentDbModule[0].value + '"  ' +
                    'flag="' + ($scope.currentDbModule[1].value || 0) + '"></nosql-pst-list>')($scope));
            }

            if ($scope.isSecond) {
                //调用耗时百分比TOP5
                service.methodRpmResp(instance.value, method.value);
                //调用耗时百分比
                service.callerRate(instance.value, method.value);
                //事务列表 nosqlBusinessList
                $('#js_business_list').html($compile('<nosql-business-list ' +
                    'instance="' + instance.value + '"' +
                    'method="' + method.value + '"' +
                    'type="' + $scope.currentDbModule[0].value + '"  ' +
                    'flag="' + ($scope.currentDbModule[1].value || 0) + '"></nosql-business-list>')($scope));
            }
        }

    }]);

MyApp.service('noSQLService', ['httpService', function (httpService) {
    var moduleListApi = env_config.API.AppNoSql.GET_MOUDLE_LIST;
    var dbInstanceListApi = env_config.API.AppNoSql.GET_INSTANCE_AND_PST_LIST;
    var respTrendApi = env_config.API.AppNoSql.GET_RESP_TREND_CHART;
    var rpmTrendApi = env_config.API.AppNoSql.GET_RPM_TREND_CHART;
    var callerRateApi = env_config.API.AppNoSql.GET_CALLER_RATE;
    var methodRpmRespApi = env_config.API.AppNoSql.GET_METHOD_RPM_AND_RESP_TIME;

    var config = {
        resp_time: '耗时',
        rpm: '吞吐率'
    };

    var self = this;
    this.type, this.flag;

    this.setType = function (type) {
        this.type = type;
    };
    this.setFlag = function (flag) {
        this.flag = flag;
    };

    var http = {
        get: function (url, params) {
            return httpService.get(url, $.extend({
                service_type: self.type,
                memcache_flag: self.flag
            }, params || {}));
        }
    };

    // 数据库类型列表
    this.getDbModuleList = function () {
        return http.get(moduleListApi).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    };

    // 数据库模块和实例列表
    this.getDbInstanceList = function () {
        return http.get(dbInstanceListApi).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    };

    function drawArea(elem, data, opt, toolTipTip) {
        var yAxisStyle = {
            splitLine: {
                lineStyle: {
                    color: '#434343'
                }
            },
            axisLine: {show: false},
            nameTextStyle: {
                color: '#8D8C8E'
            },
            axisLabel: {
                textStyle: {
                    color: '#8D8C8E'
                }
            }
        };
        var baseColor = ['#E4694D', '#923CAC', '#1861AE', '#B2921D', '#1DAFAE'];

        $(elem).echarts(function () {
            var _opt = {
                type: 'area',
                data: data,
                setOption: function (option, result) {

                    $.each(option.legend.data, function (i, dt) {
                        option.legend.data[i] = {
                            name: dt,
                            icon: 'path://M3.15396673,4.14459392 L0.107727051,6.25901741 L0.107727051,12 L12.0897827,12 L12.0897827,4.13271436 L9.18023682,2 L9.17045681,2.01036533 L9.13110352,1.9765625 L8.30883249,2.92355666 L5.29827881,6.11428775 L3.17108154,4.13271436 L3.16190279,4.13908542 L3.16137695,4.13842773 L3.15396673,4.14459392 Z'
                        }
                    });

                    $.each(option.series, function (i, serie) {
                        serie.symbol = 'none';
                        serie.lineStyle = {
                            normal: {width: 1}
                        };

                        serie.areaStyle = {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: baseColor[i] // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'transparent' // 100% 处的颜色
                                    }]
                                }
                            }
                        };
                    });

                    $.extend(true, option, {
                        color: baseColor,
                        legend: {
                            y: 'bottom',
                            itemWidth: 10,
                            itemHeight: 10,
                            textStyle: {
                                color: '#969696'
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                var str = params[0].axisValue + '<br>';
                                $.each(params, function (i, p) {
                                    str += '<div style="font-size:12px;overflow: auto;">' +
                                        '<div style="float:left;">' +
                                        '<span style="display:inline-block;margin-right:5px;width:9px;height:9px;background-color:' + p.color + ';"></span>' +
                                        p.seriesName +
                                        '</div>' +
                                        '<div style="float:right;margin-left: 20px;">' + p.value + toolTipTip + '</div>' +
                                        '</div>';
                                });
                                return str;
                            }
                        },
                        xAxis: [{
                            axisLabel: {
                                textStyle: {
                                    color: '#8D8C8E'
                                }
                            },
                            boundaryGap: false
                        }],
                        yAxis: yAxisStyle
                    }, opt || {});
                    return option;
                }
            };

            return _opt;
        });
    }

    // 响应时间变化曲线(TOP5)
    this.respTrendTop5 = function (instance) {

        return http.get(respTrendApi, {
            instance: instance
        }).then(function (result) {
            drawArea($('#databaseTrend'), result.data, {
                yAxis: {
                    name: '响应时间',
                    axisLabel: {
                        formatter: '{value}ms'
                    }
                }
            }, 'ms');
        });
    };

    // 吞吐率(TOP5)
    this.rpmTrendTop5 = function (instance) {
        return http.get(rpmTrendApi, {
            instance: instance
        }).then(function (result) {
            drawArea($('#rpmTrend'), result.data, {
                yAxis: {
                    name: '吞吐率',
                    axisLabel: {
                        formatter: '{value}rpm'
                    }
                }
            }, 'rpm');
        });
    }

    //调用耗时百分比TOP5
    this.callerRate = function (instance, method) {
        return http.get(callerRateApi, {
            instance: instance,
            method: method
        }).then(function (result) {
            var data = result.data;

            var count = 0;
            angular.forEach(data, function (v, k) {
                count += (+v);
            });
            var _data = {};
            angular.forEach(data, function (v, k) {
                _data[k] = [(v / count * 100).toFixed(2)];
            });

            var diffHeight = Math.ceil(Object.keys(_data).length / 3) * 20;
            var baseHeight = 230;
            $('#js_caller_rate').find('[data-chart]').css({
                height: baseHeight + diffHeight
            });

            $('#js_caller_rate').echarts({
                type: "bar",
                category: "y",
                tooltip: ['%'],
                data: {labels: ['耗时占比'], data: _data},
                setOption: function (option) {

                    $.each(option.series, function (i, serie) {
                        serie.stack = 'group';
                        serie.barWidth = 76;
                    });
                    $.extend(true, option, {
                        color: ['#FF8235', '#E7BF16', '#0FEAD9', '#0B78E3', '#6859EA'],
                        grid: {
                            top: 10,
                            bottom: 90 + diffHeight
                        },
                        legend: {
                            top: 180,
                            itemWidth: 10,
                            itemHeight: 10,
                            textStyle: {
                                color: '#969696'
                            },
                            formatter: function (params) {
                                if (params.length > 41) {
                                    params = params.substr(0, 19) + '...' + params.substr(-19)
                                }
                                return params;
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {color: '#4FABFC'}
                            },
                            formatter: function (params) {
                                var str = params[0].axisValue + '<br>';
                                $.each(params, function (i, p) {
                                    str += '<div style="font-size:12px;overflow: auto;">' +
                                        '<div style="float:left;">' +
                                        '<span style="display:inline-block;margin-right:5px;width:9px;height:9px;background-color:' + p.color + ';"></span>' +
                                        p.seriesName +
                                        '</div>' +
                                        '<div style="float:right;margin-left: 20px;">' + p.value + '%' + '</div>' +
                                        '</div>';
                                });
                                return str;
                            }
                        },
                        xAxis: [{
                            axisLabel: {
                                textStyle: {
                                    color: '#8D8C8E'
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8D8C8E'
                                }
                            }
                        }],
                        yAxis: [{
                            axisLabel: {
                                textStyle: {
                                    color: '#8D8C8E'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8D8C8E'
                                }
                            }
                        }]

                    });

                    return option;
                }
            });
        });
    }

    // 吞吐量及响应时间趋势(TOP5)
    this.methodRpmResp = function (instance, method) {
        return http.get(methodRpmRespApi, {
            instance: instance,
            method: method
        }).then(function (result) {

            var baseColor = ['#0FC9EA', '#FF8235'];
            $('#js_rpm_resp').echarts(function () {
                var opt = {
                    type: ['bar', 'area'],
                    tooltip: ['ms', 'rpm'],
                    data: result.data,
                    setOption: function (option, result) {

                        $.each(option.series, function (i, serie) {
                            if (serie.name == 'resp_time') {
                                serie.type = 'line';
                                serie.zlevel = 0;
                                serie.symbol = 'none';
                                serie.yAxisIndex = 0;
                                serie.lineStyle = {
                                    normal: {
                                        width: 1.5,
                                    }
                                };
                                serie.areaStyle = {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: baseColor[i] // 0% 处的颜色
                                            }, {
                                                offset: 1, color: 'transparent' // 100% 处的颜色
                                            }]
                                        }
                                    }
                                }
                            } else {
                                serie.type = 'bar';
                                serie.barMaxWidth = 16;
                                serie.yAxisIndex = 1;
                                serie.zlevel = 1;
                            }
                        });
                        var yAxisStyle = {
                            splitLine: {
                                lineStyle: {
                                    color: '#434343'
                                }
                            },
                            nameTextStyle: {
                                color: '#8D8C8E'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#8D8C8E'
                                }
                            }
                        };

                        $.extend(true, option, {
                            color: baseColor,
                            grid: {
                                top: 40
                            },
                            legend: {
                                textStyle: {
                                    color: '#8D8C8E'
                                },
                                itemWidth: 12,
                                itemHeight: 12,
                                y: 'bottom',
                                formatter: function (param) {
                                    return config[param];
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params) {
                                    var str = params[0].axisValue + '<br>';
                                    $.each(params, function (i, p) {
                                        str += '<div style="font-size:12px;overflow: auto;">' +
                                            '<div style="float:left;">' +
                                            '<span style="display:inline-block;margin-right:5px;width:9px;height:9px;background-color:' + p.color + ';"></span>' +
                                            config[p.seriesName] +
                                            '</div>' +
                                            '<div style="float:right;margin-left: 20px;">' + p.value +
                                            (p.seriesName == 'resp_time' ? 'ms' : 'rpm') + '</div>' +
                                            '</div>';
                                    });
                                    return str;
                                }
                            },
                            xAxis: [{
                                axisLabel: {
                                    textStyle: {
                                        color: '#8D8C8E'
                                    }
                                }
                            }],
                            yAxis: [
                                $.extend({}, yAxisStyle, {
                                    name: '时间'
                                }),
                                $.extend({}, yAxisStyle, {
                                    name: '吞吐率'
                                })]
                        });

                        return option
                    }
                };

                return opt;
            });
        });
    }
}]);

/**
 * 方法列表
 */
MyApp.directive('nosqlPstList', ['nosqlPstListService', function (service) {
    return {
        restrict: 'AE',
        scope: {
            instance: '@instance',
            flag: '@flag',
            type: '@type',
        },
        templateUrl: './public/components/apply/NoSQL/noSqlPstList.html',
        controller: function ($scope) {
            $scope.total_row = 0;//总页数
            $scope.sum_per_page = 5; //每页显示多少行
            $scope.page_no = 1; // 当前页数

        },
        link: function (scope, elem, attrs) {

            function refresh() {
                service.drawTable(elem, {
                    currentPage: scope.page_no,
                    perPage: scope.sum_per_page,
                    instance: scope.instance,
                    type: scope.type,
                    flag: scope.flag,
                    success: function (data) {
                        scope.total_row = data.total_items;
                        scope.$apply();
                    }
                });
            }

            scope.changePage = function (currentPage, perPage) {
                scope.page_no = currentPage;
                scope.sum_per_page = perPage;
                refresh();
            };
        }
    };
}])
    .service('nosqlPstListService', ['dateTimeService', function (dateTime) {
        var pstListApi = env_config.API.AppNoSql.GET_PST_LIST;

        var appId = env_config.APP_ID;
        var time = dateTime.getTime();

        this.drawTable = function (elem, opt) {
            $(elem).table(function () {

                var data = {
                    app_id: appId,
                    start_time: time.start,
                    end_time: time.end,
                    page: opt.currentPage || 1,
                    page_size: opt.perPage,
                    instance: opt.instance,
                    service_type: opt.type,
                    memcache_flag: opt.flag,
                };

                return {
                    data: function (sort, order) {
                        data.sort = sort;
                        data.order = order;

                        return {
                            url: pstListApi,
                            data: data,
                            method: 'get',
                            success: function (result) {
                                if (typeof opt.success == 'function') {
                                    opt.success(result.data);
                                }

                                return result.data.list;
                            }
                        }
                    },
                    loop: function (item, dt) {
                    }
                }
            });
        }
    }]);


/**
 * 实例列表
 */
MyApp.directive('nosqlInstanceList', ['noSqlInstanceListService', function (service) {
    return {
        restrict: 'AE',
        scope: {
            type: '@type',
            flag: '@flag',
        },
        templateUrl: './public/components/apply/NoSQL/noSqlInstanceList.html',
        controller: function ($scope) {
            $scope.total_row = 0;//总页数
            $scope.sum_per_page = 5; //每页显示多少行
            $scope.page_no = 1; // 当前页数

        },
        link: function (scope, elem, attrs) {
            scope.changePage = function (currentPage, perPage) {
                service.drawTable(elem, {
                    currentPage: currentPage,
                    perPage: perPage,
                    type: scope.type,
                    flag: scope.flag,
                    success: function (data) {
                        scope.total_row = data.total_items;
                        scope.$apply();
                    }
                });
            };

        }
    };
}])
    .service('noSqlInstanceListService', ['dateTimeService', function (dateTime) {
        var instanceListApi = env_config.API.AppNoSql.GET_INSTANCE_LIST;

        var appId = env_config.APP_ID;
        var time = dateTime.getTime();

        this.drawTable = function (elem, opt) {
            $(elem).table(function () {

                var data = {
                    app_id: appId,
                    start_time: time.start,
                    end_time: time.end,
                    page: opt.currentPage || 1,
                    page_size: opt.perPage,
                    service_type: opt.type,
                    memcache_flag: opt.flag,
                };

                return {
                    data: function (sort, order) {
                        data.sort = sort;
                        data.order = order;

                        return {
                            url: instanceListApi,
                            data: data,
                            method: 'get',
                            success: function (result) {
                                if (typeof opt.success == 'function') {
                                    opt.success(result.data);
                                }

                                return result.data.list;
                            }
                        }
                    },
                    loop: function (item, dt) {
                        if (item.key == 'method_count') {
                            return '<td class="text-right">' + item.value + '</td>'
                        }
                    }
                }
            });
        }
    }]);


/**
 * 事务列表
 */
MyApp.directive('nosqlBusinessList', ['nosqlBusinessListService', function (service) {
    return {
        restrict: 'AE',
        scope: {
            instance: '@instance',
            flag: '@flag',
            type: '@type',
            method: '@method'
        },
        templateUrl: './public/components/apply/NoSQL/nosqlBusinessList.html',
        controller: function ($scope) {
            $scope.total_row = 0;//总页数
            $scope.sum_per_page = 5; //每页显示多少行
            $scope.page_no = 1; // 当前页数

        },
        link: function (scope, elem, attrs) {
            scope.changePage = function (currentPage, perPage) {
                service.drawTable(elem, {
                    currentPage: currentPage,
                    perPage: perPage,
                    instance: scope.instance,
                    type: scope.type,
                    flag: scope.flag,
                    method: scope.method,
                    success: function (data) {
                        scope.total_row = data.total_items;
                        scope.$apply();
                    }
                });
            };

        }
    };
}])
    .service('nosqlBusinessListService', ['dateTimeService', function (dateTime) {
        var urlListApi = env_config.API.AppNoSql.GET_URL_LIST;

        var appId = env_config.APP_ID;
        var time = dateTime.getTime();

        this.drawTable = function (elem, opt) {
            $(elem).table(function () {

                var data = {
                    app_id: appId,
                    start_time: time.start,
                    end_time: time.end,
                    page: opt.currentPage || 1,
                    page_size: opt.perPage,
                    instance: opt.instance,
                    service_type: opt.type,
                    memcache_flag: opt.flag,
                    method: opt.method
                };

                return {
                    data: function (sort, order) {
                        data.sort = sort;
                        data.order = order;

                        return {
                            url: urlListApi,
                            data: data,
                            method: 'get',
                            success: function (result) {
                                if (typeof opt.success == 'function') {
                                    opt.success(result.data);
                                }

                                return result.data.list;
                            }
                        }
                    },
                    loop: function (item, dt) {
                    }
                }
            });
        }
    }]);


/**
 * 过滤器
 */
MyApp.filter('numberFormat', function () {
    return function (number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        } else {
            var num = number.toString();
            return num.split('.').length > 1 ? number.toFixed(1) : number;
        }
    }
});
