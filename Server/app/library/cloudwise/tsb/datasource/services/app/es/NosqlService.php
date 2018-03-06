<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午8:38
 */

namespace cloudwise\tsb\datasource\services\app\es;

use App\library\Service\DataProcessorES;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use cloudwise\tsb\datasource\constants\SmartAgentFunctionTypeEnum;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;


class NosqlService extends ESService
{
    public $fields = [
        'start_time'    => [
            'type'  => 'gt',
            'field' => 'collTime',
        ],
        'end_time'      => [
            'type'  => 'lte',
            'field' => 'collTime',
        ],
        'app_id'        => [
            'type'  => 'term',
            'field' => 'app_id',
        ],
        'account_id'    => [
            'type'  => 'term',
            'field' => 'account_id',
        ],
        'service_index' => [
            'type'  => 'term',
            'field' => 'service_type',
        ],
        'pst'           => [
            'type'  => 'terms',
            'field' => 'pst',
        ],
        'instance'      => [
            'type'  => 'term',
            'field' => 'instance_raw',
        ],
        'search_uri'    => [
            'type'  => 'regexp',
            'field' => 'reqUri_raw',
        ],
    ];


    /**
     * 获取模块与子模块列表
     *
     * @param $params
     *
     * @return array
     */
    public function getModuleList($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['service_types'] = ServiceTypeEnum::$nosql_service_type;
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        //        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations']) && $result['aggregations']['nest']['filter']['doc_count']) {
                foreach ($result['aggregations']['nest']['filter']['service_type']['buckets'] as $service) {
                    $tmp = [];
                    if ($service['key'] == ServiceTypeEnum::TYPE_MEMCACHE) {
                        $tmp['value'] = $service['key'];
                        $tmp['name'] = 'Memcache';
                        $tmp['list'] = [];
                        $psts = [];
                        foreach ($service['pst']['buckets'] as $pst) {
                            $psts[] = $pst['key'];
                        }
                        if (array_intersect(
                                $psts, array_keys(SmartAgentFunctionTypeEnum::$php_memcached)) || array_intersect(
                                $psts, array_keys(SmartAgentFunctionTypeEnum::$node_memcached))
                        ) {
                            $tmp['list'][] = [
                                "name"  => ServiceTypeEnum::$memcache_type_name[ ServiceTypeEnum::TYPE_MEMCACHED_TRUE ],
                                "value" => ServiceTypeEnum::TYPE_MEMCACHED_TRUE,
                            ];
                        } else {
                            if (array_intersect(
                                    $psts, array_keys(SmartAgentFunctionTypeEnum::$php_memcache)) || array_intersect(
                                    $psts, array_keys(SmartAgentFunctionTypeEnum::$node_memcache))
                            ) {
                                $tmp['list'][] = [
                                    "name"  => ServiceTypeEnum::$memcache_type_name[ ServiceTypeEnum::TYPE_MEMCACHED_FALSE ],
                                    "value" => ServiceTypeEnum::TYPE_MEMCACHED_FALSE,
                                ];
                            } else {
                                $tmp['list'][] = [
                                    "name"  => ServiceTypeEnum::$memcache_type_name[ ServiceTypeEnum::TYPE_MEMCACHED_FALSE ],
                                    "value" => ServiceTypeEnum::TYPE_MEMCACHED_FALSE,
                                ];
                            }
                        }
                    } else {
                        $tmp['value'] = $service['key'];
                        if (array_key_exists($service['key'], ServiceTypeEnum::$nosql_name)) {
                            $tmp['name'] = ServiceTypeEnum::$nosql_name[ $service['key'] ];
                        } else {
                            $tmp['name'] = 'unknown';
                        }
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
     * 获取实例与方法列表
     *
     * @param $params
     *
     * @return array
     */
    public function getInstanceAndPstList($params)
    {
        $return = [];
        $aPstNames = SmartAgentFunctionTypeEnum::getPst(
            $params['service_index'], $params['app_code_type'], $params['memcache_flag']);
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        if ($params['service_index'] == ServiceTypeEnum::TYPE_MEMCACHE) {
            $aQueryParams['pst'] = array_keys($aPstNames);
        }
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['service_index', 'pst']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations']) && $result['aggregations']['nest']['doc_count'] && $result['aggregations']['nest']['filter']['doc_count']) {
                foreach ($result['aggregations']['nest']['filter']['instance']['buckets'] as $instance) {
                    $tmp = [];
                    $tmp['value'] = $instance['key'];
                    $tmp['name'] = $instance['key'];
                    $tmp['resp_time'] = round($instance['resp_time']['value'] / 1000, 2);
                    foreach ($instance['pst']['buckets'] as $pst) {
                        $tmpItem = [];
                        $tmpItem['value'] = $pst['key'];
                        if (array_key_exists($pst['key'], $aPstNames)) {
                            $tmpItem['name'] = $aPstNames[ $pst['key'] ];
                        } else {
                            $tmpItem['name'] = '';
                        }
                        $tmpItem['resp_time'] = round($pst['resp_time']['value'] / 1000, 2);
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
     * 概览响应时间趋势
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewRespTrendChart($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        //nosql类型过滤
        $params['service_types'] = ServiceTypeEnum::$nosql_service_type;

        //如果是memcache,添加pst过滤
        $aPstNames = SmartAgentFunctionTypeEnum::getPst(
            $params['service_index'], $params['app_code_type'], $params['memcache_flag']);
        if ($params['service_index'] == ServiceTypeEnum::TYPE_MEMCACHE) {
            $params['pst'] = array_keys($aPstNames);
        }

        if (isset($params['instance'])) {
            $aQueryParams['terms_field'] = 'nest_sub_methods.pst';
        } else {
            $aQueryParams['terms_field'] = 'nest_sub_methods.instance_raw';
        }

        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['service_types', 'instance', 'service_index', 'pst']), 'nest_sub_methods');

        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            //                        $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                foreach ($result['aggregations']['nest']['filter']['group']['buckets'] as $group) {
                    foreach ($group['time']['buckets'] as $time) {
                        if (isset($params['instance'])) {
                            $field = ArrayHelper::extractValueFromArray($group['key'], $aPstNames, $group['key']);
                        } else {
                            $field = $group['key'];
                        }
                        $return[ $field ][ $time['key'] ] = round($time['time']['value'] / 1000, 2);
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
     * 概览吞吐率趋势
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewRpmTrendChart($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        //nosql类型过滤
        $params['service_types'] = ServiceTypeEnum::$nosql_service_type;

        //如果是memcache,添加pst过滤
        $aPstNames = SmartAgentFunctionTypeEnum::getPst(
            $params['service_index'], $params['app_code_type'], $params['memcache_flag']);
        if ($params['service_index'] == ServiceTypeEnum::TYPE_MEMCACHE) {
            $params['pst'] = array_keys($aPstNames);
        }

        if (isset($params['instance'])) {
            $aQueryParams['terms_field'] = 'nest_sub_methods.pst';
        } else {
            $aQueryParams['terms_field'] = 'nest_sub_methods.instance_raw';
        }

        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['service_types', 'instance', 'service_index', 'pst']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $min = TimeRangeEnum::getIntervalTimeMin($params['start_time'], $params['end_time']);
                foreach ($result['aggregations']['nest']['filter']['group']['buckets'] as $group) {
                    foreach ($group['time']['buckets'] as $time) {
                        if (isset($params['instance'])) {
                            $field = ArrayHelper::extractValueFromArray($group['key'], $aPstNames, $group['key']);
                        } else {
                            $field = $group['key'];
                        }
                        $return[ $field ][ $time['key'] ] = round($time['doc_count'] / $min, 2);
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

    public function getMethodRpmAndRespTime($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        $params['pst'] = $params['method'];

        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['instance', 'pst']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $min = TimeRangeEnum::getIntervalTimeMin($params['start_time'], $params['end_time']);
                foreach ($result['aggregations']['nest']['filter']['time']['buckets'] as $time) {
                    $return['resp_time'][ $time['key'] ] = round($time['resp_time']['value'] / 1000, 2);
                    $return['rpm'][ $time['key'] ] = round($time['doc_count'] / $min, 2);
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
     * 概览实例列表
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewInstanceList($params)
    {
        $return = [];
        $order_map = [
            'execute_time' => 'time',
            'rpm'          => '_count',
            'method_count' => 'method_count',
        ];

        $params['order'] = ArrayHelper::extractValueFromArray(['order', $params, 'execute_time'], $order_map, 'time');
        $params['sort'] = ArrayHelper::extractValueFromArray('sort', $params, 'desc');

        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['service_types'] = ServiceTypeEnum::$nosql_service_type;
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['service_types']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $min = ($params['end_time'] - $params['start_time']) / 60000;
                $order = 1;
                foreach ($result['aggregations']['nest']['filter']['instance']['buckets'] as $instance) {
                    $tmp = [];
                    $tmp['order'] = $order++;
                    $tmp['instance'] = $instance['key'];
                    $tmp['execute_time'] = round($instance['time']['value'] / 1000, 2);
                    $tmp['rpm'] = round($instance['doc_count'] / $min, 2);
                    $tmp['method_count'] = $instance['method_count']['value'];
                    $return[] = $tmp;
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getCallerRate($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        //nosql类型过滤
        $params['service_types'] = ServiceTypeEnum::$nosql_service_type;

        //如果是memcache,添加pst过滤
        $aPstNames = SmartAgentFunctionTypeEnum::getPst(
            $params['service_index'], $params['app_code_type'], $params['memcache_flag']);

        if (isset($params['pst'])) {
            $params['pst'] = (array)$params['pst'];
        }

        if ($params['service_index'] == ServiceTypeEnum::TYPE_MEMCACHE && !isset($params['pst'])) {
            $params['pst'] = array_keys($aPstNames);
        }

        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['service_types', 'instance', 'service_index', 'pst']), 'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            //            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                $return['other'] = round($result['aggregations']['nest']['filter']['wt']['value'] / 1000, 2);
                foreach ($result['aggregations']['uri']['buckets'] as $uri) {
                    $time = round($uri['nest']['filter']['wt']['value'] / 1000, 2);
                    $return[ $uri['key'] ] = $time;
                    $return['other'] -= $time;
                }

                $return['other'] = round($return['other'], 2);

                if ($return['other'] <= 0) {
                    unset($return['other']);
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getPstList($params)
    {
        return [
            [
                "order"         => '1',
                "method_name"   => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '2',
                "method_name"   => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '3',
                "method_name"   => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '4',
                "method_name"   => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '5',
                "method_name"   => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '6',
                "method_name"   => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
        ];
        $return = [];

        $params['order'] = ArrayHelper::extractValueFromArray('order', $params, 'execute_time');
        $params['sort'] = ArrayHelper::extractValueFromArray('sort', $params, 'desc');

        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);

        //nosql类型过滤
        $params['service_types'] = ServiceTypeEnum::$nosql_service_type;

        //如果是memcache,添加pst过滤
        $aPstNames = SmartAgentFunctionTypeEnum::getPst(
            $params['service_index'], $params['app_code_type'], $params['memcache_flag']);

        if (isset($params['pst'])) {
            $params['pst'] = (array)$params['pst'];
        }

        if ($params['service_index'] == ServiceTypeEnum::TYPE_MEMCACHE && !isset($params['pst'])) {
            $params['pst'] = array_keys($aPstNames);
        }

        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['service_types', 'instance', 'service_index', 'pst', 'search_uri']),
            'nest_sub_methods');
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            //                        $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if (isset($result['aggregations'])) {
                foreach ($result['aggregations']['uri']['buckets'] as $uri) {
                    foreach ($uri['nest']['filter']['pst']['buckets'] as $pst) {
                        $tmp = [];
                        $tmp['uri'] = $uri['key'];
                        $tmp['method'] = $pst['key'];
                        $tmp['execute_count'] = $pst['doc_count'];
                        $tmp['execute_time'] = round($pst['time']['value'] / 1000, 2);
                        $return[] = $tmp;
                    }
                }
            }

            ArrayHelper::sortByUser($return, $params['order'], $params['sort']);

            $order = 1;
            foreach ($return as $index => $item) {
                $return[ $index ]['order'] = $order++;
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getUrlList($params)
    {
        return [
            [
                "order"         => '1',
                "key"           => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '2',
                "key"           => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '3',
                "key"           => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '4',
                "key"           => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '5',
                "key"           => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
            [
                "order"         => '6',
                "key"           => 'add',
                "uri"           => '/this/is/uri',
                "execute_count" => rand(1, 100),
                "execute_time"  => rand(300, 10000),
            ],
        ];
    }

}