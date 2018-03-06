MyApp.controller('applySnapshotTrack', [
    '$scope',
    function ($scope) {

        $scope.option = {dataType: ''};
        $scope.depth = 6;
        $scope.codeData = {};

        $scope.$watch('details', function (newValue) {
            if (newValue.code_tree) {
                $scope.option = {dataType: newValue.dashboard.app_type};
                $scope.codeData = newValue.code_tree;
            }
        });
    }]);
