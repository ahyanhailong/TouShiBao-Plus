/**
 * 事务分析 默认页面响应事件
 */
MyApp.service('mainService', [
    'httpService', 'dateTimeService', 'businessService', '$state',
    function (httpService, dateTimeService, businessService, $state) {

        var config = this.config = {
            "normal": "正常(<500)",
            "slow": "缓慢(500-2000)",
            "very_slow": "非常慢(>2000)",
            "error_count": "错误数",
            "error": "错误数",
            "resp_time": "平均响应时间",
            "five_percent": "5%缓慢",
            "ten_percent": "10%缓慢",
            "error_count": "错误数",
        };
        var baseColor = ['#E66948', '#E8C000', '#7BD400', '#D22600', '#12B7D5', '#4FABFC'];

        var time = dateTimeService.getTime();

        //  响应时间和请求数
        var resptime_and_rpm = this.resptime_and_rpm = env_config.API.BusinessAnalysis.GET_OVERVIE_RESP_AND_RPM_TREND_CHART;
        //  响应时间和请求数-弹窗
        var resptime_modal = this.resptime_modal = env_config.API.BusinessAnalysis.GET_OVERVIEW_TRANSACTION_POP_LIST;
        //请求数按响应时间分布
        var request_distribution = this.request_distribution = env_config.API.BusinessAnalysis.GET_OVERVIEW_REQUEST_DISTRBUTION_PIE;
        //事务列表
        var transaction_list = this.transaction_list = env_config.API.BusinessAnalysis.GET_OVERVIEW_TRANSACTION_LIST;

        /*function makeRespModal(index, type) {
         if (index && type) {
         $('#transactionList').table(function () {
         var data = {
         app_id: appId,
         start_time: time.start,
         end_time: time.end,
         page: opt.currentPage || 1,
         page_size: opt.perPage,
         type: type,
         index: index
         };

         return {
         data: function (sort, order) {
         data.sort = sort;
         data.order = order;

         return {
         url: resptime_modal,
         data: data,
         method: 'get',
         success: function (result) {
         return result.data.list;
         }
         }
         },
         loop: function (item, tr) {
         if (item.key == 'req_uri') {
         return '<td class="text-ellipsis"><a href="#/navigation/apply/business/details/dashboard/' + encodeURIComponent(encodeURIComponent(item.value)) + '" class="business-details">' + item.value + '</a></td>';
         }
         }
         }
         });
         }
         }*/

        // 绘制响应时间和请求数图表
        this.drawRespTimeChart = function (percent, modal) {
            businessService.drawRequestOfResponse('respTimeChart', resptime_and_rpm, {
                percent: percent
            }, function (params) {
                if (typeof modal == 'function') {
                    modal(params.dataIndex, params.data._addinfo);
                }
            });
        };

        // 绘制请求数按响应时间分布
        this.drawRequestDist = function () {
            var chart = echarts.init($('#requestDisChart')[0]);

            var baseSeries = {
                type: 'pie',
                name: '请求数',
                selectedMode: 'single',
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false,
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: []
            };

            var option = {
                color: baseColor,
                title: {
                    text: '',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                        color: "#c1dbfd"
                    }
                },
                tooltip: {
                    formatter: function (params) {
                        return params.seriesName + '<br>' + config[params.name] + ': ' + params.value + '次'
                    }
                },
                series: [
                    //内环
                    $.extend(true, {}, baseSeries, {
                        radius: ['45%', '60%'],
                        zlevel: 1
                    }),
                    //外环
                    $.extend(true, {}, baseSeries, {
                        radius: ['45%', '65%'],
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        zlevel: 0
                    })
                ]
            };

            httpService.get(request_distribution, {}).then(function (result) {

                var count = 0; // 总次数

                for (var m in result.data) {
                    var d = {
                        name: m,
                        value: result.data[m]
                    };
                    count += (result.data[m] - 0);
                    option.series[0].data.push(angular.copy(d));
                    option.series[1].data.push(angular.copy(d));
                }

                chart.setOption(option);

                // 轮训显示各个指标
                var outData = option.series[1].data;
                var length = outData.length;
                var selectedId = 0;// 当前显示索引

                if (outData && outData.length) {
                    setInterval(function () {
                        var i = selectedId % length;

                        outData.map(function (d) {
                            if (d.itemStyle) delete d.itemStyle;
                        });
                        outData[i].itemStyle = {
                            normal: {
                                opacity: 0.3
                            }
                        };
                        selectedId = selectedId + 1;

                        option.title.text = (outData[i].value / count * 100).toFixed(2) + '%\r\n' +
                            config[outData[i].name];
                        option.title.textStyle.color = baseColor[i];
                        chart.setOption(option);

                    }, 1000)
                }


            });

        };

        // 获取事务列表
        this.getTransactionList = function (opt) {
            var appId = $state.params.app_id;
            $('#transactionList').table(function () {
                var data = {
                    app_id: appId,
                    start_time: time.start,
                    end_time: time.end,
                    page: opt.currentPage || 1,
                    page_size: opt.perPage,
                    search_uri: opt.searchUri
                };

                return {
                    data: function (sort, order) {
                        data.sort = sort;
                        data.order = order;

                        return {
                            url: transaction_list,
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
                        if (item.key == 'uri') {
                            return '<td class="text-ellipsis"><a href="#/navigation/apply/business/details/dashboard/' + appId + '/' + encodeURIComponent(encodeURIComponent(item.value)) + '" class="business-details">' + item.value + '</a></td>';
                        }
                    }
                }
            });
        }


    }]);