/**
 * Created by mark on 2017/5/17.
 */
/**
 * 全局指令别名配置
 *
 *  使用方式（以日期组件为例）：
 *      1、$ocLazyLoad.load('dateTime').then(function () {
 *          // 异步加载指令js后，重新编译指令组件
 *          $compile(angular.element('[date-time]'))($scope);
 *         });
 *
 *      2、<div oc-lazy-load="['dateTime']"><div date-time></div></div>
 *
 */
MyApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    var baseUrl = './public/script/diretives/';

    $ocLazyLoadProvider.config({
        modules: [{
            name: 'dateTime',
            files: [baseUrl + 'dateTime.js']
        }, {
            name: 'breadCrumbs',
            files: [baseUrl + 'breadCrumbs.js']
        }, {
            name: 'filterKey',
            files: [baseUrl + 'filterKey.js']
        }, {
            name: 'pageList',
            files: [baseUrl + 'pageList.js']
        }, {
            name: 'filterWhere',
            files: [baseUrl + 'filterWhere.js']
        }, {
            name: 'miniBar',
            files: [baseUrl + 'miniBar.js']
        }, {
            name: 'codeTree',
            files: [
                baseUrl + 'codeTree.js',
                './public/components/allgroup/code_tree/code-tree-new.css'
            ]
        }, {
            name: 'visTopo',
            files: [
                './libs/vis/vis_topo.js',
                baseUrl + 'visTopo.js'
            ]
        }, {
            name: 'miniLine',
            files: [
                baseUrl + 'miniLine.js'
            ]
        }, {
            name: 'packScatter',
            files: [
                './libs/d3-4.12.0/d3.min.js',
                baseUrl + 'packScatter.js'
            ]
        }]
    });
}]);

/* 自定义指令*/
MyApp.directive('headerNav', ['Data', function (Data) {
    /* 头部导航栏*/
    return {
        // A 是单词 attribute 首字母，将指令当属性来用
        // E 是单词 element   首字母，将指令当标签来用
        // C 是单词 class     首字母，将指令当类来用
        // M 是单词 mark      首字母，将指令将注释来用
        restrict: 'A',
        replace: true,
        template: "<div>我是组件</div>",
        link: function ($scope, ele, attrs) {
            ele.on('click', function () {
//              console.log("hello word")
            });
        }
    };
}]).directive('autoHeight', ['$window', function ($window) {
    return {
        restrict: 'A',
        scope: {},
        link: function ($scope, element, attrs) {
            console.log(element)
            var winowHeight = $window.innerHeight; //获取窗口高度
            var headerHeight = 46;
            var footerHeight = 0;
            element.css('min-height',
                (winowHeight - headerHeight - footerHeight) + 'px');
        }
    };
}]).directive("navButton", function () {
    var link_func = function (scope, element, attr) {
        $(element).click(function () {
            if (scope.ClickedButton) {
                //这里是点击后的操作,就是访问过后

            }

        })
    }
    return {
        restrict: 'E',
        link: link_func,
    }
})
    .directive('repeatFinish', function () {//自定义指令repeatFinish
        return {
            link: function (scope, element, attr) {
                console.log(scope.$index)
                if (scope.$last == true) {
                    console.log('ng-repeat执行完毕')
                }
            }
        }
    })
    .directive('domFinish', function ($timeout) {
        /* 监听ng-repeat Dom渲染完成后*/
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    })
    .directive("timer", ["Data", "$rootScope", function (Data, $rootScope) {
        /* * 日期插件
         *
         *  $scope.timerStartTime    开始时间
         *  $scope.timerEndTime      结束时间
         *
         * */
        return {
            restrict: 'A',
            replace: true,
            scope: {
                timerStartTime:'=',
                timerEndTime:'='
            },
            templateUrl: './public/components/allgroup/timer.html',
            controller: function ($scope) {
                $scope.startVal = '';
                $scope.endVal = '';
                $scope.timeStr = '';
                $scope.isActiveLi = 1;
                // $scope.timerStartTime = '';
                // $scope.timerEndTime = '';
                $scope.bIsShowContent = false;
                $scope.fShowContent = function () {
                    $scope.bIsShowContent = !$scope.bIsShowContent;
                };
                $scope.show = true;
                $scope.tabClick = function (n) {
                    $scope.isActiveLi = n;
                    if (n == 1) {
                        $scope.show = true;
                    } else {
                        $scope.show = false;
                    }
                };
                // 截止当前时间配置
                fGetTimeJson();
                function fGetTimeJson() {
                    $.ajax({
                        type: "GET",
                        url: "./public/static/json/timePackage.json",
                        dataType: "json",
                        success: function (info) {
                            var arr, list = [];
                            arr = Object.keys(info);
                            if (arr.length > 0) {
                                $.each(info, function (key, val) {
                                    list.push(val);
                                });
                                $scope.$apply(function () {
                                    $scope.Lists = list;
                                });
                            } else {//如果读取配置文件未能获取到数据
                                $scope.Lists = [
                                    {"time": 30, "type": "m", "text": "最近30分钟","step":0},
                                    {"time": 1, "type": "h", "text": "最近1小时","step":1},
                                    {"time": 6, "type": "h", "text": "最近6小时","step":2},
                                    {"time": 12, "type": "h", "text": "最近12小时","step":3},
                                    {"time": 1, "type": "d", "text": "最近1天","step":4},
                                    {"time": 7, "type": "d", "text": "最近7天","step":5},
                                ];
                            }
                            if($.cookie('noChangeCookie')==='true'){
                                $scope.timerStartTime = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).timer;
                                $scope.timerEndTime = fGetNowDate(false).timer;
                                //开始时间 时、分
                                $scope.timeM1 = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).M;
                                $scope.timeH1 = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).H;
                                //结束时间 时、分
                                $scope.timeM2 = fGetNowDate(false).M;
                                $scope.timeH2 = fGetNowDate(false).H;
                                $scope.timeStr = $scope.Lists[0].text + ' ( '+ '截止到:' + $scope.timerEndTime +' ) ';
                                $scope.nLiActive = 0;
                            }else {
                                if($.cookie('start_timer') && $.cookie('end_timer')){
                                    $scope.timerStartTime = $.cookie('start_timer');
                                    // $scope.timerStartTime = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).timer;
                                    if('now'==$.cookie('end_timer') || !$.cookie('end_timer')){
                                        $scope.timerEndTime = fGetNowDate(false).timer;
                                        $scope.show = true;
                                    }else {
                                        $scope.timerEndTime = $.cookie('end_timer');
                                        $scope.show = false;
                                        //开始时间 时、分
                                        $scope.timeM1 = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).M;
                                        $scope.timeH1 = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).H;
                                        //结束时间 时、分
                                        $scope.timeM2 = fGetNowDate(false).M;
                                        $scope.timeH2 = fGetNowDate(false).H;
                                    }
                                }else {
                                    $scope.timerStartTime = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).timer;
                                    $scope.timerEndTime = fGetNowDate(false).timer;
                                    if('now'==$.cookie('end_timer') || !$.cookie('end_timer')){
                                        $scope.show = true;
                                    }else {
                                        $scope.show = false;
                                    }
                                    $.cookie('timer_step',0);
                                    $.cookie('start_timer',$scope.timerStartTime);
                                    $.cookie('end_timer','now');
                                    $scope.isActiveLi = 1;
                                }
                                //开始时间 时、分
                                $scope.timeM1 = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).M;
                                $scope.timeH1 = fGetNowDate(true, fPackageTime($scope.Lists[0].time, $scope.Lists[0].type)).H;
                                //结束时间 时、分
                                $scope.timeM2 = fGetNowDate(false).M;
                                $scope.timeH2 = fGetNowDate(false).H;
                                if ($.cookie('timer_step')==-1){
                                    $scope.isActiveLi = 2;
                                    $scope.timeStr = $scope.timerStartTime + '~' + $scope.timerEndTime;
                                    $scope.nLiActive = -1;
                                    // $scope.startVal = $scope.timerStartTime;
                                    // $scope.endVal = $scope.timerEndTime;
                                    $(".datepicker1").datepicker( 'setDate' , $scope.timerStartTime );
                                    $(".datepicker2").datepicker( 'setDate' , $scope.timerEndTime );
                                }else {
                                    $scope.isActiveLi = 1;
                                    $scope.timeStr = ($.cookie('timer_step')? $scope.Lists[$.cookie('timer_step')].text:$scope.Lists[0].text) + ' ( '+ '截止到:' + $scope.timerEndTime +' ) ';
                                    $scope.nLiActive = $.cookie('timer_step')? $scope.Lists[$.cookie('timer_step')].step : 0;
                                }
                            }
                            fSetTimePicker();

                            $scope.$apply();
                        },
                        error: function (res, textStatus, error) {
                            console.warn('时间配置文件读取失败');
                            $scope.Lists = [
                                {"time": 30, "type": "m", "text": "最近30分钟"},
                                {"time": 1, "type": "h", "text": "最近1小时"},
                                {"time": 6, "type": "h", "text": "最近6小时"},
                                {"time": 12, "type": "h", "text": "最近12小时"},
                                {"time": 1, "type": "d", "text": "最近1天"},
                                {"time": 7, "type": "d", "text": "最近7天"},
                            ];
                        }
                    });
                }

                //截止当前时间点击事件
                $scope.fChooseLi = function (index, val, Time, Type) {
                    $scope.nLiActive = index;
                    $scope.bIsShowContent = false;
                    $scope.timerStartTime = fGetNowDate(true, fPackageTime(Time, Type)).timer;
                    $scope.timerEndTime = fGetNowDate(false).timer;
                    $scope.step = index;
                    $scope.timeStr = val + ' ( '+ '截止到:' + $scope.timerEndTime +' ) ';
                    if($.cookie('noChangeCookie')==='true'){
                        return false;
                    }

                    $.cookie('timer_step',$scope.step);
                    $.cookie('start_timer',$scope.timerStartTime);
                    $.cookie('end_timer','now');
                    $scope.isActiveLi = 1;
                };

                //确定选择时间
                $scope.fTimeSure = function () {
                    $scope.timeStr = $scope.startVal + '～' + $scope.endVal;
                    $scope.timerStartTime = $scope.startVal;
                    $scope.timerEndTime = $scope.endVal;
                    $scope.bIsShowContent = false;
                    $.cookie('timer_step','-1');
                    $.cookie('start_timer',$scope.timerStartTime);
                    $.cookie('end_timer',$scope.timerEndTime);
                    $scope.isActiveLi = 2;
                };
                //取消
                $scope.fTimeNo = function () {
                    $scope.bIsShowContent = false;
                };
                //开始时间加
                $scope.timeStartAdd = function (isHour, time) {
                    var text;
                    var timer = Number(time) + 1;
                    if (isHour) {
                        if (fGetNowDate(false).timer.substring(0, 10) === $scope.startVal.substring(0, 10)) {
                            if (timer > fGetNowDate(false).H) {
                                timer = 0;
                            }
                        } else {
                            if (timer > 23) {
                                timer = 0;
                            }
                        }
                        $scope.timeH1 = fTimeFormat(timer);
                    } else {
                        if (fGetNowDate(false).timer.substring(0, 13) === $scope.startVal.substring(0, 13)) {
                            if (timer > fGetNowDate(false).M) {
                                timer = 0;
                            }
                        } else {
                            if (timer > 59) {
                                timer = 0;
                            }
                        }
                        $scope.timeM1 = fTimeFormat(timer);
                    }
                    $scope.startVal = $scope.startVal.substring(0, 10) + ' ' + $scope.timeH1 + ':' + $scope.timeM1;
                };
                //开始时间减
                $scope.timeStartCut = function (isHour, time) {
                    var text;
                    var timer = Number(time) - 1;
                    if (isHour) {
                        if (fGetNowDate(false).timer.substring(0, 10) === $scope.startVal.substring(0, 10)) {
                            if (timer < 0 || timer > fGetNowDate(false).H) {
                                timer = fGetNowDate(false).H;
                            }
                        } else {
                            if (timer < 0) {
                                timer = 23;
                            }
                        }
                        $scope.timeH1 = fTimeFormat(timer);
                    } else {
                        if (fGetNowDate(false).timer.substring(0, 13) === $scope.startVal.substring(0, 13)) {
                            if (timer < 0 || timer > fGetNowDate(false).M) {
                                timer = fGetNowDate(false).M;
                            }
                        } else {
                            if (timer < 0) {
                                timer = 59;
                            }
                        }
                        $scope.timeM1 = fTimeFormat(timer);
                    }
                    $scope.startVal = $scope.startVal.substring(0, 10) + ' ' + $scope.timeH1 + ':' + $scope.timeM1;
                };
                //结束时间加
                $scope.timeEndAdd = function (isHour, time) {
                    var text;
                    var timer = Number(time) + 1;
                    if (isHour) {
                        if (fGetNowDate(false).timer.substring(0, 10) === $scope.endVal.substring(0, 10)) {
                            if (timer > fGetNowDate(false).H) {
                                timer = 0;
                            }
                        } else {
                            if (timer > 23) {
                                timer = 0;
                            }
                        }
                        $scope.timeH2 = fTimeFormat(timer);
                    } else {
                        if (fGetNowDate(false).timer.substring(0, 13) === $scope.endVal.substring(0, 13)) {
                            if (timer > fGetNowDate(false).M) {
                                timer = 0;
                            }
                        } else {
                            if (timer > 59) {
                                timer = 0;
                            }
                        }
                        $scope.timeM2 = fTimeFormat(timer);
                    }
                    $scope.endVal = $scope.endVal.substring(0, 10) + ' ' + $scope.timeH2 + ':' + $scope.timeM2;
                };
                //结束时间减
                $scope.timeEndCut = function (isHour, time) {
                    var text;
                    var timer = Number(time) - 1;
                    if (isHour) {
                        if (fGetNowDate(false).timer.substring(0, 10) === $scope.endVal.substring(0, 10)) {
                            if (timer < 0 || timer > fGetNowDate(false).H) {
                                timer = fGetNowDate(false).H;
                            }
                        } else {
                            if (timer < 0) {
                                timer = 23;
                            }
                        }
                        $scope.timeH2 = fTimeFormat(timer);
                    } else {
                        if (fGetNowDate(false).timer.substring(0, 13) === $scope.endVal.substring(0, 13)) {
                            if (timer < 0 || timer > fGetNowDate(false).M) {
                                timer = fGetNowDate(false).M;
                            }
                        } else {
                            if (timer < 0) {
                                timer = 59;
                            }
                        }
                        $scope.timeM2 = fTimeFormat(timer);
                    }
                    $scope.endVal = $scope.endVal.substring(0, 10) + ' ' + $scope.timeH2 + ':' + $scope.timeM2;
                };
                //时间格式化
                function fTimeFormat(time) {
                    var timer;
                    if (Number(time) <= 9) {
                        timer = '0' + Number(time);
                    } else {
                        timer = Number(time);
                    }
                    return timer
                }

               function fSetTimePicker() {
                   $.datepicker.regional['zh-CN'] = {
                       closeText: '关闭',
                       currentText: '今天',
                       monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                           '七月', '八月', '九月', '十月', '十一月', '十二月'],
                       monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                       dayNames: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                       // dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                       // dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                       dayNamesMin: ['一', '二', '三', '四', '五', '六', '七'],
                       weekHeader: '周',
                       dateFormat: 'yy-mm-dd',
                       firstDay: 0,
                       isRTL: false,
                       showMonthAfterYear: false,
                       // yearSuffix: '年'
                   };
                   $.datepicker.setDefaults($.datepicker.regional['zh-CN']);//设置语言格式
                   $scope.nMinTime = fPackageTime($scope.Lists[$scope.Lists.length-1].time,$scope.Lists[$scope.Lists.length-1].type)/1000/60/60/24;
                   console.log($scope.nMinTime)
                   //初始化开始时间
                   $(".datepicker1").datepicker({
                       changeMonth: true,
                       changeYear: true,
                       minDate: -$scope.nMinTime,
                       maxDate: 0,
                       showOtherMonths: false,
                       showButtonPanel: false,
                       // altField: "#alternate1",
                       // dayNames: ['一', '二', '三', '四', '五', '六', '七'],
                       monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                       onSelect: function (date) {
                           var text;
                           text = date + ' ' + $scope.timeH1 + ':' + $scope.timeM1;
                           $scope.startVal = text;
                           $scope.$apply();
                           fUpdateEndTime(date);
                       }
                   });
                   //初始化结束时间
                   $(".datepicker2").datepicker({
                       changeMonth: true,
                       changeYear: true,
                       minDate: -$scope.nMinTime,
                       maxDate: 0,
                       hideIfNoPrevNext: false,//不显示上一个月、下一个月按钮
                       // altField: "#alternate2",
                       // dayNames: ['一', '二', '三', '四', '五', '六', '七'],
                       monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                       onSelect: function (date) {
                           var text;
                           text = date + ' ' + $scope.timeH2 + ':' + $scope.timeM2;
                           $scope.endVal = text;
                           $scope.$apply();
                       }
                   });
                   var startTimeDefault = $scope.timerStartTime;
                   var endTimeDefault = $scope.timerEndTime;
                   // console.log('开始时间',startTimeDefault)
                   $scope.startVal = startTimeDefault;
                   $scope.endVal = endTimeDefault;
                   if ($.cookie('timer_step')==-1){
                       $scope.timeH1 = $scope.timerStartTime.substring(11,13);
                       $scope.timeM1 = $scope.timerStartTime.substring(14,16);
                       $scope.timeH2 = $scope.timerEndTime.substring(11,13);
                       $scope.timeM2 = $scope.timerEndTime.substring(14,16);
                       $(".datepicker1").datepicker( 'setDate' , $scope.timerStartTime );
                       $(".datepicker2").datepicker( 'setDate' , $scope.timerEndTime );
                       fUpdateEndTime($scope.timerStartTime);
                   }
                   // $scope.startVal = startTimeDefault + ' ' + $scope.timeH1 + ':' + $scope.timeM1;
                   // $scope.endVal = endTimeDefault + ' ' + $scope.timeH2 + ':' + $scope.timeM2;
               }

                //控制结束时间最小值
                function fUpdateEndTime(date) {
                    var minDate = $('.datepicker2').datepicker('option', 'minDate');
                    $('.datepicker2').datepicker('option', 'minDate', date);
                    $scope.endVal = $scope.endVal.substring(0,10) + ' ' + $scope.timeH2 + ':' + $scope.timeM2;
                }

                //获取当前时间
                function fGetNowDate(isStart, times) {//是否为开始时间
                    var currentDate, year, Month, strDate, date, Hour, Minute, time = {Y: '', Mon: '', D: '', H: '', M: '', timer: ''};
                    if (isStart) {
                        date = new Date(new Date() - times);//开始时间默认是距当前30分钟
                    } else {
                        date = new Date();
                    }
                    year = date.getFullYear();
                    Month = date.getMonth() + 1;
                    strDate = date.getDate();
                    Hour = date.getHours(); //获取当前小时数(0-23)
                    if (Hour >= 1 && Hour <= 9) {
                        Hour = "0" + Hour;
                    }
                    Minute = date.getMinutes(); //获取当前分钟数(0-59)
                    if (Minute >= 1 && Minute <= 9) {
                        Minute = "0" + Minute;
                    }
                    currentDate = year + '-' + Month + '-' + strDate + " " + Hour + ':' + Minute;
                    time.Y = year;
                    time.Mon = Month;
                    time.D = strDate;
                    time.H = Hour;
                    time.M = Minute;
                    time.timer = currentDate;
                    return time
                }

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
            },
            link: function ($scope, ele, attrs) {
            }
        }
    }])

