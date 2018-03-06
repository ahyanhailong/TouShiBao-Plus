MyApp.controller('error', ['$scope', '$rootScope','ErrorService','$state','filterRespTime', function ($scope,$rootScope,service,$state,filterRespTime) {

	$rootScope.sideBarKey = 'error';
	$scope.app_id = $state.params.app_id

    $scope.start_time = ''
    $scope.end_time = ''


    $scope.total_row = 0;//总页数
    $scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1; // 当前页数

    $scope.listType = 'error'

    $scope.dataSource = {
        app_id:$scope.app_id,
        uri:'',
        start_time : $scope.start_time,
        end_time : $scope.end_time
    }
    $scope.whersList = {}
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
        $scope.whersList = filterRespTime.RespTime($scope.wheres)
        $.extend(true,$scope.dataSource,$scope.whersList)
        console.log($scope.dataSource)
    }
    $scope.$watchGroup(['wheres'], function (newval, oldval) {
        if (newval != oldval) {
            $scope.change();
        }

    })

    $scope.$watchGroup(['start_time1', 'end_time1'], function (newval, oldval) {

        if(newval[0]){
            $scope.start_time = new Date(newval[0]).getTime()
            $scope.end_time = new Date(newval[1]).getTime()
            $scope.dataSource.start_time = new Date(newval[0]).getTime()
            $scope.dataSource.end_time = new Date(newval[1]).getTime()

            $.extend(true,$scope.dataSource,{
                start_time : $scope.start_time,
                end_time : $scope.end_time,
                page_no : $scope.page_no
			})
            //错误和异常趋势
            service.errorTrend($scope.dataSource)
            //错误占比
            $.extend(true,$scope.dataSource,{error:1})
            service.errorScale($scope.dataSource)
            //异常占比
            $.extend(true,$scope.dataSource,{uri:''})
            service.abnormalScale($scope.dataSource,'error')
            //错误列表
            service.errorList($scope.dataSource,function (respon) {
                $scope.total_row = respon.total_items
                $scope.$apply()

            })
            $scope.$emit('dataTimeChange',{start_time:$scope.start_time,end_time:$scope.end_time})
        }
        // console.log('老值：'+oldval)
    });

    $.cookie('noChangeCookie',false)//代表时间插件选择日期时是否种cookie    true：不种cookie    false ：种cookie

    $scope.$on('dataTimeChange',function (event,info) {
        $scope.start_time = info.start_time
        $scope.end_time = info.end_time
    })
    
    $scope.errorAbnormalToggle = function (event,type) {
        $(event.currentTarget).parent('li').addClass('active').siblings().removeClass('active')
        $scope.listType = type
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
            //错误列表
            service.errorList($scope.dataSource,function (respon) {
                $scope.total_row = respon.total_items
                $scope.$apply()

            })
        }else{
            $.extend(true,$scope.dataSource,{
                exception:1
            })
            //异常列表
            service.abnormalList($scope.dataSource,function (respon) {
                $scope.total_row = respon.total_items
                $scope.$apply()

            })
        }

    }
    $scope.$watchGroup(['page_no'],function (newVal,oldVal) {
        // console.log(newVal,oldVal)
        if(newVal != oldVal){
            if($scope.listType == 'error'){
                //错误列表
                service.errorList($scope.dataSource,function (respon) {
                    $scope.total_row = respon.total_items

                })
            }else{
                $.extend(true,$scope.dataSource,{
                    exception:1
                })
                //异常列表
                service.abnormalList($scope.dataSource,function (respon) {
                    $scope.total_row = respon.total_items

                })
            }

        }
    })

    $scope.changeSqlList = function (currentPage,perPage) {
        // console.log(currentPage,perPage)
        $scope.page_no = currentPage
        $scope.sum_per_page = perPage;

    }



}])