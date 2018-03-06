<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/1
 * Time: 下午7:28
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class AccountExpireSetting extends MysqlService
{
    protected $table      = 'account_expire_setting';
    protected $primaryKey = 'account_id';

    //privilege
    const PRIVILEGE_OFF = 1;//用户数据权限:过期时间已过停止接收数据
    const PRIVILEGE_ON = 2;//用户数据权限:过期时间已过不停止接收数据

    //switch_data
    const SWITCH_DATA_ON = 1;//用户数据状态:开启
    const SWITCH_DATA_OFF = 2;//用户数据状态:关闭

    //paid_status
    const PAID_STATUS_NO = 1;//账号未付费
    const PAID_STATUS_YES = 2;//账号未付费

    public function getAccountType($account_id){
        return $this->client->table($this->table)
            ->select(array('paid_status'))
            ->where('account_id','=',$account_id)
            ->get();
    }
}