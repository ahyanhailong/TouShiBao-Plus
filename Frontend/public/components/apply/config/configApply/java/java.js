/**
 * Created by Happily on 17/12/14.
 */
MyApp.controller('java', ['$scope', '$rootScope','javaService', function ($scope,$rootScope,service) {

    $scope.window = ''
    $scope.linux = ''
    $scope.dataSource={
        service_type : 1002
    }
    //复制授权编号
    Copy('LicenseKeyBtn','LicenseKey')
    //复制SendProxyLinux
    Copy('SendProxyLinuxBtn','SendProxyLinux')
    //复制JDK1.6
    Copy('JDKBtn6','JDK6')

    $('#collapseOne').collapse('show')
    $('#collapseTwo').collapse('show')
    $('#collapseThree').collapse('show')
    $('#collapseFour').collapse('show')
    $('#collapseFive').collapse('show')

    $scope.tabJDK15 = function (event) {
        $('#JDK2').css('display','block')
        $('#JDK1').css('display','none')
        //复制JDK1.5
        Copy('JDKBtn5','JDK5')
    }
    $scope.tabJDK16 = function () {
        $('#JDK2').css('display','none')
        $('#JDK1').css('display','block')
        //复制JDK1.5
        Copy('JDKBtn5','JDK5')
    }
    //点击下载
    $scope.download = function (event,info) {
        console.log(info)
        window.location.href = info
    }

    
    service.PluginInfo($scope.dataSource).then(function (respon) {
        $scope.java = respon.data
    })
    $.extend(true,$scope.dataSource,{
        service_type : 97,
    })
    service.PluginInfo($scope.dataSource).then(function (respon) {
       $scope.SendProxy = respon.data
    })

    function Copy(domClickId,domValId) {
        $("#"+domClickId).zclip({
            path:'public/script/zclip/ZeroClipboard.swf', //记得把ZeroClipboard.swf引入到项目中
            copy:function(){
                return $.trim($('#'+domValId).html());
            }
        });
    }


}])
MyApp.service('javaService',['httpService',function (httpService) {

    var self = this
    this.get_plugin_info = env_config.API.getPluginInfo.GET_PLUGIN_INFO
    this.PluginInfo = function (dataSource) {
        var URL = self.get_plugin_info
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })
        
    }

}])