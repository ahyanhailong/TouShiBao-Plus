MyApp.controller('dashboard', ['$scope', '$state', 'dashboardService', function ($scope, $state, dashboardService) {

    $scope.appId = $state.params.app_id;

    // 顶部时间操作
    $scope.headTime = {"db_time": 0, "api_time": 0, "code_time": 0, "request_time": 0};
    dashboardService.getHeadData().then(function (data) {
        $scope.headTime = data;
    });
    // 进度条处理
    $scope.headProgress = function (field) {
        return $scope.headTime.request_time ? ($scope.headTime[field] / $scope.headTime.request_time) + '%' : '0%';
    };

    // 顶部列表操作
    $scope.currentType = 'code';
    $scope.headlist = [];
    $scope.changeType = function (type) {
        $scope.currentType = type;
        $scope.isShowRequestInfo = false;
        dashboardService.getHeadList(type).then(function (data) {
            $scope.headlist = data;
        });
    };
    $scope.changeType($scope.currentType);

    // 请求详情操作
    $scope.isShowRequestInfo = false;
    $scope.currentInfo = {};
    $scope.showRequestInfo = function (index) {
        var current = $scope.headlist[index];
        if (current.active) {
            $scope.isShowRequestInfo = false;
        } else {
            $scope.isShowRequestInfo = true;
            $.each($scope.headlist, function (i, l) {
                if (i !== index) {
                    l.active = false;
                }
            });

            $scope.currentInfo = current;
        }
        current.active = !current.active;
    };


    // 请求数和响应时间
    $scope.respTimeMark = 'all';
    dashboardService.drawReqOfRes();

    $scope.drawRespTimeChart = function (type) {
        $scope.respTimeMark = type || 'all';
        dashboardService.drawReqOfRes(type);
    };

    //请求统计
    $scope.statistics = {
        count: 0,
        normal: {value: 0, per: 0},
        slow: {value: 0, per: 0},
        very_slow: {value: 0, per: 0},
        error_count: {value: 0, per: 0}
    };
    dashboardService.getRequestStatisticsApi().then(function (data) {
        $scope.statistics = data;
    });

    //错误信息
    $scope.errorList = [];
    dashboardService.getErrorInfo().then(function (data) {
        $scope.errorList = data.list;
    });

    //异常元素top5
    $scope.exceptionList = [];
    dashboardService.getExceptionTop5().then(function (data) {
        $scope.exceptionList = data;
    });


}]);

MyApp.service('dashboardService',
    function (dateTimeService, $state, httpService, businessService) {

        var uri = decodeURIComponent($state.params.uri);

        var headApi = env_config.API.BusinessAnalysis.GET_DASHBOARD_STATISTICAL_INDICATORS;
        var headListApi = env_config.API.BusinessAnalysis.GET_DASHBOARD_TOP_METHODS;
        var requestofRespApi = env_config.API.BusinessAnalysis.GET_DASHBOARD_RESP_AND_RPM_TREND_CHART;
        var requestStatisticsApi = env_config.API.BusinessAnalysis.GET_DASHBOARD_REQEUST_STATISTICS;
        var errorInfoApi = env_config.API.BusinessAnalysis.GET_DASHBOARD_ERROR_INFO_LIST;
        var exceptionTop5Api = env_config.API.BusinessAnalysis.GET_DASHBOARD_EXCEPTION_TOP5_LIST;

        // 获取顶部数据
        this.getHeadData = function () {
            return httpService.get(headApi, {
                uri: uri
            }).then(function (response) {
                return response.data;
            });
        };

        // 获取顶部列表数据
        this.getHeadList = function (currentType) {
            return httpService.get(headListApi, {
                uri: uri,
                top_type: currentType
            }).then(function (result) {
                return result.data;
            });
        };

        // 响应时间和请求数
        this.drawReqOfRes = function (percent) {
            businessService.drawRequestOfResponse('request_response', requestofRespApi, {
                percent: percent,
                uri: uri
            });
        };

        // 请求统计
        this.getRequestStatisticsApi = function () {
            return httpService.get(requestStatisticsApi, {
                uri: uri
            }).then(function (result) {
                var count = 0;

                $.each(result.data, function (k, v) {
                    count += (v - 0);
                });

                $.each(result.data, function (k, v) {
                    result.data[k] = {
                        value: v,
                        per: (v / count * 100).toFixed(2)
                    }
                });

                result.data.count = count;

                return result.data;
            });
        }

        //错误信息
        this.getErrorInfo = function () {
            return httpService.get(errorInfoApi, {
                uri: uri
            }).then(function (result) {
                businessService.drawPie('error_chart', result.data.pie);
                return result.data;
            });

        };

        //异常元素top5
        this.getExceptionTop5 = function () {
            return httpService.get(exceptionTop5Api, {
                uri: uri
            }).then(function (result) {
                return result.data;
            });
        }

    });
