MyApp.directive('miniLine', function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            data: '=data',
            option: '=option'
        },
        template: '<div><div style="height:25px;width:100%" data-chart></div></div>',
        link: function (scope, element, attr) {
            scope.$watch('data', function (newValue) {

                if (newValue) {
                    $(element).echarts(function () {
                        var opt = {
                            type: ['line'],
                            data: scope.data,
                            setOption: function (option) {

                                $.each(option.series, function (i, serie) {
                                    serie.symbol = 'circle';
                                    serie.lineStyle = {normal: {width: 1}};
                                    serie.showAllSymbol = true;
                                });

                                $.extend(true, option, {
                                    color: ['#4EA1EB'],
                                    grid: {
                                        show: true,
                                        x: 1,
                                        x2: 1,
                                        y: 6,
                                        y2: 6,
                                        borderWidth: 0,
                                        borderColor: '#575757'
                                    },
                                    legend: {
                                        show: false
                                    },
                                    xAxis: [{
                                        splitLine: {show: false},
                                        axisLine: {show: false},
                                        axisTick: {show: false},
                                        axisLabel: {show: false},
                                    }],
                                    yAxis: [{
                                        splitLine: {show: false},
                                        axisLine: {show: false},
                                        axisTick: {show: false},
                                        axisLabel: {show: false},

                                    }]
                                }, scope.option || {});

                                return option;

                            }
                        };

                        return opt;
                    });
                }
            });

        }
    }
});