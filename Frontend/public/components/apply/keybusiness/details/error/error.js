
MyApp.controller('error', ['$scope', '$rootScope','errorService','dataTimeDefault','$location','$state',function ($scope,$rootScope,errorService,dataTimeDefault,$location,$state) {
	
	$rootScope.SQL = false;
    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id
    $scope.start_time = dataTimeDefault.start_time
    $scope.end_time = dataTimeDefault.end_time


    $scope.total_row = 0;//总页数
    $scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1; // 当前页数
    $scope.searchUri = '';

    $scope.dataSource = {
        app_id:$scope.app_id,
        start_time : $scope.start_time,
        end_time : $scope.end_time,
        uri : $scope.uri
    }
    //错误列表
    $scope.transaction_list = env_config.API.key_transaction_list.GET_ERROR_ANALYSIS_ERROR_LIST;
    //异常列表
    $scope.get_error_analysis_exception_list = env_config.API.key_transaction_list.GET_ERROR_ANALYSIS_EXCEPTION_LIST

    $scope.$watchGroup(['start_time1','end_time1'],function (newVal,oldVal) {
        console.log(newVal,oldVal)
        if(newVal[0]){
            $scope.dataSource.start_time = new Date(newVal[0]).getTime()
            $scope.dataSource.end_time = new Date(newVal[1]).getTime()
            errorAnalyFN()
        }
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
    $scope.change = function (info) {
        // console.log('$scope.wheres is change --', $scope.wheres);
        var json = {}
        $.each($scope.wheres,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
            if(key != 'resptime'){
                json[key] = val
            }else{
                json['wt_from'] = val[0]
                json['wt_to'] = val[1]
            }
        })
        $.extend($scope.dataSource,json)
        errorAnalyFN()
        $scope.$broadcast('filterChange',$scope.wheres)
    }
    $scope.$watchGroup(['wheres'],function(newval,oldval){
    		if(newval != oldval){
    			$scope.change();
    		}
    		
    })
    
    $scope.changeSqlList = function () {
    	
    }
    function errorAnalyFN() {
        //错误和异常趋势
        errorService.errorTrend($scope.dataSource)
        //错误占比
        $.extend(true,$scope.dataSource,{error:1})
        errorService.errorScale($scope.dataSource)
        //异常占比
        errorService.abnormalScale($scope.dataSource)

        //错误|异常列表切换
        $scope.respTimeMark = 'error'
        errorService.errorList({
            currentPage: $scope.page_no,
            perPage: $scope.sum_per_page,
            searchUri: $scope.searchUri,
            uri : $scope.uri,
            success: function (data) {
                $scope.total_row = data.total_items;
                $scope.$apply();
            }
        },$scope.transaction_list)
        $scope.errorAbnormalToggle = function (type) {
            $scope.respTimeMark = type
            var dataSource = {
                currentPage: $scope.page_no,
                perPage: $scope.sum_per_page,
                searchUri: $scope.searchUri,
                uri : $scope.uri,
                success: function (data) {
                    $scope.total_row = data.total_items;
                    $scope.$apply();
                }
            }
            if(type == 'error'){
                var URL = $scope.transaction_list
            }else{
                var URL = $scope.get_error_analysis_exception_list
                $.extend(true,dataSource,{
                    exception:1
                })
            }
            //错误列表
            errorService.errorList(dataSource,URL)
        }

    }


    //异常列表
    // errorService.abnormalList({
    //     currentPage: $scope.page_no,
    //     perPage: $scope.sum_per_page,
    //     searchUri: $scope.searchUri,
    //     uri : $scope.uri,
    //     success: function (data) {
    //         $scope.total_row = data.total_items;
    //         $scope.$apply();
    //     }
    // },$scope.get_error_analysis_exception_list)


}])