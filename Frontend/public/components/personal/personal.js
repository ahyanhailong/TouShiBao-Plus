/**
 * Created by happily on 2017/12/12.
 */
MyApp.controller('personal', ['$scope', 'Data', function ($scope, Data) {

    $scope.clickActive = function($event){
        $($event.currentTarget).addClass('active').siblings('li').removeClass('active').find('span').removeClass('active');
        $($event.currentTarget).find('span').addClass('active')
    }

}])