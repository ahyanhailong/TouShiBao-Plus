<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午8:40
 */

namespace cloudwise\tsb\datasource\services\app\es;

use App\library\Service\DataProcessorES;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ElasticSearchEnum;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;


class MessageQueueService extends ESService
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
        'pst'        => [
            'type'  => 'term',
            'field' => 'pst',
        ],
        'instance'   => [
            'type'  => 'term',
            'field' => 'instance_raw',
        ],
        'dbn'        => [
            'type'  => 'term',
            'field' => 'dbn_raw',
        ],
    ];

    /**
     * 实例与消费者列表
     *
     * @param $params
     *
     * @return array
     */
    public function getInstanceAndDbnList($params)
    {
        $order_map = [
            'resp_time'  => 'resp',
            'msg_total'  => '_count',
            'msg_pm'     => '_count',
            'flow_total' => 'flow',
            'flow_pm'    => 'flow',
        ];
        $params['order'] = ArrayHelper::extractValueFromArray($params['order'], $order_map, 'resp_time');
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['pst'] = $params['pst'];
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['pst']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $min = ($params['end_time'] - $params['start_time']) / 60000;
                foreach ($result['aggregations']['nest']['filter']['instance']['buckets'] as $instance) {
                    $tmp = [];
                    $tmp['instance'] = $instance['key'];
                    $tmp['resp_time'] = round($instance['resp']['value'] / 1000, 2);
                    $tmp['msg_total'] = $instance['doc_count'];
                    $tmp['msg_pm'] = round($instance['doc_count'] / $min, 2);
                    $tmp['flow_total'] = $instance['flow']['value'];
                    $tmp['flow_pm'] = round($instance['flow']['value'] / $min, 2);
                    $tmp['list'] = [];
                    foreach ($instance['dbn']['buckets'] as $dbn) {
                        $tmpItem = [];
                        $tmpItem['dbn'] = $dbn['key'];
                        $tmpItem['resp_time'] = round($instance['resp_time']['value'] / 1000, 2);
                        $tmpItem['msg_total'] = $instance['doc_count'];
                        $tmpItem['msg_pm'] = round($instance['doc_count'] / $min, 2);
                        $tmpItem['flow_total'] = $instance['flow']['value'];
                        $tmpItem['flow_pm'] = round($instance['flow']['value'] / $min, 2);
                        $tmp['list'][] = $tmpItem;
                    }

                    $return[] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 服务总耗时
     *
     * @param $params
     *
     * @return array
     */
    public function getServiceTotalTimeTrend($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['pst'] = $params['pst'];
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['pst']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                foreach ($result['aggregations']['nest']['filter']['instance']['buckets'] as $instance) {
                    foreach ($instance['time']['buckets'] as $time) {
                        $return[ $instance['key'] ][ $time['key'] ] = round($time['time']['value'] / 1000, 2);
                    }
                }

                $return = DataProcessorES::instance()->processLineData(
                    $params['start_time'], $params['end_time'], $return);
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 每分钟消息数与平均耗时
     *
     * @param $params
     *
     * @return array
     */
    public function getRpmAndTimeTrend($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['pst'] = $params['pst'];
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['pst', 'instance']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $min = TimeRangeEnum::getIntervalTimeMin($params['start_time'], $params['end_time']);
                foreach ($result['aggregations']['nest']['filter']['time']['buckets'] as $time) {
                    $return['avg_time'][ $time['key'] ] = round($time['time']['value'] / 1000, 2);
                    $return['msg_pm'][ $time['key'] ] = round($time['doc_count'] / $min, 2);
                }

                $return = DataProcessorES::instance()->processLineData(
                    $params['start_time'], $params['end_time'], $return);
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 每分钟流量
     *
     * @param $params
     *
     * @return array
     */
    public function getFlowPmTrend($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['pst'] = $params['pst'];
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['pst', 'instance']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $min = TimeRangeEnum::getIntervalTimeMin($params['start_time'], $params['end_time']);
                foreach ($result['aggregations']['nest']['filter']['time']['buckets'] as $time) {
                    $return['flow_pm'][ $time['key'] ] = round($time['flow']['value'] / $min, 2);
                }

                $return = DataProcessorES::instance()->processLineData(
                    $params['start_time'], $params['end_time'], $return);
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 消耗者耗时占比
     *
     * @param $params
     *
     * @return array
     */
    public function getCallerRate($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['pst'] = $params['pst'];
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['pst', 'instance', 'dbn']), 'nest_sub_methods');
        $aQueryParams['top_count'] = 5;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        //        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $return['other'] = $result['aggregations']['nest']['filter']['total']['value'];
                foreach ($result['aggregations']['uri']['buckets'] as $uri) {
                    $return[ $uri['key'] ] = $uri['nest']['filter']['total']['value'];
                    $return['other'] -= $return[ $uri['key'] ];
                }
                foreach ($return as $index => $value) {
                    $return[ $index ] = round($value);
                }

                if ($return['other'] == 0) {
                    unset($return['other']);
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 生产者-消费情况列表
     *
     * @param $params
     *
     * @return array
     */
    public function getConsumerList($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['pst'] = $params['pst'];
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['pst', 'instance', 'dbn']), 'nest_sub_methods');
        $aQueryParams['top_count'] = 5;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        //        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $total = $result['aggregations']['nest']['filter']['doc_count'];
                foreach ($result['aggregations']['nest']['filter']['consumer']['buckets'] as $consumer) {
                    $tmp = [];
                    $consumer_info = explode(ElasticSearchEnum::EXPLODE_STRING, $consumer['key']);
                    $tmp['consumer_app'] = $consumer_info[2];
                    $tmp['consumer_instance'] = $consumer_info[0];
                    $tmp['consumer'] = $consumer_info[1];
                    $tmp['rate'] = round($consumer['doc_count'] / $total * 100, 2);
                    $return[] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 消费者-消费情况列表
     *
     * @param $params
     *
     * @return array
     */
    public function getConsumerInstanceList($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['pst'] = $params['pst'];
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['pst', 'instance', 'dbn']), 'nest_sub_methods');
        $aQueryParams['top_count'] = 5;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $total = $result['aggregations']['nest']['filter']['doc_count'];
                foreach ($result['aggregations']['uri']['buckets'] as $uri) {
                    foreach ($uri['nest']['filter']['consumer']['buckets'] as $consumer) {
                        $tmp = [];
                        $consumer_info = explode(ElasticSearchEnum::EXPLODE_STRING, $consumer['key']);
                        $tmp['uri'] = $uri['key'];
                        $tmp['instance'] = $consumer_info[0];
                        $tmp['app_id'] = $consumer_info[1];
                        $tmp['rate'] = round($consumer['doc_count'] / $total * 100, 2);
                        $return[] = $tmp;
                    }
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }
}