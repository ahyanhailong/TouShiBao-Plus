/**
 *  Author: harry.lang
 *  Date: 2017/11/28
 *  Description: Created by harrylang on 2017/11/28.
 */
MyApp.directive("dateTime", ["Data", "$rootScope", function (Data, $rootScope) {
    /* 日期插件*/
    return {
        restrict: 'A',
        replace: false,
        templateUrl: './public/components/allgroup/datetime.html',
        link: function ($scope, ele, attrs) {
            var timeLimit = 30;   //时间控件允许选择的范围跨度
            var ESOpenLimit = 30;  //es索引开放的日期跨度，截止当前时间
            var TSB = (function ($, window, document, undefined) {

                var tsb = {
                    switchHideShow: function (oChange, oTarget) {

                        oTarget.blur(function () {
                            oChange.parents('li').removeClass('active');
                            oTarget.slideUp('fast');
                        });

                        oChange.click(function () {
                            if (oTarget.is(':hidden')) {
                                oChange.parents('li').addClass('active');
                                oTarget.slideDown('fast');
                                oTarget.focus();
                            } else {
                                oChange.parents('li').removeClass('active');
                                oTarget.slideUp('normal');
                            }
                        });


                    },

                    /**
                     * 初始化选择控件
                     */
                    initSwitchCheckBox: function () {
                        if ($('.switch-checkbox')[0]) {
                            $(document).find('.switch-checkbox').bootstrapSwitch();
                        }
                    },

                    /*弹框提示信息*/
                    modalAlert: function (options, status, speed) {
                        options = typeof options == 'string' ? {msg: options, status: status, speed: speed} : options;
                        var opt = $.extend({
                            status: "success",
                            msg: "成功",
                            speed: 2000
                        }, options || {});

                        var status = {
                            error: 'danger'
                        };

                        var cls = $.isEmptyObject(status[opt.status]) ? opt.status : status[opt.status];

                        var alertHtml = '<div class="modal-alert"><div class="alert alert-' + cls + '">' + opt.msg + '</div></div>';

                        $(alertHtml).appendTo($('body')).fadeIn().delay(opt.speed).fadeOut(function () {
                            $(this).remove()
                        });
                    },
                    /**
                     * congfirm确认提示框
                     * @param data   删除条目的配置信息
                     * @param dom    删除的dom元素
                     * @returns {*}
                     */
                    modalConfirm: function (data, dom, options) {
                        var opt = $.extend({
                            status: 'success',
                            msg: "Operation is successful !",
                            speed: 2000
                        }, options || {});
                        if (opt.status == 'success') {
                            var alertIcon = '<i class="fa fa-check-circle" id="green"></i>';
                        } else {
                            var alertIcon = '<i class="fa fa-times-circle" id="red"></i>';
                        }
                        var alertHtml = '<div class="modal-alert" style="display:none;height:100%;margin-top: -30px;padding-top: 100px"><div class="alert alert-' + opt.status + '">' + alertIcon + opt.msg + '</<div></br></br><input type="button" id="confirm" class="btn-blue " style="margin-left: 80px" value="确定"/>     <input type="button" id="cancle" class="btn-blue center"  style="margin-left: 40px" value="取消"/></div></div>';

                        $(alertHtml).appendTo($('body')).fadeIn().delay(opt.speed);

                        $('#confirm').click(function () {
                            T.restPost('/ajax/alert/template/remove', data, function (back) {
                                dom.remove();
                                TSB.modalAlert({msg: back.msg});
                            }, function (back) {
                                TSB.modalAlert({msg: back.msg});
                            });
                            $('#cancle').trigger('click');
                        });

                        $(document).delegate('#cancle', 'click', function () {
                            $('.modal-alert').remove();
                        });

                    },


                    /*jquery UI 滑块扩展*/
                    slider: function (sel, opt) {
                        var $selectors = $(sel);
                        return $.each($selectors, function () {
                            var $target = $(this);

                            opt.start = function (event, ui) {
                                if (typeof opt.startFun == 'function') {
                                    opt.startFun.call(this, event, ui);
                                }
                            };
                            opt.slide = function (event, ui) {
                                if (typeof opt.slideFun == 'function') {
                                    opt.slideFun.call(this, event, ui);
                                }
                                if (opt.values != undefined) {
                                    rangeWidget.call(this);
                                }
                            };
                            opt.change = function (event, ui) {
                                if (typeof opt.changeFun == 'function') {
                                    opt.changeFun.call(this, event, ui);
                                }
                                if (opt.values != undefined) {
                                    rangeWidget.call(this);
                                }
                            };
                            opt.stop = function (event, ui) {
                                if (typeof opt.stopFun == 'function') {
                                    opt.stopFun.call(this, event, ui);
                                }
                            };

                            var range = $(this).attr('js-range');

                            if (opt.range == undefined) {
                                opt.range = range == 'true' ? true : range;
                            }
                            if (opt.min == undefined) {
                                opt.min = parseInt($(this).parent('div').find('.slider-widget-range').eq(0).text());
                            }
                            if (opt.max == undefined) {
                                opt.max = parseInt($(this).parent('div').find('.slider-widget-range').eq(1).text());
                            }

                            if (opt.value == undefined && opt.values == undefined) {
                                var input_target = $(this).attr('js-target-input');

                                if (input_target) {
                                    var oForm = $(this).closest('form');

                                    if (input_target.indexOf(',') > 1) {
                                        var input_targets = input_target.split(',');
                                        var input_targets_0 = parseInt(oForm.find('input[name="' + input_targets[0] + '"]').val());
                                        var input_targets_1 = parseInt(oForm.find('input[name="' + input_targets[1] + '"]').val());
                                        opt.values = [input_targets_0, input_targets_1];
                                    } else {
                                        opt.value = parseInt(oForm.find('input[name="' + input_target + '"]').val());
                                    }
                                }
                            }
                            $target.slider(opt);

                            if (opt.values != undefined) {
                                var rangeWidget = function () {
                                    var widthPer = parseInt($target.find('.ui-slider-range')[0].style.width);
                                    var leftPer = parseInt($target.find('.ui-slider-range')[0].style.left);
                                    if ($target.find('.ui-widget-range-left')[0] == undefined) {
                                        $('<div class="ui-widget-range-left" style="width:' + leftPer + '%;"></div>' +
                                            '<div class="ui-widget-range-right" style="width:' + (100 - widthPer - leftPer) + '%;"></div>').appendTo($target);
                                    } else {
                                        $target.find('.ui-widget-range-left').css('width', leftPer + '%');
                                        $target.find('.ui-widget-range-right').css('width', (100 - widthPer - leftPer) + '%');
                                    }
                                };
                                rangeWidget();
                            }
                        });
                    },
                    /*初始化表单元素*/
                    initForm: function (oForm, oValue) {
                        function initSwitch(oForm) {
                            oForm.find('.switch-checkbox').bootstrapSwitch();
                        }

                        if (oValue == undefined) {
                            initSwitch(oForm);
                            return false;
                        }

                        oForm.find('input').each(function (k, oThis) {
                            var lableName = $(oThis).attr('name');

                            if (lableName) {
                                switch ($(oThis).attr('type')) {
                                    case 'hidden':
                                    case 'text':
                                    case 'password':
                                    case 'select':
                                        if (oValue.hasOwnProperty(lableName)) {
                                            $(oThis).val(oValue[lableName]);
                                        }
                                        break;
                                    case 'radio':
                                        if (oValue.hasOwnProperty(lableName)) {
                                            oForm.find('input[name="' + lableName + '"][value="' + oValue[lableName] + '"]').attr('checked', 'true');
                                        }
                                        break;
                                    case 'checkbox':
                                        var _lableName = lableName.substring(0, lableName.length - 2);
                                        if (oValue.hasOwnProperty(_lableName) && oValue[_lableName]) {
                                            $.each(oValue[_lableName], function (_k, _v) {
                                                oForm.find('input[name="' + lableName + '"][value="' + _v + '"]').attr('checked', 'true');
                                            });
                                        }

                                        if (oValue.hasOwnProperty(lableName) && oValue[lableName]) {

                                            if (lableName == 'status' || lableName.indexOf('_check') > 0) {
                                                oForm.find('input[name="' + lableName + '"]').val(oValue[lableName]);
                                            }

                                            if (oValue[lableName] == app_enum.alert_config_status_normal) {
                                                oForm.find('input[name="' + lableName + '"]').prop('checked', true);
                                            } else {
                                                oForm.find('input[name="' + lableName + '"]').prop('checked', false);
                                            }

                                        }
                                        break;
                                }
                                if (lableName.substring(lableName.length - 2, lableName.length) != '[]') {
                                    var js_label = oForm.find('.js_data_' + lableName);
                                    if (js_label) {
                                        js_label.text(oValue[lableName]);
                                    }
                                }

                            }

                        });

                        oForm.find('textarea').each(function (k, oThis) {
                            var lableName = $(oThis).attr('name');
                            if (lableName && oValue.hasOwnProperty(lableName)) {
                                $(oThis).html(oValue[lableName]);
                            }
                        });

                        oForm.find('select').each(function (k, oThis) {
                            var lableName = $(oThis).attr('name');
                            if (oValue.hasOwnProperty(lableName)) {
                                $(oThis).val(oValue[lableName]);
                            }
                        });

                        initSwitch(oForm);
                    },

                    /*事件管理*/
                    eventManager: {
                        events: {},
                        addListener: function (type, handler, scope, params) {
                            this.events = this.events || {};
                            this.events[type] = this.events[type] || [];
                            this.events[type].push({
                                handler: handler,
                                scope: scope,
                                params: params
                            });
                        },
                        removeListener: function (type, handler, scope) {
                            if (!$.isEmptyObject(this.events)) {
                                this.events[type] = $.grep(this.events[type], function (e) {
                                    var s = scope || e.scope;
                                    var h = handler || e.handler;
                                    return e.scope !== s || e.handler !== h;
                                });
                            }
                        },
                        trigger: function (type, params) {
                            if (this.events) {
                                var fns = this.events[type], i, fn;
                                if (!fns) {
                                    return;
                                }
                                for (i = 0; fn = fns[i]; i++) {
                                    if (fn.handler.apply(fn.scope || this, params || fn.params || []) === false) {
                                        return false;
                                    }
                                }
                            }
                        }
                    },
                    /*url锚点值处理*/
                    anchorManager: {
                        _processHash: function (params) {
                            var url = window.location;
                            var hash = '#';
                            $.each(params, function (k, v) {
                                hash = hash + k + '=' + v + "&";
                            });
                            url.hash = hash;
                        },
                        getParams: function () {
                            var url = window.location.hash;
                            var params = {};
                            if (url) {
                                url = url.slice(1);
                                var _params_tmp = url.split('&');

                                if (_params_tmp.length > 0) {
                                    $(_params_tmp).each(function (k, v) {
                                        var _tmp = v.split('=');
                                        if (_tmp[1]) params[_tmp[0]] = _tmp[1];
                                    })
                                }
                            }
                            return params;
                        },
                        setParam: function (key, value) {
                            var params = this.getParams();
                            params[key] = value;
                            this._processHash(params);
                        },
                        removeParam: function (key) {
                            var params = this.getParams();
                            delete params[key];
                            this._processHash(params);
                        }
                    },
                    /**
                     * 初始化harViwer
                     */
                    harViewerInit: function () {
                        $(document).ready(function () {
                            var har = document.createElement("script");
                            har.src = "/resource/js/harviewer/har.js";
                            har.setAttribute("id", "har");
                            har.setAttribute("async", "true");
                            document.documentElement.firstChild.appendChild(har);
                        });
                        if (typeof(harInitialize) != "undefined") {
                            harInitialize()
                        }
                    },

                    /**
                     * 弹窗 + 前向翻页
                     */
                    modalWithPreNext: function (target) {

                        var madal = $('#' + target);
                        madal.on("show.bs.modal", function () {

                            var loa = $('<div class="location2"><span class="fa fa-chevron-left fa-3"></span></div>' + '<div class="location1"><span class="fa fa-chevron-right fa-3"></span></div>');
                            $('body').append(loa);

                        }).on("hide.bs.modal", function () {

                            $('body').find(".location1,.location2").remove();
                        });
                    },

                    getSearchInputVal: function (dom) {
                        if (navigator.Actual_Name == 'Microsoft Internet Explorer' && parseInt(navigator.Actual_Version) == 9) {
                            if (dom.val() == dom.attr('placeholder')) {
                                return '';
                            }
                        }

                        return dom.val();
                    },
                    splitDateTime: function (time) {
                        var split_pre = time[4];
                        var split_aft = ':';
                        var test = [0, 0, 0, 0, 0, 0];
                        time = time.split(' ');
                        var i = 0;
                        if (time[0] != undefined) {
                            var pre_list = time[0].split(split_pre);
                            for (; i < pre_list.length; i++) {
                                test[i] = pre_list[i];
                            }
                        }
                        if (time[1] != undefined) {
                            var aft_list = time[1].split(split_aft);
                            for (i = 0; i < aft_list.length; i++) {
                                test[i + 3] = aft_list[i];
                            }
                        }
                        test[1] -= 1;
                        return test;
                    }


                };
                return tsb;
            })(jQuery, window, document, undefined);

            Date.prototype.format = function (format) {
                var o = {
                    "M+": this.getMonth() + 1, //month
                    "d+": this.getDate(), //day
                    "h+": this.getHours(), //hour
                    "m+": this.getMinutes(), //minute
                    "s+": this.getSeconds(), //second
                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                    "S": this.getMilliseconds() //millisecond
                }

                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            };

            //扩展时间控件语言
            $.fn.datetimepicker.dates['en'] = {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                meridiem: ['am', 'pm']
            };
            $.fn.datetimepicker.dates['zh'] = {
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
                daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
                meridiem: ["上午", "下午"],
                //suffix:      ["st", "nd", "rd", "th"],
                today: "今天"
            };
            var dateController = function () {
                //初始化时间控件
                this.init = function () {

                    this.dateTimeEnd = new Date();

                    this.dateTimeStart = new Date();

                    this.end_time = 'now';

                    this.start_time = 'now';

                    this.time_step = $.cookie('time_step');


                    if (!$.isNumeric(this.time_step)) {
                        //默认最近30分钟
                        this.time_step = 1;
                    }

                    //初始化开始时间
                    var str_time_start = $.cookie('start_time');
                    var time_start = new Date(str_time_start);
                    if (str_time_start == undefined || str_time_start == 'now' || time_start == 'Invalid Date' || time_start == NaN || time_start == 'NaN') {
                        //默认截止到当前
                        this.start_time = 'now';
                        var startCurrent = new Date(this.dateTimeEnd) - Data.lang_time.time_diff[1];
                        this.dateTimeStart = new Date(startCurrent);

                    } else {
                        this.start_time = time_start;
                        this.dateTimeStart = time_start;
                    }

                    //初始化截止时间
                    var str_time_end = $.cookie('end_time');
                    var time = new Date(str_time_end);

                    //判断是截止到当前还是自定义时间
                    if (str_time_end == undefined || str_time_end == 'now' || time == 'Invalid Date' || time == NaN || time == 'NaN') {
                        //默认截止到当前
                        this.end_time = 'now';

                        //自定义时更新开始时间
                        var startCurrent = new Date(this.dateTimeEnd) - Data.lang_time.time_diff[this.time_step];
                        this.dateTimeStart = new Date(startCurrent);

                        $('#dc-menu-now').click();
                    } else {
                        this.end_time = time;
                        this.dateTimeEnd = time;
                        $('#dc-menu-custom').click();
                    }


                    $('#custom_start').val(this.dateTimeStart.format('yyyy-MM-dd hh:mm'))
                    $('#custom_end').val(this.dateTimeEnd.format('yyyy-MM-dd hh:mm'))

                };

                //显示时间段选择控件
                this.showTimeSlider = function () {
                    var showMaxTime = parseInt($.trim($('#showMaxTimeId').val()));

                    TSB.slider('#time-slider', {
                        range: 'min',
                        value: this.time_step,
                        min: 1,
                        max: showMaxTime,
                        slideFun: function (event, ui) {
                            //提示文字
                            $('#show-time-step-tip').html(Data.lang_time.nearly + $('.scale_wire_text').eq(ui.value - 1).text());
                        }
                    });
                    $('#show-time-step-tip').html(Data.lang_time.nearly + $('.scale_wire_text').eq(this.time_step - 1).text());
                };

                this.showDatepicker = function () {
                    var time = this.dateTimeEnd;

                    //开始时间
                    var endDate = new Date(new Date().getTime() - 3600 * 24 * 1000 * ESOpenLimit);
                    endDate.setHours(0);
                    endDate.setMinutes(0);
                    $('#datetimepickerStart').datetimepicker({
                        weekStart: 1,
                        language: 'zh',
                        autoclose: 1,
                        startView: 2,
                        minView: 2,
                        forceParse: 0,
                        endDate: new Date(),
                        startDate: endDate
                    }).on('changeDate', function () {

                        var $dateStart = $('#datetimepickerStart').data('datetimepicker');
                        var hourStart = $('#time-hour-slider-start').data('uiSlider').options.value;
                        var minuteStart = $('#time-minute-slider-start').data('uiSlider').options.value;

                        var tmpTime = $dateStart.getDate();
                        time.setFullYear(tmpTime.getFullYear());
                        time.setMonth(tmpTime.getMonth());
                        time.setDate(tmpTime.getDate());
                        time.setHours(hourStart);
                        time.setMinutes(minuteStart);
                        if (time > new Date()) {
                            $('#time-hour-slider-start').slider('value', new Date().getHours());
                            $('#time-minute-slider-start').slider('value', new Date().getMinutes());
                            $('#time-hour-slider-start span.ui-slider-handle').text(new Date().getHours());
                            $('#time-minute-slider-start span.ui-slider-handle').text(new Date().getMinutes());
                            $('#custom_start').val(new Date().format('yyyy-MM-dd hh:mm'));

                            // 选择开始时间，结束时间在可选择范围内
                            var DateEnd = new Date();
                            DateEnd.setHours(23);
                            DateEnd.setMinutes(59);
                            var DateStart = new Date();
                            DateStart.setHours(0);
                            DateStart.setMinutes(0);
                            $('#datetimepickerEnd').datetimepicker('setStartDate', DateStart);
                            $('#datetimepickerEnd').datetimepicker('setEndDate', DateEnd);
                        } else {
                            $('#custom_start').val(time.format('yyyy-MM-dd hh:mm'));

                            // 选择开始时间，结束时间在可选择范围内
                            var DateEnd = new Date(time.getTime() + timeLimit * 3600 * 24 * 1000);
                            if (DateEnd > new Date()) {
                                DateEnd = new Date();
                            }
                            DateEnd.setHours(23);
                            DateEnd.setMinutes(59);
                            var setStart = new Date(time);
                            setStart.setHours(0);
                            setStart.setMinutes(0);
                            $('#datetimepickerEnd').datetimepicker('setStartDate', setStart);
                            $('#datetimepickerEnd').datetimepicker('setEndDate', DateEnd);
                        }


                        //开始时间选择后， 结束时间默认开始时间半小时后

                        // 如果开始时间在 结束时间前的选择范围内，不改变结束时间
                        if ($('#custom_end').val()) {
                            var dateArrayEnd = TSB.splitDateTime($('#custom_end').val());
                            var timeCurrentEnd = new Date(dateArrayEnd[0], dateArrayEnd[1], dateArrayEnd[2], dateArrayEnd[3], dateArrayEnd[4], dateArrayEnd[5]);
                        } else {
                            var timeCurrentEnd = new Date();
                        }
                        if ((timeCurrentEnd.getTime() - time.getTime()) / (1000 * 3600 * 24) > timeLimit || time > timeCurrentEnd) {
                            var endDefault = new Date(time).getTime() + 60 * 1000 * 30;
                            if (endDefault > new Date().getTime()) {
                                $('#custom_end').val(new Date().format('yyyy-MM-dd hh:mm'));
                                var setDate = new Date();
                                setDate.setHours(0);
                                setDate.setMinutes(0);
                                //setDate(new Date())  不行

                                $('#datetimepickerEnd').data('datetimepicker').setDate(setDate);
                                $('#time-hour-slider-end span.ui-slider-handle').text(new Date().getHours());
                                $('#time-minute-slider-end span.ui-slider-handle').text(new Date().getMinutes());
                                $('#time-hour-slider-end').slider('value', new Date().getHours());
                                $('#time-minute-slider-end').slider('value', new Date().getMinutes());
                            } else {
                                $('#custom_end').val(new Date(endDefault).format('yyyy-MM-dd hh:mm'));
                                $('#datetimepickerEnd').data('datetimepicker').setDate(new Date(endDefault));
                                $('#time-hour-slider-end').slider('value', new Date(endDefault).getHours());
                                $('#time-minute-slider-end').slider('value', new Date(endDefault).getMinutes());
                                $('#time-hour-slider-end span.ui-slider-handle').text(new Date(endDefault).getHours());
                                $('#time-minute-slider-end span.ui-slider-handle').text(new Date(endDefault).getMinutes());
                            }
                        }


                    });

                    //结束时间
                    var setEndDateEnd = new Date(new Date(this.dateTimeStart).getTime() + 3600 * 24 * 1000 * timeLimit);
                    if (setEndDateEnd > new Date()) {
                        setEndDateEnd = new Date();
                        setEndDateEnd.setHours(23);
                        setEndDateEnd.setMinutes(59);
                    }
                    $('#datetimepickerEnd').datetimepicker({
                        weekStart: 1,
                        language: "zh",
                        autoclose: 1,
                        startView: 2,
                        minView: 2,
                        forceParse: 0,
                        startDate: new Date(this.dateTimeStart),
                        endDate: new Date(setEndDateEnd)
                    }).on('changeDate', function () {
                        var $dateStart = $('#datetimepickerStart').data('datetimepicker');
                        var $dateEnd = $('#datetimepickerEnd').data('datetimepicker');
                        var rangeStart = $dateStart.getDate().getTime() + 24 * 3600 * 1000 * timeLimit;

                        if ($dateStart.getDate() > $dateEnd.getDate()) {
                            $('#datetimepickerEnd').data('datetimepicker').setDate($dateStart.getDate());
                        }
                        if ($dateEnd.getDate().getTime() > rangeStart) {
                            $('#datetimepickerEnd').data('datetimepicker').setDate(new Date(rangeStart));
                        }

                        var hourEnd = $('#time-hour-slider-end').data('uiSlider').options.value;
                        var minuteEnd = $('#time-minute-slider-end').data('uiSlider').options.value;
                        var tmpTime = $dateEnd.getDate();
                        time.setFullYear(tmpTime.getFullYear());
                        time.setMonth(tmpTime.getMonth());
                        time.setDate(tmpTime.getDate());
                        time.setHours(hourEnd);
                        time.setMinutes(minuteEnd);

                        if ($('#custom_start').val()) {
                            var dateArrayStart = TSB.splitDateTime($('#custom_start').val());
                            var timeCurrent = new Date(dateArrayStart[0], dateArrayStart[1], dateArrayStart[2], dateArrayStart[3], dateArrayStart[4], dateArrayStart[5]);
                        } else {
                            var timeCurrent = new Date();
                        }

                        // 结束时间不能小于开始时间
                        if (time < timeCurrent) {
                            var setEndDatePP = new Date(timeCurrent.getTime() + 60 * 30 * 1000);
                            if (setEndDatePP > new Date()) {
                                setEndDatePP = new Date();
                            }
                            $('#datetimepickerEnd').data('datetimepicker').setDate(setEndDatePP);
                            $('#time-hour-slider-end').slider('value', setEndDatePP.getHours());
                            $('#time-minute-slider-end').slider('value', setEndDatePP.getMinutes());
                            $('#time-hour-slider-end span.ui-slider-handle').text(setEndDatePP.getHours());
                            $('#time-minute-slider-end span.ui-slider-handle').text(setEndDatePP.getMinutes());
                            $('#custom_end').val(setEndDatePP.format('yyyy-MM-dd hh:mm'));
                        }

                        if (time > new Date(timeCurrent.getTime() + 3600 * 24 * 1000 * timeLimit)) {
                            var setEndDate = new Date(timeCurrent.getTime() + 3600 * 24 * 1000 * timeLimit);
                            $('#time-hour-slider-end').slider('value', setEndDate.getHours());
                            $('#time-minute-slider-end').slider('value', setEndDate.getMinutes());
                            $('#time-hour-slider-end span.ui-slider-handle').text(setEndDate.getHours());
                            $('#time-minute-slider-end span.ui-slider-handle').text(setEndDate.getMinutes());
                            $('#custom_end').val(setEndDate.format('yyyy-MM-dd hh:mm'));
                        }

                        if (time > new Date()) {
                            $('#time-hour-slider-end').slider('value', new Date().getHours());
                            $('#time-minute-slider-end').slider('value', new Date().getMinutes());
                            $('#time-hour-slider-end span.ui-slider-handle').text(new Date().getHours());
                            $('#time-minute-slider-end span.ui-slider-handle').text(new Date().getMinutes());
                            $('#custom_end').val(new Date().format('yyyy-MM-dd hh:mm'));
                        } else {
                            if (time <= new Date(timeCurrent.getTime() + 3600 * 24 * 1000 * timeLimit) && time > timeCurrent) {
                                $('#custom_end').val(time.format('yyyy-MM-dd hh:mm'));
                            }

                        }
                    });

                    //初始化时间控件
                    $('#datetimepickerStart').data('datetimepicker').setDate(this.dateTimeStart);
                    $('#datetimepickerEnd').data('datetimepicker').setDate(this.dateTimeEnd);

                    //提示
                    $('#show-custom-tip').html('(' + Data.lang_time.from + time.format('yyyy-MM-dd hh:mm') + ')');


                    //左右切换按钮
                    $('#datetimepickerStart').find('table>thead>tr>th.next').html('<i class="glyphicon glyphicon-arrow-right"></i>');
                    $('#datetimepickerStart').find('table>thead>tr>th.prev').html('<i class="glyphicon glyphicon-arrow-left"></i>');

                    $('#datetimepickerEnd').find('table>thead>tr>th.next').html('<i class="glyphicon glyphicon-arrow-right"></i>');
                    $('#datetimepickerEnd').find('table>thead>tr>th.prev').html('<i class="glyphicon glyphicon-arrow-left"></i>');
                };

                this.showTimeHourSliderStart = function () {
                    var time = this.dateTimeStart;
                    TSB.slider('#time-hour-slider-start', {
                        orientation: "horizontal",
                        range: 'min',
                        value: time.getHours(),
                        step: 1,
                        min: 0,
                        max: 23,
                        slideFun: function (event, ui) {
                            $('#time-hour-slider-start span.ui-slider-handle').text(ui.value);
                            //设置开始时间  小时
                            if ($('#custom_start').val()) {
                                var dateArray = TSB.splitDateTime($('#custom_start').val());
                                var timeCurrent = new Date(dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
                            } else {
                                var timeCurrent = new Date();
                            }
                            timeCurrent.setHours(ui.value);
                            $('#custom_start').val(timeCurrent.format('yyyy-MM-dd hh:mm'));
                        },
                        stopFun: function (e, ui) {
                            if ($('#custom_start').val()) {
                                var dateStartArray = TSB.splitDateTime($('#custom_start').val());
                                var timeCurrentStart = new Date(dateStartArray[0], dateStartArray[1], dateStartArray[2], dateStartArray[3], dateStartArray[4], dateStartArray[5]);
                            } else {
                                var timeCurrentStart = new Date();
                            }
                            if ($('#custom_end').val()) {
                                var dateEndArray = TSB.splitDateTime($('#custom_end').val());
                                var timeCurrentEnd = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2], dateEndArray[3], dateEndArray[4], dateEndArray[5]);
                            } else {
                                var timeCurrentEnd = new Date();
                            }

                            var currentDate = new Date();
                            //选择时间不能大于当前时间
                            if (timeCurrentStart > currentDate) {
                                $('#time-hour-slider-start').slider('value', currentDate.getHours());
                                $('#time-hour-slider-start span.ui-slider-handle').text(currentDate.getHours());
                                timeCurrentStart.setHours(currentDate.getHours());
                                $('#custom_start').val(timeCurrentStart.format('yyyy-MM-dd hh:mm'));
                            }
                            // 开始时间不能大于结束时间
                            if (timeCurrentStart > timeCurrentEnd) {
                                var timeEndAfter = timeCurrentStart.getTime() + 60 * 1000 * 30;
                                $('#custom_end').val(new Date(timeEndAfter).format('yyyy-MM-dd hh:mm'));
                                $('#datetimepickerEnd').data('datetimepicker').setDate(new Date(timeEndAfter));
                                $('#time-hour-slider-end').slider('value', new Date(timeEndAfter).getHours());
                                $('#time-minute-slider-end').slider('value', new Date(timeEndAfter).getMinutes());
                                $('#time-hour-slider-end span.ui-slider-handle').text(new Date(timeEndAfter).getHours());
                                $('#time-minute-slider-end span.ui-slider-handle').text(new Date(timeEndAfter).getMinutes());
                            }
                            //时间范围跨度  大于timeLimit
                            if ((timeCurrentEnd.getTime() - timeCurrentStart.getTime()) / (1000 * 3600 * 24) > timeLimit) {
                                var timeEndAfterRange = timeCurrentStart.getTime() + 60 * 1000 * 30;
                                $('#custom_end').val(new Date(timeEndAfterRange).format('yyyy-MM-dd hh:mm'));
                                $('#datetimepickerEnd').data('datetimepicker').setDate(new Date(timeEndAfterRange));
                                $('#time-hour-slider-end').slider('value', new Date(timeEndAfterRange).getHours());
                                $('#time-minute-slider-end').slider('value', new Date(timeEndAfterRange).getMinutes());
                                $('#time-hour-slider-end span.ui-slider-handle').text(new Date(timeEndAfterRange).getHours());
                                $('#time-minute-slider-end span.ui-slider-handle').text(new Date(timeEndAfterRange).getMinutes());
                            }
                        }
                    });
                    $('#time-hour-slider-start span.ui-slider-handle').text(time.getHours());
                };
                this.showTimeHourSliderEnd = function () {
                    var time = this.dateTimeEnd;
                    TSB.slider('#time-hour-slider-end', {
                        orientation: "horizontal",
                        range: 'min',
                        value: time.getHours(),
                        step: 1,
                        min: 0,
                        max: 23,
                        slideFun: function (event, ui) {
                            $('#time-hour-slider-end span.ui-slider-handle').text(ui.value);

                            //设置结束时间  小时
                            if ($('#custom_end').val()) {
                                var dateEndArray = TSB.splitDateTime($('#custom_end').val());
                                var timeCurrent = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2], dateEndArray[3], dateEndArray[4], dateEndArray[5]);
                            } else {
                                var timeCurrent = new Date();
                            }
                            timeCurrent.setHours(ui.value);
                            $('#custom_end').val(timeCurrent.format('yyyy-MM-dd hh:mm'));
                        },
                        stopFun: function (e, ui) {
                            if ($('#custom_start').val()) {
                                var dateStartArray = TSB.splitDateTime($('#custom_start').val());
                                var timeCurrentStart = new Date(dateStartArray[0], dateStartArray[1], dateStartArray[2], dateStartArray[3], dateStartArray[4], dateStartArray[5]);
                            } else {
                                var timeCurrentStart = new Date();
                            }
                            if ($('#custom_end').val()) {
                                var dateEndArray = TSB.splitDateTime($('#custom_end').val());
                                var timeCurrentEnd = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2], dateEndArray[3], dateEndArray[4], dateEndArray[5]);
                            } else {
                                var timeCurrentEnd = new Date();
                            }
                            //截止日期 起始位置
                            var rangeEnd = new Date(timeCurrentStart.getTime() + timeLimit * 24 * 3600 * 1000);

                            var currentDate = new Date();
                            //选择时间不能大于当前时间
                            if (timeCurrentEnd > currentDate) {
                                $('#time-hour-slider-end').slider('value', currentDate.getHours());
                                $('#time-hour-slider-end span.ui-slider-handle').text(currentDate.getHours());
                                timeCurrentEnd.setHours(currentDate.getHours());
                                $('#custom_end').val(timeCurrentEnd.format('yyyy-MM-dd hh:mm'));
                            }

                            //开始时间不能大于结束时间
                            if (timeCurrentStart > timeCurrentEnd) {
                                $('#time-hour-slider-end').slider('value', timeCurrentStart.getHours());
                                $('#time-hour-slider-end span.ui-slider-handle').text(timeCurrentStart.getHours());
                                timeCurrentEnd.setHours(timeCurrentStart.getHours());
                                $('#custom_end').val(timeCurrentEnd.format('yyyy-MM-dd hh:mm'));
                            }
                            //结束日期不能大于 选择开始时间到范围限制日期 以外
                            if (timeCurrentEnd > rangeEnd) {
                                $('#time-hour-slider-end').slider('value', rangeEnd.getHours());
                                $('#time-hour-slider-end span.ui-slider-handle').text(rangeEnd.getHours());
                                timeCurrentEnd.setHours(rangeEnd.getHours());
                                $('#custom_end').val(timeCurrentEnd.format('yyyy-MM-dd hh:mm'));
                            }
                        }
                    });
                    $('#time-hour-slider-end span.ui-slider-handle').text(time.getHours());
                };
                this.showTimeMinuteSliderStart = function () {
                    var time = this.dateTimeStart;
                    TSB.slider('#time-minute-slider-start', {
                        orientation: "horizontal",
                        range: 'min',
                        value: time.getMinutes(),
                        step: 1,
                        min: 0,
                        max: 59,
                        slideFun: function (event, ui) {
                            $('#time-minute-slider-start span.ui-slider-handle').text(ui.value);
                            //设置开始时间  分钟
                            if ($('#custom_start').val()) {
                                var dateStartArray = TSB.splitDateTime($('#custom_start').val());
                                var timeCurrent = new Date(dateStartArray[0], dateStartArray[1], dateStartArray[2], dateStartArray[3], dateStartArray[4], dateStartArray[5]);
                            } else {
                                var timeCurrent = new Date();
                            }
                            timeCurrent.setMinutes(ui.value);
                            $('#custom_start').val(timeCurrent.format('yyyy-MM-dd hh:mm'));
                        },
                        stopFun: function (e, ui) {
                            if ($('#custom_start').val()) {
                                var dateStartArray = TSB.splitDateTime($('#custom_start').val());
                                var timeCurrentStart = new Date(dateStartArray[0], dateStartArray[1], dateStartArray[2], dateStartArray[3], dateStartArray[4], dateStartArray[5]);
                            } else {
                                var timeCurrentStart = new Date();
                            }
                            if ($('#custom_end').val()) {
                                var dateEndArray = TSB.splitDateTime($('#custom_end').val());
                                var timeCurrentEnd = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2], dateEndArray[3], dateEndArray[4], dateEndArray[5]);
                            } else {
                                var timeCurrentEnd = new Date();
                            }
                            //截止日期 起始位置
                            var currentDate = new Date();
                            //选择时间不能大于当前时间
                            if (timeCurrentStart > currentDate) {
                                $('#time-minute-slider-start').slider('value', currentDate.getMinutes());
                                $('#time-minute-slider-start span.ui-slider-handle').text(currentDate.getMinutes());
                                timeCurrentStart.setMinutes(currentDate.getMinutes());
                                $('#custom_start').val(timeCurrentStart.format('yyyy-MM-dd hh:mm'));
                            }

                            // 开始时间不能大于结束时间
                            if (timeCurrentStart > timeCurrentEnd) {
                                var timeEndAfter = timeCurrentStart.getTime() + 60 * 1000 * 30;
                                $('#custom_end').val(new Date(timeEndAfter).format('yyyy-MM-dd hh:mm'));
                                $('#datetimepickerEnd').data('datetimepicker').setDate(new Date(timeEndAfter));
                                $('#time-hour-slider-end').slider('value', new Date(timeEndAfter).getHours());
                                $('#time-minute-slider-end').slider('value', new Date(timeEndAfter).getMinutes());
                                $('#time-hour-slider-end span.ui-slider-handle').text(new Date(timeEndAfter).getHours());
                                $('#time-minute-slider-end span.ui-slider-handle').text(new Date(timeEndAfter).getMinutes());
                            }
                            //时间范围跨度  大于timeLimit
                            if ((timeCurrentEnd.getTime() - timeCurrentStart.getTime()) / (1000 * 3600 * 24) > timeLimit) {
                                var timeEndAfterRange = timeCurrentStart.getTime() + 60 * 1000 * 30;
                                $('#custom_end').val(new Date(timeEndAfterRange).format('yyyy-MM-dd hh:mm'));
                                $('#datetimepickerEnd').data('datetimepicker').setDate(new Date(timeEndAfterRange));
                                $('#time-hour-slider-end').slider('value', new Date(timeEndAfterRange).getHours());
                                $('#time-minute-slider-end').slider('value', new Date(timeEndAfterRange).getMinutes());
                                $('#time-hour-slider-end span.ui-slider-handle').text(new Date(timeEndAfterRange).getHours());
                                $('#time-minute-slider-end span.ui-slider-handle').text(new Date(timeEndAfterRange).getMinutes());
                            }
                        }
                    });
                    $('#time-minute-slider-start span.ui-slider-handle').text(time.getMinutes());
                };
                this.showTimeMinuteSliderEnd = function () {
                    var time = this.dateTimeEnd;
                    TSB.slider('#time-minute-slider-end', {
                        orientation: "horizontal",
                        range: 'min',
                        value: time.getMinutes(),
                        step: 1,
                        min: 0,
                        max: 59,
                        slideFun: function (event, ui) {
                            $('#time-minute-slider-end span.ui-slider-handle').text(ui.value);

                            //设置结束时间  分钟
                            if ($('#custom_end').val()) {
                                var dateEndArray = TSB.splitDateTime($('#custom_end').val());
                                var timeCurrent = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2], dateEndArray[3], dateEndArray[4], dateEndArray[5]);
                            } else {
                                var timeCurrent = new Date();
                            }
                            timeCurrent.setMinutes(ui.value);
                            $('#custom_end').val(timeCurrent.format('yyyy-MM-dd hh:mm'));
                        },
                        stopFun: function (e, ui) {
                            if ($('#custom_start').val()) {
                                var dateStartArray = TSB.splitDateTime($('#custom_start').val());
                                var timeCurrentStart = new Date(dateStartArray[0], dateStartArray[1], dateStartArray[2], dateStartArray[3], dateStartArray[4], dateStartArray[5]);
                            } else {
                                var timeCurrentStart = new Date();
                            }
                            if ($('#custom_end').val()) {
                                var dateEndArray = TSB.splitDateTime($('#custom_end').val());
                                var timeCurrentEnd = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2], dateEndArray[3], dateEndArray[4], dateEndArray[5]);
                            } else {
                                var timeCurrentEnd = new Date();
                            }
                            //截止日期 起始位置
                            var rangeEnd = new Date(timeCurrentStart.getTime() + timeLimit * 24 * 3600 * 1000);

                            var currentDate = new Date();
                            //选择时间不能大于当前时间
                            if (timeCurrentEnd > currentDate) {
                                $('#time-minute-slider-end').slider('value', currentDate.getMinutes());
                                $('#time-minute-slider-end span.ui-slider-handle').text(currentDate.getMinutes());
                                timeCurrentEnd.setMinutes(currentDate.getMinutes());
                                $('#custom_end').val(timeCurrentEnd.format('yyyy-MM-dd hh:mm'));
                            }

                            //开始时间不能大于结束时间
                            if (timeCurrentStart > timeCurrentEnd) {
                                $('#time-minute-slider-end').slider('value', timeCurrentStart.getMinutes());
                                $('#time-minute-slider-end span.ui-slider-handle').text(timeCurrentStart.getMinutes());
                                timeCurrentEnd.setMinutes(timeCurrentStart.getMinutes());
                                $('#custom_end').val(timeCurrentEnd.format('yyyy-MM-dd hh:mm'));
                            }
                            //结束日期不能大于 选择开始时间到范围限制日期 以外
                            if (timeCurrentEnd > rangeEnd) {
                                $('#time-minute-slider-end').slider('value', rangeEnd.getMinutes());
                                $('#time-minute-slider-end span.ui-slider-handle').text(rangeEnd.getMinutes());
                                timeCurrentEnd.setMinutes(rangeEnd.getMinutes());
                                $('#custom_end').val(timeCurrentEnd.format('yyyy-MM-dd hh:mm'));
                            }
                        }
                    });
                    $('#time-minute-slider-end span.ui-slider-handle').text(time.getMinutes());
                };


                //保存
                this.save = function () {

                    var time_step = $('#time-slider').data('uiSlider').options.value;
                    //设置时间段
                    $.cookie('time_step', time_step, {path: "/"});

                    //是否在自定义页面
                    var is_custom = $('#date-control .nav.nav-tediums>li.active a#dc-menu-custom').length > 0;

                    var datetime = new Date();

                    //设置结束时间
                    if (is_custom == true) {
                        if ($('#custom_start').val()) {
                            var dateStartArray = TSB.splitDateTime($('#custom_start').val());
                            var starTime = new Date(dateStartArray[0], dateStartArray[1], dateStartArray[2], dateStartArray[3], dateStartArray[4], dateStartArray[5]);
                        } else {
                            var starTime = new Date();
                        }
                        if ($('#custom_end').val()) {
                            var dateEndArray = TSB.splitDateTime($('#custom_end').val());
                            var endTime = new Date(dateEndArray[0], dateEndArray[1], dateEndArray[2], dateEndArray[3], dateEndArray[4], dateEndArray[5]);
                        } else {
                            var endTime = new Date();
                        }
                        if (starTime > endTime) {
                            TSB.modalAlert({status: 'danger', msg: Data.lang_time.start_after_end});
                            return false;
                        }
                        if (starTime.getTime() == endTime.getTime()) {
                            TSB.modalAlert({status: 'danger', msg: Data.lang_time.start_equal_end});
                            return false;
                        }

                        if ((endTime - starTime) / 3600 / 24 / 1000 > timeLimit) {
                            TSB.modalAlert({status: 'danger', msg: Data.lang_time.select_time_limit + timeLimit + Data.lang_time.days});
                            return false;
                        }


                        $.cookie('end_time', endTime.format('yyyy-MM-dd hh:mm:ss'), {path: "/"});
                        $.cookie('start_time', starTime.format('yyyy-MM-dd hh:mm:ss'), {path: "/"});
                        datetime = new Date($.cookie('end_time'));
                        //标题文字
                        $('#date-title').html(starTime.format('yyyy-MM-dd hh:mm') + '~' + datetime.format('yyyy-MM-dd hh:mm'));
                        $rootScope.dataStr = starTime.format('yyyy-MM-dd hh:mm') + '~' + datetime.format('yyyy-MM-dd hh:mm')
                        $scope.$broadcast('TimeChange', {start_time: starTime.format('yyyy-MM-dd hh:mm:ss'), end_time: endTime.format('yyyy-MM-dd hh:mm:ss')});

                    } else {

                        $.cookie('end_time', 'now', {path: "/"});

                        //还需要根据step计算出开始时间
                        var timeDiff = Data.lang_time.time_diff[time_step];
                        var start = new Date(new Date().getTime() - timeDiff).format('yyyy/MM/dd hh:mm:ss');
                        $.cookie('start_time', start, {path: "/"});
                        //标题文字
                        $('#date-title').html($('#show-time-step-tip').text() + '(' + Data.lang_time.from + ':' + datetime.format('yyyy-MM-dd hh:mm') + ')');
                        $rootScope.dataStr = $('#show-time-step-tip').text() + '(' + Data.lang_time.from + ':' + datetime.format('yyyy-MM-dd hh:mm') + ')'
                        $scope.$broadcast('TimeChange', {start_time: start, end_time: 'now', time_step: time_step});


                        if ($('#datetimepickerEnd').data('datetimepicker')) {
                            // 重新设置 时间控件的截止时间的endDate

                            var setEndDateEndPP = new Date();
                            setEndDateEndPP.setHours(23);
                            setEndDateEndPP.setMinutes(59);
                            $('#datetimepickerEnd').datetimepicker('setStartDate', new Date(new Date().getTime() - timeDiff));
                            $('#datetimepickerEnd').datetimepicker('setEndDate', setEndDateEndPP);
                        }
                    }


                    $('#date-control').removeClass('open');
                    TSB.eventManager.trigger('common_date');//执行事件队列
                };


            };
            var dc = new dateController();

            //时间控件标题的点击事件
            $('#date-control>a[data-toggle="open"]').click(function () {
                $(this).parent('#date-control').toggleClass('open');
                if ($(this).parent('#date-control').hasClass('open')) {
                    $(this).parent('#date-control').focus();

                    dc.init();
                    dc.showTimeSlider();
                    dc.showDatepicker();
                    dc.showTimeHourSliderStart();
                    dc.showTimeMinuteSliderStart();
                    dc.showTimeHourSliderEnd();
                    dc.showTimeMinuteSliderEnd();
                }
            });
            //保存事件
            $('#date-control-save').click(function () {
                dc.save();

            });

            //取消事件
            $('#date-control [data-dismiss="modal"]').click(function () {
                $('#date-control').removeClass('open');
            });

            //显示截止到当前标签页
            $('#dc-menu-now').click(function () {
                $('#show-custom-tip').hide();
            });
            //显示自定义时间标签页
            $('#dc-menu-custom').click(function () {
                //时间提示
                $('#show-custom-tip').show();

                //显示日期选择控件
                dc.showDatepicker();
                //显示时间选择控件
                //显示自定义时间段的 日期选择控件
                dc.showTimeHourSliderStart();
                dc.showTimeMinuteSliderStart();
                dc.showTimeHourSliderEnd();
                dc.showTimeMinuteSliderEnd();
            });


        }
    }
}]);