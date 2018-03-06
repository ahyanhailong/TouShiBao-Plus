/**
 * Created by Happily on 17/12/12.
 */
MyApp.controller('accountInfo', ['$scope', '$rootScope','accountInfoService', function ($scope,$rootScope,service) {
    $rootScope.sideBarKey = 'accountInfo'

    $scope.page_no = 1
    $scope.total_row = ''
    $scope.sum_per_page = '5'


    //个人信息，点击修改的时候，出现输入框
    $('.span-edit').click(function () {
        $(this).hide();
        $('.span-save').show();
    })
    $('#cancel').click(function () {
        $('.span-save').hide();
        $('.span-edit').show();
    })
    // $('.span-save').click(function () {
    //     $(this).hide();
    //     $('.span-edit').show();
    // })


    service.getUserInfo().then(function (respon) {
        if(respon.code == '1000'){
            $scope.userInfo = respon.data
        }

    })
    service.getQuotaleft().then(function (respon) {
        if(respon.code == '1000'){
            $scope.currentQuota = respon.data
        }
    })
    $scope.ModifyUserNameChange = function () {
        var Val = $('#ModifyUserName').val()
    }
    $scope.saveNameChange = function () {
        var Val = $('#ModifyUserName').val()
        if(Val == ''){

        }else{
            service.ModifyUserNameFn({name:Val}).then(function (respon) {
                if(respon.code == '1000'){
                    $('.span-save').hide();
                    $('.span-edit').show();
                    service.getUserInfo().then(function (respon) {
                        if(respon.code == '1000'){
                            $scope.userInfo = respon.data
                            $('#ModifyUserName').val($scope.userInfo.user_name)
                        }

                    })
                }
            })
        }

    }


    service.getMoudleOverTime().then(function (respon) {
        $scope.getMoudleOverTimeDate = respon.data
        service.getMoudleOverTimeChart('getMoudleOverTime1',respon.data[0].rate,respon.data[0].left_by_days+'/'+respon.data[0].all_days)
        service.getMoudleOverTimeChart('getMoudleOverTime2',respon.data[1].rate,respon.data[1].left_by_days+'/'+respon.data[1].all_days)
        service.getMoudleOverTimeChart('getMoudleOverTime3',respon.data[2].rate,respon.data[2].left_by_days+'/'+respon.data[2].all_days)
        service.getMoudleOverTimeChart('getMoudleOverTime4',respon.data[3].rate,respon.data[3].left_by_days+'/'+respon.data[3].all_days)
        service.getMoudleOverTimeChart('getMoudleOverTime5',respon.data[4].rate,respon.data[4].left_by_days+'/'+respon.data[4].all_days)
    })

    function getMoudleQuotaList(page) {
        service.getMoudleQuota({page:page},function (respon) {
            $scope.total_row = respon.data.total_items
            $scope.$apply()
        })
    }

    $scope.changeSqlList = function (currentPage,perPage) {
        getMoudleQuotaList(currentPage)
    }
}])