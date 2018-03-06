MyApp.controller('applyListdefault',['$scope','$rootScope','applyListService','httpService',function ($scope,$rootScope,applyListService,httpService) {

    $scope.groupName = '全部'
    $scope.searchName = '响应时间'

    $scope.app_group_name = ''
    $scope.app_group_id = ''

    $scope.checkedAll = false
    $scope.checkedArr = {}

    $scope.$watchGroup(['checkedAll'],function (newval,oldval) {
        $scope.$broadcast('checkedAll',$scope.checkedAll)
        
    })

    $scope.status = 1 //1开启，2暂停
    $scope.name = '' //迷糊匹配
    $scope.group_id = '' //应用时间分组
    $scope.order = 'wt' //排序字段
    $scope.sort = 'desc' //排序方式
    $scope.page = '1' //排序方式


    $scope.app_idGroup = []
    $scope.dataSource = {
        status:$scope.status,
        name:$scope.name,
        group_id:$scope.group_id,
        order:$scope.order,
        sort:$scope.sort,
        page:$scope.page
    }




    $scope.$on('listDefault',function (event,info) {
        console.log(info)
        $scope.app_status = info.app_status
        $scope.group = info.group
    })

    //应用列表排序
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
            $scope.dataSource.order =order
            $scope.dataSource.sort = sort
        })
        $scope.$broadcast('orderChange',{order:order,sort:sort})

    })
    $('#input-search').on('onkey',function () {
        $scope.searchAppList()
    })
    $scope.searchAppList = function () {
        var name = $('#input-search').val()
        $scope.$broadcast('applyListSearch',name)
    }
    //分组筛选
    $scope.groupFilter = function (group_id,group_name) {
        $scope.group_id = group_id
        $scope.groupName = group_name
        $scope.$broadcast('groupFilter',{group_id:group_id})
    }
    //取消
    $('.btn-cancel').click(function () {
        $(this).parents('.tsb-btn-group').removeClass('open');
    })
    //新建分组保存
    $scope.CreatGroup = function (dataSource) {
        $('.btn-ok').parents('.tsb-btn-group').removeClass('open');
        var app_group_name = $('#inputEmail3').val()
        applyListService.addNewGroup({app_group_name:app_group_name}).then(function (respon) {
                if(respon.code == 1000){
                    $scope.$broadcast('creatGroup',true)
                }
        })
    }
    //取消
    $scope.cancelBtn = function () {
        $('.btn-cancel').parents('.tsb-btn-group').removeClass('open');
    }


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
    //管理分组点击分组名称
    $scope.groupNameClick = function (event,app_group_id,app_group_name) {
        $('.manage-group').hide();
        $('.manage-groupSub').show();
        $scope.app_group_name = app_group_name
        $scope.app_group_id = app_group_id
        getGroupAPPLIst(app_group_name,app_group_id,'')

    }
    //获取分组里边的应用列表
    function  getGroupAPPLIst(app_group_name,app_group_id,name) {
        applyListService.get_Group_App({app_group_id:app_group_id,app_group_name:app_group_name,name:name}).then(function (respon) {
            if(respon.code == 1000){
                $scope.getGroupAppList = respon.data
            }

        })
    }
    //点击编辑分组里边的应用
    $scope.editorClick = function ($event,name) {
        $($event.currentTarget).parents('tr').find('td >a.name').hide()
        $($event.currentTarget).parents('tr').find('td >input').show()
        $scope.app_group_name = name
    }
    //分组里的应用失焦保存事件
    $scope.groupAppSave = function ($event,app_id) {
        var app_name = $($event.currentTarget).val()
        $($event.currentTarget).siblings().show()
        $($event.currentTarget).hide()
        if($scope.app_group_name != app_name){
            applyListService.setAppName({app_id:app_id,app_name:app_name}).then(function (respon) {
                if(respon.code == 1000){
                    getGroupAPPLIst($scope.app_group_name,$scope.app_group_id,app_name)
                }
            })
        }


    }

    // //全选
    // $scope.$on('checkedAll',function (event,info) {
    //     $scope.checkedAll = info
    //     if($scope.checkedAll){
    //         var checkedList = $('.event-content .tsb-box-show2e .apply-check input[type=checkbox]')
    //         checkedList.each(function (index,element) {
    //             var id = $(element).attr('id')
    //             if(!$scope.checkedArr[id]){
    //                 $scope.checkedArr[id] = id
    //             }
    //
    //         })
    //     }else{
    //         $scope.checkedArr = {}
    //     }
    //     console.log($scope.checkedArr)
    //
    // })
    // //checkbox点击事件
    // $scope.checkboxclick = function (app_id) {
    //     if($scope.checkedArr[app_id]){
    //         delete $scope.checkedArr[app_id]
    //     }else{
    //         $scope.checkedArr[app_id]=app_id
    //     }
    //
    //     console.log($scope.checkedArr)
    // }
    //一键暂停
    $scope.oneKeyPause = function (event,id) {
        $scope.$broadcast('oneKeyPause',id)
    }
    //管理分组一级页面编辑按钮
    $scope.groupNameEdit = function ($event,app_group_id,app_group_name) {
        console.log(app_group_id,app_group_name)
        $scope.app_group_id = app_group_id
        $scope.app_group_name = app_group_name

        $($event.currentTarget).parents('tr').find('input').show()
        $($event.currentTarget).parents('tr').find('.name').hide()
    }
    $scope.blurClick = function ($event) {
        $($event.currentTarget).hide()
        $($event.currentTarget).siblings().show()
        var name = $($event.currentTarget).val()
        if($($event.currentTarget).val() != $scope.app_group_name){
            applyListService.updataAppGroup({app_group_id:$scope.app_group_id,app_group_name:name}).then(function (respon) {
                if(respon.code == 1000){
                    getAppGroupList()
                }

            })

        }
    }
    //删除管理分组
    $scope.delete_App_group = function (event,app_group_id) {
        console.log(app_group_id)
        applyListService.deleteAppGroup({app_group_id:app_group_id}).then(function (respon) {
            if(respon.code == 1000){
                getAppGroupList()
            }

        })
    }
    //删除分组里应用
    $scope.DeleGroupApp = function (event,id) {
        console.log(id)
        applyListService.deletGroupApp({app_group_id:$scope.app_group_id,app_id:id}).then(function (respon) {
            if(respon.code == 1000){
                getGroupAPPLIst($scope.app_group_name,$scope.app_group_id)
            }
        })
    }
    //搜索分组里的应用
    $scope.search = function () {
        var name = $('#groupAppName').val()
        getGroupAPPLIst($scope.app_group_name,$scope.app_group_id,name)

    }
    $('#groupAppName').on('onkey',function () {
        var name =$('#groupAppName').val()
        getGroupAPPLIst($scope.app_group_name,$scope.app_group_id,name)
    })
    //管理分组保存

    $scope.saveAppGroup = function () {
        $scope.$broadcast('creatGroup',true)
    }

    //返回按钮
    $scope.callBack = function () {
        $('.manage-group').show();
        $('.manage-groupSub').hide();
    }

    //管理分组列表
    getAppGroupList()
    function getAppGroupList() {
        applyListService.getAppGroup().then(function (respon) {
            $scope.appGroupList = respon.data

        })
    }

    //加入分组
    $scope.addGroup = function (event,id) {
        console.log(id)
        $scope.$broadcast('addGroup',id)
    }


    //应用列表 暂停/启动
    $scope.setApplyStatus = function (event,status) {
        $scope.$broadcast('UpdateAppList',true)
    }



}])