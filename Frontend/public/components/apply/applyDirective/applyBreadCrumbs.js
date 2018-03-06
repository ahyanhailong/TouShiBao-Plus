/**
 *  Author: harry.lang
 *  Date: 2017/12/24
 *  Description: Created by harrylang on 2017/12/24.
 */
MyApp
    .directive('applyBreadCrumbs', [
        'applyBreadCrumbsService', '$compile', '$state', '$location',
        function (service, $compile, $state, $location) {
            return {
                restrict: 'AE',
                controller: function ($scope) {
                    $scope.boxText = '';
                    $scope.appidList = {};

                    function getAppNameById(list,hasList,n) {
                        if(hasList) {
                            $.each(list, function (i, l) {
                                if (l.app_id == $state.params.app_id) {
                                    $scope.boxText = l.app_name;
                                    $scope.isListActive = i;
                                    $scope.isSpanActive = n;
                                    $scope.nIsShowGroupList = n;

                                }
                            });
                        }else {
                            $.each(list, function (i, l) {
                                if (l.app_id == $state.params.app_id) {
                                    $scope.boxText = l.app_name;
                                    $scope.isNoListActive = i;
                                }
                            });
                        }
                    }

                    service.getAppList().then(function (data) {
                        $scope.appidList = data;

                        $.each(data.grouped_list, function (i, group) {
                            getAppNameById(group.app_list,true,i);
                        });
                        getAppNameById(data.ungrouped,false);

                    });

                    $scope.$watch('listChooseKey', function (appId) {
                        if (appId) {
                            var params = $state.params;
                            params.app_id = appId;
                            $state.go($state.$current.name, params);
                            $scope.$emit('appIdChange',appId)
                        }
                    });
                },
                link: function ($scope, $elem, $attrs) {
                    $elem.html($compile('<bread-crumbs></bread-crumbs>')($scope));
                }
            }
        }])
    .service('applyBreadCrumbsService', [
        'httpService', function (http) {
            var GetAppLIst = env_config.API.APP.GET_APP_LIST;

            this.getAppList = function () {
                return http.get(GetAppLIst).then(function (result) {
                    return result.code == 1000 ? result.data : [];
                });
            }
        }]);