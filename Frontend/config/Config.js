var env_config = (function () {

    var HOST_ADDRESS = 'http://dev.toushibao.front:8030/api';		//接口ip+port

    return {
        PATH: 'http://dev.toushibao.front:8030',
        HOST_ADDRESS: HOST_ADDRESS,
        APP_ID: '1889145666784453',
        timer: {
            "30m": {"time": 30, "type": "m", "text": "最近30分钟", "step": 0},
            "1h": {"time": 1, "type": "h", "text": "最近1小时", "step": 1},
            "6h": {"time": 6, "type": "h", "text": "最近6小时", "step": 2},
            "12h": {"time": 12, "type": "h", "text": "最近12小时", "step": 3},
            "1d": {"time": 1, "type": "d", "text": "最近1天", "step": 4},
            "3d": {"time": 3, "type": "d", "text": "最近3天", "step": 5},
            "5d": {"time": 5, "type": "d", "text": "最近5天", "step": 6},
            "7d": {"time": 7, "type": "d", "text": "最近7天", "step": 7},
            "15d": {"time": 15, "type": "d", "text": "最近15天", "step": 8},
            "1mon": {"time": 1, "type": "mon", "text": "最近1个月", "step": 9},
            "2mon": {"time": 2, "type": "mon", "text": "最近2个月", "step": 10},
            "3mon": {"time": 3, "type": "mon", "text": "最近3个月", "step": 11}
        },
        commonTimeData: [{time: "30分钟"}, {time: "1小时"}, {time: "6小时"}, {time: "12小时"}, {time: "1天"}],
        API: {
            //登陆注册接口
            LognIAndRegister:{
                //登陆接口
                Login : HOST_ADDRESS + '/account/user/login',
                //用户注册获取滑块初始化参数
                GET_REGISTER_GEE_INIT : HOST_ADDRESS + '/account/user/get_register_gee_init',
                //用户重置邮箱发送邮件
                SEND_RESET_EMAIL : HOST_ADDRESS + '/account/user/send_reset_email',
                //重置密码
                RESET_PWD : HOST_ADDRESS + '/account/user/reset_pwd',
                //重置手机号发送验证码
                SEND_RESET_MOBILE_CODE : HOST_ADDRESS + '/account/user/send_reset_mobile_code',
                //忘记密码发送邮件
                SEND_RESET_PWD_EMAIL : HOST_ADDRESS + '/account/user/send_reset_pwd_email',
                //邮件确认重置密码
                CONFIRM_RESET_PWD : HOST_ADDRESS + '/account/user/confirm_reset_pwd',
                //用户注册
                REGISTER :  HOST_ADDRESS + '/account/user/register'
            },
            commonApplication: {
                USER_LOGIN: '/account/user/login?email=bear@yunzhihui.com&pw=123456',   //用户登录
                USER_STATUS: '/account/user/checklogin'
            },
            Filter_Element_For_Db: { //过滤插件接口
                GET_FILTER_ELEMENT_FOR_DB: '/application/relation_db/get_filter_element_for_db', //过滤插件 类型列表接口
                SAVE_DB_FILTER_CONDITION: '/application/relation_db/save_relation_db_filtration_condition', //保存过滤条件接口
                GET_RELATION_DB_FILTRATION_CONDITION: '/application/relation_db/get_relation_db_filtration_condition',//查询以保存组合条件接口
                DELETE_DB_FILTERATION_CONDITION: '/application/relation_db/delete_relation_db_filtration_condition'//删除组合条件接口
            },
            PersonalInfo :{ //个人中心
                //用户信息
                GET_USER_INFO : HOST_ADDRESS + '/account/user/get_user_info',
                //修改用户名
                MODIFY_USER_NAME : HOST_ADDRESS + '/account/user/ModifyUserName',
                //当前配额剩余
                GET_QUOTA_LEFT : HOST_ADDRESS + '/account/user/get_quota_left',
                //配额信息列表
                GET_MOUDLE_QUOTA : HOST_ADDRESS + '/account/user/get_moudle_quota',
                //模块使用期限
                GET_MOUDLE_OVER_TIME : HOST_ADDRESS + '/account/user/get_moudle_over_time',
                //新邮箱获取验证码
                SEND_RESET_EMAIL : HOST_ADDRESS + '/account/user/send_reset_email',
                //使用发送到邮箱的验证码激活邮件
                RESET_EMAIL : HOST_ADDRESS + '/account/user/reset_email',
                //重置手机号发送验证码
                SEND_RESET_MOBILE_CODE : HOST_ADDRESS + '/account/user/send_reset_mobile_code',
                //使用验证码重置手机号
                RESET_MOBILE : HOST_ADDRESS + '/account/user/reset_mobile'
            },
            PluginPanel:{//获取插件管理面板列表
                GET_PLUGIN_PANEL_LIST : HOST_ADDRESS +'/account/user/get_plugin_panel_list',
                //获取插件筛选列表
                GET_PLUGIN_LIST : HOST_ADDRESS + '/account/user/getPluginList'
            },
            getApiSecretKey:{
                //获取API配置秘钥和类型
                GET_API_SECRET_KEY : HOST_ADDRESS + '/account/user/get_api_secret_key',
                //更换API配置秘钥
                CHANGE_API_SECRET : HOST_ADDRESS + '/account/user/change_api_secret',
                //保存API配置
                SAVE_API_SECRET : HOST_ADDRESS + '/account/user/save_api_secret'
            },
            APP: {
                GET_APP_LIST: HOST_ADDRESS + '/api/application/setting/get_app_list'
            },
            APP_Getuser_AppList: {
                APP_GET_USER_APP_LIST: '/application/setting/get_user_app_list'
            },
            getPluginInfo:{
                GET_PLUGIN_INFO : HOST_ADDRESS +'/application/setting/get_plugin_info'
            },
            APP_Relation_Db: { //时间分析
                //数据库时间分析一级页面 数据库趋势图
                TIME_TREND_LINE_CHATY : HOST_ADDRESS + '/application/relation_db/get_time_analysis_db_trend_line',
                //数据库时间分析一级页面 时间分布柱状图
                TIME_DISTRIBUTE_BAR : HOST_ADDRESS + '/application/relation_db/get_time_analysis_distribution_line',
                //数据库时间分析一级页面 SQL列表
                TIME_SQL_LIST: HOST_ADDRESS + '/application/relation_db/get_time_analysis_aggs_sql_list',
                //数据库时间分析二级页面  调用者占比TOP5
                TIMW_SQL_DBCALLE : HOST_ADDRESS + '/application/relation_db/get_time_analysis_db_caller',
                //数据库时间分析二级页面  SQL快照列表
                TIME_SQL_UNIQUESQLLIST : HOST_ADDRESS + '/application/relation_db/get_time_analysis_snap_sql_list',
                //数据库时间分析三级页面
                TIME_SQL_THREE : HOST_ADDRESS + '/application/relation_db/get_time_analysis_db_stack_tree',
                //数据库sql 列表导出功能接口
                CREATE_EXPORT_FILE : HOST_ADDRESS + '/application/relation_db/create_export_file'
            },
            APP_Relation_Unusual: { //异常分析
                //数据库异常分析一级页面   数据库错误趋势图
                ERROR_ANALYZE_TREND : HOST_ADDRESS + '/application/relation_db/get_exception_analysis_db_error_trend_line',
                //数据库异常分析一级页面   SQL快照列表
                ERROR_ANALYZE_LIST : HOST_ADDRESS + '/application/relation_db/get_exception_analysis_aggs_sql_error_list',
                //数据库异常分析二级页面   SQL快照列表
                ERROR_ANALYZE_SECOND_LIST : HOST_ADDRESS + '/application/relation_db/get_exception_analysis_single_element_sql_error_snap_list',
                //数据库异常分析二级页面   调用者占比TOP5
                ERROR_ANALYZE_CALLER : HOST_ADDRESS + '/application/relation_db/get_exception_analysis_single_element_db_caller',
                //数据库异常分析三级页面
                ERROR_ANALYZE_ERRORSTACK_THREE : HOST_ADDRESS +  '/application/relation_db/get_exception_analysis_sql_error_stack_tree'
            },
            BusinessAnalysis: {//事务分析API
                //响应时间和请求数
                GET_OVERVIE_RESP_AND_RPM_TREND_CHART: HOST_ADDRESS + '/application/transaction_analysis/get_overview_resp_and_rpm_trend_chart',
                //请求数按响应时间分布
                GET_OVERVIEW_REQUEST_DISTRBUTION_PIE: HOST_ADDRESS + '/application/transaction_analysis/get_overview_request_distribution_pie',
                //事务列表
                GET_OVERVIEW_TRANSACTION_LIST: HOST_ADDRESS + '/application/transaction_analysis/get_overview_transaction_list',
                // 仪表盘 - 顶部分类数据
                GET_DASHBOARD_STATISTICAL_INDICATORS: HOST_ADDRESS + '/application/transaction_analysis/get_dashboard_statistical_indicators',
                // 仪表盘 - 顶部列表数据
                GET_DASHBOARD_TOP_METHODS: HOST_ADDRESS + '/application/transaction_analysis/get_dashboard_top_methods',
                // 仪表盘 - 响应时间和请求数
                GET_DASHBOARD_RESP_AND_RPM_TREND_CHART: HOST_ADDRESS + '/application/transaction_analysis/get_dashboard_resp_and_rpm_trend_chart',
                // 仪表盘 - 请求统计
                GET_DASHBOARD_REQEUST_STATISTICS: HOST_ADDRESS + '/application/transaction_analysis/get_dashboard_request_statistics',
                // 仪表盘 - 错误信息
                GET_DASHBOARD_ERROR_INFO_LIST: HOST_ADDRESS + '/application/transaction_analysis/get_dashboard_error_info_list',
                // 仪表盘 - 异常元素 top5
                GET_DASHBOARD_EXCEPTION_TOP5_LIST: HOST_ADDRESS + '/application/transaction_analysis/get_dashboard_exception_top5_list',
                // 缓慢分析 - 响应时间分布图
                GET_SLOW_ANALYSIS_TIME_DISTRIBUTION_LINE: HOST_ADDRESS + '/application/transaction_analysis/get_slow_analysis_time_distribution_line',
                // 缓慢分析 - 快照列表
                GET_SLOW_ANALYSIS_SNAP_LIST: HOST_ADDRESS + '/application/transaction_analysis/get_slow_analysis_snap_list',
                // 错误和异常分析 - 错误和异常趋势
                GET_ERROR_ANALYSIS_ERROR_EXCEPTION_COUNT_CHART: HOST_ADDRESS + '/application/transaction_analysis/get_error_analysis_error_exception_count_chart',
                // 错误和异常分析 - 错误占比
                GET_ERROR_ANALYSIS_ERROR_RATE_PIE: HOST_ADDRESS + '/application/transaction_analysis/get_error_analysis_error_rate_pie',
                // 错误和异常分析 - 异常占比
                GET_ERROR_ANALYSIS_EXCEPTION_RATE_PIE: HOST_ADDRESS + '/application/transaction_analysis/get_error_analysis_exception_rate_pie',
                // 错误和异常分析 - 快照列表
                GET_ERROR_ANALYSIS_SNAP_LIST: HOST_ADDRESS + '/application/transaction_analysis/get_error_analysis_snap_list',
                // 快照分析 - 响应时间分布图
                GET_SNAP_ANALYSIS_TIME_DISTRIBUTION_LINE: HOST_ADDRESS + '/application/transaction_analysis/get_snap_analysis_time_distribution_line',
                // 快照分析 - 快照列表
                GET_SNAP_ANALYSIS_TIME_SNAP_LIST: HOST_ADDRESS + '/application/transaction_analysis/get_snap_analysis_snap_list'
            },
            // 应用快照详情
            ApplySnapshot: {
                // 拓扑
                GET_SINGLE_TOPO_DATA: HOST_ADDRESS + '/application/transaction_analysis/get_single_topo_data',
                // 详情
                GET_SINGLE_DETAIL_DATA: HOST_ADDRESS + '/application/transaction_analysis/get_single_detail_data',
                // 被调用请求列表
                GET_SINGLE_CALLED_API_SNAP_TOPO: HOST_ADDRESS + '/application/transaction_analysis/get_single_called_api_snap_topo'
            },
            //关键事务模块
            key_transaction_list: {
                //关键事务列表
                KEY_TRANSACTION_LIST: HOST_ADDRESS + '/application/key_transaction/get_key_transaction_list',
                // 概要分析 顶部时间指标
                GET_PROFILING_STATISTICAL_INDICATORS : HOST_ADDRESS + '/application/key_transaction/get_profiling_statistical_indicators',
                //概要分析 顶部贡献值等详细信息
                GET_PROFILING_SINGLE_URL_STATISTICAL_INDICATORST : HOST_ADDRESS + '/application/key_transaction/get_profiling_single_url_statistical_indicatorst',
                //请求统计
                GET_PROFILING_REQUEST_STATISTICS : HOST_ADDRESS + '/application/key_transaction/get_profiling_request_statistics',
                //事务错误率和异常率
                GET_PROFILING_ERROR_AND_EXCEPTION_TREND_CHART : HOST_ADDRESS + '/application/key_transaction/get_profiling_error_and_exception_trend_chart',
                //概要分析 事务Apdex分析
                GET_PROFILING_APDEX_ANALYSIS_TREND_CHART : HOST_ADDRESS + '/application/key_transaction/get_profiling_apdex_analysis_trend_chart',
                //响应时间和请求数
                GET_PROFILING_RESP_TIME_AND_COUNT_DATA_MIXED : HOST_ADDRESS +'/application/key_transaction/get_profiling_resp_time_and_count_data_mixed',
                //错误和异常趋势
                GET_ERROR_ANALYSIS_ERROR_AND_EXCEPTION_TREND_CHART : HOST_ADDRESS + '/application/key_transaction/get_error_analysis_error_and_exception_trend_chart',
                //错误占比TOP5
                GET_ERROR_ANALYSIS_ERROR_RATE_PIE : HOST_ADDRESS + '/application/key_transaction/get_error_analysis_error_rate_pie',
                //异常占比TOP5
                GET_ERROR_ANALYSIS_EXCEPTION_RATE_PIE : HOST_ADDRESS + '/application/key_transaction/get_error_analysis_exception_rate_pie',
                //错误列表
                GET_ERROR_ANALYSIS_ERROR_LIST : HOST_ADDRESS + '/application/key_transaction/get_error_analysis_error_list',
                //异常列表
                GET_ERROR_ANALYSIS_EXCEPTION_LIST: HOST_ADDRESS + '/application/key_transaction/get_error_analysis_exception_list',
                //快照分析 响应时间分布图
                GET_SNAP_ANALYSIS_TIME_DISTRIBUTION_LINE : HOST_ADDRESS + '/application/key_transaction/get_snap_analysis_time_distribution_line',
                //快照分析 快照列表
                GET_SNAP_ANALYSIS_SQL_SNAP_LIST: HOST_ADDRESS + '/application/key_transaction/get_snap_analysis_sql_snap_list',
                //创建关键事务
                CREATE_KEY_TRANSACTION : HOST_ADDRESS + '/application/key_transaction/create_key_transaction',
                //查询事务列表
                GET_SETTING_URI_LIST : HOST_ADDRESS + '/application/key_transaction/get_setting_uri_list',
                //删除关键事务
                DELETE_TRANSACTION : HOST_ADDRESS + '/application/key_transaction/delete_transaction',
                //获取关键事务配置信息
                GET_SINGLE_TRANSACTION_DATA : HOST_ADDRESS + '/application/key_transaction/get_single_transaction_data',
                //编辑关键事务
                UPDATE_TRANSACTION : HOST_ADDRESS + '/application/key_transaction/update_transaction',
            },
            //应用列表
            apply_list : {
                //获取应用列表
                GET_APP_LIST : HOST_ADDRESS + '/application/app_list/get_app_list',
                //获取应用列表状态
                GET_APP_HEALTH_STATUS : HOST_ADDRESS + '/application/app_list/get_app_health_status',
                //获取主机列表
                GET_HOST_LIST : HOST_ADDRESS + '/application/app_list/get_host_list',
                //设置应用状态 启动/暂停
                SET_APP_STATUS : HOST_ADDRESS + '/application/app_list/set_app_status',
                //新建分组
                CREATE_APP_GROUP : HOST_ADDRESS + '/application/app_list/create_app_group',
                //获取应用分组列表
                GET_APP_GROUP : HOST_ADDRESS + '/application/app_list/get_app_group',
                //更新管理分组
                UPDATE_APP_GROUP : HOST_ADDRESS + '/application/app_list/update_app_group',
                //删除应用分组
                DELETE_APP_GROUP : HOST_ADDRESS + '/application/app_list/delete_app_group',
                //加入分组
                SET_APP_GROUP : HOST_ADDRESS + '/application/app_list/set_app_group',
                //获取分组里的应用
                GET_GROUP_APP : HOST_ADDRESS + '/application/app_list/get_group_app',
                //修改分组里应用名称
                SET_APP_NAME : HOST_ADDRESS + '/application/app_list/set_app_name',
                //一键暂停
                PAUSE_APP : HOST_ADDRESS + '/application/app_list/pause_app',
                //删除分组里的应用
                DELETE_APP_FROM_GROUP : HOST_ADDRESS + '/application/app_list/delete_app_from_group',
            },
            //拓扑图
            apply_topolog :{
                GET_REQUEST_TREND_CHART : HOST_ADDRESS + '/application/topo/get_request_trend_chart',
                GET_RESP_TIME_TREND_CHART : HOST_ADDRESS + '/application/topo/get_resp_time_trend_chart',
                GET_ERROR_TREND_CHART : HOST_ADDRESS + '/application/topo/get_error_trend_chart',
                GET_REQUEST_STATISTICS_TABLE : HOST_ADDRESS + '/application/topo/get_request_statistics_table',
                GET_TOPO_DATA : HOST_ADDRESS + '/application/topo/get_topo_data',
                GET_TOPO_INSTANCE_INFO : HOST_ADDRESS + '/application/topo/get_topo_instance_info',
            },
            //对比分析
            relative_analysis : {
                //uri请求列表
                GET_URI_LIST : HOST_ADDRESS + '/application/comparative_analysis/get_uri_list',
                //获取主机列表
                GET_HOST_LIST: HOST_ADDRESS + '/application/comparative_analysis/get_host_list',
                //请求数
                GET_REQUEST_TREND_LINE: HOST_ADDRESS + '/application/comparative_analysis/get_request_trend_line',
                //平均响应时间
                GET_RESP_TIME_TREND_LINE : HOST_ADDRESS + '/application/comparative_analysis/get_resp_time_trend_line',
                //错误数
                GET_ERROR_TREND_LINE : HOST_ADDRESS + '/application/comparative_analysis/get_error_trend_line'

            },
            //外部服务
            external_service :{
                //获取一级url_list
                GET_URL_LIST : HOST_ADDRESS + '/application/external_service/get_url_list',
                //获取二级url_list
                GET_SINGLE_URL_LIST : HOST_ADDRESS + '/application/external_service/getSingleUriList',
                //外部服务的响应时间(Top5)
                GET_RESP_TIME_TREND_CHART : HOST_ADDRESS + '/application/external_service/get_resp_time_trend_chart',
                //吞吐率(Top5)
                GET_RPM_TREND_CHART : HOST_ADDRESS + '/application/external_service/get_rpm_trend_chart',
                //网络错误率(Top5)
                GET_NETWORK_ERROR_TREND_CHART : HOST_ADDRESS + '/application/external_service/get_network_error_trend_chart',
                //吞吐率及响应时间趋势
                GET_RPM_AND_RESP_TIME_TREND_CHART : HOST_ADDRESS + '/application/external_service/get_rpm_and_resp_time_trend_chart',
                //调用者耗时百分比(Top5)
                GET_CALLER_RATE : HOST_ADDRESS + '/application/external_service/get_caller_rate',
                //调用者列表
                GET_CALLER_LIST : HOST_ADDRESS + '/application/external_service/get_caller_list',
                //网络错误类型(Top5)
                GET_ERROR_NETWORK_TYPE_TREND_CHART :  HOST_ADDRESS + '/application/external_service/get_error_network_type_trend_chart',
                //错误列表
                GET_ERROR_LIST : HOST_ADDRESS + '/application/external_service/get_error_list'

            },
            // 应用概览
            AppOverview: {
                //头部指标信息
                GET_TITLE_QUOTA: HOST_ADDRESS + '/application/overview/get_title_quota',
                //慢数据库表
                GET_SLOW_DB_TABLE_CHART: HOST_ADDRESS + '/application/overview/get_slow_db_table_chart',
                //事务健康top5
                GET_HEALTH_AFFAIRS_TOP5: HOST_ADDRESS + '/application/overview/get_health_affairs_top5',
                //数据库实例top5
                GET_DB_INSTANCE_TOP5: HOST_ADDRESS + '/application/overview/get_db_instance_top5',
                //异常top5
                GET_EXCEPTION_TOP5: HOST_ADDRESS + '/application/overview/get_exception_top5',
                //数据错误top5
                GET_ERROR_TYPE_TOP5: HOST_ADDRESS + '/application/overview/get_error_type_top5',
                //外部服务top3
                GET_EXTERNAL_SERVICE_TOP3: HOST_ADDRESS + '/application/overview/get_external_service_top3',
                //主机状态分布
                GET_HOST_STATUS_CHART: HOST_ADDRESS + '/application/overview/get_host_status_chart',
                //慢SQL top5
                GET_SLOW_SQL_TOP5: HOST_ADDRESS + '/application/overview/get_slow_sql_top5',
                SET_APP_STATUS : '/application/app_list/set_app_status',
                //新建分组
                CREATE_APP_GROUP :'/application/app_list/create_app_group',
                //获取应用分组列表
                GET_APP_GROUP :'/application/app_list/get_app_group',
                //更新管理分组
                UPDATE_APP_GROUP : '/application/app_list/update_app_group',
                //删除应用分组
                DELETE_APP_GROUP : '/application/app_list/delete_app_group',
                //加入分组
                SET_APP_GROUP : '/application/app_list/set_app_group',
                //获取分组里的应用
                GET_GROUP_APP : '/application/app_list/get_group_app',
                //修改分组里应用名称
                SET_APP_NAME : '/application/app_list/set_app_name',
                //一键暂停
                PAUSE_APP : '/application/app_list/pause_app',
                //删除分组里的应用
                DELETE_APP_FROM_GROUP : '/application/app_list/delete_app_from_group',
            },
            AppNoSql: {
                //数据库类型列表
                GET_MOUDLE_LIST: HOST_ADDRESS + '/application/nosql/get_module_list',
                //数据库模块和实例列表
                GET_INSTANCE_AND_PST_LIST: HOST_ADDRESS + '/application/nosql/get_instance_and_pst_list',
                //响应时间变化曲线(TOP5)
                GET_RESP_TREND_CHART: HOST_ADDRESS + '/application/nosql/get_overview_resp_trend_chart',
                //吞吐量(TOP5)
                GET_RPM_TREND_CHART: HOST_ADDRESS + '/application/nosql/get_overview_rpm_trend_chart',
                //实例列表
                GET_INSTANCE_LIST: HOST_ADDRESS + '/application/nosql/get_overview_instance_list',
                //调用者耗时百分比(TOP5)
                GET_CALLER_RATE: HOST_ADDRESS + '/application/nosql/get_caller_rate',
                //方法列表
                GET_PST_LIST: HOST_ADDRESS + '/application/nosql/get_pst_list',
                //方法吞吐率与响应时间
                GET_METHOD_RPM_AND_RESP_TIME: HOST_ADDRESS + '/application/nosql/get_method_rpm_and_resp_time',
                //事务列表
                GET_URL_LIST: HOST_ADDRESS + '/application/nosql/get_url_list'
            },
            AppMessageQueue: {
                // 生产者及其channel列表
                GET_INSTANCE_AND_DBN_LIST: HOST_ADDRESS + '/application/message_queue/get_instance_and_dbn_list',
                // mq服务总耗时(TOP5)
                GET_SERVICE_TOTAL_TIME_TREND: HOST_ADDRESS + '/application/message_queue/get_service_total_time_trend',
                // 吞吐率及平均耗时
                GET_RPM_AND_TIME_TREND: HOST_ADDRESS + '/application/message_queue/get_rpm_and_time_trend',
                // 流量趋势图
                GET_FLOW_PM_TREND: HOST_ADDRESS + '/application/message_queue/get_flow_pm_trend',
                // 调用者占比
                GET_CALLER_RATE: HOST_ADDRESS + '/application/message_queue/get_caller_rate',
                // 消费情况列表
                GET_CONSUMER_LIST: HOST_ADDRESS + '/application/message_queue/get_consumer_list',
                // 消费请求列表
                GET_CONSUMER_INSTANCE_LIST: HOST_ADDRESS + '/application/message_queue/get_consumer_instance_list'
            },
            AppSetting: {
                // 获取应用参数
                GET_APP_SETTING: HOST_ADDRESS + '/application/setting/get_app_setting',
                // 更新应用名称
                UPDATE_APP_NAME: HOST_ADDRESS + '/application/setting/update_app_name',
                // 设置应用参数
                UPDATE_APP_SETTING: HOST_ADDRESS + '/application/setting/update_app_setting',
                // 获取异常和错误白名单
                GET_WHITE_LIST: HOST_ADDRESS + '/application/setting/get_white_list',
                // 获取异常和错误单条数据
                GET_WHITE_ITEM: HOST_ADDRESS + '/application/setting/get_white_item',
                // 新增或更新异常白名单
                ADD_OR_UPDATE_EXCEPTION_WHITE: HOST_ADDRESS + '/application/setting/add_or_update_exception_white',
                // 新增或更新错误白名单
                ADD_OR_UPDATE_ERROR_WHITE: HOST_ADDRESS + '/application/setting/add_or_update_error_white',
                // 删除白名单
                DELETE_WHITE: HOST_ADDRESS + '/application/setting/delete_white',
                // 获取异常描述列表
                GET_EXCEPTION_MSG: HOST_ADDRESS + '/application/setting/get_exception_msg',
                // 获取http响应请求列表
                GET_SETTING_URI_LIST: HOST_ADDRESS + '/application/key_transaction/get_setting_uri_list'
            },
            //错误
            Error:{
                //错误和异常趋势
                GET_ERROR_ANALYSIS_ERROR_AND_EXCEPTION_TREND_CHART : HOST_ADDRESS + '/application/error/get_error_and_exception_trend_chart',
                //错误占比TOP5
                GET_ERROR_ANALYSIS_ERROR_RATE_PIE : HOST_ADDRESS + '/application/error/get_error_rate_pie',
                //异常占比TOP5
                GET_ERROR_ANALYSIS_EXCEPTION_RATE_PIE : HOST_ADDRESS + '/application/error/get_exception_rate_pie',
                //错误列表
                GET_ERROR_ANALYSIS_ERROR_LIST : HOST_ADDRESS + '/application/error/get_error_aggs_list',
                //异常列表
                GET_ERROR_ANALYSIS_EXCEPTION_LIST: HOST_ADDRESS + '/application/error/get_exception_aggs_list',
                //详情 二级错误异常趋势图
                GET_SINGLE_ELEMENT_ERROR_TREND_CHART : HOST_ADDRESS + '/application/error/get_single_element_error_trend_chart',
                //详情 二级实例错误异常占比
                GET_SINGLE_ELEMENT_INSTANCE_ERROR_RATE_PIE : HOST_ADDRESS + '/application/error/get_single_element_instance_error_rate_pie',
                //详情 单元素请求错误详情
                GET_SINGLE_ELEMENT_ERROR_DETAIL : HOST_ADDRESS + '/application/error/get_single_element_error_detail',
                //详情 单元素异常详情
                GET_SINGLE_ELEMENT_EXCEPTION : HOST_ADDRESS + '/application/error/get_single_element_exception'
            },
            // 个人中心
            userCenter: {
                updatePwd: HOST_ADDRESS + '/account/user/reset_pwd',
                manager: {
                    GET_GROUP_LIST: HOST_ADDRESS + '/account/user/get_group_list',
                    // 获取用户列表
                    GET_USER_LIST: HOST_ADDRESS + '/account/user/get_user_list',
                    // 更新或添加部门
                    ADD_OR_UPDATE_GROUP: HOST_ADDRESS + '/account/user/add_or_update_group',
                    //删除部门
                    REMOVE_GROUP : HOST_ADDRESS + '/account/user/remove_group',
                    //获取部门信息
                    GET_GROUP_ITEM : HOST_ADDRESS +  '/account/user/get_group_item'
                }
            }

        }
    }
})()





