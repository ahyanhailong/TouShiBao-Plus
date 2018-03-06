/**
 * Created by Happily on 17/12/15.
 */
MyApp.controller('password', [
    '$scope', '$rootScope', 'passwordService',
    function ($scope, $rootScope, service) {
        $rootScope.sideBarKey = 'password';

        $scope.saveStatus = false;
        $scope.pass = {};
        var weekColor = $scope.weekColor = [
            {
                text: 'orange-text',
                bg: 'orange-bg',
                name: '弱'
            }, {
                text: 'yellow-text',
                bg: 'yellow-bg',
                name: '中'
            }, {
                text: 'green-text',
                bg: 'green-bg',
                name: '强'
            }
        ];
        $scope.currentWeek = weekColor[0];

        $scope.newPattern = false;
        $scope.matched = 0;

        $scope.newChange = function (status) {
            if (status) {
                var matches = [
                    /[A-Za-z]/,  //字母
                    /[0-9]/,  //数字
                    /[~!@#$%^&*()\-_=+{};:<,.>?\/\[\]\'\"\\\|~`]/ //特殊字符
                ];
                var matched = 0;
                var value = $scope.pass.new || '';
                $.each(matches, function (i, reg) {
                    if (reg.test(value)) {
                        matched++;
                    }
                })
                if (matched < 2) {
                    $scope.newPattern = false;
                } else {
                    $scope.newPattern = true;
                }
                $scope.matched = matched;
                $scope.currentWeek = weekColor[matched - 1];
            }
        };

        $scope.getClass = function (i) {
            if (i < $scope.matched) {
                return $scope.currentWeek.bg;
            }
            return '';
        };

        $scope.save = function (status) {

            if (status && $scope.pass.new == $scope.pass.repeat && $scope.newPattern) {
                service.update($scope.pass).then(function (result) {
                    if (result.code == 1000) {
                        $scope.saveStatus = true;
                    } else {
                        alert(result.msg);
                    }
                });
            }
        };
    }]);

MyApp.service('passwordService', ['httpService', function (http) {
    var update = env_config.API.userCenter.updatePwd;

    this.update = function (params) {
        return http.post(update, params);
    };

}]);