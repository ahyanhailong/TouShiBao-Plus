/**
/**
 * Created by bert on 2017/5/17.
 */

/* 注册UI路由、OC懒加载、JQuery滚动条插件*/
var MyApp =angular.module('TSB', ["ui.router", "oc.lazyLoad","jQueryScrollbar"]);

MyApp.run(['$rootScope','Data',function ($rootScope,Data) {
        $rootScope.globalContent = 'hello world!'
}]);
