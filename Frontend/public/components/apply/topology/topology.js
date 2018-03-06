
MyApp.controller('topology', ['$scope', '$rootScope','topologyService','$http','$state', function ($scope,$rootScope,topologyService,$http,$state) {

	$rootScope.sideBarKey = 'topology';
	$scope.topoData = [];
	$scope.app_id = $state.params.app_id
	$scope.requestStatisData = ''
	$scope.dataSource = {
		app_id : $scope.app_id
	}

	$url_map = {
		'topo_data' : env_config.API.apply_topolog.GET_TOPO_DATA
	};


	$scope.$watchGroup(['start_time1','end_time1'],function (newVal,oldVal) {
        if(newVal[0]){
            $scope.dataSource.start_time = new Date(newVal[0]).getTime()
            $scope.dataSource.end_time = new Date(newVal[1]).getTime()
            //请求统计
            topologyService.requestStatistical($scope.dataSource,function (respon) {
                $scope.requestStatisData = respon.data.data
            })
            topologyService.requestCountFn($scope.dataSource,function (respon) {
                $scope.requestCountData =  respon
            })
            topologyService.respTime($scope.dataSource ,function (respon) {
                $scope.repTimeData =  respon
            })

            topologyService.Error($scope.dataSource ,function (respon) {
                $scope.ErrorData =  respon
            })
            topoChart()
        }
    })
    $.cookie('noChangeCookie',false)//代表时间插件选择日期时是否种cookie    true：不种cookie    false ：种cookie


    function topoChart() {
        // 画拓扑图
        $.ajax({
            type: "GET",
            url: $url_map['topo_data'],
            data: $scope.dataSource,
            dataType: "json",
            success: function(info){
                $scope.$apply(function () {
                    $scope.topoData = info.data;//给拓扑图传数据
                });
            },
            error: function(res, textStatus, error){

            }
        });
        $scope.topoClick = function (event,topo) {//拓扑图点击事件
            console.log('点击事件触发：',event)
            console.log()
            var eventNodes = event.nodes[0]
            var nodes = topo.data.nodes
            var nodesMsg
            for (i=0 ; i < nodes.length ; i ++) {
                if(eventNodes == nodes[i].id){
                   $scope.nodesMsg = nodes[i]
                    break;
                }
            }
            console.log($scope.nodesMsg)
            if($scope.nodesMsg != undefined && $scope.nodesMsg.extra_info ){
                $.extend($scope.dataSource,{
                    node_id : $scope.nodesMsg.id,
                    app_to_db : $scope.nodesMsg.extra_info.db_con

                })
                topologyService.topoMsg($scope.dataSource,function (respon) {
                    console.log(respon)
                    if(respon.code == '1000'){
                        $scope.topoModelTableMsg = respon.data
                        $scope.$apply()
                    }
                })
                var nodePosition = getNodePosition(event, $('#Topu'))
                $('#pop_up').css({'top':'0px','left':'0px'})
                $('#pop_up').css({left:nodePosition.x,top:nodePosition.y});

                if(event.nodes.length == 0){
                    $('#pop_up').hide()
                }else{
                    $('#pop_up').slideDown();
                }
            }else{
                $('#pop_up').hide()
            }


        };
        $scope.closePope = function (event) {
            $('#pop_up').hide()
        }
        $scope.topoDragging = function (event,arr) {//拓扑图拖拽事件
            console.log('拖拽事件触发')
            // console.log('拖拽事件触发',arr)
            // console.log('拖拽事件触发:',event)
        };
        $scope.topoDragEnd = function (event,arr) {//拓扑图拖拽事件
            console.log('拖拽事件结束',arr);
            console.log('拖拽事件结束:',event);
        };
        $scope.$on('nodesArr', function (event, data) {//拓扑图拖拽事件结束触发
            console.log('拖拽事件结束', data);
        });
    }


    /* 拓扑图2层详细数据 */

    var getNodePosition = function (ev,dom) {
        DomWidth = dom.width()
        DomHeight = dom.height()
        var mousePositionX = ev.pointer.DOM.x
        var mousePositionY = ev.pointer.DOM.y
        if(mousePositionX <200){
            m_clientX = 0
        }else{
            m_clientX = ev.pointer.DOM.x-200
        }


        m_clientY = ev.pointer.DOM.y +50


        // var eviel =  window.event || arguments.callee.caller.arguments[0];
        // var scrollTop = $(document).scrollTop();
        // // return {'x':e.clientX,'y':e.clientY+scrollTop}
        return {'x': m_clientX, 'y': m_clientY}
    }

    var nodeClickInit = function () {
        // $(".tology-click ul li[class='active']").removeAttr('class')
        // $('.tology-click ul li a.overview').parent().addClass('active')
        // $('.tology-click .tab-content #overview').addClass('active')
        // $('.tology-click tbody').empty()

        $('#detail_business .nav-tology .overview').trigger('click');

    }

}])
