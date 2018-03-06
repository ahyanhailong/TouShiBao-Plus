MyApp.controller('timeanalySecond',['$scope','$location','timeanalysisService','dateTimeService','$rootScope','$state',function($scope,$location,timeanalysisService,dateTimeService,$rootScope,$state){
	$rootScope.sideBarKey = 'database'
	$rootScope.timeAnaly = true
	
	$scope.second_total_row = timeanalysisService.second_total_row;//总页数

    $scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;


    $scope.start_time = $scope.$parent.start_time;
    $scope.end_time = $scope.$parent.end_time;
    $scope.sql = $state.params.sql
    
    $scope.dataSource = {
        app_id: $scope.app_id,
        start_time: $scope.start_time,
        end_time: $scope.end_time,
        account_id: $scope.account_id,
        sql: $scope.sql
    }
	$scope.filterdata = {}
    $.each($scope.$parent.wheres,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
		if(key != 'resptime'){
			$scope.filterdata[key] = val
		}else{
			$scope.filterdata['wt_from'] = val[0]
			$scope.filterdata['wt_to'] = val[1]
		}
	})
	$.extend(true,$scope.dataSource, $scope.filterdata);
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
            timeanalysisService.initChartData($scope.dataSource)
            //调用者占比
			timeanalysisService.DbCaller($scope.dataSource)
            timeanalysisService.requestQuickSql($scope.dataSource, function () {
	            $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
	            $scope.second_total_row = timeanalysisService.second_total_row
	        })
        }
    })
	 //数据库趋势图
	timeanalysisService.getOverDbTrendLine($scope.dataSource)
	//时间分布图
	timeanalysisService.getTimeDistributionLine($scope.dataSource)
	//调用者占比
	timeanalysisService.DbCaller($scope.dataSource)

	//列表排序
	 $scope.orderby = function (event) {

        var order = $(event.currentTarget).parents('th').attr('data-item')
        var sort = $(event.currentTarget).hasClass('fa-sort-desc') ? 'asc' : 'desc';
        $scope.dataSource.order = order
        $scope.dataSource.sort = sort
        $scope.dataSource.sql = $scope.sql
        
	    timeanalysisService.requestQuickSql($scope.dataSource, function () {
	        $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
	        $scope.second_total_row = timeanalysisService.second_total_row
	    })
    }
	// SQL快照列表根据分页改变刷新
    $scope.changeQuickSqlList = function () {
		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		
        timeanalysisService.requestQuickSql($scope.dataSource, function () {
            $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
            $scope.second_total_row = timeanalysisService.second_total_row
        })
       
    };
    //下载
    $scope.download = function () {
        var URL = timeanalysisService.create_export_file
        var target = 'timeSnapList'

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.target = target
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		timeanalysisService.downloadSQL($scope.dataSource)
    }
    //搜索
    $scope.Search = function (event) {
        var Value = $($(event.currentTarget)).parents('.filter_search').find('input').val()
        $scope.regexp = Value

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
        timeanalysisService.requestQuickSql($scope.dataSource ,function () {
            $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
            $scope.second_total_row = timeanalysisService.second_total_row
        })
    }
    $('#SQLSnapshootList').on('onkey', function () {
        var Value = $(this).val()
        $scope.regexp = Value

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		
        timeanalysisService.requestQuickSql($scope.dataSource, function () {
            $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
            $scope.second_total_row = timeanalysisService.second_total_row
        })
    });
   $scope.clickSQLSecond = function ($event) {
        var data = $($event.target).data()
        var r_nidData = data.r_nid.split('#on#')
        var r_nid = r_nidData[0] + '$on$' + r_nidData[1]

        window.open('#/timeanalyThred?request_id=' + data.request_id + '&r_nid=' + r_nid + '&sql=' + data.sql + '&end_time=' + $scope.end_time + '&start_time=' + $scope.start_time)

    }
	 
}])