<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:53
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\UserEnum;

class UserPersonalSettings extends MysqlService
{
    protected $primaryKey = 'id';
    protected $table      = 'user_personal_settings';

    public $language;//语言

    public $time_zone;//时区

    public $head_portrait;//头像

    public $subscription;//消息订阅

    public $alert_style_setting;

    public $user_id;

    public function selfInsert()
    {
        $insert = [
            'user_id'             => $this->user_id,
            'language'            => $this->language ? $this->language : UserEnum::SYSTEM_LANGUAGE_ZN,
            'time_zone'           => $this->time_zone ? $this->time_zone : UserEnum::SYSTEM_TIMEZONE_P0800,
            'subscription'        => UserEnum::SYSTEM_NOTICE_SUBSCRIPTION_YES,
            'alert_style_setting' => json_encode(
                [
                    UserEnum::SMS   => [
                        UserEnum::STATUS             => UserEnum::STATUS_TRUE, //是否接收告警
                        UserEnum::SMS_DND            => UserEnum::STATUS_FALSE, //是否开启免打扰
                        UserEnum::DND_START_TIME     => '',
                        UserEnum::DND_SUSTAINED_TIME => '',
                    ],
                    UserEnum::EMAIL => [
                        UserEnum::STATUS => UserEnum::STATUS_TRUE,
                        UserEnum::TYPE   => UserEnum::TYPE_HTML,
                    ],
                ]),
            'head_portrait'       => null,
        ];

        return $this->insert($insert);
    }
}