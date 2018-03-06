
MyApp.controller('keybusiness', ['$scope','$rootScope', function ($scope,$rootScope) {
    $rootScope.sideBarKey = 'keybusiness';

//	kbservice.businessList()
	$scope.uri =''
    $('#details-page .back-list').click(function () {
        $('#default-page').show();
        $('#details-page').hide();
         window.location.replace('#/navigation/apply/keybusiness/tabList');
    })



}])