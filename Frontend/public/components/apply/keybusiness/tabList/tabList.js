MyApp.controller('tabList',['$scope','$state','$location',function($scope,$state,$location){

    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id

    $.cookie('noChangeCookie',false)//代表时间插件选择日期时是否种cookie    true：不种cookie    false ：种cookie

    $('#details-page .back-list').click(function () {
        $('#default-page').show();
        $('#details-page').hide();
         window.location.replace('#/navigation/apply/keybusiness/default/'+$scope.app_id);
    })
	
	 // 处理tab页超链接
    $scope.handleHref = function (type) {

        return '#/navigation/apply/keybusiness/tabList/' + type + '/' + encodeURIComponent(encodeURIComponent($scope.uri))+'/'+$scope.app_id;
    }
    $scope.classActive = function (type) {
        return $state.$current.name.indexOf(type) > -1;
    }
}])