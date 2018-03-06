MyApp.controller('abnormalAnalySecond',['$scope','$rootScope','$location','erroranalysisService','dataTimeDefault','$state',function($scope,$rootScope,$location,erroranalysisService,dataTimeDefault,$state){
    $rootScope.timeAnaly = false;
	$rootScope.SQL = true
	$scope.app_id = $state.params.app_id;
    $scope.start_time = dataTimeDefault.start_time
    $scope.end_time = dataTimeDefault.end_time
    $scope.sql = decodeURIComponent($state.params.sql)
    $scope.uri = decodeURIComponent($state.params.uri)

	
	$scope.total_row = 0 ;//总页数
	
	$scope.page_no = 1;
    $scope.sum_per_page = '5' ; //每页显示多少行
	
	
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
  	
	$scope.$parent.$on('filterChange',function($event,info){
		var json = {}  
		$.each(info,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
			if(key != 'resptime'){
				json[key] = val
			}else{
				json['wt_from'] = val[0]
				json['wt_to'] = val[1]
			}
		})
		$.extend(true,$scope.dataSource,json)
	})
    $scope.$watchGroup(['start_time1','end_time1'],function (newVal,oldVal) {
        if(newVal[0]){
            $scope.dataSource.start_time = new Date(newVal[0]).getTime()
            $scope.dataSource.end_time = new Date(newVal[1]).getTime()
            //数据库异常趋势图
            erroranalysisService.getSqlErrorTrend($scope.dataSource)
            //调用者占比
            erroranalysisService.SqlErrorCaller($scope.dataSource)
			//SQL快照列表
			erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
				$scope.total_row = erroranalysisService.second_total_row
				$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
			})
        }
    })
	$scope.$watchGroup(['dataSource.instance_raw','dataSource.db_table','dataSource.db_name','dataSource.db_oper_type','dataSource.wt_from','dataSource.wt_to'],function(newValue,oldValue){
		if(newValue != oldValue){
			
			erroranalysisService.initChartData($scope.dataSource)
			erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
				$scope.total_row = erroranalysisService.second_total_row
				$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
			})
			erroranalysisService.SqlErrorCaller($scope.dataSource)
			
		}
	})

	//SQL列表排序
	$scope.orderby = function (event) {
        var order = $(event.currentTarget).parents('th').attr('data-item')
        var sort = $(event.currentTarget).hasClass('fa-sort-desc') ? 'asc' : 'desc';
        $scope.dataSource.order = order
        $scope.dataSource.sort = sort
        $scope.dataSource.sql = $scope.sql
        
        erroranalysisService.SecondSqlErrorList($scope.dataSource, function () {
            $scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
            $scope.total_row = erroranalysisService.second_total_row
        })

    }
	
	// 异常二级页面SQL快照列表根据分页改变刷新
    $scope.changeQuickSqlList = function (currentPage,perPage) {
		$scope.page_no = currentPage
		$scope.sum_per_page = perPage

    };
	$scope.$watchGroup(['page_no'],function (newVal,oldVal) {
		if(newVal != oldVal){
			$scope.dataSource.page = $scope.page_no
            erroranalysisService.SecondSqlErrorList($scope.dataSource, function () {
                $scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
                $scope.total_row = erroranalysisService.second_total_row
            })
		}
    })
    $scope.download = function(){
    		var URL = $scope.create_export_file
    		var target = 'exceptionSnapList'
		$scope.dataSource.target = target
		$scope.dataSource.sql = $scope.sql
    		downloadSQL($scope.dataSource)
    }
     $scope.Search = function(event){
    		var Value = $('#requestQuickSqlSencond .filter_search').find('input').val()

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.page
		$scope.dataSource.reqUri_raw_search = Value
		
    		erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
			$scope.total_row = erroranalysisService.second_total_row
			$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
		})
    }
     $('#SQLSnapshootList').on('onkey',function(){
             $scope.Search()
    });
    
    //错误分析二级页面 table 点击事件
   $scope.clickSQLSecond = function($event){
   		var data= $($event.target).data()
   		var r_nidData = data.r_nid.split('#on#')
    		var r_nid = r_nidData[0]+'$on$'+r_nidData[1]
   		window.open('#/errortThred?request_id='+ data.request_id +'&r_nid='+ r_nid +'&sql='+data.sql+'&end_time='+$scope.end_time+'&start_time='+$scope.start_time)
  		
   }
	
}])

