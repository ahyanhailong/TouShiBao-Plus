/**
 * Created by mark on 2017/10/20.
 */
MyApp.controller('contentSon2ctl', ['$rootScope','$scope', 'Data', function ($rootScope,$scope, Data) {
    $scope.test = "content_son2"
    $scope.changeContent = function () {
        $rootScope.globalContent = '子页面2改变了我的值'
    }
}])