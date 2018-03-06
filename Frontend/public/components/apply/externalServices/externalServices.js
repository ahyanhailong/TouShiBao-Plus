MyApp.controller('externalServices', ['$scope', '$rootScope','$state','EsService', function ($scope,$rootScope,$state,EsService) {

	$rootScope.sideBarKey = 'externalServices';

    var Api_maps = {
        get_url_list : env_config.API.external_service.GET_URL_LIST,
        get_single_uri_list : env_config.API.external_service.GET_SINGLE_URL_LIST
    }

    $scope.app_id = $state.params.app_id
    $scope.start_time = ''
    $scope.end_time = ''


    $scope.page_no = 1
    $scope.total_row = ''
    $scope.sum_per_page = '5'

    $scope.filterName = '响应时间占比'
    $scope.type = 'response_time_percent'

    
    
    $scope.dataSource = {
        app_id: $scope.app_id,
        start_time : $scope.start_time,
        end_time : $scope.end_time,
        type: $scope.type
    }
    $scope.$watchGroup(['start_time1', 'end_time1'], function (newval, oldval) {
        if(newval[0]){
            $scope.start_time = new Date(newval[0]).getTime()
            $scope.end_time = new Date(newval[1]).getTime()
            $.extend(true,$scope.dataSource,{
                start_time : $scope.start_time,
                end_time : $scope.end_time,
            })
            $scope.$broadcast('dataTimeChange',{start_time:$scope.start_time,end_time:$scope.end_time})
            EsService.getUrlList(Api_maps['get_url_list'],$scope.dataSource).then(function (respon) {
                $scope.UriList = respon.data.list
            })
        }

    })

    $.cookie('noChangeCookie',false)//代表时间插件选择日期时是否种cookie    true：不种cookie    false ：种cookie

    $scope.filterClick = function ($event,info) {
        console.log(info)
        $scope.filterName = info.name
        $scope.type = info.type
        $.extend(true,$scope.dataSource,{
            type:$scope.type
        })
        EsService.getUrlList(Api_maps['get_url_list'],$scope.dataSource).then(function (respon) {
            $scope.UriList = respon.data.list
        })
    }
    
    
    $scope.listClick = function (event,info) {
        $.extend(true,$scope.dataSource,{
            domain : info.domain,
            port : info.port
        })
       var dropDown =  $(event.currentTarget).parents('.tsb-dropDown-title').siblings('.tsb-dropDown-box')
        if(dropDown.hasClass('collapse')){
            dropDown.removeClass('collapse')
            EsService.getSingleUriList(Api_maps['get_single_uri_list'],$scope.dataSource).then(function (respon) {
                $.each($scope.UriList,function (index,item) {
                    console.log(item)
                    if(index == info.index){
                        $scope.UriList[index].list = respon.data.list
                    }

                })
                console.log($scope.UriList)
            })
        }else {
            dropDown.addClass('collapse')

        }


    }
    $scope.hrefClick = function (event,info) {
        return '#/navigation/apply/externalServices/performance/' + info.domain +'/'+info.port+'/'+ encodeURIComponent(encodeURIComponent(info.uri)+'/'+$scope.app_id)
    }
    //点击二级sub列表，出现性能分析|错误页面
    $('.subTrigger').click(function () {
        $state.go('navigation.apply.externalServices.performance')
    })

}])
MyApp.service('EsService',['$http','httpService',function ($http,httpService) {

    this.getUrlList = function (URL,dataSource) {
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    this.getSingleUriList = function (URL,dataSource) {
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }


}])