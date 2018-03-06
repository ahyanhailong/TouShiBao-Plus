MyApp.controller('timeanalyThred',['$scope','$location','dateTimeService','$http',function($scope,$location,dateTimeService,$http){
	
	
	
	$scope.request_id = $location.search().request_id
    $scope.r_nid = $location.search().r_nid
    $scope.sql = $location.search().sql
    $scope.end_time = dateTimeService.getTime().end
    $scope.start_time = dateTimeService.getTime().start
	
	
	var submitData={
    		request_id : $scope.request_id,
    		r_nid : $scope.r_nid,
    		app_id : env_config.APP_ID,
    		start_time : $scope.start_time,
    		end_time : $scope.end_time,
    		sql:$scope.sql
    }
    var URL = env_config.API.APP_Relation_Db.TIME_SQL_THREE
	
	$http.get(URL, {params:submitData}).then(function(result){
		$scope.msg = result.data
		return result.data.stack_tree;
	})
}])