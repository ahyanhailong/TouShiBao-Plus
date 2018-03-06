<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 18/1/4
 * Time: 下午12:06
 */

namespace cloudwise\tsb\datasource\services\host\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use cloudwise\tsb\datasource\constants\SmartAgentEnum;

class NewPluginOfHost extends MysqlService
{

    protected $table = 'new_plugin_of_host';
    protected $primaryKey = 'id';


    public function getGroupHostIdByServiceType($account_id,$filter=null){
        $result = $this->client->table($this->table)
            ->select($this->client->getConnection()->raw('count(*) as count,service_type,host_id'))
            ->where('account_id' ,'=', $account_id)
            ->where('plugin_version' ,'<>', '')
            ->groupBy($this->client->getConnection()->raw('concat(service_type,host_id)'));
        if($filter){
            $result
                ->whereNotIn('service_type',$filter);
        }
        $result = $result->get();

        return $result;
    }

    public function getGroupSserviceTypeByHostId($account_id,$hostIds){

        $result = $this->client->table($this->table)
            ->select($this->client->getConnection()->raw('count(*) as count,service_type,host_id'))
            ->where('account_id' ,'=', $account_id)
            ->whereIn('host_id',$hostIds)
            ->where('plugin_version','<>','')
            ->whereIn('status',array(SmartAgentEnum::INSTALL_BUTTON,SmartAgentEnum::UPDATE_BUTTON))
            ->groupBy($this->client->getConnection()->raw('concat(service_type,host_id)'))
            ->get();

        return $result;
    }

    public function getUserPluginType($account_id)
    {
        $return = array();
        $list = $this->client->table('new_plugin_of_host')
            ->select('service_type')
            ->groupBy('service_type')
            ->where('account_id','=',$account_id)
            ->where('plugin_version','<>','')
            ->whereIn('service_type',array_keys(ServiceTypeEnum::$pluginList))
            ->get();
        if($list){
            foreach($list as $item){
                $return[$item->service_type] = ServiceTypeEnum::$pluginList[$item->service_type];
            }
        }

        return $return;
    }

}