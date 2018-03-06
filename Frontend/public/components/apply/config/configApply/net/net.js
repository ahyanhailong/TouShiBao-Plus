
/**
 * Created by Happily on 17/12/14.
 */
MyApp.controller('net', ['$scope', '$rootScope','netService', function ($scope,$rootScope,service) {


    $scope.net =''
    $scope.SendProxy =''

    $scope.dataSource={
        service_type : 1004
    }
    $('#collapseOne').collapse('show')
    $('#collapseTwo').collapse('show')
    $('#collapseThree').collapse('show')
    $('#collapseFour').collapse('show')
    $('#collapseFive').collapse('show')
    //复制授权编号
    Copy('LicenseKeyBtn','LicenseKey')
    service.PluginInfo($scope.dataSource).then(function (respon) {
        $scope.net = respon.data
    })
    $.extend(true,$scope.dataSource,{
        service_type : 97
    })
    service.PluginInfo($scope.dataSource).then(function (respon) {
        $scope.SendProxy = respon.data
    })
    //点击下载
    $scope.download = function (event,info) {
        window.location.href = info
    }


    function Copy(domClickId,domValId) {
        $("#"+domClickId).zclip({
            path:'public/script/zclip/ZeroClipboard.swf', //记得把ZeroClipboard.swf引入到项目中
            copy:function(){
                return $.trim($('#'+domValId).html());
            }
        });
    }

}])
MyApp.service('netService',['httpService',function (httpService) {

    var self = this
    this.get_plugin_info = env_config.API.getPluginInfo.GET_PLUGIN_INFO
    this.PluginInfo = function (dataSource) {
        var URL = self.get_plugin_info
        return httpService.get(URL,dataSource).then(function (respon) {
            return respon
        })

    }

}])