MyApp.controller(
    'business', ['$scope', '$rootScope', 'dateTimeService', 'businessService', '$state',
        function ($scope, $rootScope, dateTimeService, businessService, $state) {
            $rootScope.sideBarKey = 'business'
            if ($state.is('navigation.apply.business')) {
                $state.go('navigation.apply.business.main');
            }
        }]);
