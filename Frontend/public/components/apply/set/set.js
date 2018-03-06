MyApp.controller('set', [
    '$scope', '$rootScope', 'setService', '$timeout',
    function ($scope, $rootScope, service, $timeout) {
        $rootScope.sideBarKey = 'set';

        function isRangeNumber(obj, name) {
            if ($.trim(obj) === '') {
                alert((name || '值') + '不能为空！');
                return false;
            }
            if (isNaN(obj)) {
                alert('您填入的' + (name || '值') + '必须是数字！');
                return false;
            }

            obj = +obj;
            if (obj % 1 !== 0 || obj < 0 || obj > 100) {
                alert('您填入的' + (name || '值') + '必须是0-100的整数！');
                return false;
            }
            return true;
        }

        // 应用名称
        $scope.isUpdateName = false;
        $scope.updateName = function (e) {
            e.preventDefault();
            $scope.isUpdateName = !$scope.isUpdateName;
        };
        $scope.saveUpdateName = function () {
            service.updateAppName($scope.allSet.app_name);
        };

        // 事务设置 - 下拉
        $scope.msSelect = [
            {
                "name": "100ms",
                "value": 100
            },
            {
                "name": "200ms",
                "value": 200
            },
            {
                "name": "300ms",
                "value": 300
            },
            {
                "name": "400ms",
                "value": 400
            },
            {
                "name": "500ms",
                "value": 500
            },
            {
                "name": "600ms",
                "value": 600
            },
            {
                "name": "700ms",
                "value": 700
            },
            {
                "name": "800ms",
                "value": 800
            },
            {
                "name": "900ms",
                "value": 900
            },
            {
                "name": "1000ms",
                "value": 1000
            },
            {
                "name": "1500ms",
                "value": 1500
            },
            {
                "name": "2000ms",
                "value": 2000
            },
            {
                "name": "2500ms",
                "value": 2500
            },
            {
                "name": "3000ms",
                "value": 3000
            },
            {
                "name": "3500ms",
                "value": 3500
            },
            {
                "name": "4000ms",
                "value": 4000
            },
            {
                "name": "4500ms",
                "value": 4500
            },
            {
                "name": "5000ms",
                "value": 5000
            },
            {
                "name": "6000ms",
                "value": 6000
            },
            {
                "name": "7000ms",
                "value": 7000
            },
            {
                "name": "8000ms",
                "value": 8000
            },
            {
                "name": "9000ms",
                "value": 9000
            },
            {
                "name": "10000ms",
                "value": 10000
            },
            {
                "name": "11000ms",
                "value": 11000
            },
            {
                "name": "12000ms",
                "value": 12000
            },
            {
                "name": "13000ms",
                "value": 13000
            },
            {
                "name": "14000ms",
                "value": 14000
            },
            {
                "name": "15000ms",
                "value": 15000
            },
            {
                "name": "18000ms",
                "value": 18000
            },
            {
                "name": "21000ms",
                "value": 21000
            },
            {
                "name": "24000ms",
                "value": 24000
            },
            {
                "name": "27000ms",
                "value": 27000
            },
            {
                "name": "30000ms",
                "value": 30000
            },
            {
                "name": "30000ms以上",
                "value": 30001
            }
        ];
        $scope.basicChange = function (item, field) {
            $scope.allSet.basic_setting[field] = item.value;
        };
        $scope.basicSave = function () {
            var slow = $scope.allSet.basic_setting.slow;
            var very_slow = $scope.allSet.basic_setting.very_slow;
            if (+slow >= +very_slow) {
                alert('缓慢的时长应该小于非常缓慢的时长！');
            } else {
                service.updateAppSetting('transaction', {slow: +slow, very_slow: +very_slow});
            }
        };

        // 拓扑图设置
        $scope.topoSave = function () {
            var slow = $scope.allSet.topo_setting.slow || '';
            var very_slow = $scope.allSet.topo_setting.very_slow || '';
            var error = $scope.allSet.topo_setting.error || '';

            if (isRangeNumber(slow, '"缓慢"') && isRangeNumber(very_slow, '"非常缓慢"') && isRangeNumber(error, '"错误"')) {
                if (+slow >= +very_slow) {
                    alert('缓慢的时长应该小于非常缓慢的时长！');
                } else {
                    service.updateAppSetting('topology', {slow: +slow, very_slow: +very_slow, error: +error});
                }
            }

        };

        // 主机设置
        $scope.hostSelect = {
            cpu_rate: 'CPU使用率',
            cpu_burden: 'CPU负载'
        };
        $scope.hostChange = function (type) {
            $scope.allSet.host_setting.type = type;
        };
        $scope.hostSave = function () {
            var warning = $scope.allSet.host_setting.warning;
            var fatal_warning = $scope.allSet.host_setting.fatal_warning;
            var type = $scope.allSet.host_setting.type;
            if (isRangeNumber(warning, '"警告"') && isRangeNumber(fatal_warning, '"严重警告"')) {
                if (+warning >= +fatal_warning) {
                    alert('警告应该小于严重警告百分比！');
                } else {
                    service.updateAppSetting('host', {type: type, warning: +warning, fatal_warning: +fatal_warning});
                }
            }

        };

        // SQL设置
        $scope.sqlChange = function (item, field) {
            $scope.allSet.sql_setting[field] = item.value;
        };
        $scope.sqlSave = function () {
            var slow = $scope.allSet.sql_setting.slow;
            var very_slow = $scope.allSet.sql_setting.very_slow;
            if (+slow >= +very_slow) {
                alert('缓慢的时长应该小于非常缓慢的时长！');
            } else {
                service.updateAppSetting('sql', {slow: +slow, very_slow: +very_slow});
            }
        };

        // 数据库表设置
        $scope.dbSave = function () {
            var slow = $scope.allSet.db_setting.slow;
            var very_slow = $scope.allSet.db_setting.very_slow;
            if (isRangeNumber(slow, '"缓慢"') && isRangeNumber(very_slow, '"非常缓慢"')) {
                if (+slow >= +very_slow) {
                    alert('缓慢占比应该小于非常缓慢百分比！');
                } else {
                    service.updateAppSetting('db', {slow: +slow, very_slow: +very_slow});
                }
            }
        };

        // 获取应用设置
        $scope.allSet = {};
        service.getAppSetting().then(function (data) {
            $scope.allSet = data;
        });

        //异常白名单
        $scope.exceptionTable = {
            head: [{
                name: '序号',
                field: 'order',
                width: '10%'
            }, {
                name: '异常信息',
                field: 'value',
                width: '60%'
            }, {
                name: '创建时间',
                field: 'created_time',
                width: '15%'
            }, {
                name: '操作',
                width: '15%',
                clazz: 'text-center'
            }],
            url: service.getWhiteListApi,
            params: {
                type: 'exception'
            },
            key: 'exception',
            handle: function (type, id) {
                if (type == 'edit') {
                    service.getWhiteItem('exception', id).then(function (data) {
                        $scope.currentException = {
                            id: data.id,
                            description: data.value
                        };
                        $scope.searchException();
                        angular.element('#js_exception_box').addClass('open');
                    });
                }
                if (type == 'delete') {
                    service.deleteWhite(id).then(function () {
                        $scope.$broadcast('appRefreshTable', 'exception');
                    });
                }

            }
        };
        function initException() {
            $scope.currentException = {
                description: ''
            };
            $scope.searchExceptionList = [];
        }

        initException();

        // 添加/更新异常
        $scope.saveException = function () {
            service.addUpdateExcep($scope.currentException).then(function () {
                $scope.$broadcast('appRefreshTable', 'exception');
            });
        };
        $scope.cancelException = function () {
        };
        // 搜索
        $scope.searchException = function () {
            service.getExcepMsg($scope.currentException.description).then(function (data) {
                $scope.searchExceptionList = data;
            });
        };
        $('#js_exception_box').on('hidden.bs.dropdown', function () {
            initException();
            $scope.$apply();
        });

        // HTTP错误状态码白名单设置

        $scope.errorTable = {
            head: [{
                name: '序号',
                field: 'order',
                width: '10%'
            }, {
                name: 'http状态码',
                field: 'value',
                width: '15%'
            }, {
                name: '影响请求',
                field: 'uri',
                width: '45%'
            }, {
                name: '创建时间',
                field: 'created_time',
                width: '15%',
            }, {
                name: '操作',
                width: '15%',
                clazz: 'text-center'
            }],
            url: service.getWhiteListApi,
            params: {
                type: 'error'
            },
            key: 'error',
            handle: function (type, id) {
                if (type == 'edit') {
                    service.getWhiteItem('error', id).then(function (data) {
                        $scope.currentError = {
                            id: data.id,
                            uri: data.uri,
                            error_code: data.value
                        };
                        angular.element('#js_error_box').find('[data-toggle="dropdown"]').trigger('click');
                    });
                }
                if (type == 'delete') {
                    service.deleteWhite(id).then(function () {
                        $scope.$broadcast('appRefreshTable', 'error');
                    });
                }

            },
            loop: function (item) {
                if (item.key == 'uri') {
                    if (item.value.length > 5) {
                        return '<td>' + item.value.length + '个请求' + '</td>';
                    } else {
                        return '<td>' + item.value.join('<br>') + '</td>';
                    }
                }
            }
        };
        $scope.currentError = {uri: [], error_code: ''};
        $scope.checked = {left: {}, right: {}}; // 存储选中状态

        // 获取http响应请求列表
        $scope.errorUriList = [];
        // 获取请求列表
        $scope.searchUriVal = '';
        $scope.searchUri = function () {
            service.getUriList($scope.searchUriVal).then(function (data) {
                var list = [];
                $.each(data.data, function (k, v) {
                    if ($scope.currentError.uri.indexOf(v) < 0) {
                        list.push(v);
                    }
                });
                $scope.errorUriList = list;
            });
        };

        // 每次打开下拉都请求uri列表
        $('#js_error_box').on('show.bs.dropdown', function () {
            $scope.searchUri();
        });
        // 每次隐藏下拉初始化
        $('#js_error_box').on('hidden.bs.dropdown', function () {
            $scope.currentError = {uri: [], error_code: ''};
            $scope.errorUriList = [];
            $scope.allCheckLeft = false;
            $scope.allCheckRight = false;
            $scope.searchUriVal = '';
            $scope.checked = {left: {}, right: {}}; // 存储选中状态
            $scope.$apply();
        });
        // 选中
        var timer;
        $scope.checkUri = function (uri, key) {
            // 注：解决点击重复触发，重复触发原因未找到
            $timeout.cancel(timer);
            timer = $timeout(function () {
                var status = $scope.checked[key][uri];
                if (status) {
                    delete $scope.checked[key][uri];
                } else {
                    $scope.checked[key][uri] = true;
                }
            });

        };
        // 添加到当前
        $scope.addUrl = function () {
            $.each($scope.checked.left, function (k, v) {
                $scope.currentError.uri.push(k);
                $scope.errorUriList.splice($scope.errorUriList.indexOf(k), 1);
            });
            $scope.checked.left = {};
        };
        // 移除当前
        $scope.removeUrl = function () {
            $.each($scope.checked.right, function (k, v) {
                $scope.errorUriList.push(k);
                $scope.currentError.uri.splice($scope.currentError.uri.indexOf(k), 1);
            });
            $scope.checked.right = {};
        };
        // 全选
        $scope.allCheck = function (key, status) {
            var arr = key == 'left' ? $scope.errorUriList : $scope.currentError.uri;
            if (!status) {
                angular.forEach(arr, function (uri) {
                    $scope.checked[key][uri] = true;
                });
            } else {
                $scope.checked[key] = {};
            }
        };
        // 添加/更新http错误
        $scope.saveError = function (e) {
            var code = $scope.currentError.error_code;
            if (isNaN(code) || (+code) < 400) {
                alert('HTTP状态码必须为大于等于400的数字');
                e.stopPropagation();
                return;
            }
            if (!$scope.currentError.uri.length) {
                alert('请至少添加一个请求！');
                e.stopPropagation();
                return;
            }
            service.addUpdateError($scope.currentError).then(function () {
                $scope.$broadcast('appRefreshTable', 'error');
            });
        };

    }]);

MyApp.service('setService', [
    'httpService',
    function (http) {
        var getAppSettingApi = env_config.API.AppSetting.GET_APP_SETTING;
        var updateAppSettingApi = env_config.API.AppSetting.UPDATE_APP_SETTING;
        var updateAppNameApi = env_config.API.AppSetting.UPDATE_APP_NAME;
        this.getWhiteListApi = env_config.API.AppSetting.GET_WHITE_LIST;
        var getWhiteItemApi = env_config.API.AppSetting.GET_WHITE_ITEM;
        var addUpdateExcepApi = env_config.API.AppSetting.ADD_OR_UPDATE_EXCEPTION_WHITE;
        var deleteWhiteApi = env_config.API.AppSetting.DELETE_WHITE;
        var getExcepMsgApi = env_config.API.AppSetting.GET_EXCEPTION_MSG;
        var getUriListApi = env_config.API.AppSetting.GET_SETTING_URI_LIST;
        var addUpdateErrorApi = env_config.API.AppSetting.ADD_OR_UPDATE_ERROR_WHITE;

        // 获取应用设置
        this.getAppSetting = function () {
            return http.get(getAppSettingApi).then(function (result) {
                return result.data;
            });
        };

        //更新应用名称
        this.updateAppName = function (name) {
            return http.post(updateAppNameApi, {app_name: name}).then(function (result) {
                if (result.code == 1101) {
                    alert('应用名称未修改！');
                }
                if (result.code == 1000) {
                    alert('修改成功！');
                }
            });
        };

        // 更新应用设置
        this.updateAppSetting = function (type, params) {
            return http.post(updateAppSettingApi, {
                type: type,
                params: params
            }).then(function (result) {
                if (result.code == 1000) {
                    alert(result.msg);
                } else {
                    alert(result.msg);
                }
            });
        };

        // 添加/更新异常白名单
        this.addUpdateExcep = function (params) {
            return http.post(addUpdateExcepApi, params)
                .then(function (result) {
                    alert('保存成功');
                    return result.data;
                });
        };

        // 获取异常/错误单条数据
        this.getWhiteItem = function (type, id) {
            return http.get(getWhiteItemApi, {
                type: type,
                id: id
            }).then(function (result) {
                return result.data;
            });
        };

        // 删除白名单
        this.deleteWhite = function (id) {
            return http.get(deleteWhiteApi, {
                id: id
            }).then(function (result) {
                if (result.code == 1000) {
                    alert('删除成功！');
                }
                return result.data;
            });
        };

        // 获取异常描述列表
        this.getExcepMsg = function (search_ex) {
            return http.get(getExcepMsgApi, {
                search_ex: search_ex
            }).then(function (result) {
                return result.data;
            });
        };

        // 获取http响应请求列表
        this.getUriList = function (search_uri) {
            return http.get(getUriListApi, {
                search_uri: search_uri
            }).then(function (result) {
                return result.data;
            });
        };

        // 添加/更新错误白名单
        this.addUpdateError = function (params) {
            return http.post(addUpdateErrorApi, params)
                .then(function (result) {
                    alert('保存成功');
                    return result.data;
                });
        };

    }]);

MyApp.directive('exceptionSearch', [
    function () {
        return {
            restrict: 'AE',
            controller: function ($scope) {
            },
            link: function ($scope, $elem, $attrs) {
                $elem.on('keydown', 'input', function (e) {
                    if (e.keyCode == 13) {
                        $scope.searchException();
                    }
                }).on('click', '.icon-search', function () {
                    $scope.searchException();
                });

            }
        };
    }]);

MyApp.directive('uriSearch', [
    function () {
        return {
            restrict: 'AE',
            controller: function ($scope) {
            },
            link: function ($scope, $elem, $attrs) {
                var input = $elem.find('input');
                $elem.on('keydown', 'input', function (e) {
                    if (e.keyCode == 13) {
                        $scope.searchUri(input.val());
                    }
                }).on('click', '.icon-search', function () {
                    $scope.searchUri(input.val());
                });
            }
        };
    }]);

MyApp.directive('appTableList', [
    'appTableListService', '$compile', 'dateTimeService',
    function (service, $compile, dateTime) {
        return {
            restrict: 'AE',
            scope: {
                config: '=config'
            },
            templateUrl: './public/components/apply/set/table-list.html',
            controller: function ($scope) {
                $scope.total_row = 0;//总页数
                $scope.sum_per_page = 5; //每页显示多少行
                $scope.page_no = 1; // 当前页数
            },
            link: function ($scope, $elem, $attrs) {

                var config = $scope.config;

                var sum_per_page = 5; //每页显示多少行
                var page_no = 1; // 当前页数

                function refresh() {
                    service.drawTable($elem, {
                        url: config.url,
                        params: $.extend({
                            page: page_no,
                            page_size: sum_per_page
                        }, config.params || {}),
                        success: function (data) {
                            $scope.total_row = data.total_items;
                            $scope.$apply();
                        },
                        loop: function (item, dt) {
                            if (typeof config.loop == 'function' && config.loop.apply(this, arguments)) {
                                return config.loop.apply(this, arguments)
                            } else {
                                if (!item.key) {
                                    return $compile('<td class="text-center">' +
                                        '<a href="#" class="action-edit" ng-click="edit($event,' + dt.id + ')"></a>' +
                                        '<a href="#" class="action-trash" ng-click="delete($event,' + dt.id + ')"></a>' +
                                        '</td>')($scope);
                                }
                                if (item.key == 'created_time') {
                                    return '<td>' + dateTime.format(new Date(item.value * 1000), 'yyyy-MM-dd hh:mm:ss') + '</td>';
                                }
                            }
                        }
                    });
                }

                $scope.changePage = function (currentPage, perPage) {
                    sum_per_page = perPage; //每页显示多少行
                    page_no = currentPage; // 当前页数
                    refresh();
                };

                // 编辑
                $scope.edit = function (e, id) {
                    e.preventDefault();
                    if (typeof config.handle == 'function') {
                        config.handle('edit', id, e);
                    }
                };
                // 删除
                $scope.delete = function (e, id) {
                    e.preventDefault();
                    if (typeof config.handle == 'function') {
                        config.handle('delete', id, e);
                    }
                };

                $scope.$on('appRefreshTable', function (e, key) {
                    if (config.key == key) {
                        refresh();
                    }
                });

            }
        };
    }])
    .service('appTableListService', ['dateTimeService', '$state', function (dateTime, $state) {

        this.drawTable = function (elem, opt) {

            var appId = $state.params.app_id;
            var time = dateTime.getTime();

            $(elem).table(function () {

                var data = $.extend({
                    app_id: appId,
                    start_time: time.start,
                    end_time: time.end
                }, opt.params || {});

                return {
                    data: function (sort, order) {
                        data.sort = sort;
                        data.order = order;

                        return {
                            url: opt.url,
                            data: data,
                            method: 'get',
                            success: function (result) {
                                if (typeof opt.success == 'function') {
                                    opt.success(result.data);
                                }

                                return result.data.list;
                            }
                        }
                    },
                    loop: function (item, dt) {
                        if (typeof opt.loop == 'function') {
                            return opt.loop.apply(this, arguments)
                        }
                    }
                }
            });
        }
    }]);

