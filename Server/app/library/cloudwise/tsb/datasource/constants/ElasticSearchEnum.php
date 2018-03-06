<?php
namespace cloudwise\tsb\datasource\constants;

use App\library\Service\ConfigService;

/**
 * Created by PhpStorm.
 * User: admin-chen
 * Date: 14-7-11
 * Time: 下午2:07.
 */
class ElasticSearchEnum
{
    const INDEX_WEB_PREFIX = 'nettopic_'; //网站index前缀
    const INDEX_HOST_PREFIX = 'agenttopic_'; //主机index前缀
    const INDEX_PAGE_PREFIX = 'pagetopic_'; //网页index前缀
    const INDEX_ALERT_PREFIX = 'alertmsg_'; //告警index前缀
    const INDEX_API_PREFIX = 'apitopic_'; //API index前缀
    const INDEX_SDK_PREFIX = 'mobilesdk_'; //SDK index前缀
    const INDEX_UE_PREFIX = 'browserjs_'; //UE index前缀
    const INDEX_PHP_PREFIX = 'phptopic_'; //php index前缀
    const INDEX_JAVA_PREFIX = 'javatopic_'; //java index前缀
    const INDEX_DOTNET_PREFIX = 'dotnettopic_'; //dotnet index前缀
    const INDEX_PYTHON_PREFIX = 'pythontopic_';//python index前缀
    const INDEX_NODEJS_PREFIX = 'nodejstopic_';//python index前缀
    const INDEX_TRANS_PREFIX = 'trans_'; //trans 前缀
    const INDEX_SAP_PREFIX = 'saptopic_'; //trans 前缀
    const INDEX_MOBILE_PREFIX = 'mobileoper_'; //移动运营 前缀
    const INDEX_MOBILE_COUNT_ACTIVEUSER = 'mobileoper_';
    const INDEX_MOBILE_LIVE_PREFIX = 'broadcast_';
    const INDEX_CODE_ALL = 'all_code';

    const INDEX_TYPE_HOUR = 1;
    const INDEX_TYPE_DAY = 2;
    const INDEX_TYPE_MONTH = 3;

    const REPORT = 1; //报告库类型
    const ALERT = 2; //告警库类型

    const DEFAULT_LOCK_TIME = 5;//锁定默认时间,单位秒
    const DEFAULT_CACHE_TIME = 2;//锁定默认时间,单位分
    const DEFAULT_AGGS_SIZE = 200;//列表数量限制
    const DEFAULT_DOC_SIZE = 200;//列表数量限制
    const DEFAULT_OPERATOR_SIZE = 100000;//列表数量限制

    const DEFAULT_PAGE_THRESHOLD = 200; //ES第一次查询列表结果集,查询精度
    const DEFAULT_LIST_PRECISION = 2000; //ES多维度去重精度
    const ELASTICSEARCH_DEFAULT_SERACH_TYPE = EsQueryDslEnum::ES_QUERY_THEN_FETCH;

    const EXPLODE_STRING = '#on#';

    public static $terms_default_config = [
        'size'          => 10,
        'shard_size'    => 10,
        'min_doc_count' => 1,
    ];

    public static function checkPstStatus()
    {
        $config = ConfigService::instance()->getConfig('elasticsearch.pst_update_time');
        if (!$config) {
            return false;
        }
        $config = explode(',', $config);
        $timestamp = mktime($config[0], $config[1], $config[2], $config[3], $config[4], $config[5]);

        return $timestamp * 1000;
    }


    public static $lock_params = [
        'switch' => false, //开关,如果为false,则不进行锁操作
        'time'   => self::DEFAULT_LOCK_TIME, //单位:s.锁定时间,如果超出时间仍然锁定，则返回空数据
    ];

    public static $cache_params = [
        'switch' => false,
        'time'   => self::DEFAULT_CACHE_TIME, //缓存时间,单位分钟
    ];

    public static $size_limit = [
        'aggs_size' => self::DEFAULT_AGGS_SIZE,
        'doc_size'  => self::DEFAULT_DOC_SIZE,
    ];

    public static function getPageSizeThreshold()
    {
        if (ConfigService::instance()->getConfig('elasticsearch.page_threshold')) {
            return ConfigService::instance()->getConfig('elasticsearch.page_threshold');
        }

        return self::DEFAULT_PAGE_THRESHOLD;
    }

    public static function getListCardinalityPrecision()
    {
        if (ConfigService::instance()->getConfig('elasticsearch.list_cardinality_threshold')) {
            return ConfigService::instance()->getConfig('elasticsearch.list_cardinality_threshold');
        }

        return self::DEFAULT_LIST_PRECISION;
    }

    public static function getSizeLimit()
    {
        $config = self::$size_limit;

        //获取配置并进行补充
        $config_custom = ConfigService::instance()->getConfig('elasticsearch.size_limit');
        if ($config_custom) {
            $config = array_merge($config, $config_custom);
        }

        return $config;
    }

    //精度取值
    const CARDINALITY_PRECISION = 1000;


    public static function getEsCacheParams()
    {
        $cache = self::$cache_params;
        if (ConfigService::instance()->getConfig('elasticsearch.cache')) {
            $cache = array_merge(self::$cache_params, ConfigService::instance()->getConfig('es.cache'));
        }

        return $cache;
    }

    public static function getCardinalityPrecision()
    {
        $precision = ConfigService::instance()->getConfig('es.cardinality_precision');
        if ($precision) {
            return $precision;
        }

        return self::CARDINALITY_PRECISION;
    }

    /**
     * Service_types中对应的code在es中index.
     */
    public static $codeTypeIndex = [
        ReportAppTopologyEnum::TOPO_PHP    => self::INDEX_PHP_PREFIX,
        ReportAppTopologyEnum::TOPO_JAVA   => self::INDEX_JAVA_PREFIX,
        ReportAppTopologyEnum::TOPO_DOTNET => self::INDEX_DOTNET_PREFIX,
        ReportAppTopologyEnum::TOPO_PYTHON => self::INDEX_PYTHON_PREFIX,
        ReportAppTopologyEnum::TOPO_NODEJS => self::INDEX_NODEJS_PREFIX,
    ];

    /**
     * ES报告数据库名称的前缀
     */
    public static $esReportDBNamePrefix = [
        /*网站相关的服务*/
        ServiceTypeEnum::TYPE_DNS            => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_PING           => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_FTP            => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_SMTP           => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_TCP            => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_TIMER          => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_TRACEROUTE     => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_UDP            => self::INDEX_WEB_PREFIX,
        ServiceTypeEnum::TYPE_SITE           => self::INDEX_PAGE_PREFIX,
        /*主机相关的服务*/
        ServiceTypeEnum::TYPE_BURDEN         => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_CPU_USE_RATE   => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_RAM_USE_RATE   => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_LAN_TRAFFIC    => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_DISK_USE_RATE  => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_DISK_IO        => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_SYSTEM_PROCESS => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_SYSTEM_TCP     => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_APACHE         => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_MYSQL          => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_SQLSERVER      => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_POSTGRESQL     => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_RABBIT_MQ      => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_DOCKER         => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_COUCHBASE      => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_VARNISH        => self::INDEX_HOST_PREFIX,
        //JVM
        ServiceTypeEnum::TYPE_JVM            => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_JVM_STACK      => self::INDEX_HOST_PREFIX,

        //后台任务
        ServiceTypeEnum::TYPE_APP_ADMIN      => self::INDEX_HOST_PREFIX,

        ServiceTypeEnum::TYPE_TOMCAT                        => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_REDIS                         => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_MEMCACHE                      => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_ORACLE                        => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_WEBLOGIC                      => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_MONGODB                       => self::INDEX_HOST_PREFIX,
        ServiceTypeEnum::TYPE_NGINX                         => self::INDEX_HOST_PREFIX,
        /*移动相关的服务*/
        ServiceTypeEnum::TYPE_MOBILE_API                    => self::INDEX_API_PREFIX,
        ServiceTypeEnum::TYPE_MOBILE_SDK                    => self::INDEX_SDK_PREFIX,
        ServiceTypeEnum::TYPE_MOBILE_SDK_NEWUSER_STARTCOUNT => self::INDEX_MOBILE_PREFIX,
        ServiceTypeEnum::TYPE_MOBILE_SDK_ACTIVEUSER         => self::INDEX_MOBILE_PREFIX,
        ServiceTypeEnum::TYPE_MOBILE_SDK_ALLUSER            => self::INDEX_MOBILE_PREFIX,

        ServiceTypeEnum::TYPE_MOBILE_LIVE                 => self::INDEX_MOBILE_LIVE_PREFIX,

        //移动统计类型
        ServiceTypeEnum::TYPE_MOBILE_COUNT_ACTIVEUSER     => self::INDEX_MOBILE_COUNT_ACTIVEUSER,
        ServiceTypeEnum::TYPE_MOBILE_COUNT_CHANNEL        => self::INDEX_MOBILE_COUNT_ACTIVEUSER,
        ServiceTypeEnum::TYPE_MOBILE_OPERATION_REGION_NEW => self::INDEX_MOBILE_COUNT_ACTIVEUSER,
        ServiceTypeEnum::TYPE_MOBILE_COUNT_DEVICE         => self::INDEX_MOBILE_COUNT_ACTIVEUSER,

        /*用户体验*/
        ServiceTypeEnum::TYPE_UE                          => self::INDEX_UE_PREFIX,
        ServiceTypeEnum::TYPE_UE_AJAX                     => self::INDEX_UE_PREFIX,
        ServiceTypeEnum::TYPE_UE_JS_ERROR                 => self::INDEX_UE_PREFIX,
        ServiceTypeEnum::TYPE_UE_VISITORS                 => self::INDEX_UE_PREFIX,

        /*应用相关的服务*/
        ServiceTypeEnum::TYPE_CODE_AGENT_PHP              => self::INDEX_PHP_PREFIX,
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA             => self::INDEX_JAVA_PREFIX,
        ServiceTypeEnum::TYPE_CODE_AGENT_NET              => self::INDEX_DOTNET_PREFIX,
        ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON           => self::INDEX_PYTHON_PREFIX,
        ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS           => self::INDEX_NODEJS_PREFIX,

        ServiceTypeEnum::TYPE_TRANSACTION => self::INDEX_TRANS_PREFIX,

        ServiceTypeEnum::TYPE_SAP_TASK_TIMES => self::INDEX_SAP_PREFIX,
        ServiceTypeEnum::TYPE_SAP_TASK_TYPE  => self::INDEX_SAP_PREFIX,
        ServiceTypeEnum::TYPE_SAP_TIMES      => self::INDEX_SAP_PREFIX,
        ServiceTypeEnum::TYPE_SAP_USER_TCODE => self::INDEX_SAP_PREFIX,
    ];

    public static function getDefaultEsTermsConfig()
    {
        if (ConfigService::instance()->getConfig('elasticsearch.terms_config')) {
            return array_merge(self::$terms_default_config, ConfigService::instance()->getConfig('elasticsearch.terms_config'));
        }

        return self::$terms_default_config;
    }

    public static function getDefaultSearchType()
    {
        if (ConfigService::instance()->getConfig('elasticsearch.search_type')) {
            return ConfigService::instance()->getConfig('elasticsearch.search_type');
        }

        return self::ELASTICSEARCH_DEFAULT_SERACH_TYPE;
    }

    public static function getEsMinDocCountConfig()
    {
        if (ConfigService::instance()->getConfig('elasticsearch.min_doc_count')) {
            return ConfigService::instance()->getConfig('elasticsearch.min_doc_count');
        }

        throw new \Exception('Can not read config elasticsearch.min_doc_count', ErrorCodeEnum::STATUS_ERROR_PARAMS_MUST);
    }

    /**
     * 获取es中数据的时区
     * @return array
     */
    public static function getTimeZone()
    {
        $return = [
            'local'=>'PRC',
            'es'=>'UTC',
        ];

        $local = ConfigService::instance()->getConfig('es.timezone.local');
        $es = ConfigService::instance()->getConfig('es.timezone.es');

        if($local){
            $return['local'] = $local;
        }

        if($es){
            $return['es'] = $es;
        }

        return $return;
    }

}
