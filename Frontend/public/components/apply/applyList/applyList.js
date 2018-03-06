
MyApp.controller('applyList', ['$scope','$rootScope','applyListService' ,function ($scope,$rootScope,applyListService) {

    $rootScope.openStop = true
    $rootScope.isPause = true
    $rootScope.KeyPause = true

    $scope.checkedAll = false
    $scope.checkedArr = {}
    $scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;
    $scope.total_row = 0

    $scope.status = $scope.$parent.status //1开启，2暂停
    $scope.name = $scope.$parent.name //模糊匹配
    $scope.group_id = $scope.$parent.group_id //应用时间分组
    $scope.order = $scope.$parent.order //排序字段
    $scope.sort = $scope.$parent.sort //排序方式
    $scope.page = '1' //排序方式

    $scope.creatGroup = $scope.$parent.creatGroup //新建分组

    $scope.app_idGroup = []

    $scope.dataSource = {
        status:$scope.status,
        name:$scope.name,
        group_id:$scope.group_id,
        order:$scope.order,
        sort:$scope.sort,
        page:$scope.page
    }
    //创建分组
    $scope.$on('creatGroup',function (event,info) {
        $scope.creatGroup = info
        if(info){
            getAPPlist($scope.dataSource)
        }

        
    })
    $scope.hrefLink = function ($event,app_id) {
        return '#/navigation/apply/overview/' + app_id
    }
    //全选
    $scope.$on('checkedAll',function (event,info) {
        $scope.checkedAll = info
        if($scope.checkedAll){
            var checkedList = $('.event-content .tsb-box-show2e .apply-check input[type=checkbox]')
            checkedList.each(function (index,element) {
                var id = $(element).attr('id')
                if(!$scope.checkedArr[id]){
                    $scope.checkedArr[id] = id
                }

            })
        }else{
            $scope.checkedArr = {}
        }
        console.log($scope.checkedArr)

    })
    //排序
    $scope.$on('orderChange',function (event,info) {
        console.log(info)
        $scope.dataSource.order = info.order
        $scope.dataSource.sort = info.sort
        getAPPlist($scope.dataSource)
    })
    //分组筛选
    $scope.$on('groupFilter',function (event,info) {
        $scope.dataSource.group_id = info.group_id

    })
    //搜索
    $scope.$on('applyListSearch',function (event,info) {
        $scope.dataSource.name = info
    })
    
    $scope.$watchGroup(['dataSource.name','dataSource.group_id'],function (newval,oldval) {
        console.log(newval,oldval)
        getAPPlist($scope.dataSource)
    })

    //加入分组
    $scope.$on('addGroup',function (event,info) {
        console.log($scope.checkedArr)
        var app_group_id = Object.values($scope.checkedArr)
        applyListService.setAppGroup({app_group_id:info,app_ids:app_group_id},function (respon) {
            if(respon.code == 1000){
                getAPPlist($scope.dataSource)
                $scope.checkedAll = false

            }
        })
    })

    $('#input-search').on('onkey',function () {
        var val = $('#input-search').val()
        $scope.dataSource.name = val
        $scope.$apply()

    })
    //按应用名称搜索
    $scope.search = function () {
        var val = $('#input-search').val()
        $scope.dataSource.name = val
        
    }

    //checkbox点击事件
    $scope.checkboxclick = function (app_id) {
        if($scope.checkedArr[app_id]){
            delete $scope.checkedArr[app_id]
        }else{
            $scope.checkedArr[app_id]=app_id
        }

        console.log($scope.checkedArr)
    }
    //tab选项卡
    $('#tsb-tab-ul li').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    
    $scope.$on('UpdateAppList',function (event,info) {
        if(info == true){
            $scope.status = 2
            var app_ids = Object.values($scope.checkedArr)
            if(app_ids.length == 0){
                return alert('请选择应用')
            }
            applyListService.setAppStatus({app_ids:$scope.checkedArr,status:$scope.status},function (respon) {
                if(respon.code == 1000){
                    getAPPlist($scope.dataSource)
                }
            })


        }
    })
    
    //编辑列表，出现文本框
    $scope.listEditor = function ($event,app_id,app_name) {
        $($event.currentTarget).parent('.text-div').hide()
        $($event.currentTarget).parents('.apply-title').find('.input-div').show()
        $scope.app_id = app_id
        $scope.app_name = app_name.split(':')[0]
    }
    $scope.listEditorInputBlur = function ($event,app_id) {
        $($event.currentTarget).parents('.apply-title').find('.text-div').show()
        $($event.currentTarget).parent('.input-div').hide()
        var Val = $($event.currentTarget).val()
        console.log(app_id)
        if($scope.app_name != Val){
            applyListService.setAppName({app_id:app_id,app_name:Val}).then(function (respon) {
                if(respon.code == 1000){
                    getAPPlist($scope.dataSource)
                }
            })
        }
    }
    //一键暂停
    $scope.$on('oneKeyPause',function (event,info) {
        applyListService.pauseApp({pause:info}).then(function (respon) {
            if(respon.code = 1000){
                getAPPlist($scope.dataSource)
            }

        })
    })
    //返回按钮
    $('#btn-back').click(function () {
        $('.manage-group').show();
        $('.manage-groupSub').hide();
    })
    //a链接，显示文本输入框
    $(".tableList").find("tr").each(function () {
        var $selfEdit = $(this).find('td > a.action-edit');
        var $name = $(this).find('td > a.name');
        var $input = $(this).find('td > .form-control');
        $selfEdit.click(function () {
            $name.hide();
            $input.show();
        })
        $name.click(function () {
            $('.manage-group').hide();
            $('.manage-groupSub').show();
        })
    });
    //tooltip提示
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    //编辑应用列表
    function getAPPlist(dataSource) {
        //获取应用列表
        applyListService.getAppList(dataSource).then(function (respon) {

            $scope.app_status = respon.data.app_status
            $scope.group = respon.data.group
            $scope.listDefault = respon.data.list
            if($scope.listDefault.length == 0){
                return
            }
            $scope.$emit('listDefault',respon.data)
            $scope.total_row = respon.data.total_items
            $.each($scope.listDefault,function (index,item) {
                $scope.app_idGroup.push(item.app_id)
            })
            //获取应用列表状态
            applyListService.getAppHealthStatus({app_ids:$scope.app_idGroup},function (respon) {
                $.each($scope.listDefault,function (index,item) {
                    item.status = respon[item.app_id]
                })
                //获取应用主机列表
                applyListService.getHostList({app_ids:$scope.app_idGroup},function (respon) {
                    $scope.hostList = respon
                    $.each($scope.listDefault,function (index,item) {
                        item.list = Object.values(respon[item.app_id])
                    })
                    $scope.$apply(function () {
                        $scope.list = $scope.listDefault;
                        console.log($scope.list)
                    })
                })
            })


        })
    }

    // 应用列表根据分页改变刷新
    $scope.changeSqlList = function (currentPage,perPage) {
        console.log(currentPage,perPage)
        $scope.page_no = currentPage
        $scope.sum_per_page = perPage
        // $scope.dataSource.page = currentPage
    };
    $scope.$watchGroup(['page_no','sum_per_page'],function (newVal,oldVal) {
        console.log(newVal,oldVal)
        if(newVal != oldVal){
            $.extend(true,$scope.dataSource,{
                page : $scope.page_no
            })
            getAPPlist($scope.dataSource)
        }

    })


}])