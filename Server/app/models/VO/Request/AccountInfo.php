<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/26
 * Time: 下午7:14
 */

namespace App\models\VO\Request;


use App\models\VO\Common;

class AccountInfo extends Common
{
    public $account_id;

    public $account_status;

    public $create_time;

    public $package_id;

    public $currency_type;

    public $balance_value;

    public $recharge_time;

    public $app_id;

    public $register_time;

    public $channel;
}