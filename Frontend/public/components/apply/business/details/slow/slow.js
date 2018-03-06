MyApp.controller('slow', ['$scope', 'slowService', function ($scope, slowService) {

    slowService.drawRespTime();

    // 快照列表
    $scope.snapListApi = slowService.snapListApi;
}]);

/**
 * service
 */
MyApp.service('slowService',
    function (dateTimeService, $state, httpService) {

        var uri = decodeURIComponent($state.params.uri);

        var respTimeApi = env_config.API.BusinessAnalysis.GET_SLOW_ANALYSIS_TIME_DISTRIBUTION_LINE;
        var snapListApi = this.snapListApi = env_config.API.BusinessAnalysis.GET_SLOW_ANALYSIS_SNAP_LIST;

        // 获取顶部数据
        this.drawRespTime = function () {
            return httpService.get(respTimeApi, {
                uri: uri
            }).then(function (result) {

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

                $('#js_response_chart').echarts(function () {
                    var opt = {
                        type: 'bar',
                        tooltip: '次',
                        data: result.data,
                        setOption: function (option, result) {
                            $.each(option.legend.data, function (i, dt) {
                                option.legend.data[i] = {
                                    name: dt,
                                    icon: 'path://M0,5.03225806 L1.92675159,5.03225806 L1.92675159,9.22580645 L0,9.22580645 L0,5.03225806 Z M5.78025478,3.35483871 L7.70700637,3.35483871 L7.70700637,9.22580645 L5.78025478,9.22580645 L5.78025478,3.35483871 Z M2.89012739,0 L4.81687898,0 L4.81687898,9.22580645 L2.89012739,9.22580645 L2.89012739,0 Z M8.67038217,1.67741935 L10.5971338,1.67741935 L10.5971338,9.22580645 L8.67038217,9.22580645 L8.67038217,1.67741935 Z'
                                }
                            });

                            $.extend(true, option, {
                                color: ['#0FEAD9'],
                                legend: {
                                    y: 'bottom',
                                    itemWidth: 10,
                                    itemHeight: 10,
                                    textStyle: {
                                        color: '#969696'
                                    },
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        lineStyle: {color: '#4FABFC'}
                                        /*type: 'shadow',
                                         shadowStyle: {
                                         color: 'rgba(15,234,217,0.1)'
                                         }*/
                                    },
                                    formatter: function (params) {
                                        var str = params[0].axisValue + '<br>';
                                        $.each(params, function (i, p) {
                                            str += '<div style="font-size:12px;overflow: auto;">' +
                                                '<div style="float:left;">' +
                                                '<span style="display:inline-block;margin-right:5px;width:9px;height:9px;background-color:' + p.color + ';"></span>' +
                                                p.seriesName +
                                                '</div>' +
                                                '<div style="float:right;margin-left: 20px;">' + p.value + '次' + '</div>' +
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
                                        name: '次数'
                                    })],
                                series: [{
                                    barMaxWidth: 20
                                }]
                            });
                            return option;
                        }
                    };

                    return opt;
                });

            });
        };

    });

