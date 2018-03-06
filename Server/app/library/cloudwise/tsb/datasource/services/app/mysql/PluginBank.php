<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/26
 * Time: 下午5:31
 */

namespace cloudwise\tsb\datasource\services\app\mysql;


use App\library\Service\ConfigService;
use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\base\LogService;
use App\library\Service\RESTService;
use cloudwise\tsb\datasource\constants\SmartAgentEnum;

class PluginBank extends MysqlService
{
    protected $table = 'plugin_bank';
    protected $primaryKey = 'id';

    public function findNewestVersion($params)
    {
        $sql = $this->client->table($this->table);
        if(!in_array($params['service_type'],SmartAgentEnum::$plugin_unique)){
            $sql->where('host_type','=',$params['host_type']);
        }
        if(isset($params['plugin_env'])){
            $plugin = $sql->where('service_type', '=', $params['service_type'])
                ->select('plugin_version', 'path')
                ->where('generation', '=', SmartAgentEnum::PLUGIN_GENERATION_TWO)
                ->where('plugin_env', 'like', '%'.$params['plugin_env'].'%')
                ->orderBy('id', 'desc')
                ->first();
        }else{
            $plugin = $sql->where('service_type', '=', $params['service_type'])
                ->select('plugin_version', 'path','plugin_env')
                ->where('generation', '=', SmartAgentEnum::PLUGIN_GENERATION_TWO)
                ->orderBy('id', 'desc')
                ->get();

            foreach ($plugin as $obj){
                if(!$obj->plugin_env){
                    $plugin = $obj;
                    break;
                }
            }
        }

        if($plugin){
            return array('url'=>ConfigService::instance()->getConfig('domainName').'/static/plugin/'.$plugin->path,'version'=>$plugin->plugin_version,'path'=>$plugin->path);
        }else{
            return false;
        }
    }


    public function getAgentInfo($params)
    {
        $result = $data = array();
        $sql = $this->client->table($this->table);

        $plugin = $sql->where('service_type', '=', $params['service_type'])
            ->select('plugin_version', 'path','plugin_env','host_type','service_type')
            ->where('generation', '=', SmartAgentEnum::PLUGIN_GENERATION_TWO)
            ->orderBy('id', 'asc')
            ->get();


        foreach ($plugin as $item){
            $item->plugin_env = $item->plugin_env ? $item->plugin_env : 'old';
            $result[$item->host_type][$item->plugin_env] = [
                'package'=>$item->path,
                'url'=>ConfigService::instance()->getConfig('domainName').'/static/plugin/'.$item->path,
                'version'=>$item->plugin_version,
                'env'=>$item->plugin_env,
                'host_type'=>$item->host_type,
            ];
        }

      return $result;

    }

}