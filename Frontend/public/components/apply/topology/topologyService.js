MyApp.service('topologyService',['$http',function ($http) {

    var self = this

    this.requestCount = env_config.API.apply_topolog.GET_REQUEST_TREND_CHART
    this.resp_time = env_config.API.apply_topolog.GET_RESP_TIME_TREND_CHART
    this.error_count = env_config.API.apply_topolog.GET_ERROR_TREND_CHART
    this.request_statistics = env_config.API.apply_topolog.GET_REQUEST_STATISTICS_TABLE
    this.topo_data = env_config.API.apply_topolog.GET_TOPO_DATA
    this.topo_instance_info = env_config.API.apply_topolog.GET_TOPO_INSTANCE_INFO


    this.requestCountData = ''
    this.repTimeData = ''
    this.ErrorData = ''

    var setopt = {
            toolbox: {show: false},
            legend: {
                show: false
            },
            grid: {
                y: 5,
                left : '15%',
                right :'5%',
                height: 60
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
                }
            ]
        }

    //请求统计
    this.requestStatistical = function (dataSource,callback) {
        var URL = self.request_statistics
        $http.get(URL,{params:dataSource}).then(function (respon) {
            if(typeof callback == 'function'){
                callback(respon)
            }
        })
    }

    this.requestCountFn = function (submitData,callback) {
        var URL = self.requestCount
        $('#requestCount').echarts(function () {
            var opt = {
                type: 'line',
                data: function () {        //数据源，静态数据和ajax形式皆可
                    return {
                        url: URL,
                        data: submitData,
                        method: 'get',
                        success: function (response) {
                            self.requestCountData = response
                            callback(response)
                            return response;
                        }
                    }
                },
                setOption : function (option) {
                    $.extend(true,option,setopt,{
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                var str = '<span style="display:block;">' + params[0].axisValue + '</span><table>'
                                    str += '<tr><td style="width:120px;"><span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + params[0].color + '"></span>' + params[0].seriesName + ':</td><td style="text-align:right;padding;0 5px">' + self.requestCountData.sum +  '次</td></tr>';

                                return str + "</table>"
                            }
                        },
                        series:[
                            {
                                lineStyle:{normal:{color:'#0FEAD9',width:1}},
                                areaStyle:{
                                    normal:{
                                        color:{
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: 'rgba(15,234,217,1)' // 0% 处的颜色
                                            }, {
                                                offset: 1, color: 'rgba(15,234,217,0)' // 100% 处的颜色
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
    this.respTime = function (dataSource,callback) {
        var URL = self.resp_time
        $('#respTime').echarts(function () {
            var opt = {
                type: 'line',
                data: function () {        //数据源，静态数据和ajax形式皆可
                    return {
                        url: URL,
                        data: dataSource,
                        method: 'get',
                        success: function (response) {
                            self.repTimeData = response
                            callback(response)
                            return response;
                        }
                    }
                },
                setOption : function (option) {
                    $.extend(true,option,setopt,{
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                var value = self.repTimeData.tool_tip[params[0].dataIndex]
                                var str = '<span style="display:block;">' + params[0].axisValue + '</span><table>'
                                $.each(value,function (item,val) {
                                    str += '<tr><td style="width:120px;"><span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;"></span>' + item + ':</td><td style="text-align:right;padding;0 5px">' + val +  '次</td></tr>';

                                })

                                return str + "</table>"
                            }
                        },
                        series:[
                            {
                                lineStyle:{normal:{color:'#0FC9EA',width:1}},
                                areaStyle:{
                                    normal:{
                                        color:{
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
                            }
                        ]
                    })
                }
            }
            return opt
        })
    }
    this.Error = function (dataSource,callback) {
        var URL = self.error_count
        $('#errorCount').echarts(function () {
            var opt = {
                type: 'line',
                data: function () {        //数据源，静态数据和ajax形式皆可
                    return {
                        url: URL,
                        data: dataSource,
                        method: 'get',
                        success: function (response) {
                            self.ErrorData = response
                            callback(response)
                            return response;
                        }
                    }
                },
                setOption : function (option) {
                    $.extend(true,option,setopt,{
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                var str = '<span style="display:block;">' + params[0].axisValue + '</span><table>'
                                str += '<tr><td style="width:120px;"><span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + params[0].color + '"></span>' + params[0].seriesName + ':</td><td style="text-align:right;padding;0 5px">' + self.ErrorData.sum +  '次</td></tr>';

                                return str + "</table>"
                            }
                        },
                        series:[
                            {
                                lineStyle:{normal:{color:'#F3233C',width:1}},
                                areaStyle:{
                                    normal:{
                                        color:{
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: 'rgba(243,35,60,1)' // 0% 处的颜色
                                            }, {
                                                offset: 1, color: 'rgba(243,35,60,0)' // 100% 处的颜色
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

    this.drawTp = function (param ,url ,dom) {

        return $http.get(url,{params:param}).then(function (respon) {
            if(typeof callback == 'function'){
                callback(respon)
            }
            return respon.data
        })

    }
    
    this.topoMsg = function (dataSource,callback) {
        var URL = self.topo_instance_info
        $.ajax({
            type: "GET",
            url: URL,
            data: dataSource,
            dataType: "json",
            success: function(respon){
                console.log(respon)
                if(typeof callback == 'function'){
                    callback(respon)
                }
            }

        })
    }



}])