MyApp.controller('businessDetails', [
    '$scope', '$rootScope', 'dateTimeService', '$state',
    function ($scope, $rootScope, dateTimeService, $state) {
        // 处理tab页超链接
        $scope.handleHref = function (type) {
            return '#/navigation/apply/business/details/' + type + '/' + $state.params.app_id + '/' + encodeURIComponent($state.params.uri);
        }
        $scope.classActive = function (type) {
            return $state.$current.name.indexOf(type) > -1;
        }

        $scope.appId = $state.params.app_id;

    }]);
