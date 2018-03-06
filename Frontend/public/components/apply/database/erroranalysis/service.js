MyApp.service('erroranalysisService',['$compile','$http',function($compile,$http){
	
	self = this
	this.total_row = 0;
	this.second_total_row = 0;
	
	this.error_analysissql_list = []
	this.error_SecondSqlErrorList = []
	
	
	this.ErrorTrendUrl = env_config.API.APP_Relation_Unusual.ERROR_ANALYZE_TREND;  //数据库错误趋势图
   	this.ErrorListUrl = env_config.API.APP_Relation_Unusual.ERROR_ANALYZE_LIST;     //异常分析一级页面 SQL快照列表
   	this.SecondSqlErrorListUrl = env_config.API.APP_Relation_Unusual.ERROR_ANALYZE_SECOND_LIST;     //异常分析二级页面 SQL快照列表
   	this.SqlErrorCallerUrl = env_config.API.APP_Relation_Unusual.ERROR_ANALYZE_CALLER;           //异常分析二级页面   调用者占比
	this.create_export_fileUrl = env_config.API.APP_Relation_Db.CREATE_EXPORT_FILE //导出SQL列表

   
	
	//数据库错误趋势图
	this.getSqlErrorTrend = function (dataSource) {
		var URL = this.ErrorTrendUrl
		$('#databaseTrend').echarts(function (element) {
   			var opt = {
	   				type:['bar','line'] , 
					tooltip:["rpm","%"],
					data: function () {        //数据源，静态数据和ajax形式皆可
		                return {
		                    url: URL, 
		                    data: dataSource,
		                    method: 'get',
		                    success: function (response) {
		                        return response;
		                    }
		                }
		            }, 
		            setOption: function (option, result) {
		            		
//		            		option.legend.y = "85%";
		            		for (var i in option.series) {
	                        if (i<2) {
	                            option.series[i].stack = 'group2';
	                            option.series[i].type = 'bar';
	                            option.series[i].yAxisIndex = 0;
	
	                        } else {
//	                            option.series[i].stack = 'group1';
	                            option.series[i].type = 'line';
	                            option.series[i].yAxisIndex = 1;
	                        }
	
	                    }
		            		$.extend(true,option,{
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
		            				{
		            					smooth:true,
		            					symbol:'none',
		            					itemStyle : {normal:{color:'#ea4cc9'}},
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
		            				}
		            			],
		            			xAxis:[
		            				{
		            					axisLabel:{
		            						textStyle:{color:"#fff"}
		            					}
		            				}
		            			],
		            			yAxis:[
		            				{
		            					axisLine:{show: false},
		            					name : '次数           ',
		            					nameTextStyle : {color: "#9C9C9C"},
		            					splitNumber : 5,
		            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value} '},
		            					splitLine : {lineStyle:{opacity:0.1}}
		            				},
		            				{
		            					name : '           错误率',
		            					axisLine : {show: false},
		            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value} %'},
		            					splitLine : {lineStyle:{opacity:0}},
		            					nameTextStyle : {color: "#9C9C9C"}
		            				}
		            			],
		            		})
		            		
		            		return option
	   				}
	           }
   			return opt
   		})
	}
	//一级页面 SQL快照列表
	this.SqlErrorList = function (dataSource,callback) {
		 var URL = this.ErrorListUrl
		 $('#requestSlowestSql').find('.block-content').showLoading()
    		$('#requestSlowestSql').find('.block-content tbody').hide()
		 
		  $http.get(URL, {params:dataSource}).then(function(result){
		  	
		  	self.total_row = result.data.data.total_items
	        	self.error_analysissql_list = result.data.data.list
	        	$('#requestSlowestSql').find('.block-content').showLoading('hide')
		  	if(typeof result.data.data.list != 'object' || result.data.data.list.length < 1){
                $('#requestSlowestSql').find('.block-content').showNoData();
                $('#requestSlowestSql').find('.PageList').hide()
                return false;
            }
    			$('#requestSlowestSql').find('.block-content tbody').show()
		  	
            $('#requestSlowestSql').find('.PageList').show()
                
		  	
	  		if(typeof callback == "function"){
        			callback()
        		}
		  	
		  })
	}
	//二级页面 SQL快照列表
	this.SecondSqlErrorList = function (dataSource,callback) {
		var URL = this.SecondSqlErrorListUrl
	    $('#requestQuickSqlSencond').find('.block-content').showLoading()
    		$('#requestQuickSqlSencond').find('.block-content tbody').hide()
	    
       	$('#requestQuickSqlSencond').find('.PageList').hide()
		
		$http.get(URL, {params:dataSource}).then(function(result){
		  	self.second_total_row = result.data.data.total_items
	        	self.error_SecondSqlErrorList = result.data.data.list
	        	$('#requestQuickSqlSencond').find('.block-content').showLoading('hide')
		  	if(typeof result.data.data.list != 'object' || result.data.data.list.length < 1){
                $('#requestQuickSqlSencond').find('.block-content').showNoData();
                $('#requestQuickSqlSencond').find('.PageList').hide()
                return false;
            }
            $('#requestQuickSqlSencond').find('.PageList').show()
    			$('#requestQuickSqlSencond').find('.block-content tbody').show()
		  	
	  		if(typeof callback == "function"){
        			callback()
        		}
		  	
		 })
	}
	//调用者占比 TOP5
	this.SqlErrorCaller = function (dataSource) {
		var URL = this.SqlErrorCallerUrl
		$.ajax({
			type:"get",
			url:URL,
			data:dataSource,
			async:true,
			success:function(response){
				console.log(response)
				var datas = response.data
				$('#timeDistribution').echarts({
					type:"bar",
                    category:"y",
                    data:{labels:['调用者占比'],data:datas},
                    setOption:function(option){
                    		$.extend(true, option, {
                    			color:['#a9dbff','#9F35FF','#00cc99','#FF6B49','#FABB3D','#FF77FF','#ff0033','#C07AB8'],
                    			legend:{
                    				y:250,
                    				textStyle : {color:'#fff'}
                    			},
                    			grid:{y:10,y2:150},
                    			toolbox:{
                    				show : false
                    			},
                    			xAxis:[
                    				{
                    					max:100,
                    					axisLabel : {textStyle:{color:"#fff"},formatter:'{value} %'},
                    					splitLine : {lineStyle:{width:"0"}}
                    				}
                    			],
                    			yAxis:[
                    				{
                    					axisLabel : {textStyle:{color:"#fff"}},
                    					splitLine : {lineStyle:{width:"0.2"}}
                    				}
                    			],
                    			tooltip:{
                    				formatter : function (params, ticket, callback) {
		                        		return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+ params.color +'"></span>调用者:&nbsp;&nbsp;'+params.seriesName+'<br/>'+'耗时占比&nbsp;&nbsp;&nbsp;'+datas[params.seriesName][0]+'%<br/>'+'吞吐率&nbsp;&nbsp;&nbsp;'+datas[params.seriesName][1]+'ms<br/>'+'每分钟调用次数&nbsp;&nbsp;&nbsp;'+datas[params.seriesName][2]+'cpm<br/>'
		                        }
                    			}
                    		});

                        for(var i in option.series){
                            option.series[i].stack = 'group1';
                            option.series[i].barWidth=76;
                            var percent=option.series[i].data[0];
			                option.series[i].data=[];
			                option.series[i].data[0]=percent;
                        }
                        return option;
                    }
				})
			}
		});
	}
	this.initChartData = function (dataSource) {
		this.getSqlErrorTrend(dataSource)
	}
	//下载SQL列表
	this.downloadSQL = function(dataSource){
		var URL = this.create_export_fileUrl
        $http.get(URL, {params:dataSource}).then(function(result){
        		if(result.data.code == '1000'){
        			window.location = result.data.data
        		}
        		
        })
	}
	
}])