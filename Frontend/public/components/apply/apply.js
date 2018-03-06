/**
 * Created by mark on 2017/10/20.
 */
MyApp.controller('apply', ['$scope', 'Data', '$state', function ($scope, Data, $state) {
    $scope.jqueryScrollbarOptions = {
        "onScroll": function (y, x) {
            //console.log(y,x)
        }
    };

    $scope.app_id = $state.params.app_id
    $scope.$on('appIdChange',function (event,appId) {
        $scope.app_id = appId
    })    
    $scope.$watchGroup(['app_id'],function (newVla,oldVal) {
        $scope.hrefLink = function (event, type) {
            return '#/navigation/apply/' + type + '/' + $scope.app_id
        }
    })

    $scope.reloadRoute = function () {
        $state.reload();
    }

    $scope.dashboard = Data.dashboard.name
    $scope.clickActive = function ($event) {
        $($event.currentTarget).addClass('active').siblings('li').removeClass('active').find('span').removeClass('active')

        $($event.currentTarget).find('span').addClass('active')
    }

}]);

MyApp
    .directive('applyStatus', [
        function () {
            return {
                restrict: 'AE',
                scope: {
                    status: '=applyStatus'
                },
                controller: function ($scope) {
                },
                link: function ($scope, $elem, $attrs) {
                    $scope.$watch('status', function (newVal, oldVal) {

                        if (newVal == 'nodata') {

                            $elem.addClass('nodata');
                        } else if (newVal == 'loading') {
                            $elem.showLoading();
                        } else {
                            $elem.removeClass('nodata');
                            $elem.showLoading('hide');
                        }

                        if (oldVal != newVal) {
                            if (oldVal == 'nodata') {
                                $elem.removeClass('nodata');
                            } else if (oldVal == 'loading') {
                                $elem.showLoading('hide');
                            }
                        }
                    });
                }
            }
        }]);