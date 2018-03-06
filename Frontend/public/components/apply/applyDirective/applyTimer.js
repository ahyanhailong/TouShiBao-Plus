MyApp
    .directive('applyTimer', [
        '$compile', '$state', '$timeout',
        function ($compile, $state, $timeout) {
            return {
                restrict: 'AE',
                controller: function ($scope) {
                    var start = $.cookie('start_timer');
                    var end = $.cookie('end_timer');
                    var step = $.cookie('timer_step');


                    $scope.$watchGroup(['start_time', 'end_time'], function (newval, oldval) {
                        $timeout(function () {
                            var _start = $.cookie('start_timer');
                            var _end = $.cookie('end_timer');
                            var _step = $.cookie('timer_step');

                            if (start != _start || end != _end || step != _step) {
                                $state.reload();
                            }
                        });
                    });
                },
                link: function ($scope, $elem, $attrs) {
                    $elem.html($compile('<div timer-start-time="start_time" timer-end-time="end_time" timer></div>')($scope));
                }
            }
        }]);