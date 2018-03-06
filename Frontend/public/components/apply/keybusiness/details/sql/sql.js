
MyApp.controller('sql', ['$scope', '$rootScope','$state', function ($scope,$rootScope,$state) {
    $rootScope.sideBarKey = 'keybusiness';
    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id

    //tab
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');
    })
    // 处理tab页超链接
    $scope.handleHref = function (type) {
        return '#/navigation/apply/keybusiness/tabList/sql/' + type + '/' + encodeURIComponent(encodeURIComponent($scope.uri))+'/'+$scope.app_id;
    }


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
        console.log(arguments);
        console.log('$scope.wheres is change --', $scope.wheres);
        $scope.$broadcast('filterChange', $scope.wheres)
    }
    $scope.$watchGroup(['wheres'], function (newval, oldval) {
        if (newval != oldval) {
            $scope.change();
        }

    })



}])