MyApp.directive('overviewTop5Ring', ['$state', function ($state) {
    return {
        restrict: 'AE',
        scope: {
            data: '=data',
            params: '@params'
        },
        controller: function ($scope) {
        },
        templateUrl: './public/components/apply/overview/directive/overview-top5-ring.html',
        link: function (scope, elem, attrs) {

            var tbody = elem.find('tbody');

            scope.$watch('data', function (result) {
                if (result) {

                    var baseColor = ['#0B78E3', '#0FEAD9', '#6859EA', '#E7BF16', '#7ED221'];

                    elem.echarts(function () {
                        var _opt = {
                            type: 'pie',
                            data: result,
                            setOption: function (option, instance) {
                                var total = 0;
                                $.each(option.legend.data, function (i, dt) {
                                    total += result.data[dt];
                                });
                                var tr = '';
                                $.each(option.legend.data, function (i, dt) {

                                    tr += '<tr>';
                                    tr += '<td width="30px"><svg width="20px" height="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                                        '<path d="M0.518134715,10.1648148 C2.46486577,7.83572427 5.44650959,6.3458258 8.78875904,6.3458258 C12.1534434,6.3458258 15.1526647,7.8557933 17.0984456,10.2118301 L11.6962102,13.3236839 C10.9150013,12.6763461 9.89921827,12.2851764 8.78875904,12.2851764 C7.70180458,12.2851764 6.7055608,12.6599618 5.93122869,13.2829235' +
                                        ' L0.518134715,10.1648148 Z" style="fill:' + baseColor[i] + ';"/>' +
                                        '</svg></td>';
                                    tr += '<td class="text-ellipsis">' + dt + '</td>';
                                    tr += '<td class="text-ellipsis"><a href="#/navigation/apply/error/' + $state.params.app_id + '?' + scope.params + '=' + dt + '">' + result.data[dt] + '次</a></td>';
                                    tr += '<td class="text-ellipsis">' + (result.data[dt] / total).toFixed(2) + '</td>';
                                    tr += '</tr>';
                                });
                                tbody.html(tr);

                                $.extend(true, option, {
                                    color: baseColor,
                                    tooltip: {show: false},
                                    legend: {
                                        show: false
                                    },
                                    series: [{
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: false
                                                },
                                                labelLine: {
                                                    show: false
                                                }
                                            }
                                        },
                                        hoverAnimation: false,
                                        radius: ['50%', '70%'],
                                        center: ['50%', '50%']
                                    }]
                                });

                                return option
                            }
                        };

                        return _opt;
                    });
                }
            });
        }
    }
}]);