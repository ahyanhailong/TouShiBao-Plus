//组合图
function echartsDriverDataMixed(m, l, f){
	var n = [];
        var g = 0;
        for (var k in m.data) {
            var h = {};
            if (typeof m.data[k].data != "undefined") {
                h = m.data[k]
            } else {
                h = {name: k, data: m.data[k]}
            }
            if (l.type[g] == undefined) {
                l.type[g] = l.type[0]
            }
            h.type = l.type[g];
            n.push(h);
            g++
        }
        l.type = "line";
        m.data = n;
        var k =  echartsDriverDataLine(m, l, f);
        k.grid = {x2:80};
        return k;
}
//line 
function echartsDriverDataLine(s, v){
	var q = {
            legend: {data: []},
            series: [],
            tooltip: {show: true},
            toolbox: {
                show: true,
                color: ["#37b4b3", "#37b4b3", "#37b4b3", "#37b4b3"],
                feature: {
                    magicType: {show: true, type: ["line", "bar", "stack", "tiled"]},
                    saveAsImage: {show: true, color: "#37b4b3"}
                }
            },
            xAxis: [],
            yAxis: []
        };
        var a = [{type: "category", data: s.labels}];
        var w = [{type: "value"}];
        var t = 0;
        for (var r in s.data) {
            if (typeof s.data[r].data != "undefined") {
                var u = s.data[r].name;
                var i = s.data[r].data
            } else {
                var u = r;
                var i = s.data[r]
            }
            var j = s.data[r].type == undefined ? v.type : s.data[r].type;
            var p = {normal: {}};
            if (j == "area") {
                j = "line";
                p.normal.areaStyle = {type: "default"}
            }
            var b = 0;
            if (v.tooltip instanceof Array && t == 1 && v.tooltip.length > 1) {
                b = 1
            }
            q.legend.data.push(u);
            q.series.push({name: u, type: j, data: i, itemStyle: p, yAxisIndex: b});
            t++
        }
        if (v.tooltip != undefined) {
            var tips = v.tooltip;
            if (tips instanceof Array) {
            } else {
                tips = [v.tooltip]
            }
            q.tooltip.formatter = function (g) {
                var f = g[0][1] + "<br>";
                for (var k = 0, l = g.length; k < l; k++) {
                    if (typeof tips[k] == "undefined") {
                        var h = tips[0]
                    } else {
                        var h = tips[k]
                    }
                    f += g[k][0] + " : " + g[k][2] + " " + h + "<br>"
                }
                return f
            };
            for (var r in tips) {
                if (r <= 1) {
                    w[r] = {type: "value", axisLabel: {formatter: "{value} " + tips[r]}}
                } else {
                    break
                }
            }
        }
        if (v.category == "y") {
            q.xAxis = w;
            q.yAxis = a
        } else {
            q.yAxis = w;
            q.xAxis = a
        }
        q.grid = {x2:80};
        return q
}
// pie
function echartsDriverDataPie(g, e){
	var f = {
            legend: {data: []},
            series: [],
            tooltip: {show: true},
            toolbox: {
                show: true,
                color: ["#37b4b3", "#37b4b3", "#37b4b3", "#37b4b3"],
                feature: {
                    magicType: {show: true, type: ["line", "bar", "stack", "tiled"]},
                    saveAsImage: {show: true, color: "#37b4b3"}
                }
            }
        };
        var h = [];
        for (var d in g.data) {
            if($.isNumeric(d) && !$.isEmptyObject(g.data[d])){
                h.push(g.data[d]);
                f.legend.data.push(g.data[d].name);
            }else{
                f.legend.data.push(d);
                h.push({name: d, value: g.data[d]})
            }

        }
        f.series[0] = {name: g.name || "", type: e.type, data: h};
        if(e.type == 'ring'){
            f.series[0].type = 'pie';
            f.series[0].radius = ['35%', '55%'];
        }
        return f
}
//仪表盘
function echartsDriverDataGauge(f, d){
	var e = {
            series: [],
            tooltip:{
                trigger:"item",
                formatter: "{b}<br/>{c} "+ d.tooltip
            },
            toolbox: {
                show: false
            }
        };
        var color = d.color == undefined ? '#fabb3d' : d.color;
        e.series[0] = {
            name: d.name || "",
            type: "gauge",
            title: {show: false},
            data: [{name: f.name, value: f.value}],
            max: f.max,
            axisLine: {lineStyle: {color: [[f.value / f.max, color], [1, "#f2f4f8"], [1, "#f2f4f8"]]}},
            axisLabel: {show: false},
            splitLine: {show: false},
            axisTick: {show: false},

            detail: {show: false},
            legend: {show: false},

            min: 0
        };

        return e
}
//地图
function echartsDriverDataMap(){
	
}
//雷达
function echartsDriverDataRadar(data, opt){
	var option = {
            tooltip : {
                trigger: 'item'
            },
            legend: {
                data:[]
            },
            toolbox: {
                show : false
            },
            polar : [
                {
                    indicator : []
                }
            ],
            series:[]
        };

        var series = [];
        for (var h in data.data) {
                var name = h;
                var dData = data.data[name]


            option.legend.data.push(name);
            series.push({name: name, value: dData});
        }
        option.series[0] = {type:'radar',name:'',data:series};

        for(var i in data.labels){
            var tmp = {
                text:i,
                max:data.labels[i]
            }
            option.polar[0].indicator.push(tmp);
        }
        return option;
}
//散点图
function echartsDriverDataScatter(s, v){
	var unitx = s.labels[0];
        var unity = s.labels[1];
        var q = {
            tooltip: {
                trigger: 'item',
                formatter : function (params) {
                    return params.seriesName +'<br>'
                        + params.value[0] + unitx+'&nbsp;&nbsp;&nbsp;&nbsp;'
                        + params.value[1] + unity;
                },
                position: function(params){
                    if(params[0]<100){
                        params[0] = params[0]+100;
                    }else{
                        params[0] = params[0]-100;
                    }
                    if(params[1]<100){
                        params[1] = params[1]+100;
                    }else{
                        params[1] = params[1]-100;
                    }
                    return [params[0],params[1]];
                }
            },
            toolbox: {
                show: true,
                color: ["#37b4b3"],
                feature: {
                    saveAsImage: {show: true, color: "#37b4b3"}
                }
            },
            dataZoom: {},
            xAxis:[],
            yAxis:[],
            legend : {
                data :[]
            },
            series:[]
        };
        q.grid = {
            x2:80
        }
        q.xAxis = [
            {
                type : 'value',
                scale:true,
                axisLabel: {
                    formatter : function(v) {
                        return + v + unitx;
                    }
                }
            }
        ];
        q.yAxis =[
            {
                type : 'value',
                scale:true,
                position:'right',
                axisLabel: {
                    formatter : function(v) {
                        return + v + unity;
                    }
                }
            }
        ];
        q.dataRange = {
            min: 0,
            max: 100,
            y: 'center',
            text:['高','低'],           // 文本，默认为数值文本
            //color:['blue','yellow'],
            calculable : true
        };
        for(var r in s.data){
            var i = {
                symbol:'circle',
                color:'#37b4b3',
                type:'scatter',
                name: s.data[r].d,
                data:[[s.data[r].a, s.data[r].b, s.data[r].c]]
            };
            q.series.push(i);
        }
        return q;
}
function echartsDriverThemeDefaultTsb(){
	
}
var render_status = false;
function setOption(data, opt, instance) {
    //数据驱动，@TODO支持自定义驱动

    if (opt.type instanceof Array) {

        var driver = echartsDriverDataMixed;
        //折线图  面积图  柱状图  雷达图
    } else {
        switch (opt.type) {

            case 'pie'  :   //饼图
            case 'ring' :   //环形图
                var driver = echartsDriverDataPie;
                break;

            case 'gauge':   //仪表盘
                var driver = echartsDriverDataGauge;
                break;
            case 'map'  :   //地图
                var driver = echartsDriverDataMap;
                echarts.util.mapData.params.params.world = {
                    getGeoJson:function(callback){
                        callback(world_json);
                    }
                };
                break
            case 'radar':   //雷达图
                var driver = echartsDriverDataRadar;
                break
            case 'scatter':   //散点图
                var driver = echartsDriverDataScatter;
                break;
            case 'line' :   //折线图
            case 'area' :   //面积图
            case 'bar'  :   //柱状图
            default :       //默认
                driver = echartsDriverDataLine;
                break;
        }
    }
    //交给数据处理驱动器解析
    if (typeof opt.driver == 'function') {
        var option = opt.driver(data, opt, instance);
    } else {
        var option = driver(data, opt, instance);
    }

    if ($.isEmptyObject(option.series[0]) || option.series[0].data.length < 1) {
        $(instance.domId).showNoData();
        return false;
    }

    //事件绑定

//  var event = echarts.config.EVENT;

    var events = {
        click: 'click', //单击
        legendSelect: ''    //图例选择
    };
    for (var e in events) {
        if (typeof opt[e] == "function") {
            instance.on(events[e], opt[e]);
        }
    }
    //画图
    if($.isFunction(opt.setOption)){
        var callbackOpt = opt.setOption(option, instance,driver);
        option = $.extend({},option,callbackOpt);
    }
    instance.setOption(option);

    $(instance.dom).find('div').eq(0).css('overflow','visible');

    $(instance.domId).showLoading('hide');

    //事件
    /*===========================================
     绑定toolbox的mouseenter事件
     ============================================*/
    //是否开启toolbox
    if (!$.isEmptyObject(option.toolbox) && option.toolbox.show != false) {
        //先设置为隐藏

        instance.setOption({toolbox: {show: false}});
        //绑定mouseenter事件
        $(instance.domId).bind("mouseenter ", function (e) {
            instance.setOption({toolbox: {show: false}})
        }).bind("mouseleave", function () {
            instance.setOption({toolbox: {show: false}})
        })
    }
}




$.fn.echarts = function (setopt) {
    /**
     * 循环画图
     * @TODO 目前这种方法不支持一次请求同时画多图的情况,暂时可使用data闭包回调的方式实现，具体方法见浏览器-网页-弹窗
     *
     */
    return $(this).each(function () {
        render_status = true;
        //块级元素
        var block = $(this);
        //图表容器
        var chart = $(this).find('[data-chart]');

        try {

            var oldInstance = echarts.getInstanceById($(chart).attr('_echarts_instance_'));
            if (oldInstance) {
                block.unbind("mouseenter").unbind("mouseleave");
                oldInstance.clear();
                $(chart).removeAttr('_echarts_instance_');
                delete oldInstance;
            }
            //参数或回调
            var opt = setopt;
            if (chart.length < 1) {
                throw  new Error('找不到图表容器[data-chart]');
            }


            //执行回调获取参数
            if (typeof setopt == 'function') {
                opt = setopt($(this));
            }
            //Loading效果
            if (opt.showLoading !== false) {
                block.showLoading();
            }

            //实例化echarts                      主题，支持自定义主题
            if (opt.theme == undefined) {
//              var theme = require('echartsDriverThemeDefaultTsb');
            } else {
                var theme = opt.theme;
            }


            //实例化
            var instance = echarts.init($(chart)[0]);


            $(window).resize(function(){
                instance.resize();
            });

            if($.isFunction(opt.setTheme)){
                var callbackTheme = opt.setTheme(theme, instance,opt);
                theme = $.extend({},theme,callbackTheme);
            }

            if (!theme) {
//              throw new Error('没有获取到主题');
            }

            //设置主题
            instance.setTheme(theme);


            //解决弹窗画图问题
            if ($(chart).width() <= 200) {
                setTimeout(function () {
                   instance.resize();
                    instance.setTheme(theme);

                }, 200)
            }


            instance.domId = block;
            var data = {};
            //回调方式
            if (typeof opt.data == "function") {
                var ajaxOpt = opt.data();
            } else {
                var ajaxOpt = opt.data;
            }
            if (typeof ajaxOpt.url != 'undefined') {
                //回调数据
                $.ajax({
                    url: ajaxOpt.url,
                    type: ajaxOpt.method == "get" ? "get" : "post",
                    data: ajaxOpt.data,
                    dataType: "json",
                    success: function (response) {
                        if (typeof ajaxOpt.success == 'function') {
                            //回调success
                            data = ajaxOpt.success(response.data);
                        } else {
                            data = response.data;
                        }

                        //画图
                        if($.isEmptyObject(response.data)) {
                            block.showNoData();
                        }else{
                       	 	block.showNoData('hide');
                            setOption(data, opt, instance)
                        }

                    },
                    error: function (response) {
                        block.showNoData();
                        //throw new Error('请求失败');
                        return false;
                    }
                });

            } else {
                //静态数据
                setOption(ajaxOpt, opt, instance)
            }

        } catch (error) {
            block.showNoData();
        }
    });
};
