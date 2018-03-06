MyApp.service('snapshootService',['$http',function($http){

	var self = this
	//API
	var host = env_config.HOST_ADDRESS

	this.get_snap_analysis_time_distribution_line = env_config.API.key_transaction_list.GET_SNAP_ANALYSIS_TIME_DISTRIBUTION_LINE

	this.get_snap_analysis_sql_snap_list = env_config.API.key_transaction_list.GET_SNAP_ANALYSIS_SQL_SNAP_LIST

	this.respTimeParcel = function (submitData) {
		var URL = self.get_snap_analysis_time_distribution_line
		$('#respTimeParcel').echarts(function(){
			var opt={
					type: 'bar',
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
						color:['#0FEAD9'],
						legend:{
	            				y:"85%",
	            				textStyle : {color:'#fff'}
	            				
	            			},
	            			grid:{
	            				y : 40,
							height : 200
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
	            					name : '次数           ',
	            					nameTextStyle : {color: "#9C9C9C"},
	            					splitNumber : 5,
	            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value} 次'},
	            					splitLine : {lineStyle:{opacity:0.1}}
	            				}
	            			],
	            			tooltip:{
	            				trigger:'axis',
	            				formatter:function(params){
	            					var str = '<span style="display:block;">'+ params[0].axisValue +'</span><table>'
			            			$.each(params,function(i,v){
	                           		 str += '<tr><td style="width:120px;"><span style="display:inline-block;margin-right:5px;border-radius:2px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':</td><td style="text-align:right;padding;0 5px">' + v.value + '个</td></tr>';
			            			})
			            			
			            			return str+"</table>"
	            					
	            				}
		            		},
		            		series:[
	            				{
	            					barWidth: 20,
	            				}
	            			]
					});
					return option
				}
			}
			return opt
		})
	}
	//快照分析 快照列表
	this.getSqlSnapList = function (dataSource,callback) {
		var URL = self.get_snap_analysis_sql_snap_list
        $http.get(URL,{params:dataSource}).then(function (respon) {

			if(typeof callback == 'function'){
				callback(respon)
			}
        })

    }
	
}])