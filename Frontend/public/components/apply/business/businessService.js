/**
 * 事务分析 默认页面响应事件
 */
MyApp.service('businessService', ['$http', 'dateTimeService', '$state', function ($http, dateTimeService, $state) {

    var time = dateTimeService.getTime();

    var config = {
        "normal": "正常(<500)",
        "slow": "缓慢(500-2000)",
        "very_slow": "非常慢(>2000)",
        "error": "错误数",
        "resp_time": "平均响应时间",
        "five_percent": "5%缓慢",
        "ten_percent": "10%缓慢",
        "error_count": "错误数",
    };
    var baseColor = ['#7BD400', '#E8C000', '#E66948', '#D22600', '#12B7D5', '#4FABFC'];

    // 绘制请求数和响应时间图表
    this.drawRequestOfResponse = function (id, url, params, click) {

        var appId = $state.params.app_id;
        $('#' + id).echarts(function () {
            var opt = {
                type: ['bar', 'bar', 'bar', 'bar', 'area', 'line'],
                tooltip: ['次', 'ms'],
                data: function () {
                    return {
                        url: url,
                        drawRequestOfResponseurl: url,
                        method: 'get',
                        data: $.extend(true, {}, {
                            app_id: appId,
                            start_time: time.start,
                            end_time: time.end
                        }, params),
                        success: function (response) {
                            return response;
                        }
                    }
                },
                click: function (params) {
                    if (typeof click == 'function') {
                        click(params);
                    }
                },
                setOption: function (option, result) {
                    var sorts = ['very_slow', 'slow', 'normal', 'error', 'resp_time'];
                    option.legend.data.sort(function (a, b) {
                        return sorts.indexOf(a) - sorts.indexOf(b);
                    });

                    $.each(option.series, function (i, serie) {
                        serie.yAxisIndex = 1;
                        if (serie.name == 'resp_time') {
                            serie.zlevel = 0;
                            serie.symbol = 'none';
                            serie.lineStyle = {
                                normal: {
                                    width: 1.5,
                                }
                            };

                            serie.areaStyle = {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'rgba(15,201,234,1)' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: 'rgba(15,201,234,0)' // 100% 处的颜色
                                        }]
                                    }
                                }
                            }
                        } else {
                            serie.stack = 'group';
                            serie.yAxisIndex = 0;
                            serie.zlevel = 1;
                        }

                        $.each(serie.data, function (i, d) {
                            serie.data[i] = {value: d, _addinfo: serie.name};
                        });
                        serie.name = serie.name == "percent_time" ? config[params.percent] : config[serie.name];

                    });

                    var yAxisStyle = {
                        splitLine: {
                            lineStyle: {
                                color: '#434343'
                            }
                        },
                        nameTextStyle: {
                            color: '#8D8C8E'
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#8D8C8E'
                            }
                        }
                    };

                    $.extend(true, option, {
                        color: baseColor,
                        grid: {
                            top: 40
                        },
                        legend: {
                            textStyle: {
                                color: '#8D8C8E',
                            },
                            itemWidth: 12,
                            itemHeight: 12,
                            y: 'bottom',
                            data: option.legend.data.map(function (dt) {
                                return {
                                    name: dt == 'percent_time' ? config[params.percent] : config[dt],
                                    icon: 'rect'
                                }
                            })
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                var str = params[0].axisValue + '<br>';
                                $.each(params, function (i, p) {
                                    str += '<div style="font-size:12px;overflow: auto;">' +
                                        '<div style="float:left;">' +
                                        '<span style="display:inline-block;margin-right:5px;width:9px;height:9px;background-color:' + p.color + ';"></span>' +
                                        p.seriesName +
                                        '</div>' +
                                        '<div style="float:right;margin-left: 20px;">' + p.value +
                                        (p.seriesName == config['resp_time'] ? 'ms' : '次') + '</div>' +
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
                            }),
                            $.extend({}, yAxisStyle, {
                                name: '时间'
                            })]
                    });

                    return option
                }
            };

            return opt;
        });
    };

    // 绘制饼图
    this.drawPie = function (id, data, opt) {
        $('#' + id).echarts(function () {
            var _opt = {
                type: 'pie',
                data: data,
                setOption: function (option, result) {

                    $.each(option.legend.data, function (i, dt) {
                        option.legend.data[i] = {
                            name: dt,
                            icon: 'path://M0.518134715,10.1648148 C2.46486577,7.83572427 5.44650959,6.3458258 8.78875904,6.3458258 C12.1534434,6.3458258 15.1526647,7.8557933 17.0984456,10.2118301 L11.6962102,13.3236839 C10.9150013,12.6763461 9.89921827,12.2851764 8.78875904,12.2851764 C7.70180458,12.2851764 6.7055608,12.6599618 5.93122869,13.2829235' +
                            ' L0.518134715,10.1648148 Z'
                        }
                    });

                    $.each(option.series, function (i, serie) {
                        serie.hoverAnimation = false;
                    });

                    $.extend(true, option, {
                        color: ['#0B78E3', '#0FEAD9', '#6859EA', '#E7BF16', '#7ED221'],
                        tooltip: {show: false},
                        legend: {
                            y: '60%',
                            textStyle: {
                                color: '#4FABFC'
                            },
                            itemWidth: 16,
                            itemHeight: 8,
                            itemGap: 25
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
                            radius: ['30%', '40%'],
                            center: ['50%', '30%']
                        }]
                    }, opt || {});

                    return option
                }
            };

            return _opt;
        });
    };

    // 绘制柱状图
    this.drawBar = function (id, data, opt) {
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

        $('#' + id).echarts(function () {
            var _opt = {
                type: 'bar',
                data: data,
                setOption: function (option, result) {
                    $.each(option.legend.data, function (i, dt) {
                        option.legend.data[i] = {
                            name: dt,
                            icon: 'path://M0,5.03225806 L1.92675159,5.03225806 L1.92675159,9.22580645 L0,9.22580645 L0,5.03225806 Z M5.78025478,3.35483871 L7.70700637,3.35483871 L7.70700637,9.22580645 L5.78025478,9.22580645 L5.78025478,3.35483871 Z M2.89012739,0 L4.81687898,0 L4.81687898,9.22580645 L2.89012739,9.22580645 L2.89012739,0 Z M8.67038217,1.67741935 L10.5971338,1.67741935 L10.5971338,9.22580645 L8.67038217,9.22580645 L8.67038217,1.67741935 Z'
                        }
                    });
                    $.each(option.series, function (i, serie) {
                        serie.barGap = 0;
                    });

                    $.extend(true, option, {
                        color: ['#F86F33', '#8B09B5'],
                        legend: {
                            y: 'bottom',
                            itemWidth: 10,
                            itemHeight: 10,
                            textStyle: {
                                color: '#969696'
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
                            $.extend({}, yAxisStyle)
                        ]
                    }, opt || {});
                    return option;
                }
            };

            return _opt;
        });
    }

}]);