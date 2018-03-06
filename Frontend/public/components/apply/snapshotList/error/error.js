MyApp.controller('applySnapshotError', [
    '$scope',
    function ($scope) {
        $scope.list = [];
        $scope.currentIndex = 0;
        $scope.$watch('details', function (newValue) {
            if (newValue.errors && newValue.exceptions) {
                var list = [];

                $.each(newValue.errors, function (i, v) {
                    var o = {summary: '', detail: ''};
                    if (v.summary == 'php_error') {
                        o.summary = v.detail.file_raw + ':' + v.detail.line;
                        o.detail = v.detail.msg_raw;
                    } else {
                        o.summary = v.summary;
                        $.each(v.detail || [], function (i, dt) {
                            o.detail += dt.name + '=' + dt.value + '\n';
                        });
                    }
                    list.push(o);
                });

                $.each(newValue.exceptions, function (i, v) {
                    var o = {summary: '', detail: ''};
                    if (v.summary == 'php_exception') {
                        o.summary = v.detail.file_raw + ':' + v.detail.line;
                        o.detail = v.detail.msg_raw;
                    } else {
                        o.summary = v.summary;
                        o.detail = v.detail;
                    }
                    list.push(o);
                });

                $scope.list = list;
            }
        });

        // 改变详情索引
        $scope.changeIndex = function (i) {
            $scope.currentIndex = i;
        }

    }]);
