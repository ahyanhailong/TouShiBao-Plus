<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/3
 * Time: 下午5:58
 */

namespace cloudwise\tsb\datasource\services\app\mysql;

use cloudwise\tsb\datasource\base\MysqlService;

class RsAppHost extends MysqlService
{
    protected $table = 'relationship_app_host';
    protected $primaryKey = 'id';

    public function getAppHostNum($app_id_list, $account_id)
    {
        $result = array();
        $data = $this->client->table($this->table)
            ->select($this->client->getConnection()->raw('count(distinct host_id) as num,app_id'))
            ->groupBy($this->table.'.app_id')
            ->where('account_id', $account_id)
            ->whereIn('app_id', $app_id_list)
            ->get();

        if($data){
            foreach ($data as $item){
                $result[$item->app_id] = $item->num;
            }
        }

        return $result;
    }

}