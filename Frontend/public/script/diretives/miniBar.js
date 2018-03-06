MyApp.directive('miniBar', function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            data: '=data'
        },
        template: '<div><div style="height:30px;width:100%" data-chart></div></div>',
        link: function (scope, element, attr) {
            scope.$watch('data', function (newValue) {
                if (newValue) {
                    $(element).echarts(function () {
                        var opt = {
                            type: ['bar'],
                            data: scope.data,
                            setOption: function (option) {

                                $.extend(true, option, {
                                    color: ['#4EA1EB'],
                                    grid: {
                                        show: true,
                                        x: 1,
                                        x2: 1,
                                        y: 1,
                                        y2: 1,
                                        borderWidth: 1,
                                        borderColor: '#575757'
                                    },
                                    legend: {
                                        show: false
                                    },
                                    xAxis: [{
                                        splitLine: {
                                            interval: 1,
                                            show: true,
                                            lineStyle: {
                                                color: '#575757'
                                            }
                                        },
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
                                });

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