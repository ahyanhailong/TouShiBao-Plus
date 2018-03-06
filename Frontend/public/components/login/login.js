/**
 * Created by Happily on 17/12/21.
 */

MyApp.controller('login',['$scope','loginService','$interval',function($scope,service,$interval){

    var trial_count = 0;
    //账号或密码错误
    $scope.userMsg = false

    $scope.message = {
        token : new Date().getTime()+''
    }
    //找回密码
    $scope.searchPw = {
        email:'',
        token : new Date().getTime()+''
    }
    //new or old password
    $scope.newOrPw = {}

    //注册
    $scope.register = {}


    $scope.registerTips = {
        company_name_empty : '请输入公司名称',
        company_name_number : '请输入正确的公司名称',
        TooLong : '请输入100位以内的数字或字符',
        company_url_empty : '请输入公司网址',
        company_url_number : '请输入正确的公司网址',
        user_name_empty : '请输入联系人',
        user_name_number : '请输入正确的联系人',
        user_email_empty : '请输入邮箱账号',
        user_email_error : '请输入正确的邮箱账号',
        user_email_exist : '该邮箱已被注册',
        password_empty : '请输入密码',
        sure_password_empty :'请输入确认新密码',
        sure_password_error :'与新密码不一致',
        password_error : '请输入6至32位的数字或字符',
        user_mobile_empty : '请输入手机号',
        user_mobile_error : '请输入正确的手机号',
        user_mobile_exist : '该手机号已被注册',
        verify_code_empty  : '请输入验证码',
        getMobileCode : '获取验证码',
        verify_code_error  : '请输入正确的验证码',
    }
    $scope.surePwErrorTip = $scope.registerTips.sure_password_empty
    // 默认状态： 登录show，注册和找回密码是hide

    //点击注册，登录页面隐藏，注册显示
    $('#userRegister').click(function () {
        $('.tsb-login').hide();
        $('.tsb-findPsw').hide();
        $('.tsb-register').show();
        var $hasClass =$('.tsb-formContent-left');
        if($hasClass){
            $('.tsb-formContent').removeClass("tsb-formContent-left").addClass("tsb-formContent-right");
        }else{
            $('.tsb-formContent').addClass("tsb-formContent-right");
        }

    })
    //点击登录，注册页面隐藏，登录显示
    $('#userLogin').click(function () {
        $('.tsb-register').hide();
        $('.tsb-findPsw').hide();
        $('.tsb-login').show();
        var $hasClass =$('.tsb-formContent-right');
        if($hasClass){
            $('.tsb-formContent').removeClass("tsb-formContent-right").addClass("tsb-formContent-left");
        }else{
            $('.tsb-formContent').addClass("tsb-formContent-left");
        }
    })
    //点击忘记密码，登录和注册隐藏，找回密码显示
    $('#forgotPsw').click(function () {
        $('.tsb-register').hide();
        $('.tsb-login').hide();
        $('.tsb-findPsw').show();
    });

    //登录成功后，显示成功后的唤醒页面
    // $('#btn-login').click(function () {
    //     $('.tsb-register').hide();
    //     $('.tsb-findPsw').hide();
    //     $('.tsb-login').hide();
    //     $('.action-btn').hide();
    //     $('.tsb-login-success').show().find('.icon-hook').addClass('icon-hook-topLeft');
    //     $('.content').addClass('content-scaleDraw');
    //
    // })
    //注册成功后，显示成功后的唤醒页面
    // $('#btn-register').click(function () {
    //     $('.tsb-login').hide();
    //     $('.tsb-findPsw').hide();
    //     $('.tsb-register').hide();
    //     $('.action-btn').hide();
    //     $('.tsb-formContent').addClass("tsb-formContent-right");
    //     $('.tsb-register-success').show().find('.icon-hook').addClass('icon-hook-topLeft');
    //     $('.content').addClass('content-scaleDraw');
    //
    // })

    /**
     * 忘记密码 功能模块
     */

    //修改密码
    $scope.step1Next = function () {
        $('#Step2').addClass('active').siblings().removeClass('active')
        $('#step02').addClass('active').siblings().removeClass('active')
    }
    $scope.step2Prev = function () {
        $('#Step1').addClass('active').siblings().removeClass('active')
        $('#step01').addClass('active').siblings().removeClass('active')
    }

    //获取邮箱验证码
    $scope.getEmailCode = function () {
        service.sendResetEmail($scope.searchPw).then(function (respon) {

        })
    }
    //确认新密码 失焦时间

    $scope.surePwBlur = function () {
        $scope.newOrPw['pw'] = $scope.pass.new
        if($scope.newOrPw.pw_repeat == undefined){
            $scope.surePwError = true
            $scope.surePwErrorTip = $scope.registerTips.sure_password_empty
        }else if($scope.newOrPw.pw_repeat != $scope.newOrPw.pw){
            $scope.surePwError = true
            $scope.surePwErrorTip = $scope.registerTips.sure_password_error
        }else{
            $scope.surePwError = false
        }
    }
    //重置密码提交
    $scope.resetPassword = function () {
        if($scope.newOrPw.pw_repeat && $scope.newOrPw.pw){
            $scope.newOrPw['pw'] = $scope.pass.new
            service.confirmResetPwd($scope.newOrPw).then(function (respon) {
                if(respon.code == '1000' && data == true){
                    $('#Step3').addClass('active').siblings().removeClass('active')
                    $('#step03').addClass('active').siblings().removeClass('active')
                }else{
                    alert(respon.msg)
                }
            })
        }

    }



    /**
     * 登陆模块
     */
    $scope.emailChange = function (status) {
        var email = $scope.message.email || '';
        var pw =  $scope.message.pw || ''
    }
    $scope.pwChange = function (status) {
        var pw =  $scope.message.pw || ''
    }


    //初始化滑块验证
    function geeInit (handler) {
        service.geeInit(1000).then(function (result) {
            if(result.data.success){
                var data = result.data;
                initGeetest({
                    // 以下配置参数来自服务端 SDK
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success,
                    new_captcha: data.new_captcha,
                    width:'200px'
                }, handler)
            }else{
                console.log('failed');
            }
        })
    }

    var passHandle = function (captchaObj) {
        captchaObjG = captchaObj;
        // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
        captchaObj.appendTo("#embed-captcha");
        captchaObj.onReady(function () {
            $("#wait").hide();
        });

        // $('#submit').click(function(e){
        //     trial_count++;
        //     var validate = captchaObjG.getValidate();
        //     if (trial_count >=3 && !validate) {
        //         $('#slider_wrap').css('display','block')
        //         $('#errorinfo').html('')
        //         $("#notice").html('请先完成验证');
        //         $("#notice").show();
        //         setTimeout(function () {
        //             $("#notice").hide();
        //         }, 2000);
        //         e.preventDefault();
        //         return ;
        //     }
        //
        //     if($(this).attr('disable') == 'disable'){
        //         return false;
        //     }
        //     $(this).attr('disable','disable');
        //     ucenter.userLogin(validate);
        //     setTimeout(function(){
        //         $('#submit').removeAttr('disable');
        //     },2000)
        // });
    }
    geeInit(passHandle)

    $scope.login = function () {
        $('#slider_wrap').css('display','block')
        var token
        var lang
        var email
        var pw

        var postData = $('#__login_form').serializeArray();
        var key_hash = CryptoJS.MD5($scope.message.token);
        var key = CryptoJS.enc.Utf8.parse(key_hash);
        var iv  = CryptoJS.enc.Utf8.parse('1234567812345678');
        $.each(postData,function (i,v) {
            switch (v.name){
                case "token":
                    token = v.value;
                    break;
                case "lang":
                    lang = CryptoJS.AES.encrypt(v.value,key, { iv: iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
                    break;
                case "email":
                    email = CryptoJS.AES.encrypt(v.value,key, { iv: iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
                    break;
                case "pw":
                    pw = CryptoJS.AES.encrypt(v.value,key, { iv: iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
                    break;
            }
        })

        var submit = {};
        submit.token  = token;
        submit.email = email;
        submit.pw = pw;

        service.logIn(submit).then(function (respon) {
            if(respon.code == '1000'){
                //显示登陆成功
                $('.tsb-register').hide();
                $('.tsb-findPsw').hide();
                $('.tsb-login').hide();
                $('.action-btn').hide();
                $('.tsb-login-success').show().find('.icon-hook').addClass('icon-hook-topLeft');
                $('.content').addClass('content-scaleDraw');

                setTimeout(function () {
                    window.location.href = '#/navigation/applyListdefault/applyList'
                },1000)
            }else if (respon.code == '940'){
                $scope.userMsg = true
            }
        })
    }

    /**
     * 注册模块
     */
    $scope.pass = {};
    var weekColor = $scope.weekColor = [
        {
            text: 'orange-text',
            bg: 'orange-bg',
            name: '弱'
        }, {
            text: 'yellow-text',
            bg: 'yellow-bg',
            name: '中'
        }, {
            text: 'green-text',
            bg: 'green-bg',
            name: '强'
        }
    ];
    $scope.currentWeek = weekColor[0];

    $scope.newPattern = false;
    $scope.matched = 0;


    $scope.newChange = function (status) {
        if (status) {
            var matches = [
                /[A-Za-z]/,  //字母
                /[0-9]/,  //数字
                /[~!@#$%^&*()\-_=+{};:<,.>?\/\[\]\'\"\\\|~`]/ //特殊字符
            ];
            var matched = 0;
            var value = $scope.pass.new || '';
            $.each(matches, function (i, reg) {
                if (reg.test(value)) {
                    matched++;
                }
            })
            if (matched < 2) {
                $scope.newPattern = false;
            } else {
                $scope.newPattern = true;
            }
            $scope.matched = matched;
            $scope.currentWeek = weekColor[matched - 1];
        }
    };

    $scope.getClass = function (i) {
        if (i < $scope.matched) {
            return $scope.currentWeek.bg;
        }
        return '';
    };
    //获取验证码
    $scope.getMobileCode = function () {
        var Timer = null
        var cont = 60
        service.sendResetMobileCode({mobile:$scope.register.user_mobile}).then(function (respon) {
            if(respon.code == 1000){
                Timer =$interval(function () {
                    cont --
                    $scope.registerTips.getMobileCode = cont + 's'
                    if(cont <= 0){
                        $scope.registerTips.getMobileCode = '获取验证码'
                        cont = 0
                        window.clearInterval(Timer)
                    }
                },1000)

            }
        })
    }

    //点击注册按钮
    $scope.registerBtn = function () {
        service.registerFn($scope.register).then(function (respon) {
            if(respon.code == 1000){

                $('.tsb-login').hide();
                $('.tsb-findPsw').hide();
                $('.tsb-register').hide();
                $('.action-btn').hide();
                $('.tsb-formContent').addClass("tsb-formContent-right");
                $('.tsb-register-success').show().find('.icon-hook').addClass('icon-hook-topLeft');
                $('.content').addClass('content-scaleDraw');

                setTimeout(function () {
                    window.location.href = '#/navigation/applyListdefault/applyList'
                },1000)
            }else{
                alert(respon.msg)
            }
        })
    }


}])
MyApp.service('loginService',['httpService',function (httpService) {

    var self = this

    this.loginApi = env_config.API.LognIAndRegister.Login
    this.getRegisterGeeInitApi= env_config.API.LognIAndRegister.GET_REGISTER_GEE_INIT
    this.sendResetPwdEmailApi = env_config.API.LognIAndRegister.SEND_RESET_PWD_EMAIL
    this.resetPwdApi = env_config.API.LognIAndRegister.RESET_PWD

    this.sendResetMobileCodeApi = env_config.API.LognIAndRegister.SEND_RESET_MOBILE_CODE

    this.confirmResetPwdApi = env_config.API.LognIAndRegister.CONFIRM_RESET_PWD
    //用户注册
    this.registerApi = env_config.API.LognIAndRegister.REGISTER

    this.logIn = function (dataSource) {
        var URL = self.loginApi
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }

    //初始化滑块 验证
    this.geeInit = function (handler) {
        var URL = self.getRegisterGeeInitApi
        var submit = {};
        submit.t = (new Date()).getTime();
        return httpService.post(URL,submit).then(function (result) {
            return result
        })
    }
    //找回密码 邮箱账号获取验证码
    this.sendResetEmail = function (dataSource) {
        var URL = self.sendResetPwdEmailApi
        return httpService.get(URL,dataSource).then(function (result) {
            return result
        })
    }
    //重置密码
    this.resetPwd = function (dataSource) {
        var URL = self.resetPwdApi
        return httpService.get(URL,dataSource).then(function (result) {
            return result
        })
    }

    //邮箱确认重置密码
    this.confirmResetPwd = function (dataSource) {
        var URL = self.confirmResetPwdApi
        return httpService.get(URL,dataSource).then(function (result) {
            return result
        })
    }

    this.sendResetMobileCode = function (dataSource) {
        var URL = self.sendResetMobileCodeApi
        return httpService.get(URL,dataSource).then(function (result) {
            return result
        })
    }
    //用户注册
    this.registerFn = function (dataSource) {
        var URL = self.registerApi
        return httpService.get(URL,dataSource).then(function (result) {
            return result
        })
    }


}])