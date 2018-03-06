<?php
namespace cloudwise\tsb\datasource\constants;

/**
 * APP中拓扑的配置
 * User: admin-chen
 * Date: 14-10-27
 * Time: 下午2:28.
 */
class ReportAppTopologyEnum
{
    /**
     * request拓扑图中各类服务的标示.
     */
    const TOPO_NGINX = 'n'; //nginx

    //web
    const TOPO_APACHE = 'a'; //apache
    const TOPO_TOMCAT = 't'; //tomcat

    //代码层(code)
    const TOPO_PHP = 'p'; //php
    const TOPO_JAVA = 'j'; //java
    const TOPO_DOTNET = 'd'; //dotnet
    const TOPO_PYTHON = 'py'; //python
    const TOPO_NODEJS = 'nj'; //nodejs

    //资源层(resource)
    const TOPO_REDIS = 'r'; //redis
    const TOPO_MEMCAHE = 'me'; //memcache
    const TOPO_MYSQL = 'm'; //mysql
    const TOPO_POSTGRESQL = 'po'; //PostgreSQL
    const TOPO_ORACLE = 'or'; //Oracle
    const TOPO_WEBLOGIC = 'we'; //weblogic
    const TOPO_SQLSERVER = 'sq'; //sqlserver
    const TOPO_MONGODB = 'mo'; //mongodb
    const TOPO_DB2 = 'db2';

    // mq
    const TOPO_MQB = 'mqp'; //rabbitMq
    const TOPO_MQC = 'mqc'; //rabbitMq

    const TOPO_CURL = 'curl';
    const TOPO_IO = 'io';

    const TOPO_USER = 'user';

    const TOPO_TRACK_TIME_RANGE = 300000;

    const GROUP_APP = 'app';
    const GROUP_RESOURCE = 'database';
    const GROUP_THIRD_TYPE = 'cloud';
    const GROUP_APP_NORMAL = 'app_normal';
    const GROUP_APP_SLOW = 'app_slow';
    const GROUP_APP_VERY_SLOW = 'app_very_slow';
    const GROUP_APP_ERROR = 'app_error';
    const GROUP_APP_NODATA = 'app_nodata';

    public static $groupColor = [
        self::GROUP_APP        => '#A0E75E',
        self::GROUP_RESOURCE   => '#202020',
        self::GROUP_THIRD_TYPE => '#333',
        self::TOPO_NGINX       => '#333', //nginx

        self::TOPO_APACHE      => '#333', //apache
        self::TOPO_TOMCAT      => '#333', //tomcat
        self::GROUP_THIRD_TYPE => '#333', //tomcat

        self::TOPO_PHP        => '#333', //php
        self::TOPO_JAVA       => '#333', //java
        self::TOPO_DOTNET     => '#333', //dotnet
        self::TOPO_PYTHON     => '#333', //python
        self::TOPO_REDIS      => '#333', //redis
        self::TOPO_MEMCAHE    => '#333', //memcache
        self::TOPO_MYSQL      => '#333', //mysql
        self::TOPO_POSTGRESQL => '#333', //PostgreSQL
        self::TOPO_ORACLE     => '#333', //Oracle
        self::TOPO_WEBLOGIC   => '#333', //weblogic
        self::TOPO_SQLSERVER  => '#333', //sqlserver
        self::TOPO_MONGODB    => '#333', //mongodb

        self::TOPO_CURL => '#333', //mongodb
        self::TOPO_IO   => '#333', //mongodb
    ];

    /**
     * Service_types中对应的code type tab name.
     */
    public static $codeTypeTabName = [
        self::TOPO_PHP    => 'PHP',
        self::TOPO_JAVA   => 'JAVA',
        self::TOPO_DOTNET => '.NET',
        self::TOPO_PYTHON => 'PYTHON',
        self::TOPO_NODEJS => 'NODEJS',
    ];

    public static $rsServiceName = [
        self::TOPO_USER  => 'user',
        self::TOPO_NGINX => 'nginx', //nginx

        self::TOPO_APACHE => 'apache', //apache
        self::TOPO_TOMCAT => 'tomcat', //tomcat

        self::TOPO_PHP        => 'php', //php
        self::TOPO_JAVA       => 'java', //java
        self::TOPO_DOTNET     => 'dotnet', //dotnet
        self::TOPO_NODEJS     => 'nodejs',
        self::TOPO_PYTHON     => 'python', //python
        self::TOPO_REDIS      => 'redis', //redis
        self::TOPO_MEMCAHE    => 'memcache', //memcache
        self::TOPO_MYSQL      => 'mysql', //mysql
        self::TOPO_POSTGRESQL => 'PostgreSQL', //PostgreSQL
        self::TOPO_ORACLE     => 'oracle', //Oracle
        self::TOPO_WEBLOGIC   => 'weblogic', //weblogic
        self::TOPO_SQLSERVER  => 'sqlserver', //sqlserver
        self::TOPO_MONGODB    => 'mongodb', //mongodb
        self::TOPO_DB2        => 'db2', //mongodb

        self::TOPO_CURL => 'curl', //mongodb
        self::TOPO_MQB  => 'cloud', //mongodb
        self::TOPO_MQC  => 'cloud', //mongodb
        self::TOPO_IO   => 'io', //mongodb
    ];

    public static $rsServiceTypeCode = [
        ServiceTypeEnum::TYPE_CODE_AGENT_PHP    => 'php',
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA   => 'java',
        ServiceTypeEnum::TYPE_CODE_AGENT_NET    => '.net',
        ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON => 'python',
        ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS => 'nodejs',
    ];

    public static $rsServiceTypeTopo = [
        ServiceTypeEnum::TYPE_NGINX             => self::TOPO_NGINX,
        ServiceTypeEnum::TYPE_APACHE            => self::TOPO_APACHE,
        ServiceTypeEnum::TYPE_WEBLOGIC          => self::TOPO_WEBLOGIC,
        ServiceTypeEnum::TYPE_TOMCAT            => self::TOPO_TOMCAT,
        ServiceTypeEnum::TYPE_CODE_AGENT_PHP    => self::TOPO_PHP,
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA   => self::TOPO_JAVA,
        ServiceTypeEnum::TYPE_CODE_AGENT_NET    => self::TOPO_DOTNET,
        ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON => self::TOPO_PYTHON,
        ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS => self::TOPO_NODEJS,
        ServiceTypeEnum::TYPE_REDIS             => self::TOPO_REDIS,
        ServiceTypeEnum::TYPE_MEMCACHE          => self::TOPO_MEMCAHE,
        ServiceTypeEnum::TYPE_MYSQL             => self::TOPO_MYSQL,
        ServiceTypeEnum::TYPE_POSTGRESQL        => self::TOPO_POSTGRESQL,
        ServiceTypeEnum::TYPE_ORACLE            => self::TOPO_ORACLE,
        ServiceTypeEnum::TYPE_SQLSERVER         => self::TOPO_SQLSERVER,
        ServiceTypeEnum::TYPE_MONGODB           => self::TOPO_MONGODB,
    ];

    /**
     * 拓扑图中数据对应的名称
     * 注意事项：
     *（1）data_type是前段配置中对应的字段
     *（2）确保link_name的值是唯一的
     * (3) type是前端对应的图片类型.
     *
     * @var array
     */
    public static $appTopologyNameMap = [
        self::TOPO_MQB        => [
            'call_data' => ['service_type' => '', 'data_type' => 'rabbitMq'],
            'name'      => 'mq',
        ],
        self::TOPO_MQC        => [
            'call_data' => ['service_type' => '', 'data_type' => 'rabbitMq'],
            'name'      => 'mq',
        ],
        self::TOPO_NGINX      => [
            'name'      => 'Nginx',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_NGINX, 'data_type' => 'nginx'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_NGINX,
            'type'      => 'service',
        ],
        self::TOPO_APACHE     => [
            'name'      => 'Apache',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_APACHE, 'data_type' => 'apache'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_APACHE,
            'type'      => 'service',
        ],
        self::TOPO_WEBLOGIC   => [
            'name'      => 'Weblogic',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_WEBLOGIC, 'data_type' => 'weblogic'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_WEBLOGIC,
            'type'      => 'service',
        ],
        self::TOPO_TOMCAT     => [
            'name'      => 'Tomcat',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_TOMCAT, 'data_type' => 'tomcat'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_TOMCAT,
            'type'      => 'service',
        ],
        self::TOPO_PHP        => [
            'name'      => 'PHP',
            'data_type' => 'php',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_CODE_AGENT_PHP, 'data_type' => 'php'],
            'status'    => 0,
            'number'    => 0,
            'link_name' => self::TOPO_PHP,
            'type'      => 'php_code',
        ],
        self::TOPO_JAVA       => [
            'name'      => 'JAVA',
            'data_type' => 'java',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_CODE_AGENT_JAVA, 'data_type' => 'java'],
            'status'    => 0,
            'number'    => 0,
            'link_name' => self::TOPO_JAVA,
            'type'      => 'java_code',
        ],
        self::TOPO_DOTNET     => [
            'name'      => '.NET',
            'data_type' => 'net',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_CODE_AGENT_NET, 'data_type' => 'dotnet'],
            'status'    => 0,
            'number'    => 0,
            'link_name' => self::TOPO_DOTNET,
            'type'      => 'dotnet_code',
        ],
        self::TOPO_PYTHON     => [
            'name'      => 'PYTHON',
            'data_type' => 'python',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON, 'data_type' => 'python'],
            'status'    => 0,
            'number'    => 0,
            'link_name' => self::TOPO_PYTHON,
            'type'      => 'python_code',
        ],
        self::TOPO_NODEJS     => [
            'name'      => 'NODEJS',
            'data_type' => 'nodejs',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS, 'data_type' => 'nodejs'],
            'status'    => 0,
            'number'    => 0,
            'link_name' => self::TOPO_NODEJS,
            'type'      => 'nodejs_code',
        ],
        self::TOPO_REDIS      => [
            'name'      => 'Redis',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_REDIS, 'data_type' => 'redis'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_REDIS,
            'type'      => 'cache',
        ],
        self::TOPO_MEMCAHE    => [
            'name'      => 'Memcache',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_MEMCACHE, 'data_type' => 'memcache'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_MEMCAHE,
            'type'      => 'cache',
        ],
        self::TOPO_MYSQL      => [
            'name'      => 'Mysql',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_MYSQL, 'data_type' => 'mysql'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_MYSQL,
            'type'      => 'db',
        ],
        self::TOPO_DB2        => [
            'name'      => 'db2',
            'data_type' => 'db2',
            'call_data' => ['service_type' => '', 'data_type' => 'db2'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_DB2,
            'type'      => 'db',
        ],
        self::TOPO_POSTGRESQL => [
            'name'      => 'Postgresql',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_POSTGRESQL, 'data_type' => 'postgresql'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_POSTGRESQL,
            'type'      => 'db',
        ],
        self::TOPO_ORACLE     => [
            'name'      => 'Oracle',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_ORACLE, 'data_type' => 'oracle'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_ORACLE,
            'type'      => 'db',
        ],
        self::TOPO_SQLSERVER  => [
            'name'      => 'SQLServer',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_SQLSERVER, 'data_type' => 'sqlserver'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_SQLSERVER,
            'type'      => 'db',
        ],
        self::TOPO_MONGODB    => [
            'name'      => 'MongoDB',
            'call_data' => ['service_type' => ServiceTypeEnum::TYPE_MONGODB, 'data_type' => 'mongodb'],
            'status'    => 3,
            'number'    => 0,
            'link_name' => self::TOPO_MONGODB,
            'type'      => 'db',
        ],
        self::TOPO_CURL       => [
            'name'      => 'RESTApi',
            'call_data' => ['service_type' => '', 'data_type' => 'other_RESTApi'],
            'status'    => 0,
            'number'    => 0,
            'link_name' => self::TOPO_CURL,
            'type'      => 'other',
        ],
        self::TOPO_IO         => [
            'name'      => 'IO',
            'call_data' => ['service_type' => '', 'data_type' => 'other_io'],
            'status'    => 0,
            'number'    => 0,
            'link_name' => self::TOPO_IO,
            'type'      => 'other',
        ],
    ];

    /**
     * 拓扑图中各层对应的服务
     */
    public static $appTopologyLayerService = [
        'proxy_layer' => [self::TOPO_NGINX],
        'web_layer'   => [self::TOPO_APACHE, self::TOPO_TOMCAT, self::TOPO_WEBLOGIC],
        'code_layer'  => [
            self::TOPO_PHP,
            self::TOPO_JAVA,
            self::TOPO_DOTNET,
            self::TOPO_PYTHON,
            self::TOPO_NODEJS,
        ],
        'db_layer'    => [
            self::TOPO_REDIS,
            self::TOPO_MEMCAHE,
            self::TOPO_MYSQL,
            self::TOPO_DB2,
            self::TOPO_POSTGRESQL,
            self::TOPO_ORACLE,
            self::TOPO_SQLSERVER,
            self::TOPO_MONGODB,
            self::TOPO_CURL,
            self::TOPO_IO,
        ],
        'mq'          => [self::TOPO_MQB, self::TOPO_MQC],
    ];

    /**
     * 不能点击的配置.
     */
    public static $appTopoNoClick = [
        self::TOPO_IO,
        self::TOPO_CURL,
    ];

    /**
     * 获取request拓扑图的数据结构.
     *
     * @var array
     *
     * @return \stdClass
     */
    public static function getTopologyDataStruct()
    {
        $dataStruct = new stdClass();
        $dataStruct->maxNode = 0;
        $dataStruct->details = new stdClass();
        # user-proxy-web-code-db 请勿交换代码顺序,会影响前端拓扑图效果
        $dataStruct->details->user_layer = [];
        $dataStruct->details->proxy_layer = [];
        $dataStruct->details->web_layer = [];
        $dataStruct->details->code_layer = [];
        $dataStruct->details->db_layer = [];
        #end
        $dataStruct->relations = [];

        return $dataStruct;
    }

    public static $appPruningServiceTypeMap = [
        self::TOPO_JAVA                  => 'type_1002',
        self::TOPO_PHP                   => 'type_1001',
        self::TOPO_NODEJS                => 'type_1005',
        self::TOPO_DOTNET                => 'type_1004',
        self::TOPO_PYTHON                => 'type_1003',
        'BACKEND'                        => 'type_218',
        ServiceTypeEnum::TYPE_MOBILE_SDK => 'type_402',
    ];

    public static $third_perform = [
        self::TOPO_CURL,
        self::TOPO_MQC,
        self::TOPO_MQB,
    ];

    public static $codeTypeMaps = [
        self::TOPO_PHP    => ServiceTypeEnum::TYPE_CODE_AGENT_PHP,
        self::TOPO_JAVA   => ServiceTypeEnum::TYPE_CODE_AGENT_JAVA,
        self::TOPO_DOTNET => ServiceTypeEnum::TYPE_CODE_AGENT_NET,
        self::TOPO_PYTHON => ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON,
        self::TOPO_NODEJS => ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS,
    ];

}
