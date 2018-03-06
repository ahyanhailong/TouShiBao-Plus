/**
 * Created by Happily on 17/12/18.
 */
MyApp.controller('apiConfig', ['$scope', '$rootScope','apiConfigService', function ($scope,$rootScope,service) {
    $rootScope.sideBarKey = 'apiConfig'

    // $('#btn-save').click(function () {
    //     $('.form-horizontal').hide();
    //     $('.finish-state').show();
    // })
    
    $scope.liClick = function (evetn) {
        if($(event.currentTarget).hasClass('active')){
            $(event.currentTarget).removeClass('active')
        }else{
            $(event.currentTarget).addClass('active')
        }

    }
    
    service.getApiSecretKey().then(function (respon) {
        if(respon.code == '1000'){
            /**
             * 100 : HSOT
             * 11 :Browser
             * 402 : Mobile
             * 1001 : PHP
             * 1002 : JAVA
             * 1003 : .NET
             * 1004 : Python
             */
            $scope.ApiSecretKeyMsg = respon.data
            $scope.ApiSecret = respon.data.secret
            var li = $('.ul-list li')
            for(var i=0;i<li.length;i++){
                var type = parseInt($(li[i]).attr('data-type'))
                if($.inArray(type,respon.data.data_types) >= 0){
                    $(li[i]).addClass('active')
                }
            }
        }
    })

    //复制API
    $("#ApiCopy").zclip({
        path:'public/script/zclip/ZeroClipboard.swf', //记得把ZeroClipboard.swf引入到项目中
        copy:function(){
            return $('#api').val();
        }
    });
    $scope.changeSecret = function () {
        service.changeApiSecret().then(function (respon) {
            if(respon.code == '1000'){
                $scope.ApiSecret = respon.data.secret
            }
        })
    }
    //复制秘钥
    $("#secretCopy").zclip({
        path:'public/script/zclip/ZeroClipboard.swf', //记得把ZeroClipboard.swf引入到项目中
        copy:function(){
            return $('#inputPassword2').val();
        }
    });
    $scope.saveApi = function () {
        var li = $('.ul-list li')
        var data = {}
        for(var i=0;i<li.length;i++){
            var type = $(li[i]).attr('data-type')
            if($(li[i]).hasClass('active')){
                data[type] = 1
            }else{
                data[type] = 2
            }
        }

        service.saveApiSecret({data:data})
    }
    $scope.complete = function () {
        $('.form-horizontal').show();
        $('.finish-state').hide();
    }

}])
MyApp.service('apiConfigService',['httpService',function (httpService) {

    var self = this

    this.get_api_secret_key = env_config.API.getApiSecretKey.GET_API_SECRET_KEY
    this.change_api_secret = env_config.API.getApiSecretKey.CHANGE_API_SECRET
    this.save_api_secret = env_config.API.getApiSecretKey.SAVE_API_SECRET


    this.getApiSecretKey = function (dataSource) {
        var URL = self.get_api_secret_key
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    this.changeApiSecret = function (dataSource) {
        var URL = self.change_api_secret
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
    }
    this.saveApiSecret = function (dataSource) {
        var URL = self.save_api_secret
        $.ajax({
            type: 'get',
            url: URL,
            data: dataSource,
            dataType: 'json',
            success:function (respon) {
                if(respon.code == '1000'){
                    $('.form-horizontal').hide();
                    $('.finish-state').show();
                }
            }

        })
    }
}])