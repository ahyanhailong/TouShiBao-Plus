<?php
namespace cloudwise\tsb\datasource\constants;

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 15-1-20
 * Time: 下午7:37.
 */
class SmartAgentEnum
{
    /**
     * smartAgent数据版本配置.
     */
    const DATA_VERSION_1 = 1;

    const OS_TYPE_WINDOWS = 'Windows'; //目录名称
    const OS_TYPE_LINUX = 'Linux'; //目录名称
    const OS_TYPE_AIX = 'Aix'; //目录名称

    const TYPE_LINUX = 1;
    const TYPE_WINDOWS = 2;
    const TYPE_AIX = 3;

    const PLUGIN_GENERATION_ONE = 1;
    const PLUGIN_GENERATION_TWO = 2;

    public static $plugin_unique = array(
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA,
    );

    //smartagent配置方式
    const SMARTAGENT_SETTING_COMMAND_LINE = 1;//只进行命令行配置同步
    const SMARTAGENT_SETTING_CONTROL_PANEL = 2;//控制面板同步+命令行同步

    //smartagent通知状态
    const SMARTAGENT_START_INFORM_ON = 1;
    const SMARTAGENT_START_INFORM_OFF = 2;

    const SMARTAGENT_STATUS_NORMAL = 1; //smartagent状态正常
    const SMARTAGENT_STATUS_OFFLINE = 2; //smartagent状态不正常
    const SMARTAGENT_STATUS_OFFLINE_PLACE = 300; //smartagent状态异常检查间隔

    const NEW_PLUGIN_OF_HOST_DISPATCH_ON = 1; //未被调度
    const NEW_PLUGIN_OF_HOST_DISPATCH_OFF = 2; //已被调度

    const HEARTBEAT_ABNORMAL = '心跳异常';
    //插件的心跳状态
    const PLUGIN_HEARTBEAT_STATUS_ON = 1;
    const PLUGIN_HEARTBEAT_STATUS_OFF = 2;
    const PLUGIN_HEARTBEAT_STATUS_ERROR = 3;
//    static public $PluginHeartbeatStatusName = array(
////        self::PLUGIN_HEARTBEAT_STATUS_ON    => Lang::get('system.plugin_manage.plugin_heartbeat_status_on'),
//        self::PLUGIN_HEARTBEAT_STATUS_OFF   => '停止',
//        self::PLUGIN_HEARTBEAT_STATUS_ERROR => '异常',
//    );
    public static function PluginHeartbeatStatusName()
    {
        return array(
            self::PLUGIN_HEARTBEAT_STATUS_ON => Lang::get('system.plugin_manage.plugin_heartbeat_status_on'),
            self::PLUGIN_HEARTBEAT_STATUS_OFF => Lang::get('system.plugin_manage.plugin_heartbeat_status_off'),
            self::PLUGIN_HEARTBEAT_STATUS_ERROR => Lang::get('system.plugin_manage.plugin_heartbeat_status_error'),
        );
    }

    /**
     * 安装(默认) -> 正在安装  -> (成功) -> 更新
     *                       -> (失败) -> 安装.
     *
     * 更新 -> 正在更新 -> (成功 || 失败) -> 更新
     */
    const INSTALL_BUTTON = 1; //插件安装按钮
    const UPDATE_BUTTON = 2; //插件更新按钮
    const INSTALLING_BUTTON = 3; //插件正在安装
    const UPDATING_BUTTON = 4; //插件正在更新

    const PLUGIN_SWITCH_ON = 1; //插件开
    const PLUGIN_SWITCH_OFF = 2; //插件关

    const PLUGIN_SWITCH_ABLE = 1; //插件开关可用
    const PLUGIN_SWITCH_DISABLE = 2; //插件开关不可用

    const PLUGIN_CONF_ABLE = 1; //插件配置可用
    const PLUGIN_CONF_DISABLE = 2; //插件配置不可用
    //插件安装&更新按钮
    public static function getPluginInstallButton()
    {
        return array(
            self::INSTALL_BUTTON => Lang::get('common.install'),
            self::UPDATE_BUTTON => Lang::get('common.update'),
            self::INSTALLING_BUTTON => Lang::get('common.installing'),
            self::UPDATING_BUTTON => Lang::get('common.updating'),
        );
    }

    //不允许安装或更新的插件配置
    public static $NoAllowInstallOrUpdate = array(
        ServiceTypeEnum::TYPE_SEND_PROXY,
    );

    //单实例多服务的插件配置
    public static $singleMutliService = array(
        ServiceTypeEnum::TYPE_ORACLE,
    );

    //不需要用户进行配置的插件
    public static $NoPluginConf = array(
        ServiceTypeEnum::TYPE_SEND_PROXY,
        ServiceTypeEnum::TYPE_DISCOVER,
        ServiceTypeEnum::TYPE_GROUP_OS,
        ServiceTypeEnum::TYPE_APACHE_BASIC,
        ServiceTypeEnum::TYPE_NGINX_BASIC,
        ServiceTypeEnum::TYPE_CODE_AGENT_PHP,
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA,
        ServiceTypeEnum::TYPE_CODE_AGENT_NET,
        ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON,
        ServiceTypeEnum::TYPE_WEBLOGIC,
        ServiceTypeEnum::TYPE_JVM,
        ServiceTypeEnum::TYPE_DOCKER,
        ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS,
        ServiceTypeEnum::TYPE_VARNISH,

    );

    //smartAgent中默认安装的插件
    public static $AutoInstallSmartAgentPlugin = array(
//        ServiceTypeEnum::TYPE_SMARTAGENT => 'SmartAgent',
        ServiceTypeEnum::TYPE_GROUP_OS => 'OS',
        ServiceTypeEnum::TYPE_DISCOVER => 'Discover',
        ServiceTypeEnum::TYPE_SEND_PROXY => 'SendProxy',
    );

    /**
     * 返回所有带有黑名单的webServer集合.
     *
     * @var array
     */
    public static $webServerWithBlackListGroup = array(
        ServiceTypeEnum::TYPE_APACHE_BASIC,
        ServiceTypeEnum::TYPE_NGINX_BASIC,
    );

    //OS插件组
    public static $serviceGroupOs = array(
        ServiceTypeEnum::TYPE_HOST,
        ServiceTypeEnum::TYPE_BURDEN,
        ServiceTypeEnum::TYPE_CPU_USE_RATE,
        ServiceTypeEnum::TYPE_RAM_USE_RATE,
        ServiceTypeEnum::TYPE_LAN_TRAFFIC,
        ServiceTypeEnum::TYPE_DISK_USE_RATE,
        ServiceTypeEnum::TYPE_DISK_IO,
        ServiceTypeEnum::TYPE_SYSTEM_PROCESS,
        ServiceTypeEnum::TYPE_SYSTEM_TCP,
    );

    //apache需要的插件组
    public static $apachePluginGroup = array(
        ServiceTypeEnum::TYPE_APACHE,
        ServiceTypeEnum::TYPE_APACHE_BASIC,
    );

    //nginx需要的插件组
    public static $nginxPluginGroup = array(
        ServiceTypeEnum::TYPE_NGINX,
        ServiceTypeEnum::TYPE_NGINX_BASIC,
    );

    //插件类型配置
    public static $PluginTypeEnum = array(
        ServiceTypeEnum::TYPE_SEND_PROXY => 'built-in',
        ServiceTypeEnum::TYPE_DISCOVER => 'built-in',
        ServiceTypeEnum::TYPE_GROUP_OS => 'server',

        ServiceTypeEnum::TYPE_CODE_AGENT_PHP => 'Application',
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA => 'Application',
        ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON => 'Application',
        ServiceTypeEnum::TYPE_CODE_AGENT_NET => 'Application',
        ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS => 'Application',
        ServiceTypeEnum::TYPE_APACHE_BASIC => 'Application',
        ServiceTypeEnum::TYPE_NGINX_BASIC => 'Application',

        ServiceTypeEnum::TYPE_APACHE => 'Apache',
        ServiceTypeEnum::TYPE_NGINX => 'Nginx',
        ServiceTypeEnum::TYPE_WEBLOGIC => 'Weblogic',
        ServiceTypeEnum::TYPE_MYSQL => 'Mysql',
        ServiceTypeEnum::TYPE_MONGODB => 'Mongodb',
        ServiceTypeEnum::TYPE_REDIS => 'Redis',
        ServiceTypeEnum::TYPE_MEMCACHE => 'Memcache',
        ServiceTypeEnum::TYPE_TOMCAT => 'Tomcat',
        ServiceTypeEnum::TYPE_SQLSERVER => 'Sql_server',
        ServiceTypeEnum::TYPE_ORACLE => 'Oracle',
        ServiceTypeEnum::TYPE_RABBIT_MQ => 'RabbitMQ',
        ServiceTypeEnum::TYPE_JVM => 'jvm',
        ServiceTypeEnum::TYPE_POSTGRESQL => 'postgreSQL',
        ServiceTypeEnum::TYPE_DOCKER => 'Docker',
        ServiceTypeEnum::TYPE_COUCHBASE => 'CouchBase',
        ServiceTypeEnum::TYPE_VARNISH => 'Varnish',
    );

    /**
     * smartAgent插件管理页面tpl.
     */
    public static $settingConfTplEnum = array(
        ServiceTypeEnum::TYPE_TOMCAT => 'setting_tomcat',
        ServiceTypeEnum::TYPE_APACHE => 'setting_apache',
        ServiceTypeEnum::TYPE_NGINX => 'setting_nginx',
        ServiceTypeEnum::TYPE_MYSQL => 'setting_mysql',
        ServiceTypeEnum::TYPE_MONGODB => 'setting_mongodb',
        ServiceTypeEnum::TYPE_REDIS => 'setting_redis',
        ServiceTypeEnum::TYPE_MEMCACHE => 'setting_memcache',
        ServiceTypeEnum::TYPE_ORACLE => 'setting_oracle',
        ServiceTypeEnum::TYPE_WEBLOGIC => 'setting_weblogic',
        ServiceTypeEnum::TYPE_CODE_AGENT_PHP => 'setting_php',
        ServiceTypeEnum::TYPE_CODE_AGENT_NET => 'setting_dnet',
        ServiceTypeEnum::TYPE_RABBIT_MQ => 'setting_rabbit_mq',

        ServiceTypeEnum::TYPE_IIS => 'setting_iis',
        ServiceTypeEnum::TYPE_SQLSERVER => 'setting_sqlserver',
        ServiceTypeEnum::TYPE_POSTGRESQL => 'seting_postgresql',
        ServiceTypeEnum::TYPE_JVM => 'seting_jvm',
        ServiceTypeEnum::TYPE_COUCHBASE => 'seting_couchbase',

    );

    //插件类型（后台上传插件用到的）
    public static $pluginType = array(
        ServiceTypeEnum::TYPE_GROUP_OS => 'os',
        ServiceTypeEnum::TYPE_DISCOVER => 'discover',
        ServiceTypeEnum::TYPE_SEND_PROXY => 'sendProxy',
        ServiceTypeEnum::TYPE_CODE_AGENT_PHP => 'PHPAgent',
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA => 'JavaAgent',
        ServiceTypeEnum::TYPE_CODE_AGENT_NET => '.NetAgent',
        ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON => 'PythonAgent',
        ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS => 'NodejsAgent',
        ServiceTypeEnum::TYPE_APACHE => 'apache',
        ServiceTypeEnum::TYPE_APACHE_BASIC => 'apacheModule',
        ServiceTypeEnum::TYPE_LIGHTTPD => 'lighttpd',
        ServiceTypeEnum::TYPE_NGINX => 'nginx',
        ServiceTypeEnum::TYPE_NGINX_BASIC => 'nginxModule',
        ServiceTypeEnum::TYPE_WEBLOGIC => 'weblogic',
        ServiceTypeEnum::TYPE_MYSQL => 'mysql',
        ServiceTypeEnum::TYPE_MONGODB => 'mongodb',
        ServiceTypeEnum::TYPE_REDIS => 'redis',
        ServiceTypeEnum::TYPE_MEMCACHE => 'memcache',
        ServiceTypeEnum::TYPE_TOMCAT => 'tomcat',
        ServiceTypeEnum::TYPE_IIS => 'iis',
        ServiceTypeEnum::TYPE_SQLSERVER => 'sql_server',
        ServiceTypeEnum::TYPE_ORACLE => 'oracle',
        ServiceTypeEnum::TYPE_RABBIT_MQ => 'rabbit_mq',
        ServiceTypeEnum::TYPE_JVM => 'jvm',
        ServiceTypeEnum::TYPE_POSTGRESQL => 'postgreSQL',
        ServiceTypeEnum::TYPE_DOCKER => 'Docker',
        ServiceTypeEnum::TYPE_COUCHBASE => 'CouchBase',
        ServiceTypeEnum::TYPE_VARNISH => 'Varnish',
    );

    /**
     * 没有端口的服务
     */
    public static $noPortService = array(
        ServiceTypeEnum::TYPE_CODE_AGENT_PHP,
        ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON,
        ServiceTypeEnum::TYPE_CODE_AGENT_NET,
        ServiceTypeEnum::TYPE_CODE_AGENT_JAVA,
        ServiceTypeEnum::TYPE_APACHE_BASIC,
        ServiceTypeEnum::TYPE_NGINX_BASIC,
        ServiceTypeEnum::TYPE_DOCKER,
        ServiceTypeEnum::TYPE_JVM,
    );

    /**
     * 组装discover 数据.
     *
     * @param      $service_type
     * @param      $service_name
     * @param null $port
     *
     * @return array
     */
    public static function AssembleDiscoverData($service_type, $service_name, $port = null)
    {
        return array(
            'service_type' => $service_type,
            'service_name' => $service_name,
            'service_qualifier' => is_null($port) ? $service_type : $service_type.'x'.$port,
            'attaches' => null,
            'version' => '',
            'installPath' => '',
            'ports' => '',
            'dispatch_status' => ServiceSchedulerConfigExtEnum::DISPATCH_STATUS_DISPATHED,
        );
    }

    /**
     * 处理被监控对象（实例）名称.
     *
     * @param $service_type
     * @param $service_qualifier
     *
     * @return mixed|string
     */
    public static function disposeServiceName($service_type,$service_qualifier)
    {
        $service_qualifier_info = explode('x',$service_qualifier);
        $service_port = array_pop($service_qualifier_info);
        //将apache 和 nginx module名称统一
        if (in_array($service_type, array(ServiceTypeEnum::TYPE_NGINX_BASIC, ServiceTypeEnum::TYPE_APACHE_BASIC))) {
            return ServiceTypeEnum::$serviceNameList[$service_type];
        }
        if (array_key_exists($service_type, self::$AutoInstallSmartAgentPlugin)) {
            if ($service_type == ServiceTypeEnum::TYPE_GROUP_OS) {
                $service_qualifier = Lang::get('system.plugin_manage.host_physical_performance');
            }else{
                $service_qualifier = '-';
            }
        }else if($service_port){
            $service_qualifier = ServiceTypeEnum::$serviceNameList[$service_type].':'.$service_port;
        }else{
            $service_qualifier = ServiceTypeEnum::$serviceNameList[$service_type];
        }

        if (array_key_exists($service_type, ServiceTypeEnum::$serviceNameList)) {
            if (strpos($service_qualifier, '@@')) {
                $service_qualifier = str_replace(array('@@','@'),array(':\\','\\'),$service_qualifier);
            } else {
                $service_qualifier = str_replace(array('@'),array('/'),$service_qualifier);
            }
        }

        return $service_qualifier;
    }

    /**
     * 生成domain app_id的方法.
     *
     * @param $domain 域名
     * @param $port 端口
     *
     * @return string
     */
    public static function makeDomainAppId($domain, $port)
    {
        return DESService::instance()->md5ToDec(md5($domain.':'.$port));
    }

    /**
     * 生成sdk app_id的方法.
     *
     * @param $account_id
     *
     * @return string
     */
    public static function makeSdkAppId($account_id)
    {
        return DESService::instance()->md5ToDec(md5($account_id.':'.uniqid()));
    }

    /**
     * 生成host_id的方法.
     *
     * @param $account_id
     * @param $uuid
     *
     * @return string
     */
    public static function makeHostId($account_id, $uuid)
    {
        return DESService::instance(DESService::VERSION_V_2)->md5ToDec(md5(json_encode(array('account_id' => $account_id, 'uuid' => $uuid))));
    }
}
