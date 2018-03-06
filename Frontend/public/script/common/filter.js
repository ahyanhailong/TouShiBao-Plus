(function () {
    /**
     * 遍历json返回长度length
     * @param obj
     * @returns {number}
     */
    function getJsonLenth(obj) {
        var length = 0;
        for (var key in obj) {
            length++;
        }
        return length;
    }

    /**
     * 获取对象keys
     * @param obj
     * @returns {Array}
     */
    // function getObjKeys(obj) {
    //     var data = [];
    //
    //     if (Object && Object.keys) {
    //         data = Object.keys(obj);
    //     } else {
    //         for (var key in obj) {
    //             data.push(key);
    //         }
    //     }
    //     return data;
    // }

    function getObjKeys(obj) {
        var data = [];   //原始值
        var text = []; 　//显示值

        if (Object && Object.keys) {
            data = Object.keys(obj);
            for (var key in obj) {
                text.push(decodeURIComponent(obj[key]));
            }
            // Object.values()  mac 下不兼容
            // text = Object.values(obj);
        } else {
            for (var key in obj) {
                data.push(key);
                text.push(decodeURIComponent(obj[key]));
            }
        }
        return {value: data, text: text};
    }

    /**
     * 辅助类
     * @param isMultiple
     * @constructor
     */
    function SData(isMultiple) {
        this.data = {};
        this.isMultiple = isMultiple || false;
        this.pre = {};
    }

    SData.prototype = {
        // 添加
        add: function (key, value) {
            if (!this.isMultiple) {
                this.data = {};
            }
            this.data[key] = value;
        },
        // 移除
        remove: function (key) {
            delete this.data[key];
        },
        // 获取数据大小
        size: function () {
            return getObjKeys(this.get()).length;
        },
        // 获取数据
        get: function () {
            return this.data;
        },
        // 缓存当前数据
        cache: function () {
            this.pre = $.extend({}, this.data);
        },
        // 回复到上一条数据
        restore: function () {
            this.data = $.extend({}, this.pre);
        },
        // 清除当前数据
        clear: function () {
            this.data = {};
        }
    };

    /**
     * 搜索类
     * @param element
     * @param option
     * @constructor
     */
    function Search(element, option) {
        var self = this;
        self.element = element.find('input');
        self.option = option || {};
        self.value = '';

        var timer = null;
        this.element.on('keydown', function () {
            clearTimeout(timer);
            var _this = this;
            timer = setTimeout(function () {
                self.value = $.trim(_this.value) || '';
                self.search();
            }, 400);
        });
    }

    Search.prototype = {
        search: function () {
            var self = this;
            if (typeof self.option.callback == 'function') {
                self.option.callback(self.value);
            }
            return self;
        },
        clear: function () {
            this.element.val('');
            this.value = '';
            return this;
        }
    };

    /**
     * 下拉插件类操作
     * @param element   当前元素
     * @param option    配置信息
     * @constructor
     */
    function Select(element, option) {
        this.element = element;
        this.option = option || {};
        this.value = element.find('[tsb-select-value]');
        this.valueCount = element.find('[tsb-select-value-count]');
        this.result = element.find('[tsb-select-result]');
        this.content = element.find('[tsb-select-content]');
        this.search = element.find('[tsb-select-search]');
        this.resultCount = element.find('[tsb-select-result-count]');
        var isMultiple = option.type == 'checkbox' ? true : false;
        this.sData = new SData(isMultiple);
        this.isRemove = true;
    }

    /**
     * 初始化
     * @returns {Select}
     */
    Select.prototype.init = function () {
        var self = this;

        this.makeItem();

        // 确定操作
        this.element.on('click', '[tsb-ok]', function () {

            // if (!!self.sData.size()) {
            //     var result = getObjKeys(self.sData.get());
            //     var v = result.join(',');
            //     v = decodeURIComponent(v);
            //     self.value.html(v).attr('title', v);
            //     self.sData.cache();
            //     self.hide();
            //
            //     // 不能删除组件
            //     self.isRemove = false;
            //
            //     if (typeof self.option.success == 'function') {
            //         self.option.success(result);
            //     }
            // } else {
            //     if (typeof self.option.nodata == 'function') {
            //         self.option.nodata();
            //     }
            // }
            if (getJsonLenth(self.sData.data)) {
                var result = getObjKeys(self.sData.get());
                var v = result.text.join(',');

                if (self.sData.isMultiple) {
                    //多选
                    // self.value.html(v).attr('title', v);
                    var len = result.text.length;
                    self.value.html(len).attr('title', v);
                    self.valueCount.html(result.text.length);
                } else {
                    //单选
                    self.value.html(v).attr('title', v);
                }

                self.sData.cache();
                self.hide();

                // 不能删除组件
                self.isRemove = false;

                if (typeof self.option.success == 'function') {
                    if (self.flush) {
                        self.option.success(result.value, self.flush);
                        self.flush = false;
                    } else {
                        self.option.success(result.value);
                    }
                }
            } else {
                if (typeof self.option.nodata == 'function') {
                    self.option.nodata();
                }
            }

        })
            // 取消按钮
            .on('click', '[tsb-cancel]', function () {
                self.sData.restore();
                self.handleResult();
                // 重新渲染html
                search.clear().search();
                self.hide();
                if($.isFunction(self.option.cancel)){
                    self.option.cancel();
                }
                // 是否删除当前组件
                if (self.isRemove) {
                    self.element.remove();
                }

            })
            // 重置操作
            .on('click', '[tsb-reset]', function () {
                self.sData.clear();
                self.content.find('input').prop('checked', false);
                self.handleResult();
            });

        // 初始化搜索框
        var search = self.initSearch();

        return this;
    };

    /**
     * 初始化搜索框
     * @returns {Search}
     */
    Select.prototype.initSearch = function () {
        var self = this;
        // 初始化搜索框
        var search = new Search(this.search, {
            callback: function (val) {
                if (!self.option.searchUrl || !self.option.searchKey) {
                    throw Error('搜索接口链接或者搜索标记key不存在！');
                    return;
                }

                if (val == '') {
                    self.makeItem();
                    return;
                }

                var key = self.option.searchKey;
                $.post(self.option.searchUrl, $.extend({
                    key: val
                }, self.option.searchParams || {}), function (res) {
                    var data = self.option.searchFilter(res);
                    self.makeItem(data, true);
                });
            }
        });
        return search;
    };

    /**
     * 根据数据生成item
     * @returns {string}
     */
    Select.prototype.makeItem = function (dt, noAppend) {

        function makeHtml(type, data) {
            return '<div class="filter_overflow ' + type + '">' +
                '<label title="'+data.text+'">' +
                '<input type="' + type + '" name="tsb-select-item' + timestamp + '" value="' + encodeURIComponent(data.value) + '" tsb-select-text="' + encodeURIComponent(data.text) + '" >' +
                data.text +
                '</label>' +
                '</div>'
        }

        var self = this;
        var html = '';
        var timestamp = (new Date).getTime();
        var data = self.filterData(dt || self.option.data);

        for (var v in data) {
            html += makeHtml(self.option.type, {value: v, text: data[v]});
        }

        self.content.html(html);

        // 为每个item绑定事件
        self.content.on('click', 'input', function () {
            var _this = $(this);
            var isChecked = _this.prop('checked');
            if (isChecked) {
                self.sData.add(_this.val(), _this.attr('tsb-select-text'));
            } else {
                self.sData.remove(_this.val());
            }
            self.handleResult();
        });

        // 处理已选中元素
        var checkValues = getObjKeys(self.sData.get()).value;
        // var checkValues = getObjKeys(self.sData.get());
        for (var i = 0, len = checkValues.length; i < len; i++) {
            var input = self.content.find('input[value="' + checkValues[i] + '"]');

            // 处理列表中不存在数据
            if (!noAppend && !input.size()) {
                input = $(makeHtml(self.option.type, {value: checkValues[i], text: self.sData.data[checkValues[i]]}));
                input.appendTo(self.content);
                input = input.find('input');
            }

            input.prop('checked', true);

        }

        return html;
    };

    /**
     * 统一过滤数据格式
     * @param data
     * 兼容两种数据格式
     * 1.['中国'，'山西']
     * 2[{value:"china",text:"中国"}，{value:"shanxi",text:"山西"}]
     */
    Select.prototype.filterData = function (data) {
        var wait = {};
        if (data instanceof Array) {
            for (var i = 0, l = data.length; i < l; i++) {
                if (typeof data[i] == 'object') {
                    wait[data[i].value] = data[i].text;
                } else {
                    wait[data[i]] = data[i];
                }
            }
        } else {
            throw Error('源数据必须为数组格式！');
        }
        return wait;
    };

    /**
     * 手动设置数据
     * @param data
     */
    Select.prototype.setDefault = function (data , trigger) {
        var self = this;
        var originalData = self.filterData(self.option.data);

        $.each(data, function (i, dt) {
            if(typeof dt == 'object'){
                //兼容对象类型的{value: '',text:''} 类型
                self.sData.add(dt.value, dt.text);
            }else{
                self.sData.add(dt, originalData[dt] || dt);
            }
        });
        self.makeItem();
        self.handleResult();

        if(trigger==undefined) {
            self.element.find('[tsb-ok]').trigger('click');
        }

        return this;
    };

    /**
     * 操作结果
     */
    Select.prototype.handleResult = function (pre) {
        // var v = getObjKeys(this.sData.get()).join(',');
        // v = decodeURIComponent(v);
        // this.result.html(v).attr('title', v);

        if (pre) {
            var text = getObjKeys(pre).text;
        } else {
            var text = getObjKeys(this.sData.get()).text;
        }
        if (this.sData.isMultiple) {
            //多选
            this.result.attr('title', text.join(','));
            this.resultCount.html(text.length);
        } else {
            //单选
            this.result.html(text.join(',')).attr('title', text.join(','));
        }
    };

    /**
     * 打开/关闭下拉
     */
    Select.prototype.show = function () {
        this.element.addClass('open');
        return this;
    };
    Select.prototype.hide = function () {
        this.element.removeClass('open');
        return this;
    };

    /**
     * radio & checkbox 操作
     * @param option
     * @returns {*}
     */
    $.fn.tsbSelect = function (option) {
        return this.each(function () {
            var self = $(this);

            var select = self.data('tsb-select');
            if (!select) {
                var select = new Select(self, option).init();
                self.data('tsb-select', select);
            } else {
                select.show();
            }
            // 处理下拉
            handleToggle(self, select);
        });
    };

    /**
     * 下拉Range类
     * @param element
     * @param option
     * @constructor
     */
    function Range(element, option) {
        this.element = element;
        this.option = option || {};

        this.value = element.find('[tsb-range-value]');
        this.select = element.find('[tsb-range-select]');
        this.unit = element.find('[tsb-range-unit]');
        this.text = element.find('[tsb-range-text]');
        this.from = element.find('[tsb-range-from]');
        this.to = element.find('[tsb-range-to]');

        this.sData = new SData(true);
        this.wait = this.filterData(option.data);
        this.isRemove = true;
    }

    Range.prototype = {
        init: function () {
            var self = this;

            self.makeItem();

            function initSelect() {
                var val = self.select.val();
                self.unit.html(self.wait[val].unit);
                if (self.isRemove) {
                    self.text.html(self.wait[val].text);
                }
            }

            initSelect();

            // 下拉菜单改变
            self.select.change(function () {
                initSelect();
            });

            // 确定
            self.element.on('click', '[tsb-ok]', function () {
                var from = self.from.val();
                var to = self.to.val();

                if (from != '' || to != '') {

                    self.handleResult();
                    self.hide();

                    // 缓存下拉框信息
                    self.sData.add('select', self.wait[self.select.val()]);
                    // 缓存from和to值
                    self.sData.add('from', from);
                    self.sData.add('to', to);

                    if (typeof self.option.success == 'function') {
                        self.option.success([from, to]);
                    }

                    // 不能删除组件
                    self.isRemove = false;
                } else {
                    if (typeof self.option.nodata == 'function') {
                        self.option.nodata([from, to]);
                    }
                }

            })
                // 取消
                .on('click', '[tsb-cancel]', function () {
                    self.hide();
                    self.restore(self.sData.get());
                    if($.isFunction(self.option.cancel)){
                        self.option.cancel();
                    }
                    // 是否删除当前组件
                    if (self.isRemove) {
                        self.element.remove();
                    }

                })
                // 起始值设置
                // .on('keydown', '[tsb-range-from],[tsb-range-to]', function (e) {
                //     if (!(!isNaN(e.key) || e.keyCode == 8)) {
                //         console.log('只能输入数字或者删除输入值！');
                //         return false;
                //     }
                // });
            .on('keydown', '[tsb-range-from],[tsb-range-to]', function (e) {
                var allow = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
                if ($.inArray(e.key, allow) >= 0 || e.keyCode == 8) {
                    if (e.keyCode != 8) {
                        if (!$(this).val() && e.keyCode == 190) {
                            console.log('首字符不能是.');
                            return false;
                        }
                        var spl = $(this).val().split('.');
                        if (spl.length == 2 && e.keyCode == 190) {
                            console.log('不能出现多个小数点');
                            return false;
                        }
                        if (spl.length == 2 && spl[1].length >= 2) {
                            console.log('小数位数不能超过2位');
                            return false;
                        }
                    }
                } else {
                    console.log('字符不合法');
                    return false;
                }

            });

            return this;
        },
        /**
         * 下拉列表
         * @returns {Range}
         */
        makeItem: function () {
            var self = this;
            var html = '';
            for (var v in self.wait) {
                html += '<option value="' + v + '">' + self.wait[v].text + '</option>';
            }
            self.select.html(html);
            return this;
        },
        // 数据过滤
        filterData: function (data) {
            var wait = {};
            if (data instanceof Array) {
                for (var i = 0, l = data.length; i < l; i++) {
                    wait[data[i].value] = {
                        value: data[i].value,
                        text: data[i].text || data[i].value,
                        unit: data[i].unit
                    };
                }
            } else {
                throw Error('源数据必须为数组格式！');
            }
            return wait;
        },
        handleResult: function () {
            var val = this.select.val();
            var dt = this.wait[val];
            this.text.html(dt.text);
            var rangeStr = new Array();
            var start = this.from.val();
            var end = this.to.val();
            if (start && end) {
                rangeStr.push(start + dt.unit);
                rangeStr.push(end + dt.unit);
            } else {
                if (start) {
                    rangeStr.push('大于等于' + start + dt.unit);
                }
                if (end) {
                    rangeStr.push('小于等于' + end + dt.unit);
                }
            }
            this.value.html(rangeStr.join('--'));
            this.value.attr('title', rangeStr.join('--'));
            // if(this.from.val() != '' && this.to.val() != ''){
            //     this.value.html(this.from.val() + dt.unit + '--' + this.to.val() + dt.unit);
            // }else if(this.from.val() != ''){
            //     this.value.html('大于等于' + this.from.val() + dt.unit);
            // }else if(this.to.val() != ''){
            //     this.value.html('小于等于' + this.to.val() + dt.unit);
            // }

        },
        // 回复上一条数据
        restore: function (dt) {
            if(dt.from != undefined || dt.to != undefined){
                this.select.val(dt.select.value);
                this.unit.html(dt.select.unit);
                this.from.val(dt.from);
                this.to.val(dt.to);
            }
        },
        // 手动设置默认
        setDefault: function (dt) {
            var self = this;
            self.restore({
                select: self.wait[dt.selectValue],
                from: dt.from,
                to: dt.to
            });
            self.element.find('[tsb-ok]').trigger('click');
        },
        // 打开/隐藏下拉
        show: function () {
            this.element.addClass('open');
            return this;
        },
        hide: function () {
            this.element.removeClass('open');
            return this;
        }
    };

    /**
     * range操作，比如响应时间
     * @returns {*}
     */
    $.fn.tsbRange = function (option) {
        return this.each(function () {
            var self = $(this);
            var range = self.data('tsb-range');
            if (!range) {
                range = new Range(self, option).init();
                self.data('tsb-range', range);
            } else {
                range.show();
            }

            // 处理下拉
            handleToggle(self, range);
        });
    };

    /**
     * 设置默认值
     * @param data
     */
    $.fn.tsbSetData = function (data , trigger) {
        if (this.data('tsb-select')) {
            this.data('tsb-select').setDefault(data , trigger)
        } else if (this.data('tsb-range')) {
            this.data('tsb-range').setDefault(data);
        }
    };

    /**
     * 处理下拉隐藏、显示、删除
     * @param elem
     * @param obj
     */
    function handleToggle(elem, obj) {
        elem.on('click', '[tsb-toggle]', function (e) {
            if (elem.hasClass('open')) {
                //elem.find('[tsb-cancel]').trigger('click');
                elem.removeClass('open')
            } else {
                elem.addClass('open');
            }
            e.stopPropagation();
        })
            .on('click', '[tsb-remove]', function () {
                if (typeof obj.option.remove == 'function') {
                    obj.option.remove();
                }
                elem.remove();
            });
    }


})();