MyApp.controller('overview', [
    '$scope', '$rootScope', 'overviewService', '$state', '$location',
    function ($scope, $rootScope, service, $state, $location) {
        $rootScope.sideBarKey = 'overview'

        // 自适应屏幕缩放
        var baseWidth = 1366;
        var baseHeight = 900;

        var body = document.querySelector('.page-content div#overview');
        var root = document.querySelector('#overview-wrap');
        var realtime = document.querySelector('.overview-content');

        function adaptiveScreen() {
            var per = body.clientWidth / baseWidth;
            root.style.width = body.clientWidth + 'px';
            root.style.height = baseHeight * per + 'px';
            root.style.overflow = 'hidden';
            realtime.style.transform = 'scale(' + per + ')';
            realtime.style.transformOrigin = 'left top';

        }

        var timeout = null;
        window.onresize = function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                adaptiveScreen();
            }, 400);
        };
        adaptiveScreen();

        function initTooltip() {
            setTimeout(function () {
                $('[data-toggle="tooltip"]').tooltip({
                    position: {my: "left center", at: "right center"},
                    open: function (event, ui) {
                        var content = ui.tooltip.find('.ui-tooltip-content');
                        content.html(content.html().replace(/-/g, '<br>'));
                    }
                });
                $('[data-toggle="tooltip1"]').tooltip({
                    position: {my: "center center", at: "center center"},
                    open: function (event, ui) {
                        var content = ui.tooltip.find('.ui-tooltip-content');
                        content.html(content.html().replace(/-/g, '<br>'));
                    }
                });
            });
        }

        var appId = $scope.appId = $state.params.app_id;

        // 各个列表连接生成
        var config = {
            business: '#/navigation/apply/business/details/dashboard/' + $state.params.app_id + '/',
            db: '#/navigation/apply/database/timeanalyFirst/' + appId + '?instance=',
        };
        $scope.href = function (type, params) {
            if (type == 'business') {
                params = encodeURIComponent(encodeURIComponent(params));
            }
            return config[type] + params;
        };

        // 计算列表中指标进度条占比
        var metrics = ['normal', 'slow', 'very_slow'];

        function progressRate(list) {
            angular.forEach(list, function (dt) {
                var total = 0;
                angular.forEach(metrics, function (m) {
                    total += dt[m];
                });
                dt.total = Math.ceil(total);
            });
        }

        // 顶部各个指标
        $scope.titleInfo = {
            resp_time: 0,
            rpm: 0,
            normal: 0,
            slow: 0,
            very_slow: 0,
            error: 0,
            exception: 0
        };
        service.getTitleInfo().then(function (data) {
            $scope.titleInfo = data;
        });


        //事务健康top5
        $scope.healthList = [];
        service.healthTop5().then(function (data) {
            progressRate(data);
            $scope.healthList = data;
            initTooltip();
        });

        //数据库实例top5
        $scope.dbList = [];
        service.dbTop5().then(function (data) {
            progressRate(data);
            $scope.dbList = data;
            initTooltip();
        });

        //异常top5
        $scope.exceptionList = {};
        service.exceptionTop5().then(function (data) {
            $scope.exceptionList = data;
        });

        //错误top5
        $scope.errorList = {};
        service.errorTop5().then(function (data) {
            $scope.errorList = data;
        });

        //慢SQLtop5
        $scope.sqlList = {};
        service.sqlTop5().then(function (data) {
            $scope.sqlList = data;
        });

        //外部服务top3
        $scope.serviceList = {};
        var serviceInfo = {};
        var servceAlias = {
            time: '平均响应时间',
            min: '最小值',
            max: '最大值',
            count: '调用次数',
            domain: '名称'
        };
        service.exteServiceTop3().then(function (data) {
            angular.forEach(data, function (dt) {
                var trendData = dt.trend.data;

                angular.forEach(dt.trend.labels, function (label, i) {
                    serviceInfo[label] = {};
                    serviceInfo[label].domain = dt.domain;

                    angular.forEach(trendData, function (v, k) {
                        serviceInfo[label][k] = v[i];
                    });
                });

                dt.trend.data = {time: trendData.time};

            });

            $scope.serviceList = data;
        });

        var opt = {color: ['#FF8235']};
        $scope.getLineOption = function (i) {
            opt.color = [i == 0 ? '#FF8235' : '#E7BF16'];
            opt.tooltip = {
                trigger: 'axis',
                formatter: function (params) {
                    var param = params[0];
                    var info = serviceInfo[param.axisValue];
                    var str = param.axisValue;
                    for (var k in info) {
                        str += '<br>' + servceAlias[k] + '：' + info[k] + (['time', 'min', 'max'].indexOf(k) > -1 ? 'ms' : '');
                    }
                    return str;
                }
            };

            return opt;
        }

        //主机状态分布
        $scope.hostConfig = {
            normal: 'green',
            warning: 'orange',
            fatal_warning: 'red'
        };
        $scope.hostList = {
            total: 0,
            list: []
        };
        $scope.hostInfo = {
            normal: 0,
            warning: 0,
            fatal_warning: 0
        };
        service.hostStatus().then(function (data) {
            $scope.hostList = data;

            initTooltip();

            angular.forEach(data.list, function (l) {
                if (l.status == 'warning') {
                    $scope.hostInfo.warning++;
                } else if (l.status == 'fatal_warning') {
                    $scope.hostInfo.fatal_warning++;
                } else if (l.status == 'normal') {
                    $scope.hostInfo.normal++;
                }
            });
        });

        //慢数据库
        var dbConfig = {
            normal: 'bg-normal',
            slow: 'bg-slow',
            very_slow: 'bg-very-slow',
        };

        $scope.slowDbStatus = 'nodata';

        $scope.slowDbList = [];
        $scope.dbInfo = {
            normal: 0,
            slow: 0,
            very_slow: 0
        };

        service.slowDb().then(function (data) {
            $scope.slowDbList = data;

            if (data && data.length > 0) {
                $scope.slowDbStatus = '';
            } else {
                $scope.slowDbStatus = 'nodata';
            }

            angular.forEach(data, function (l) {
                if (l.status == 'normal') {
                    $scope.dbInfo.normal++;
                } else if (l.status == 'slow') {
                    $scope.dbInfo.slow++;
                } else if (l.status == 'very_slow') {
                    $scope.dbInfo.very_slow++;
                }
            });
        });
        $scope.packEnd = function (nodes) {
            nodes.each(function (d) {
                $(this).on('click', function () {
                    window.location.href = '#/navigation/apply/database/timeanalyFirst/' + appId + '?table_name=' + d.table_name;
                });
                $(this).addClass(dbConfig[d.status]);
            });
        };

    }]);
/**
 *
 */
MyApp.service('overviewService', function (httpService) {
    var titleQuotaApi = env_config.API.AppOverview.GET_TITLE_QUOTA;
    var healthTop5Api = env_config.API.AppOverview.GET_HEALTH_AFFAIRS_TOP5;
    var dbTop5Api = env_config.API.AppOverview.GET_DB_INSTANCE_TOP5;
    var exceptionTop5Api = env_config.API.AppOverview.GET_EXCEPTION_TOP5;
    var errorTop5Api = env_config.API.AppOverview.GET_ERROR_TYPE_TOP5;
    var sqlTop5Api = env_config.API.AppOverview.GET_SLOW_SQL_TOP5;
    var exteServiceTop3Api = env_config.API.AppOverview.GET_EXTERNAL_SERVICE_TOP3;
    var hostStatusApi = env_config.API.AppOverview.GET_HOST_STATUS_CHART;
    var slowDbApi = env_config.API.AppOverview.GET_SLOW_DB_TABLE_CHART;

    // 顶部各个指标
    this.getTitleInfo = function () {
        return httpService.get(titleQuotaApi).then(function (result) {
            return result.code == 1000 ? result.data : {};
        });
    }

    //事务健康top5
    this.healthTop5 = function () {
        return httpService.get(healthTop5Api).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    }

    //数据库实例top5
    this.dbTop5 = function () {
        return httpService.get(dbTop5Api).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    }

    //异常top5
    this.exceptionTop5 = function () {
        return httpService.get(exceptionTop5Api).then(function (result) {
            return result.code == 1000 ? result : {};
        });
    }

    //异常top5
    this.errorTop5 = function () {
        return httpService.get(errorTop5Api).then(function (result) {
            return result.code == 1000 ? result : {};
        });
    }

    //慢SQL top5
    this.sqlTop5 = function () {
        return httpService.get(sqlTop5Api).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    }

    //外部服务top3
    this.exteServiceTop3 = function () {
        return httpService.get(exteServiceTop3Api).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    }

    //主机状态分布
    this.hostStatus = function () {
        return httpService.get(hostStatusApi).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    }
    //慢数据库表
    this.slowDb = function () {
        return httpService.get(slowDbApi).then(function (result) {
            return result.code == 1000 ? result.data : [];
        });
    }

});

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

