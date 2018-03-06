/**
 *  Author: harry.lang
 *  Date: 2018/1/4
 *  Description: Created by harrylang on 2018/1/4.
 */
MyApp.directive('userManagerGroup', [
    'userManagerGroupService', 'userManagerService',
    function (service, managerService) {
        return {
            restrict: 'AE',
            scope: {
                group_user_list:'=groupUserList'
            },
            controller: function ($scope) {
                $scope.searchEmail = '';
                $scope.userCheck = [];

                $scope.$watch('group_user_list',function (newVal,oldVal) {
                    angular.forEach($scope.group_user_list.user_list, function (u) {
                        $scope.userCheck.push(u.user_id);
                    });
                    $scope.initGroup()
                    console.log($scope.userCheck)
                    $scope.group.group_name = $scope.group_user_list.group_name
                    $scope.checkedUsers = $scope.group_user_list.user_list
                })
                managerService.getUser({
                    search_email: $scope.searchEmail
                }).then(function (data) {
                    $scope.userList = data.list;
                });
                $scope.initGroup = function () {
                    $scope.group = {
                        group_name: '',
                        user_ids: [],
                        privilege: [{
                            type: 'web_app',//web应用
                            ids: []
                        }, {
                            type: 'mobile_app',//移动应用
                            ids: []
                        }, {
                            type: 'background_app',//后台应用
                            ids: []
                        }, {
                            type: 'host',//主机
                            ids: []
                        }, {
                            type: 'browser_app',//浏览器
                            ids: []
                        }, {
                            type: 'service_topo',//业务拓扑
                            ids: []
                        }]
                    };
                };
                $scope.initGroup();

                $scope.checkedUsers = [];

                $scope.addUserIds = function (ids, userList) {
                    $scope.group.user_ids = ids;
                    $scope.checkedUsers = userList;
                }
            },
            templateUrl: './public/components/personal/userManager/directives/group.html',
            link: function ($scope, $elem, $attr) {
                var box = $elem.children();

                $scope.saveGroup = function () {
                    if ($.trim($scope.group.group_name) != '') {
                        service.addGroup($scope.group).then(function (data) {
                            box.removeClass('open');
                            $scope.$emit('addGroup', {
                                group_id: data.group_id,
                                group_name: $scope.group.group_name,
                                user_num: $scope.group.user_ids.length
                            });
                            alert('保存成功！');
                        });
                    } else {
                        alert('部门名称不能为空！');
                    }
                };

                box.on('hidden.bs.dropdown', function () {
                    $scope.initGroup();
                    $scope.$apply();
                });

                $scope.cancelGroup = function () {
                    box.removeClass('open');
                };

            }
        }
    }]);

/**
 * 添加成员
 */
MyApp.directive('userManagerGroupAddUser', [
    'userManagerGroupService', 'userManagerService',
    function (service, managerService) {
        return {
            restrict: 'AE',
            controller: function ($scope) {
                $scope.userList = [];
                $scope.userCheck = [];
                $scope.userTimes = 0;
                $scope.searchEmail = '';
                // 单选
                $scope.clickUser = function (u) {
                    var i = $scope.userCheck.indexOf(u.user_id);
                    if (i > -1) {
                        $scope.userCheck.splice(i, 1);
                    } else {
                        $scope.userCheck.push(u.user_id);
                    }
                };

                // 全选
                $scope.allUserChecked = false;
                $scope.checkAllUser = function () {
                    $scope.userCheck = [];
                    if (!$scope.allUserChecked) {
                        angular.forEach($scope.userList, function (u) {
                            $scope.userCheck.push(u.user_id);
                        });
                    }
                    $scope.allUserChecked = !$scope.allUserChecked;
                };
            },
            link: function ($scope, $elem, $attrs) {

                var ul = $elem.find('.dropdown-menu-ul');
                $scope.clickBtn = function (e) {
                    if (ul.hasClass('open')) {
                        ul.hide().removeClass('open');
                    } else {
                        ul.show().addClass('open');
                        managerService.getUser({
                            search_email: $scope.searchEmail
                        }).then(function (data) {
                            $scope.userList = data.list;
                            $scope.userTimes = data.total_items_origin;
                        });
                    }

                };

                // 搜索
                var input = $elem.find('.input-search');
                input.on('keydown', function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        managerService.getUser({
                            search_email: $scope.searchEmail
                        }).then(function (data) {
                            $scope.userList = data.list;
                            $scope.userTimes = data.total_items_origin;
                        });
                        $scope.$apply();
                    }
                });
                $elem.on('click', '.icon-search', function (e) {
                    managerService.getUser({
                        search_email: $scope.searchEmail
                    }).then(function (data) {
                        $scope.userList = data.list;
                        $scope.userTimes = data.total_items_origin;
                    });
                    $scope.$apply();
                });

                $scope.cancelUser = function () {
                    $scope.userCheck = $.extend(true, [], $scope.group.user_ids);
                    ul.hide().removeClass('open');
                };

                $scope.okUser = function () {
                    var _userList = [];
                    var _ids = [];
                    angular.forEach($scope.userList, function (u) {
                        if ($scope.userCheck.indexOf(u.user_id) > -1) {
                            _userList.push(u);
                            _ids.push(u.user_id);
                        }
                    });

                    $scope.addUserIds(_ids, _userList);
                    ul.hide().removeClass('open');

                };
            }
        }
    }]);

/**
 * Web应用
 */
MyApp.directive('userManagerGroupWebApp', [
    'userManagerGroupService',
    function (service) {
        return {
            restrict: 'AE',
            controller: function ($scope) {
                // 获取WEB应用列表
                $scope.webApps = {grouped_list: [], ungrouped: []};
                service.getAppList().then(function (data) {
                    $scope.webApps = data;
                });

                $scope.webAppChecked = [];

                // 单选
                $scope.clickWebApp = function (item) {
                    var i = $scope.webAppChecked.indexOf(item.app_id);
                    if (i > -1) {
                        $scope.webAppChecked.splice(i, 1);
                    } else {
                        $scope.webAppChecked.push(item.app_id);
                    }

                    $scope.group.privilege[0].ids = $scope.webAppChecked;
                };

                // 全选
                $scope.allWebAppChecked = false;
                $scope.checkAllWebApp = function () {
                    $scope.webAppChecked = [];
                    if (!$scope.allWebAppChecked) {
                        angular.forEach($scope.webApps.grouped_list, function (group) {
                            angular.forEach(group.app_list, function (item) {
                                $scope.webAppChecked.push(item.app_id);
                            });
                        });

                        angular.forEach($scope.webApps.ungrouped, function (item) {
                            $scope.webAppChecked.push(item.app_id);
                        });
                    }
                    $scope.allWebAppChecked = !$scope.allWebAppChecked;

                    $scope.group.privilege[0].ids = $scope.webAppChecked;
                };
            },
            link: function ($scope, $elem, $attrs) {

            }
        }
    }]);

MyApp.service('userManagerGroupService', ['httpService', function (http) {
    this.getAppList = function () {
        return http.get(env_config.API.APP.GET_APP_LIST).then(function (result) {
            return result.data;
        });
    }

    this.addGroup = function (params) {
        return http.post(env_config.API.userCenter.manager.ADD_OR_UPDATE_GROUP, params).then(function (result) {
            return result.data;
        });
    }
}]);
