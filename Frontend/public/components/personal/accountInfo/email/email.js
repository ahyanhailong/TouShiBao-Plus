/**
 * Created by Happily on 17/12/15.
 */
MyApp.controller('email', ['$scope', '$rootScope','accountInfoService','$interval', function ($scope,$rootScope,service,$interval) {
    $rootScope.sideBarKey = 'accountInfo'
    // $('#btn-save').click(function () {
    //     $('.form-horizontal').hide();
    //     $('.finish-state').show();
    // })
    $scope.emailError = ''
    $scope.checkCode = ''
    $scope.emailIsError = false
    $scope.checkIsCode = false

    $scope.disabled = false

    $scope.btnShow = true
    var Regx = {
        empty: '请输入新邮箱',
        emailError : '请输入正确邮箱',
        emailExist : '该邮箱已存在',
        checkCodeEmpty : '请输入验证码',
        checkCodeError : '请输入正确验证码',
        sendEmail : '获取验证码'
    }
    $scope.sendEmail = Regx.sendEmail
    $scope.email = ''
    $scope.emailChange = function (event) {
       var Val = $('#inputEmail3').val()
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(Val == ''){
            $scope.emailError = Regx.empty
        }else {
            if(!myreg.test(Val)){
                $scope.emailError = Regx.emailError
                $scope.emailIsError = true
            }else{
                $scope.emailError = ''
                $scope.emailIsError = false
                $scope.email = Val
            }
        }

    }

    $scope.checkChange = function () {
        $scope.checkCode = ''
        $scope.checkIsCode = false
    }
    
    $scope.getCheckCode = function (event) {
        $scope.time= 60
        if($scope.email == ''){
            $('#inputEmail3').focus()
            $scope.emailError = Regx.empty
            $scope.emailIsError = true
            return
        }else{
            $scope.sendEmail = '验证码已发送'
            $scope.disabled = true
            service.sendResetRmail({email:$scope.email}).then(function (respon) {
                if(respon.code == '10005'){
                    $scope.emailError = respon.msg
                    $('#inputEmail3').focus()
                    $scope.emailIsError = true
                }else{
                   var timer =  $interval(function () {
                        $scope.time = $scope.time-1
                       console.log($scope.time)
                       $scope.sendEmail = '重新发送   '  + $scope.time +'s'
                        if($scope.time < 0){
                            $interval.cancel(timer)
                            $scope.sendEmail = Regx.sendEmail
                            $scope.disabled = false
                        }

                    }, 1000);
                }

            })
        }

    }
    
    
    $scope.saveEmail = function () {
        var token = $('#inputPassword3').val()
        if(token == ''){
            $('#inputPassword3').focus()
            $scope.checkCode = Regx.checkCodeEmpty
            $scope.checkIsCode = true
            return
        }else{
            service.resetEmail({token:token}).then(function (respon) {
                if(respon.code == '1000'){
                    $('.form-horizontal').hide();
                    $('.finish-state').show();
                    $scope.btnShow = false
                }else if(respon.code == '10006'){
                    $('#inputPassword3').focus()
                    $scope.checkCode = Regx.checkCodeError
                    $scope.checkIsCode = true
                }

            })
        }


    }

}])