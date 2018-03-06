<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/26
 * Time: 下午6:25
 */

namespace App\models\VO\Request;


use App\models\VO\Common;

class UserInfo extends Common
{
    public $user_id;

    public $account_id;

    public $user_email;

    public $user_pass;

    public $user_name;

    public $user_status;

    public $user_ticket;

    public $user_mobile;

    public $mobile_auth;

    public $user_qq;

    public $user_from;

    public $login_time;

    public $last_login_time;

    public $activating_time;

    public $channel;

    public $relationship_cwop_user_id;

    public $relationship_cwop_account_id;
}