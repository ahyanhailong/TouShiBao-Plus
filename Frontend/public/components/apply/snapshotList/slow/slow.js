MyApp.controller('applySnapshotSlow', [
    '$scope', 'applySnapshotSlowService',
    function ($scope, service) {

        $scope.$watch('details.slow_element', function (newValue) {
            if (newValue) {
                var slow_element = {};
                $.each(newValue, function (i, dt) {
                    slow_element[dt.mn] = [dt.rate];
                });
                var diffHeight = Math.ceil(newValue.length / 4) * 20;

                service.drawSlowChart({labels: ['慢元素'], data: slow_element}, diffHeight);
            }
        });

    }]);
MyApp.service('applySnapshotSlowService', [function () {

    var baseHeight = 230;
    this.drawSlowChart = function (data, diffHeight) {
        $('#js_slow_chart').find('[data-chart]').css({
            height: baseHeight + diffHeight
        });
        $('#js_slow_chart').echarts({
            type: "bar",
            category: "y",
            tooltip: ['%'],
            data: data,
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
    };

}]);

