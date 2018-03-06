MyApp.controller('consumer', [
    '$scope', '$rootScope', 'consumerService', '$state',
    function ($scope, $rootScope, service, $state) {

        $rootScope.tabStatus = 'consumer';

        $scope.$emit('startMessageQueue', 'consumer');

        $scope.totalItems = 0;//总页数
        $scope.perPage = 5; //每页显示多少行
        $scope.currentPage = 1; // 当前页数

        var isStart = false;

        function getList() {
            service.getList({
                currentPage: $scope.currentPage,
                perPage: $scope.perPage,
                instance: $scope.instance,
                dbn: $scope.dbn
            }).then(function (data) {
                $scope.list = data.list;
                $scope.totalItems = data.total_items;
            });
        }

        $scope.changePage = function (currentPage, perPage) {
            if (isStart) {
                $scope.currentPage = currentPage;
                $scope.perPage = perPage;
                getList();
            }

        };

        $scope.list = [];
        $scope.$on('refreshList', function (event, instance, dbn) {
            isStart = true;
            $scope.instance = instance;
            $scope.dbn = dbn;
            getList();
        });

    }]);


MyApp.service('consumerService', ['httpService', function (http) {
    var listApi = env_config.API.AppMessageQueue.GET_CONSUMER_INSTANCE_LIST;

    this.getList = function (opt) {
        return http.get(listApi, {
            page: opt.currentPage || 1,
            page_size: opt.perPage,
            instance: opt.instance,
            dbn: opt.dbn
        }).then(function (result) {
            return result.data;
        })
    }

}]);
