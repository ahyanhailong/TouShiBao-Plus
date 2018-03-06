MyApp.directive("visTopo", function () {
    //http://visjs.org/docs/network/

    function Topo(option) {
        this._option = option;
        this.element = option.element;
        this.data = option.data || {
                nodes: [],
                edges: []
            };
        this.config = $.extend(true, Topo.defaultOptions, option.config || {});
        this.events = option.events || {};

        this.init();
    }

    Topo.prototype = {
        /**
         * 初始化
         * @returns {Topo}
         */
        init: function () {

            this.nodes = new vis.DataSet(this.data.nodes);
            this.edges = new vis.DataSet(this.data.edges);

            var data = {
                nodes: this.nodes,
                edges: this.edges
            };

            var instance = this.instance = new vis.Network(this.element, data, this.config);

            // Zooms out so all nodes fit on the canvas
            var option = {
                position: {x: 0, y: 0},
                scale: 1.0,
                offset: {x: 0, y: 0},
                animation: {
                    duration: 100,
                    easingFunction: 'easeInOutQuad'
                }
            };
            instance.fit({animation: option});

            //取消拖拽后联动效果
            instance.once('afterDrawing', function () {
                instance.setOptions({nodes: {physics: false}});
            });

            this.drawExtra();
            this.handleEvents();

            return this;
        },
        /**
         * 处理额外信息显示
         * @returns {Topo}
         */
        drawExtra: function () {
            var instance = this.instance;
            var nodes = this.data.nodes;

            // canvas绘制完成后
            instance.on('afterDrawing', function (ctx) {
                $.each(nodes, function (i, node) {
                    var nodeId = node.id;
                    var nodePosition = instance.getPositions([nodeId]);
                    if (navigator.Actual_Name == 'chrom') {
                        ctx.font = 'normal 5px Arial';
                    } else {
                        ctx.font = 'normal 10px Arial';
                    }

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    if (node.title !== undefined) {
                        ctx.strokeStyle = 'white';
                        ctx.fillStyle = 'white';
                        if (node.number != undefined) {
                            ctx.strokeText(node.number, nodePosition[nodeId].x, nodePosition[nodeId].y - 12);
                            ctx.moveTo(nodePosition[nodeId].x - 15, nodePosition[nodeId].y);
                            ctx.lineTo(nodePosition[nodeId].x + 15, nodePosition[nodeId].y);
                            ctx.stroke();
                            ctx.strokeText(node.title, nodePosition[nodeId].x, nodePosition[nodeId].y + 12);
                        } else {
                            ctx.strokeText(node.title, nodePosition[nodeId].x, nodePosition[nodeId].y);
                        }

                        ctx.stroke();
                    } else if (node.number != undefined) {
                        ctx.strokeStyle = 'blue';
                        ctx.fillStyle = 'blue';
                        if (node.number != undefined) {
                            ctx.strokeText(node.number, nodePosition[nodeId].x, nodePosition[nodeId].y);
                        }
                        ctx.stroke();
                    }
                });

            });
            return this;
        },
        /**
         * 事件管理
         * @returns {Topo}
         */
        handleEvents: function () {
            var self = this;
            $.each(this.events, function (name, fn) {
                self.instance.on(name, function () {
                    if (name == 'click') {
                        this.setOptions({edges:{dashes:true}});
                        // console.log('click: do some thing!');
                    }
                    if (name == 'dragging') {
                        // console.log('dragging: do some thing!');
                    }
                    if (name == 'dragEnd') {
                        // this.setOptions({edges:{dashes:true}})
                    }
                    fn.apply(this, arguments);
                });
            });
            return this;
        },
        // 节点移动
        nodeMoveFun: function (params) {
            var instance = params.instance;
            var click_node_id = params.nodes[0];
            var positionThis = instance.getPositions(click_node_id);
            var clickNodePosition = positionThis[click_node_id]; // 记录拖动后，被拖动节点的位置
            var position = JSON.parse(localStorage.getItem("position"));
            var startNodeX, startNodeY; // 记录被拖动节点的子节点，拖动前的位置
            var numNetx, numNety; // 记录被拖动节点移动的相对距离
            var positionObj = {}; // 记录移动的节点位置信息， 用于返回
            positionObj[click_node_id] = {x: clickNodePosition.x, y: clickNodePosition.y}; // 记录被拖动节点位置信息
            return positionObj;
        },

    };

    Topo.defaultOptions = {
        autoResize:true,
        width:'100%',
        height:'100%',
        groups: {
            'cloud': {
                shape: 'image',
                image: './public/img/app_topo/cloud.png',
                size: 15
            },
            'app': {
                shape: 'image',
                image: './public/img/app_topo/php_green.png',
                size: 30
            },
            'app_normal': {
                shape: 'image',
                image: './public/img/app_topo/app_normal.png',
                size: 30
            },
            'app_slow': {
                shape: 'image',
                image: './public/img/app_topo/app_slow.png',
                size: 30
            },
            'app_very_slow': {
                shape: 'image',
                image: './public/img/app_topo/app_very_slow.png',
                size: 30
            },
            'app_stop': {
                shape: 'image',
                image: './public/img/app_topo/app_stop.png',
                size: 30
            },
            'app_error': {
                shape: 'image',
                image: './public/img/app_topo/app_error.png',
                size: 30
            },
            'app_nodata': {
                shape: 'image',
                image: './public/img/app_topo/app_nodata.png',
                size: 30
            },

            'server': {
                shape: 'image',
                image: './public/img/app_topo/server.png',
                size: 30
            },
            'nginx': {
                shape: 'image',
                image: './public/img/app_topo/nginx.png',
                size: 30
            },
            'apache': {
                shape: 'image',
                image: './public/img/app_topo/apache.png',
                size: 30
            },
            'IIS': {
                shape: 'image',
                image: './public/img/app_topo/IIS.png',
                size: 30
            },
            'tomcat': {
                shape: 'image',
                image: './public/img/app_topo/tomcat.png',
                size: 30
            },
            'curl': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'io': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'database': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'sqlserver': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'mongodb': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'weblogic': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'memcache': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'redis': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'mysql': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'db2': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'oracle': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'Oracle': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'PostgreSQL': {
                shape: 'image',
                image: './public/img/app_topo/db.png',
                size: 15
            },
            'other_RESTApi': {
                shape: 'image',
                image: './public/img/app_topo/cloud.png',
                size: 15
            },
        },
        nodes: {
            font: {
                color: '#ffffff',
                size: 10
            }
        },
        edges: {
            arrows: 'to',
            smooth: {
                enabled: false
            },
            color: {
                color: '#dddddd',
                highlight: 'green'
            },
            length: 200,
            width: 1,
            selectionWidth: 0,
            hoverWidth: 0.1,
            font: {
                color: '#ffffff',
                size: 10,
                strokeWidth: 0,
            }
        },
        physics: {
            barnesHut: {
                gravitationalConstant: -8000,
                centralGravity: 1
            }
        },
        layout: {
            randomSeed: 1,
            // improvedLayout:true,
            hierarchical: {
                parentCentralization:true,//布局算法完成后，父节点将再次居中。
                blockShifting:true,
                edgeMinimization:true,
                enabled: false,
                direction: 'LR',   // UD, DU, LR, RL
                sortMethod: 'hubsize' // hubsize, directed
            }
        },
        interaction: {
            multiselect: true,
            hover: true,
            hoverConnectedEdges: false,
            zoomView:false,
        },
        clickToUse: false
    };

    return {
        restrict: 'AE',
        scope: {
            data: '=data',
            click: '&click',
            dragging: '&dragging',
            doubleClick: '&doubleClick',
            dragEnd: '&dragEnd',
            selectNode: '&selectNode',
        },
        controller: function ($scope) {
        },
        link: function (scope, elem, attrs) {
            /*var data = {
                "edges": [
                    {
                        "arrows": "to",
                        "from": "3014380075581533",
                        "id": "3014380075581533_curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo",
                        "label": "lines-label",
                        "to": "curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo"
                    },
                    {
                        "arrows": "to",
                        "from": "curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo",
                        "id": "111",
                        "label": "lines-label",
                        "to": "111"
                    },
                    {
                        "arrows": "to",
                        "from": "111",
                        "id": "222",
                        "label": "lines-label",
                        "to": "222"
                    }
                ],
                "nodes": [
                    {
                        "group": "cloud",
                        "id": "curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo",
                        "label": "Api:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo"
                    }, {
                        "group": "cloud",
                        "id": "111",
                        "label": "111"
                    }, {
                        "group": "cloud",
                        "id": "222",
                        "label": "222"
                    },
                    {
                        "group": "app_slow",
                        "id": "3014380075581533",
                        "label": "flights.example.com:80",
                        "role": "",
                        "title": "JAVA"
                    }
                ]
            };*/

            function nodeMoveFun(params,position) {
                if(position.nodes[0]){
                    var instance = params.instance;
                    var nodesArr = {app_id:'',nodes_position:{}};
                    $.each(params.data.nodes,function (index,val) {
                        var pos = instance.getPositions(val.id);
                        nodesArr["nodes_position"][val.id] = pos[val.id];
                    })
                }
                return nodesArr;
            }

            scope.$watch('data', function (data) {
                if (data) {
                    var topo = new Topo({
                        element: elem[0],
                        data: data,
                        events: {
                            click: function (event) {
                                scope.click({event: event, topo: topo});
                            },
                            //选中节点
                            selectNode: function (event) {
                                scope.selectNode({event: event, topo: topo});
                            },
                            //双击节点 隐藏或者显示子节点
                            doubleClick: function (event) {
                                scope.doubleClick({event: event, topo: topo});
                            },
                            //拖动结束后
                            dragEnd: function (event) {
                                scope.dragEnd({event: event, topo: topo});
                                // nodeMoveFun(topo,event)
                                scope.$emit('nodesArr',nodeMoveFun(topo,event));//拖拽结束派发nodes节点位置信息
                                // console.log('拖动后组装好的节点位置信息',nodeMoveFun(topo,event))

                            },
                            //拖动节点
                            dragging: function (event) {//拖动进行中事件
                                scope.dragging({event: event, topo: topo});
                            },
                        }
                    });
                }
            });

        }
    };
});