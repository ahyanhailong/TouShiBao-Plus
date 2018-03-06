MyApp.service('accountInfoService',['$http','httpService',function ($http,httpService) {

    var self = this
    //个人中心 用户信息
    this.get_user_info = env_config.API.PersonalInfo.GET_USER_INFO
    this.get_quota_left = env_config.API.PersonalInfo.GET_QUOTA_LEFT
    this.get_moudle_quota = env_config.API.PersonalInfo.GET_MOUDLE_QUOTA
    this.get_moudle_over_time = env_config.API.PersonalInfo.GET_MOUDLE_OVER_TIME
    this.send_reset_email = env_config.API.PersonalInfo.SEND_RESET_EMAIL
    this.reset_email = env_config.API.PersonalInfo.RESET_EMAIL
    this.ModifyUserName = env_config.API.PersonalInfo.MODIFY_USER_NAME


    this.getUserInfo = function (dataSource) {
        var URL = self.get_user_info
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }

    this.getQuotaleft = function (dataSource) {
        var URL = self.get_quota_left
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }

    this.sendResetRmail = function (dataSource) {
        var URL = self.send_reset_email
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    this.resetEmail = function (dataSource) {
        var URL = self.reset_email
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    
    this.ModifyUserNameFn = function (dataSource) {
        var URL = self.ModifyUserName
        return httpService.get(URL,dataSource).then(function (respon) {
          return respon
        })
    }
    
    //模块使用期限
    this.getMoudleOverTime = function (dataSource) {
        var URL = self.get_moudle_over_time
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }


    //模块使用期限 echart
    this.getMoudleOverTimeChart = function (dom,rate,numRate) {
        var myChart = echarts.init(document.getElementById(dom));

        option = {
            graphic:{
                type:'text',
                left:'center',
                top:'center',
                z:2,
                zlevel:100,
                style:{
                    text:numRate +'\n\n(单位:天)',
                    left:100,
                    top:100,
                    textAlign:'center',
                    fill:'#fff',
                    width:30,
                    height:30
                }
            },
            series : [
                {
                    type: 'gauge',
                    startAngle: 225,
                    endAngle: -45,
                    center: ['50%', '55%'],    // 默认全局居中
                    min:0,
                    max:2,
                    radius:'100%',
                    pointer:{
                        show:false
                    },
                    axisLabel: {
                        formatter:function(v){
                            switch (v + '') {
                                case '0' : return '0';
                                case '2' : return '100%';
                            }
                        },
                        textStyle: {
                            color: "#CDCBCB",
                            fontSize: 10,
                            fontWeight: "bolder"
                        },
                        distance:-10
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [rate, "#FF8235"],
                                [1, "#343434"]
                            ],
                            width: 20
                        }
                    },
                    axisTick: {
                        "lineStyle": {
                            "color": "#3bb4f2",
                            width: 16
                        },

                        "length": 0,
                        "splitNumber": 1
                    },
                    splitLine: {
                        show: false
                    },
                    detail: {
                        show: false
                    }
                },{
                    type: 'pie',
                    radius:'50%',
                    hoverAnimation:false,
                    labelLine:{
                        normal:{
                            show: false
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#343434'
                        }
                    },
                    data:[
                        {
                            value:335,
                        }
                    ],
                }
            ]
        }

        myChart.setOption(option);
    }


    this.getMoudleQuota = function (dataSource,callback) {
        var URL = self.get_moudle_quota
        $('#tableList').table({
            data: function (sort, order) {
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
            },
            loop: function (item, tr) {
                if (item.key == 'mobile_used') {
                    if(tr.mobile_used > tr.mobile_quota){
                        return '<td class="text-ellipsis"><span class="color-orange">' + item.value + '</span>人</td>';

                    }else{
                        return '<td class="text-ellipsis"><span class="color-green">' + item.value + '</span>人</td>';

                    }
                }else if(item.key == 'ue_used'){
                    return '<td class="text-ellipsis"><span class="color-green">' + item.value + '</span>人</td>';
                }else if(item.key == 'ue_used'){
                    return '<td class="text-ellipsis"><span class="ue_excess">' + item.value + '</span>人</td>';

                }
            }
        })
    }
}])