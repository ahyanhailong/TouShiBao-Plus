<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/3
 * Time: 下午5:58
 */

namespace cloudwise\tsb\datasource\services\host\mysql;

use cloudwise\tsb\datasource\base\MysqlService;

class DimHost extends MysqlService
{
    protected $table      = 'dim_host';
    protected $primaryKey = 'id';

    public function getHostByIp($account_id,$host_ip)
    {
        return $this->client->table($this->table)
            ->where('account_id','=',$account_id)
            ->where('host_ip','like',"%".$host_ip."%")
            ->first();
    }


    public function getHostDataByAppIds($params){
        $app_ids = array($params['app_id']);
        $result = $this->client->table('relationship_app_host')
            ->select('app_id','host_id')
            ->where('account_id', $params['account_id'])
            ->whereIn('app_id',$app_ids)
            ->get();

        $host_ids = $host_data = array();
        if($result){
            foreach ($result as $item){
                $host_ids[] = $item->host_id;
            }
        }

        $this->setSelect(array('host_name','host_id'));
        $result = $this->fetchAll( array('account_id'=>$params['account_id'],'host_id in'=>$host_ids) );
        $this->removeSelect();

        foreach ($result as $item){
            $host_data[] = [
                'host_id'=>$item->host_id,
                'host_name'=>$item->host_name,
            ];
        }

        return $host_data;
    }


}