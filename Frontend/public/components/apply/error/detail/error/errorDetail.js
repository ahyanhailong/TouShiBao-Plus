
MyApp.controller('errorDetail', ['$scope', '$rootScope', 'errorDetailService','$state','dataTimeDefault',function ($scope,$rootScope,service,$state,dataTimeDefault) {

    $scope.url = decodeURIComponent($state.params.url)
    $scope.app_id = decodeURIComponent($state.params.app_id)
    $scope.error_code = decodeURIComponent($state.params.error_code)

    $scope.max_time = $state.params.end_time
    $scope.min_time = $state.params.start_time
    $scope.start_time =new Date($state.params.start_time).getTime()
    $scope.end_time = new Date($state.params.end_time).getTime()
    $scope.count = 1
    $scope.page = 1

    $scope.dataSource = {
        app_id:$scope.app_id,
        start_time: $scope.start_time,
        end_time : $scope.end_time,
        url : $scope.url,
        error: 1
    };

    $scope.NextCount = function () {
        if($scope.count == $scope.errorMsg.all_count){
            $scope.count = $scope.errorMsg.all_count
        }else{
            $scope.count = $scope.count +1
            $scope.currentNum = $scope.currentNum +1
            if($scope.currentNum < $scope.errorMsg.length){
                $scope.errorMsgList = $scope.errorMsg[$scope.currentNum]
                console.log($scope.errorMsgList)

            }else{
                $scope.page = $scope.page + 1
                ErrorMSG($scope.page)
            }
        }
    }
    $scope.PrevCount = function () {
        if($scope.count == 1){
            $scope.count = 1
        }else{
            $scope.count = $scope.count - 1
            $scope.currentNum = $scope.currentNum -1
            if($scope.currentNum >= 0){
                $scope.errorMsgList = $scope.errorMsg[$scope.currentNum]
                console.log($scope.errorMsgList)

            }else{
                if($scope.page == 1){
                    $scope.page = 1
                }else{
                    $scope.page = $scope.page - 1
                }
                ErrorMSG($scope.page)
            }
        }
    }

    $('.carousel').carousel('pause');
    service.errorTrend($scope.dataSource)
    service.errorScale($scope.dataSource)
    // service.timeCaller()
    // service.timeErrorRate()

    ErrorMSG(1)
    function ErrorMSG(page) {
        $.extend(true,$scope.dataSource,{
            error_code:$scope.error_code,
            max_time : $scope.max_time,
            min_time : $scope.min_time,
            page :page
        })
        service.ErrorDetail($scope.dataSource).then(function (respon) {
            var arr = []
            for(var i=1 ; i <= respon.data.all_count;i++){
                arr.push(i)
            }
            $scope.errorMsgLength = arr

            $scope.errorMsg = respon.data
            $scope.currentNum = 0
            $scope.errorMsgList = $scope.errorMsg[0]

        })
    }

}])