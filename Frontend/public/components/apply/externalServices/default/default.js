MyApp.controller('externalServicesdefault',['$scope','ESdefaultService','$state',function ($scope,ESdefaultService,$state) {


    var Api_map = {
        get_resp_time_trend_chart : env_config.API.external_service.GET_RESP_TIME_TREND_CHART,
        get_rpm_trend_chart : env_config.API.external_service.GET_RPM_TREND_CHART,
        get_network_error_trend_chart : env_config.API.external_service.GET_NETWORK_ERROR_TREND_CHART
    }

    $scope.start_time = $scope.$parent.start_time
    $scope.end_time = $scope.$parent.end_time
    $scope.app_id = $state.params.app_id
    $scope.dataSource = {
        app_id : $scope.app_id,
        start_time : $scope.start_time,
        end_time : $scope.end_time,
    }
    $scope.$on('dataTimeChange',function (event , info) {
        var start_time = info.start_time
        var end_time = info.end_time
        $scope.$parent.start_time = start_time
        $scope.$parent.end_time = end_time
        $scope.start_time = start_time
        $scope.end_time = end_time



    })

    $scope.$watchGroup(['start_time','end_time'],function (newVal,oldVal) {
        $.extend(true,$scope.dataSource,{
            start_time :$scope.start_time,
            end_time :$scope.end_time
        })
        if(newVal[0]){
            //外部服务响应时间
            ESdefaultService.drawEchart('respTime',Api_map['get_resp_time_trend_chart'],$scope.dataSource,{
                yAxis:[{
                    name:'时间       ',
                    axisLabel:{
                        formatter:'{value} ms'
                    }
                }],
                tooltip:{
                    trigger: 'axis',
                    formatter : function (params) {
                        var str = '';
                        $.each(params, function (i, v) {
                            str += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':' + getTimeShot(v.value) + 'ms<br>';
                        })
                        return params[0].name + '</br>' + str;
                    }
                }
            })
            //吞吐率
            ESdefaultService.drawEchart('rspRate',Api_map['get_rpm_trend_chart'],$scope.dataSource,{
                yAxis:[{
                    name:'吞吐率       ',
                    axisLabel:{
                        formatter:'{value} cpm'
                    }
                }],
                tooltip:{
                    trigger: 'axis',
                    formatter : function (params) {
                        var str = '';
                        $.each(params, function (i, v) {
                            str += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':' + v.value + 'cpm<br>';
                        })
                        return params[0].name + '</br>' + str;
                    }
                }
            })
            $.extend(true,$scope.dataSource,{type:'net_error'})
            //网络错误率
            ESdefaultService.drawEchart('netWorkRate',Api_map['get_network_error_trend_chart'],$scope.dataSource,{
                yAxis:[{
                    name:'网络错误率       ',
                    axisLabel:{
                        formatter:'{value} %'
                    }
                }],
                tooltip:{
                    trigger: 'axis',
                    formatter : function (params) {
                        var str = '';
                        $.each(params, function (i, v) {
                            str += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':' + v.value + '%<br>';
                        })
                        return params[0].name + '</br>' + str;
                    }
                }
            })
        }

    })


}])
MyApp.service('ESdefaultService',['$http',function ($http) {

var respon = {"code":1000,"msg":"","data":{"data":{"\u54cd\u5e94\u65f6\u95f4":[96.63,101.24,99.19,101.86,97.8,100.73,101.89,99.69,101.37,98.82,98.99,96.9,104.19,97.73,102.74,98.46,98.11,103.82,98.84],"\u541e\u5410\u7387":[4.37,8.17,8.17,8.17,8.17,8.15,8.17,8.15,8.17,8.17,8.15,8.17,8.17,8.17,8.17,8.18,8.15,8.17,0.28]},"labels":["16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00"]}}
    
    
    this.drawEchart = function (dom,URL,dataSource,setopt) {
        var baseColor = ['#E4694D', '#923CAC', '#1861AE', '#B2921D', '#1DAFAE'];
        $('#'+dom).echarts(function () {
            var opt = {
                type: 'area',
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
                    for(var i=0;i<option.series.length;i++){
                    console.log(option.series[i])
                        option.series[i].symbol = 'none'
                        option.series[i].showSymbol = false
                        option.series[i].smooth  = true
                    }
                    $.each(option.series, function (i, serie) {
                        serie.symbol = 'none';
                        serie.lineStyle = {
                            normal: {width: 1}
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
                                        offset: 0, color: baseColor[i] // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'transparent' // 100% 处的颜色
                                    }]
                                }
                            }
                        };
                    });
                    $.extend(true,option,{
                        color:['#E4694D','#923CAC','#1370D1','#B2921D','#1DAFAE'],
                        grid: {
                            y: 30,
                            left : '10%',
                            right :'5%',
                        },
                        legend:{
                            y : "bottom",
                            textStyle : {color: '#fff'}
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
                                axisLabel : {textStyle: {color: "#9C9C9C"}},
                                splitLine : {lineStyle: {opacity: 0.1},interval:16},
                                nameTextStyle : {color:"#9C9C9C",fontSize:12,align:'left',padding:10},
                                splitNumber : 5,

                            }
                        ]


                    },setopt)

                    return option

                }
            }
            return opt
        })
    } 
    
    
    
}])