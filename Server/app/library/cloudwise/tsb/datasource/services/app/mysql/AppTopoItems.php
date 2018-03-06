<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/13
 * Time: 下午3:57
 */

namespace cloudwise\tsb\datasource\services\app\mysql;


use cloudwise\tsb\business\app\web\AppGeneralMethod;
use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\ReportAppTopologyEnum;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;

class AppTopoItems extends MysqlService
{
    protected $table = 'app_topo_items';
    protected $primaryKey = 'id';

    public function getAppConnections($params, $dimAppModel, $rsAppHostModel)
    {

        $app_status_ids = $nodes = $edges = $app_ids = $extra_info = array();
        $connections    = $this->client->table($this->table)
            ->where('account_id', '=', $params['account_id'])
            ->where('app_path', 'like', '%' . $params['app_id'] . '%')
            ->get();

        //获取拓扑图中应用的详细信息
        $app_infos = $this->getAppInfos($connections, $dimAppModel, $params);
        $app_infos = $app_infos['data'];

        //获取所有的当前用户的app_id
        $app_ids = $this->getAllAppIds($params, $dimAppModel);


        //生成nodes和edges数组内容
        foreach ($connections as $connection) {
            $connection = json_decode($connection->app_path, 1);

            $app_from_type                     = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $connection['app_id_from']);
            $nodes[$connection['app_id_from']] = [
                'id'    => $connection['app_id_from'],
                'group' => 'app_nodata',
                'lable' => isset($app_infos[$connection['app_id_from']]) ? $app_infos[$connection['app_id_from']] : '',
                'type'  => 'app',
                'title' => strtoupper(ServiceTypeEnum::$pluginList[$app_from_type]),
            ];
            $app_status_ids[]                  = $connection['app_id_from'];

            // id  应用以及第三方id 就是app_id   db的id为type+ip+port  mq为 mq+type+ip+port
            // group  应用app_status   db->mysql   第三方和mq->cloud
            // lable  应用->应用名称    第三方->RESTApi+resource_ip+port  mq 前缀为mq其他同第三方   db-》type+ip+port

            //from->to id->id

            //应用到应用或者第三方
            if ($connection['app_id_to']) {

                $to = $connection['app_id_to'];
                if (in_array($connection['app_id_to'], $app_ids)) {
                    $to_group           = 'app_nodata';
                    $to_lable           = isset($app_infos[$connection['app_id_to']]) ? $app_infos[$connection['app_id_to']] : '';
                    $app_status_ids[]   = $connection['app_id_to'];
                    $nodes[$to]['type'] = 'app';

                    $app_to_type         = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $connection['app_id_to']);
                    $nodes[$to]['title'] = strtoupper(ServiceTypeEnum::$pluginList[$app_to_type]);
                } else {
                    $to_group = 'cloud';
                    $to_lable = 'RESTApi:' . $connection['resource_ip'] . ':' . $connection['resource_port'];;
                }

            } else {
                // 应用连 mq
                if (in_array($connection['resource_type'], ReportAppTopologyEnum::$third_perform)) {
                    $to_group = 'cloud';
                    $to_lable = 'mq:' . $connection['resource_ip'] . ':' . $connection['resource_port'];

                } else {
                    // 应用连mysql
                    $to_group = 'mysql';
                    $to_lable = ReportAppTopologyEnum::$rsServiceName[$connection['resource_type']] . ':' . $connection['resource_ip'] . ':' . $connection['resource_port'];
                }

                $to = $connection['resource_type'] . ':' . $connection['resource_ip'] . ':' . $connection['resource_port'];

            }

            $nodes[$to]['id']    = $to;
            $nodes[$to]['group'] = $to_group;
            $nodes[$to]['label'] = $to_lable;


            if (isset($connection['db_name']) && $connection['db_name']) {
                $extra_info[$connection['app_id_from'] . $to]['db_con'][]  = $connection['app_id_from'] . '-' . $connection['db_name'];
                $extra_info[$connection['app_id_from'] . $to]['db_name'][] = $connection['db_name'];
                $nodes[$to]['extra_info']                                  = $extra_info[$connection['app_id_from'] . $to];
                $nodes[$to]['number']                                      = count($nodes[$to]['extra_info']);
            }


            $edges[$connection['app_id_from'] . ':' . $to] = [
                'from'   => $connection['app_id_from'],
                'to'     => $to,
                'arrows' => 'to',
            ];
        }

        // 设置应用节点,主机个数
        $appRsHost = $rsAppHostModel->getAppHostNum($app_status_ids,$params['account_id']);
        foreach ($nodes as $key=>$node){
            if(isset($appRsHost[$node['id']])){
                $nodes[$key]['number'] = $appRsHost[$node['id']];
            }
        }

        return array('nodes' => array_values($nodes), 'edges' => array_values($edges), 'app_ids' => array_unique($app_status_ids));
    }


    public function getAppInfos($connections, $dimAppModel, $params)
    {

        $data = $app_ids = array();
        foreach ($connections as $connection) {
            $connection = json_decode($connection->app_path, 1);
            $app_ids[]  = $connection['app_id_from'];
            if ($connection['app_id_to']) {
                $app_ids[] = $connection['app_id_to'];
            }
        }

        $dimAppModel->setSelect(array('app_id', 'app_name', 'port'));
        $result = $dimAppModel->fetchAll(array('account_id' => $params['account_id'], 'app_id in' => array_values($app_ids)));

        foreach ($result as $item) {
            $data[$item->app_id] = $item->app_name . ':' . $item->port;
        }

        return array('data' => $data, 'app_ids' => $app_ids);
    }

    public function getAllAppIds($params, $dimAppModel)
    {
        $data = array();
        $dimAppModel->setSelect(array('app_id'));
        $app_list = $dimAppModel->fetchAll(array('account_id' => $params['account_id']));
        $dimAppModel->removeSelect();
        foreach ($app_list as $item) {
            $data[] = $item->app_id;
        }

        return array_unique($data);
    }

}