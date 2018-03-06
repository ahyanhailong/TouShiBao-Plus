MyApp.controller('error',['$scope','$state','errorService',function ($scope,$state,errorService) {


    $scope.page_no = 1
    $scope.total_row = ''
    $scope.sum_per_page = '5'

    $scope.domain = $state.params.domain
    $scope.port = $state.params.port
    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id

    $scope.start_time = $scope.$parent.start_time
    $scope.end_time = $scope.$parent.end_time


    var API_Maps = {
        get_error_network_type_trend_chart : env_config.API.external_service.GET_ERROR_NETWORK_TYPE_TREND_CHART,
        get_error_list : env_config.API.external_service.GET_ERROR_LIST
    }

    $scope.dataSource = {
        app_id : env_config.APP_ID,
        start_time : $scope.start_time,
        end_time : $scope.end_time,
        domain : $scope.domain,
        port : $scope.port,
        uri:$scope.uri,
        app_id :$scope.app_id
    }
    $scope.btnHref = function (type) {
        return '#navigation/apply/externalServices/'+ type +'/'+ $scope.domain+'/'+$scope.port+'/'+encodeURIComponent(encodeURIComponent($scope.uri)) +'/'+$scope.app_id;

    }
    $scope.backDefault = function () {
        window.location.replace('#navigation/apply/externalServices/default/'+$scope.app_id)
    }
    $scope.$on('dataTimeChange',function (event , info) {
        $scope.start_time = info.start_time
        $scope.end_time = info.end_time
    })


    $scope.$watchGroup(['start_time','end_time'],function (newVal,oldVal) {
        $.extend(true,$scope.dataSource,{
            start_time : $scope.start_time,
            end_time : $scope.end_time
        })
        if(newVal[0]){
            errorService.drawEchart('netWorkErrorRate',API_Maps['get_error_network_type_trend_chart'],$scope.dataSource,{
                yAxis:[{
                    name:'网络错误次数       ',
                    axisLabel:{
                        formatter:'{value} 次'
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
            errorService.errorTableList(API_Maps['get_error_list'],$scope.dataSource,function (respon) {
                console.log(respon)
                $scope.total_row = respon.data.total_items
                $scope.$apply()
            })
        }

    })
    
    $scope.changeSqlList = function () {
        
    }
    
    
}])

MyApp.service('errorService',['$http','httpService',function ($http,httpService) {


    var respon = {"code":1000,"msg":"","data":{"data":{"\u54cd\u5e94\u65f6\u95f4":[96.63,101.24,99.19,101.86,97.8,100.73,101.89,99.69,101.37,98.82,98.99,96.9,104.19,97.73,102.74,98.46,98.11,103.82,98.84],"\u541e\u5410\u7387":[4.37,8.17,8.17,8.17,8.17,8.15,8.17,8.15,8.17,8.17,8.15,8.17,8.17,8.17,8.17,8.18,8.15,8.17,0.28]},"labels":["16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00"]}}


    this.drawEchart = function (dom,URL,dataSource,setopt) {
        var baseColor =['#E4694D','#923CAC','#1370D1','#B2921D','#1DAFAE']
        $('#'+dom).echarts(function () {
            var opt = {
                type: 'area',
                tooltip:setopt.tooltip,
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
                        grid: {
                            bottom: 60,
                            left : '10%',
                            right :'5%',
                        },
                        tooltip:{
                            trigger:'axis',
                        },
                        legend:{
                            show:true,
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
                                splitNumber : 5
                            }
                        ]


                    },setopt)

                    return option

                }
            }
            return opt
        })
    }
    this.errorTableList = function (URL,dataSource,callback) {

        $('#errorTable').table({
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