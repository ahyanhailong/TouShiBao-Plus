<?php
/**
 * @author bear
 * Date: 17/12/7 下午6:25
 */

namespace cloudwise\tsb\datasource\constants;


class AppParamsEnum
{
    const CONTROLLER_NAME_RELATION_OVERVIEW = 'Overview';
    const CONTROLLER_NAME_RELATION_DB = 'RelationDb';
    const CONTROLLER_NAME_TRANSACTION_ANALYSIS = 'TransactionAnalysis';
    const CONTROLLER_NAME_KEYTRANSACTION = 'KeyTransaction';
    const CONTROLLER_NAME_APPLIST = 'AppList';
    const CONTROLLER_NAME_NOSQL = 'Nosql';
    const CONTROLLER_NAME_SETTING = 'Setting';
    const CONTROLLER_NAME_TOPO = 'Topo';
    const CONTROLLER_NAME_COMPARATIVE_ANALYSIS = 'ComparativeAnalysis';
    const CONTROLLER_NAME_EXTERNAL_SERVICE = 'ExternalService';
    const CONTROLLER_NAME_MESSAGE_QUEUE = 'MessageQueue';
    const CONTROLLER_NAME_ERROR = 'Error';

    //应用概览
    const APPLICATION_OVERVIEW_GET_TITLE_QUOTA = 'ApplicationOverviewGetTitleQuota';
    const APPLICATION_OVERVIEW_GET_SLOW_DB_TABLE_CHART = 'ApplicationOverviewGetSlowDbTableChart';
    const APPLICATION_OVERVIEW_GET_HEALTH_AFFAIRS_TOP5 = 'ApplicationOverviewGetHealthAffairsTop5';
    const APPLICATION_OVERVIEW_GET_DB_INSTANCE_TOP5 = 'ApplicationOverviewGetDbInstanceTop5';
    const APPLICATION_OVERVIEW_GET_EXCEPTION_TOP5 = 'ApplicationOverviewGetExceptionTop5';
    const APPLICATION_OVERVIEW_GET_ERROR_TYPE_TOP5 = 'ApplicationOverviewGetErrorTypeTop5';
    const APPLICATION_OVERVIEW_GET_EXTERNAL_SERVICE_TOP3 = 'ApplicationOverviewGetExternalServiceTop3';
    const APPLICATION_OVERVIEW_GET_HOST_STATUS_CHART = 'ApplicationOverviewGetHostStatusChart';
    const APPLICATION_OVERVIEW_GET_SLOW_SQL_TOP5 = 'ApplicationOverviewGetSlowSqlTop5';

    //数据库分析
    const APPLICATION_RELATIONDB_GETDRUIDTEST = 'application_relationdb_getdruidtest';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISDBTRENDLINE = 'ApplicationRelationDbGetTimeAnalysisDbTrendLine';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISDISTRIBUTIONLINE = 'ApplicationRelationDbGetTimeAnalysisDistributionLine';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISAGGSSQLLIST = 'ApplicationRelationDbGetTimeAnalysisAggsSqlList';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISSINGLEELEMENTDBTRENDLINE = 'ApplicationRelationDbGetTimeAnalysisSingleElementDbTrendLine';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISSINGLEELEMENTDISTRIBUTIONLINE = 'ApplicationRelationDbGetTimeAnalysisSingleElementDistributionLine';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISDBCALLER = 'ApplicationRelationDbGetTimeAnalysisDbCaller';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISSNAPSQLLIST = 'ApplicationRelationDbGetTimeAnalysisSnapSqlList';
    const APPLICATION_RELATIONDB_GETTIMEANALYSISDBSTACKTREE = 'ApplicationRelationDbGetTimeAnalysisDbStackTree';

    const APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISDBERRORTRENDLINE = 'ApplicationRelationDbGetExceptionAnalysisDbErrorTrendLine';
    const APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISAGGSSQLERRORLIST = 'ApplicationRelationDbGetExceptionAnalysisAggsSqlErrorList';
    const APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSINGLEELEMENTERRORTRENDLINE = 'ApplicationRelationDbGetExceptionAnalysisSingleElementErrorTrendLine';
    const APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSINGLEELEMENTDBCALLER = 'ApplicationRelationDbGetExceptionAnalysisSingleElementDbCaller';
    const APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSINGLEELEMENTSQLERRORSNAPLIST = 'ApplicationRelationDbGetExceptionAnalysisSingleElementSqlErrorSnapList';
    const APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSQLERRORSTACKTREE = 'ApplicationRelationDbGetExceptionAnalysisSqlErrorStackTree';

    const APPLICATION_RELATIONDB_GETFILTERELEMENTFORDB = 'ApplicationRelationDbGetFilterElementForDb';
    const APPLICATION_RELATIONDB_CREATEEXPORTFILE = 'ApplicationRelationDbCreateExportFile';
    const APPLICATION_RELATIONDB_DELETERELATIONDBFILTRATIONCONDITION = 'ApplicationRelationDbDeleteRelationDbFiltrationCondition';
    const APPLICATION_RELATIONDB_SAVERELATIONDBFILTRATIONCONDITION = 'ApplicationRelationDbSaveRelationDbFiltrationCondition';
    const APPLICATION_RELATIONDB_GETRELATIONDBFILTRATIONCONDITION = 'ApplicationRelationDbGetRelationDbFiltrationCondition';
    const APPLICATION_RELATIONDB_GETCOMMONFILTERLIST = 'ApplicationRelationDbGetCommonFilterList';

    //事务分析概览
    const APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_RESP_AND_RPM_TREND_CHART = 'ApplicationTransactionAnalysisGetOverviewRespAndRpmTrendChart';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_REQUEST_DISTRIBUTION_PIE = 'ApplicationTransactionAnalysisGetOverviewRequestDistributionPie';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_TRANSACTION_LIST = 'ApplicationTransactionAnalysisGetOverviewTransactionList';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_TRANSACTION_POP_LIST = 'ApplicationTransactionAnalysisGetOverviewTransactionPopList';

    //事务分析-仪表盘
    const APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_STATISTICAL_INDICATORS = 'ApplicationTransactionAnalysisGetDashboardStatisticalIndicators';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_TOP_METHODS = 'ApplicationTransactionAnalysisGetDashboardTopMethods';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_SINGLE_URL_STATISTICAL_INDICATORS = 'ApplicationTransactionAnalysisGetDashboardSingleUrlStatisticalIndicatorst';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_RESP_AND_RPM_TREND_CHART = 'ApplicationTransactionAnalysisGetDashboardRespAndRpmTrendChart';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_ERROR_INFO_LIST = 'ApplicationTransactionAnalysisGetDashboardErrorInfoList';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_EXCEPTION_TOP5_LIST = 'ApplicationTransactionAnalysisGetDashboardExceptionTop5List';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_REQUEST_STATISTICS = 'ApplicationTransactionAnalysisGetDashboardRequestStatistics';

    //事务分析-缓慢
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SLOW_ANALYSIS_TIME_DISTRIBUTION_LINE = 'ApplicationTransactionAnalysisGetSlowAnalysisTimeDistributionLine';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SLOW_ANALYSIS_SNAP_LIST = 'ApplicationTransactionAnalysisGetSlowAnalysisSnapList';

    //事务分析-错误
    const APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_SNAP_LIST = 'ApplicationTransactionAnalysisGetErrorAnalysisSnapList';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_ERROR_EXCEPTION_COUNT_CHART = 'ApplicationTransactionAnalysisGetErrorAnalysisErrorExceptionCountChart';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_ERROR_RATE_PIE = 'ApplicationTransactionAnalysisGetErrorAnalysisErrorRatePie';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_EXCEPTION_RATE_PIE = 'ApplicationTransactionAnalysisGetErrorAnalysisExceptionRatePie';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_TIME_SNAP_LIST = 'ApplicationTransactionAnalysisGetErrorAnalysisTimeSnapList';

    //事务分析-快照
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SNAP_ANALYSIS_DISTRIBUTION_LINE = 'ApplicationTransactionAnalysisGetSnapAnalysisTimeDistributionLine';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SNAP_ANALYSIS_SNAP_LIST = 'ApplicationTransactionAnalysisGetSnapAnalysisSnapList';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SNAP_ANALYSIS_SNAP_FILTER = 'ApplicationTransactionAnalysisGetSnapAnalysisSnapFilter';

    //事务分析-单次追踪
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SINGLE_TOPO_DATA = 'ApplicationTransactionAnalysisGetSingleTopoData';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SINGLE_DETAIL_DATA = 'ApplicationTransactionAnalysisGetSingleDetailData';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SINGLE_CALLED_API_SNAP_TOPO = 'ApplicationTransactionAnalysisGetSingleCalledApiSnapTopo';
    const APPLICATION_TRANSACTION_ANALYSIS_GET_SINGLE_RESOURCE_SEQUENCE_DIAGRAM = 'ApplicationTransactionAnalysisGetSingleResourceSequenceDiagram';


    //应用关键事务
    const APPLICATION_KEYTRANSACTION_GETKEYTRANSACTIONLIST = 'ApplicationKeyTransactionGetKeyTransactionList';
    const APPLICATION_KEYTRANSACTION_GETPROFILINGSTATISTICALINDICATORS = 'ApplicationKeyTransactionGetProfilingStatisticalIndicators';
    const APPLICATION_KEYTRANSACTION_GETPROFILINGSINGLEURLSTATISTICALINDICATORST = 'ApplicationKeyTransactionGetProfilingSingleUrlStatisticalIndicatorst';
    const APPLICATION_KEYTRANSACTION_GETPROFILINGREQUESTSTATISTICS = 'ApplicationKeyTransactionGetProfilingRequestStatistics';
    const APPLICATION_KEYTRANSACTION_GETPROFILINGRESPTIMEANDCOUNTDATAMIXED = 'ApplicationKeyTransactionGetProfilingRespTimeAndCountDataMixed';
    const APPLICATION_KEYTRANSACTION_GETPROFILINGERRORANDEXCEPTIONTRENDCHART = 'ApplicationKeyTransactionGetProfilingErrorAndExceptionTrendChart';
    const APPLICATION_KEYTRANSACTION_GETPROFILINGAPDEXANALYSISTRENDCHART = 'ApplicationKeyTransactionGetProfilingApdexAnalysisTrendChart';
    const APPLICATION_KEYTRANSACTION_GETERRORANALYSISERRORANDEXCEPTIONTRENDCHART = 'ApplicationKeyTransactionGetErrorAnalysisErrorAndExceptionTrendChart';
    const APPLICATION_KEYTRANSACTION_GETERRORANALYSISERRORRATEPIE = 'ApplicationKeyTransactionGetErrorAnalysisErrorRatePie';
    const APPLICATION_KEYTRANSACTION_GETERRORANALYSISEXCEPTIONRATEPIE = 'ApplicationKeyTransactionGetErrorAnalysisExceptionRatePie';
    const APPLICATION_KEYTRANSACTION_GETERRORANALYSISERRORLIST = 'ApplicationKeyTransactionGetErrorAnalysisErrorList';
    const APPLICATION_KEYTRANSACTION_GETERRORANALYSISEXCEPTIONLIST = 'ApplicationKeyTransactionGetErrorAnalysisExceptionList';
    const APPLICATION_KEYTRANSACTION_GETSQLANALYSISTIMEANDRPMTRENDCHART = 'ApplicationKeyTransactionGetSqlAnalysisTimeAndRpmTrendChart';
    const APPLICATION_KEYTRANSACTION_GETSQLANALYSISTIMEDISTRIBUTIONLINE = 'ApplicationKeyTransactionGetSqlAnalysisTimeDistributionLine';
    const APPLICATION_KEYTRANSACTION_GETSQLANALYSISSQLAGGSLIST = 'ApplicationKeyTransactionGetSqlAnalysisSqlAggsList';
    const APPLICATION_KEYTRANSACTION_GETSNAPANALYSISTIMEDISTRIBUTIONLINE = 'ApplicationKeyTransactionGetSnapAnalysisTimeDistributionLine';
    const APPLICATION_KEYTRANSACTION_GETSNAPANALYSISSQLSNAPLIST = 'ApplicationKeyTransactionGetSnapAnalysisSqlSnapList';
    const APPLICATION_KEYTRANSACTION_GETSETTINGURLLIST = 'ApplicationKeyTransactionGetSettingUrlList';
    const APPLICATION_KEYTRANSACTION_CREATEKEYTRANSACTION = 'ApplicationKeyTransactionCreateKeyTransaction';
    const APPLICATION_KEYTRANSACTION_GETSETTINGURILIST = 'ApplicationKeyTransactionGetSettingUriList';
    const APPLICATION_KEYTRANSACTION_DELETETRANSACTION = 'ApplicationKeyTransactionDeleteTransaction';
    const APPLICATION_KEYTRANSACTION_UPDATETRANSACTION = 'ApplicationKeyTransactionUpdateTransaction';
    const APPLICATION_KEYTRANSACTION_GETSINGLETRANSACTIONDATA = 'ApplicationKeyTransactionGetSingleTransactionData';

    //nosql
    const APPLICATION_NOSQL_GET_MODULE_LIST = 'ApplicationNosqlGetModuleList';
    const APPLICATION_NOSQL_GET_INSTANCE_AND_PST_LIST = 'ApplicationNosqlGetInstanceAndPstList';
    const APPLICATION_NOSQL_GET_OVERVIEW_RESP_TREND_CHART = 'ApplicationNosqlGetOverviewRespTrendChart';
    const APPLICATION_NOSQL_GET_OVERVIEW_RPM_TREND_CHART = 'ApplicationNosqlGetOverviewRpmTrendChart';
    const APPLICATION_NOSQL_GET_OVERVIEW_INSTANCE_LIST = 'ApplicationNosqlGetOverviewInstanceList';
    const APPLICATION_NOSQL_GET_METHOD_RPM_AND_RESP_TIME = 'ApplicationNosqlGetMethodRpmAndRespTime';
    const APPLICATION_NOSQL_GET_CALLER_RATE = 'ApplicationNosqlGetCallerRate';
    const APPLICATION_NOSQL_GET_PST_LIST = 'ApplicationNosqlGetPstList';
    const APPLICATION_NOSQL_GET_URL_LIST = 'ApplicationNosqlGetUrlList';

    //应用列表
    const APPLICATION_APPLIST_GETAPPLIST = 'ApplicationAppListGetAppList';
    const APPLICATION_APPLIST_GETAPPHEALTHSTATUS = 'ApplicationAppListGetAppHealthStatus';
    const APPLICATION_APPLIST_GETHOSTLIST = 'ApplicationAppListGetHostList';
    const APPLICATION_APPLIST_SETAPPSTATUS = 'ApplicationAppListSetAppStatus';
    const APPLICATION_APPLIST_CREATEAPPGROUP = 'ApplicationAppListCreateAppGroup';
    const APPLICATION_APPLIST_GETAPPGROUP = 'ApplicationAppListGetAppGroup';
    const APPLICATION_APPLIST_UPDATEAPPGROUP = 'ApplicationAppListUpdateAppGroup';
    const APPLICATION_APPLIST_DELETEAPPGROUP = 'ApplicationAppListDeleteAppGroup';
    const APPLICATION_APPLIST_SETAPPGROUP = 'ApplicationAppListSetAppGroup';
    const APPLICATION_APPLIST_GETGROUPAPP = 'ApplicationAppListGetGroupApp';
    const APPLICATION_APPLIST_SETAPPNAME = 'ApplicationAppListSetAppName';
    const APPLICATION_APPLIST_PAUSEAPP = 'ApplicationAppListPauseApp';
    const APPLICATION_APPLIST_DELETEAPPFROMGROUP = 'ApplicationAppListDeleteAppFromGroup';


    //应用设置
    const APPLICATION_SETTING_GET_APP_LIST = 'ApplicationSettingGetAppList';
    const APPLICATION_SETTING_GET_APP_SETTING = 'ApplicationSettingGetAppSetting';
    const APPLICATION_SETTING_UPDATE_APP_SETTING = 'ApplicationSettingUpdateAppSetting';
    const APPLICATION_SETTING_GET_WHITE_LIST = 'ApplicationSettingGetWhiteList';
    const APPLICATION_SETTING_GET_WHITE_ITEM = 'ApplicationSettingGetWhiteItem';
    const APPLICATION_SETTING_ADD_OR_UPDATE_ERROR_WHITE = 'ApplicationSettingAddOrUpdateErrorWhite';
    const APPLICATION_SETTING_DELETE_WHITE = 'ApplicationSettingDeleteWhite';
    const APPLICATION_SETTING_ADD_OR_UPDATE_EXCEPTION_WHITE = 'ApplicationSettingAddOrUpdateExceptionWhite';
    const APPLICATION_SETTING_GET_EXCEPTION_MSG = 'ApplicationSettingGetExceptionMsg';
    const APPLICATION_SETTING_UPDATE_APP_NAME = 'ApplicationSettingUpdateAppName';
    const APPLICATION_SETTING_GETPLUGININFO = 'ApplicationSettingGetPluginInfo';


    //应用拓扑
    const APPLICATION_TOPO_GETTOPODATA = 'ApplicationTopoGetTopoData';
    const APPLICATION_TOPO_GETREQUESTSTATISTICSTABLE = 'ApplicationTopoGetRequestStatisticsTable';
    const APPLICATION_TOPO_GETREQUESTTRENDCHART = 'ApplicationTopoGetRequestTrendChart';
    const APPLICATION_TOPO_GETRESPTIMETRENDCHART = 'ApplicationTopoGetRespTimeTrendChart';
    const APPLICATION_TOPO_GETERRORTRENDCHART = 'ApplicationTopoGetErrorTrendChart';
    const APPLICATION_TOPO_GETTOPOLAYOUT = 'ApplicationTopoGetTopoLayout';
    const APPLICATION_TOPO_GETTOPOINSTANCEINFO = 'ApplicationTopoGetTopoInstanceInfo';
    const APPLICATION_TOPO_SAVETOPOLAYOUT = 'ApplicationTopoSaveTopoLayout';
    const APPLICATION_TOPO_GETAPPCURRENTSTATUS = 'ApplicationTopoGetAppCurrentStatus';
    const APPLICATION_TOPO_GETAPPNAME = 'ApplicationTopoGetAppName';


    //对比分析接口
    const APPLICATION_COMPARATIVE_ANALYSIS_GETURILIST = 'ApplicationComparativeAnalysisGetUriList';
    const APPLICATION_COMPARATIVE_ANALYSIS_GETHOSTLIST = 'ApplicationComparativeAnalysisGetHostList';
    const APPLICATION_COMPARATIVE_ANALYSIS_GETREQUESTTRENDLINE = 'ApplicationComparativeAnalysisGetRequestTrendLine';
    const APPLICATION_COMPARATIVE_ANALYSIS_GETRESPTIMETRENDLINE = 'ApplicationComparativeAnalysisGetRespTimeTrendLine';
    const APPLICATION_COMPARATIVE_ANALYSIS_GETERRORTRENDLINE = 'ApplicationComparativeAnalysisGetErrorTrendLine';


    //消息队列接口
    const APPLICATION_MESSAGE_QUEUE_GET_INSTANCE_AND_DBN_LIST = 'ApplicationMessageQueueGetInstanceAndDbnList';
    const APPLICATION_MESSAGE_QUEUE_GET_SERVICE_TOTAL_TIME_TREND = 'ApplicationMessageQueueGetServiceTotalTimeTrend';
    const APPLICATION_MESSAGE_QUEUE_GET_RPM_AND_TIME_TREND_CHART = 'ApplicationMessageQueueGetRpmAndTimeTrend';
    const APPLICATION_MESSAGE_QUEUE_GET_FLOW_PM_TREND = 'ApplicationMessageQueueGetFlowPmTrend';
    const APPLICATION_MESSAGE_QUEUE_GET_CALLER_RATE = 'ApplicationMessageQueueGetCallerRate';
    const APPLICATION_MESSAGE_QUEUE_GET_CONSUMER_LIST = 'ApplicationMessageQueueGetConsumerList';
    const APPLICATION_MESSAGE_QUEUE_GET_CONSUMER_INSTANCE_LIST = 'ApplicationMessageQueueGetConsumerInstanceList';

    //外部服务接口
    const APPLICATION_EXTERNAL_SERVICE_GETURLLIST = 'ApplicationExternalServiceGetUrlList';
    const APPLICATION_EXTERNAL_SERVICE_GETRESPTIMETRENDCHART = 'ApplicationExternalServiceGetRespTimeTrendChart';
    const APPLICATION_EXTERNAL_SERVICE_GETRPMTRENDCHART = 'ApplicationExternalServiceGetRpmTrendChart';
    const APPLICATION_EXTERNAL_SERVICE_GETNETWORKERRORTRENDCHART = 'ApplicationExternalServiceGetNetworkErrorTrendChart';
    const APPLICATION_EXTERNAL_SERVICE_GETRPMANDRESPTIMETRENDCHART = 'ApplicationExternalServiceGetRpmAndRespTimeTrendChart';
    const APPLICATION_EXTERNAL_SERVICE_GETCALLERRATE = 'ApplicationExternalServiceGetCallerRate';
    const APPLICATION_EXTERNAL_SERVICE_GETCALLERLIST = 'ApplicationExternalServiceGetCallerList';
    const APPLICATION_EXTERNAL_SERVICE_GETERRORNETWORKTYPETRENDCHART = 'ApplicationExternalServiceGetErrorNetworkTypeTrendChart';
    const APPLICATION_EXTERNAL_SERVICE_GETERRORLIST = 'ApplicationExternalServiceGetErrorList';
    const APPLICATION_EXTERNAL_SERVICE_GETURIRPMANDRESPTIMETRENDCHART = 'ApplicationExternalServiceGetUriRpmAndRespTimeTrendChart';
    const APPLICATION_EXTERNAL_SERVICE_GETURICALLERRATE = 'ApplicationExternalServiceGetUriCallerRate';
    const APPLICATION_EXTERNAL_SERVICE_GETURICALLERLIST = 'ApplicationExternalServiceGetUriCallerList';
    const APPLICATION_EXTERNAL_SERVICE_GETURIERRORNETWORKTYPETRENDCHART = 'ApplicationExternalServiceGetUriErrorNetworkTypeTrendChart';
    const APPLICATION_EXTERNAL_SERVICE_GETURIERRORLIST = 'ApplicationExternalServiceGetUriErrorList';
    const APPLICATION_EXTERNAL_SERVICE_GETSINGLEURILIST = 'ApplicationExternalServiceGetSingleUriList';


    //错误异常
    const APPLICATION_ERROR_GETERRORANDEXCEPTIONTRENDCHART = 'ApplicationErrorGetErrorAndExceptionTrendChart';
    const APPLICATION_ERROR_GETERRORRATEPIE = 'ApplicationErrorGetErrorRatePie';
    const APPLICATION_ERROR_GETEXCEPTIONRATEPIE = 'ApplicationErrorGetExceptionRatePie';
    const APPLICATION_ERROR_GETERRORAGGSLIST = 'ApplicationErrorGetErrorAggsList';
    const APPLICATION_ERROR_GETEXCEPTIONAGGSLIST = 'ApplicationErrorGetExceptionAggsList';

    const APPLICATION_ERROR_GETSINGLEELEMENTERRORTRENDCHART = 'ApplicationErrorGetSingleElementErrorTrendChart';
    const APPLICATION_ERROR_GETSINGLEELEMENTINSTANCEERRORRATEPIE = 'ApplicationErrorGetSingleElementInstanceErrorRatePie';
    const APPLICATION_ERROR_GETSINGLEELEMENTSTATISTICSERRORPIE = 'ApplicationErrorGetSingleElementStatisticsErrorPie';
    const APPLICATION_ERROR_GETSINGLEELEMENTREQUESTDETAIL = 'ApplicationErrorGetSingleElementRequestDetail';
    const APPLICATION_ERROR_GETSINGLEELEMENTERRORDETAIL = 'ApplicationErrorGetSingleElementErrorDetail';
    const APPLICATION_ERROR_GETSINGLEELEMENTEXCEPTION = 'ApplicationErrorGetSingleElementException';
    const APPLICATION_ERROR_GETERRORFILTERLIST = 'ApplicationErrorGetErrorFilterList';


    public static $transactionParamsList = [
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_REQUEST_DISTRIBUTION_PIE           => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_TRANSACTION_LIST                   => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'avgTime'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => 1],
            'page_size'  => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_TRANSACTION_POP_LIST               => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'avg_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => 1],
            'page_size'  => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
            'index'      => '',
            'type'       => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_STATISTICAL_INDICATORS            => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'filter'     => ['user'],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_TOP_METHODS                       => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'top_type'   => ['default' => 'db'],
            'top_size'   => ['default' => 3],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_SINGLE_URL_STATISTICAL_INDICATORS => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_RESP_AND_RPM_TREND_CHART          => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_REQUEST_STATISTICS                => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_ERROR_INFO_LIST                   => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_DASHBOARD_EXCEPTION_TOP5_LIST               => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_OVERVIEW_RESP_AND_RPM_TREND_CHART           => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'percent'    => ['default' => 0],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SLOW_ANALYSIS_TIME_DISTRIBUTION_LINE        => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SLOW_ANALYSIS_SNAP_LIST                     => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'resp_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => '1'],
            'uri'        => '',
            'page_size'  => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_SNAP_LIST                    => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'resp_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => '1'],
            'uri'        => '',
            'page_size'  => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_ERROR_EXCEPTION_COUNT_CHART  => [
            'filter'     => ['user'],
            'uri'        => '',
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_ERROR_RATE_PIE               => [
            'filter'     => ['user'],
            'uri'        => '',
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_EXCEPTION_RATE_PIE           => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_ERROR_ANALYSIS_TIME_SNAP_LIST               => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
            'order'      => ['default' => 'resp_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => 1],
            'page_size'  => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SNAP_ANALYSIS_DISTRIBUTION_LINE             => [
            'filter'     => ['user'],
            'uri'        => '',
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SNAP_ANALYSIS_SNAP_LIST                     => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
            'order'      => ['default' => 'resp_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => 1],
            'page_size'  => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SNAP_ANALYSIS_SNAP_FILTER                   => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
            'order'      => ['default' => 'resp_time'],
            'sort'       => ['default' => 'desc'],
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SINGLE_TOPO_DATA                            => [
            'filter'     => ['user'],
            'request_id' => '',
            'r_id'       => '',
            'doc_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SINGLE_DETAIL_DATA                          => [
            'filter'     => ['user'],
            'request_id' => '',
            'r_id'       => '',
            'doc_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TRANSACTION_ANALYSIS_GET_SINGLE_CALLED_API_SNAP_TOPO                 => [
            'filter'     => ['user'],
            'request_id' => '',
            //            'app_from'   => ['array' => '参数必须为数组格式'],
            'app_from'   => '',
            'app_to'     => '',
            'start_time' => '',
            'end_time'   => '',
            'page'       => ['default' => 1],
            'page_size'  => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
        ],
    ];

    public static $relationDbParams = [
        self::APPLICATION_RELATIONDB_GETDRUIDTEST                                      => [
            'app_id' => '',
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISDBTRENDLINE                        => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISDISTRIBUTIONLINE                   => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISAGGSSQLLIST                        => [
            'filter'    => [
                'user',
            ],
            'app_id'    => '',
            'page'      => [
                'default' => 1,
            ],
            'page_size' => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
            'order'     => ['default' => 'wt'],
            'sort'      => ['default' => 'desc'],
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISSINGLEELEMENTDBTRENDLINE           => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'sql'    => '',
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISSINGLEELEMENTDISTRIBUTIONLINE      => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'sql'    => '',
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISDBCALLER                           => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'sql'    => '',
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISSNAPSQLLIST                        => [
            'filter'    => [
                'user',
            ],
            'app_id'    => '',
            'sql'       => '',
            'order'     => ['default' => 'happen_time'],
            'sort'      => ['default' => 'desc'],
            'page'      => ['default' => 1],
            'page_size' => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
        ],
        self::APPLICATION_RELATIONDB_GETTIMEANALYSISDBSTACKTREE                        => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'sql'    => '',
        ],
        self::APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISDBERRORTRENDLINE              => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
        ],
        self::APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISAGGSSQLERRORLIST              => [
            'filter'    => [
                'user',
            ],
            'app_id'    => '',
            'page'      => ['default' => 1],
            'page_size' => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
            'order'     => ['default' => 'count'],
            'sort'      => ['default' => 'desc'],
        ],
        self::APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSINGLEELEMENTERRORTRENDLINE   => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'sql'    => '',
        ],
        self::APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSINGLEELEMENTDBCALLER         => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'sql'    => '',
        ],
        self::APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSINGLEELEMENTSQLERRORSNAPLIST => [
            'filter'    => [
                'user',
            ],
            'app_id'    => '',
            'sql'       => '',
            'page'      => ['default' => 1],
            'page_size' => [
                'default' => AjaxPageEnum::PAGE_DEFAULT,
            ],
            'order'     => ['default' => 'happen_time'],
            'sort'      => ['default' => 'desc'],
        ],
        self::APPLICATION_RELATIONDB_GETEXCEPTIONANALYSISSQLERRORSTACKTREE             => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'request_id' => '',
        ],
        self::APPLICATION_RELATIONDB_GETFILTERELEMENTFORDB                             => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_RELATIONDB_CREATEEXPORTFILE                                  => [
            'filter'     => ['user'],
            'app_id'     => '',
            'end_time'   => '',
            'start_time' => '',
        ],
        self::APPLICATION_RELATIONDB_DELETERELATIONDBFILTRATIONCONDITION               => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'record_id'  => '',
        ],
        self::APPLICATION_RELATIONDB_SAVERELATIONDBFILTRATIONCONDITION                 => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_RELATIONDB_GETRELATIONDBFILTRATIONCONDITION                  => [
            'filter'     => ['user'],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_RELATIONDB_GETCOMMONFILTERLIST                  => [
            'field'     => '',
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
    ];

    public static $overviewParams = [
        self::APPLICATION_OVERVIEW_GET_TITLE_QUOTA           => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_OVERVIEW_GET_SLOW_SQL_TOP5         => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_OVERVIEW_GET_HOST_STATUS_CHART     => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'cpu_burden'],
            'sort'       => ['default' => 'desc'],
        ],
        self::APPLICATION_OVERVIEW_GET_EXTERNAL_SERVICE_TOP3 => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_OVERVIEW_GET_ERROR_TYPE_TOP5       => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_OVERVIEW_GET_EXCEPTION_TOP5        => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_OVERVIEW_GET_DB_INSTANCE_TOP5      => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_OVERVIEW_GET_HEALTH_AFFAIRS_TOP5   => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_OVERVIEW_GET_SLOW_DB_TABLE_CHART   => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
    ];

    public static $keyTransactionParams = [
        self::APPLICATION_KEYTRANSACTION_GETSINGLETRANSACTIONDATA                    => [
            'filter'      => [
                'user',
            ],
            'business_id' => '',
        ],
        self::APPLICATION_KEYTRANSACTION_UPDATETRANSACTION                           => [
            'filter'        => [
                'user',
            ],
            'business_id'   => '',
            'business_type' => '',
            'name'          => '',
            'apdex'         => '',
            'uri'           => '',
        ],
        self::APPLICATION_KEYTRANSACTION_DELETETRANSACTION                           => [
            'filter'      => [
                'user',
            ],
            'business_id' => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETSETTINGURILIST                           => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETPROFILINGRESPTIMEANDCOUNTDATAMIXED       => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETPROFILINGREQUESTSTATISTICS               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETPROFILINGSINGLEURLSTATISTICALINDICATORST => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETPROFILINGSTATISTICALINDICATORS           => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETKEYTRANSACTIONLIST                       => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
        ],
        self::APPLICATION_KEYTRANSACTION_CREATEKEYTRANSACTION                        => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETSETTINGURLLIST                           => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETSNAPANALYSISSQLSNAPLIST                  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETSNAPANALYSISTIMEDISTRIBUTIONLINE         => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETSQLANALYSISSQLAGGSLIST                   => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETSQLANALYSISTIMEDISTRIBUTIONLINE          => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETSQLANALYSISTIMEANDRPMTRENDCHART          => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETERRORANALYSISEXCEPTIONLIST               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETERRORANALYSISERRORLIST                   => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'uri'        => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETERRORANALYSISEXCEPTIONRATEPIE            => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETERRORANALYSISERRORRATEPIE                => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETERRORANALYSISERRORANDEXCEPTIONTRENDCHART => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETPROFILINGAPDEXANALYSISTRENDCHART         => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_KEYTRANSACTION_GETPROFILINGERRORANDEXCEPTIONTRENDCHART     => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],

    ];

    public static $nosqlParams = [
        self::APPLICATION_NOSQL_GET_MODULE_LIST               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_NOSQL_GET_INSTANCE_AND_PST_LIST     => [
            'filter'        => [
                'user',
            ],
            'app_id'        => '',
            'start_time'    => '',
            'end_time'      => '',
            'service_type'  => '',
            'memcache_flag' => ['default' => 0],
        ],
        self::APPLICATION_NOSQL_GET_OVERVIEW_RESP_TREND_CHART => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_NOSQL_GET_OVERVIEW_RPM_TREND_CHART  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_NOSQL_GET_OVERVIEW_INSTANCE_LIST    => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'execute_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => 1],
            'page_size'  => ['default' => 5],
        ],
        self::APPLICATION_NOSQL_GET_METHOD_RPM_AND_RESP_TIME  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'instance'   => '',
            'method'     => '',
        ],
        self::APPLICATION_NOSQL_GET_CALLER_RATE               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_NOSQL_GET_PST_LIST                  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'instance'   => '',
            'order'      => ['default' => 'execute_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => 1],
            'page_size'  => ['default' => 5],
        ],
        self::APPLICATION_NOSQL_GET_URL_LIST                  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'execute_time'],
            'sort'       => ['default' => 'desc'],
            'page'       => ['default' => 1],
            'page_size'  => ['default' => 5],
        ],
    ];

    public static $appListParams = [
        self::APPLICATION_APPLIST_DELETEAPPFROMGROUP => [
            'filter'       => [
                'user',
            ],
            'app_group_id' => '',
            'app_id'       => '',
        ],
        self::APPLICATION_APPLIST_PAUSEAPP           => [
            'filter' => [
                'user',
            ],
            'pause'  => '',
        ],
        self::APPLICATION_APPLIST_SETAPPNAME         => [
            'filter'   => [
                'user',
            ],
            'app_id'   => '',
            'app_name' => '',
        ],
        self::APPLICATION_APPLIST_GETGROUPAPP        => [
            'filter'         => [
                'user',
            ],
            'app_group_id'   => '',
            'app_group_name' => '',
            'name'           => '',
        ],
        self::APPLICATION_APPLIST_SETAPPGROUP        => [
            'filter'       => [
                'user',
            ],
            'app_group_id' => '',
            'app_ids'      => '',
        ],
        self::APPLICATION_APPLIST_DELETEAPPGROUP     => [
            'filter'       => [
                'user',
            ],
            'app_group_id' => '',
        ],
        self::APPLICATION_APPLIST_UPDATEAPPGROUP     => [
            'filter'         => [
                'user',
            ],
            'app_group_id'   => '',
            'app_group_name' => '',
        ],
        self::APPLICATION_APPLIST_GETAPPGROUP        => [
            'filter' => [
                'user',
            ],

        ],
        self::APPLICATION_APPLIST_CREATEAPPGROUP     => [
            'filter'         => [
                'user',
            ],
            'app_group_name' => '',
        ],
        self::APPLICATION_APPLIST_SETAPPSTATUS       => [
            'filter'  => [
                'user',
            ],
            'app_ids' => '',
            'status'  => '',
        ],
        self::APPLICATION_APPLIST_GETHOSTLIST        => [
            'filter'  => [
                'user',
            ],
            'app_ids' => '',
        ],
        self::APPLICATION_APPLIST_GETAPPHEALTHSTATUS => [
            'filter'  => [
                'user',
            ],
            'app_ids' => '',
        ],
        self::APPLICATION_APPLIST_GETAPPLIST         => [
            'filter' => [
                'user',
            ],

        ],
    ];

    public static $settingParams = [
        self::APPLICATION_SETTING_GET_APP_SETTING               => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
        ],
        self::APPLICATION_SETTING_GET_APP_LIST            => [
            'filter' => [
                'user',
            ],
        ],
        self::APPLICATION_SETTING_UPDATE_APP_SETTING            => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'type'   => '',
            'params' => '',
        ],
        self::APPLICATION_SETTING_GET_WHITE_LIST                => [
            'filter'    => [
                'user',
            ],
            'app_id'    => '',
            'type'      => '',
            'page'      => ['default' => 1],
            'page_size' => ['default' => 5],
        ],
        self::APPLICATION_SETTING_GET_WHITE_ITEM                => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'type'   => '',
            'id'     => '',
        ],
        self::APPLICATION_SETTING_ADD_OR_UPDATE_ERROR_WHITE     => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'uri'        => ['array' => 'uri必须为数组'],
            'error_code' => '',
        ],
        self::APPLICATION_SETTING_DELETE_WHITE                  => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
            'id'     => '',
        ],
        self::APPLICATION_SETTING_ADD_OR_UPDATE_EXCEPTION_WHITE => [
            'filter'      => [
                'user',
            ],
            'app_id'      => '',
            'description' => '',
        ],
        self::APPLICATION_SETTING_GET_EXCEPTION_MSG             => [
            'filter'    => [
                'user',
            ],
            'app_id'    => '',
            'search_ex' => ['default' => ''],
        ],
        self::APPLICATION_SETTING_UPDATE_APP_NAME               => [
            'filter'   => [
                'user',
            ],
            'app_id'   => '',
            'app_name' => '',
        ],
        self::APPLICATION_SETTING_GETPLUGININFO               => [
//            'host_type'   => '',
//            'service_type' => '',
        ],
    ];

    public static $topoParams = [
        self::APPLICATION_TOPO_GETAPPNAME                => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
        ],
        self::APPLICATION_TOPO_GETAPPCURRENTSTATUS       => [
            'filter' => [
                'user',
            ],
            'app_id' => '',
        ],
        self::APPLICATION_TOPO_SAVETOPOLAYOUT            => [
            'filter'         => [
                'user',
            ],
            'app_id'         => '',
            'nodes_position' => '',
        ],
        self::APPLICATION_TOPO_GETTOPOINSTANCEINFO       => [
            'filter'     => [
                'user',
            ],
            'app_to_db'  => '',
            'node_id'    => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TOPO_GETTOPODATA               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TOPO_GETREQUESTSTATISTICSTABLE => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TOPO_GETREQUESTTRENDCHART      => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TOPO_GETRESPTIMETRENDCHART     => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TOPO_GETERRORTRENDCHART        => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_TOPO_GETTOPOLAYOUT             => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
    ];

    public static $comparativeAnalysisParams = [
        self::APPLICATION_COMPARATIVE_ANALYSIS_GETERRORTRENDLINE    => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_COMPARATIVE_ANALYSIS_GETRESPTIMETRENDLINE => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_COMPARATIVE_ANALYSIS_GETREQUESTTRENDLINE  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_COMPARATIVE_ANALYSIS_GETHOSTLIST          => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_COMPARATIVE_ANALYSIS_GETURILIST           => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
    ];

    public static $messageQueue = [
        self::APPLICATION_MESSAGE_QUEUE_GET_INSTANCE_AND_DBN_LIST    => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'order'      => ['default' => 'resp_time'],
            'sort'       => ['default' => 'desc'],
        ],
        self::APPLICATION_MESSAGE_QUEUE_GET_SERVICE_TOTAL_TIME_TREND => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_MESSAGE_QUEUE_GET_RPM_AND_TIME_TREND_CHART => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_MESSAGE_QUEUE_GET_FLOW_PM_TREND            => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_MESSAGE_QUEUE_GET_CALLER_RATE              => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_MESSAGE_QUEUE_GET_CONSUMER_LIST            => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'page'       => ['default' => 1],
            'page_size'  => ['default' => 5],
        ],
        self::APPLICATION_MESSAGE_QUEUE_GET_CONSUMER_INSTANCE_LIST   => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'page'       => ['default' => 1],
            'page_size'  => ['default' => 5],
        ],
    ];

    public static $externalServiceParams = [
        self::APPLICATION_EXTERNAL_SERVICE_GETURLLIST                     => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETRESPTIMETRENDCHART          => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETRPMTRENDCHART               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETNETWORKERRORTRENDCHART      => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETRPMANDRESPTIMETRENDCHART    => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETCALLERRATE                  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETCALLERLIST                  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETERRORNETWORKTYPETRENDCHART  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETERRORLIST                   => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETURIRPMANDRESPTIMETRENDCHART => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
            'uri'        => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETURICALLERRATE               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
            'uri'        => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETURICALLERLIST               => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
            'uri'        => '',
        ],

        self::APPLICATION_EXTERNAL_SERVICE_GETURIERRORNETWORKTYPETRENDCHART => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
            'uri'        => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETURIERRORLIST                  => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
            'uri'        => '',
        ],
        self::APPLICATION_EXTERNAL_SERVICE_GETSINGLEURILIST                 => [
            'filter'     => [
                'user',
            ],
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'domain'     => '',
            'port'       => '',
        ],
    ];

    public static $errorParams = [
        self::APPLICATION_ERROR_GETERRORANDEXCEPTIONTRENDCHART => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_ERROR_GETERRORRATEPIE => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_ERROR_GETEXCEPTIONRATEPIE => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_ERROR_GETERRORAGGSLIST => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_ERROR_GETEXCEPTIONAGGSLIST => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
        self::APPLICATION_ERROR_GETSINGLEELEMENTERRORTRENDCHART => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'url'=>'',
        ],
        self::APPLICATION_ERROR_GETSINGLEELEMENTINSTANCEERRORRATEPIE => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'url'=>'',
        ],
        self::APPLICATION_ERROR_GETSINGLEELEMENTSTATISTICSERRORPIE => [
            'app_id'     => '',
            'url'=>'',
        ],
        self::APPLICATION_ERROR_GETSINGLEELEMENTREQUESTDETAIL => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'url'=>'',
        ],
        self::APPLICATION_ERROR_GETSINGLEELEMENTERRORDETAIL => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'url'=>'',
            'error_code'=>'',
        ],
        self::APPLICATION_ERROR_GETSINGLEELEMENTEXCEPTION => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
            'url'=>'',
//            'method_exception'=>'',
//            'error_msg'=>'',
        ],
        self::APPLICATION_ERROR_GETERRORFILTERLIST => [
            'app_id'     => '',
            'start_time' => '',
            'end_time'   => '',
        ],
    ];

    public static function getControllerParams($controller)
    {
        $params = [];
        switch ($controller) {
            case self::CONTROLLER_NAME_TRANSACTION_ANALYSIS:
                $params = self::$transactionParamsList;
                break;
            case self::CONTROLLER_NAME_RELATION_DB:
                $params = self::$relationDbParams;
                break;
            case self::CONTROLLER_NAME_RELATION_OVERVIEW:
                $params = self::$overviewParams;
                break;
            case self::CONTROLLER_NAME_KEYTRANSACTION:
                $params = self::$keyTransactionParams;
                break;
            case self::CONTROLLER_NAME_NOSQL:
                $params = self::$nosqlParams;
                break;
            case self::CONTROLLER_NAME_APPLIST:
                $params = self::$appListParams;
                break;
            case self::CONTROLLER_NAME_SETTING:
                $params = self::$settingParams;
                break;
            case self::CONTROLLER_NAME_TOPO:
                $params = self::$topoParams;
                break;
            case self::CONTROLLER_NAME_COMPARATIVE_ANALYSIS:
                $params = self::$comparativeAnalysisParams;
                break;
            case self::CONTROLLER_NAME_MESSAGE_QUEUE:
                $params = self::$messageQueue;
                break;
            case self::CONTROLLER_NAME_EXTERNAL_SERVICE:
                $params = self::$externalServiceParams;
                break;
            case self::CONTROLLER_NAME_ERROR:
                $params = self::$errorParams;
                break;
        }

        return $params;
    }
}