<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:57
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class AccountInfo extends MysqlService
{
    protected $primaryKey = 'account_id';
    protected $table      = 'account_info';

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

    public function selfInsert()
    {
        $insert = [
            'package_id'  => $this->package_id ? $this->package_id : '',
            'create_time' => time(),
            'channel'     => $this->channel ? $this->channel : UserInfo::CLOUDWISE,
            'account_id'  => $this->account_id,
        ];

        return $this->insert($insert);
    }
}