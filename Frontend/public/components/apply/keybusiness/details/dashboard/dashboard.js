
MyApp.controller('Kbdashboard', ['$scope', '$rootScope','dbService','dataTimeDefault','$location', '$state',function ($scope,$rootScope,dbService,dataTimeDefault,$location,$state) {
	$rootScope.SQL = false;
    $scope.uri = decodeURIComponent($state.params.uri)
    $scope.app_id = $state.params.app_id
    $scope.start_time = dataTimeDefault.start_time
    $scope.end_time = dataTimeDefault.end_time

    //点击aLink 出现相关请求
    $("#table-toggle").find("tr").each(function(){
        var $selfLink = $(this).find('td > a.accordion-link');
        $selfLink.click(function () {
            $('.accordion-collapse').show();
            $(this).parents('tr').addClass('active');
            $(this).parents('tr').siblings().removeClass('active');
        })
    });
    
   $scope.dataSource = {
    		app_id:$scope.app_id,
    		start_time : $scope.start_time,
    		end_time : $scope.end_time,
            uri : $scope.uri
   }

    $scope.$watchGroup(['start_time1','end_time1'],function (newVal,oldVal) {
        if(newVal[0]){
            $scope.dataSource.start_time = new Date(newVal[0]).getTime()
            $scope.dataSource.end_time = new Date(newVal[1]).getTime()
            dashboardFn()
        }
    })

    function dashboardFn() {
        //概要分析 顶部时间指标
        dbService.getCodeResp($scope.dataSource,function () {
            $scope.allTime = dbService.allTime
        })


        $scope.dataSource.top_type ='code'
        dbService.getCodeRespListFN($scope.dataSource,function () {
            $scope.getCodeRespList =  dbService.getCodeRespList
        })
        //概要分析 顶部时间指标 click()
        $scope.codeRespTime = function(event,type){
            $(event.currentTarget).addClass('active').siblings().removeClass('active')

            $scope.dataSource.top_type = type

            dbService.getCodeRespListFN($scope.dataSource,function () {
                $scope.getCodeRespList =  dbService.getCodeRespList
            })
        }
        //顶部贡献值等详细信息 click
        $scope.detailMsg = function (index) {
            $('#dashboard .accordion-collapse').show()
            $scope.detailMassage = $scope.getCodeRespList.data[index]

        }



        // 绘制响应时间和请求数图表
        $scope.respTimeMark = 'all';
        // dbService.drawRespTimeChart('',$scope.uri);
        var Params = {uri:$scope.uri,app_id:$scope.app_id,start_time:$scope.dataSource.start_time,end_time:$scope.dataSource.end_time}
        dbService.drawRespTimeChart('',Params);

        $scope.drawRespTimeChart = function (type) {
            $scope.respTimeMark = type || 'all';
            dbService.drawRespTimeChart(type,Params);
        };

        //请求统计
        $scope.requestCount = dbService.requestCount($scope.dataSource,function () {
            $scope.requestCountDetail = dbService.requestCountDetail.data
            var Msg = $scope.requestCountDetail.data
            $scope.requestCountNum = Msg.normal + Msg.slow + Msg.very_slow+Msg.error_count
        })

        //事务错误率和异常数
        dbService.errorAndException($scope.dataSource)
        //事务Apdex分析

        dbService.Apdex($scope.dataSource)
    }
    

}])
