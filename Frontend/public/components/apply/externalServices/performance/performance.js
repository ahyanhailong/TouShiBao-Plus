MyApp.controller('performance',['$scope','$state','performanceService',function ($scope,$state,performanceService) {



    $scope.domain = $state.params.domain
    $scope.port = $state.params.port
    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id

    $scope.page_no = 1
    $scope.total_row = ''
    $scope.sum_per_page = '5'

    var Api_map = {
        get_rpm_and_resp_time_trend_chart : env_config.API.external_service.GET_RPM_AND_RESP_TIME_TREND_CHART,
        get_caller_rate : env_config.API.external_service.GET_CALLER_RATE,
        get_caller_list : env_config.API.external_service.GET_CALLER_LIST,
    }
    $scope.start_time = $scope.$parent.start_time
    $scope.end_time = $scope.$parent.end_time

    $scope.dataSource = {
        app_id : $scope.app_id,
        start_time : $scope.start_time,
        end_time : $scope.end_time,
        domain:$scope.domain,
        port:$scope.port,
        uri : $scope.uri
    }
    $scope.backDefault = function () {
        window.location.replace('#navigation/apply/externalServices/default/'+$scope.app_id)
    }
    // href="{{handleHref('dashboard')}}"
    $scope.btnHref = function (type) {
        return '#navigation/apply/externalServices/'+ type +'/'+ $scope.domain+'/'+$scope.port +'/'+encodeURIComponent(encodeURIComponent($scope.uri))+'/'+$scope.app_id;
    }
    $scope.$on('dataTimeChange',function (event , info) {
        $scope.start_time = info.start_time
        $scope.end_time = info.end_time

        // performanceService.cellerRate()
        // performanceService.cellerTableList()
    })


    $scope.$watchGroup(['start_time','end_time'],function (newVal,oldVal) {
        $.extend(true, $scope.dataSource, {
            start_time: $scope.start_time,
            end_time: $scope.end_time
        })
        if(newVal[0]){
            performanceService.rpmRespTime(Api_map['get_rpm_and_resp_time_trend_chart'],$scope.dataSource)
            performanceService.cellerRate(Api_map['get_caller_rate'],$scope.dataSource)

        }


    })
    $scope.changeSqlList = function (currentPage,perPage) {
        $scope.page_no = currentPage;
        $scope.sum_per_page = perPage;
        performanceService.cellerTableList(Api_map['get_caller_list'],$scope.dataSource,function (respon) {
            $scope.total_row =respon.data.total_items
            $scope.$apply()
        })
    }


}])
MyApp.service('performanceService',['$http','httpService',function ($http) {
    this.rpmRespTime = function (URL,dataSource) {
        $('#rspRespTime').echarts(function () {
            var opt = {
                type: ['bar', 'line'],
                tooltip: ["ms", "cpm"],
                data:function () {
                    return {
                        url: URL,
                        data: dataSource,
                        method: 'get',
                        success: function (response) {
                            return response;
                        }
                    }
                },
                setOption : function (option) {
                    $.extend(true,option,{
                        toolbox : {show: false},
                        legend:{
                            y : "bottom",
                            textStyle : {color: '#fff'}
                        },
                        grid:{
                            y : 40,
                        },
                        tooltip:{
                            trigger: 'axis',
                            formatter : function (params) {
                                var str = '';
                                $.each(params, function (i, v) {
                                    if (v.seriesType == 'bar') {
                                        var unit = 'cpm';
                                    } else {
                                        var unit = 'ms';
                                    }
                                    str += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':' + v.value + unit + '<br>';
                                })
                                return params[0].name + '</br>' + str;
                            }
                        },
                        xAxis:[
                            {
                                axisLabel : {textStyle: {color: "#9C9C9C"}},
                                axisTick : {length:9,lineStyle:{color:'#E8E8E8'}}
                            }
                        ],
                        yAxis:[
                            {
                                axisLine : {show: false},
                                axisLabel : {textStyle: {color: "#9C9C9C"},formatter: '{value} cpm'},
                                splitLine : {lineStyle: {opacity: 0.1},interval:16},
                                name : '吞吐率           ',
                                nameTextStyle : {color:"#9C9C9C",fontSize:12,align:'left',padding:10},
                                splitNumber : 5
                            },
                            {
                                axisLabel : {textStyle: {color: "#9C9C9C"}, formatter: '{value} ms'},
                                splitLine : {lineStyle: {opacity: 0}},
                                axisLine : {show: false},
                                nameTextStyle : {color:"#9C9C9C",fontSize:12,align:'right'},
                                name : '           时间',
                                splitNumber : 5
                            }
                        ],
                        series:[
                            {
                                itemStyle : {normal: {color: '#FF8235',width:1}},
                                barWidth : 16
                            },
                            {
                                smooth : true,
                                symbol : 'none',
                                type:'line',
                                lineStyle : {normal: {color: "#0FC9EA", opacity: 0.7}},
                                itemStyle : {normal: {color: "#0FC9EA"}},
                                areaStyle : {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#0FC9EA' // 0% 处的颜色
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
    //调用者占比
    this.cellerRate = function (URL,dataSource) {
        $.ajax({
            type: "get",
            url: URL,
            data: dataSource,
            async: true,
            success: function (response) {
                var datas = response.data.data

                $('#caller').echarts(function () {
                    var opt = {
                        type: "bar",
                        category: "y",
                        data: {labels: ['调用占比'], data: datas},
                        setOption : function (option) {
                            for (var i in option.series) {
                                option.series[i].stack = 'group1';
                                option.series[i].barWidth = 76;
                                var percent = option.series[i].data[0]
                                option.series[i].data = []
                                option.series[i].data[0] = percent
                            }
                            $.extend(true,option,{
                                color : ['#a9dbff', '#9F35FF', '#00cc99', '#FF6B49', '#FABB3D', '#FF77FF', '#ff0033', '#C07AB8'],
                                toolbox:{
                                    show : false
                                },
                                grid : {
                                    bottom: 100,
                                },
                                legend:{
                                    y : 'bottom',
                                    textStyle : {color: '#fff'}
                                },
                                tooltip:{
                                    formatter : function (params, ticket, callback) {
                                        return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params.color + '"></span>调用者:&nbsp;&nbsp;' + params.seriesName + '<br/>' + '耗时占比&nbsp;&nbsp;&nbsp;' + datas[params.seriesName][0] + '%<br/>' + '吞吐率&nbsp;&nbsp;&nbsp;' + datas[params.seriesName][1] + 'ms<br/>' + '每分钟调用次数&nbsp;&nbsp;&nbsp;' + datas[params.seriesName][2] + 'cpm<br/>'
                                    }
                                },
                                xAxis:[
                                    {
                                        max : 100,
                                        axisLabel : {textStyle: {color: "#fff"},formatter: '{value} %'},
                                        splitLine : {lineStyle: {width: "0"}},
                                    }
                                ],
                                yAxis:[
                                    {
                                        axisLabel : {textStyle: {color: "#fff"}},
                                        splitLine : {lineStyle: {width: "0.2"}}
                                    }
                                ]
                            })
                        }
                    }
                    return opt
                })
            }
        })


    }
    this.cellerTableList = function (URL,dataSource,callback) {
        $('#cellerList').table({
            data:function (sort, order) {
                dataSource.sort = sort;
                dataSource.order = order;
                return {
                    url: URL,
                    data: dataSource,
                    method: 'get',
                    success: function (result) {
                        if(typeof callback == 'function'){
                            callback(result)
                        }
                        return result.data.list;

                    }
                }
            }
        })
    }

}])