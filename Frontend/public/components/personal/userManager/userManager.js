MyApp.controller('userManager', [
    '$scope', '$rootScope', 'userManagerService',
    function ($scope, $rootScope, service) {
        $rootScope.sideBarKey = 'userManager';

        //部门 成员列表
        $scope.groupUserList = []
        // 成员分类
        $scope.peopleClass = [
            {
                name: '所有成员',
                value: 'all_user'
            }, {
                name: '已激活成员',
                value: 'normal_user'
            }, {
                name: '待激活成员',
                value: 'waiting_activate_user'
            }, {
                name: '未分配部门的成员',
                value: 'ungrouped_user'
            }, {
                name: '停用的成员',
                value: 'paused_user'
            }
        ];
        $scope.currentClass = 'all_user';
        $scope.currentClassName = '所有成员';
        // 切换成员分类
        $scope.changeClass = function (item) {
            $scope.currentClass = item.value;
            $scope.currentClassName = item.name;
            $scope.currentGroupId = null;
            $scope.refreshUserList();
        };

        // 部门统计信息
        $scope.groupInfo = {
            all_user: 0,
            normal_user: 0,
            grouped_list: [],
            paused_user: 0,
            ungrouped_user: 0,
            waiting_activate_user: 0
        };
        service.getGroup().then(function (data) {
            $scope.groupInfo = data;
        });

        //删除部门
        $scope.deleteGroup = function (event,info) {
            service.removeGroup({group_id:info}).then(function (respon) {
                if(respon.code == '1000'){
                    $(event.target).parents('li').remove()
                }

            })
        }
        //修改部门
        $scope.modifyGroup = function (event,info) {
            event.stopPropagation();
            service.getGroupItem({group_id:info}).then(function (respon) {
                if(respon.code == '1000'){
                    $scope.groupUserList = respon.data
                }
            })
            $('#Department').addClass('open')
        }

        $scope.currentGroupId = null;
        $scope.currentGroup = function (id) {
            $scope.currentGroupId = id;
            $scope.currentClass = 'all_user';
            $scope.currentClassName = '所有成员';
            $scope.refreshUserList();
        };

        $scope.$on('addGroup', function (e, group) {
            $scope.groupInfo.grouped_list.push(group);
        });

        //成员列表
        $scope.userList = {};
        $scope.currentClass, $scope.searchEmail, $scope.groupId;
        $scope.total_row = 0;//总页数
        $scope.sum_per_page = 5; //每页显示多少行
        $scope.page_no = 1; // 当前页数

        $scope.refreshUserList = function () {
            service.getUser({
                page: $scope.page_no,
                page_size: $scope.sum_per_page,
                type: $scope.currentClass,
                search_email: $scope.searchEmail,
                group_id: $scope.currentGroupId
            }).then(function (data) {
                $scope.userList = data;
                $scope.total_row = data.total_items;
            });
        }
        $scope.changePage = function (currentPage, perPage) {
            $scope.sum_per_page = perPage; //每页显示多少行
            $scope.page_no = currentPage; // 当前页数
            $scope.refreshUserList();

        };


    }]);

MyApp.service('userManagerService', [
    'httpService',
    function (http) {
        var getGroupApi = env_config.API.userCenter.manager.GET_GROUP_LIST;
        var getUserApi = env_config.API.userCenter.manager.GET_USER_LIST;
        var addGroupApi = env_config.API.userCenter.manager.ADD_OR_UPDATE_GROUP;
        var removeGroupApi = env_config.API.userCenter.manager.REMOVE_GROUP
        var getGroupItemApi = env_config.API.userCenter.manager.GET_GROUP_ITEM


        this.getGroup = function () {
            return http.get(getGroupApi).then(function (result) {
                return result.data;
            });
        };

        this.getUser = function (params) {
            return http.get(getUserApi, params).then(function (result) {
                return result.data;
            });
        };

        this.addGroup = function (params) {
            return http.post(addGroupApi, params).then(function (result) {
                return result.data;
            });
        }

        this.removeGroup = function (params) {
            return http.get(removeGroupApi, params).then(function (result) {
                return result;
            });
        }

        //获取部门信息
        this.getGroupItem = function (params) {
            return http.get(getGroupItemApi, params).then(function (result) {
                return result;
            });
        }
    }]);

/**
 * 权限下拉
 */
MyApp.directive('userPermissions', [function () {
    return {
        restrict: 'AE',
        template: '<div class="btn-group tsb-btn-group padding-r-10  tableList-dropdown" role="group">' +
        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">{{currentRoleName}}<span class="caret"></span></button>' +
        '<ul class="dropdown-menu" tsb-noclick="true">' +
        '<li><div>' +
        '<div class="radio-check" ng-repeat="_item in userPermissionsList" ng-click="changeRole(_item.value)">' +
        '<input type="radio" ng-checked="_item.value==currentRole">' +
        '<label>{{_item.name}}</label>' +
        '</div>' +
        '</div></li>' +
        '<li>' +
        '<button type="button" class="btn btn-gray border-radius4" data-toggle="dropdown" ng-click="cancelRole()">取消</button>' +
        '<button type="button" class="btn btn-blue border-radius4" data-toggle="dropdown" ng-click="okRole()">确认</button>' +
        '</li>' +
        '</ul>' +
        '</div>',
        controller: function ($scope) {
            $scope.userPermissionsList = [{
                name: '管理员',
                value: 1
            }, {
                name: '高级用户',
                value: 2
            }, {
                name: '普通用户',
                value: 3
            }];

            function getName() {
                var name = '';
                for (var i = 0; i < $scope.userPermissionsList.length; i++) {
                    if ($scope.userPermissionsList[i].value == $scope.currentRole) {
                        name = $scope.userPermissionsList[i].name;
                        break;
                    }
                }
                return name;
            };

            $scope.currentRole = $scope.item.role_right;
            $scope.currentRoleName = getName();
            $scope.changeRole = function (v) {
                $scope.currentRole = v;
                $scope.currentRoleName = getName();
            };
            $scope.cancelRole = function () {
                $scope.currentRole = $scope.item.role_right;
                $scope.currentRoleName = getName();
            };
            $scope.okRole = function () {
                $scope.item.role_right = $scope.currentRole;
            };
        },
        link: function ($scope, $elem, $attr) {
        }
    }
}]);
/**
 * 状态设置下拉
 */
MyApp.directive('userStatus', [function () {
    return {
        restrict: 'AE',
        template: '<div class="btn-group tsb-btn-group padding-r-10  tableList-dropdown" role="group">' +
        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">{{currentStatusName}}<span class="caret"></span></button>' +
        '<ul class="dropdown-menu" tsb-noclick="true" ng-show="userStatusList.length>0">' +
        '<li><div>' +
        '<div class="radio-check" ng-repeat="_item in userStatusList" ng-click="changeStatus(_item.value)">' +
        '<input type="radio" ng-checked="_item.value==currentStatus">' +
        '<label>{{_item.name}}</label>' +
        '</div>' +
        '</div></li>' +
        '<li>' +
        '<button type="button" class="btn btn-gray border-radius4" data-toggle="dropdown" ng-click="cancelStatus()">取消</button>' +
        '<button type="button" class="btn btn-blue border-radius4" data-toggle="dropdown" ng-click="okStatus()">确认</button>' +
        '</li>' +
        '</ul>' +
        '</div>',
        controller: function ($scope) {
            /*user_status：
             1; //正常使用
             2; //等待激活
             3; //已暂停
             4; //已删除
             激活的用户只有启动，暂停。如果没有激活，只能进行删除操作
             */
            $scope.userStatusList = [{
                name: '启用',
                value: 1
            }, {
                name: '未激活',
                value: 2
            }, {
                name: '停用',
                value: 3
            }, {
                name: '删除',
                value: 4
            }];
            function getName() {
                var name = '';
                for (var i = 0; i < $scope.userStatusList.length; i++) {
                    if ($scope.userStatusList[i].value == $scope.currentStatus) {
                        name = $scope.userStatusList[i].name;
                        break;
                    }
                }
                return name;
            };

            var userStatus = $scope.currentStatus = $scope.item.user_status;

            $scope.currentStatusName = getName();

            if (userStatus == 1) { // 已激活
                $scope.userStatusList.splice(1, 1);
            } else if (userStatus == 2) { // 等待激活
                $scope.userStatusList.splice(0, 2);
            } else {
                $scope.userStatusList = [];
            }

            $scope.changeStatus = function (v) {
                $scope.currentStatus = v;
                $scope.currentStatusName = getName();
            };
            $scope.cancelStatus = function () {
                $scope.currentStatus = $scope.item.user_status;
                $scope.currentStatusName = getName();
            };
            $scope.okStatus = function () {
                $scope.item.user_status = $scope.currentStatus;
            };
        },
        link: function ($scope, $elem, $attr) {
        }
    }
}]);

/**
 * 拖拽
 */
MyApp.directive('draggable', [function () {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope) {

        },
        link: function ($scope, $elem, $attr) {
            $elem.draggable({
                cancel: "a.ui-icon",
                revert: "invalid",
                containment: "document",
                helper: "clone",
                cursor: "move"
            });
        }
    }
}]);
MyApp.directive('droppable', [function () {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope) {

        },
        link: function ($scope, $elem, $attr) {
            $elem.find('li').droppable({
                activeClass: "ui-state-highlight",
            });
        }
    }
}]);
/**
 * 搜索
 */
MyApp.directive('userManagerSearchEmail', [function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
        },
        link: function ($scope, $elem, $attr) {
            var input = $elem.find('input');

            $elem.on('keydown', 'input', function (e) {
                if (e.keyCode == 13) {
                    $scope.searchEmail = input.val();
                    $scope.refreshUserList();
                    $scope.$apply();
                }
            });
            $elem.on('click', '.icon-search', function (e) {
                $scope.searchEmail = input.val();
                $scope.refreshUserList();
                $scope.$apply();
            });

        }
    }
}]);