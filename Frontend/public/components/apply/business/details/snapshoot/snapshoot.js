MyApp.controller('snapshoot', [
    '$scope', 'snapshootService',
    function ($scope, service) {

        // 响应时间分布图
        service.drawRespDistChart();
        // 快照列表
        $scope.snapListApi = service.snapListApi;

    }]);

MyApp.service('snapshootService', [
    'httpService', '$state', 'businessService', function (httpService, $state, businessService) {
        var uri = decodeURIComponent($state.params.uri);

        this.snapListApi = env_config.API.BusinessAnalysis.GET_SNAP_ANALYSIS_TIME_SNAP_LIST;
        var respDistApi = env_config.API.BusinessAnalysis.GET_SNAP_ANALYSIS_TIME_DISTRIBUTION_LINE;

        // 响应时间分布图
        this.drawRespDistChart = function () {
            return httpService.get(respDistApi, {
                uri: uri
            }).then(function (result) {

                businessService.drawBar('js_resp_dist', result.data, {
                    color: ['#0FEAD9'],
                    yAxis: [{
                        name: '次数',
                        axisLabel: {
                            formatter: '{value}次'
                        }
                    }],
                    series: [{
                        barMaxWidth: 20
                    }]
                });

            });
        };

    }]);