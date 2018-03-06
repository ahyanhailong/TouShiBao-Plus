MyApp.controller('messageQueue', [
    '$scope', '$rootScope', 'messageQueueService', '$state',
    function ($scope, $rootScope, service, $state) {
        $rootScope.sideBarKey = 'messageQueue';
        $scope.appId = $state.params.app_id;

        // 排序字段
        var sortUnit = {
            resp_time: 'ms',
            msg_total: '',
            msg_pm: 'rpm',
            flow_total: 'Kb',
            flow_pm: 'Byte'
        };
        var sortList = $scope.sortList = [
            {
                "name": "平均耗时",
                "value": "resp_time"
            },
            {
                "name": "消息总数",
                "value": "msg_total"
            },
            {
                "name": "每分钟消息数",
                "value": "msg_pm"
            },
            {
                "name": "总流量",
                "value": "flow_total"
            },
            {
                "name": "每分钟流量",
                "value": "flow_pm"
            }
        ];
        $scope.currentSort = sortList[0];
        $scope.changeSort = function (current) {
            $scope.currentSort = current;
            drawLeft();
        };

        // 左侧列表渲染
        $scope.dbnList = [];
        function drawLeft() {
            service.dbnListApi($scope.currentSort.value).then(function (data) {
                $scope.dbnList = data;
            });
        }

        // 列表项右侧数值显示
        $scope.showFieldUnit = function (item) {
            var field = $scope.currentSort.value;
            return item[field] + sortUnit[field];
        };

        /**
         * 在生产者和消费者之间切换
         */
        $scope.$on('startMessageQueue', function (event, type) {
            service.setType(type);
            $scope.backOverview();
            drawLeft();
        });


        $scope.title = ['概览'];
        $scope.isOverview = true; // 是否概览
        $scope.isFirst = false; // 是否进入第一层
        $scope.isSecond = false; // 是否进入第二层

        // 进入第一层
        $scope.enterFirst = function (instance) {
            $scope.isOverview = false;
            $scope.isFirst = true;
            $scope.isSecond = false;
            $scope.title = [instance.instance];
            change(instance);
        };
        // 进入第二层
        $scope.enterSecond = function (instance, dbn) {
            $scope.isOverview = false;
            $scope.isFirst = false;
            $scope.isSecond = true;
            $scope.title = [instance.instance, dbn.dbn];
            change(instance, dbn);
        };
        // 返回概览页
        $scope.backOverview = function () {
            $scope.isOverview = true;
            $scope.isFirst = false;
            $scope.isSecond = false;
            $scope.title = ['概览'];
            change();
        };


        //MQ服务总耗时(TOP5)
        $scope.mqTotalTimeOption = {
            tooltip: ['ms'],
            changeOption: function (option) {
                option.xAxis[0].boundaryGap = false;
                option.yAxis[0].name = '时间';
                return option;
            }
        };
        //每分钟消息数及平均耗时
        $scope.rpmTimeOption = {
            tooltip: ['ms', '个'],
            type: ['area', 'bar'],
            color: ['#0B78E3', '#F86F33'],
            changeOption: function (option) {
                option.yAxis[0].name = '时间';
                option.yAxis[1].name = '个数';

                return option;
            }
        };
        //每分钟流量
        $scope.flowPmOption = {
            tooltip: ['Byte'],
            color: ['#6859EA'],
            changeOption: function (option) {
                option.xAxis[0].boundaryGap = false;
                return option;
            }
        };

        function change(instance, dbn) {
            instance = instance || {};
            dbn = dbn || {};

            if ($scope.isOverview) {
                // MQ服务总耗时(TOP5)
                service.mqTotalTime().then(function (data) {
                    $scope.mqTotalTime = data;
                });
                // 每分钟消息数及平均耗时
                service.rpmTime().then(function (data) {
                    $scope.rpmTime = data;
                });
                // 每分钟流量
                service.flowPm().then(function (data) {
                    $scope.flowPm = data;
                });
            }

            if ($scope.isFirst || $scope.isSecond) {
                // 每分钟消息数及平均耗时
                service.rpmTime(instance.instance, dbn.dbn).then(function (data) {
                    $scope.rpmTime = data;
                });
                // 每分钟流量
                service.flowPm(instance.instance, dbn.dbn).then(function (data) {
                    $scope.flowPm = data;
                });
                // 调用者占比
                service.callerRate(instance.instance, dbn.dbn).then(function (data) {
                    $scope.callerRate = data;
                });
                // 消费列表（生产者和消费者列表不同）
                $scope.$broadcast('refreshList', instance.instance, dbn.dbn);
            }

        }


    }]);

MyApp.service('messageQueueService', ['httpService', function (httpService) {

    var dbnListApi = env_config.API.AppMessageQueue.GET_INSTANCE_AND_DBN_LIST;
    var mqTotalTimeApi = env_config.API.AppMessageQueue.GET_SERVICE_TOTAL_TIME_TREND;
    var rpmTimeApi = env_config.API.AppMessageQueue.GET_RPM_AND_TIME_TREND;
    var flowPmApi = env_config.API.AppMessageQueue.GET_FLOW_PM_TREND;
    var callerRateApi = env_config.API.AppMessageQueue.GET_CALLER_RATE;

    var config = {
        msg_pm: '吞吐率',
        avg_time: '平均耗时',
        flow_pm: '流量'
    };

    //生产者
    var _type = 'producer';
    this.setType = function (type) {
        _type = type;
    };

    var http = {
        get: function (url, params) {
            return httpService.get(url, $.extend({
                type: _type
            }, params || {}));
        }
    };

    //生产者及其channel列表
    this.dbnListApi = function (order) {
        return http.get(dbnListApi, {
            order: order
        }).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    };

    //MQ服务总耗时(TOP5)
    this.mqTotalTime = function () {
        return http.get(mqTotalTimeApi).then(function (result) {
            return result.data;
        });
    }

    // 吞吐率及平均耗时
    this.rpmTime = function (instance, dbn) {
        return http.get(rpmTimeApi, {instance: instance, dbn: dbn}).then(function (result) {
            var data = {};
            $.each(result.data.data, function (k, v) {
                data[config[k]] = v;
            });
            result.data.data = data;
            return result.data;
        });
    }

    // 每分钟流量
    this.flowPm = function (instance, dbn) {
        return http.get(flowPmApi, {instance: instance, dbn: dbn}).then(function (result) {
            var data = {};
            $.each(result.data.data, function (k, v) {
                data[config[k]] = v;
            });
            result.data.data = data;

            return result.data;
        });
    }

    // 调用者占比
    this.callerRate = function (instance, dbn) {
        return http.get(callerRateApi, {instance: instance, dbn: dbn}).then(function (result) {
            return result.data;
        });
    }

}]);

MyApp.directive('messageQueueBarArea', [function () {
    return {
        restrict: 'AE',
        scope: {
            data: '=data',
            option: '=option'
        },
        controller: function ($scope) {
        },
        link: function (scope, elem, attrs) {

            scope.$watch('data', function (data) {
                if (data) {
                    var _opt = scope.option || {tooltip: []};

                    var baseColor = _opt.color || ['#0FC9EA', '#FF8235', '#0F6FCD', '#6859EA'];

                    elem.echarts(function () {
                        var opt = {
                            type: 'area',
                            tooltip: [],
                            data: scope.data,
                            setOption: function (option, result) {

                                var units = {}; // 根据tooltip记录单位

                                $.each(option.series, function (i, serie) {
                                    if (serie.type == 'line') {
                                        serie.symbol = 'none';
                                        serie.lineStyle = {
                                            normal: {
                                                width: 1.5
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
                                        };
                                        serie.zlevel = 0
                                    } else {
                                        serie.zlevel = 1;
                                    }
                                    if (serie.type == 'bar') {
                                        serie.barMaxWidth = 16;
                                    }


                                    units[serie.name] = _opt.tooltip[i];
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

                                $.each(option.yAxis, function (i, yAxis) {
                                    $.extend(true, yAxis, yAxisStyle);
                                });

                                $.extend(true, option, {
                                    color: baseColor,
                                    legend: {
                                        textStyle: {
                                            color: '#8D8C8E'
                                        },
                                        itemWidth: 12,
                                        itemHeight: 12,
                                        y: 'bottom'
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
                                                    '<div style="float:right;margin-left: 20px;">' + p.value +
                                                    (units[p.seriesName]) + '</div>' +
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
                                    }]
                                });

                                if (typeof _opt.changeOption == 'function') {
                                    option = _opt.changeOption(option);
                                }

                                return option
                            }
                        };

                        return $.extend(opt, _opt || {});
                    });
                }
            });
        }
    }
}]);

MyApp.directive('messageQueueStackBar', [function () {
    return {
        restrict: 'AE',
        scope: {
            data: '=data'
        },
        controller: function ($scope) {
        },
        link: function (scope, elem, attrs) {

            scope.$watch('data', function (data) {
                if (data) {
                    var count = 0;
                    angular.forEach(data, function (v, k) {
                        count += (+v);
                    });
                    var _data = {};
                    angular.forEach(data, function (v, k) {
                        _data[k] = [(v / count * 100).toFixed(2)];
                    });

                    var diffHeight = Math.ceil(Object.keys(_data).length / 3) * 20;

                    elem.echarts({
                        type: "bar",
                        category: "y",
                        tooltip: ['%'],
                        data: {labels: ['调用者'], data: _data},
                        setOption: function (option) {

                            $.each(option.series, function (i, serie) {
                                serie.stack = 'group';
                                serie.barWidth = 76;
                            });
                            $.extend(true, option, {
                                color: ['#FF8235', '#E7BF16', '#0FEAD9', '#0B78E3', '#6859EA'],
                                grid: {
                                    top: 10,
                                    bottom: 40 + diffHeight
                                },
                                legend: {
                                    bottom: 0,
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
                }
            });
        }
    }
}]);