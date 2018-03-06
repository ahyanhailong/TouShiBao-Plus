<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午11:09
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class AccountServiceExpireSetting extends MysqlService
{
    protected $primaryKey = 'id';
    protected $table      = 'account_service_expire_setting';

    public function getMoudelExpireTime($account_id){
        $result = $this->client->table($this->table)
            ->select(array('service_group','start_time','end_time'))
            ->where('account_id','=',$account_id)
//            ->where('service_group','=',ServiceTypeEnum::TYPE_CODE_AGENT_PHP)
            ->groupBy('service_group')
            ->get();
        return $result;
    }

}