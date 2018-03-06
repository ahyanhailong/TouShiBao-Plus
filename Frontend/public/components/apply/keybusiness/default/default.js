MyApp.controller('KBdefault',['$scope','KBdefaultService','dateTimeService','$state',function($scope,KBdefaultService,dateTimeService,$state){

    $scope.searchName = '响应时间'

    $scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;
    $scope.total_row = ''
    $scope.app_id =$state.params.app_id
    // $scope.app_id = $state.params.app_id

    $scope.start_time = ''
    $scope.end_time = ''
    $scope.surf = ''
    $scope.order = ''
    $scope.sort = 'desc'
    $scope.page = ''
    $scope.dataSource = {
        app_id:$scope.app_id,
        start_time:$scope.start_time,
        end_time:$scope.end_time,
        surf:$scope.surf,
        order:$scope.order,
        sort:$scope.sort,
        page:$scope.page
    }
    $scope.change = function () {
        $scope.dataSource.surf = $scope.surf
    }
    $scope.$watchGroup(['start_time1','end_time1','order','sort'],function (newVal,oldVal) {
        $scope.dataSource.order = $scope.order
        $scope.dataSource.sort = $scope.sort
        if(newVal[0]){
            $scope.start_time = new Date(newVal[0]).getTime()
            $scope.end_time = new Date(newVal[1]).getTime()
            $scope.dataSource.start_time = $scope.start_time
            $scope.dataSource.end_time = $scope.end_time
            console.log($scope.dataSource)
            businessListFn($scope.dataSource)
        }
    })

    //关键事务默认列表排序
    $(document).delegate('#orderBy .dropdown-menu li','click',function(){
        var name =$(this).find('a').text()
        var order = $(this).find('a').attr('data-item')
        var $i = $(this).find('i.fa-sort');
        var sort = $i.hasClass('fa-sort-desc') ? 'asc' : 'desc';
        if(sort == 'asc'){
            $(this).parents('#orderBy').find('button span').removeClass('fa-long-arrow-down').addClass('fa-long-arrow-up')
        }else{
            $(this).parents('#orderBy').find('button span').removeClass('fa-long-arrow-up').addClass('fa-long-arrow-down')
        }
        $('#orderBy .dropdown-menu').find('i.fa-sort-desc,i.fa-sort-asc').removeClass('fa-sort-desc').removeClass('fa-sort-asc')
        $i.addClass('fa-sort-'+sort)
        $scope.$apply(function(){
            $scope.searchName = name
            $scope.order =order
            $scope.sort = sort
            console.log($scope.order,$scope.sort)
        })

    })
    // //关键事务默认列表
    // $scope.$watchGroup(['order','sort'],function (newVal,oldVal) {
    //     $scope.dataSource.order = $scope.order
    //     $scope.dataSource.sort = $scope.sort
    //     businessListFn($scope.dataSource)
    //
    // })
    function businessListFn(dataSource) {
        KBdefaultService.businessList(dataSource).then(function (respon) {
            $scope.respon = respon
            $scope.total_row = respon.data.total_items
            $scope.page_no = respon.data.page_current

        })
    }
    $('#key_transaction').on('onkey', function () {
        var Value = $(this).val()
        $scope.dataSource.surf = Value
        businessListFn($scope.dataSource)
    })
    $scope.search = function ($event) {
        var surf = $($event.currentTarget).parent('.tsb-search').find('input').val()
        $scope.dataSource.surf = surf
        businessListFn($scope.dataSource)
    }

    $scope.clickURI = function (uri) {
        $scope.$parent.uri = uri
        return '#/navigation/apply/keybusiness/tabList/dashboard/'+encodeURIComponent(encodeURIComponent(uri))+'/'+$scope.app_id;
    }
    //删除
    $scope.deleteUri = function ($event) {
        var id= $($event.currentTarget).attr('data-id')
        KBdefaultService.deleteTransaction({business_id:id}).then(function (respon) {
            if(respon.data.code == '1000'){
                businessListFn($scope.dataSource)
            }
        })
    }

}])