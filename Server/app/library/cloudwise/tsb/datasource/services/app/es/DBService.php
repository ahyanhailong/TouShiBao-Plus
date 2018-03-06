<?php
namespace cloudwise\tsb\datasource\services\app\es;

use App\library\Service\DataProcessorES;
use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\SmartAgentFunctionTypeEnum;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\business\app\web\AppGeneralMethod;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\helper\ApiClient;
use cloudwise\tsb\datasource\helper\ArrayHelper;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/10/17
 * Time: 下午3:21
 */
class DBService extends ESService
{
    /**
     * @param       $aParams
     * @param array $aQueryFields
     * @param array $aNestFields
     *
     * @return array
     */
    public function getQueryParams($aParams, $aQueryFields = [], $aNestFields = [])
    {
        $iServiceType = AppGeneralMethod::instance()->getCodeServiceType($aParams['account_id'], $aParams['app_id']);
        $queryParams  = $this->getCommonParams($iServiceType, $aParams['start_time'], $aParams['end_time']);
        if ($aQueryFields) {
            $queryParams['query'] = $this->setFilterQuery($aParams, $this->getFields($aQueryFields));
        }
        if ($aNestFields) {
            $queryParams['nest_query'] = $this->setFilterQuery(
                $aParams, $this->getFields($aNestFields), 'nest_sub_methods');
        }

        if (isset($aParams['order'])) {
            $queryParams['order'] = $aParams['order'];
            $queryParams['sort']  = $aParams['sort'];
        }

        return $queryParams;
    }

    protected function getFilterMap()
    {
        return ['instance_raw', 'db_table', 'db_name', 'pst', 'db_oper_type', 'reqUri_raw', 'dbn_raw', 'wt_from', 'wt_to', 'db_type', 'sql', 'reqUri_raw_search', 'exception'];
    }

    /**
     * @param $params
     *
     * @return array
     * 时间分析一级页面 数据库趋势图
     */
    public function getTimeAnalysisDbTrendLine($params)
    {
        $return       = [
            '响应时间' => [],
            '吞吐率'  => [],
        ];
        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = ['instance_raw', 'db_table', 'db_name', 'pst', 'db_oper_type', 'reqUri_raw', 'dbn_raw', 'wt_from', 'wt_to', 'db_type', 'sql', 'reqUri_raw_search', 'exception'];
        $queryParams  = $this->getNewQueryParams($params, $aQueryFields);
        $queryParams['nest_query'] = $this->setFilterQuery($params, $this->getFields($aNestFields), 'nest_sub_methods');
        $interval     = TimeRangeEnum::getInterval($params['start_time'], $params['end_time']);
        try {
            $queryParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//            $this->ddTpl($queryParams);
            $result = $this->client->search($queryParams);
            if ($result['aggregations']['nest']['doc_count'] && $result['aggregations']['nest']['leach']['doc_count']) {
                foreach ($result['aggregations']['nest']['leach']['time']['buckets'] as $item) {
                    $return['响应时间'][$item['key']] = round($item['wt']['value'] / 1000, 2);
                    $return['吞吐率'][$item['key']]  = round($item['doc_count'] / (TimeRangeEnum::$intervalTime[$interval] / 60000), 2);
                }
            }

            $return = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $return);
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }

        return $return;
    }


    public function getTimeAnalysisDistributionLine($params)
    {
        $data         = [];
        $quota        = [
            'min' => 0,
            'max' => 0,
        ];
        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = ['instance_raw', 'db_table', 'db_name', 'pst', 'db_oper_type', 'reqUri_raw', 'dbn_raw', 'wt_from', 'wt_to', 'db_type', 'sql', 'reqUri_raw_search', 'exception'];
        $queryParams  = $this->getNewQueryParams($params, $this->getFields($aQueryFields));

        $queryParams['nest_query'] = $this->setFilterQuery($params, $this->getFields($aNestFields), 'nest_sub_methods');
        try {
            $firstQueryParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
            //                        dd(json_encode($firstQueryParams));
            $result = $this->client->search($firstQueryParams);

            if (isset($result['aggregations']) && $result['aggregations']) {
                $quota['min'] = $result['aggregations']['nest']['leach']['time']['min'];
                $quota['max'] = $result['aggregations']['nest']['leach']['time']['max'];

                $points      = $this->equalPeriod($quota['min'], $quota['max'], 10);
                $filter_keys = $this->makeFilterKeys($points);

                $queryParams['distance']    = $points;
                $queryParams['filter_keys'] = $filter_keys;

                $secondQueryParams = $this->renderQueryParams($this->getTplPath(__METHOD__) . '1', $queryParams);
                $return            = $this->client->search($secondQueryParams);

                foreach ($filter_keys as $key => $val) {
                    $data['labels'][$key] = $val;
                    if (isset($return['aggregations']['nest']['leach'][$val])) {
                        $data['data']['请求数'][$key] = $return['aggregations']['nest']['leach'][$val]['doc_count'];
                    } else {
                        $data['data']['请求数'][$key] = 0;

                    }
                }
            }

            return $data;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $data;
        }
    }


    /**
     * 获取SQL聚合列表
     *
     * @param $params
     *
     * @return array
     */
    public function getTimeAnalysisAggsSqlList($params)
    {
        $return = [];

        $order_map = [
            'wt'            => 'wt',
            'rpm'           => '_count',
            'count'         => '_count',
            'min_real_time' => 'time.min',
            'max_real_time' => 'time.max',
        ];

        $params['order'] = isset($params['order']) && $params['order'] ? $params['order'] : 'wt';
        $params['sort']  = isset($params['sort']) && $params['sort'] ? $params['sort'] : 'desc';
        $params['order'] = $order_map[$params['order']];

        $iServiceType = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);
        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = $this->getFilterMap();
        $queryParams  = $this->getQueryParams($params, $aQueryFields, $aNestFields);
//        dd($queryParams);
        try {

            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//                                                            dd(json_encode($queryParams));
            $result = $this->client->search($queryParams);
            if ($result) {

                $mins = ($params['end_time'] - $params['start_time']) / 60000;

                foreach ($result['aggregations']['nest']['leach']['sql']['buckets'] as $index => $info) {
                    $return[] = [
                        'order'         => $index + 1,
                        'wt'            => round($info['wt']['value'] / 1000, 2),
                        'count'         => $info['doc_count'],
                        'sql'           => $info['key'],
                        'min_time'      => round($info['time']['min'] / 1000, 2),
                        'max_time'      => round($info['time']['max'] / 1000, 2),
                        'min_real_time' => date('Y-m-d H:i:s', $info['time']['min'] / 1000),
                        'max_real_time' => date('Y-m-d H:i:s', $info['time']['max'] / 1000),
                        'rpm'           => round($info['doc_count'] / $mins, 2),
                    ];
                }

                Business::replaceDataForTableList($return, ['sql'], $params['account_id'], $iServiceType);
            }

            return $return;

        } catch (\Exception $e) {
            dd($e->getLine(), $e->getMessage());
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取调用者信息
     *
     * @param $params
     *
     * @return array
     */
    public function getTimeAnalysisDbCaller($params)
    {
        $return       = [];
        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = $this->getFilterMap();
        $queryParams  = $this->getQueryParams($params, $aQueryFields, $aNestFields);
        try {
            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
            //                        dd(json_encode($queryParams));
            $result = $this->client->search($queryParams);
            if ($result['aggregations']) {
                $mins       = ($params['end_time'] - $params['start_time']) / 60000;
                $total_time = $result['aggregations']['nest']['leach']['total']['value'];
                foreach ($result['aggregations']['nest']['leach']['uri']['buckets'] as $buckets) {
                    $return[$buckets['key']] = [
                        round($buckets['time']['value'] / $total_time * 100, 2),
                        round($buckets['time']['value'] / 1000, 2),
                        round($buckets['doc_count'] / $mins),
                    ];
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取sql的节点id
     *
     * @param $params
     *
     * @return array
     */
    public function getNodeIdList($params)
    {
        $return               = [];
        $aQueryFields         = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields          = $this->getFilterMap();
        $queryParams          = $this->getQueryParams($params, $aQueryFields, $aNestFields);
        $queryParams['order'] = isset($params['order']) && $params['order'] ? $params['order'] : 'happen_time';
        $queryParams['sort']  = isset($params['sort']) && $params['sort'] ? $params['sort'] : 'desc';
        try {
            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//            $this->ddTpl($queryParams);
            $result = $this->client->search($queryParams);
            if ($result['aggregations']['nest']['doc_count'] && $result['aggregations']['nest']['leach']['doc_count']) {
                foreach ($result['aggregations']['nest']['leach']['n_id']['buckets'] as $nid) {
                    $return[] = $nid['key'];
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取快照详情
     *
     * @param $params
     *
     * @return array
     */
    public function getSqlSnapDetailInfo($params)
    {
        $return       = [];
        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = ['node_id_list'];
        $queryParams  = $this->getQueryParams($params, $aQueryFields, $aNestFields);
        try {
            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//            $this->ddTpl($queryParams);
            $es_data = $this->client->search($queryParams);
            if ($es_data['hits']['hits']) {
                foreach ($es_data['hits']['hits'] as $info) {
                    foreach ($info['_source']['nest_sub_methods'] as $methods) {
                        if (isset($methods['r_nid_raw']) && in_array($methods['r_nid_raw'], $params['node_id_list'])) {
                            $pst = isset($methods['db_oper_type']) ? $methods['db_oper_type'] : 'unkonwn';
                            if (array_key_exists($pst, SmartAgentFunctionTypeEnum::$DB_OPT_TYPE)) {
                                $pst = SmartAgentFunctionTypeEnum::$DB_OPT_TYPE[$pst];
                            }
                            $tmp      = [
                                'sql'         => $params['sql'],
                                'req_url'     => $methods['reqUri_raw'],
                                'happen_time' => date('m-d H:i:s', $methods['collTime'] / 1000),
                                'wt'          => round($methods['wt'] / 1000, 2),
                                'instance'    => $methods['instance_raw'],
                                'db_type'     => $methods['db_name'],
                                'error_type'  => $methods['errorMsg_raw'],
                                'table'       => $methods['db_table'],
                                'pst'         => $pst,
                                'request_id'  => $info['_source']['request_id'],
                                'stack_tree'  => $info['_source']['stack_tree'],
                                'r_nid'       => $methods['r_nid_raw'],
                            ];
                            $return[] = $tmp;
                        }
                    }
                }
            }
            ArrayHelper::sortByUser($return, $params['order'], $params['sort']);
            $order = 1;
            foreach ($return as $key => $item) {
                $return[$key]['order'] = ($params['page'] - 1) * $params['page_size'] + $order++;
            }
            $iServiceType = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);
            Business::replaceDataForTableList($return, ['sql'], $params['account_id'], $iServiceType);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getTimeAnalysisDbStackTree($params)
    {
        $return       = [];
        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = ['r_nid', 'exception'];
        $queryParams  = $this->getQueryParams($params, $aQueryFields, $aNestFields);
        try {
            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
            //                        dd(json_encode($queryParams));
            $es_data = $this->client->search($queryParams);
            if ($es_data['hits']['hits']) {
                $es_data    = array_pop($es_data['hits']['hits']);
                $info       = $es_data['_source']['nest_sub_methods'];
                $stack_tree = $es_data['_source']['stack_tree'];
                $sCodeStack = ApiClient::instance()->getCodeStackTree($stack_tree);
                foreach ($info as $methods) {
                    if (isset($methods['r_nid_raw']) && $params['r_nid'] == $methods['r_nid_raw']) {
                        $return = [
                            'sql'          => $methods['ps_raw'],
                            'req_url'      => $methods['reqUri_raw'],
                            'happen_time'  => date('Y-m-d H:i:s', $methods['collTime'] / 1000),
                            'wt'           => $methods['wt'],
                            'instance'     => $methods['instance_raw'],
                            'type'         => $methods['db_name'],
                            'table'        => $methods['db_table'],
                            'pst'          => SmartAgentFunctionTypeEnum::$DB_OPT_TYPE[$methods['db_oper_type']],
                            'stack_tree'   => [],
                            'code_data'    => json_decode($sCodeStack, true),
                            'exstack_raw'  => isset($methods['exstack_raw']) ? $methods['exstack_raw'] : '',
                            'errorMsg_raw' => isset($methods['errorMsg_raw']) ? $methods['errorMsg_raw'] : '',
                        ];

                        break;
                    }
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }


    public function getExceptionAnalysisDbErrorTrendLine($params)
    {
        $return       = [];
        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = $this->getFilterMap();
        $queryParams  = $this->getQueryParams($params, $aQueryFields, $aNestFields);
        try {
            $tplParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//            dd(json_encode($tplParams));
            $result = $this->client->search($tplParams);
            $data   = [];
            if ($result['aggregations']) {
                $mins = TimeRangeEnum::$intervalTime[$queryParams['interval']] / 60000;
                foreach ($result['aggregations']['nest']['date_range']['buckets'] as $item) {
                    $data['normalRpm'][$item['key']] = round($item['sqls']['normal']['doc_count'] / $mins, 2);
                    $data['errorRpm'][$item['key']]  = round($item['sqls']['error']['doc_count'] / $mins, 2);
                    if ($item['doc_count']) {
                        $data['errorRate'][$item['key']] = round(
                            $item['sqls']['error']['doc_count'] / $item['doc_count'] * 100, 2);
                    } else {
                        $data['errorRate'][$item['key']] = '-';
                    }
                }
            }

            $return = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取SQL错误聚合列表
     *
     * @param $params
     *
     * @return array
     */
    public function getExceptionAnalysisAggsSqlErrorList($params)
    {
        $return    = [];
        $order_map = [
            'count'         => '_count',
            'min_real_time' => 'time.min',
            'max_real_time' => 'time.max',
        ];

        $params['order'] = isset($params['order']) && $params['order'] ? $order_map[$params['order']] : '_count';
        $params['sort']  = isset($params['sort']) && $params['sort'] ? $params['sort'] : 'desc';

        $aQueryFields = ['start_time', 'end_time', 'app_id', 'account_id', 'uri'];
        $aNestFields  = $this->getFilterMap();
        $queryParams  = $this->getQueryParams($params, $aQueryFields, $aNestFields);
        try {
            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//                                                dd(json_encode($queryParams));
            $result = $this->client->search($queryParams);
            $order  = 1;
            foreach ($result['aggregations']['nest']['sqls']['error']['buckets'] as $bucket) {
                $key = explode('###', $bucket['key']);
                if (isset($key[0]) && isset($key[1])) {
                    $data[] = [
                        'sql'           => e($key[0]),
                        'sql_raw'       => e($key[0]),
                        'error_type'    => $key[1],
                        'order'         => $order++,
                        'count'         => $bucket['doc_count'],
                        'min_time'      => $bucket['time']['min'],
                        'max_time'      => $bucket['time']['max'],
                        'min_real_time' => date('Y-m-d H:i:s', $bucket['time']['min'] / 1000),
                        'max_real_time' => date('Y-m-d H:i:s', $bucket['time']['max'] / 1000),
                    ];
                }
            }
            $iServiceType = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);
            $return       = Business::replaceDataForTableList($data, ['sql'], $params['account_id'], $iServiceType);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getFilterElementForDb($params)
    {
        $search               = $params['field'] . '_search';
        $params[$search]      = $params['search'];
        $return               = [];
        $aQueryFields         = ['start_time', 'end_time', 'app_id', 'account_id'];
        $aNestFields          = [$search];
        $queryParams          = $this->getQueryParams($params, $aQueryFields, $aNestFields);
        $queryParams['field'] = 'nest_sub_methods.' . $params['field'];
        try {
            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//            dd(json_encode($queryParams));
            $result = $this->client->search($queryParams);
            if ($result['aggregations']['nest']['doc_count'] && $result['aggregations']['nest']['leach']['doc_count']) {
                foreach ($result['aggregations']['nest']['leach']['dimension']['buckets'] as $dimension) {
                    if ($dimension['key']) {
//                        $return[] = $dimension['key'];
                        $name  = $dimension['key'];
                        $value = $dimension['key'];
                        if ($params['field'] == 'db_oper_type') {
                            $value = SmartAgentFunctionTypeEnum::$db_query_type[$dimension['key']];
                        }
                        $return[] = [
                            'name'  => $name,
                            'value' => $value,
                        ];
                    }
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return [];
        }
    }

    public function getCommonFilterList($params)
    {
        $return               = [];
        $aQueryFields         = ['start_time', 'end_time', 'app_id', 'account_id'];
        $queryParams          = $this->getQueryParams($params, $aQueryFields);
        $queryParams['terms_key'] = $params['field'];
        $queryParams['filter_regexp'] = '.*'.$params['search'] .'.*';

        try {
            $queryParams = self::renderQueryParams($this->getTplPath(__METHOD__), $queryParams);
//            dd(json_encode($queryParams));
            $result = $this->client->search($queryParams);
            if ($result['aggregations']) {
                foreach ($result['aggregations']['leach']['dimension']['buckets'] as $bucket){
                    $return[] = [
                        'name'=>$bucket['key'],
                        'value'=>$bucket['key'],
                    ];
                }

            }
            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);
            return [];
        }
    }

    /**
     * @param     $start    开始的数据点
     * @param     $end      结束的数据点
     * @param     $count    分段数量
     * @param int $unit     保留的小数位
     *
     * @return array
     *
     * 制作动态的时间分段
     */
    protected function equalPeriod($start, $end, $count, $unit = 2)
    {
        $result   = [];
        $distance = round(($end - $start) / $count, $unit);
        for ($i = 0; $i < $count; $i++) {
            if ($i == 0) {
                $result[$i][0] = $start;
                $result[$i][1] = $start + $distance;
            } else {
                $result[$i][0] = $result[$i - 1][1] + 1 / pow(10, $unit);
                $result[$i][1] = $result[$i][0] + $distance;
            }
        }

        return $result;
    }

    /**
     * @param $points
     *
     * @return array
     * 根据数据分段,做出相应的label
     */
    protected function makeFilterKeys($points, $unit = 2)
    {
        $result = [];
        if ($points) {
            foreach ($points as $key => $val) {
                $result[$key] = (round($val[0] / 1000, $unit)) . '-' . (round($val[1] / 1000, $unit)) . 'ms';
            }
        }

        return $result;
    }


    /**
     * 获取过滤字段的配置参数
     *
     * @param $aList
     *
     * @return array
     */
    public function getFields($aList)
    {
        $fields = [
            'start_time'          => [
                'type'  => 'gte',
                'field' => 'collTime',
            ],
            'end_time'            => [
                'type'  => 'lte',
                'field' => 'collTime',
            ],
            'app_id'              => [
                'type'  => 'terms',
                'field' => 'app_id',
            ],
            'account_id'          => [
                'type'  => 'term',
                'field' => 'account_id',
            ],
            'instance_raw'        => [
                'type'  => 'terms',
                'field' => 'instance_raw',
            ],
            'db_table'            => [
                'type'  => 'terms',
                'field' => 'db_table',
            ],
            'db_name'             => [
                'type'  => 'terms',
                'field' => 'db_name',
            ],
            'pst'                 => [
                'type'  => 'terms',
                'field' => 'pst',
            ],
            'db_oper_type'        => [
                'type'  => 'terms',
                'field' => 'db_oper_type',
            ],
            'reqUri_raw'          => [
                'type'  => 'terms',
                'field' => 'reqUri_raw',
            ],
            'wt_from'             => [
                'type'  => 'gte',
                'field' => 'wt',
            ],
            'wt_to'               => [
                'type'  => 'lte',
                'field' => 'wt',
            ],
            'db_type'        => [
                'type'  => 'terms',
                'field' => 'service_type',
            ],
            'exception'           => [
                'type'  => 'term',
                'field' => 'exception',
            ],
            'search'              => [
                'type'  => 'regexp',
                'field' => 'reqUri_raw',
            ],
            'sql'                 => [
                'type'  => 'term',
                'field' => 'ps_raw',
            ],
            'node_id_list'        => [
                'type'  => 'terms',
                'field' => 'r_nid_raw',
            ],
            'r_nid'               => [
                'type'  => 'term',
                'field' => 'r_nid_raw',
            ],
            'instance_raw_search' => [
                'type'  => 'regexp',
                'field' => 'instance_raw',
            ],
            'db_name_search'      => [
                'type'  => 'regexp',
                'field' => 'db_name',
            ],
            'db_table_search'     => [
                'type'  => 'regexp',
                'field' => 'db_table',
            ],
            'reqUri_raw_search'   => [
                'type'  => 'regexp',
                'field' => 'reqUri_raw',
            ],
            'errorMsg_raw_search'   => [
                'type'  => 'regexp',
                'field' => 'errorMsg_raw',
            ],
            'uri'                 => [
                'type'  => 'term',
                'field' => 'reqUri_raw',
            ],
        ];

        $return = [];
        foreach ($aList as $item) {
            if (array_key_exists($item, $fields)) {
                $return[$item] = $fields[$item];
            }
        }

        return $return;
    }
}
