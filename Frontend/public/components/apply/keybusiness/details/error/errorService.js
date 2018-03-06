MyApp.service('errorService',['$http','keybusinessService','dateTimeService','$state',function($http,keybusinessService,dateTimeService,$state){
	var self= this

    var appId = $state.params.app_id;
    var time = dateTimeService.getTime();
	//API
    var host = env_config.HOST_ADDRESS
	this.get_error_analysis_error_and_exception_trend_chart = env_config.API.key_transaction_list.GET_ERROR_ANALYSIS_ERROR_AND_EXCEPTION_TREND_CHART
	this.get_error_analysis_error_rate_pie = env_config.API.key_transaction_list.GET_ERROR_ANALYSIS_ERROR_RATE_PIE

	this.get_error_analysis_exception_rate_pie = env_config.API.key_transaction_list.GET_ERROR_ANALYSIS_EXCEPTION_RATE_PIE
    //错误列表
	this.transaction_list = env_config.API.key_transaction_list.GET_ERROR_ANALYSIS_ERROR_LIST;
    //异常列表
	this.get_error_analysis_exception_list = env_config.API.key_transaction_list.GET_ERROR_ANALYSIS_EXCEPTION_LIST

    //错误和异常趋势
	this.errorTrend = function(submitData){
		var URL = self.get_error_analysis_error_and_exception_trend_chart
		$('#errorTrend').echarts(function(){
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
						color:['#EC3E18','#8B09B5'],
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
	            					name : '个数           ',
	            					nameTextStyle : {color: "#9C9C9C"},
	            					splitNumber : 5,
	            					axisLabel : {textStyle:{color:"#9C9C9C"},formatter:'{value}'},
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
	            					barGap: 0,
	            				}
	            			]
					});
					return option
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

        keybusinessService.drawPie(id, result, {
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

		var URL = self.get_error_analysis_error_rate_pie
		$http.get(URL,{params:dataSource}).then(function (result) {
            drawPie('errorScale',result.data)
        })
	}
	//异常占比
	this.abnormalScale = function(dataSource){
        var URL = self.get_error_analysis_exception_rate_pie
        $http.get(URL,{params:dataSource}).then(function (result) {
            drawPie('abnormalScale',result.data)
        })
	}
	//错误|异常列表
	this.errorList = function (opt,url) {
        $('#errorList').table(function () {
            var data = {
                app_id: appId,
                start_time: time.start,
                end_time: time.end,
                page: opt.currentPage || 1,
                page_size: opt.perPage,
                uri:opt.uri,
                search_uri: opt.searchUri,
                exception:opt.exception
            };

            return {
                data: function (sort, order) {
                    data.sort = sort;
                    data.order = order;

                    return {
                        url: url,
                        data: data,
                        method: 'get',
                        success: function (result) {
                            if (typeof opt.success == 'function') {
                                opt.success(result.data);
                            }

                            return result.data.list;
                        }
                    }
                },
                loop: function (item, tr) {
                    if (item.key == 'event') {
                        return '<td class="text-ellipsis" style="text-align: center"><a href="#/navigation/apply/business/details/dashboard/' + encodeURIComponent(encodeURIComponent(item.value)) + '" class="business-details">' + item.value + '</a></td>';
                    }
                }
            }
        });
    }

}])