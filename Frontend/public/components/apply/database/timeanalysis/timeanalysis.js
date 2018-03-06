MyApp.controller('timeanalysis', ['$rootScope', '$location', '$scope', 'Data', '$compile', 'timeanalysisService','dateTimeService', function ($rootScope, $location, $scope, Data, $compile, timeanalysisService,dateTimeService) {
    $rootScope.sideBarKey = 'database'
    
    $scope.$parent.Tipstatus = 1
    //设置分页的参数
    $scope.total_row = timeanalysisService.total_row;//总页数
    $scope.second_total_row = timeanalysisService.second_total_row;//总页数

    $scope.sum_per_page = '5'; //每页显示多少行
    $scope.page_no = 1;
    $scope.regexp = ''; //
    $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
    
    $scope.app_id = env_config.APP_ID;
    $scope.start_time = dateTimeService.getTime().start;
    $scope.end_time = dateTimeService.getTime().end;
    $scope.time_step = 1;
    $scope.account_id = '107';
    $scope.sql = '';


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

    $scope.$parent.$on('filterChange', function ($event, info) {
		console.log(info)
		var json = {}
		$.each(info,function(key,val){ //处理resptime:[] => wt_from:resptime[0],wt_to:resptime[1],
			if(key != 'resptime'){
				json[key] = val
			}else{
				json['wt_from'] = val[0]
				json['wt_to'] = val[1]
			}
		})
		$.extend($scope.dataSource,json)

   })
    $scope.$watchGroup(
    	[
	    	'dataSource.db_name',
	    	'dataSource.instance_raw',
	    'dataSource.db_table',
	    'dataSource.db_oper_type',
	    'dataSource.reqUri_raw',
	    'dataSource.wt_from',
	    'dataSource.wt_to'
    ]
    	, function (newValue, oldValue) {
        	
        if (newValue != oldValue) {
        		console.log($scope.dataSource)
            if ($.cookie('TimeanalySecond')) { //判断是否在二级页面
                timeanalysisService.initChartData($scope.dataSource)
                timeanalysisService.requestQuickSql($scope.dataSource, function () {
                    $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
                    $scope.second_total_row = timeanalysisService.second_total_row
                })
                timeanalysisService.DbCaller($scope.dataSource)
            } else {
                timeanalysisService.initChartData($scope.dataSource)
                timeanalysisService.getAllSqlList($scope.dataSource, function () {
                    $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
                    $scope.total_row = timeanalysisService.total_row
                })
            }

        }
    })

    $scope.callerOccupy = false;//是否显示调用者占比

    


    //监听appid 改变 执行页面刷新
    $scope.$on('changeAppId', function (event, info) {

        var path = $location.path() //  /apply/database/timeanalysis
        var localhost = $location.host() //dev.toushibao.front
        var port = $location.port(); //8030

        if (/timeanalysis/.test(path)) {
            $location.url('/apply/database/timeanalysis')
            $scope.app_id = info
        }

    })
    $scope.$parent.$on('timeChage', function (event, info) {

        $scope.start_time = info.start_time
        $scope.end_time = info.end_time
    })

    $('#requestSlowestSql input').on('onkey', function () {
        timeanalysisService.getAllSqlList(dataSource, function () {
            $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
            $scope.total_row = timeanalysisService.total_row
        })
    });
    var submitData = {};

    if ($.cookie('TimeanalySecond') == 'true') {
        $scope.callerOccupy = true
        $scope.sql = $.cookie('sql')
    }

    var allStatus = $scope.$watchGroup(['start_time', 'end_time', 'account_id', 'sql'], function (newval, oldval) {

        if ($.cookie('TimeanalySecond')) {
            timeanalysisService.initChartData($scope.dataSource)
            timeanalysisService.requestQuickSql($scope.dataSource, function () {
                $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
                $scope.second_total_row = timeanalysisService.second_total_row
            })
            timeanalysisService.DbCaller($scope.dataSource)
        } else {
            timeanalysisService.initChartData($scope.dataSource)
//          timeanalysisService.getAllSqlList(dataSource, function () {
//              $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
//              $scope.total_row = timeanalysisService.total_row
//          })
        }


    })

    $scope.orderby = function (event) {

        var order = $(event.currentTarget).parents('th').attr('data-item')
        var sort = $(event.currentTarget).hasClass('fa-sort-desc') ? 'asc' : 'desc';
        $scope.dataSource.order = order
        $scope.dataSource.sort = sort
        $scope.dataSource.sql = $scope.sql
        if ($.cookie('TimeanalySecond') == 'true') {
            timeanalysisService.requestQuickSql($scope.dataSource, function () {
                $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
                $scope.second_total_row = timeanalysisService.second_total_row
            })
        } else {
            timeanalysisService.getAllSqlList($scope.dataSource, function () {
                $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
                $scope.total_row = timeanalysisService.total_row
            })
        }

    }


    var watchAppid = $scope.$watchGroup(['app_id'], function (newval, oldval) {
		$scope.dataSource.sql = $scope.sql
        if (newval != oldval) {
            timeanalysisService.initChartData($scope.dataSource)
            timeanalysisService.getAllSqlList($scope.dataSource, function () {
                $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
                $scope.total_row = timeanalysisService.total_row
            })
        }

    })

    // SQL列表根据分页改变刷新
    $scope.changeSqlList = function () {

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.page_no
        timeanalysisService.getAllSqlList($scope.dataSource, function () {
            $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
            $scope.total_row = timeanalysisService.total_row
        })
    };
    // SQL快照列表根据分页改变刷新
    $scope.changeQuickSqlList = function () {

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		
        if ($scope.callerOccupy) {
            timeanalysisService.requestQuickSql($scope.dataSource, function () {
                $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
                $scope.second_total_row = timeanalysisService.second_total_row
            })
        }
    };

    //时间分析一级页面table 点击事件
    $scope.clickSQL = function (name) {
        $scope.$parent.Tipstatus = 1
        $scope.callerOccupy = !false
        $scope.sql = name
        $scope.dataSource.sql = name
        $.cookie('TimeanalySecond', true, {path: '/'})
        $.cookie('sql', name, {path: '/'})

//      timeanalysisService.requestQuickSql(dataSource, function () {
//          $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
//          $scope.second_total_row = timeanalysisService.second_total_row
//
//
//      })
//      timeanalysisService.DbCaller(dataSource)

    }
    $('#SQLSnapshootList').on('onkey', function () {
        var Value = $(this).val()
        $scope.regexp = Value

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		
        timeanalysisService.requestQuickSql($scope.dataSource, function () {
            $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
            $scope.second_total_row = timeanalysisService.second_total_row
        })
    });
    $scope.Search = function (event) {
        var Value = $($(event.currentTarget)).parents('.filter_search').find('input').val()
        $scope.regexp = Value

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.page = $scope.second_page_no
		$scope.dataSource.reqUri_raw_search = $scope.regexp
        timeanalysisService.requestQuickSql($scope.dataSource ,function () {
            $scope.time_analysis_snap_list = timeanalysisService.time_analysis_snap_list
            $scope.second_total_row = timeanalysisService.second_total_row
        })
    }
    $scope.download = function () {
        var URL = timeanalysisService.create_export_file
        var target
        if ($.cookie('TimeanalySecond') == 'true') {
            target = 'timeSnapList'
        } else {
            target = 'timeAggsList'
        }

		$scope.dataSource.sql = $scope.sql
		$scope.dataSource.target = target
		$scope.dataSource.reqUri_raw_search = $scope.regexp
		timeanalysisService.downloadSQL($scope.dataSource)
    }

    //时间分析二级页面table 点击事件
    $scope.clickSQLSecond = function ($event) {
        var data = $($event.target).data()
        var r_nidData = data.r_nid.split('#on#')
        var r_nid = r_nidData[0] + '$on$' + r_nidData[1]

        window.open('public/components/apply/database/timeanalysis/timeanalyThred.html?request_id=' + data.request_id + '&r_nid=' + r_nid + '&sql=' + data.sql + '&end_time=' + $scope.end_time + '&start_time=' + $scope.start_time)

    }

    //监听时间分析 tab点击事件
    $scope.$on('callerOccupy', function (event, info) {
        $scope.callerOccupy = info.callerOccupy
        $.cookie('TimeanalySecond', '', {path: '/'})

		$scope.dataSource.sql = ''
		
        timeanalysisService.initChartData($scope.dataSource)
        timeanalysisService.getAllSqlList($scope.dataSource, function () {
            $scope.time_analysissql_list = timeanalysisService.time_analysissql_list
            $scope.total_row = timeanalysisService.total_row
        })

    })
    $scope.$on('$destroy', function () {
        $scope.callerOccupy = false;
        $.cookie('TimeanalySecond', '', {path: '/'})
        $.cookie('sql', '', {path: '/'})
//      allStatus()
//      pageListOne()
//      pageListTwo()
    })


}])