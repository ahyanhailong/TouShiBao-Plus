MyApp.controller('erroranalyFirst',['$scope','erroranalysisService','dateTimeService','$rootScope','$state',function($scope,erroranalysisService,dateTimeService,$rootScope,$state){
	$rootScope.sideBarKey = 'database'
	$rootScope.timeAnaly = false
	
	$scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;
    $scope.app_id =$state.params.app_id;

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
        $scope.start_time = info.start_time
        $scope.end_time = info.end_time
    })
    $scope.$watchGroup(['start_time1', 'end_time1'], function (newval, oldval) {
    	if(newval[0]){
            var start_time = new Date(newval[0]).getTime()
            var end_time = new Date(newval[1]).getTime()
            $.extend(true,$scope.dataSource ,{
                start_time : start_time,
                end_time :end_time
            })
            erroranalysisService.initChartData($scope.dataSource)
            erroranalysisService.SqlErrorList($scope.dataSource, function () {
                $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
                $scope.total_row = erroranalysisService.total_row
            })
		}


        // console.log('老值：'+oldval)
    });
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
            erroranalysisService.initChartData($scope.dataSource)
            erroranalysisService.SqlErrorList($scope.dataSource, function () {
			    $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
			    $scope.total_row = erroranalysisService.total_row
			})
        }
    })

    // //数据库异常趋势图
	// erroranalysisService.getSqlErrorTrend($scope.dataSource)
	// //SQL快照列表
	// erroranalysisService.SqlErrorList($scope.dataSource, function () {
	//     $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
	//     $scope.total_row = erroranalysisService.total_row
	// })
	//
	//异常分析一级页面table 点击事件
   $scope.clickSQL = function(name){
   		window.location.replace('#/navigation/apply/database/erroranalySecond/'+$scope.app_id+'/'+name)
   }
   // 异常一级页面SQL列表根据分页改变刷新
    $scope.changeSqlList = function () {

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.page_no

    };
    $scope.download = function(){
		var URL = $scope.create_export_file
		var target = 'exceptionAggsList'

		$scope.dataSource.target = target
		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		erroranalysisService.downloadSQL($scope.dataSource)
    }
	
}])