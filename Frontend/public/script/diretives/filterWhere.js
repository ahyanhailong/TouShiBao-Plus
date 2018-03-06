/**
 *  Author: harry.lang
 *  Date: 2017/11/29
 *  Description: Created by harrylang on 2017/11/29.
 */
MyApp.directive("filterWhere", function (filterWhereService) {
    return {
        restrict: 'AE',
        scope: {
            whereList: '=whereList',
            change: '&change',
            wheres: '=wheres',
            apis: '=apis',
        },
        templateUrl: "./public/components/allgroup/filter_where.html",
        controller: function ($scope) {
            //console.log('filterWhere:', $scope.whereList);
            // 初始化历史记录
            $scope.recordId = ''; // 记录当前选择的历史条件
            $scope.history = {};
            filterWhereService.getHistory($scope.apis.getHistory).then(function (data) {
                $scope.history = data;
            });
            // 初始化各类型搜索列表
            $scope.filterList = [];

            // 过滤条件配置
            var filterConfig = $scope.filterConfig = {
                resptime: {
                    name: '响应时间',
                    directive: 'filter-response-time'
                },
                db_name: {
                    name: '数据库类型',
                    directive: 'filter-list-checkbox',
                    placeholder: '请输入数据库类型',
                    search: true
                },
                instance_raw: {
                    name: '实例',
                    directive: 'filter-list-checkbox',
                    placeholder: '请输入实例名称',
                    search: true
                },
                db_table: {
                    name: '数据表',
                    directive: 'filter-list-checkbox',
                    placeholder: '请输入数据库表名',
                    search: true
                },
                db_oper_type: {
                    name: '操作指令',
                    directive: 'filter-list-checkbox',
                    placeholder: '请输入操作指令',
                    search: true
                },
                reqUri_raw: {
                    name: '调用者',
                    directive: 'filter-list-checkbox',
                    placeholder: '请输入调用者名称',
                    search: true
                },
                domain: {
                    name: '域名',
                    directive: 'filter-list-radio',
                    placeholder: '请输入域名',
                    search: true
                }
            };

            // 组件类型默认值
            var defaultValues = $scope.defaultValues = {
                'filter-response-time': ['', ''],
                'filter-list-radio': '',
                'filter-list-checkbox': []
            };

            // 复制对象
            var copy = this.copy = function (obj) {
                return typeof obj == 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
            };

            /*
             过滤条件操作
             */
            // 记录当前条件是否是刚刚添加进来的
            var isFirst = $scope.isFirst = {};
            initFirst();
            function initFirst() {
                for (var type in $scope.wheres) {
                    isFirst[type] = true;
                }
            }

            // 处理wheres：删除未保存过的条件
            var clearWhere = $scope.clearWhere = function () {
                for (var type in $scope.wheres) {
                    if (!isFirst[type]) {
                        delete $scope.wheres[type];
                    }
                }
            };
            // 添加
            $scope.clickWhere = function (type) {
                clearWhere();
                // 不存在
                if (!$scope.wheres[type]) {
                    $scope.wheres[type] = defaultValues[filterConfig[type].directive];
                    if (filterConfig[type].search) {
                        filterWhereService.getSerchList($scope.apis.search, type, '').then(function (result) {
                            $scope.filterList[type] = result.data;
                        });
                    }
                }
                $scope.$broadcast('isOpen', type);

            };
            // 重置
            $scope.resetWhere = function () {
                $scope.wheres = {};
                $scope.change({type: 'reset'});
                $scope.recordId = '';
            };
            /**
             * 根据类型删除过滤条件
             * @param type
             * @param isCancel  是否点击取消按钮
             */
            this.delWhereByType = function (type, isCancel) {
                if (isCancel) {
                    if (!isFirst[type]) {
                        delete $scope.wheres[type];
                    }
                } else {
                    delete $scope.wheres[type];
                    delete isFirst[type];
                    $scope.change({type: type});
                }

            };

            // 根据类型获取各个类型的过滤列表
            $scope.getList = function (type) {
                return $scope.filterList[type];
            };

            // 根据类型获取各个类型的默认值
            this.getDefaultValue = function (type) {
                return copy(defaultValues[filterConfig[type].directive]);
            };

            /*
             * 历史记录操作
             */
            // 初始化历史记录
            $scope.clickHistory = function (id) {
                $scope.recordId = id;
                $scope.wheres = copy($scope.history[id].params_info);
                initFirst();
                // 过滤列表

                angular.forEach($scope.wheres, function (value, type) {
                    if (filterConfig[type].search) {
                        filterWhereService.getSerchList($scope.apis.search, type, '').then(function (result) {
                            $scope.filterList[type] = result.data;
                        });
                    }
                });

//              $scope.change({type: 'history'});
                console.log($scope.wheres)
            };
            // 删除历史记录
            $scope.deleteHistory = function (id, e) {
                e.stopPropagation();
                delete $scope.history[id];
                $scope.recordId = '';

                filterWhereService.deleteHistory($scope.apis.deleteHistory, id);
            };
            // 保存条件为历史
            $scope.saveHistory = function () {
                filterWhereService.saveWhere($scope.apis.saveWhere, $scope.wheres, $scope.recordId).then(function (result) {
                    if (result.code == 1000) {
                        if ($scope.recordId) {
                            $scope.history[result.data] = {id: result.data, order: $scope.history[result.data].order, params_info: copy($scope.wheres)};
                        } else {
                            var order
                            $.each($scope.history, function (i, val) {
                                order = parseInt(val.order)
                            });
                            if (order == 3) {
                                $scope.history[result.data] = {id: result.data, order: order, params_info: copy($scope.wheres)};
                            } else {
                                $scope.history[result.data] = {id: result.data, order: order + 1, params_info: copy($scope.wheres)};
                            }
                        }

                        $scope.recordId = result.data;
                    }

                });
            };

            /*
             * 按钮操作
             */
            // 确定操作
            this.ok = function (type, value) {
                $scope.wheres[type] = value;
                isFirst[type] = true;
                $scope.change({type: type, value: value});
            };
        },
        link: function (scope, elem, attrs, filterWhereCtrl) {
            // 处理wheres：删除未保存过的条件
            elem.on('click', '#dLabel', function () {
                scope.clearWhere();
                scope.$apply();
            });
        }
    };
})
    .directive("filterWhereProxy", function ($compile) {
        return {
            restrict: 'AE',
            require: '^filterWhere',
            controller: function ($scope) {
                // 默认存在的不显示下拉
                $scope.isOpen = $scope.$parent.isFirst[$scope.type] ? false : true;
                $scope.handleOpen = function () {
                    // 点击当前隐藏其他下拉
                    if (!$scope.isOpen) {
                        $scope.$parent.clickWhere($scope.type);
                    } else {
                        $scope.isOpen = false;
                    }

                };
            },
            link: function (scope, elem, attrs, filterWhereCtrl) {
                //console.log('filterWhereProxy', scope);

                scope.$on('isOpen', function (event, current) {
                    scope.isOpen = current == scope.type;
                    // 恢复
                    scope._value = filterWhereCtrl.copy(scope.value);
                });

                // 隔离输入框内数据值和显示数据值
                scope._value = filterWhereCtrl.copy(scope.value);

                var component = $compile('<' + scope.$parent.filterConfig[scope.type].directive + '/>')(scope);
                elem.html(component);

                scope.delWhere = function () {
                    filterWhereCtrl.delWhereByType(scope.type);
                }

            }
        };
    })
    .directive("filterHandleBtn", function () {
        return {
            restrict: 'AE',
            replace: true,
            require: '^filterWhere',
            template: '<div class="clearfix">' +
            '<button class="btn btn-default cancel" style="margin-left: 28px;">取消</button>' +
            '<button class="btn btn-default reset" style="margin-left: 10px;">重置</button>' +
            '<button class="btn btn-primary ok" style="margin-left: 10px;">确定</button>' +
            '</div>',
            link: function (scope, elem, attrs, filterWhereCtrl) {
                //console.log('filterHandleBtn', scope);

                elem.on('click', '.ok', function () {
                    // 验证（各个组件验证不同，分别在各组件中处理）
                    if (scope.validate && scope.validate()) {
                        scope.value = filterWhereCtrl.copy(scope._value);
                        scope.isOpen = false;
                        filterWhereCtrl.ok(scope.type, scope.value);
                        scope.$apply();
                    }
                }).on('click', '.cancel', function () {
                    // 恢复
                    scope._value = filterWhereCtrl.copy(scope.value);
                    // 关闭下拉
                    scope.isOpen = false;
                    // 当第一次使用并且未保存过滤，则直接删除当前
                    filterWhereCtrl.delWhereByType(scope.type, true);
                    scope.$apply();
                }).on('click', '.reset', function () {
                    // 重置
                    scope._value = filterWhereCtrl.getDefaultValue(scope.type);
                    scope.$apply();
                });

            }
        };
    })
    .directive("filterResponseTime", function () {
        return {
            restrict: 'AE',
            replace: true,
            controller: function ($scope) {
                // 验证操作
                $scope.validate = function () {
                    if ($scope._value[0] && $scope._value[1]) {
                        return true;
                    }
                    return false;
                }
            },
            templateUrl: "./public/components/allgroup/filter/response-time.html",
            link: function (scope, elem, attrs) {
                //console.log('filterResponseTime', scope);

            }
        };
    })
    .directive("filterListRadio", function () {
        return {
            restrict: 'AE',
            replace: true,
            controller: function ($scope) {
                // 验证操作
                $scope.validate = function () {
                    if ($scope._value) {
                        return true;
                    }
                    return false;
                }

                $scope.checkItem = function (k) {
                    $scope._value = k.value;
                };

            },
            templateUrl: "./public/components/allgroup/filter/filter-list-radio.html",
            link: function (scope, elem, attrs) {
                //console.log('filterListRadio', scope);
            }
        };
    })
    .directive("filterListCheckbox", function () {
        return {
            restrict: 'AE',
            replace: true,
            controller: function ($scope) {
                // 验证操作
                $scope.validate = function () {
                    if ($scope._value.length > 0) {
                        return true;
                    }
                    return false;
                };

                $scope.checkItem = function (k) {
                    var i = $scope._value.indexOf(k.value);
                    if (i > -1) {
                        $scope._value.splice(i, 1);
                    } else {
                        $scope._value.push(k.value);
                    }
                };

                $scope.isChecked = function (k) {
                    return $scope._value.indexOf(k.value) > -1;
                };
            },
            templateUrl: "./public/components/allgroup/filter/filter-list-checkbox.html",
            link: function (scope, elem, attrs) {
                //console.log('filterListCheckbox', scope);

            }
        };
    })
    .directive("filterListSearch", function (filterWhereService, $timeout) {
        return {
            restrict: 'AE',
            replace: true,
            controller: function ($scope) {
                $scope.search = '';
            },
            template: '<div class="input-group">' +
            '<input type="text" class="form-control" ng-model="search" placeholder="{{filterConfig[type].placeholder}}">' +
            '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>' +
            '</div>',
            link: function (scope, elem, attrs) {
                var timer = null;
                elem.on('keydown', 'input', function () {
                    $timeout.cancel(timer);
                    timer = $timeout(function () {
                        //console.log('filterListSearch', scope.search);
                        filterWhereService.getSerchList(scope.apis.search, scope.type, scope.search).then(function (result) {
                            scope.$parent.filterList[scope.type] = result.data;
                            scope.$apply();
                        });
                    }, 400);
                });
            }
        };
    })
    .service('filterWhereService', ['httpService', 'dateTimeService', '$state', function (http, dateTimeService, $state) {
        var self = this;

        // 初始化默认值
        this.history = {};

        // 获取历史记录
        this.getHistory = function (api) {
            return http.get(api, {}).then(function (result) {
                return result.data;
            });
        };

        //删除历史记录
        this.deleteHistory = function (api, id) {
            return http.get(api, {
                record_id: id
            }).then(function (result) {
                if (result.code == 1000) {
                    alert('删除成功!')
                } else {
                    alert('删除失败!')
                }
                return result;
            }, function () {
                alert('接口请求失败!')
            });
        };

        //保存组合条件到历史
        this.saveWhere = function (api, params, recordId) {
            // 获取已保存条件
            return http.post(api, {
                params: params,
                record_id: recordId || ''
            }).then(function (result) {
                if (result.code == 1000) {
                    alert('保存成功!')
                } else {
                    alert('保存失败!')
                }
                return result;
            }, function () {
                alert('接口请求失败!')
            });
        }

        // 获取单个类型下拉列表数据
        this.getSerchList = function (api, field, search) {
            return http.get(api, {
                field: field,
                search: search || ''
            });
        }

    }]);
