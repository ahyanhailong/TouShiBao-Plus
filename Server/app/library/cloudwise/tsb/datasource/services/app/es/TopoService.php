<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:29
 */

namespace cloudwise\tsb\datasource\services\app\es;

use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use App\library\Service\DataProcessorES;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;


class TopoService extends ESService
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
        'app_id'     => [
            'type'  => 'term',
            'field' => 'app_id',
        ],
        'account_id' => [
            'type'  => 'term',
            'field' => 'account_id',
        ],
    ];

    public function getTopoData($params)
    {

        return __FUNCTION__;
    }

    public function getRequestStatisticsTable($params)
    {

        return __FUNCTION__;
    }

    public function getRequestTrendChart($params)
    {

        $data         = array();
        $sum          = $rpm = 0;
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']) {
                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $data['count'][$bucket['key']] = $bucket['doc_count'];
                }

                $sum = $result['hits']['total'];
                $rpm = round($result['hits']['total'] / ($params['end_time'] - $params['start_time']) * 1000 * 60, 2);

            }
            $data        = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            $data['sum'] = $sum;
            $data['rpm'] = $rpm;

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getRespTimeTrendChart($params)
    {

        $data         = $tool_top = array();
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']) {
                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $data['resp_time'][$bucket['key']]      = round($bucket['resp_time']['avg'] / 1000, 2);
                    $data['tool_tip_min'][$bucket['key']]   = round($bucket['resp_time']['min'] / 1000, 2);
                    $data['tool_tip_max'][$bucket['key']]   = round($bucket['resp_time']['max'] / 1000, 2);
                    $data['tool_tip_avg'][$bucket['key']]   = round($bucket['resp_time']['avg'] / 1000, 2);
                    $data['tool_tip_count'][$bucket['key']] = $bucket['resp_time']['count'];
                }

                $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);

                foreach ($data['data']['resp_time'] as $key => $item) {
                    $tool_top[$key] = [
                        'avg'   => $data['data']['tool_tip_avg'][$key],
                        'min'   => $data['data']['tool_tip_min'][$key],
                        'max'   => $data['data']['tool_tip_max'][$key],
                        'count' => $data['data']['tool_tip_count'][$key],
                    ];
                }
                unset($data['data']['tool_tip_min']);
                unset($data['data']['tool_tip_max']);
                unset($data['data']['tool_tip_avg']);
                unset($data['data']['tool_tip_count']);

                $data['tool_tip']  = $tool_top;
                $data['title_avg'] = round($result['aggregations']['resp_time']['value'] / 1000, 2);
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }


        return $data;
    }

    public function getErrorTrendChart($params)
    {
        $data         = array();
        $sum          = $rpm = 0;
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']) {
                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $data['error'][$bucket['key']] = $bucket['exception']['value'];
                }

                $sum = $result['aggregations']['exception_sum']['value'];
                $rpm = round($sum / ($params['end_time'] - $params['start_time']) * 1000 * 60, 2);

            }
            $data        = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            $data['sum'] = $sum;
            $data['rpm'] = $rpm;

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getTopoLayout($params)
    {

        return __FUNCTION__;
    }

    public function getTopoInstanceInfo($params)
    {

        $data     = $db_name = array();
        $source_db_type  = explode(':', $params['node_id'], 2);
        $db_type  = strtolower(ServiceTypeEnum::$MYSQL_NAME[$source_db_type[0]]);
        $instance = $source_db_type[1];
        // TODO app_name 数组未能查询
        $app_id_name = [];

        foreach ($params['app_to_db'] as $item) {
            $tmp_name         = explode('-', $item, 2);
            $db_name[]        = $tmp_name[1];
            $params['app_id'] = $tmp_name[0];
        }

        $aQueryParams             = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['db_raw']   = $db_name;
        $aQueryParams['db_type']  = $db_type;
        $aQueryParams['instance'] = $instance;
        $min = ($params['end_time'] - $params['start_time']) / 60000;

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);

            $result = $this->client->search($aTplParams);
            if($result['aggregations']['app_id']['buckets']){
                foreach($result['aggregations']['app_id']['buckets'] as $app_info){
                    if($app_info['nest']['filter']['db_name']['buckets']){
                        foreach($app_info['nest']['filter']['db_name']['buckets'] as $db_info){
                            $tmp = array();
                            $tmp['dbn_raw'] = $db_info['key'];
                            $tmp['db_name'] = $params['node_id'];
                            $tmp['instance_raw'] = $instance;
                            $tmp['app_id'] = $app_info['key'];
                            if(array_key_exists($tmp['app_id'],$app_id_name)){
                                $tmp['app_name'] = $app_id_name[$tmp['app_id']];
                            }else{
                                $tmp['app_name'] = $tmp['app_id'];
                            }
                            $tmp['resp_time'] = round($db_info['info']['value'] / 1000, 2);
                            $tmp['request'] = $db_info['doc_count'];
                            $tmp['rpm'] = round($db_info['doc_count'] / $min, 2);
                            $key_params = array(
                                $tmp['dbn_raw'],
                                $tmp['db_name'],
                                $tmp['instance_raw'],
                                $tmp['app_id'],
                            );
                            $key = md5(json_encode($key_params));
                            $data[$key] = $tmp;
                        }
                    }
                }
            }
            usort($data,function($v1,$v2){
                if($v1['resp_time'] < $v2['resp_time']){
                    return 1;
                }
            });

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function saveTopoLayout($params)
    {

        return __FUNCTION__;
    }

    public function getAppCurrentStatus($params)
    {

        return __FUNCTION__;
    }

}