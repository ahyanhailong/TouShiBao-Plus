MyApp.controller('errorException', [
    '$scope', 'errorExceptionService',
    function ($scope, service) {
        // 错误和异常趋势
        service.drawErrorTrend();
        // 错误占比
        service.drawErrorRate();
        // 异常占比
        service.drawExceptionRate();

        // 快照列表
        $scope.snapListApi = service.snapListApi;

    }]);

MyApp.service('errorExceptionService', function (httpService, $state, businessService) {
    var uri = decodeURIComponent($state.params.uri);

    var errorTrendApi = env_config.API.BusinessAnalysis.GET_ERROR_ANALYSIS_ERROR_EXCEPTION_COUNT_CHART;
    var errorRateApi = env_config.API.BusinessAnalysis.GET_ERROR_ANALYSIS_ERROR_RATE_PIE;
    var exceptionRateApi = env_config.API.BusinessAnalysis.GET_ERROR_ANALYSIS_EXCEPTION_RATE_PIE;

    this.snapListApi = env_config.API.BusinessAnalysis.GET_ERROR_ANALYSIS_SNAP_LIST;

    // 错误和异常趋势
    this.drawErrorTrend = function () {
        return httpService.get(errorTrendApi, {
            uri: uri
        }).then(function (result) {

            businessService.drawBar('js_error_exception', result.data, {
                yAxis: [{
                    name: '次数',
                    axisLabel: {
                        formatter: '{value}次'
                    }
                }],
                series: [{
                    barMaxWidth: 10
                }, {
                    barMaxWidth: 10
                }]
            });

        });
    };

    /**
     * 计算对齐空格
     * @param data
     * @returns {Function}
     */
    function calculateSpace(data) {
        var cacheMaxLen = [0, 0];
        for (var k in data) {
            cacheMaxLen[0] = cacheMaxLen[0] > (k + '').length ? cacheMaxLen[0] : (k + '').length;
            cacheMaxLen[1] = cacheMaxLen[1] > (data[k] + '').length ? cacheMaxLen[1] : (data[k] + '').length;
        }
        return function getSpace(i, v) {
            var str = '       ';
            var l = cacheMaxLen[i] - (v + '').length;
            for (var i = 0; i < l; i++) {
                str += ' ';
            }
            return str;
        }

    }

    function formatName(name) {
        name = name + '';
        if (name.length > 16) {
            return name.substr(0, 8) + '...' + name.substr(-5);
        } else {
            return name;
        }
    }

    function drawPie(id, result) {
        var data = result.data;

        var total = 0;

        for (var k in data) {
            total += data[k];
            // 处理名称过长问题
            var newK = formatName(k);
            data[newK] = data[k];
            if (newK !== k) {
                delete data[k];
            }
            //过滤空串（无异常信息）
            if (k == '') {
                data[' '] = data[k];
                delete data[''];
            }
        }

        var getSpace = calculateSpace(data);

        businessService.drawPie(id, result, {
            legend: {
                y: 'middle',
                left: '35%',
                orient: 'vertical',
                formatter: function (name) {
                    var v = data[name];

                    return name + getSpace(0, name) + v + '次' + getSpace(1, v) + (v / total * 100).toFixed(2) + '%';
                }
            },
            series: [{
                radius: ['50%', '70%'],
                center: ['15%', '50%']
            }]
        });
    }

    //错误占比
    this.drawErrorRate = function () {
        return httpService.get(errorRateApi, {
            uri: uri
        }).then(function (result) {
            drawPie('js_error_rate', result);
        });
    };

    //异常占比
    this.drawExceptionRate = function () {
        return httpService.get(exceptionRateApi, {
            uri: uri
        }).then(function (result) {
            drawPie('js_exception_rate', result);
        });
    };

});