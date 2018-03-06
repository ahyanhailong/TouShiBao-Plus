/**
 * Created by Happily on 17/12/4.
 */
MyApp.controller('abnormalAnalysis', ['$scope', '$rootScope','erroranalysisService','dataTimeDefault','$state', 'filterRespTime',function ($scope,$rootScope,erroranalysisService,dataTimeDefault,$state,filterRespTime) {
    $rootScope.sideBarKey = 'keybusiness';
    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id

    $rootScope.SQL = true;
    $rootScope.timeAnaly = false;
    
    
    $scope.total_row = 0 ;//总页数
    $scope.sum_per_page = '5' ; //每页显示多少行
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
        console.log(newVal,oldVal)
        if(newVal[0]){
            $scope.filterdata = filterRespTime.RespTime($scope.$parent.wheres)
            $.extend(true,$scope.dataSource, $scope.filterdata);

            $scope.dataSource.start_time = new Date(newVal[0]).getTime()
            $scope.dataSource.end_time = new Date(newVal[1]).getTime()
            SQLAbnormal()
        }
    })
    $scope.$on('filterChange',function (event,info) {
        $scope.wheres = filterRespTime.RespTime(info)
        $.extend(true,$scope.dataSource,$scope.wheres)
        SQLAbnormal()
    })

    function SQLAbnormal() {
        //数据库异常趋势图
        erroranalysisService.getSqlErrorTrend($scope.dataSource)
        //SQL快照列表
        erroranalysisService.SqlErrorList($scope.dataSource,function(){
            $scope.total_row = erroranalysisService.total_row
            $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
        })
    }

    $scope.$watchGroup(['page_no'],function (newVal,oldVal) {
        if(newVal!=oldVal){
            $scope.dataSource.page = $scope.page_no
            erroranalysisService.SqlErrorList($scope.dataSource, function () {
                $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
                $scope.total_row = erroranalysisService.total_row
            })
        }
    })
    
    $scope.download = function(){
        var URL = $scope.create_export_file
        var target = 'exceptionAggsList'

		$scope.dataSource.target = target
		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		erroranalysisService.downloadSQL($scope.dataSource)
    }
    $scope.orderby = function (event) {

        var order = $(event.currentTarget).parents('th').attr('data-item')
        var sort = $(event.currentTarget).hasClass('fa-sort-desc') ? 'asc' : 'desc';
        $scope.dataSource.order = order
        $scope.dataSource.sort = sort
        $scope.dataSource.sql = $scope.sql
        
        erroranalysisService.SqlErrorList($scope.dataSource, function () {
            $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
            $scope.total_row = erroranalysisService.total_row
        })
    }
    //异常分析一级页面table 点击事件
   $scope.clickSQL = function(name){
   		window.location.replace('#/navigation/apply/keybusiness/tabList/sql/abnormalAnalySecond/'+encodeURIComponent(encodeURIComponent($scope.uri))+'/'+encodeURIComponent(encodeURIComponent(name))+'/'+$scope.app_id)
   }
}])