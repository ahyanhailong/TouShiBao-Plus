<?php
namespace cloudwise\tsb\datasource\constants;

/**
 * enum all types of the service.
 */
class ServiceTypeEnum
{
    const TYPE_LABEL_KEY = 'label';
    const TYPE_SETTING_MONITOR_KEY = 'setting_monitor';
    const TYPE_SETTING_OTHER_KEY = 'setting_other';

    const TYPE_STATUS_NORMAL = 1;
    const TYPE_STATUS_OFFLINE = 3;

    const TYPE_SPECIAL = -1; //特例

    const PAGE_RANK_STATUS_AVILABLE_RATE = 1; //页面可用率指数类型
    const PAGE_RAND_STATUS_RESP_TIME = 2; //页面响应时间类型

    //*****************以下是网络监控方面的类型***************************
    const TYPE_DNS = 1; //DNS监控
    const TYPE_PING = 2; //PING监控
    const TYPE_FTP = 3; //FTP监控
    const TYPE_SMTP = 4; //SMTP监控
    const TYPE_TCP = 5; //TCP监控
    const TYPE_TIMER = 6; //定时监控
    const TYPE_TRACEROUTE = 7; //TraceRoute监控
    const TYPE_UDP = 8; //UDP监控

    const TYPE_HTTP = 9; //页面可靠性监控
    const TYPE_SITE = 10; //页面全景（网页性能）监控

    //*************以下是主机共性方面的类型**************************
    const TYPE_SEND_PROXY = 97; //sendProxy的类型值
    const TYPE_SMARTAGENT = 98; //smartAgent的类型值
    const TYPE_MASTER = 99; //主进程
    const TYPE_HOST = 100; // 主机信息
    const TYPE_BURDEN = 101; //CPU负载
    const TYPE_CPU_USE_RATE = 102; //CPU使用率
    const TYPE_RAM_USE_RATE = 103; //内存使用率
    const TYPE_LAN_TRAFFIC = 104; //网卡流量
    const TYPE_DISK_USE_RATE = 105; //磁盘空间
    const TYPE_DISK_IO = 106; //磁盘IO
    const TYPE_SYSTEM_PROCESS = 107; //系统进程数
    const TYPE_SYSTEM_TCP = 108; //系统socket链接数

    const TYPE_GROUP_OS = 190; // OS服务 包含cpu负载 CPU使用率 内存使用率

    //************以下是主机安装的服务方面的类型*************************
    const TYPE_SERVICE = 200; //服务
    const TYPE_APACHE = 201; //apache //apache的监控插件类型
    const TYPE_APACHE_BASIC = 2011; //apache的基础插件

    const TYPE_LIGHTTPD = 202; //lighttpd
    const TYPE_NGINX = 203; //nginx //nginx的监控插件类型
    const TYPE_NGINX_BASIC = 2031; //nginx的基础插件

    const TYPE_MYSQL = 204; //mysql
    const TYPE_MONGODB = 205; //mongodb
    const TYPE_REDIS = 206; //redis
    const TYPE_MEMCACHE = 207; //memcache
    const TYPE_MEMCACHED_TRUE = 1;
    const TYPE_MEMCACHED_FALSE = 2;
    const TYPE_TOMCAT = 208; //tomcat
    const TYPE_IIS = 209; //iis
    const TYPE_SQLSERVER = 210; //sqlserver
    const TYPE_ORACLE = 211; //oracle
    const TYPE_WEBLOGIC = 212; // weblogic
    const TYPE_POSTGRESQL = 213; // PostgreSQL
    const TYPE_JVM = 214; //JVM
    const TYPE_RABBIT_MQ = 215; //RabbitMQ
    const TYPE_DOCKER = 216; // Docker
    const TYPE_JVM_STACK = 217;  //JVM堆栈
    const TYPE_APP_ADMIN = 218;  //后台任务
    const TYPE_COUCHBASE = 219; //CouchBase
    const TYPE_VARNISH = 220; //Varnish
    const TYPE_DB2 = 221; //DB2
    const TYPE_DISCOVER = 250; //发现服务插件类型

    const TYPE_MOBILE_API = 401; // mobile api

    //*********以下是mobile sdk方面的类型*****************
    const TYPE_MOBILE_SDK = 402; // mobile sdk
    const TYPE_MOBILE_SDK_DOMAIN = 403; // mobile sdk

    const TYPE_MOBILE_LIVE = 421; //mobile sdk

    //*********以下是mobile 统计方面的类型*****************
    const TYPE_MOBILE_SDK_NEWUSER_STARTCOUNT = 405;
    const TYPE_MOBILE_SDK_ACTIVEUSER = 406;  //地域
    const TYPE_MOBILE_SDK_ALLUSER = 407;
    const TYPE_MOBILE_COUNT_ACTIVEUSER = 408;
    const TYPE_MOBILE_COUNT_RETAIN = 409;
    const TYPE_MOBILE_COUNT_RETAIN_ACTIVE = 4091;
    const TYPE_MOBILE_COUNT_CHANNEL = 410;
    const TYPE_MOBILE_COUNT_DEVICE = 411;

    const TYPE_MOBILE_OPERATION_ACTIVE_V = 1001;
    const TYPE_MOBILE_OPERATION_ACTIVE = 1002;
    const TYPE_MOBILE_OPERATION_NEW = 1003;
    const TYPE_MOBILE_OPERATION_START = 1004;
    const TYPE_MOBILE_OPERATION_TOTAL_M = 1005;
    const TYPE_MOBILE_OPERATION_TOTAL_ALL = 10051;
    const TYPE_MOBILE_OPERATION_REGION_ACTIVE_V = 2001;
    const TYPE_MOBILE_OPERATION_REGION_ACTIVE = 2002;
    const TYPE_MOBILE_OPERATION_REGION_NEW = 2003;
    const TYPE_MOBILE_OPERATION_REGION_START = 2004;
    const TYPE_MOBILE_OPERATION_CHANNEL_ACTIVE_V = 3001;
    const TYPE_MOBILE_OPERATION_CHANNEL_ACTIVE = 3002;
    const TYPE_MOBILE_OPERATION_CHANNEL_NEW = 3003;
    const TYPE_MOBILE_OPERATION_CHANNEL_START = 3004;
    const TYPE_MOBILE_OPERATION_CHANNEL_TOTAL_M = 3005;
    const TYPE_MOBILE_OPERATION_CHANNEL_TOTAL_ALL = 30051;
    const TYPE_MOBILE_OPERATION_DEVICE_ACTIVE_V = 4001;
    const TYPE_MOBILE_OPERATION_DEVICE_ACTIVE = 4002;
    const TYPE_MOBILE_OPERATION_DEVICE_NEW = 4003;
    const TYPE_MOBILE_OPERATION_DEVICE_START = 4004;
    const TYPE_MOBILE_OPERATION_RETAIN_NEW_V = 5001;
    const TYPE_MOBILE_OPERATION_RETAIN_NEW = 5002;
    const TYPE_MOBILE_OPERATION_RETAIN_ACTIVE_V = 5003;
    const TYPE_MOBILE_OPERATION_RETAIN_ACTIVE = 5004;

    //*********以下是浏览器方面的类型*****************
    const TYPE_UE = 11; //用户体验(浏览器)
    const TYPE_UE_AJAX = 12;//浏览器ajax
    const TYPE_UE_JS_ERROR = 12;//浏览器js 错误
    const TYPE_UE_VISITORS = 13;
    //*********以下是事物方面的类型*****************
    const TYPE_TRANSACTION = 501; //事物

    //*********以下是应用方面的类型*****************
    const TYPE_APP = 600; //应用
    const TYPE_APP_URI = 601; //应用uri

    const TYPE_SMARTAGENT_EXCEPTION_HANDLER = 999; //SmartAgent异常详情
    const TYPE_SMARTAGENT_MONITOR_HEALTY = 1000; //SmartAgent健康状况

    //*************以下是CodeEngine方面的类型*********************
    const TYPE_CODE_AGENT_PHP = 1001; //PHP代码监控
    const TYPE_CODE_AGENT_JAVA = 1002; //JAVA代码监控
    const TYPE_CODE_AGENT_PYTHON = 1003; //PYTHON代码监控
    const TYPE_CODE_AGENT_NET = 1004; //.NET代码监控
    const TYPE_CODE_AGENT_NODEJS = 1005; //NODEJS代码监控

    const TYPE_SAP_TASK_TYPE = 301;
    const TYPE_SAP_TIMES = 302;
    const TYPE_SAP_USER_TCODE = 303;
    const TYPE_SAP_TASK_TIMES = 304;

    public static $codeAgentType = [
        self::TYPE_CODE_AGENT_PHP,
        self::TYPE_CODE_AGENT_JAVA,
        self::TYPE_CODE_AGENT_NET,
        self::TYPE_CODE_AGENT_NODEJS,
        self::TYPE_CODE_AGENT_PYTHON,
    ];

    public static $memcache_type_name = [
        self::TYPE_MEMCACHED_TRUE  => 'Memcached',
        self::TYPE_MEMCACHED_FALSE => 'Memcache',
    ];

    public static $dataSourceType = [
        self::TYPE_HOST              => [
            self::TYPE_HOST           => 'suro',
            self::TYPE_BURDEN         => 'suro',
            self::TYPE_CPU_USE_RATE   => 'suro',
            self::TYPE_RAM_USE_RATE   => 'suro',
            self::TYPE_LAN_TRAFFIC    => 'suro',
            self::TYPE_DISK_USE_RATE  => 'suro',
            self::TYPE_DISK_IO        => 'suro',
            self::TYPE_SYSTEM_PROCESS => 'suro',
            self::TYPE_SYSTEM_TCP     => 'suro',
            self::TYPE_APACHE         => 'suro',
            self::TYPE_APACHE_BASIC   => 'suro',
            self::TYPE_LIGHTTPD       => 'suro',
            self::TYPE_NGINX          => 'suro',
            self::TYPE_NGINX_BASIC    => 'suro',
            self::TYPE_MYSQL          => 'suro',
            self::TYPE_MONGODB        => 'suro',
            self::TYPE_REDIS          => 'suro',
            self::TYPE_MEMCACHE       => 'suro',
            self::TYPE_TOMCAT         => 'suro',
            self::TYPE_IIS            => 'suro',
            self::TYPE_SQLSERVER      => 'suro',
            self::TYPE_ORACLE         => 'suro',
            self::TYPE_WEBLOGIC       => 'suro',
            self::TYPE_POSTGRESQL     => 'suro',
            self::TYPE_JVM            => 'suro',
            self::TYPE_RABBIT_MQ      => 'suro',
            self::TYPE_DOCKER         => 'suro',
            self::TYPE_JVM_STACK      => 'suro',
            self::TYPE_APP_ADMIN      => 'suro',
        ],
        self::TYPE_CODE_AGENT_PHP    => [
            self::TYPE_CODE_AGENT_PHP => 'suro',
        ],
        self::TYPE_CODE_AGENT_PYTHON => [
            self::TYPE_CODE_AGENT_PYTHON => 'suro',
        ],
        self::TYPE_CODE_AGENT_JAVA   => [
            self::TYPE_CODE_AGENT_JAVA => 'suro',
        ],
        self::TYPE_CODE_AGENT_NET    => [
            self::TYPE_CODE_AGENT_NET => 'suro',
        ],
        //        self::TYPE_CODE_AGENT_NODEJS=>array(
        //            self::TYPE_CODE_AGENT_NODEJS=>'suro',
        //        ),
        self::TYPE_UE                => [
            self::TYPE_UE => 'rum',
        ],
        self::TYPE_MOBILE_SDK        => [
            self::TYPE_MOBILE_SDK => 'mobile',
        ],
    ];

    public static $serviceGroup = [
        self::TYPE_HOST           => [
            self::TYPE_HOST,
            self::TYPE_BURDEN,
            self::TYPE_CPU_USE_RATE,
            self::TYPE_RAM_USE_RATE,
            self::TYPE_LAN_TRAFFIC,
            self::TYPE_DISK_USE_RATE,
            self::TYPE_DISK_IO,
            self::TYPE_SYSTEM_PROCESS,
            self::TYPE_SYSTEM_TCP,
            self::TYPE_APACHE,
            self::TYPE_LIGHTTPD,
            self::TYPE_NGINX,
            self::TYPE_MYSQL,
            self::TYPE_MONGODB,
            self::TYPE_REDIS,
            self::TYPE_MEMCACHE,
            self::TYPE_TOMCAT,
            self::TYPE_IIS,
            self::TYPE_SQLSERVER,
            self::TYPE_ORACLE,
            self::TYPE_WEBLOGIC,
            self::TYPE_POSTGRESQL,
            self::TYPE_JVM,
            self::TYPE_RABBIT_MQ,
            self::TYPE_DOCKER,
            self::TYPE_JVM_STACK,
            self::TYPE_COUCHBASE,
            self::TYPE_VARNISH,

        ],
        self::TYPE_CODE_AGENT_PHP => [
            self::TYPE_CODE_AGENT_PHP,
            self::TYPE_CODE_AGENT_PYTHON,
            self::TYPE_CODE_AGENT_JAVA,
            self::TYPE_CODE_AGENT_NET,
            self::TYPE_CODE_AGENT_NODEJS,
        ],
        self::TYPE_APP_ADMIN      => [
            self::TYPE_APP_ADMIN,
        ],
        self::TYPE_UE             => [
            self::TYPE_UE,
            self::TYPE_UE_AJAX,
            self::TYPE_UE_VISITORS,
        ],
        self::TYPE_MOBILE_SDK     => [
            self::TYPE_MOBILE_SDK,
        ],
    ];

    public static function getServiceGroupName($index)
    {
        $serviceGroupName = [
            self::TYPE_HOST           => 'host',
            self::TYPE_CODE_AGENT_PHP => 'app',
            self::TYPE_APP_ADMIN      => 'admin',
            self::TYPE_UE             => 'ue',
            self::TYPE_MOBILE_SDK     => 'mobile',
        ];
        if (isset($serviceGroupName[ $index ])) {
            return $serviceGroupName[ $index ];
        } else {
            return '';
        }
    }

    /**
     * 定义各类服务的名称.
     *
     * @var array
     */
    public static $serviceNameList = [
        self::TYPE_SEND_PROXY        => 'SendProxy',
        self::TYPE_SMARTAGENT        => 'SmartAgent',
        self::TYPE_HOST              => 'HostData',
        self::TYPE_BURDEN            => 'CPU Burden',
        self::TYPE_CPU_USE_RATE      => 'CPU UsedRate',
        self::TYPE_RAM_USE_RATE      => 'MemUsedRate',
        self::TYPE_LAN_TRAFFIC       => 'LanTraffic',
        self::TYPE_DISK_USE_RATE     => 'DiskUsedRate',
        self::TYPE_DISK_IO           => 'Disk IO',
        self::TYPE_SYSTEM_PROCESS    => 'SysProcess',
        self::TYPE_SYSTEM_TCP        => 'SysTcp',
        self::TYPE_GROUP_OS          => 'OS',
        self::TYPE_APACHE            => 'Apache',
        self::TYPE_APACHE_BASIC      => 'ApacheBasic',
        self::TYPE_LIGHTTPD          => 'Lighttpd',
        self::TYPE_NGINX             => 'Nginx',
        self::TYPE_NGINX_BASIC       => 'NginxBasic',
        self::TYPE_MYSQL             => 'MySQL',
        self::TYPE_MONGODB           => 'MongoDB',
        self::TYPE_REDIS             => 'Redis',
        self::TYPE_MEMCACHE          => 'Memcache',
        self::TYPE_TOMCAT            => 'Tomcat',
        self::TYPE_IIS               => 'IIS',
        self::TYPE_SQLSERVER         => 'SQLServer',
        self::TYPE_ORACLE            => 'Oracle',
        self::TYPE_WEBLOGIC          => 'Weblogic',
        self::TYPE_POSTGRESQL        => 'PostgreSQL',
        self::TYPE_JVM               => 'JVM',
        self::TYPE_RABBIT_MQ         => 'RabbitMQ',
        self::TYPE_DOCKER            => 'Docker',
        self::TYPE_DISCOVER          => 'Discover',
        self::TYPE_MOBILE_API        => 'MobileApi',
        self::TYPE_MOBILE_SDK        => 'MobileSdk',
        self::TYPE_CODE_AGENT_PHP    => 'PHP',
        self::TYPE_CODE_AGENT_NET    => 'Dotnet',
        self::TYPE_CODE_AGENT_JAVA   => 'Java',
        self::TYPE_CODE_AGENT_PYTHON => 'Python',
        self::TYPE_CODE_AGENT_NODEJS => 'NodeJs',
        self::TYPE_COUCHBASE         => 'CouchBase',
        self::TYPE_VARNISH           => 'Varnish',
    ];


    public static $pluginList = [
        self::TYPE_SEND_PROXY        => 'SendProxy',
        self::TYPE_GROUP_OS          => 'OS',
        self::TYPE_APACHE            => 'Apache',
        self::TYPE_APACHE_BASIC      => 'ApacheBasic',
        self::TYPE_NGINX             => 'Nginx',
        self::TYPE_NGINX_BASIC       => 'NginxBasic',
        self::TYPE_MYSQL             => 'MySQL',
        self::TYPE_MONGODB           => 'MongoDB',
        self::TYPE_REDIS             => 'Redis',
        self::TYPE_MEMCACHE          => 'Memcache',
        self::TYPE_TOMCAT            => 'Tomcat',
        self::TYPE_SQLSERVER         => 'SQLServer',
        self::TYPE_ORACLE            => 'Oracle',
        self::TYPE_WEBLOGIC          => 'Weblogic',
        self::TYPE_POSTGRESQL        => 'PostgreSQL',
        self::TYPE_DOCKER            => 'Docker',
        self::TYPE_DISCOVER          => 'Discover',
        self::TYPE_CODE_AGENT_PHP    => 'PHP',
        self::TYPE_CODE_AGENT_NET    => 'DotNet',
        self::TYPE_CODE_AGENT_JAVA   => 'Java',
        self::TYPE_CODE_AGENT_PYTHON => 'Python',
        self::TYPE_CODE_AGENT_NODEJS => 'NodeJs',
        self::TYPE_COUCHBASE         => 'CouchBase',
        self::TYPE_VARNISH           => 'Varnish',
    ];

    public static $HostServiceMethodName = [
        self::TYPE_MYSQL      => 'getLoadMysqlData',
        self::TYPE_APACHE     => 'getLoadApacheData',
        self::TYPE_NGINX      => 'getLoadNginxData',
        self::TYPE_REDIS      => 'getLoadRedisData',
        self::TYPE_WEBLOGIC   => 'getLoadWeblogicData',
        self::TYPE_POSTGRESQL => 'getLoadPostgreSQLData',
        self::TYPE_MONGODB    => 'getLoadMongodbData',
        self::TYPE_SQLSERVER  => 'getLoadSqlserverData',
        self::TYPE_TOMCAT     => 'getLoadTomcatData',
    ];

    /**
     * 数据库标记对应名称.
     *
     * @var array
     */
    public static $MYSQL_NAME = [
        'm'  => 'Mysql',
        'sq' => 'SQLServer',
        'or' => 'Oracle',
        'r'  => 'Redis',
        'po' => 'Postgresql',
        'me' => 'Memcache',
        'mo' => 'Mongodb',
    ];

    public static $db_name_from_es = [
        'mysql'     => 'Mysql',
        'sqlserver' => 'SQLServer',
        'oracle'    => 'Oracle',
        'mongodb'   => 'Mongodb',
        'db2'       => 'DB2',
    ];

    public static $relational_type_db = [
        self::TYPE_MYSQL,
        self::TYPE_SQLSERVER,
        self::TYPE_ORACLE,
        self::TYPE_POSTGRESQL,
    ];

    public static $nosql_name = [
        ServiceTypeEnum::TYPE_MONGODB=>'MongoDB',
        ServiceTypeEnum::TYPE_REDIS=>'Redis',
        ServiceTypeEnum::TYPE_MEMCACHE=>'Memcache',
    ];

    public static $nosql_service_type = [
        ServiceTypeEnum::TYPE_MONGODB,
        ServiceTypeEnum::TYPE_REDIS,
        ServiceTypeEnum::TYPE_MEMCACHE,
    ];
}
