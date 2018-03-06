MyApp.service('errorDetailService',['$http','httpService',function ($http,httpService) {

    var self = this

    //详情 二级错误异常趋势图 API
    this.get_single_element_error_trend_chart = env_config.API.Error.GET_SINGLE_ELEMENT_ERROR_TREND_CHART
    //详情 二级实例错误异常占比
    this.get_single_element_instance_error_rate_pie = env_config.API.Error.GET_SINGLE_ELEMENT_INSTANCE_ERROR_RATE_PIE
    //详情 单元素请求错误详情
    this.get_single_element_error_detail  = env_config.API.Error.GET_SINGLE_ELEMENT_ERROR_DETAIL
    this.errorTrend = function (dataSource) {
        var URL = self.get_single_element_error_trend_chart
        $('#errorTrend').echarts(function () {
            var opt = {
                type: 'area',
                data: function () {        //数据源，静态数据和ajax形式皆可
                    return {
                        url: URL,
                        data: dataSource,
                        method: 'get',
                        success: function (response) {
                            self.requestCountData = response
                            return response;
                        }
                    }
                },
                setOption : function (option) {
                    $.extend(true,option,{
                        toolbox: {show: false},
                        legend: {
                            bottom:20,
                            textStyle : {
                                color:'#969696'
                            }
                        },
                        grid: {
                            y: 10,
                            bottom:100,
                            left : '5%',
                            right :'5%',
                        },
                        tooltip:{
                            trigger: 'axis',
                            formatter : function (params) {
                                var str = '';
                                $.each(params, function (i, v) {
                                    str += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':' + v.value + '%<br>';
                                })
                                return params[0].name + '</br>' + str;
                            }
                        },
                        xAxis:[
                            {
                                axisLabel : {textStyle: {color: "#9C9C9C"}},
                                axisTick : {length:5,lineStyle:{color:'#9C9C9C'}}
                            }
                        ],
                        yAxis:[
                            {
                                axisLine : {show: false},
                                axisLabel : {textStyle: {color: "#9C9C9C"},formatter: function (param) {
                                    return getTimeShot(param);
                                }},
                                splitLine : {lineStyle: {opacity: 0.1},interval:16},
                                name : '时间           ',
                                nameTextStyle : {color:"#9C9C9C",fontSize:12,align:'left',padding:10},
                                splitNumber : 2
                            }
                        ],
                        series:[
                            {
                                showSymbol:false,
                                smooth : true,
                                symbol:'none',
                                lineStyle:{normal:{color:'#F86F33',width:1}},
                                itemStyle:{normal:{color:'#F86F33'}},
                                areaStyle : {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: 'rgba(245,111,51,1)' // 0% 处的颜色
                                            }, {
                                                offset: 1, color: 'transparent' // 100% 处的颜色
                                            }]
                                        }
                                    }
                                }
                            }
                        ]
                    })
                }
            }
            return opt
        })
        
    }
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

        self.drawPie(id, result, {
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

    //错误占比(TOP5)
    this.errorScale = function(dataSource){

        var URL = self.get_single_element_instance_error_rate_pie
        $http.get(URL,{params:dataSource}).then(function (result) {
            drawPie('errorScale',result.data)
        })
    }

    //时段内错误占比
    this.timeErrorRate = function () {
        $('#timeErrorRate').echarts(function () {
          var opt = {
              type: 'bar',
              // data: function () {        //数据源，静态数据和ajax形式皆可
              //     return {
              //         url: URL,
              //         data: submitData,
              //         method: 'get',
              //         success: function (response) {
              //             self.requestCountData = response
              //             callback(response)
              //             return response;
              //         }
              //     }
              // },
              data:respon.data,
              setOption:function (option) {
                  for(var serie in option.series){
                      option.series[serie].coordinateSystem = 'polar'
                  }
                $.extend(true,option,{
                    angleAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        z: 10
                    },
                    radiusAxis: {
                    },
                    polar: {
                    }
                })
                return option
              }
          }
          return opt
        })
        // drawPie('timeErrorRate',pie)
    }

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
                        tooltip: {show: true},
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

    //时段内错误占比
    this.timeCaller = function () {
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    this.ErrorDetail = function (dataSource) {
        var URL = self.get_single_element_error_detail
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
}])