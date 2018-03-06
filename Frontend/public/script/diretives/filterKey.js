/**
 *  Author: harry.lang
 *  Date: 2017/11/28
 *  Description: Created by harrylang on 2017/11/28.
 */
MyApp.directive("filterKey", function () {
    /* 添加过滤条件 filte_key*/
    return {
        // A 是单词 attribute 首字母，将指令当属性来用
        // E 是单词 element   首字母，将指令当标签来用
        // C 是单词 class     首字母，将指令当类来用
        // M 是单词 mark      首字母，将指令将注释来用
        restrict: 'A',
        replace: true,
        templateUrl: "./public/components/allgroup/filter_keys.html",
        link: function ($scope, ele, attrs) {
           
        }
    };
});