/**
 * Created by Happily on 17/12/15.
 */
MyApp.controller('mobile', ['$scope', '$rootScope', 'mobileService',function ($scope,$rootScope,service) {
    $rootScope.sideBarKey = 'accountInfo'

    // $('#btn-save').click(function () {
    //     $('.form-horizontal').hide();
    //     $('.finish-state').show();
    // })


    var Regx = {
        empty: '请输入新手机号',
        phoneError : '请输入正确手机号',
        phoneExist : '该手机号已存在',
        checkCodeEmpty : '请输入验证码',
        checkCodeError : '请输入正确验证码',
        sendEmail : '获取验证码'
    }
    $scope.sendEmail = Regx.sendEmail
    $scope.phone = ''
    $scope.checkCode = ''
    $scope.phoneError = ''
    $scope.checkCodeError = ''

    $scope.phoneIsError = false
    $scope.checkIsCode = false
    $scope.disabled = false
    $scope.btnShow = true

    $scope.phoneChange = function () {
        var Val = $('#inputEmail3').val()
        if(Val == ''){
            $scope.phoneError = Regx.empty
            $scope.phoneIsError = true

        }else{
            var Exg = /^1[34578]\d{9}$/
            if(Exg.test(Val)){
                $scope.phone = Val
                $scope.phoneError = ''
                $scope.phoneIsError = false

            }else{
                $scope.phoneError = Regx.phoneError
                $scope.phoneIsError = true
            }
        }
    }

    $scope.getCode = function () {
        $scope.time = 60
        if($scope.phone == ''){
            $('#inputEmail3').focus()
            $scope.phoneError = Regx.empty
            $scope.phoneIsError = true
            return
        }else{
            $scope.sendEmail = '验证码已发送'
            service.sendMobileCode({mobile:$scope.phone}).then(function (respon) {
                if(respon.code == '1000'){
                    var timer =  $interval(function () {
                        $scope.time = $scope.time-1
                        $scope.sendEmail = '重新发送   '  + $scope.time +'s'
                        if($scope.time < 0){
                            $interval.cancel(timer)
                            $scope.sendEmail = Regx.sendEmail
                            $scope.disabled = false
                        }

                    }, 1000);
                }else{
                    $scope.phoneError = respon.msg
                    $('#inputEmail3').focus()
                    $scope.phoneIsError = true
                }
            })
        }
    }
    
    $scope.inputCheckCode = function () {
        var Val = $('#inputPassword3').val()
        $scope.checkCode = Val
        if(Val == ''){
            $scope.checkCodeError = Regx.checkCodeEmpty
            $scope.checkIsCode = true
        }
    }
    $scope.savePhone = function () {
       service.resetMobile({token:$scope.checkCode}).then(function (respon) {
           if(respon.code == '10004'){
               $scope.checkCodeError = respon.msg
           }else {
               $scope.btnShow = false
               $('.form-horizontal').hide();
               $('.finish-state').show()
           }
       })
    }
    

}])

MyApp.service('mobileService',['$http','httpService',function ($http,httpService) {

    var self = this
    this.send_reset_mobile_code = env_config.API.PersonalInfo.SEND_RESET_MOBILE_CODE
    this.reset_mobile= env_config.API.PersonalInfo.RESET_MOBILE
    
    this.sendMobileCode = function (dataSource) {
        var URL = self.send_reset_mobile_code
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    this.resetMobile = function (dataSource) {
        var URL = self.reset_mobile
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }


}])