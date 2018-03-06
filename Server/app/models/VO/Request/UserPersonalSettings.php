<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/26
 * Time: 下午7:00
 */

namespace App\models\VO\Request;


use App\models\VO\Common;

class UserPersonalSettings extends Common
{
    public $language;//语言

    public $time_zone;//时区

    public $head_portrait;//头像

    public $subscription;//消息订阅

    public $alert_style_setting;

    public $user_id;
}