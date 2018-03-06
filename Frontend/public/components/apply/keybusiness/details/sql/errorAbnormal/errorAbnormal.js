/**
 * Created by Happily on 17/12/4.
 */
MyApp.controller('errorAbnormal', ['$scope', '$rootScope','timeanalysisService','dataTimeDefault','$state','filterRespTime', function ($scope,$rootScope,timeanalysisService,dataTimeDefault,$state,filterRespTime) {
    $rootScope.sideBarKey = 'keybusiness';
    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id

    $rootScope.SQL = true;
    $rootScope.timeAnaly = true;
    $scope.total_row = timeanalysisService.total_row;//总页数
    $scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;
    

    $scope.start_time = dataTimeDefault.start_time
    $scope.end_time = dataTimeDefault.end_time
    $scope.sql = '';
    
    $scope.dataSource = {
        app_id: $scope.app_id,
        start_time: $scope.start_time,
        end_time: $scope.end_time,
        sql: $scope.sql
    }
    $scope.$watchGroup(['start_time1','end_time1'],function (newVal,oldVal) {
        if(newVal[0]){
            $scope.dataSource.start_time = new Date(newVal[0]).getTime()
            $scope.dataSource.end_time = new Date(newVal[1]).getTime()
            SQTimeAnaly()
        }
    })
    
    $scope.$on('filterChange',function (event,info) {
        $scope.wheres = filterRespTime.RespTime(info)
        $.extend(true,$scope.dataSource,$scope.wheres)
        SQTimeAnaly()
    })
    
    function SQTimeAnaly() {
        //数据库趋势图
        timeanalysisService.getOverDbTrendLine($scope.dataSource)
        //时间分布
        timeanalysisService.getTimeDistributionLine($scope.dataSource)
        //SQL列表
        timeanalysisService.getAllSqlList($scope.dataSource, function () {
            $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
            $scope.total_row = timeanalysisService.total_row
        })
    }

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
    $scope.changeSqlList = function (currentPage,perPage) {
        $scope.page_no = currentPage
        $scope.sum_per_page = perPage
        //
        // timeanalysisService.getAllSqlList($scope.dataSource, function () {
        //     $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
        //     $scope.total_row = timeanalysisService.total_row
        // })
    };
    $scope.$watchGroup(['page_no'],function (newval,oldVal) {
        if(newval!=oldVal){
            $scope.dataSource.page = $scope.page_no
            timeanalysisService.getAllSqlList($scope.dataSource, function () {
                $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
                $scope.total_row = timeanalysisService.total_row
            })
        }
    })
	//SQL列表点击事件
	$scope.clickSQL = function(info){
		window.location.replace('#/navigation/apply/keybusiness/tabList/sql/errorAbnormalSecond/'+encodeURIComponent(encodeURIComponent($scope.uri)) +'/'+encodeURIComponent(encodeURIComponent(info))+'/'+$scope.app_id)
	}
	//下载
	$scope.download = function () {
        var URL = timeanalysisService.create_export_file
        var target = 'timeAggsList'
		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.target = target
		$scope.dataSource.reqUri_raw_search = $scope.regexp

    }

}])