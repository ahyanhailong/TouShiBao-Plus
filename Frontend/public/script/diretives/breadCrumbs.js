/**
 *  Author: jack
 *  Date: 2017/12/18
 *  Description: Created by jack on 2017/12/18.
 *
 *
 *  $scope.boxText         代表导航显示头部
 *  $scope.appidList       代表下拉列表数据
 *  $scope.listChooseKey   选中值的key
 *  $scope.listChooseValue 选中值的value
 */
MyApp.directive("breadCrumbs", function () {
    /*面包屑导航*/
    return {
        restrict: 'AE',
        replace: false,
        templateUrl: './public/components/allgroup/Breadcrumbs.html',
        controller: function ($scope) {
            $scope.isActive = false;
            $scope.isLiActive = -1;
            $scope.boxList = [];
            //点击展开下拉列表
            $scope.bIsShowList = false;
            $scope.bBoxTextIcon = false;
            $scope.fShowList = function () {
                $scope.bIsShowList = !$scope.bIsShowList;
                $scope.bBoxTextIcon = !$scope.bBoxTextIcon;
            }
            console.log($scope.isNoListActive)
            //点击展开分组列表
            // $scope.nIsShowGroupList = -1;
            // $scope.isListActive = -1;//有分组列表选中状态
            // $scope.isNoListActive = -1;//无分组列表选中状态
            // $scope.isSpanActive = -1;//小三角状态
            $scope.fShowGroupList = function (index) {
                $scope.isLiActive = index;
                if ($scope.nIsShowGroupList == index) {
                    $scope.nIsShowGroupList = -1;
                } else {
                    $scope.nIsShowGroupList = index;

                }
                if ($scope.isSpanActive == index) {
                    $scope.isSpanActive = -1;
                } else {
                    $scope.isSpanActive = index;

                }
            }

            $scope.fChooseGroupList = function (key, val, index, n) {
                $scope.boxText = val;
                $scope.bIsShowList = false;
                $scope.nIsShowGroupList = n;
                $scope.isListActive = index;
                $scope.isSpanActive = index;
                $scope.isNoListActive = -1;
                $scope.bBoxTextIcon = false;
                $scope.listChooseKey = key;
                $scope.listChooseValue = val;
            };
            $scope.fChooseNoGroupList = function (key, val, index) {
                $scope.boxText = val;
                $scope.bIsShowList = false;
                $scope.nIsShowGroupList = -1;
                $scope.isLiActive = -1;
                $scope.isListActive = -1;
                $scope.isNoListActive = index;
                $scope.bBoxTextIcon = false;
                $scope.isSpanActive = -1;
                $scope.listChooseKey = key;
                $scope.listChooseValue = val;
            };
            var watchList = $scope.$watchGroup(['appidList'], function (newval, oldval) {
                if (newval != oldval) {
                    $scope.groupList = $scope.appidList.grouped_list;
                    $scope.noGroupList = $scope.appidList.ungrouped;
                }
            });
            $scope.$on('$destroy', function () {
                watchList();
            });
        },
        link: function ($scope, ele, attrs) {
            $('#search_app').keyup(function () {
                var text = $('#search_app').val().trim();
                var lis = $('.boxLi');
                if (text == '') {
                    lis.show();
                    $scope.isLiActive = -1;
                    $scope.isSpanActive = -1;
                    $scope.nIsShowGroupList = -1;
                    $scope.$apply();
                } else {
                    $.each(lis, function (key, val) {
                        var index = $(val).text().trim().indexOf(text);
                        if (index == -1) {
                            $(val).hide();
                        } else {
                            if ($(val).parent('ul.list_group_list')) {
                                $(val).parent('ul.list_group_list').prev().show();
                                $scope.isLiActive = 0;
                                $scope.isSpanActive = 0;
                                $scope.nIsShowGroupList = 0;
                                $scope.$apply();
                            }
                            $(val).show();
                        }
                    })
                }
            });
        }
    }
})