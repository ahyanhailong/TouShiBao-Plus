/**
 *  Author: harry.lang
 *  Date: 2017/12/15
 *  Description: Created by harrylang on 2017/12/15.
 */
MyApp.directive("packScatter", [function () {
    return {
        restrict: 'AE',
        scope: {
            data: '=data',
            valueField: '@valueField',
            titleField: '@titleField',
            end: '&end'
        },
        controller: function ($scope) {
        },
        template: '<svg width="100%" height="100%"></svg>',
        link: function (scope, elem, attrs) {

            scope.$watch('data', function (data) {
                if (data && data.length > 0) {

                    var valueField = scope.valueField;
                    var titleField = scope.titleField;
                    var _data = $.extend(true, [], data);

                    elem = elem.find('svg');

                    var width = elem.width();
                    var height = elem.height();
                    var radius = 20;

                    angular.forEach(_data, function (dt) {
                        dt.x = width / 2;
                        dt.y = height / 2;
                    });

                    var xMax = d3.max(_data.map(function (dt) {
                        return dt[valueField];
                    }));
                    var rScale = d3.scaleSqrt().range([0, radius]).domain([0, xMax]);

                    var force = d3.forceSimulation()
                        .force('y', d3.forceY().strength(0.5).y(height / 2))
                        .force('x', d3.forceX().strength(0.1).x(width / 2))
                        //.force('charge', d3.forceManyBody().strength(1))
                        .force('collide', d3.forceCollide(function (d) {
                            return rScale(d[valueField]) + 2;
                        }).iterations(8))
                        .on('tick', function (e) {
                            d3.select(elem[0]).selectAll('.pack-scatter-node').attr('transform', function (d) {
                                return 'translate( ' + d.x + ', ' + d.y + ' )';
                            });
                        });

                    force.nodes(_data);

                    var node = d3.select(elem[0]).selectAll('g')
                        .data(_data)
                        .enter()
                        .append('g')
                        .attr('class', function (d) {
                            return 'pack-scatter-node';
                        });

                    node.append('circle').attr('r', function (d) {
                        return rScale(d[valueField]);
                    });

                    node.append('text')
                        .attr('class', 'pack-scatter-title').text(function (d) {
                            return d[titleField];
                        })
                        .attr('transform', function (d) {
                            var w = (this.getBBox ? this.getBBox() : this.getBoundingClientRect()).width;
                            return 'translate(' + -w / 2 + ',' + (rScale(d[valueField]) - Math.max(8, rScale(d[valueField])) / 1.25) + ' )';
                        });

                    // 追加操作
                    scope.end({nodes: node});

                }

            });
        }
    };
}]);