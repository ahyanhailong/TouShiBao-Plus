MyApp.controller('erroranalysis', ['$rootScope', '$location' ,'$scope', 'Data', '$compile' ,'$http','erroranalysisService',function ($rootScope,$location,$scope,$http ,Data,$compile,erroranalysisService) {
   $scope.$parent.Tipstatus = 2;
   $scope.callerOccupy = false;//是否显示调用者占比]
   $scope.app_id = env_config.APP_ID;
   $scope.start_time = $scope.$parent.start_time;
   $scope.end_time = $scope.$parent.end_time;
   $scope.account_id = '107';
   $scope.sql = '';
   
   //设置分页的参数
   
    $scope.total_row = 0 ;//总页数
    $scope.sum_per_page = '5' ; //每页显示多少行
    $scope.page_no = 1;
    $scope.second_total_row = 0 ;//总页数
    $scope.second_sum_per_page = '5' ; //每页显示多少行
    $scope.second_page_no = 1;
    
    //监听appid 改变 执行页面刷新
	$scope.$on('changeAppId',function(event,info){
		console.log(info)
		var path = $location.path() //  /apply/database/timeanalysis
		var localhost = $location.host() //dev.toushibao.front
		var port = $location.port(); //8030
		
		if(/erroranalysis/.test(path)){
			$location.url('/apply/database/timeanalysis')
			
			$scope.app_id = info
		}
		
	})
	//监听时间 变化
    $scope.$parent.$on('timeChage',function(event,info){
		$scope.start_time = info.start_time
		$scope.end_time = info.end_time
	})
    
    //过滤插件变量

  	$scope.dataSource = {
        app_id: $scope.app_id,
        start_time: $scope.start_time,
        end_time: $scope.end_time,
        account_id: $scope.account_id,
        sql: $scope.sql
    }
  	$scope.filterdata = {}
  	$.each($scope.$parent.wheres,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
		if(key != 'resptime'){
			$scope.filterdata[key] = val
		}else{
			$scope.filterdata['wt_from'] = val[0]
			$scope.filterdata['wt_to'] = val[1]
		}
	})
  	$.extend(true,$scope.dataSource, $scope.filterdata);
  	
	$scope.$parent.$on('filterChange',function($event,info){
		var json = {}  
		$.each(info,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
			if(key != 'resptime'){
				json[key] = val
			}else{
				json['wt_from'] = val[0]
				json['wt_to'] = val[1]
			}
		})
		$.extend(true,$scope.dataSource,json)
	})
	
	$scope.$watchGroup(['dataSource.instance_raw','dataSource.db_table','dataSource.db_name','dataSource.db_oper_type','dataSource.wt_from','dataSource.wt_to'],function(newValue,oldValue){
		if(newValue != oldValue){
			if($.cookie('erroranalySecond')){ //判断是否在二级页面
				erroranalysisService.initChartData($scope.dataSource)
				erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
					$scope.second_total_row = erroranalysisService.second_total_row
					$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
				})
				erroranalysisService.SqlErrorCaller($scope.dataSource)
			}else{
				erroranalysisService.initChartData($scope.dataSource)
				erroranalysisService.SqlErrorList($scope.dataSource, function () {
		            $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
		            $scope.total_row = erroranalysisService.total_row
		        })
			}
			 
		}
	})
    
    
	var submitData = {};

	//获取实例
    var getInstance = function(params){
       var instance =  new sqldb(params);
       return instance;
    };
    
  
   if($.cookie('erroranalySecond') == 'true'){
   		$scope.callerOccupy = true
   		$scope.sql = $.cookie('sql')
   }
   
   $scope.$watchGroup(['start_time','end_time','account_id','sql'],function(newval,oldval){
   	if($.cookie('erroranalySecond')){
   		erroranalysisService.initChartData($scope.dataSource)
   		erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
			$scope.second_total_row = erroranalysisService.second_total_row
			$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
		})
   		erroranalysisService.SqlErrorCaller($scope.dataSource)
   	}else{
   		erroranalysisService.initChartData($scope.dataSource)
   		erroranalysisService.SqlErrorList($scope.dataSource, function () {
            $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
            $scope.total_row = erroranalysisService.total_row
        })
   	}
   })
   
   $scope.$watchGroup(['page_no','sum_per_page'], function (newval, oldval) {
   	$scope.dataSource.page = $scope.page_no
	    	if(newval != oldval){
	    		erroranalysisService.SqlErrorList($scope.dataSource, function () {
	            $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
	            $scope.total_row = erroranalysisService.total_row
	        })
	    	}
    })
	$scope.$watchGroup(['second_page_no','second_sum_per_page'], function (newval, oldval) {

		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
        if(newval != oldval){
        		erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
				$scope.second_total_row = erroranalysisService.second_total_row
				$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
			})
        }
    })
	 //异常分析一级页面table 点击事件
   $scope.clickSQL = function(name){
   		$scope.callerOccupy = true
   		$scope.sql = name
   		$.cookie('erroranalySecond',true,{path:'/'})
   		$.cookie('sql',name)

		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.sql = $scope.sql
		erroranalysisService.initChartData($scope.dataSource)
		erroranalysisService.SqlErrorCaller($scope.dataSource)
		erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
			$scope.second_total_row = erroranalysisService.second_total_row
			$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
		})
   }
   
   // 异常一级页面SQL列表根据分页改变刷新
    $scope.changeSqlList = function () {

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.page_no
        erroranalysisService.SqlErrorList($scope.dataSource, function () {
            $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
            $scope.total_row = erroranalysisService.total_row
        })
    };
    // 异常二级页面SQL快照列表根据分页改变刷新
    $scope.changeQuickSqlList = function () {

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		
        if ($scope.callerOccupy) {
            erroranalysisService.SecondSqlErrorList($scope.dataSource, function () {
                $scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
                $scope.second_total_row = erroranalysisService.second_total_row
            })
        }
    };
   //异常分析tab点击事件
    $scope.$on('callerOccupyError',function(event,info){
    		$scope.callerOccupy = info.callerOccupy
    		$.cookie('erroranalySecond','',{path:'/'})

		$scope.dataSource.sql = ''
		$scope.dataSource.page = $scope.page_no
    		erroranalysisService.initChartData($scope.dataSource)
    		erroranalysisService.SqlErrorList($scope.dataSource, function () {
            $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
            $scope.total_row = erroranalysisService.total_row
        })
    })
     $('#SQLSnapshootList').on('onkey',function(){
            var Value = $(this).val()
            $scope.regexp = Value

			$scope.dataSource.sql = $scope.sql
			$scope.dataSource.reqUri_raw_search = $scope.regexp
    			erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
    				$scope.second_total_row = erroranalysisService.second_total_row
    				$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
    			})
    });
    $scope.Search = function(event){
    		var Value = $($(event.currentTarget)).parents('.filter_search').find('input').val()

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.page
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		
    		erroranalysisService.SecondSqlErrorList($scope.dataSource,function(){
			$scope.second_total_row = erroranalysisService.second_total_row
			$scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
		})
    }
    $scope.download = function(){
    		var URL = $scope.create_export_file
    		var target
    		if($.cookie('erroranalySecond') == 'true'){
    			target = 'exceptionSnapList'
    		}else{
    			target = 'exceptionAggsList'
    		}

		$scope.dataSource.target = target
		$scope.dataSource.sql = $scope.sql
    		$.ajax({
    			type:"get",
    			url:$scope.create_export_file,
    			async:true,
    			data:dataSource,
    			success:function(result){
    				console.log(result)
    				if(result.code == '1000'){
    					window.location = result.data
    				}
    			}
    		});
    }
    $scope.orderby = function (event) {

        var order = $(event.currentTarget).parents('th').attr('data-item')
        var sort = $(event.currentTarget).hasClass('fa-sort-desc') ? 'asc' : 'desc';
        $scope.dataSource.order = order
        $scope.dataSource.sort = sort
        $scope.dataSource.sql = $scope.sql
        if ($.cookie('erroranalySecond') == 'true') {
            erroranalysisService.SecondSqlErrorList($scope.dataSource, function () {
                $scope.error_SecondSqlErrorList = erroranalysisService.error_SecondSqlErrorList
                $scope.second_total_row = erroranalysisService.second_total_row
            })
        } else {
            erroranalysisService.SqlErrorList($scope.dataSource, function () {
                $scope.error_analysissql_list = erroranalysisService.error_analysissql_list
                $scope.total_row = erroranalysisService.total_row
            })
        }

    }
    
   $scope.$on('$destroy',function(){
  		$scope.callerOccupy = false;
  		$.cookie('erroranalySecond','',{path:'/'})
		$.cookie('sql','',{path:'/'})
  	})
   //错误分析二级页面 table 点击事件
   $scope.clickSQLSecond = function($event){
   		var data= $($event.target).data()
   		var r_nidData = data.r_nid.split('#on#')
    		var r_nid = r_nidData[0]+'$on$'+r_nidData[1]
   		window.open('public/components/apply/database/erroranalysis/erroranalyThred.html?request_id='+ data.request_id +'&r_nid='+ r_nid +'&sql='+data.sql+'&end_time='+$scope.end_time+'&start_time='+$scope.start_time)
  		
   }

}])