MyApp.service('timeanalysisService',['$compile','$http',function($compile,$http){
	var self = this;
	//分页变量
	this.total_row = 0;
	this.second_total_row = 0;
	
	this.time_analysissql_list = []
	this.time_analysis_snap_list = []
	
	this.wt_to = ''
	this.wt_from = ''
	
	
	this.DbTrendURL = env_config.API.APP_Relation_Db.TIME_TREND_LINE_CHATY;        //数据库趋势图表URL
    this.TimeDistribution = env_config.API.APP_Relation_Db.TIME_DISTRIBUTE_BAR;  //时间分布图 URL
    this.SqlList = env_config.API.APP_Relation_Db.TIME_SQL_LIST;                 // SQL列表
    this.DbCallerURL = env_config.API.APP_Relation_Db.TIMW_SQL_DBCALLE;              //调用者占比
    this.SqQueslList = env_config.API.APP_Relation_Db.TIME_SQL_UNIQUESQLLIST;   //SQL快照列表
	this.create_export_file = env_config.API.APP_Relation_Db.CREATE_EXPORT_FILE //导出SQL列表
   
   
   //数据库趋势图 曲线
    this.getOverDbTrendLine = function (submitData) {
    		var URL = this.DbTrendURL
        $('#databaseTrend').echarts(function (element) {
            var opt = {
//                  type: ['bar', 'line'],
                type: ['line', 'bar'],
                tooltip: ["ms", "cpm"],
                data: function () {        //数据源，静态数据和ajax形式皆可
                    return {
                        url: URL,
                        data: submitData,
                        method: 'get',
                        success: function (response) {
                            return response;
                        }
                    }
                },
                setOption: function (option, result) {
                		$.extend(true,option,{
                			toolbox : {show: false},
                			legend:{
                				y : "85%",
                				textStyle : {color: '#fff'}
                			},
                			grid:{
                				y : 40,
                				height : 200
                			},
                			tooltip:{
                				trigger: 'axis',
                				formatter : function (params) {
		                        var str = '';
		                        $.each(params, function (i, v) {
		                            if (v.seriesType == 'bar') {
		                                var unit = 'min';
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
                					axisLabel : {textStyle: {color: "#9C9C9C"},formatter: function (param) {
			                        return getTimeShot(param);
			                    }},
			                    splitLine : {lineStyle: {opacity: 0.1},interval:16},
			                    name : '时间           ',
			                    nameTextStyle : {color:"#9C9C9C",fontSize:12,align:'left',padding:10},
			                    splitNumber : 5
                				},
                				{
                					axisLabel : {textStyle: {color: "#9C9C9C"}, formatter: '{value} cpm'},
                					splitLine : {lineStyle: {opacity: 0}},
                					axisLine : {show: false},
                					nameTextStyle : {color:"#9C9C9C",fontSize:12,align:'right'},
                					name : '           吞吐率',
                					splitNumber : 5
                				}
                			],
                			series:[
                				{
                					smooth : true,
                					symbol : 'none',
                					itemStyle : {normal: {color: '#75472a'}},
                					lineStyle : {normal: {color: "#E47733", opacity: 0.7}},
                					areaStyle : {
			                        normal: {
							            color: new echarts.graphic.LinearGradient(
							                0, 0, 0, 1,
							                [
							                    {offset: 0, color: '#E47733'},
							                    {offset: 0.5, color: '#593b28'},
							                    {offset: 1, color: '#2f2723'}
							                ]
							            )
							        }
			                    }
                				},
                				{
                					itemStyle : {normal: {color: '#0fc9ea'}},
                					barWidth : 10
                				}
                			]
                			
                		})
                    return option
                }
            }
            return opt
        })
    }
    //时间分布
    this.getTimeDistributionLine = function (submitData,callback) {
    		var URL = this.TimeDistribution
        $('#timeDistribution').echarts(function (element) {
            var opt = {
                type: 'bar',
                data: function () {        //数据源，静态数据和ajax形式皆可
                    return {
                        url: URL,
                        data: submitData,
                        method: 'get',
                        success: function (response) {
                            return response;
                        }
                    }
                },
                setOption: function (option, result) {
                		$.extend(true, option, {
                			toolbox:{show: false},
                			legend:{
                				y : "85%",
                				textStyle : {color: '#9C9C9C'}
                			},
                			grid:{
                				y : 40,
                				height : 200
                			},
                			tooltip:{
                				trigger: 'axis'
                			},
                			xAxis:[
                				{
                					axisLabel : {textStyle: {color: "#9C9C9C"}},
                				}
                			],
                			yAxis:[
                				{
                					axisLabel : {textStyle: {color: "#9C9C9C"}},
                					splitLine : {lineStyle: {opacity: 0.1}},
                					axisLine : {show: false},
                					splitNumber : 5,
                					name : '次数           ',
                					axisLabel : {textStyle: {color: "#9C9C9C"}, formatter: function (param) {
			                        return getIntShot(param)+'  次';
			                    }},
			                    nameTextStyle : {color: "#9C9C9C",verticalAlign:'bottom'}
                				}
                			],
                			series:[
                				{
                					itemStyle : {normal: {color: '#0FEAD9',barWidth:20}},
                					barWidth : 20
                				}
                			]
                		});
					
                    return option
                },
                click: function(opt){
                    var p = opt.name.split('-');
                    var wt_from = p[0]
                    var wt_to = p[1].split('ms')[0]
					var resptime = [wt_from,wt_to]
					if(typeof callback == 'function'){
						callback(resptime)
					}
//

                }
            }
            return opt
        })
    }
    //SQL table列表
    this.getAllSqlList = function (submitData,callback) {
    		var URL = this.SqlList
    		$('#requestSlowestSql').find('.block-content').showLoading()
    		$('#requestSlowestSql').find('.block-content tbody').hide()
        submitData.regexp = getInputRealValue($('#requestSlowestSql .filter_search input'))
        $http.get(URL, {params:submitData}).then(function(result){
        		self.total_row = result.data.data.total_items
        		self.time_analysissql_list = result.data.data.list
        		if(typeof result.data.data.list != 'object' || result.data.data.list.length < 1){
                $('#requestSlowestSql').find('.block-content').showNoData();
                $('#requestSlowestSql').find('.PageList').hide()
                return false;
            }
    			$('#requestSlowestSql').find('.block-content').showLoading('hide')
    			$('#requestSlowestSql').find('.block-content tbody').show()
    			$('#requestSlowestSql').find('.PageList').show()
        		if(typeof callback == "function"){
        			callback()
        		}
        		
        })
    }
    //SQL快照列表
    this.requestQuickSql = function (submitData,callback) {
    		var URL = this.SqQueslList
    		$('#requestQuickSql').find('.block-content').showLoading()
    		$('#requestQuickSql').find('.block-content tbody').hide()
    		$http.get(URL, {params:submitData}).then(function(result){
        		console.log(result)
        	
        		self.second_total_row = result.data.data.total_items
        		self.time_analysis_snap_list = result.data.data.list
        		if(typeof result.data.data.list != 'object' || result.data.data.list.length < 1){
                $('#requestQuickSql').find('.block-content').showNoData();
                $('#requestQuickSql').find('.PageList').hide()
                return false;
            }
    			$('#requestQuickSql').find('.block-content').showLoading('hide')
    			$('#requestQuickSql').find('.block-content tbody').show()
    			$('#requestQuickSql').find('.PageList').show()
        		if(typeof callback == "function"){
        			callback()
        		}
        		
        })

    }
    //调用者占比
    this.DbCaller = function (submitData) {
		var URL = this.DbCallerURL   	
        $.ajax({
            type: "get",
            url: URL,
            data: submitData,
            async: true,
            success: function (response) {
                var datas = response.data
                $('#requestUsersPrecent').echarts({
                    type: "bar",
                    category: "y",
                    data: {labels: ['调用占比'], data: datas},
                    setOption: function (option) {
                    		$.extend(true,option,{
                    			color : ['#a9dbff', '#9F35FF', '#00cc99', '#FF6B49', '#FABB3D', '#FF77FF', '#ff0033', '#C07AB8'],
                    			toolbox:{
                    				show : false
                    			},
                    			grid : {
                    				y: 10,
                    				y2: 150
                    			},
                    			legend:{
                    				y : '250',
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
                        for (var i in option.series) {
                            option.series[i].stack = 'group1';
                            option.series[i].barWidth = 76;
                            var percent = option.series[i].data[0]
                            option.series[i].data = []
                            option.series[i].data[0] = percent
                        }
                        return option;
                    }
                });
            }
        })
    }
    this.initChartData = function (dataSource,callback) {
        this.getOverDbTrendLine(dataSource)
        this.getTimeDistributionLine(dataSource,callback)
    }
	this.addCondition=  function (info, default_value) {
//  		config[info.type]["typeName"] = info.typeName
//  		config[info.type]["type"] = info.type
       	if($scope.conditions[info.type]){
             $('#overview_filter li[data-type='+ info.type +']').addClass('open').siblings().removeClass('open')
       		
       	}else{
       		var URL = $scope.GetFilterElementForDb+"?app_id="+$scope.app_id+"&start_time="+$scope.start_time+'&end_time='+$scope.end_time+"&field="+info.type
			$scope.addFilter(URL,info.type)
       	}
       
        //初始化待选数据的回调
        if(callback[info.type] != undefined){
          $scope.conditions[info.type]['list'] = callback[info.type]();
        }

        //初始化默认值
        if(default_value != undefined){
            conditions[info.type] = default_value;
        }
		
        $scope.$apply();
    }
	//下载SQL列表
	this.downloadSQL = function(dataSource){
		var URL = this.create_export_file
        $http.get(URL, {params:dataSource}).then(function(result){
        		if(result.data.code == '1000'){
        			window.location = result.data.data
        		}
        		
        })
	}
	
}])