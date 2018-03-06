<?php
namespace cloudwise\tsb\datasource\constants;

use App\library\Service\ConfigService;

/**
 *user常量.
 *
 * Class UserEnum
 */
class UserEnum
{
    /*****用户登陆方式*****/
    const LOGIN_REGION = 1;   //多region登陆
    const LOGIN_PRIVATE = 2;  //私有化单点登陆

    // api分享
    const DATA_SHARE_CHOSEN = 1;
    const DATA_SHARE_NOT_CHOSEN = 2;

    /*****申请用户状态*****/
    const REGISTER_STATUS_NORMAL = 1; //已注册，等待审核
    const REGISTER_STATUS_PASS = 2; //审核通过
    const REGISTER_STATUS_FAIL = 3; //审核失败

    private static $register_status = [
        self::REGISTER_STATUS_NORMAL => '等待审核',
        self::REGISTER_STATUS_PASS   => '审核通过',
        self::REGISTER_STATUS_FAIL   => '审核失败',
    ];

    const APP_ID_JKB = '10001';
    const APP_ID_TSB = '10002';
    const APP_ID_YCB = '10003';
    const APP_ID_ALERT = '10004';

    /*****正式用户状态*****/
    const USER_STATUS_NORMAL = 1; //正常使用
    const USER_STATUS_AWAITING_ACTIVATE = 2; //等待激活
    const USER_STATUS_PAUSED = 3; //已暂停
    const USER_STATUS_DELETED = 4; //已删除

    /******* 手机认证状态 *******/
    const USER_MOBILE_AUTH_YES = 1; //已认证手机
    const USER_MOBILE_AUTH_NO = 2; //未认证手机

    public static $mobile_auth = [
        self::USER_MOBILE_AUTH_YES => '解除认证',
        self::USER_MOBILE_AUTH_NO  => '认证手机',
    ];

    public static $mobile_is_auth = [
        self::USER_MOBILE_AUTH_YES => '已认证',
        self::USER_MOBILE_AUTH_NO  => '未认证',
    ];

    public static $mobile_auth_tips = [
        self::USER_MOBILE_AUTH_NO  => '认证',
        self::USER_MOBILE_AUTH_YES => '解除绑定',

    ];

    /******* 系统语言 *******/
    const SYSTEM_LANGUAGE_EN = 1; //英文
    const SYSTEM_LANGUAGE_ZN = 2; //中文
    private static $system_language = [
        self::SYSTEM_LANGUAGE_ZN => '/resource/img/admin/cn-flag.png',
        self::SYSTEM_LANGUAGE_EN => '/resource/img/admin/am-flag.png',
    ];

    public static function getSystemLanguage()
    {
        return self::$system_language;
    }

    /******* 系统时区 *******/
    const SYSTEM_TIMEZONE_P0800 = 'P0800';
    const SYSTEM_TIMEZONE_N1200 = 'N1200';
    const SYSTEM_TIMEZONE_N1100 = 'N1100';
    const SYSTEM_TIMEZONE_N1000 = 'N1000';
    const SYSTEM_TIMEZONE_N0900 = 'N0900';
    const SYSTEM_TIMEZONE_N0800 = 'N0800';
    const SYSTEM_TIMEZONE_N0700 = 'N0700';
    const SYSTEM_TIMEZONE_N0600 = 'N0600';
    const SYSTEM_TIMEZONE_N0500 = 'N0500';
    const SYSTEM_TIMEZONE_N0400 = 'N0400';
    const SYSTEM_TIMEZONE_N0300 = 'N0300';
    const SYSTEM_TIMEZONE_N0200 = 'N0200';
    const SYSTEM_TIMEZONE_N0100 = 'N0100';
    const SYSTEM_TIMEZONE_P0000 = 'P0000';
    const SYSTEM_TIMEZONE_P0100 = 'P0100';
    const SYSTEM_TIMEZONE_P0200 = 'P0200';
    const SYSTEM_TIMEZONE_P0300 = 'P0300';
    const SYSTEM_TIMEZONE_P0400 = 'P0400';
    const SYSTEM_TIMEZONE_P0500 = 'P0500';
    const SYSTEM_TIMEZONE_P0600 = 'P0600';
    const SYSTEM_TIMEZONE_P0630 = 'P0630';
    const SYSTEM_TIMEZONE_P0700 = 'P0700';
    const SYSTEM_TIMEZONE_P0900 = 'P0900';
    const SYSTEM_TIMEZONE_P1000 = 'P1000';
    const SYSTEM_TIMEZONE_P1100 = 'P1100';
    const SYSTEM_TIMEZONE_P1200 = 'P1200';
    const SYSTEM_TIMEZONE_P1300 = 'P1300';

    private static $system_timezone = [
        self::SYSTEM_TIMEZONE_P0800 => '(GMT+0800) 北京时间：北京、重庆、香港、新加坡 ',
        self::SYSTEM_TIMEZONE_N1200 => '(GMT-1200) 日界线西',
        self::SYSTEM_TIMEZONE_N1100 => '(GMT-1100) 中途岛、萨摩亚群岛',
        self::SYSTEM_TIMEZONE_N1000 => '(GMT-1000) 夏威夷',
        self::SYSTEM_TIMEZONE_N0900 => '(GMT-0900) 阿拉斯加',
        self::SYSTEM_TIMEZONE_N0800 => '(GMT-0800) 太平洋时间  (美国和加拿大)',
        self::SYSTEM_TIMEZONE_N0700 => '(GMT-0700) 山地时间  (美国和加拿大)',
        self::SYSTEM_TIMEZONE_N0600 => '(GMT-0600) 中部时间  (美国和加拿大)、墨西哥城',
        self::SYSTEM_TIMEZONE_N0500 => '(GMT-0500) 东部时间  (美国和加拿大)、波哥大',
        self::SYSTEM_TIMEZONE_N0400 => '(GMT-0400) 大西洋时间  (加拿大)、加拉加斯',
        self::SYSTEM_TIMEZONE_N0300 => '(GMT-0300) 巴西、布宜诺斯艾利斯、乔治敦',
        self::SYSTEM_TIMEZONE_N0200 => '(GMT-0200) 中大西洋',
        self::SYSTEM_TIMEZONE_N0100 => '(GMT-0100) 亚速尔群岛、佛得角群岛',
        self::SYSTEM_TIMEZONE_P0000 => '(GMT+0000) 格林尼治标准时：西欧时间、伦敦、卡萨布兰卡',
        self::SYSTEM_TIMEZONE_P0100 => '(GMT+0100) 中欧时间、安哥拉、利比亚',
        self::SYSTEM_TIMEZONE_P0200 => '(GMT+0200) 东欧时间、开罗、雅典',
        self::SYSTEM_TIMEZONE_P0300 => '(GMT+0300) 巴格达、科威特、莫斯科',
        self::SYSTEM_TIMEZONE_P0400 => '(GMT+0400) 阿布扎比、马斯喀特、巴库',
        self::SYSTEM_TIMEZONE_P0500 => '(GMT+0500) 叶卡捷琳堡、伊斯兰堡、卡拉奇',
        self::SYSTEM_TIMEZONE_P0600 => '(GMT+0600) 阿拉木图、 达卡、新亚伯利亚',
        self::SYSTEM_TIMEZONE_P0630 => '(GMT+0630) 仰光',
        self::SYSTEM_TIMEZONE_P0700 => '(GMT+0700) 曼谷、河内、雅加达',
        self::SYSTEM_TIMEZONE_P0900 => '(GMT+0900) 东京、汉城、大阪、雅库茨克',
        self::SYSTEM_TIMEZONE_P1000 => '(GMT+1000) 悉尼、关岛',
        self::SYSTEM_TIMEZONE_P1100 => '(GMT+1100) 马加丹、索罗门群岛',
        self::SYSTEM_TIMEZONE_P1200 => '(GMT+1200) 奥克兰、惠灵顿、堪察加半岛',
        self::SYSTEM_TIMEZONE_P1300 => '(GMT+1300) 努库阿洛法',
    ];

    public static function getSystemTimezone()
    {
        return self::$system_timezone;
    }

    /********* 消息订阅 ********/
    const SYSTEM_NOTICE_SUBSCRIPTION_YES = 1; //订阅系统消息
    const SYSTEM_NOTICE_SUBSCRIPTION_NO = 2; //不订阅系统消息

    /********** email、短信设置枚举常量 ************/
    const SMS = 'sms';
    const SMS_DND = 'dnd'; //免打扰
    const DND_START_TIME = 'start';
    const DND_SUSTAINED_TIME = 'sustained'; //免打扰持续时间
    const STATUS = 'status';
    const STATUS_TRUE = true;
    const STATUS_FALSE = false;
    const EMAIL = 'email';
    const TYPE = 'type';
    const TYPE_HTML = 'html';
    const TYPE_TXT = 'txt';

    public static function getEmailType()
    {
        return [
            self::TYPE_HTML => 'HTML',
            self::TYPE_TXT  => 'Txt(纯文本)',
        ];
    }

    //用户信息cache标签
    const USER_INFO_CACHE_TAG = '__USER_INFO_TAG';
    //用户信息cookie
    const USER_INFO_COOKIE_KEY = '__USER_INFO_TICKET';

    const USER_INFO_COOKIE_CACHE_TIME = 1440;//默认过期时间

    /*****用户角色*****/
    const USER_ROLE_ADMIN = 1;
    const USER_ROLE_ADVANCED = 2;
    const User_ROLE_READONLY = 3;

    //    cwop的用户角色
    const USER_ROLE_CWOP_IS_MASTER = 1;
    private static $userRoles = [
        self::USER_ROLE_ADMIN    => '管理员',
        self::USER_ROLE_ADVANCED => '高级用户',
        self::User_ROLE_READONLY => '普通用户',
    ];

    public static function getRoles()
    {
        return self::$userRoles;
    }

    public static function getDefaultUserCacheTime()
    {
        $config = ConfigService::instance()->getConfig('cache.user_cache');
        if($config){
            return $config;
        }

        return self::USER_INFO_COOKIE_CACHE_TIME;
    }
}
