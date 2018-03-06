
MyApp.controller('abnormalDetail', ['$scope', '$rootScope','$state','abnormalService','dataTimeDefault',function ($scope,$rootScope,$state,service,dataTimeDefault) {

    $scope.url = decodeURIComponent($state.params.url)
    $scope.app_id = decodeURIComponent($state.params.app_id)
    $scope.error_code = decodeURIComponent($state.params.error_code)
    $scope.max_time = $state.params.end_time
    $scope.min_time = $state.params.start_time
    $scope.start_time = new Date($state.params.start_time).getTime()
    $scope.end_time = new Date($state.params.end_time).getTime()
    $scope.count = 1
    $scope.page = 1

    $scope.dataSource = {
        app_id:$scope.app_id,
        start_time: $scope.start_time,
        end_time : $scope.end_time,
        url : $scope.url
    };
    $scope.NextCount = function () {
        if($scope.count == $scope.errorMsg.all_count){
            $scope.count = $scope.errorMsg.all_count
        }else{
            $scope.count = $scope.count +1
            $scope.currentNum = $scope.currentNum +1
            if($scope.currentNum < $scope.errorMsg.length){
                $scope.errorMsgList = $scope.errorMsg[$scope.currentNum]
                $scope.abnormalListDetail = $scope.errorMsgList.exstack_raw.split('<br>')
                console.log($scope.errorMsgList)

            }else{
                $scope.page = $scope.page + 1
                abnormalMsg($scope.page)
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
                $scope.abnormalListDetail = $scope.errorMsgList.exstack_raw.split('<br>')
                console.log($scope.errorMsgList)

            }else{
                if($scope.page == 1){
                    $scope.page = 1
                }else{
                    $scope.page = $scope.page - 1
                }
                abnormalMsg($scope.page)
            }
        }
    }
    service.errorTrend($scope.dataSource)
    service.errorScale($scope.dataSource)

    abnormalMsg(1)
    function abnormalMsg(page) {
        $.extend(true,$scope.dataSource,{
            max_time : $scope.max_time,
            min_time : $scope.min_time,
            method_exception :1,
            page:page,
            error_msg : $scope.error_code
        })
        service.abnormalDetail($scope.dataSource).then(function (respon) {
            console.log(respon)
            var arr = []
            for(var i=1 ; i <= respon.data.all_count;i++){
                arr.push(i)
            }
            $scope.errorMsgLength = arr

            $scope.errorMsg = respon.data
            $scope.currentNum = 0
            $scope.errorMsgList = $scope.errorMsg[0]
            $scope.abnormalListDetail = $scope.errorMsgList.exstack_raw.split('<br>')
        })
    }

    $('.carousel').carousel('pause');
    // //设置不自动播放
    // $('#carousel-ad').carousel({
    //     pause: true,
    //     interval: false
    // });
}])