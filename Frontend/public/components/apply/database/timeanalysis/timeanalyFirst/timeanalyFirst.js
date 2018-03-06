MyApp.controller('timeanalyFirst',['$scope','timeanalysisService','dateTimeService','$rootScope','$state',function($scope,timeanalysisService,dateTimeService,$rootScope,$state){
	$rootScope.sideBarKey = 'database'
	$rootScope.timeAnaly = true
	$scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;
    $scope.app_id = $state.params.app_id;

    $scope.start_time = $scope.$parent.start_time;
    $scope.end_time = $scope.$parent.end_time;
    
    $scope.dataSource = {
        app_id: $scope.app_id,
        start_time: $scope.start_time,
        end_time: $scope.end_time,
        account_id: $scope.account_id,
        sql: $scope.sql
    }
    $scope.$parent.$on('filterChange', function ($event, info) {
		var json = {}
		$.each(info,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
			if(key != 'resptime'){
				json[key] = val
			}else{
				json['wt_from'] = val[0]
				json['wt_to'] = val[1]
			}
		})
		$.extend($scope.dataSource,json)
   })
    $scope.$on('dataTimeChange',function (event,info) {
        console.log(info)
        $scope.start_time = info.start_time
        $scope.end_time = info.end_time
    })
     $scope.$watchGroup(
    	[
	    	'dataSource.db_name',
	    	'dataSource.instance_raw',
	    'dataSource.db_table',
	    'dataSource.db_oper_type',
	    'dataSource.reqUri_raw',
	    'dataSource.wt_from',
	    'dataSource.wt_to'
    ]
    	, function (newValue, oldValue) {
        	
        if (newValue != oldValue) {
            $.extend(true,$scope.dataSource,{
                start_time : $scope.start_time,
                end_time : $scope.end_time,
            })
            timeanalysisService.initChartData($scope.dataSource)
            timeanalysisService.getAllSqlList($scope.dataSource, function () {
                $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
                $scope.total_row = timeanalysisService.total_row
            })
        }
    })

    $scope.$watchGroup(['start_time','end_time'],function (newVal,oldVal) {
        if($scope.start_time){
            $.extend(true,$scope.dataSource,{
                start_time : $scope.start_time,
                end_time : $scope.end_time,
            })
            timeanalysisService.initChartData($scope.dataSource,function (resptime) {
                $scope.$parent.wheres.resptime = resptime
                $scope.$apply()

            })
            timeanalysisService.getAllSqlList($scope.dataSource, function () {
                $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
                $scope.total_row = timeanalysisService.total_row
            })
        }
    })


	//SQL列表排序
	$scope.orderby = function (event) {
        var order = $(event.currentTarget).parents('th').attr('data-item')
        var sort = $(event.currentTarget).hasClass('fa-sort-desc') ? 'asc' : 'desc';
        $scope.dataSource.order = order
        $scope.dataSource.sort = sort
        $scope.dataSource.sql = $scope.sql
        
        timeanalysisService.getAllSqlList($scope.dataSource, function () {
            $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
            $scope.total_row = timeanalysisService.total_row
        })
    }
	// SQL列表根据分页改变刷新
    $scope.changeSqlList = function () {
		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.page_no

        // timeanalysisService.getAllSqlList($scope.dataSource, function () {
        //     $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
        //     $scope.total_row = timeanalysisService.total_row
        // })
    };
	//SQL列表点击事件
	$scope.clickSQL = function(info){
		window.location.replace('#/navigation/apply/database/timeanalySecond/'+$scope.app_id+'/'+info)
	}
	//下载
	$scope.download = function () {
        var URL = timeanalysisService.create_export_file
        var target = 'timeAggsList'
		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.target = target
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		timeanalysisService.downloadSQL($scope.dataSource)
    }
}])