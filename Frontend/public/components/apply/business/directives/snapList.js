MyApp.directive('snapList', ['snapListService', function (service) {
    return {
        restrict: 'AE',
        scope: {
            api: '=api'
        },
        templateUrl: './public/components/apply/business/directives/snapList.html',
        controller: function ($scope) {
            $scope.total_row = 0;//总页数
            $scope.sum_per_page = 5; //每页显示多少行
            $scope.page_no = 1; // 当前页数
            $scope.searchUrl = '';

            $scope.refreshList = function (currentPage, perPage) {
                service.snapList({
                    api: $scope.api,
                    currentPage: currentPage,
                    perPage: perPage,
                    searchUrl: $scope.searchUrl,
                    success: function (data) {
                        $scope.total_row = data.total_items;
                        $scope.$apply();
                    }
                });
            };

            $scope.changePage = function (currentPage, perPage) {
                $scope.refreshList(currentPage, perPage);
            };
        },
        link: function (scope, elem, attrs) {

        }
    };
}]);

MyApp.service('snapListService', function ($state, dateTimeService) {
    var uri = decodeURIComponent($state.params.uri);
    var appId = $state.params.app_id;
    var time = dateTimeService.getTime();

    // 快照列表
    this.snapList = function (opt) {

        $('#snapList').table(function () {

            var data = {
                app_id: appId,
                start_time: time.start,
                end_time: time.end,
                page: opt.currentPage || 1,
                page_size: opt.perPage,
                search_url: opt.searchUrl,
                uri: uri
            };

            return {
                data: function (sort, order) {
                    data.sort = sort;
                    data.order = order;

                    return {
                        url: opt.api,
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
                    var statusClass = {
                        normal: 'state-icon-green',
                        slow: 'state-icon-yellow',
                        very_slow: 'state-icon-paleRed',
                        error: 'state-icon-red'
                    };

                    if (item.key == 'url') {
                        var l = '#/apply_snapshot/' + appId + '/overview?request_id=' + dt.request_id + '&r_id=' + dt.r_id + '&doc_id=' + dt.doc_id + '&name=' + item.value;
                        return '<td><a href="' + l + '" target="_blank" class="text-ellipsis display-b">' + item.value + '</a></td>'
                    }
                    if (item.key == 'exception') {
                        return '<td>' + (item.value == 1 ? '<i class="icon-abnormal"></i>' : '') + '</td>';
                    }

                    if (item.key == 'status') {
                        return '<td><i class="' + statusClass[item.value] + '"></i></td>';
                    }
                }
            }
        });
    }
});

MyApp.directive('snapListSearch', function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
        },
        link: function (scope, elem, attrs) {
            var input = elem.find('input');

            elem.on('keydown', 'input', function (e) {
                if (e.keyCode == 13) {
                    scope.searchUrl = input.val();
                    scope.refreshList();
                }
            });
            elem.on('click', '.icon-search', function (e) {
                scope.searchUrl = input.val();
                scope.refreshList();
            });

        }
    };
});