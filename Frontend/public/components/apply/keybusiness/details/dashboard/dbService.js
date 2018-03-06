MyApp.service('dbService',['$compile','$http','keybusinessService',function($compile,$http,keybusinessService){

	var self =this

	this.allTime = ''
	this.getCodeRespList =''



	//API
	this.get_profiling_statistical_indicators = env_config.API.key_transaction_list.GET_PROFILING_STATISTICAL_INDICATORS // 概要分析 顶部时间指标
	this.get_profiling_single_url_statistical_indicatorst = env_config.API.key_transaction_list.GET_PROFILING_SINGLE_URL_STATISTICAL_INDICATORST // 概要分析 顶部贡献值等详细信息
	this.get_profiling_request_statistics = env_config.API.key_transaction_list.GET_PROFILING_REQUEST_STATISTICS//请求统计
	this.get_profiling_error_and_exception_trend_chart = env_config.API.key_transaction_list.GET_PROFILING_ERROR_AND_EXCEPTION_TREND_CHART
    this.get_profiling_apdex_analysis_trend_chart = env_config.API.key_transaction_list.GET_PROFILING_APDEX_ANALYSIS_TREND_CHART//概要分析 事务Apdex分析
	this.get_profiling_resp_time_and_count_data_mixed = env_config.API.key_transaction_list.GET_PROFILING_RESP_TIME_AND_COUNT_DATA_MIXED


	//获取概要分析 代码执行时间/数据库调用时间/第三方调用时间
	this.getCodeResp = function(submitData,callback){

		var URL = this.get_profiling_statistical_indicators
		$http.get(URL,{params:submitData}).then(function(response){
            self.allTime = response.data
			if(typeof callback == 'function'){
				callback()
			}
		})
	}
	//代码执行时间 方法列表
	this.getCodeRespListFN = function(submitData,callback){
		var URL = this.get_profiling_single_url_statistical_indicatorst
		$http.get(URL,{params:submitData}).then(function(response){
			self.getCodeRespList = response.data

			if(typeof callback == 'function'){
				callback()
			}
		})
	}
	//方法详情
	this.methodDetail = function(submitData,callback){
		var URL = ''
		$http.get(URL,{params:submitData}).then(function(response){
			if(typeof callback == 'function'){
				
			}
		})
	}
	//响应时间和请求数
	this.respTimeAndCount = function (submitData,callback) {
		var URL = this.resp_and_rpm_trend
		$('#respTimeAndCount').echarts(function(){
			var opt={
					type: ['bar', 'line'],
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
	                setOption : function(option){
	                		for (var i in option.series) {
	                        if (i<4) {
	                            option.series[i].stack = 'group2';
	                            option.series[i].type = 'bar';
	                            option.series[i].yAxisIndex = 0;
	
	                        } else {
	                            option.series[i].type = 'line';
	                            option.series[i].yAxisIndex = 1;
	                        }
	
	                    }
		            		$.extend(true,option,{
                    			color:['#E66948','#E8C000','#7BD400','#EC3E18','#0FC9EA'],
		            			
		            			legend:{
		            				y:"85%",
		            				textStyle : {color:'#fff'}
		            			},
		            			grid:{
		            				y : 40,
								height : 200
		            			},
		            			tooltip:{
		            				trigger:'axis',
		            				formatter:function(params){
		            					var str = '<span style="display:block;">'+ params[0].axisValue +'</span><table>'
				            			$.each(params,function(i,v){
				            				if(v.seriesName == "normalRpm"){
				            					var unit = '/min';
				            				}else if(v.seriesName == "errorRpm"){
											var unit = '/min';	
				            				}else{
											var unit = '%';
				            				}
		                           		 str += '<tr><td style="width:120px;"><span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':</td><td style="text-align:right;padding;0 5px">' + v.value + unit + '</td></tr>';
				            			})
				            			
				            			return str+"</table>"
		            				}
		            			},
		            			series:[
		            			{
		            				itemStyle : {normal:{color:'#7ed221'}},
		            				barWidth : 20
		            			},{
		            				itemStyle : {normal:{color:'#ff8235'}}
		            			},
		            			{},{},
		            				{
		            					smooth:true,
		            					symbol:'none',
		            					zlevel:-1,
		            					itemStyle : {normal:{color:'#0FC9EA'}},
		            					lineStyle : {normal:{color:'#0FC9EA',width:1}},
		            					areaStyle : {
										normal: {
											color: new echarts.graphic.LinearGradient(
												0, 0, 0, 1,
												[
													{offset: 0, color: 'rgba(15,201,234,1)'},
													{offset: 0.5, color: 'rgba(15,201,234,0.3)'},
													{offset: 1, color: 'rgba(15,201,234,0.1)'}
												]
											)
										}
									}
		            				}
		            			],
		            			xAxis:[
		            				{
		            					axisLabel:{
		            						textStyle:{color:"#9C9C9C"}
		            					}
		            				}
		            			],
		            			yAxis:[
		            				{
		            					axisLine:{show: false},
		            					name : '次数           ',
		            					nameTextStyle : {color: "#9C9C9C"},
		            					splitNumber : 5,
		            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value} 次'},
		            					splitLine : {lineStyle:{opacity:0.1}}
		            				},
		            				{
		            					name : '           时间',
		            					axisLine : {show: false},
		            					splitNumber : 5,
		            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value} s'},
		            					splitLine : {lineStyle:{opacity:0}},
		            					nameTextStyle : {color: "#9C9C9C"}
		            				}
		            			]
		            		})
	                		return option
	                }
				}
			return opt
		})
	}
	//请求统计
	this.requestCount = function (submitData,callback) {

		var URL = this.get_profiling_request_statistics
		$http.get(URL,{params:submitData}).then(function(respon){
			self.requestCountDetail =respon
			if(typeof callback == 'function'){
				callback()
			}
		})
	}
	//事务错误率和异常率
	
	this.errorAndException = function (submitData,callback) {
		$('#errorAndException').echarts(function(){
			var URL = self.get_profiling_error_and_exception_trend_chart
			var opt={
				type: 'line',
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
				setOption:function(option){
					$.extend(true, option, {
						color:['#F26D4F','#8B09B5'],
						legend:{
	            				y:"85%",
	            				textStyle : {color:'#fff'}
	            				
	            			},
	            			grid:{
	            				y : 40,
							height : 200
	            			},
	            			tooltip:{
	            				trigger:'axis',
	            				formatter:function(params){
	            					var str = '<span style="display:block;">'+ params[0].axisValue +'</span><table>'
			            			$.each(params,function(i,v){
			            				if(v.seriesName == "normalRpm"){
			            					var unit = '/min';
			            				}else if(v.seriesName == "errorRpm"){
										var unit = '/min';	
			            				}else{
										var unit = '%';
			            				}
	                           		 str += '<tr><td style="width:120px;"><span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':</td><td style="text-align:right;padding;0 5px">' + v.value + unit + '</td></tr>';
			            			})
			            			
			            			return str+"</table>"
	            					
	            				}
		            		},
	            			xAxis:[
	            				{
	            					axisLabel:{
	            						textStyle:{color:"#9C9C9C"}
	            					}
	            				}
		            		],
		            		yAxis:[
	            				{
	            					axisLine:{show: false},
	            					name : '百分比           ',
	            					nameTextStyle : {color: "#9C9C9C"},
	            					splitNumber : 5,
	            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value} %'},
	            					splitLine : {lineStyle:{opacity:0.1}}
	            				}
	            			],
	            			series:[
	            				{
	            					smooth:true,
	            					symbol:'none',
	            					zlevel:-1,
	            					lineStyle : {normal:{color:'#F26D4F',width:1}},
	            					areaStyle : {
									normal: {
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: 'rgba(242,109,79,1)'},
												{offset: 0.5, color: 'rgba(242,109,79,0.3)'},
												{offset: 1, color: 'rgba(242,109,79,0)'}
											]
										)
									}
								}
	            				},
	            				{
	            					smooth:true,
	            					symbol:'none',
	            					zlevel:-1,
	            					lineStyle : {normal:{color:'#8B09B5',width:1}},
	            					areaStyle : {
									normal: {
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: 'rgba(139,9,181,1)'},
												{offset: 0.5, color: 'rgba(139,9,181,0.3)'},
												{offset: 1, color: 'rgba(139,9,181,0)'}
											]
										)
									}
								}
	            				}
	            			]
		            			
	            			
					});
					return option
					
				}
			}
			return opt
		})
	}
	//事务Apdex分析
	this.Apdex = function (submitData) {
		$('#Apdex').echarts(function(){
			var URL = self.get_profiling_apdex_analysis_trend_chart
			var opt={
				type: 'line',
				data:function () {        //数据源，静态数据和ajax形式皆可
                    return {
                        url: URL,
                        data: submitData,
                        method: 'get',
                        success: function (response) {
                            return response;
                        }
                    }
                },
				setOption:function(option){
					$.extend(true, option, {
						legend:{
	            				y:"85%",
	            				textStyle : {color:'#fff'}
	            			},
	            			grid:{
	            				y : 40,
							height : 200
	            			},
	            			tooltip:{
	            				trigger:'axis',
	            				formatter:function(params){
	            					var str = '<span style="display:block;">'+ params[0].axisValue +'</span><table>'
			            			$.each(params,function(i,v){
			            				if(v.seriesName == "normalRpm"){
			            					var unit = '/min';
			            				}else if(v.seriesName == "errorRpm"){
										var unit = '/min';	
			            				}else{
										var unit = '%';
			            				}
	                           		 str += '<tr><td style="width:120px;"><span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':</td><td style="text-align:right;padding;0 5px">' + v.value + unit + '</td></tr>';
			            			})
			            			
			            			return str+"</table>"
	            					
	            				}
		            		},
	            			xAxis:[
	            				{
	            					axisLabel:{
	            						textStyle:{color:"#9C9C9C"}
	            					}
	            				}
		            		],
		            		yAxis:[
	            				{
	            					axisLine:{show: false},
	            					name : 'Apdex值           ',
	            					nameTextStyle : {color: "#9C9C9C"},
	            					splitNumber : 5,
	            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value} %'},
	            					splitLine : {lineStyle:{opacity:0.1}}
	            				}
	            			],
	            			series:[
	            				{
	            					smooth:true,
	            					symbol:'none',
	            					zlevel:-1,
	            					itemStyle : {normal:{color:'#0FC9EA'}},
	            					lineStyle : {normal:{color:'#0075E6',width:1}},
	            					areaStyle : {
									normal: {
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: 'rgba(0,117,230,1)'},
												{offset: 0.5, color: 'rgba(0,117,230,0.3)'},
												{offset: 1, color: 'rgba(0,117,230,0.1)'}
											]
										)
									}
								}
	            				}
	            			]
		            			
	            			
					});
					return option
					
				}
			}
			return opt
		})
	}

    // 绘制响应时间和请求数图表
    this.drawRespTimeChart = function (percent,info) {
        keybusinessService.drawRequestOfResponse('respTimeAndCount', self.get_profiling_resp_time_and_count_data_mixed, {
            percent: percent,
            uri : info.uri,
            app_id : info.app_id
        });
    }

	
}])