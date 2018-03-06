MyApp.controller('database', ['$scope', '$rootScope', 'Data', '$state', function ($scope, Data, $rootScope, $state) {
    $rootScope.sideBarKey = 'database'
    $scope.Tipstatus = 1
    $scope.timeValue = ''
    $scope.show = true;
    $scope.app_id = $state.params.app_id
    $scope.appidList = {};
    $scope.app_name = ''

    $scope.start_time = ''
    $scope.end_time = ''

    $scope.GetUserAppIdLIst = env_config.HOST_ADDRESS + env_config.API.APP_Getuser_AppList.APP_GET_USER_APP_LIST //获取用户appidList
    $scope.GetFilterElementForDb = env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.GET_FILTER_ELEMENT_FOR_DB //获取过滤条件列表

    $scope.SaveRelationDbFiltrationCondition = env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.SAVE_DB_FILTER_CONDITION//数据库 过滤条件保存接口
    $scope.GetRelationDbFiltrationCondition = env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.GET_RELATION_DB_FILTRATION_CONDITION // 获取已保存条件接口
    $scope.DeleteRelationDbFiltrationCondition = env_config.HOST_ADDRESS + env_config.API.Filter_Element_For_Db.DELETE_DB_FILTERATION_CONDITION //删除过滤条件接口

    //过滤插件变量
    $scope.params = {}
    $scope.history = {}
    $scope.instance_raw = []
    $scope.db_table = []
    $scope.db_name = []
    $scope.db_oper_type = []
    $scope.reqUri_raw = []
    $scope.wt_from = ''
    $scope.wt_to = ''

    // //点击tab 时间分析 调用者占比不显示
    // $scope.TabTime = function () {
    //     $scope.$broadcast('callerOccupy', {callerOccupy: false});
    // }
    // $scope.TabError = function () {
    //     $scope.$broadcast('callerOccupyError', {callerOccupy: false});
    // }
    $scope.HrefLink = function (event, type) {
        return '#/navigation/apply/database/' + type + '/' + $scope.app_id
    }

    var dataSource = {
        app_id: env_config.APP_ID,
        account_id: '107'
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
    $scope.$watchGroup(['start_time1', 'end_time1'], function (newval, oldval) {
        console.log(newval)
        if (newval[0]) {
            $scope.start_time = new Date(newval[0]).getTime()
            $scope.end_time = new Date(newval[1]).getTime()
            $scope.$broadcast('dataTimeChange', {start_time: $scope.start_time, end_time: $scope.end_time})
        }
        // console.log('老值：'+oldval)
    });
    var watchList = $scope.$watchGroup(['listChooseKey', 'listChooseValue'], function (newval, oldval) {
        console.log(newval)
    });
    $scope.$on('$destroy', function () {
        watchList();
    });
    $.cookie('noChangeCookie', false)//代表时间插件选择日期时是否种cookie    true：不种cookie    false ：种cookie
}]);
