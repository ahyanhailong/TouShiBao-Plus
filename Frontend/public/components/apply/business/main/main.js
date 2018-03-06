MyApp.controller('businessMain', [
    '$scope', '$rootScope', 'dateTimeService', 'mainService', '$location', '$state',
    function ($scope, $rootScope, dateTimeService, mainService, $location, $state) {


        var appId = $location.search().app_id;
        if (appId && env_config.APP_ID != appId) {
            env_config.APP_ID = appId;
        }

        // 绘制响应时间和请求数图表
        $scope.respTimeMark = 'all';
        // 弹窗
        $scope.modalShow = false;
        $scope.modalTitle = '';
        $scope.modalIndex, $scope.modalType;

        $scope.drawRespTimeChart = function (type) {
            $scope.respTimeMark = type || 'all';
            mainService.drawRespTimeChart(type, function (index, type) {
                $scope.modalIndex = index;
                $scope.modalType = type;
                $scope.modalTitle = mainService.config[type];
                $scope.modalShow = true;

                $scope.$apply();
            });
        };
        $scope.drawRespTimeChart()

        // 请求数按响应时间分布
        mainService.drawRequestDist();

        // 事务列表
        $scope.total_row = 0;//总页数
        $scope.sum_per_page = 5; //每页显示多少行
        $scope.page_no = 1; // 当前页数
        $scope.searchUri = '';

        $scope.refreshList = function () {
            mainService.getTransactionList({
                currentPage: $scope.page_no,
                perPage: $scope.sum_per_page,
                searchUri: $scope.searchUri,
                success: function (data) {
                    $scope.total_row = data.total_items;
                    $scope.$apply();
                }
            });
        };

        $scope.changePage = function (currentPage, perPage) {
            $scope.page_no = currentPage;
            $scope.sum_per_page = perPage;
            $scope.refreshList();
        };

    }]);

MyApp.directive('transactionSearch', function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
        },
        link: function (scope, elem, attrs) {
            var input = elem.find('input');

            elem.on('keydown', 'input', function (e) {
                if (e.keyCode == 13) {
                    scope.searchUri = input.val();
                    scope.refreshList();
                }
            });
            elem.on('click', '.icon-search', function (e) {
                scope.searchUri = input.val();
                scope.refreshList();
            });

        }
    };
});

MyApp.directive('responseModal', ['dateTimeService', '$state', function (dateTimeService, $state) {
    return {
        restrict: 'AE',
        scope: {
            isShow: '=show',
            title: '=title',
            index: '=index',
            type: '=type'
        },
        templateUrl: './public/components/apply/business/main/responseModal.html',
        controller: function ($scope) {

            $scope.total_row = 0;//总页数
            $scope.sum_per_page = 5; //每页显示多少行
            $scope.page_no = 1; // 当前页数
            $scope.data = {};


            $scope.$watchGroup(['index', 'type'], function () {
                drawTable();
            });

            function drawTable() {
                if (typeof $scope.index == 'undefined' || !$scope.type) {
                    return;
                }
                var appId = $state.params.app_id;
                var time = dateTimeService.getTime();
                //  响应时间和请求数-弹窗
                var resptime_modal = this.resptime_modal = env_config.API.BusinessAnalysis.GET_OVERVIEW_TRANSACTION_POP_LIST;

                $('#js_resp_modal').table(function () {
                    var data = {
                        app_id: appId,
                        start_time: time.start,
                        end_time: time.end,
                        page: $scope.page_no,
                        page_size: $scope.sum_per_page,
                        index: $scope.index,
                        type: $scope.type
                    };

                    return {
                        data: function (sort, order) {
                            data.sort = sort;
                            data.order = order;

                            return {
                                url: resptime_modal,
                                data: data,
                                method: 'get',
                                success: function (result) {
                                    $scope.total_row = result.data.total_items;
                                    $scope.data = result.data;
                                    $scope.$apply();

                                    return result.data.list;
                                }
                            }
                        },
                        loop: function (item, tr) {
                            if (item.key == 'uri') {
                                return '<td class="text-ellipsis">' +
                                    '<a href="#/navigation/apply/business/details/dashboard/' + appId + '/'
                                    + encodeURIComponent(encodeURIComponent(item.value)) + '" class="business-details">' + item.value + '</a>' +
                                    '</td>';
                            }
                        }
                    }
                });
            }

            $scope.changePage = function (currentPage, perPage) {
                $scope.sum_per_page = perPage; //每页显示多少行
                $scope.page_no = currentPage; // 当前页数
                drawTable();
            };

        },
        link: function (scope, elem, attrs) {
            var modalElem = elem.find('#js_resp_modal');
            scope.$watch('isShow', function (newValue) {
                modalElem.modal(newValue ? 'show' : 'hide');
            });
            modalElem.on('hidden.bs.modal', function () {
                scope.isShow = false;
                scope.$apply();
            });

            modalElem.on('click', 'a', function (e) {
                e.preventDefault();

                var self = $(this);
                modalElem.modal('hide');
                modalElem.one('hidden.bs.modal', function () {
                    window.location.href = self.attr('href');
                });

            });
        }
    };
}]);