<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/11
 * Time: 上午10:18
 */

namespace cloudwise\tsb\datasource\services\app\es;


use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ElasticSearchEnum;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;


class AppList extends ESService
{
    public $fields = [
        'start_time' => [
            'type'  => 'gte',
            'field' => 'collTime',
        ],
        'end_time'   => [
            'type'  => 'lte',
            'field' => 'collTime',
        ],
        'app_ids'    => [
            'type'  => 'terms',
            'field' => 'app_id',
        ],
        'account_id' => [
            'type'  => 'term',
            'field' => 'account_id',
        ],
        'target_id' => [
            'type'  => 'terms',
            'field' => 'target_id',
        ],
        'resp_status' => [
            'type'  => 'term',
            'field' => 'resp_status',
        ],
    ];

    public function getAppList($params, $app_ids)
    {

        $data                 = array();
        foreach ($app_ids as $service_type => $appIds) {
            $params['service_type'] = $service_type;
            $params['app_ids']      = $appIds;
            $aQueryParams           = $this->getNewQueryParams($params, ['app_ids', 'account_id', 'start_time', 'end_time']);

            try {
                $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
                $result = $this->client->search($aTplParams);
                if ($result['aggregations']) {
                    foreach ($result['aggregations']['app_id']['buckets'] as $bucket) {
                        $data[$bucket['key']] = [
                            'wt'          => round($bucket['resp_time']['value'] / 1000, 2),
                            'rpm'         => round($bucket['doc_count'] / 60, 2),
                            'error_count' => $bucket['error']['sum'],
                            'error_rate'  => round($bucket['error']['avg'] * 100, 2),
                        ];
                    }
                }

            } catch (\Exception $e) {
                LogService::logException($e);
            }
        }

        return $data;
    }

    public function getAppHealthStatus($params ,$app_ids ){

        $returnData                 = array();
        foreach ($app_ids as $service_type => $appIds) {
            $params['service_type'] = $service_type;
            $params['app_ids']      = $appIds;
            $aQueryParams           = $this->getNewQueryParams($params, ['app_ids', 'account_id', 'start_time', 'end_time']);
            if(!isset($params['query_index'])) {
                $aQueryParams['index'] = $this->getESIndex($service_type, $params['start_time'], $params['end_time'], ElasticSearchEnum::INDEX_TYPE_HOUR);
            }

            $aQueryParams['aggs']['slow'] = $params['slow'];
            $aQueryParams['aggs']['very_slow'] = $params['very_slow'];
//dd($aQueryParams);
            try {
                $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
                $result = $this->client->search($aTplParams);
                if ($result['hits']['total']) {

                    foreach ($result['aggregations']['app_id']['buckets'] as $bucket) {
                        $app_id = $bucket['key'];
                        $all = $bucket['doc_count'];
                        $return[$app_id]['normal_rate']    = $bucket['filter']['normal_count']['value'] / $all * 100;
                        $return[$app_id]['much_slow_rate'] = $bucket['filter']['much_slow_count']['value'] / $all * 100;
                        $return[$app_id]['slow_rate']      = $bucket['filter']['slow_count']['value'] / $all * 100;
                        $return[$app_id]['error_rate']     = $bucket['error_rate']['value'] * 100;

                        if ($return[$app_id]['error_rate'] > $params[AppEnum::SETTING_TOPO][AppEnum::SETTING_TOPO_ERROR]) {
                            $returnData[$app_id] = AppEnum::SETTING_TOPO_ERROR;
                            continue;
                        }

                        if ($return[$app_id]['much_slow_rate'] > $params[AppEnum::SETTING_TOPO][AppEnum::SETTING_TOPO_VERY_SLOW]) {
                            $returnData[$app_id] = AppEnum::SETTING_TOPO_VERY_SLOW;
                            continue;
                        }

                        if ($return[$app_id]['slow_rate'] > $params[AppEnum::SETTING_TOPO][AppEnum::SETTING_TOPO_SLOW]) {
                            $returnData[$app_id] = AppEnum::SETTING_TOPO_SLOW;
                            continue;
                        }

                        $returnData[$app_id] = AppEnum::SETTING_TOPO_NORMAL;

                    }
                }


            } catch (\Exception $e) {
                LogService::logException($e);
            }
        }

        return $returnData;
    }

    public function getHostList($params ,$host_ids){

        $data   = array();
        $services = array(
            'type_'.ServiceTypeEnum::TYPE_CPU_USE_RATE,
            'type_'.ServiceTypeEnum::TYPE_BURDEN,
            'type_'.ServiceTypeEnum::TYPE_SYSTEM_PROCESS,
            'type_'.ServiceTypeEnum::TYPE_RAM_USE_RATE,
            'type_'.ServiceTypeEnum::TYPE_DISK_USE_RATE,
        );
        $params['service_type'] = ServiceTypeEnum::TYPE_CPU_USE_RATE;
        $params['target_id'] = $host_ids;
        $params['resp_status'] = 1;
        $aQueryParams = $this->getNewQueryParams($params, ['target_id', 'account_id', 'start_time', 'end_time','resp_status','service_type']);
        $aQueryParams['type'] = implode(',',$services);
        $aQueryParams['order'] = $params['order'];
        $aQueryParams['sort'] = $params['sort'];
//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if($result['hits']['total']){
                foreach ($result['aggregations']['groupBy']['buckets'] as $val) {
                    $data[$val['key']] = array(
                        'host_id' => $val['key'],
                        'process_num' => floor($val['process_num']['value']),
                        'cpu_burden' => round($val['cpu_burden']['value'], 2),
                        'ram_rate' => round($val['ram_rate']['value'], 2),
                        'cpu_rate' => round((1 - $val['cpu_rate']['value']) * 100, 2),
                        '15min'=>round($val['15min']['value'] , 2),
                        'wait'=>round($val['wait']['value']*100 , 2),
                    );
                }
            }
        }catch (\Exception $e){
            LogService::logException($e);
        }

        return $data;
    }

    public function getLiveApps($params,$app_ids){
        $data                 = array();
        foreach ($app_ids as $service_type => $appIds) {
            $params['service_type'] = $service_type;
            $params['app_ids']      = $appIds;
            $aQueryParams           = $this->getNewQueryParams($params, ['app_ids', 'account_id', 'start_time', 'end_time']);

//dd($aQueryParams);
            try {
                $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                $this->ddTpl($aTplParams);
                $result = $this->client->search($aTplParams);

                if($result['aggregations']){
                    foreach ($result['aggregations']['app_id']['buckets'] as $bucket){
                        if($bucket['doc_count']){
                            $data[] = $bucket['key'];
                        }
                    }
                }

            }catch (\Exception $e){
                LogService::logException($e);
            }
        }

        return $data;
    }

}