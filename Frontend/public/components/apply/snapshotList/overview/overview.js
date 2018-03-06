MyApp.controller('applySnapshotOverview', [
    '$scope', '$location', 'applySnapshotService', 'applySnapshotOverviewSevice',
    function ($scope, $location, service, overviewService) {
        var searchParams = $location.search();

        $scope.summary = [];
        $scope.$watch('details', function (newValue) {

            if (newValue && newValue.errors) {
                $.each(newValue.errors, function (k, v) {
                    var o = {type: 'error', text: ''};
                    if (v.summary == 'php_error') {
                        o.text = v.detail.file_raw + ':' + v.detail.line;
                    } else {
                        o.text = 'HTTP响应状态' + v.summary + '错误';
                    }
                    $scope.summary.push(o);
                });
            }

            if (newValue && newValue.exceptions) {
                $.each(newValue.exceptions, function (k, v) {
                    var o = {type: 'exception', text: ''};
                    if (v.summary == 'php_exception') {
                        o.text = v.detail.file_raw + ':' + v.detail.line;
                    } else {
                        o.text = v.summary;
                    }
                    $scope.summary.push(o);
                });
            }

            if (newValue && newValue.dashboard && newValue.dashboard.summary) {
                var summary = newValue.dashboard.summary;
                $.each(summary, function (k, v) {
                    if (!(v instanceof Array)) {
                        $scope.summary.push({
                            type: k,
                            text: v.name + '，' + v.time + 'ms'
                        });
                    }
                });
            }

        });


        // $scope.topoData = {
        //     "edges": [
        //         {
        //             "arrows": "to",
        //             "from": "3014380075581533",
        //             "id": "3014380075581533_curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo",
        //             "label": "lines-label",
        //             "to": "curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo"
        //         },
        //         {
        //             "arrows": "to",
        //             "from": "curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo",
        //             "id": "111",
        //             "label": "lines-label",
        //             "to": "111"
        //         },
        //         {
        //             "arrows": "to",
        //             "from": "111",
        //             "id": "222",
        //             "label": "lines-label",
        //             "to": "222"
        //         }
        //     ],
        //     "nodes": [
        //         {
        //             "group": "cloud",
        //             "id": "curl:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo",
        //             "label": "Api:www.airchina.com.cn:443/international/api/v3/getAirTickeInfo"
        //         }, {
        //             "group": "cloud",
        //             "id": "111",
        //             "label": "111"
        //         }, {
        //             "group": "cloud",
        //             "id": "222",
        //             "label": "222"
        //         },
        //         {
        //             "group": "app_slow",
        //             "id": "3014380075581533",
        //             "label": "flights.example.com:80",
        //             "role": "",
        //             "title": "JAVA"
        //         }
        //     ]
        // };
        // 潜在问题各种类型图标配置
        $scope.sumaryConfig = {
            api: 'icon-p-cloud',
            code: 'icon-p-time',
            db: 'icon-p-db',
            exception: 'icon-p-abnormal',
            error: 'icon-p-error'
        };

        // 点击拓扑图生成列表
        $scope.total_row = 0;//总页数
        $scope.sum_per_page = 5; //每页显示多少行
        $scope.page_no = 1; // 当前页数
        $scope.isShowTopoList = false;
        $scope.appFrom = '';
        $scope.appTo = '';

        function refreshList() {
            if ($scope.appFrom && $scope.appTo) {
                $scope.isShowTopoList = true;
                $scope.$apply();
                overviewService.drawList({
                    app_from: $scope.appFrom,
                    app_to: $scope.appTo,
                    request_id: searchParams.request_id,
                    page: $scope.page_no,
                    page_size: $scope.sum_per_page
                }, function (data) {
                    $scope.total_row = data.total_items;
                    $scope.$apply();
                });
            }

        }

        $scope.topoClick = function (event) {
            if (event.nodes.length > 0) {
                var edges = event.edges;
                var api_app_id = event.nodes[0];
                if (!isNaN(api_app_id)) {

                    var froms = [];
                    angular.forEach(edges, function (edge) {
                        var eds = edge.split('_');
                        if (eds[1] == api_app_id) {
                            froms.push(eds[0]);
                        }
                    });
                    if (froms.length > 0) {
                        $scope.appFrom = froms;
                        $scope.appTo = api_app_id;
                        refreshList();
                    }

                }
            }
        };

        // 分页操作
        $scope.changePage = function (currentPage, perPage) {
            $scope.sum_per_page = perPage;
            $scope.page_no = currentPage;
            refreshList();
        };

    }]);

MyApp.service('applySnapshotOverviewSevice', ['dateTimeService', function (dateTimeService) {
    var appId = env_config.APP_ID;
    var time = dateTimeService.getTime();

    var callApi = env_config.API.ApplySnapshot.GET_SINGLE_CALLED_API_SNAP_TOPO;

    this.drawList = function (opt, success) {
        $('#topo-list').table(function () {

            var data = {
                app_id: appId,
                start_time: time.start,
                end_time: time.end,
                page: 1,
                page_size: 5
            };
            $.extend(data, opt);

            return {
                data: function (sort, order) {
                    data.sort = sort;
                    data.order = order;

                    return {
                        url: callApi,
                        data: data,
                        method: 'post',
                        success: function (result) {
                            if (typeof success == 'function') {
                                success(result.data);
                            }

                            return result.data.list;
                        }
                    }
                },
                loop: function (item, dt) {
                    if (item.key == 'date') {
                        return '<td>' + new Date(item.value).toLocaleString() + '</td>';
                    } else if (item.key == 'api_sql_exist') {
                        var str = '<td>';
                        if (dt.api_exists) {
                            str += '<i class="icon-database-white" title="数据库"></i>';
                        }
                        if (dt.sql_exist) {
                            str += '<i class="icon-cloud-white" title="数据库"></i>';
                        }
                        str += '</td>';
                        return str;
                    } else if (item.key == 'call_url') {
                        return '<td class="text-ellipsis">' + item.value + '</td>';
                    } else if (item.key == 'url') {
                        if (dt.api_origin) {
                            return '<td><a href="javascript:void(0)" handle-business=\'' + JSON.stringify(dt) + '\' class="text-ellipsis display-b">' + item.value + '</a></td>';
                        } else {
                            return '<td>' + item.value + '</td>';
                        }

                    }
                }
            }
        });
    }

}]);

// 列表调用请求点击
MyApp.directive('applyHandleBusiness', [function () {
    return {
        redirect: 'A',
        link: function (scope, elem, attrs) {
            elem.on('click', '[handle-business]', function () {
                var data = JSON.parse($(this).attr('handle-business'));
                scope.handleBusinessList({
                    doc_id: data.doc_id,
                    name: data.url,
                    r_id: data.r_id,
                    request_id: data.request_id
                });
                scope.isShowTopoList = false;
                scope.$apply();
            });
        }
    }
}]);
