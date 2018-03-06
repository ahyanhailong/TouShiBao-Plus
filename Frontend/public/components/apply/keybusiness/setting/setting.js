/**
 * Created by Happily on 17/12/5.
 */
MyApp.controller('setting', ['$scope', '$rootScope','settingService','$location','dateTimeService','$state', function ($scope,$rootScope,settingService,$location,dateTimeService,$state) {

    $scope.Apdex = 500
    $scope.name = ''
    $scope.ApdexConfig =['500','1000','1500','2000','2500','3000','3500','4000','4500','5000']

    $scope.uri = ''

    $scope.searchBox = false //是否显示事务归类 请求列表


    $scope.business_type = 1
    $scope.uri = $location.search().uri
    $scope.business_id = $state.params.business_id
    $scope.app_id = $state.params.app_id

    $scope.dataSource = {
        app_id:env_config.APP_ID,
        start_time : dateTimeService.getTime().start,
        end_time : dateTimeService.getTime().end,
        surf:''
    }

    if($scope.business_id){
        //获取事务信息
        settingService.getUriMsg({business_id:$scope.business_id}).then(function (respon) {
            $scope.Apdex = respon.data.apdex
            $scope.name = respon.data.name
            if(respon.data.type == 2){
                $('#combine').trigger('click')
                $scope.uri = respon.data.uri
             }
        })
    }

    $scope.ApdexSet = function (Apdex) {
        $scope.Apdex = Apdex
    }

    //事务名称change
    $scope.ApdexChange = function () {
        $scope.name = $('#name').val()
    }
    //查询事务列表
    settingService.getUriList($scope.dataSource).then(function (respon) {
        $scope.URiList = respon.data
        var key = Object.keys($scope.URiList.data)[0]
        $scope.UriListValue = $scope.URiList.data[key]
    })
    //事务列表点击事件
    $scope.UriListClick = function (option) {
        $scope.UriListValue = option
    }

    $('#single').click(function () {
        $('.single').show();
        $('.combine').hide();
        $scope.business_type = 1
    })
    $('#combine').click(function () {
        $('.single').hide();
        $('.combine').show();
        $scope.business_type = 2
    })
    //选择请求 搜索
    $scope.selectRequest = function ($event) {
        var surf = $($event.currentTarget).parent('.tsb-search').find('input').val()
        $.extend(true,$scope.dataSource,{surf:surf})
        $scope.searchBox = true
        //查询事务列表
        settingService.getUriList($scope.dataSource).then(function (respon) {
            $scope.businessList = respon.data
        })

    }
    $('#businessClass').on('onkey',function () {
        var surf = $(this).val()
        $scope.searchBox = true
        $.extend(true,$scope.dataSource,{search_uri:surf})
        //查询事务列表
        settingService.getUriList($scope.dataSource).then(function (respon) {
            $scope.businessList = respon.data
        })

    })

    //保存
    $scope.btnSure = function () {
        var dataSource = {
            app_id : env_config.APP_ID,
            name : $scope.name,
            apdex : $scope.Apdex,
            start_time : dateTimeService.getTime().start,
            end_time : dateTimeService.getTime().end,
            business_type : $scope.business_type,
            uri : $scope.UriListValue
        }
        if($scope.business_type == 1){
            $.extend(true,dataSource,{uri:$scope.UriListValue})
        }else{
            $.extend(true,dataSource,{uri:$('#businessClass').val()})
        }
        if($scope.business_id){
            $.extend(true,dataSource,{business_id:$scope.business_id})
            settingService.updateKeyTransaction(dataSource).then(function (respon) {
                if(respon.data.code == '1000'){
                    window.location.replace('#/navigation/apply/keybusiness/default')
                }
            })
        }else{
            settingService.creatKeyTransaction(dataSource).then(function (respon) {
                if(respon.code == '1000'){
                    window.location.replace('#/navigation/apply/keybusiness/default/'+$scope.app_id)
                }
            })
        }


    }
    //取消
    $scope.btnCancel = function () {
        window.location.replace('#/navigation/apply/keybusiness/default/'+$scope.app_id)
    }

}])