<?php
namespace cloudwise\tsb\datasource\constants;

use App\library\Service\ConfigService;

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 16/9/8
 * Time: 下午3:30.
 */
class AccountEnum
{
    //账号未付费
    const ACCOUNT_PAID_STATUS_NO = 1;
    //账号未付费
    const ACCOUNT_PAID_STATUS_YES = 2;

    const EXPIRE_TIME = 5;//14天有效期,单位秒
    //用户数据权限:过期时间已过停止接收数据
    const PRIVILEGE_OFF = 1;
    //用户数据权限:过期时间已过不停止接收数据
    const PRIVILEGE_ON = 2;
    //用户数据状态:开启
    const ACCOUNT_DATA_SWITCH_ON = 1;
    //用户数据状态:关闭
    const ACCOUNT_DATA_SWITCH_OFF = 2;

    const EMAIL_SEND_YES = 1;
    const EMAIL_SEND_NO = 2;

    const TRIAL_DAYS = 5;  //前端页面模块用户过期天数倒计时提醒时间
    const MODULE_EXPIRE_WARNING_DAYS_DEFAULT = 25;  //前端页面模块用户过期天数倒计时提醒时间

    const REGESTER_DEAFULT_EXPIRE_TIME = 15;                //注册邮件过期提醒天数

    const ORDER_TO_SUBMIT_BEFORE_END_TIME = 10;

    public static function getRegesterDefaultExpireTime()
    {
        $config = ConfigService::instance()->getConfig('admin.account_data_expiry_date_default');
        if ($config) {
            return $config;
        }

        return self::REGESTER_DEAFULT_EXPIRE_TIME;
    }

    public static function getOrderEndTimeLeft()
    {
        $time = ConfigService::instance()->getConfig('partner.orderToSubmitBeforeEndTime');
        if (!$time) {
            $time = self::ORDER_TO_SUBMIT_BEFORE_END_TIME;
        }

        return $time * 24 * 60 * 60;
    }

    /**
     * 获取试用时间.
     *
     * @return int|mixed
     */
    public static function getTrialTime()
    {
        $config_span = ConfigService::instance()->getConfig('admin.account_data_expiry_date_default');
        if ($config_span) {
            return $config_span;
        }

        return self::TRIAL_DAYS;
    }

    /**
     * 模块过期时间 提醒日期，剩余天数，单位:天
     *
     * @return int|mixed
     */
    public static function getExpireWarningTime()
    {
        $config_span = ConfigService::instance()->getConfig('admin.module_expire_warning_time');
        if ($config_span) {
            return $config_span;
        }

        return self::MODULE_EXPIRE_WARNING_DAYS_DEFAULT;
    }

    const EXPIRE_WARNING_COOKIE_TIME = 1;  //用户过期提醒框关闭动作,coookie保存时间1天

    public static function getExpireWarningCookieTime()
    {
        $config_span = ConfigService::instance()->getConfig('admin.expire_warning_cookie_time');
        if ($config_span) {
            return $config_span;
        }

        return self::EXPIRE_WARNING_COOKIE_TIME;
    }

    public static $EXPIRE_COUNT_DAYS = [           //配置过期提醒的时间节点
        'expire_level_1' => 0, //已过期
        'expire_level_2' => 5, //还有5天过期
        'expire_level_3' => 10//还有10天过期
    ];

    public static $EXPIRE_WARNING_MOUDEL = [
        'app'       => 1001,
        'app_admin' => 218,
        'mobile'    => 402,
        'ue'        => 11,
        'host'      => 100,
    ];

    public static function getExpireWarningMoudel()
    {
        $config_span = ConfigService::instance()->getConfig('admin.expire_warning_moudel');
        if ($config_span) {
            return $config_span;
        }

        return self::$EXPIRE_WARNING_MOUDEL;
    }

    public static function getExpireCountDays()
    {
        $config_span = ConfigService::instance()->getConfig('admin.expire_count_days');
        if ($config_span) {
            return $config_span;
        }

        return self::$EXPIRE_COUNT_DAYS;
    }

    const SEND_EXPIRE_EMAIL_INTERVAL = 60;   //过期邮件提醒发送间隔分钟

    public static function getSendTimeSpan()
    {
        $config_span = ConfigService::instance()->getConfig('admin.send_expire_email_interval');
        if ($config_span) {
            return $config_span;
        }

        return self::SEND_EXPIRE_EMAIL_INTERVAL;
    }

    //用户权限状态名称
    public static $switch_name = [
        self::PRIVILEGE_ON  => 'on',
        self::PRIVILEGE_OFF => 'off',
    ];
}
