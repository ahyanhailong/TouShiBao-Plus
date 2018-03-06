<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 18/1/2
 * Time: 下午6:08
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class LicenseQuotaUpdatedHistory extends MysqlService
{
    protected $table;
    protected $primaryKey = 'id';

    public function setTable($account_id = null)
    {

        if (!is_null($account_id)) {
            //私有环境下 account_id 服务端会传递 字符串private  $this->table='quota_updated_history_0';
            $this->table = 'quota_updated_history_'.($account_id % 10);
        }
    }

}