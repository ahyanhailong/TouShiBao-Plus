
MyApp.controller('snapshoot', ['$scope', '$rootScope','snapshootService','$location','dataTimeDefault','$state','filterRespTime', function ($scope,$rootScope,snapshootService,$location,dataTimeDefault,$state,filterRespTime) {
	$rootScope.SQL = false;
	
	$scope.total_row = 0
	$scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;
    $scope.app_id = $state.params.app_id
    $scope.start_time = dataTimeDefault.start_time
    $scope.end_time = dataTimeDefault.end_time
    $scope.uri = decodeURIComponent($state.params.uri)


    $scope.dataSource = {
        app_id: $scope.app_id,
        start_time : $scope.start_time,
        end_time : $scope.end_time,
        uri : $scope.uri
    }
    $scope.$watchGroup(['start_time1','end_time1'],function (newVal,oldVal) {
        if(newVal[0]){
            $scope.dataSource.start_time = new Date(newVal[0]).getTime()
            $scope.dataSource.end_time = new Date(newVal[1]).getTime()
            //响应时间分部
            snapshootService.respTimeParcel($scope.dataSource)
            //快照分析 快照列表
            $.extend(true,$scope.dataSource,{order:'resp_time'})
            snapshootService.getSqlSnapList($scope.dataSource,function (respon) {
                $scope.qlSnapList = respon.data.data
                $scope.total_row = respon.data.data.total_items
            })
        }
    })

	$scope.changeSqlList = function (currentPage,perPage) {
    	$scope.page_no = currentPage
        $scope.sum_per_page = perPage
    }
    $scope.$watchGroup(['page_no'],function (newVal,oldVal) {
        if(newVal != oldVal){
            $scope.dataSource.page = $scope.page_no
            snapshootService.getSqlSnapList($scope.dataSource,function (respon) {
                $scope.qlSnapList = respon.data.data
                $scope.total_row = respon.data.data.total_items
            })
        }
    })
	$('.icon-help').hover(function(){
		$('.popover').popover();
	})

    // 过滤列表配置
    $scope.whereList = ['resptime', 'domain', 'db_name', 'instance_raw', 'db_table', 'db_oper_type', 'reqUri_raw']
    // 条件列表
    $scope.wheres = {
        //resptime: ['22', '44'],
        //domain: 'app-v3.jiankongbao.com',
        //db_name: ['mySql']
    };
    $scope.whereApis = {
        getHistory: env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.GET_RELATION_DB_FILTRATION_CONDITION,
        deleteHistory: env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.DELETE_DB_FILTERATION_CONDITION,
        saveWhere: env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.SAVE_DB_FILTER_CONDITION,
        search: env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.GET_FILTER_ELEMENT_FOR_DB
    };
    // 条件改变
    $scope.change = function (event,info) {
        var wheres = filterRespTime.RespTime($scope.wheres)
        $.extend(true,$scope.dataSource,wheres)
        //快照分析 快照列表
        $.extend(true,$scope.dataSource,{order:'resp_time'})
        snapshootService.getSqlSnapList($scope.dataSource,function (respon) {
            $scope.qlSnapList = respon.data.data
            $scope.total_row = respon.data.data.total_items
        })

    }
    $scope.$watchGroup(['wheres'], function (newval, oldval) {
        if (newval != oldval) {
            $scope.change();
        }

    })


    
    //快照分析列表搜索
    $scope.search = function ($event) {
        
    }

}])