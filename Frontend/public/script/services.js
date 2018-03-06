/**
 * Created by mark on 2017/5/17.
 */
/* 自定义数据服务*/
MyApp.service('Data', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    return {
        ajax: function (url, method, data) {
            url = url;
            method = method;
            switch (method) {
                case "get":
                    return $http({
                        url: url,
                        method: method,
                        params: data
                    });
                    break;
                case "post":
                    return $http({
                        url: url,
                        method: method,
                        data: data
                    });
                    break;
                case "put":
                    return $http({
                        url: url,
                        method: method,
                        data: data
                    });
                    break;
                case "delete":
                    return $http({
                        url: url,
                        method: method,
                        data: data
                    });
                    break;
            }
        },
        dashboard: {
            name: "你好，透视宝！我是从servers里面过来的内容"
        },
        lang_time: {
            'thirty_minutes': '30分钟',
            'one_hour': '1小时',
            'six_hours': '6小时',
            'twelve_hours': '12小时',
            'one_day': '1天',
            'seven_days': '7天',
            'thirty_days': '30天',
            'nearly': '最近',
            'from': '截止到',
            'start_after_end': '开始时间不能大于结束时间,请重新选择',
            'start_equal_end': '您选择的开始时间和结束时间一致，请重新选择',
            'select_time_limit': '选择时间段不可大于',
            'days': '天',
            'format': {
                1: "30分钟",
                2: "1小时",
                3: "6小时",
                4: "12小时",
                5: "1天",
                6: "7天",
                7: "1个月",
                8: "2个月",
                9: "3个月"
            },
            "format_new": {
                1: "1天",
                // 2:"3天",
                // 3:"5天",
                2: "7天",
                3: "1个月",
                4: "2个月",
                5: "3个月"
            },
            "time_diff": {
                1: 30 * 60 * 1000,
                2: 60 * 60 * 1000,
                3: 6 * 3600 * 1000,
                4: 12 * 3600 * 1000,
                5: 24 * 3600 * 1000,
                6: 7 * 24 * 3600 * 1000,
                7: 30 * 24 * 3600 * 1000,
                8: 60 * 24 * 3600 * 1000,
                9: 90 * 24 * 3600 * 1000,
            },
            "time_diff_new": {
                1: 86400000,
                // 2: 259200000,
                // 3: 432000000,
                2: 604800000,
                3: 86400000 * 30,
                4: 86400000 * 60,
                5: 86400000 * 90,
            }
        },
        lang_common: {
            'language': 'cn',
            'api': 'Api',
            'host': '主机',
            'site': '网站',
            'all': '全部',
            'no_group': '未分组',
            'no_data': '无数据',
            'no_data_p': '暂无数据',
            'china': '中国',
            'country': '国家',
            'province': '省份',
            'city': '城市',
            'high': '高',
            'low': '低',
            'last_time': '最近',
            'until': '截止到',
            'minutes': '分',
            'hours': '小时',
            'day': '天',
            'server_error': '服务器错误',
            'modify_success': '修改成功',
            'modify_faild': '修改失败',
            'times': '次',
            'save': '保存',
            'cancel': '取消',
            'return_all': '返回全部',
            'add_success': '添加成功',
            'add_failed': '添加失败',
            'upload': '上传',
            'loading': '加载中...',
        }
    }

}])

/**
 * 公共时间控件服务
 */
MyApp.service('dateTimeService', [function () {
    var service = {};

    //转化配置文件中的时间
    function fPackageTime(time, type) {
        var times, date;
        date = (new Date(new Date().getFullYear(), parseInt(new Date().getMonth() + 1), 0)).getDate();
        switch (type) {
            case "m":
                times = time * 60 * 1000;
                break;
            case "h":
                times = time * 60 * 60 * 1000;
                break;
            case "d":
                times = time * 24 * 60 * 60 * 1000;
                break;
            case "mon":
                times = time * date * 24 * 60 * 60 * 1000;
                break;
        }
        return times
    }

    var timer = {};
    for (var k in env_config.timer) {
        timer[env_config.timer[k].step] = env_config.timer[k];
    }

    /**
     * 获取当前起始时间戳
     * @returns {{start: *, end: *}}
     */
    service.getTime = function () {
        var endTime = $.cookie('end_timer');
        var startTime = $.cookie('start_timer');
        var step = $.cookie('timer_step');
        if (endTime == 'now') {
            endTime = new Date().getTime();
            startTime = endTime - fPackageTime(timer[step].time, timer[step].type);
        }

        //console.log(new Date(startTime).toLocaleString())
        //console.log(new Date(endTime).toLocaleString())

        return {
            start: startTime,
            end: endTime
        };
    };

    service.format = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds() //秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    return service
}]);
/**
 * 过滤插件 响应时间字段处理
 */

MyApp.service('filterRespTime',function () {
    var service = {}
    service.RespTime = function (wheres) {
        var json = {}
        $.each(wheres,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
                if(key != 'resptime'){
                    json[key] = val
                }else{
                    json['wt_from'] = val[0]
                    json['wt_to'] = val[1]
                }
        })
        return json
    }
    return service

})

/**
 * ajax请求服务
 */
MyApp.service('httpService', [
    '$http', 'dateTimeService', '$state',
    function ($http, dateTimeService, $state) {
        var service = {};

        /**
         * GET
         * @param url
         * @param params
         * @returns {*}
         */
        service.get = function (url, params) {
            var appId = $state.params.app_id;
            var time = dateTimeService.getTime();

            return $http.get(url, {
                params: $.extend(true, {
                    app_id: appId,
                    start_time: time.start,
                    end_time: time.end
                }, params || {})
            }).then(function (response) {
                return response.data;
            });
        };

        /**
         * POST
         * @param url
         * @param data
         * @returns {*}
         */
        service.post = function (url, data) {
            var appId = $state.params.app_id;
            var time = dateTimeService.getTime();

            return $http.post(url, $.extend(true, {
                app_id: appId,
                start_time: time.start,
                end_time: time.end
            }, data || {})).then(function (response) {
                return response.data;
            });
        };


        return service
    }]);
/***
 * 时间处理
 * return
 */
MyApp.service('dataTimeDefault', ['dateTimeService', function (dateTimeService) {
    var time = dateTimeService.getTime();
    return {
        start_time: time.start,
        end_time: time.end
    }

}])


/***
 * 数字处理
 * return num + k/b/t
 */
MyApp.filter('filterCount', function () {
    return function (number) {/*闭包函数中的value就是过滤器接收到的数据|就是准备过滤的数据*/
        if (number < 1000) {
            return number;
        } else if (number < 1000000) {
            number = parseInt(number / 10) / 100;
            return number + 'k';
        } else if (number < 1000000000) {
            number = parseInt(number / 10000) / 100;
            return number + 'b';
        } else {
            number = parseInt(number / 10000000) / 100;
            return number + 't';
        }
    }
})
/***
 * 时间处理
 * return num + s/ms
 */
MyApp.filter('filterTime', function () {
    return function (number) {/*闭包函数中的value就是过滤器接收到的数据|就是准备过滤的数据*/
        if (number < 1000) {
            return number + 'ms';
        }
        number = parseInt(number / 10) / 100;
        return number + 's';
    }
})
