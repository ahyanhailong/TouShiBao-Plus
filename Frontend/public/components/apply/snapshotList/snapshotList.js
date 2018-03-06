MyApp.controller('applySnapshot', [
    '$scope', '$location', 'applySnapshotService', '$state',
    function ($scope, $location, service, $state) {

        $scope.searchParams = $location.search();

        // 顶部事务列表
        $scope.currentBusiness = $scope.searchParams;
        $scope.businessList = [$scope.searchParams];

        $scope.changeCurrent = function (i) {
            $scope.currentBusiness = $scope.businessList[i];
            $location.path('/apply_snapshot/' + $state.params.app_id + '/overview').search($scope.businessList[0]);
        };
        // 操作(添加)事务
        $scope.handleBusinessList = function (item) {
            $scope.businessList[1] = item;
            $scope.changeCurrent(1);
        };
        // 删除事务
        $scope.removeBusiness = function (i) {
            $scope.changeCurrent(0);
            console.log('removeBusiness')
            $scope.businessList.splice(i, 1);
        };


        // 路由跳转
        var searchStr = '?' + $location.url().split('?')[1];
        $scope.jump = function (e) {
            e.preventDefault();
            window.location.href = $(e.target).attr('href') + searchStr;
        };

        //详情
        $scope.details = {};

        $scope.$watch('currentBusiness', function (newValue) {
            service.getDetailsData($scope.currentBusiness).then(function (data) {
                $scope.details = data;
            });

            //topo
            service.getTopoData($scope.currentBusiness).then(function (data) {
                $scope.topoData = data;
            });
        });

        $scope.config = {
            normal: {name: '正常', clazz: 'icon-circle-green'},
            error: {name: '错误', clazz: 'icon-circle-red'},
            slow: {name: '缓慢', clazz: 'icon-circle-yellow'},
            very_slow: {name: '非常慢', clazz: 'icon-circle-orange'}
        };

    }]);

MyApp.service('applySnapshotService', [
    'httpService',
    function (httpService) {

        var topoApi = env_config.API.ApplySnapshot.GET_SINGLE_TOPO_DATA;
        var detailsApi = env_config.API.ApplySnapshot.GET_SINGLE_DETAIL_DATA;
        var callApi = env_config.API.ApplySnapshot.GET_SINGLE_CALLED_API_SNAP_TOPO;

        // 获取topo图数据
        this.getTopoData = function (params) {
            return httpService.get(topoApi, params)
                .then(function (result) {
                    return result.data;
                })
        };

        // 获取堆栈详情
        this.getDetailsData = function (params) {
            return httpService.get(detailsApi, params)
                .then(function (result) {
                    return result.data;
                })
        };

        // 获取被调用请求列表
        this.getCallData = function (params) {
            return httpService.post(callApi, params)
                .then(function (result) {
                    return result.data;
                })
        };

    }]);
