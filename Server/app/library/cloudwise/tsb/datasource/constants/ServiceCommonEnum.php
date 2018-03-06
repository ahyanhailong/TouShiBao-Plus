<?php
namespace cloudwise\tsb\datasource\constants;
/**
 * Created by PhpStorm.
 * User: admin-chen
 * Date: 14-8-19
 * Time: 上午10:54.
 */
class ServiceCommonEnum
{
    const STATUS_STOP = 1; //暂停
    const STATUS_NORMAL = 2; //正常
    const STATUS_OFFLINE = 3; //不可用

    const DISPATCH_STATUS_WATTING = 1; //等待调度
    const DISPATCH_STATUS_DISPATHED = 2; //已调度

    const TARGET_TYPE_DOMAIN = 1; //网站项目
    const TARGET_TYPE_PAGE = 2; //网站页面
    const TARGET_TYPE_HOST = 3; //主机
    const TARGET_TYPE_API = 4; //API
    const TARGET_TYPE_APP = 5; //APP
    const TARGET_TYPE_SDK = 6; //SDK
    const TARGET_TYPE_BACKGROUND_TASK = 7; //SDK
    const TARGET_TYPE_HOST_LIST = 7; //主机批量修改
    const TARGET_TYPE_BUSINESS = 8; //业务系统

    const UUID_LOCK_DEFAULT = '0'; //默认的uuid值,string(0)即无
    const UUID_TRY_PUSH_SPACE = 300; //多久后开始尝试重新push
    const UUID_TRY_PUSH_SPACE_OVER = 900; //多久后停止尝试push

    const PLUGIN_STATUS_NO_INSTALL = 2; //服务未安装插件

    public static $statusMsg = array(
        self::STATUS_NORMAL  => 'open',
        self::STATUS_OFFLINE => 'closed',
        self::STATUS_STOP    => 'pause',
    );

    public static $target_type_name = array(
        self::TARGET_TYPE_DOMAIN => 'domain',
        self::TARGET_TYPE_PAGE   => 'page',
        self::TARGET_TYPE_HOST   => 'host',
        self::TARGET_TYPE_API    => 'api',
        self::TARGET_TYPE_SDK    => 'sdk',
    );

    public static $status = array(
        self::STATUS_NORMAL  => '正常',
        self::STATUS_OFFLINE => '不可用',
        self::STATUS_STOP    => '关闭',
    );

    public static $rsTypeName = [
        'web_app'        => ServiceCommonEnum::TARGET_TYPE_DOMAIN,
        'mobile_app'     => ServiceCommonEnum::TARGET_TYPE_SDK,
        'background_app' => ServiceCommonEnum::TARGET_TYPE_BACKGROUND_TASK,
        'host'           => ServiceCommonEnum::TARGET_TYPE_HOST,
        'browser_app'    => ServiceCommonEnum::TARGET_TYPE_PAGE,
        'service_topo'   => ServiceCommonEnum::TARGET_TYPE_BUSINESS,
    ];
}
