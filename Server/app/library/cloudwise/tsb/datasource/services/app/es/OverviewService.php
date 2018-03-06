<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午3:47
 */

namespace cloudwise\tsb\datasource\services\app\es;

use App\library\Service\DataProcessorES;
use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\constants\ElasticSearchEnum;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;


class OverviewService extends ESService
{
    public $fields = [
        'start_time' => [
            'type'  => 'gt',
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
        'host_ids'   => [
            'type'  => 'terms',
            'field' => 'target_id',
        ],
    ];

    public function getTitleQuota($params)
    {
        $return = [
            'resp_time' => '-',
            'rpm'       => 0,
            'normal'    => 0,
            'slow'      => 0,
            'very_slow' => 0,
            'error'     => 0,
            'exception' => 0,
        ];
        $min = ($params['end_time'] - $params['start_time']) / 60000;
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['slow'] = $params['slow'];
        $aQueryParams['very_slow'] = $params['very_slow'];
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            //            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                $return['resp_time'] = round($result['aggregations']['resp_time']['value'] / 1000, 2);
                $return['rpm'] = round($result['hits']['total'] / $min, 2);
                $return['normal'] = $result['aggregations']['normal']['doc_count'];
                $return['slow'] = $result['aggregations']['slow']['doc_count'];
                $return['very_slow'] = $result['aggregations']['very_slow']['doc_count'];
                $return['error'] = $result['aggregations']['error']['value'];
                $return['exception'] = $result['aggregations']['exception']['value'];
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getSlowDbTableChart($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['slow'] = $params['slow'];
        $aQueryParams['very_slow'] = $params['very_slow'];
        $aQueryParams['service_types'] = ServiceTypeEnum::$relational_type_db;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['nest']['doc_count'] && $result['aggregations']['nest']['filter']['doc_count']) {
                foreach ($result['aggregations']['nest']['filter']['db']['buckets'] as $db) {
                    $db_info = explode(ElasticSearchEnum::EXPLODE_STRING, $db['key']);
                    $tmp = [];
                    $tmp['db_name'] = $db_info[0];
                    $tmp['table_name'] = $db_info[1];
                    if ($db['time']['value'] / 1000 > $params['vary_slow']) {
                        $tmp['status'] = 'very_slow';
                    } else {
                        if ($db['time']['value'] / 1000 > $params['slow']) {
                            $tmp['status'] = 'slow';
                        } else {
                            $tmp['status'] = 'normal';
                        }
                    }

                    $tmp['execute_time'] = round($db['time']['value'] / 1000, 2);

                    $return[] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getHealthAffairsTop5($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['slow'] = $params['slow'];
        $aQueryParams['very_slow'] = $params['very_slow'];
        $aQueryParams['top_count'] = 5;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            $i = 1;
            if ($result['aggregations']['filter']['doc_count']) {
                foreach ($result['aggregations']['filter']['uri']['buckets'] as $uri) {
                    $tmp = [];
                    $tmp['order'] = $i++;
                    $tmp['uri'] = $uri['key'];
                    $tmp['normal'] = $uri['normal']['doc_count'];
                    $tmp['slow'] = $uri['slow']['doc_count'];
                    $tmp['very_slow'] = $uri['very_slow']['doc_count'];
                    $tmp['resp_time'] = round($uri['time']['value'] / 1000, 2);
                    $return[] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getDbInstanceTop5($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['slow'] = $params['slow'];
        $aQueryParams['very_slow'] = $params['very_slow'];
        $aQueryParams['top_count'] = 5;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['nest']['doc_count']) {
                $i = 1;
                foreach ($result['aggregations']['nest']['instance']['buckets'] as $instance) {
                    if (!$instance['key']) {
                        continue;
                    }
                    $tmp = [];
                    $tmp['order'] = $i++;
                    $tmp['instance'] = $instance['key'];
                    $tmp['normal'] = $instance['normal']['doc_count'];
                    $tmp['slow'] = $instance['slow']['doc_count'];
                    $tmp['very_slow'] = $instance['very_slow']['doc_count'];
                    $tmp['execute_time'] = round($instance['time']['value'] / 1000, 2);
                    $return[] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getExternalServiceTop3($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['top_count'] = 3;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['nest']['doc_count']) {
                foreach ($result['aggregations']['nest']['domain']['buckets'] as $domain) {
                    $tmp = [];
                    $tmp['domain'] = $domain['key'];
                    $tmp['resp_time'] = round($domain['resp_time']['value'] / 1000, 2);

                    $tmpTime = [];
                    foreach ($domain['time']['buckets'] as $item) {
                        $tmpTime['time'][ $item['key'] ] = round($item['resp_time']['avg'] / 1000, 2);
                        $tmpTime['max'][ $item['key'] ] = round($item['resp_time']['max'] / 1000, 2);
                        $tmpTime['min'][ $item['key'] ] = round($item['resp_time']['min'] / 1000, 2);
                        $tmpTime['count'][ $item['key'] ] = $item['doc_count'];
                    }

                    $tmp['trend'] = DataProcessorES::instance()->processLineData(
                        $params['start_time'], $params['end_time'], $tmpTime);

                    $return[] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getHostStatusChart($params)
    {
        $return = [
            'total'=>0,
            'list'=>[]
        ];
        $params['service_type'] = ServiceTypeEnum::TYPE_BURDEN;
        $aQueryParams = $this->getNewQueryParams($params, ['host_ids', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['top_count'] = 5;
        $aQueryParams['type'] = $this->getESType(
            [
                ServiceTypeEnum::TYPE_CPU_USE_RATE,
                ServiceTypeEnum::TYPE_BURDEN,
                ServiceTypeEnum::TYPE_SYSTEM_PROCESS,
                ServiceTypeEnum::TYPE_RAM_USE_RATE,
            ]);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
//                        $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $return['total'] = $result['aggregations']['host_num']['value'];
                foreach ($result['aggregations']['host']['buckets'] as $host) {
                    $tmp = [];
                    $tmp['host_id'] = $tmp['host_name'] = $host['key'];
                    $tmp['process_num'] = round($host['process_num']['value'], 2);
                    $tmp[ AppEnum::SETTING_HOST_TYPE_CPU_RATE ] = round($host['cpu_rate']['value'] * 100, 2);
                    $tmp[ AppEnum::SETTING_HOST_TYPE_RAM_RATE ] = round($host['ram_rate']['value'], 2);
                    $tmp['cpu_burden'] = round($host['cpu_burden']['value'], 2);
                    if ($tmp[ $params[ AppEnum::SETTING_HOST_TYPE ] ] > $params[ AppEnum::SETTING_HOST_FATAL_WARNING ]) {
                        $tmp['status'] = AppEnum::SETTING_HOST_FATAL_WARNING;
                    } else {
                        if ($tmp[ $params[ AppEnum::SETTING_HOST_TYPE ] ] > $params[ AppEnum::SETTING_HOST_WARNING ]) {
                            $tmp['status'] = AppEnum::SETTING_HOST_WARNING;
                        } else {
                            $tmp['status'] = AppEnum::SETTING_BASIC_NORMAL;
                        }
                    }
                    $return['list'][] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getSlowSqlTop5($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['top_count'] = 5;
        $aQueryParams['service_types'] = ServiceTypeEnum::$relational_type_db;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        $min = TimeRangeEnum::getFactsInterval($params['start_time'], $params['end_time'], true) / 60000;
        try {
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['nest']['doc_count'] && $result['aggregations']['nest']['filter']['doc_count']) {
                $i = 1;
                foreach ($result['aggregations']['nest']['filter']['sql']['buckets'] as $sql) {
                    $tmp = [];
                    $tmp['order'] = $i++;
                    $tmp['sql'] = $sql['key'];
                    $tmp['execute_time'] = round($sql['resp_time']['value'] / 1000, 2);
                    $tmp['rpm'] = round($sql['doc_count'] / $min, 2);
                    $return[] = $tmp;
                }
            }

            Business::replaceDataForTableList($return, 'sql', $params['account_id'], $aQueryParams['service_type']);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

}