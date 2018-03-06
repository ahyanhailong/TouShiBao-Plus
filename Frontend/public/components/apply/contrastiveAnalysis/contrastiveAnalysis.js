
MyApp.controller('contrastiveAnalysis', ['$scope', '$rootScope','cAService','httpService', 'dateTimeService','$state',function ($scope,$rootScope,cAService,httpService,dateTimeService,$state) {

	$rootScope.sideBarKey = 'contrastiveAnalysis';
    $scope.app_id = $state.params.app_id
    $scope.search_uri = ''
    $scope.uri = ''
    $scope.host_id1 = ''
    $scope.host_id2 = ''
    $scope.start_time1 = ''
    $scope.end_time1 = ''
    $scope.start_time2 = ''
    $scope.end_time2 = ''

    var uri_map = {
	    //请求列表
        get_uri_list : env_config.API.relative_analysis.GET_URI_LIST,
        //获取主机列表
        get_host_list : env_config.API.relative_analysis.GET_HOST_LIST,
        //请求数
        get_request_trend_line : env_config.API.relative_analysis.GET_REQUEST_TREND_LINE,
        //平均响应时间
        get_resp_time_trend_line : env_config.API.relative_analysis.GET_RESP_TIME_TREND_LINE,
        //错误数
        get_error_trend_line : env_config.API.relative_analysis.GET_ERROR_TREND_LINE
    }

    $scope.dataSource = {
	    app_id : $scope.app_id,
        host_id:'',
        search_uri:$scope.search_uri,
        uri:$scope.uri,
        start_time:$scope.start_time,
        end_time:$scope.end_time,
    }
    $scope.$watchGroup(['start_time1', 'end_time1'], function (newval, oldval) {
       if(newval[0]){
           var start_time1 = new Date(newval[0]).getTime()
           var end_time1 = new Date(newval[1]).getTime()
           $.extend(true,$scope.dataSource,{
               start_time : start_time1,
               end_time : end_time1
           })
           constrastiveOne($scope.dataSource)
       }

    })
    $scope.$watchGroup(['start_time2', 'end_time2'], function (newval, oldval) {
        if(newval[0]){
            var start_time2 = new Date(newval[0]).getTime()
            var end_time2 = new Date(newval[1]).getTime()
            $.extend(true,$scope.dataSource,{
                start_time : start_time2,
                end_time : end_time2
            })
            constrastiveTwo($scope.dataSource)
        }

    })
    $.cookie('noChangeCookie',true)//代表时间插件选择日期时是否种cookie    true：不种cookie    false ：种cookie
    //事务列表点击事件
    $scope.businessClick =function (event,info) {
        $(event.currentTarget).parent('li').addClass('active').siblings().removeClass('active')
        if(info.type == 'key_uri'){
            $scope.search_uri = info.uri
            $scope.uri = ''

        }else{
            $scope.uri = info.uri
            $scope.search_uri = ''
        }
        $.extend(true,$scope.dataSource,{
            search_uri:$scope.search_uri,
            uri:$scope.uri
        })
    }
    //主机点击数事件
    $scope.hostClick1 = function (event,info) {
        $scope.host_id1 = info.host_id
        $.extend(true,$scope.dataSource,{
           host_id:info.host_id
        })
    }
    //主机点击数事件
    $scope.hostClick2 = function (event,info) {
        $scope.host_id2 = info.host_id
        $.extend(true,$scope.dataSource,{
            host_id:info.host_id
        })
    }
    //刷新
    $scope.frash1 = function () {
        constrastiveOne($scope.dataSource)
    }
    $scope.frash2 = function () {
        constrastiveTwo($scope.dataSource)
    }
    $scope.searchUri = function () {
        $.extend(true,$scope.dataSource,{
            name:$('#Search').val()
        })
        httpService.get(uri_map['get_uri_list'],$scope.dataSource).then(function (respon) {
            $scope.getURI = respon.data
        })
    }
    $('#Search').on('onkey',function () {
        $.extend(true,$scope.dataSource,{
            name:$('#Search').val()
        })
        httpService.get(uri_map['get_uri_list'],$scope.dataSource).then(function (respon) {
            $scope.getURI = respon.data
        })
    })
            
    httpService.get(uri_map['get_uri_list'],$scope.dataSource).then(function (respon) {
        $scope.getURI = respon.data
    })
    //获取主机列表
    httpService.get(uri_map['get_host_list'],$scope.dataSource).then(function (respon) {
        $scope.getHostList = respon.data
    })
    //请求数

    $scope.$watchGroup(['search_uri','uri'],function (newVal,oldVal) {
        console.log(newVal,oldVal)
        if(newVal[0] || newVal[1]){
            constrastiveOne($scope.dataSource)
            constrastiveTwo($scope.dataSource)
        }


    })
    $scope.$watchGroup(['host_id1'],function (newVal,oldVal) {
        if(newVal[0]){
            constrastiveOne($scope.dataSource)
        }


    })
    $scope.$watchGroup(['host_id2'],function (newVal,oldVal) {
        if(newVal[0]){
            constrastiveTwo($scope.dataSource)
        }

    })

    function constrastiveOne(dataSource) {
        requestCount1(dataSource)
        repTime1(dataSource)
        errorCount1(dataSource)
    }
    function constrastiveTwo(dataSource) {
        requestCount2(dataSource)
        repTime2(dataSource)
        errorCount2(dataSource)
    }
    
    function requestCount1(dataSource) {
        cAService.drawEcahrt('#requestCount1',uri_map['get_request_trend_line'],dataSource,{
            color:'#0FEAD9',
            colorStart:'rgba(15,234,217,1)',
            colorEnd:'rgba(15,234,217,0)',
            text:'请求数'
        })
    }
    function repTime1(dataSource) {
        cAService.drawEcahrt('#repTime1',uri_map['get_resp_time_trend_line'],dataSource,{
            color:'#0B78E3',
            colorStart:'rgba(11,120,227,1)',
            colorEnd:'rgba(11,120,227,0)',
            text:'平均响应时间'

        })
    }
    function errorCount1(dataSource) {
        cAService.drawEcahrt('#errorCount1',uri_map['get_error_trend_line'],dataSource,{
            color:'#F26D4F',
            colorStart:'rgba(242,109,79,1)',
            colorEnd:'rgba(242,109,79,0)',
            text:'错误数'

        })
    }

    function requestCount2(dataSource) {
        cAService.drawEcahrt('#requestCount2',uri_map['get_request_trend_line'],dataSource,{
            color:'#0FEAD9',
            colorStart:'rgba(15,234,217,1)',
            colorEnd:'rgba(15,234,217,0)',
            text:'请求数'

        })
    }
    function repTime2(dataSource) {
        cAService.drawEcahrt('#repTime2',uri_map['get_resp_time_trend_line'],dataSource,{
            color:'#0B78E3',
            colorStart:'rgba(11,120,227,1)',
            colorEnd:'rgba(11,120,227,0)',
            text:'平均响应时间'

        })
    }
    function errorCount2(dataSource) {
        cAService.drawEcahrt('#errorCount2',uri_map['get_error_trend_line'],dataSource,{
            color:'#F26D4F',
            colorStart:'rgba(242,109,79,1)',
            colorEnd:'rgba(242,109,79,0)',
            text:'错误数'

        })
    }

}])

MyApp.service('cAService',['$http',function ($http) {
    var config = {
        "count": "count",
        "time": "time",
        "error": "error"
    }
    var self = this

    this.drawEcahrt = function (dom,URL,params,setopt) {
        $(dom).echarts(function () {
            var opt = {
                type: 'line',
                data:function () {
                    return {
                        url: URL,
                        data: params,
                        method: 'get',
                        success: function (response) {
                            return response;
                        }
                    }
                },
                setOption : function (option) {
                    $.extend(true,option,{
                        color:[setopt.color],
                        title:{
                            text:setopt.text,
                            left: 'center',
                            textStyle:{
                                fontSize:14,
                                color:'#CDCBCB'
                            }
                        },
                        toolbox: {show: false},
                        legend: {
                            show: false
                        },
                        grid: {
                            y: 30,
                            left : '15%',
                            right :'5%',
                            height: 180
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
                                    return getIntShot(param);
                                }},
                                splitLine : {lineStyle: {opacity: 0.1},interval:16},
                                nameTextStyle : {color:"#9C9C9C",fontSize:12,align:'left',padding:10},
                                splitNumber : 5
                            }
                        ],
                        series:[
                            {
                                showSymbol:false,
                                smooth : true,
                                symbol:'none',
                            }
                        ],
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
                                        (p.seriesName == config['time'] ? 'ms' : '') + '</div>' +
                                        '</div>';
                                });
                                return str;
                            }
                        },
                    })
                    $.extend(true,option,{
                        series:[
                            {
                                lineStyle:{normal:{color:setopt.color,width:1}},
                                areaStyle:{
                                    normal:{
                                        color:{
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: setopt.colorStart // 0% 处的颜色
                                            }, {
                                                offset: 1, color: setopt.colorEnd // 100% 处的颜色
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


}])