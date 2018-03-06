<?php
namespace cloudwise\tsb\datasource\constants;

use App\library\Service\ConfigService;

/**
 * Created by PhpStorm.
 * User: admin-chen
 * Date: 14-8-6
 * Time: 下午4:55.
 */
class AppEnum
{
    const MENU_KEY_APP_MODIFY = 'app/modify';
    const MENU_KEY_APP_OPERATOR = 'app/operator';
    const MENU_KEY_APP_TEAM = 'app/team';
    const MENU_KEY_APP_REMOVE = 'app/remove';

    const APP_TYPE_DOMAIN = 1; //APP类型:网站
    const APP_TYPE_SDK = 2; //SDK
    const APP_TYPE_RUM = 3; //RUM
    const APP_TYPE_RUM_AND_DOMAIN = 4; //RUM AND DOMAIN
    const APP_TYPE_SAP = 5; //RUM AND DOMAIN

    const APP_CREATED_BY_SYS = 1; //创建类型:系统
    const APP_CREATED_BY_USER = 2; //用户

    const APP_DISPATCH_WAIT = 1; //待调度
    const APP_DISPATCH_DONE = 2; //已调试

    const APP_SWITCH_STATUS_ON = 1; //APP服务开启状态
    const APP_SWITCH_STATUS_OFF = 2;

    const APP_ADMIN_SWITCH_STATUS_ON = 1; //应用后台任务开启
    const APP_ADMIN_SWITCH_STATUS_OFF = 2; //暂停

    const APP_MODIFY_SUCCESS_INSERT = 1; //APP添加 modify成功
    const APP_MODIFY_SUCCESS_UPDATE = 2; //APP更新 modify成功
    const APP_MODIFY_FAILURE = 3; //APP modify失败

    const APP_APDEX_GREAT_VALUE = 0.9;//优秀
    const APP_APDEX_GOOD_VALUE = 0.85;//良好
    const APP_APDEX_NORMAL_VALUE = 0.7;//正常
    const APP_APDEX_POOR_VALUE = 0.5;//差

    const APP_APDEX_GREAT_INDEX = 1;
    const APP_APDEX_GOOD_INDEX = 2;
    const APP_APDEX_NORMAL_INDEX = 3;
    const APP_APDEX_POOR_INDEX = 4;
    const APP_APDEX_BAD_INDEX = 5;
    const APP_TRACK_TIME_RANGE = 600000;//1分钟

    const APP_BUSINESS_URI_SINGLE = 1;
    const APP_BUSINESS_URI_COMBINED = 2;

    const APP_ERROR_EX_WHITE_DISPATCH_WAIT = 1;//待调度
    const APP_ERROR_EX_WHITE_DISPATCH_DONE = 2;//调度完成

    const APP_ERROR_EX_TYPE_JAVA_EXCEPTION = 1;
    const APP_ERROR_EX_TYPE_JAVA_HTTP_CODE = 2;
    const APP_ERROR_EX_TYPE_PHP_EXCEPTION = 3;
    const APP_ERROR_EX_TYPE_PHP_HTTP_CODE = 4;
    const APP_ERROR_EX_TYPE_PHP_ERROR_FILE = 5;

    const APP_ERROR_EX_DELETE_STATUS_NO = 1;//未删除
    const APP_ERROR_EX_DELETE_STATUS_YES = 2;//已删除

    const APP_TIME_PERCENT_FIVE = 'five_percent';
    const APP_TIME_PERCENT_TEN = 'ten_percent';

    public static $app_time_percent = [
        self::APP_TIME_PERCENT_FIVE,
        self::APP_TIME_PERCENT_TEN,
    ];

    public static $app_error_type_name = [
        self::APP_ERROR_EX_TYPE_JAVA_EXCEPTION => 'java_exception',
        self::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE => 'java_http_code',
        self::APP_ERROR_EX_TYPE_PHP_EXCEPTION  => 'php_exception',
        self::APP_ERROR_EX_TYPE_PHP_HTTP_CODE  => 'php_http_code',
        self::APP_ERROR_EX_TYPE_PHP_ERROR_FILE => 'php_error_file',
    ];
    public static $app_health_img      = [
        self::SETTING_TOPO_NORMAL    => 'check',
        self::SETTING_TOPO_SLOW      => 'exclamation',
        self::SETTING_TOPO_VERY_SLOW => 'double_ex',
        self::SETTING_TOPO_ERROR     => 'minus',
    ];

    public static $app_setting_pause_day = [
        '1' => 7,
        '2' => 3,
        '3' => 1,
    ];

    public static $setting_business_add = [
        500  => '500ms',
        1000 => '1000ms',
        1500 => '1500ms',
        2000 => '2000ms',
        2500 => '2500ms',
        3000 => '3000ms',
        3500 => '3500ms',
        4000 => '4000ms',
        4500 => '4500ms',
        5000 => '5000ms',
    ];
    public static $setting_time         = [
        100   => '100ms',
        200   => '200ms',
        300   => '300ms',
        400   => '400ms',
        500   => '500ms',
        600   => '600ms',
        700   => '700ms',
        800   => '800ms',
        900   => '900ms',
        1000  => '1000ms',
        1500  => '1500ms',
        2000  => '2000ms',
        2500  => '2500ms',
        3000  => '3000ms',
        3500  => '3500ms',
        4000  => '4000ms',
        4500  => '4500ms',
        5000  => '5000ms',
        6000  => '6000ms',
        7000  => '7000ms',
        8000  => '8000ms',
        9000  => '9000ms',
        10000 => '10000ms',
        11000 => '11000ms',
        12000 => '12000ms',
        13000 => '13000ms',
        14000 => '14000ms',
        15000 => '15000ms',
        18000 => '18000ms',
        21000 => '21000ms',
        24000 => '24000ms',
        27000 => '27000ms',
        30000 => '30000ms',
        30001 => '30000ms以上',
    ];

    public static function getFields($slow, $slowest)
    {
        $return = [
            'normal_fields'  => [],
            'slow_fields'    => [],
            'slowest_fields' => [],
        ];
        $list = array_keys(self::$setting_time);
        foreach ($list as $index => $value) {
            $pre = isset($list[ $index - 1 ]) ? $list[ $index - 1 ] : 0;
            if ($value <= $slow) {
                $item = 'request_' . $pre . '_' . $value;
                $return['normal_fields'][] = $item;
            } else {
                if ($value <= $slowest) {
                    $item = 'request_' . $pre . '_' . $value;
                    $return['slow_fields'][] = $item;
                } else {
                    if ($value == 30001) {
                        $item = 'request_' . $pre . '_0';
                    } else {
                        $item = 'request_' . $pre . '_' . $value;
                    }
                    $return['slowest_fields'][] = $item;
                }
            }
        }

        $return['normal_str'] = 'function(current,' . implode(
                ',', $return['normal_fields']) . '){return current+' . implode(
                '+', $return['normal_fields']) . '}';
        if ($slow != $slowest) {
            $return['slow_str'] = 'function(current,' . implode(
                    ',', $return['slow_fields']) . '){return current+' . implode(
                    '+', $return['slow_fields']) . '}';
        } else {
            $return['slow_str'] = 'function(current){return current}';
        }
        $return['slowest_str'] = 'function(current,' . implode(
                ',', $return['slowest_fields']) . '){return current+' . implode(
                '+', $return['slowest_fields']) . '}';

        return $return;
    }

    public static function getAppTrackTimeRange()
    {
        $config = ConfigService::instance()->getConfig('app.app_track_time_range');
        if ($config) {
            return $config;
        }

        return self::APP_TRACK_TIME_RANGE;
    }

    const APP_ERROR_EXCEPTION_CHART_SWICHT_FIELD_TIME = '';

    public static function getExceptionSwichFieldTtime()
    {
        if (Config::get('app.app_error_exception_chart_swich_field_time')) {
            return Config::get('app.app_error_exception_chart_swich_field_time');
        }

        return self::APP_ERROR_EXCEPTION_CHART_SWICHT_FIELD_TIME;
    }

    public static function getExceptionField($start_time)
    {
        $config_time = AppEnum::getExceptionSwichFieldTtime();
        $config_time = strtotime($config_time);
        $exception_field = $start_time / 1000 > $config_time ? 'exceptionCount' : 'isException';

        return $exception_field;
    }

    const SETTING_BASIC = 'basic_setting';
    const SETTING_TOPO = 'topo_setting';
    const SETTING_DB = 'db_setting';
    const SETTING_HOST = 'host_setting';
    const SETTING_SQL = 'sql_setting';

    const SETTING_BASIC_NORMAL = 'normal';
    const SETTING_BASIC_SLOW = 'slow';
    const SETTING_BASIC_VERY_SLOW = 'very_slow';
    const SETTING_BASIC_STOP = 'stop';
    const NO_DATA = 'no_data';

    const SETTING_TOPO_NORMAL = 'normal';
    const SETTING_TOPO_SLOW = 'slow';
    const SETTING_TOPO_VERY_SLOW = 'very_slow';
    //        const SETTING_TOPO_STOP      = 'stop';
    const SETTING_TOPO_ERROR = 'error';

    const SETTING_HOST_TYPE_CPU_RATE = 'cpu_rate';
    const SETTING_HOST_TYPE_RAM_RATE = 'ram_rate';
    const SETTING_HOST_TYPE = 'type';
    const SETTING_HOST_WARNING = 'warning';
    const SETTING_HOST_FATAL_WARNING = 'fatal_warning';

    public static $topoExtraInfoFilter = [
        'mo',                        //mongodb
    ];

    public static $noSqlMongo = [
        SmartAgentFunctionTypeEnum::MONGODB_CONNETCT_QUERY              => 'query',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INSERT                 => 'insert',
        //            SmartAgentFunctionTypeEnum::MONGODB_OPER_QUERY_INSERT => 'queryinsert',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DELETE                 => 'delete',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_UPDATE                 => 'update',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_SELECT                 => 'select',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INDEXES                => 'indexes',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INDEXEXISTS            => 'indexExists',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INDEXINFORMATION       => 'indexInformation',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INSERTMANY             => 'insertMany',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INSERTONE              => 'insertOne',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DROP                   => 'drop',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DROPALLINDEXES         => 'dropAllIndexes',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DROPINDEX              => 'dropIndex',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_REMOVE                 => 'remove',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DELETEMANY             => 'deleteMany',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DELETEONE              => 'deleteOne',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_UPDATEMANY             => 'updateMany',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_UPDATEONE              => 'updateOne',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONE                => 'findOne',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDANDMODIFY          => 'findAndModify',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDANDREMOVE          => 'findAndRemove',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONEANDDELETE       => 'findOneAndDelete',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONEANDREPLACE      => 'findOneAndReplace',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONEANDUPDATE       => 'findOneAndUpdate',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_BULKWRITE              => 'bulkWrite',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_AGGREGATE              => 'aggregate',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_COUNT                  => 'count',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_CREATEINDEX            => 'createIndex',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DISTINCT               => 'distinct',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_ENSUREINDEX            => 'ensureIndex',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_GEOHAYSTACKSEARCH      => 'geoHaystackSearch',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_GEONEAR                => 'geoNear',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_GROUP                  => 'group',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_ISCAPPED               => 'isCapped',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_MAPREDUCE              => 'mapReduce',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_OPTIONS                => 'options',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_PARALLELCOLLECTIONSCAN => 'parallelCollectionScan',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_REINDEX                => 'reIndex',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_RENAME                 => 'rename',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_REPLACEONE             => 'replaceOne',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_SAVE                   => 'save',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_STATS                  => 'stats',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_findById               => 'findById',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_find                   => 'find',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_findByIdAndUpdate      => 'findByIdAndUpdate',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_findByIdAndRemove      => 'findByIdAndRemove',
    ];

    public static $noSqlMongoComb = [
        SmartAgentFunctionTypeEnum::MONGODB_CONNETCT_QUERY              => 'query',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INSERT                 => 'insert',
        //        SmartAgentFunctionTypeEnum::MONGODB_OPER_QUERY_INSERT => 'insert',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DELETE                 => 'delete',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_UPDATE                 => 'update',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_SELECT                 => 'select',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INDEXES                => 'index',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INDEXEXISTS            => 'indexs',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INDEXINFORMATION       => 'indexs',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INSERTMANY             => 'insert',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INSERTONE              => 'insert',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DROP                   => 'drop',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DROPALLINDEXES         => 'drop',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DROPINDEX              => 'drop',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_REMOVE                 => 'remove',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DELETEMANY             => 'delete',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DELETEONE              => 'delete',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_UPDATEMANY             => 'update',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_UPDATEONE              => 'update',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONE                => 'find',
        //        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONE=>'REMOVE',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDANDMODIFY          => 'find',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDANDREMOVE          => 'find',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONEANDDELETE       => 'find',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONEANDREPLACE      => 'findone',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_FINDONEANDUPDATE       => 'findone',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_BULKWRITE              => 'bulkwrite',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_AGGREGATE              => 'aggregate',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_COUNT                  => 'count',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_CREATEINDEX            => 'createindex',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DISTINCT               => 'distinct',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_ENSUREINDEX            => 'ensureindex',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_GEOHAYSTACKSEARCH      => 'geohaystacksearch',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_GEONEAR                => 'geonear',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_GROUP                  => 'group',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_ISCAPPED               => 'iscapped',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_MAPREDUCE              => 'mapreduce',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_OPTIONS                => 'options',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_PARALLELCOLLECTIONSCAN => 'parallelcollectionscan',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_REINDEX                => 'reindex',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_RENAME                 => 'rename',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_REPLACEONE             => 'deplaceone',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_SAVE                   => 'save',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_STATS                  => 'stats',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_findById               => 'find',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_find                   => 'find',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_findByIdAndUpdate      => 'find',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_findByIdAndRemove      => 'find',
    ];

    public static $NoSqlDb = [
        ServiceTypeEnum::TYPE_REDIS,
        ServiceTypeEnum::TYPE_MONGODB,
        ServiceTypeEnum::TYPE_MEMCACHE,
    ];

    public static $NoSqlGetList = [
        SmartAgentFunctionTypeEnum::REDIS_GET           => 'GET',
        SmartAgentFunctionTypeEnum::MEMCACHE_GET        => 'GET',
        SmartAgentFunctionTypeEnum::GET_ONE_MEMCACHE    => 'GET_ONE',
        SmartAgentFunctionTypeEnum::GET_MANY_MEMCACHE   => 'GET_MANY',
        SmartAgentFunctionTypeEnum::GETS_ONE_MEMCACHE   => 'GETS_ONE',
        SmartAgentFunctionTypeEnum::GETS_MANY_MEMCACHE  => 'GETS_MANY',
        SmartAgentFunctionTypeEnum::GET_HIT_MEMCACHE    => 'GET_HIT',
        SmartAgentFunctionTypeEnum::GET_MISS_MEMCACHE   => 'GET_MISS',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_SELECT => 'GET',
    ];

    public static $NoSqlSetList = [
        SmartAgentFunctionTypeEnum::REDIS_SET           => 'SET',
        SmartAgentFunctionTypeEnum::MEMCACHE_SET        => 'SET',
        SmartAgentFunctionTypeEnum::SET_MEMCACHE        => 'SET',
        SmartAgentFunctionTypeEnum::SET_MANY_MEMCACHE   => 'SET_MANY',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_INSERT => 'SET',
    ];

    public static $NoSqlDeleteList = [
        SmartAgentFunctionTypeEnum::REDIS_DELETE        => 'DELETE',
        SmartAgentFunctionTypeEnum::MEMCACHE_DELETE     => 'DELETE',
        SmartAgentFunctionTypeEnum::DELETE_MEMCACHE     => 'DELETE',
        SmartAgentFunctionTypeEnum::MONGODB_OPER_DELETE => 'DELETE',
    ];

    public static function getApdexName($index)
    {
        $index_array = [
            self::APP_APDEX_GREAT_INDEX  => 'excellent',
            self::APP_APDEX_GOOD_INDEX   => 'good',
            self::APP_APDEX_NORMAL_INDEX => 'commonly',
            self::APP_APDEX_POOR_INDEX   => 'poor',
            self::APP_APDEX_BAD_INDEX    => 'very_poor',
        ];
        if (array_key_exists($index, $index_array)) {
            return $index_array[ $index ];
        }

        return '-';
    }

    public static $app_topo_healthy_group = [
        self::SETTING_BASIC_NORMAL   => ReportAppTopologyEnum::GROUP_APP_NORMAL,
        self::SETTING_TOPO_SLOW      => ReportAppTopologyEnum::GROUP_APP_SLOW,
        self::SETTING_TOPO_VERY_SLOW => ReportAppTopologyEnum::GROUP_APP_VERY_SLOW,
        self::SETTING_TOPO_ERROR     => ReportAppTopologyEnum::GROUP_APP_ERROR,
        self::NO_DATA                => ReportAppTopologyEnum::GROUP_APP_NODATA,
    ];

    public static $setting_basic_default = [
        self::SETTING_BASIC_SLOW      => 500,
        self::SETTING_BASIC_VERY_SLOW => 2000,
    ];

    public static $setting_topo_default = [
        self::SETTING_TOPO_SLOW      => 10,
        self::SETTING_TOPO_VERY_SLOW => 20,
        self::SETTING_TOPO_ERROR     => 5,
    ];

    public static $setting_db_default = [
        self::SETTING_BASIC_SLOW      => 10,
        self::SETTING_BASIC_VERY_SLOW => 20,
    ];

    public static $setting_host_default = [
        self::SETTING_HOST_TYPE          => self::SETTING_HOST_TYPE_CPU_RATE,
        self::SETTING_HOST_WARNING       => 70,
        self::SETTING_HOST_FATAL_WARNING => 90,
    ];

    public static $setting_sql_default = [
        self::SETTING_BASIC_SLOW      => 50,
        self::SETTING_BASIC_VERY_SLOW => 200,
    ];

    public static function getDefaultAppSetting($settingType = FALSE)
    {
        $default = [
            self::SETTING_BASIC => self::$setting_basic_default,
            self::SETTING_TOPO  => self::$setting_topo_default,
            self::SETTING_DB    => self::$setting_db_default,
            self::SETTING_HOST  => self::$setting_host_default,
            self::SETTING_SQL   => self::$setting_sql_default,
        ];
        if($settingType && array_key_exists($settingType, $default)){
            return $default[$settingType];
        }

        return $default;
    }

    /**
     * 统一处理APP中的service_types.
     *
     * @param $service_types
     *
     * @return array
     */
    public static function disposeServiceTypes($service_types)
    {
        $json_service_types = json_decode($service_types, true);
        $codeTypeIndex = [];
        if (!empty($json_service_types)) {
            foreach (ElasticSearchEnum::$codeTypeIndex as $key => $value) {
                if (isset($json_service_types['serverHostList']) && array_key_exists(
                        $key, $json_service_types['serverHostList'])
                ) {
                    $codeTypeIndex[] = $key;
                }
            }
        }

        return $codeTypeIndex;
    }

    /**
     * 获取应用所属于code_type.
     */
    public static function getAppCodeType($service_types)
    {
        $json_service_types = json_decode($service_types, true);
        if (isset($json_service_types['appType']) && !empty($json_service_types['appType'])) {
            return $json_service_types['appType'];
        } else {
            $codeTypeIndex = [];
            if (!empty($json_service_types)) {
                foreach (ElasticSearchEnum::$codeTypeIndex as $key => $value) {
                    if (array_key_exists($key, $json_service_types['serverHostList'])) {
                        $codeTypeIndex[] = $key;
                    }
                }
            }

            return empty($codeTypeIndex) ? '' : array_shift($codeTypeIndex);
        }
    }

}
