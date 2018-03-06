<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午8:31
 */

namespace cloudwise\tsb\datasource\services\app\es;

use App\library\Service\ConfigService;
use App\library\Service\DataProcessorES;
use cloudwise\tsb\business\app\web\AppGeneralMethod;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use cloudwise\tsb\datasource\constants\SmartAgentFunctionTypeEnum;
use cloudwise\tsb\datasource\helper\ApiClient;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\helper\DESHelper;
use Yaf\Exception;
use cloudwise\tsb\datasource\constants\ElasticSearchEnum;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\datasource\constants\ReportAppTopologyEnum;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\business\Business;


class TransactionAnalysisService extends ESService
{
    public $fields = [
        'start_time'          => [
            'type'  => 'gt',
            'field' => 'collTime',
        ],
        'end_time'            => [
            'type'  => 'lte',
            'field' => 'collTime',
        ],
        'app_id'              => [
            'type'  => 'term',
            'field' => 'app_id',
        ],
        'app_ids'             => [
            'type'  => 'terms',
            'field' => 'app_id',
        ],
        'account_id'          => [
            'type'  => 'term',
            'field' => 'account_id',
        ],
        'uri'                 => [
            'type'  => 'term',
            'field' => 'reqUri_raw',
        ],
        'slow'                => [
            'type'  => 'gt',
            'field' => 'totalTime',
        ],
        'request_ids'         => [
            'type'  => 'in',
            'field' => 'request_id',
        ],
        'search_url'          => [
            'type'  => 'regexp',
            'field' => 'reqUrl_raw',
        ],
        'search_exceptions'    => [
            'type'  => 'terms',
            'field' => 'errorMsg_raw',
        ],
        'search_exception'    => [
            'type'  => 'regexp',
            'field' => 'errorMsg_raw',
        ],
        'search_instance'     => [
            'type'  => 'regexp',
            'field' => 'host_instance_raw',
        ],
        'search_instances'    => [
            'type'  => 'terms',
            'field' => 'host_instance_raw',
        ],
        'search_errors'        => [
            'type'  => 'terms',
            'field' => 'httpResponseCode',
        ],
        'search_error'        => [
            'type'  => 'regexp',
            'field' => 'httpResponseCode',
        ],
        'search_from'         => [
            'type'  => 'gt',
            'field' => 'totalTime',
        ],
        'search_to'           => [
            'type'  => 'lte',
            'field' => 'totalTime',
        ],
        'error'               => [
            'type'  => 'term',
            'field' => 'isError',
        ],
        'is_file_error'       => [
            'type'  => 'term',
            'field' => 'is_file_error',
        ],
        'exception'           => [
            'type'  => 'term',
            'field' => 'isException',
        ],
        'error_or_exception'  => [
            'type'  => 'or',
            'field' => 'filters',
        ],
        'r_id'                => [
            'type'  => 'term',
            'field' => 'r_id',
        ],
        'request_id'          => [
            'type'  => 'term',
            'field' => 'request_id',
        ],
        'doc_id'              => [
            'type'  => 'ids',
            'field' => 'values',
        ],
        'isException'         => [
            'type'  => 'term',
            'field' => 'isException',
        ],
        'nest_exception'      => [
            'type'  => 'term',
            'field' => 'exception',
        ],
        'exception_list'      => [
            'type'  => 'term',
            'field' => 'msg_raw',
        ],
        'search_uri'          => [
            'type'  => 'regexp',
            'field' => 'reqUri_raw',
        ],
        'db_filter'           => [
            'type'  => 'terms',
            'field' => 'service_type',
        ],
        'api_filter'          => [
            'type'  => 'term',
            'field' => 'pst',
        ],
        'not_db_api'          => [
            'type'  => 'bool',
            'field' => 'must_not',
        ],
        'error_or_file_error' => [
            'type'  => 'or',
            'field' => 'filters',
        ],
    ];

    /**
     * 概览-时间与请求次数颁布趋势
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewRespAndRpmTrendChart($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        $aQueryParams['slow'] = $params['slow'];
        $aQueryParams['very_slow'] = $params['very_slow'];
        $aQueryParams['percent_time'] = $params['percent_time'];
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {

                $data = [];
                foreach ($result['aggregations']['time_range']['buckets'] as $bucket) {
                    $data['normal'][ $bucket['key'] ] = $bucket['request']['normal']['doc_count'];
                    $data['slow'][ $bucket['key'] ] = $bucket['request']['slow']['doc_count'];
                    $data['very_slow'][ $bucket['key'] ] = $bucket['request']['very_slow']['doc_count'];
                    $data['error'][ $bucket['key'] ] = $bucket['error']['sum'];
                    $data['resp_time'][ $bucket['key'] ] = round($bucket['request']['resp_time']['value'] / 1000, 2);
                    if ($aQueryParams['percent_time']) {
                        $data['percent_time'][ $bucket['key'] ] = round(
                            $bucket['request']['percent_line']['resp_time']['value'] / 1000, 2);
                    }
                }

                $return = DataProcessorES::instance()->processLineData(
                    $params['start_time'], $params['end_time'], $data);
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }

    }

    /**
     * 获取指定位置的文档
     *
     * @param $params
     *
     * @return bool
     */
    public function getSpecifiedDoc($params)
    {
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        $aQueryParams['from'] = $params['from'];
        $aQueryParams['size'] = $params['size'];
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

            $result = $this->client->search($aTplParams);

            return $result['hits']['hits'];
        } catch (\Exception $e) {
            LogService::logException($e);

            return false;
        }
    }

    /**
     * 获取文档总数
     *
     * @param $params
     *
     * @return int
     */
    public function getTotalCount($params)
    {
        $return = 0;
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $result = $this->client->search($aTplParams);

            return $result['hits']['total'];
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取概览请求分页
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewRequestDistributionPie($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        $aQueryParams['slow'] = $params['slow'];
        $aQueryParams['very_slow'] = $params['very_slow'];
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                        $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                $params['slow'] /= 1000;
                $params['very_slow'] /= 1000;
                $return['normal'] = $result['aggregations']['request']['normal']['doc_count'];
                $return['slow'] = $result['aggregations']['request']['slow']['doc_count'];
                $return['very_slow'] = $result['aggregations']['request']['very_slow']['doc_count'];
                $return['error_count'] = $result['aggregations']['error']['sum'];

                $return['normal_rate'] = round(
                    $result['aggregations']['request']['normal']['doc_count'] / $result['hits']['total'] * 100, 2);
                $return['slow_rate'] = round(
                    $result['aggregations']['request']['slow']['doc_count'] / $result['hits']['total'] * 100, 2);
                $return['very_slow_rate'] = round(
                    $result['aggregations']['request']['very_slow']['doc_count'] / $result['hits']['total'] * 100, 2);
                $return['error_rate'] = round(
                    $result['aggregations']['error']['sum'] / $result['hits']['total'] * 100, 2);

            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 概览-uri列表
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewTransactionList($params)
    {
        $data = [];
        $order_map = [
            'avg_time'       => 'resp_time>time',
            'rpm'            => '_count',
            'error_count'    => 'error.sum',
            'error_pm'       => 'error.sum',
            'error_rate'     => 'error.avg',
            'exception_rate' => 'exception.avg',
            'slow_rate'      => 'slow.avg',
            'very_slow_rate' => 'very_slow.avg',
            'count'          => '_count',
        ];

        ArrayHelper::extractValueFromArray(['order', $params, 'avg_time'], $order_map);

        $aQueryParams = $this->getNewQueryParams(
            $params, ['app_id', 'account_id', 'start_time', 'end_time', 'search_uri']);

        $aQueryParams['slow'] = $params['slow'];
        $aQueryParams['very_slow'] = $params['very_slow'];
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            //$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']) {
                $min = ($params['end_time'] - $params['start_time']) / 60000;

                foreach ($result['aggregations']['uri']['buckets'] as $key => $bucket) {

                    $data[] = [
                        'avg_time'       => round($bucket['resp_time']['time']['value'] / 1000, 2),
                        'count'          => $bucket['doc_count'],
                        'error_count'    => $bucket['error']['sum'],
                        'error_pm'       => round($bucket['error']['sum'] / $min, 2),
                        'error_rate'     => round($bucket['error']['avg'] * 100, 2),
                        'exception_rate' => round($bucket['exception']['avg'] * 100, 2),
                        'order'          => $key + 1,
                        'uri'            => $bucket['key'],
                        'rpm'            => round($bucket['doc_count'] / $min, 2),
                        'slow_rate'      => round($bucket['slow']['avg'] * 100, 2),
                        'very_slow_rate' => round($bucket['very_slow']['avg'] * 100, 2),
                    ];
                }
            }

            return $data;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $data;
        }
    }

    /**
     * 概览-弹窗列表
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewTransactionPopList($params)
    {
        $return = [];
        $order_map = [
            'avg_time' => 'time.avg',
            'max_time' => 'time.max',
            'min_time' => 'time.min',
            'count'    => '_count',
            'time'     => 'collect_time.max',
        ];

        $params['order'] = ArrayHelper::extractValueFromArray(['order', $params, 'avg_time'], $order_map);

        $aQueryParams = $this->getNewQueryParams(
            $params, [
            'app_id',
            'account_id',
            'start_time',
            'end_time',
            'error',
            'search_from',
            'search_to',
        ]);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            //                        $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            $i = 1;
            if (isset($result['aggregations'])) {
                foreach ($result['aggregations']['uri']['buckets'] as $uri) {
                    $tmp = [];
                    $tmp['order'] = $i++;
                    $tmp['uri'] = $uri['key'];
                    if ($params['type'] == 'error') {
                        $tmp['avg_time'] = '-';
                        $tmp['max_time'] = '-';
                        $tmp['min_time'] = '-';
                    } else {
                        $tmp['avg_time'] = round($uri['time']['avg'] / 1000, 2);
                        $tmp['max_time'] = round($uri['time']['max'] / 1000, 2);
                        $tmp['min_time'] = round($uri['time']['min'] / 1000, 2);
                    }
                    $tmp['count'] = $uri['doc_count'];
                    $tmp['time'] = date('H:i:s', $uri['collect_time']['avg'] / 1000) . '-' . date(
                            'H:i:s', $uri['collect_time']['max'] / 1000);
                    array_push($return, $tmp);
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 仪表盘-时间分解
     *
     * @param $params
     *
     * @return array
     */
    public function getDashboardStatisticalIndicators($params)
    {
        $data = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri', 'search_uri']);
        $aQueryParams['db_filter'] = ServiceTypeEnum::$relational_type_db;
        $aQueryParams['pst_filter'] = SmartAgentFunctionTypeEnum::CURL;

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                        $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                $doc = $result['hits']['total'];
                $data['db_time'] = round($result['aggregations']['nest']['db_time']['time']['value'] / $doc / 1000, 2);
                $data['api_time'] = round(
                    $result['aggregations']['nest']['api_time']['time']['value'] / $doc / 1000, 2);
                $data['code_time'] = round(
                    $result['aggregations']['nest']['code_time']['time']['value'] / $doc / 1000, 2);
                $data['request_time'] = round($result['aggregations']['total_time']['value'] / 1000, 2);
            }

            return $data;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $data;
        }
    }

    /**
     * 仪表盘-top3
     *
     * @param $params
     *
     * @return array
     */
    public function getDashboardTopMethods($params)
    {
        $return = [];
        $field = [];
        switch ($params['top_type']) {
            case 'db':
                $params['db_filter'] = ServiceTypeEnum::$relational_type_db;
                $field = ['db_filter'];
                break;
            case 'api':
                $params['api_filter'] = [SmartAgentFunctionTypeEnum::CURL];
                $field = ['api_filter'];
                break;
            case 'code':
                $params['api_filter'] = [SmartAgentFunctionTypeEnum::CURL];
                $params['db_filter'] = ServiceTypeEnum::$relational_type_db;
                $params['not_db_api'] = ['db_filter', 'api_filter'];
                $field = ['not_db_api'];
                break;
        }
        $params['nest_path'] = 'nest_sub_methods';
        $params['top_size'] = ArrayHelper::extractValueFromArray('top_size', $params, 3);
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        $aQueryParams['nest_query'] = $this->setFilterQuery($params, $this->getFields($field), 'nest_sub_methods');
        $request_ids = [];
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            //                                                $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['nest']['filter']['doc_count']) {

                //获取topN方法信息
                foreach ($result['aggregations']['nest']['filter']['methods']['buckets'] as $method) {
                    $tmp = [];
                    $tmp['r_id_list'] = [];
                    $tmp['mn'] = $method['key'];
                    $tmp['method_total_time'] = round($method['pt']['value'] / 1000, 2);
                    $tmp['method_request_count'] = $method['nest']['doc_count'];
                    $tmp['method_call_rate'] = round($tmp['method_request_count'] / $result['hits']['total'] * 100, 2);
                    $tmp['call_count_divide_request_count'] = round($method['doc_count'] / $result['hits']['total'], 2);
                    $tmp['contribute'] = round(
                        $tmp['method_total_time'] * $tmp['method_call_rate'] * $tmp['call_count_divide_request_count'] / 100,
                        2);
                    $tmp['request_ids'] = [];
                    foreach ($method['r_nid']['buckets'] as $r_nid) {
                        $r_id_info = explode(ElasticSearchEnum::EXPLODE_STRING, $r_nid['key']);
                        $request_id = array_shift($r_id_info);
                        $request_ids[] = $tmp['request_ids'][] = $request_id;
                    }
                    $return[] = $tmp;
                }

                Business::replaceDataForTableList(
                    $return, ['mn'], $params['account_id'], $aQueryParams['service_type']);

                //获取快照列表
                $params['request_ids'] = $request_ids;
                $params['order'] = ArrayHelper::extractValueFromArray('order', $params, 'resp_time');
                $params['sort'] = ArrayHelper::extractValueFromArray('sort', $params, 'desc');
                $snap_list = $this->getAnalysisSnapList($params);
                foreach ($snap_list as $snap) {
                    $snap_list[ $snap['request_id'] ] = $snap;
                }

                //拼装快照信息
                foreach ($return as $index => $item) {
                    foreach ($item['request_ids'] as $request_id) {
                        if (array_key_exists($request_id, $snap_list)) {
                            $return[ $index ]['r_id_list'][] = $snap_list[ $request_id ];
                        }
                    }
                    unset($return[ $index ]['request_ids']);
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 仪表盘-错误列表
     *
     * @param $params
     *
     * @return array
     */
    public function getDashboardErrorInfoList($params)
    {
        //需要$params里添加uri过滤条件即可
        $return = [
            'list' => [],
            'pie'  => [],
        ];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            //            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            $list = [];
            if ($result['aggregations']['http']['doc_count']) {
                foreach ($result['aggregations']['http']['error_code']['buckets'] as $error) {
                    $tmp = [];
                    $tmp['error_code'] = $error['key'];
                    $tmp['error_count'] = $error['doc_count'];
                    $tmp['happen_start'] = date('Y-m-d H:i:s', $error['time']['min'] / 1000);
                    $tmp['happen_end'] = date('Y-m-d H:i:s', $error['time']['max'] / 1000);
                    $list[ $error['key'] ] = $tmp;
                }
            }
            if ($result['aggregations']['error_file']['doc_count']) {
                foreach ($result['aggregations']['error_file']['error_msg']['buckets'] as $error) {
                    $tmp = [];
                    $tmp['error_code'] = $error['key'];
                    $tmp['error_count'] = $error['doc_count'];
                    $tmp['happen_start'] = date('Y-m-d H:i:s', $error['time']['min'] / 1000);
                    $tmp['happen_end'] = date('Y-m-d H:i:s', $error['time']['max'] / 1000);
                    $list[ $error['key'] ] = $tmp;
                }
            }

            if ($list) {
                $iServiceType = AppGeneralMethod::instance()->getCodeServiceType(
                    $params['account_id'], $params['app_id']);
                Business::replaceDataForTableList($list, ['error_code'], $params['account_id'], $iServiceType);

                ArrayHelper::sortByUser($list, 'error_count', 'desc');

                if (count($list) > 5) {
                    $left = array_slice($list, 5);
                    $list = array_slice($list, 0, 5);
                    $list[] = $this->getOtherItem($left);
                }
                $order = 1;
                foreach ($list as $index => $item) {
                    $item['order'] = $order++;
                    $list[ $index ] = $item;
                }
                $return['list'] = array_values($list);
                foreach ($list as $item) {
                    $return['pie']['data'][ $item['error_code'] ] = $item['error_count'];
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }

    }


    public function getAppRequestUriChartLineExceptionCountJava($params)
    {
        array_push($aQueryFields, 'isException');

        $aNestQueryFields = ['nest_exception'];
        $aQueryParams = $this->getNewQueryParams(
            $params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);

        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields($aNestQueryFields), 'nest_sub_methods');
        $aQueryParams['surf'] = $params['surf'];
        $aQueryParams['topCount'] = 5;
        //dd($aQueryParams);
        $list = $this->getAppRequestUriChartLineExceptionCountJavaTop($params);
        if (!$list) {
            return [];
        }

        $return = $list;
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            //dd(json_encode($aTplParams));
            $result = $this->client->search($aTplParams);
            $time_buckets = $result['aggregations']['time']['buckets'];
            $time_list = self::getFacetsRangeTime($time_buckets, $params['start_time'], $params['end_time'], 'aggs');

            $labels = [];
            foreach ($time_buckets as $val) {
                $labels[] = $val['nest']['filter']['exception_msg']['buckets'][0]['key'];

            }
            $labels = array_unique($labels);
            $xKeyTimeFormat = TimeRangeEnum::getEchatsxKeyTimeFormat($params['start_time'], $params['end_time']);
            $init = DataProcessorES::processDefaultLineData($time_list, $labels, $xKeyTimeFormat);
            foreach ($result['aggregations']['time']['buckets'] as $time) {
                $real_time = $time['key'] / 1000;
                foreach ($time['nest']['filter']['exception_msg']['buckets'] as $exception) {
                    if (in_array($real_time, $time_list)) {
                        $init['data'][ $exception['key'] ][ $real_time ] = $time['doc_count'];
                    }
                }
            }

            $init = DataProcessorES::processResult($init);

            foreach ($init['data'] as $exception_msg => $item) {
                if (array_key_exists($exception_msg, $return)) {
                    $return[ $exception_msg ]['line'] = [
                        'labels' => $init['labels'],
                        'data'   => [
                            "异常次数" => $item,
                        ],
                    ];
                }
            }

            $return = array_values($return);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return [];
        }
    }


    public function getAppRequestUriChartLineExceptionCountJavaTop($values)
    {
        array_push($aQueryFields, 'isException');
        $aNestQueryFields = ['nest_exception'];
        $aQueryParams = $this->getNewQueryParams(
            $values, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $values, $this->getFields($aNestQueryFields), 'nest_sub_methods');
        $aQueryParams['surf'] = $values['surf'];
        $aQueryParams['topCount'] = 5;

        $return = [];
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');

            //            dd(json_encode($aTplParams));
            $result = $this->client->search($aTplParams);
            foreach ($result['aggregations']['nest']['filter']['exception_msg']['buckets'] as $exception) {
                $tmp = [];
                $tmp['error_code'] = $exception['key'];
                $tmp['error_count'] = $exception['nest']['doc_count'];
                $tmp['happen_start'] = date('Y-m-d H:i:s', $exception['nest']['happen_time']['min'] / 1000);
                $tmp['happen_end'] = date('Y-m-d H:i:s', $exception['nest']['happen_time']['max'] / 1000);
                $return[ $exception['key'] ] = $tmp;
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }


    public function getAppRequestUriChartLineExceptionCountPHP($values)
    {
        array_push($aQueryFields, 'isException');
        $aNestQueryFields = ['exception_list'];

        $return = $this->getAppRequestUriChartLineExceptionCountPHPTop($values);
        if (!$return) {
            return [];
        }
        $values['exception_list'] = array_keys($return);
        $values['nest_path'] = 'nest_exceptions';
        $aQueryParams = $this->getNewQueryParams(
            $values, ['app_id', 'account_id', 'start_time', 'end_time', 'uri'], $aNestQueryFields);
        $aQueryParams['surf'] = $values['surf'];
        $aQueryParams['topCount'] = 5;
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');
            //dd(json_encode($aTplParams));
            $result = $this->client->search($aTplParams);
            $time_buckets = $result['aggregations']['time']['buckets'];
            $time_list = self::getFacetsRangeTime($time_buckets, $values['start_time'], $values['end_time'], 'aggs');
            $labels = $values['exception_list'];
            $xKeyTimeFormat = TimeRangeEnum::getEchatsxKeyTimeFormat($values['start_time'], $values['end_time']);
            $init = DataProcessorES::processDefaultLineData($time_list, $labels, $xKeyTimeFormat);
            foreach ($result['aggregations']['time']['buckets'] as $time) {
                $real_time = $time['key'] / 1000;
                if (!in_array($real_time, $time_list)) {
                    continue;
                }
                foreach ($time['nest']['filter']['ex_msg']['buckets'] as $ex_msg) {
                    $init['data'][ $ex_msg['key'] ][ $real_time ] = $ex_msg['doc_count'];
                }
            }

            $line = DataProcessorES::processResult($init);
            foreach ($line['data'] as $exception_msg => $item) {
                if (array_key_exists($exception_msg, $return)) {
                    $return[ $exception_msg ]['line'] = [
                        'labels' => $line['labels'],
                        'data'   => [
                            "异常次数" => $item,
                        ],
                    ];
                }
            }

            $return = array_values($return);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return [];
        }
    }


    public function getAppRequestUriChartLineExceptionCountPHPTop($values)
    {
        $return = [];
        array_push($aQueryFields, 'isException');
        $aQueryParams = $this->getNewQueryParams($values, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        $aQueryParams['surf'] = $values['surf'];
        $aQueryParams['topCount'] = 5;
        $aQueryParams['nest_query'] = [];

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');

            //            dd(json_encode($aTplParams));
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['nest']['filter']['doc_count']) {
                foreach ($result['aggregations']['nest']['filter']['msg']['buckets'] as $exception) {
                    $return[ $exception['key'] ] = [
                        'error_code'   => $exception['key'],
                        'error_count'  => $exception['doc_count'],
                        'happen_start' => date('Y-m-d H:i:s', $exception['nest']['time']['min'] / 1000),
                        'happen_end'   => date('Y-m-d H:i:s', $exception['nest']['time']['max'] / 1000),
                    ];
                }
            }

            return $return;
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getLine());
            LogService::logException($e);

            return [];
        }
    }


    /**
     * 获取响应时间分布
     *
     * @param $params
     *
     * @return array
     */
    public function getSlowAnalysisTimeDistributionLine($params)
    {
        $return = [
            'data'   => [],
            'labels' => [],
        ];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        $aQueryParams['range_list'] = $this->getRangeList($params['min'], $params['max']);
        //        dd($aQueryParams['range_list']);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            //            self::ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                foreach ($result['aggregations'] as $label => $item) {
                    $return['labels'][] = $label;
                    $return['data']['次数'][] = $item['doc_count'];
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取单次快照信息
     *
     * @param $params
     *
     * @return array
     */
    public function getAnalysisSnapList($params)
    {
        $return = [];

        $iOrderMap = [
            'resp_time' => 'totalTime',
            'time'      => 'collTime',
        ];

        $params['order'] = ArrayHelper::extractValueFromArray(['order', $params, 'resp_time'], $iOrderMap);
        $params['sort'] = ArrayHelper::extractValueFromArray('sort', $params, 'desc');

        $aQueryParams = $this->getNewQueryParams(
            $params, ['uri', 'app_id', 'account_id', 'start_time', 'end_time', 'request_ids']);

        $params['page'] = ArrayHelper::extractValueFromArray('page', $params, 1);

        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
//                                                                        self::ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            $i = 1;
            if ($result['hits']['total']) {
                foreach ($result['hits']['hits'] as $hit) {
                    $source = $hit['_source'];
                    if (array_key_exists($source['request_id'], $return)) {
                        continue;
                    }
                    $tmp = [];
                    $tmp['order'] = ($params['page'] - 1) * AjaxPageEnum::PAGE_DEFAULT + $i++;
                    $tmp['exception'] = $source['isException'];
                    $tmp['time'] = date('Y-m-d H:i:s', $source['collTime'] / 1000);
                    $tmp['resp_time'] = round($source['totalTime'] / 1000, 2);
                    $tmp['url'] = $source['reqUrl_raw'];
                    $tmp['code'] = ReportAppTopologyEnum::$rsServiceTypeCode[ $aQueryParams['service_type'] ];
                    $tmp['instance'] = $source['host_instance_raw'];
                    $tmp['request_id'] = $source['request_id'];
                    $tmp['r_id'] = $source['r_id'];
                    $tmp['doc_id'] = $hit['_id'];
                    $tmp['status'] = $this->checkStatusForSource(
                        $source, $params['basic_setting']['slow'] * 1000, $params['basic_setting']['very_slow'] * 1000);
                    $return[ $tmp['request_id'] ] = $tmp;
                }
            }

            return array_values($return);
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * @todo 由于http错误码为数字索引,所以无法进行正则匹配,只能通过结果集过滤
     * @param $params
     *
     * @return array
     */
    public function getSnapAnalysisFilterErrorOrInstance($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams(
            $params, [
            'app_id',
            'account_id',
            'start_time',
            'end_time',
            'uri',
            'search_uri',
            'search_instance',
//            'search_error',
            'error',
        ]);
        $aQueryParams['field'] = $params['field'];
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
//                                                                        self::ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['hits']['total']) {
                foreach ($result['aggregations']['list']['buckets'] as $item) {
                    if(!$params['search_error'] || strstr($item['key'], $params['search_error'])){
                        $return[] = [
                            'name'  => $item['key'],
                            'value' => $item['key'],
                        ];
                    }
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getSnapAnalysisFilterException($params)
    {
        $return = [];

        $iServiceType = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);
        if ($iServiceType == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $params['nest_path'] = 'nest_exceptions';
            $this->fields['search_exception']['field'] = 'msg_raw';
        } else {
            $params['nest_path'] = 'nest_sub_methods';
        }
        $aQueryParams = $this->getNewQueryParams(
            $params, [
            'app_id',
            'account_id',
            'start_time',
            'end_time',
            'uri',
            'search_uri',
            'search_exception',
            'exception',
        ]);
        $aQueryParams['nest_path'] = $params['nest_path'];
        $aQueryParams['nest_field'] = $this->fields['search_exception']['field'];
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            //                                                            self::ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['hits']['total']) {
                foreach ($result['aggregations']['nest']['list']['buckets'] as $item) {
                    $return[] = [
                        'name'  => $item['key'],
                        'value' => $item['key'],
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
     * 获取单个请求的状态
     *
     * @param $source
     * @param $slow
     * @param $very_slow
     *
     * @return string
     */
    public function checkStatusForSource($source, $slow, $very_slow)
    {
        $return = 'normal';
        if ($source['isError']) {
            $tmp['status'] = 'error';
        } elseif ($source['totalTime'] > $very_slow) {
            $tmp['status'] = 'very_slow';
        } elseif ($source['totalTime'] > $slow) {
            $tmp['status'] = 'slow';
        } else {
            $tmp['status'] = 'normal';
        }

        return $return;
    }

    /**
     * 错误异常趋势图
     *
     * @param $params
     *
     * @return array
     */
    public function getErrorAnalysisErrorExceptionCountChart($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri']);
        //                dd(json_encode($aQueryParams));
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        //                $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                foreach ($result['aggregations']['time']['buckets'] as $item) {
                    $return['error'][ $item['key'] ] = $item['errorCount']['value'];
                    $return['exception'][ $item['key'] ] = $item['exceptionCount']['value'];
                }
            }

            $return = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $return);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 错误占比
     *
     * @param $params
     *
     * @return array
     */
    public function getErrorAnalysisErrorRatePie($params)
    {
        $return = [];
        $params['error'] = 1;
        $params['is_file_error'] = 1;
        $params['error_or_file_error'] = ['error', 'is_file_error'];
        $aQueryParams = $this->getNewQueryParams(
            $params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri', 'error_or_file_error']);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        //                                        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                foreach ($result['aggregations']['error']['buckets'] as $error) {
                    if ($error['key'] >= 400) {
                        $return[ $error['key'] ] = $error['doc_count'];
                    }
                }
                foreach ($result['aggregations']['file_error']['buckets'] as $error) {
                    $return[ $error['key'] ] = $error['doc_count'];
                }
            }

            $return = DataProcessorES::instance()->processPie($return);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 异常占比
     *
     * @param $params
     *
     * @return array
     */
    public function getErrorAnalysisExceptionRatePie($params)
    {
        $return = [];
        $params['exception'] = 1;
        $aQueryParams = $this->getNewQueryParams(
            $params, [
            'app_id',
            'account_id',
            'start_time',
            'end_time',
            'uri',
            'exception',
        ]);
        if ($aQueryParams['service_type'] == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $aQueryParams['nest_path'] = 'nest_exceptions';
            $aQueryParams['nest_field'] = 'nest_exceptions.msg_raw';
        } else {
            $aQueryParams['nest_path'] = 'nest_sub_methods';
            $aQueryParams['nest_field'] = 'nest_sub_methods.errorMsg_raw';
        }
        //                                dd(json_encode($aQueryParams));
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        //                                $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                foreach ($result['aggregations']['nest']['exception']['buckets'] as $error) {
                    $return[ $error['key'] ] = $error['doc_count'];
                }
            }

            $return = DataProcessorES::instance()->processPie($return);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取请求链
     *
     * @param $params
     *
     * @return array
     */
    public function getRequestFlow($params)
    {
        $params['service_type'] = ServiceTypeEnum::$codeAgentType;

        if (isset($params['doc_id'])) {
            $params['doc_id'] = (array)$params['doc_id'];
        }
        $aQueryParams = $this->getNewQueryParams(
            $params, [
            'start_time',
            'end_time',
            'request_id',
            'account_id',
//            'doc_id',
//            'r_id',
        ]);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                        self::ddTpl($aTplParams);
        $return = [];
        try {
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                foreach ($result['hits']['hits'] as $hit) {
                    $tmp = $hit['_source'];
                    $tmp['doc_id'] = $hit['_id'];
                    $tmp['r_id'] = $hit['_source']['r_id'];
                    $tmp['request_id'] = $params['request_id'];
                    $return[] = $tmp;
                }
            }

            foreach (ServiceTypeEnum::$codeAgentType as $iServiceType) {
                Business::replaceDataForTableList($return, ['req_flow_raw'], $params['account_id'], $iServiceType);
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);
        }
    }

    /**
     * 获取单个请求的请求时间
     *
     * @param $params
     *
     * @return bool
     */
    public function getRequestTime($params)
    {
        if (isset($params['doc_id'])) {
            $params['doc_id'] = (array)$params['doc_id'];
        }
        $aQueryParams = $this->getNewQueryParams($params, ['r_id', 'request_id', 'doc_id']);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                        $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                return $result['hits']['hits'][0]['_source']['collTime'];
            }

            return false;
        } catch (\Exception $e) {
            LogService::logException($e);

            return false;
        }
    }

    /**
     * 单次追踪-详情
     *
     * @param $params
     *
     * @return array
     */
    public function getSingleDetailData($params)
    {
        //        return json_decode('{"errors":[{"summary":500,"detail":{"name":"bear"}},{"summary":"php_error","detail":{"line":7,"msg_raw":"Uncaught exception \'Exception\' with message \'error\' in /usr/local/httpd-2.2.29/htdocs/discuz/test_lvy.php:7\nStack trace:\n#0 {main}\n  thrown","file_raw":"/usr/local/httpd-2.2.29/htdocs/discuz/test_lvy.php","type":1}}],"exceptions":[{"summary":"java.lang.Exception: --test exception !@#$%^&*()\"+_? --","detail":"请更新版本"},{"summary":"php_exception","detail":{"line":7,"msg_raw":"error","file_raw":"/usr/local/httpd-2.2.29/htdocs/discuz/test_lvy.php","error_code":"32768"}}],"dashboard":{"url":"10.0.5.37:80/test_lvy.php","app_type":"php","collect_time":"2017-12-04 08:04:20","time":0,"cip":"10.0.5.165","sip":"10.0.5.165","http_code":200,"business_id":"","host_instance_raw":"10.0.5.165:80","summary":{"api":[],"db":{"name":"delete from student where sid=?","time":0},"code":{"name":"main()","time":118.519}}},"code_tree":{"data_version":10920,"maps":{"1":{"mn":"main()","ct":1,"nid":1,"exception":0,"errorMsg_raw":"","exstack_raw":"","httpResponseCode":200,"wt":118.52,"rate":100,"cpu":"-","mu":"-","pst":""},"{start}":{"wt":118.52,"cpu":0.33,"mu":23.01,"pmu":48888,"request_info":"J45Engw88NchTUhqO1yVcq16mL6F2aE**YqvkV2NjUR0R0OOVgaSpLqT0Avvp9NSc9k5zJKoo**j**3ShYJ26NohnsmO2pinN9YP/EKpnEdCiMZaVO1hpeXAqc5uFYxO**uin5kvWdvKrkM!!_7849e076-c017-4522-9d30-236835042415@p:6237489133610663:1512346166568","fn":"/test_lvy.php","sn":"10.0.5.37","sip":"10.0.5.165","sport":"80","cip":"10.0.5.165","uri":"/test_lvy.php","resp_code":200,"rt":"1486611747","r_method":"GET","r_params":[],"lport":"80","rate":100,"pst":""}},"tree":{"1":[]},"resources":[],"exceptions":{"32768":[{"file":"/usr/local/httpd-2.2.29/htdocs/discuz/test_lvy.php","line":7,"msg":"error"}]},"error":{"type":1,"file":"/usr/local/httpd-2.2.29/htdocs/discuz/test_lvy.php","line":7,"msg":"Uncaught exception \'Exception\' with message \'error\' in /usr/local/httpd-2.2.29/htdocs/discuz/test_lvy.php:7\nStack trace:\n#0 {main}\n  thrown"},"child_deep":2},"slow_element":[{"time":118.519,"count":1,"mn":"main()","pst":"","rate":100}],"apis":[],"sqls":[]}',true);
        $return = [];
        if (isset($params['doc_id'])) {
            $params['doc_id'] = (array)$params['doc_id'];
        }
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'request_id', 'account_id', 'r_id', 'doc_id']);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            //            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            $doc = $result['hits']['hits'][0]['_source'];
            $host = ConfigService::instance()->getConfig('hbase.hosts');
            $api = 'http://' . rtrim($host, '/') . '/getTrackTree';
            $data = DESHelper::instance()->encode(json_encode([$doc['stack_tree']]));
            $code_tree = ApiClient::instance()->restPost($api, json_encode(['id' => $data]));
            $code_tree_info = json_decode(array_pop($code_tree), true);


            //错误异常
            $return = $this->getErrorsFromCodeTree(
                $doc, $params['setting'], $aQueryParams['service_type'], $return['params'], $params['account_id']);

            //参数
            $return['params'] = $this->getParamsFromCodeTree($code_tree_info);

            //堆栈原始数据
            $return['code_tree'] = $this->getCodeTreeData($code_tree_info);

            //最慢元素
            $return['slow_element'] = array_values($this->processPtTop($code_tree_info, $aQueryParams['service_type']));

            $apiRelation = $this->getAppSnapRelation($params);

            //api
            $return['apis'] = $this->getApisFromCodeTree($code_tree_info, $apiRelation);

            //sql
            $return['sqls'] = $this->getSqlsFromCodeTree($code_tree_info);

            //概览数据
            $return['dashboard'] = $this->getDashboardData($doc, $aQueryParams['service_type'], $code_tree_info);

            //潜在问题
            $return['dashboard']['summary'] = $this->getDashboardSummary($return);

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    public function getDashboardData($doc, $iServiceType, $aCodeTree)
    {
        $dashboard = [];
        $dashboard['url'] = $doc['reqUrl_raw'];
        $dashboard['app_type'] = ReportAppTopologyEnum::$rsServiceTypeCode[ $iServiceType ];;
        $dashboard['collect_time'] = date('Y-m-d H:i:s', $doc['collTime'] / 1000);
        if ($doc['isError']) {
            $dashboard['time'] = '-';
        } else {
            $dashboard['time'] = round($dashboard['wt'] / 1000, 2);
        }
        $dashboard['cip'] = $aCodeTree['maps']['{start}']['cip'];
        $dashboard['sip'] = $aCodeTree['maps']['{start}']['sip'];
        $dashboard['http_code'] = $doc['httpResponseCode'];
        if (isset($doc['customV_raw'])) {
            $dashboard['business_id'] = e($doc['customV_raw']);
        } else {
            $dashboard['business_id'] = '';
        }
        if (isset($doc['host_instance_raw'])) {
            $dashboard['host_instance_raw'] = $doc['host_instance_raw'];
        } else {
            $dashboard['host_instance_raw'] = $dashboard['sip'];
        }

        return $dashboard;
    }

    /**
     * 潜在问题
     *
     * @param $data
     *
     * @return array
     */
    public function getDashboardSummary($data)
    {
        //获取最慢资源
        $combined = array_merge($data['apis'], $data['sqls']);
        ArrayHelper::sortByUser($combined, 'wt', 'desc');
        if ($combined) {
            ArrayHelper::sortByUser($combined, 'wt', 'desc');
            $slowest = array_shift($combined);
        } else {
            $slowest = [];
        }
        $slow_element = $data['slow_element'];
        $return = [
            'api'  => [],
            'db'   => [],
            'code' => [],
        ];
        //最慢资源
        if ($slowest) {
            if ($slowest['pst'] == SmartAgentFunctionTypeEnum::CURL) {
                $return['api'] = [
                    'name' => $slowest['ps']['host'],
                    'time' => round($slowest['wt'], 2),
                ];
            } else {
                if (array_key_exists('db_type_p', $slowest) && in_array(
                        $slowest['db_type_p'], ServiceTypeEnum::$db_name_from_es)
                ) {
                    $slowest['ps'] = (array)$slowest['ps'];
                    $return['db'] = [
                        'name' => array_pop($slowest['ps']),
                        'time' => round($slowest['time'], 2),
                    ];;
                }
            }
        }

        //最慢方法
        foreach ($slow_element as $index => $element) {
            $bCurl = $element['pst'] == SmartAgentFunctionTypeEnum::CURL;
            $bSql = array_key_exists('service_type', $element) && in_array(
                    $element['service_type'], ServiceTypeEnum::$relational_type_db);
            if ($bCurl || $bSql) {
                continue;
            }
            $return['code'] = [
                'name' => $element['mn'],
                'time' => $element['time'],
            ];
        }

        return $return;
    }

    /**
     * 堆栈结构格式化
     *
     * @param $data
     *
     * @return mixed
     */
    public function getCodeTreeData($data)
    {
        $total = $data['maps']['{start}']['wt'];
        $serviceDbType = SmartAgentFunctionTypeEnum::$db_query_type;
        if ($total) {
            foreach ($data['maps'] as $key => &$item) {
                if (!isset($item['wt'])) {
                    continue;
                }
                $item['rate'] = round($item['wt'] / $total * 100, 2);
                $item['wt'] = round($item['wt'] / 1000, 2);
                $item['cpu'] = isset($item['cpu']) ? round($item['cpu'] / 1000, 2) : '-';
                $item['mu'] = isset($item['mu']) ? round($item['mu'] / 1024, 2) : '-';
                //如果参数信息为空则不提示
                if (!isset($item['pst'])) {
                    $item['pst'] = '';
                    $data['maps'][ $key ] = $item;
                    continue;
                }

                if (array_key_exists($item['pst'], SmartAgentFunctionTypeEnum::$db_query_type)) {

                    if (isset($item['ps_raw'])) {
                        $item['ps'] = $item['ps_raw'];
                    }
                    if (!isset($item['ps']) || !$item['ps']) {
                        continue;
                    }
                    if (is_array($item['ps'])) {
                        foreach ($item['ps'] as $inner_key => $value) {
                            if (is_array($value)) {
                                $item['ps'][ $inner_key ] = json_encode($value);
                            }
                        }
                    }

                    $item['ext_status'] = 1;
                    if (is_array($item['ps'])) {
                        $item['ext_msg'] = htmlentities(implode(';', $item['ps']));
                    } else {
                        $item['ext_msg'] = htmlentities($item['ps']);
                    }
                    //根据pst 对应 db_type
                    $item['db_type_p'] = '';
                    if (isset($item['pst']) && $item['pst']) {
                        if (array_key_exists($item['pst'], $serviceDbType)) {
                            $item['db_type_p'] = $serviceDbType[ $item['pst'] ];
                        }
                    }
                    $item['ext_img'] = 'ext_db.png';
                    $data['sqls'][] = $item;
                }
                if (in_array($item['pst'], SmartAgentFunctionTypeEnum::$API_PST)) {
                    $item['ext_status'] = 1;
                    $item['ext_msg'] = $item['ps']['host'];
                    $item['ext_img'] = 'ext_curl.png';
                    $item['api_exists'] = $item['pst'] == SmartAgentFunctionTypeEnum::RABBIT_CONSUMER ? true : false;
                    $item['sql_exist'] = false;
                    $item['api_app_id'] = '';
                    $data['apis'][] = $item;
                }
            }
        } else {
            $data['maps'] = [
                '{start}' => $data['maps']['{start}'],
            ];
        }
        $data['child_deep'] = ArrayHelper::getChildDeeps($data['tree']);
        $data['tree'] = (object)$data['tree'];

        $monolayerTreeResult = [];
        if ($data['tree']) {
            //$level 的初始层级必须为0
            $level = 0;
            $leaf = [];
            $this->getmonolayerTree($data['tree'], $level, $monolayerTreeResult, $leaf);

        }

        $monolayerTreeResult['slowest'] = $this->getSlowestLeaf($data['maps'], $leaf);
        $data['monolayerTree'] = $monolayerTreeResult;

        return $data;
    }

    /**
     * @param $maps    array 树节点map信息
     * @param $leafs   array 所有的叶子节点
     *
     * @return array
     */
    public function getSlowestLeaf($maps, $leafs)
    {
        $result = [
            'wt'  => 0,
            'nid' => '',
        ];
        if ($leafs) {
            foreach ($maps as $n_id => $item) {
                if (in_array($n_id, $leafs, true) && $item['wt'] > $result['wt']) {
                    $result['wt'] = $item['wt'];
                    $result['nid'] = $n_id;
                }
            }
        }

        return $result;
    }

    /**
     * @param     $nodes            要处理的树结构
     * @param     $currentLevel     当前迭代层级
     * @param     $result           处理的结果
     * @param int $maxLevel         最大迭代层级  如果要显示两层 就是2
     */
    public function getmonolayerTree(&$nodes, $currentLevel, &$result, &$leaf, $maxLevel = PHP_INT_MAX)
    {
        $currentLevel++;
        if ($currentLevel <= $maxLevel) {
            foreach ($nodes as $n_id => $node) {
                if ($currentLevel == 1) {
                    $result['root'][] = $n_id;
                }
                if ($node) {
                    $result['tree'][ $n_id ] = array_keys($node);
                    $this->getmonolayerTree($node, $currentLevel, $result, $leaf, $maxLevel);
                } else {
                    $result['tree'][ $n_id ] = $node;
                    $leaf[] = $n_id;
                }
            }
        } else {
            return;
        }

    }

    /**
     * 时间取方法的topN
     *
     * @param      $data
     * @param null $service_type
     *
     * @return array
     */
    public function processPtTop($data, $service_type = null)
    {
        $return = [];
        $timeSum = 0;
        foreach ($data['maps'] as $node => $value) {

            if (!isset($value['wt'])) {
                continue;
            }

            if ($node == '{start}') {
                continue;
            }
            if (!isset($value['pst'])) {
                $value['pst'] = '';
            }
            $time = $value['wt'];
            $childNode = self::getNode($data['tree'], $node);
            $child_node_time = 0;

            if ($service_type == ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS) {
                $timeSum += $value['wt'];
                $childNode = false;
            }
            if ($childNode) {
                foreach ($childNode as $k) {
                    if (array_key_exists($k, $data['maps'])) {
                        $node_time = $data['maps'][ $k ]['wt'];
                        $time -= $node_time;
                        $child_node_time += $node_time;
                        if ($time < 0) {
                            LogService::setLog(
                                'info', 'codetree负值错误', [$data['maps']['{start}'], $value], [], 'App/getCodeTree');
                            continue 2;
                        }
                    } else {
                        LogService::setLog('error', 'codetree节点缺失错误', $data['maps']['{start}'], [], 'App/getCodeTree');
                    }
                }
            }

            $return[ $node ] = [
                'time'  => $time,
                'count' => $value['ct'],
                'mn'    => $value['mn'],
                'pst'   => $value['pst'],
            ];
        }

        if ($service_type == ServiceTypeEnum::TYPE_CODE_AGENT_NODEJS) {
            $total_time = $timeSum / 1000;
        } else {
            $total_time = $data['maps']['{start}']['wt'] / 1000;
        }

        //方法合并
        $returnData = [];
        foreach ($return as $node => $value) {
            if (isset($returnData[ $value['mn'] ])) {
                $returnData[ $value['mn'] ]['time'] += $value['time'];
                $returnData[ $value['mn'] ]['count'] += $value['count'];
            } else {
                $returnData[ $value['mn'] ] = $value;
            }
        }

        ArrayHelper::sortByUser($returnData, 'time', 'desc');
        foreach ($returnData as $index => $item) {
            if (isset($item['time'])) {
                $returnData[ $index ]['time'] /= 1000;
            }
        }

        if ($total_time) {
            foreach ($returnData as $k => $item) {
                $returnData[ $k ]['rate'] = round($returnData[ $k ]['time'] / $total_time * 100, 2);
            }
        } else {
            foreach ($returnData as $k => $item) {
                $returnData[ $k ]['rate'] = 100;
            }
        }

        return $returnData;
    }

    /**
     * 获取子节点
     *
     * @param $data
     * @param $key
     *
     * @return array
     */
    public function getNode($data, $key)
    {
        $keys = [];
        foreach ($data as $k => $v) {
            if ($k == $key && is_array($v)) {
                $keys = array_merge($keys, array_keys($v));
            } else {
                if (is_array($v)) {
                    if ($return = self::getNode($v, $key)) {
                        $keys = array_merge($keys, $return);
                    }
                }
            }
        }

        return array_unique($keys);
    }

    /**
     * 从堆栈中获取参数信息
     *
     * @param $code_tree_info
     *
     * @return array
     */
    public function getParamsFromCodeTree($code_tree_info)
    {
        $return = [];
        $summary = $code_tree_info['maps']['{start}'];
        if (array_key_exists('parameters', $summary)) {
            $return = [];
            $list = $summary['parameters'];
            foreach ($list as $params) {
                if (isset($params['value'])) {
                    $value = array_pop($params['value']);
                } else {
                    if (isset($params['values'])) {
                        $value = array_pop($params['values']);
                    } else {
                        $value = 'unknown';
                    }
                }
                $return[] = [
                    'name'  => $params['name'],
                    'value' => $value,
                ];
            }
        }

        return $return;
    }

    /**
     * 从堆栈中获取api信息
     *
     * @param $code_tree_info
     * @param $addition
     *
     * @return array
     */
    public function getApisFromCodeTree($code_tree_info, $addition)
    {
        $return = [];
        foreach ($code_tree_info['maps'] as $method) {
            if (array_key_exists('pst', $method) && $method['pst'] == SmartAgentFunctionTypeEnum::CURL) {
                $info = pathinfo($method['ps']['host']);
                $domain = str_replace(['http://'], [''], $info['dirname']);
                $domain = preg_replace('/\/.*?$/', '', $domain);
                $method['app_id'] = DESHelper::instance()->md5ToDec(md5($domain));
                $method['api'] = $method['ps']['host'];
                $method['wt'] /= 1000;
                if (isset($method['r_id']) && array_key_exists($method['r_id'], $addition['r_id_list'])) {
                    $method = array_merge($method, $addition['r_id_list'][ $method['r_id'] ]);
                } elseif (isset($addition['doc_id_list'])) {
                    foreach ($addition['doc_id_list'] as $index => $item) {
                        if ($item['app_id'] == $method['app_id']) {
                            $method = array_merge($method, $item);
                            unset($addition['doc_id_list'][ $index ]);
                            break;
                        }
                    }
//                    $method = array_merge($method, array_pop($addition['doc_id_list']));
                }
                $return[] = $method;
            }
        }

        ArrayHelper::sortByUser($return, 'wt', 'desc');

        return array_values($return);
    }

    /**
     * 从堆栈中获取sql信息
     *
     * @param $code_tree_info
     *
     * @return array
     */
    public function getSqlsFromCodeTree($code_tree_info)
    {
        $return = [];
        $serviceDbType = SmartAgentFunctionTypeEnum::$db_query_type;
        $total = $code_tree_info['maps']['{start}']['wt'];
        foreach ($code_tree_info['maps'] as $key => $item) {
            if (isset($item['pst']) && array_key_exists($item['pst'], SmartAgentFunctionTypeEnum::$db_query_type)) {
                $item['rate'] = round($item['wt'] / $total * 100, 2);
                $item['wt'] = round($item['wt'] / 1000, 2);
                $item['cpu'] = isset($item['cpu']) ? round($item['cpu'] / 1000, 2) : '-';
                $item['mu'] = isset($item['mu']) ? round($item['mu'] / 1024, 2) : '-';
                if (isset($item['ps_raw'])) {
                    $item['ps'] = $item['ps_raw'];
                }
                if (!isset($item['ps']) || !$item['ps']) {
                    continue;
                }
                if (is_array($item['ps'])) {
                    foreach ($item['ps'] as $inner_key => $value) {
                        if (is_array($value)) {
                            $item['ps'][ $inner_key ] = json_encode($value);
                        }
                    }
                }

                $item['ext_status'] = 1;
                if (is_array($item['ps'])) {
                    $item['ext_msg'] = htmlentities(implode(';', $item['ps']));
                } else {
                    $item['ext_msg'] = htmlentities($item['ps']);
                }
                //根据pst 对应 db_type
                $item['db_type_p'] = '';
                if (isset($item['pst']) && $item['pst']) {
                    if (array_key_exists($item['pst'], $serviceDbType)) {
                        $item['db_type_p'] = $serviceDbType[ $item['pst'] ];
                    }
                }
                $item['ext_img'] = 'ext_db.png';
                //没有携带端口的默认 3306   instance_Raw  一会 10.0.1.25 一会 10.0.1.25： es的数据结构真任性
                if ($serviceDbType[ $item['pst'] ] == SmartAgentFunctionTypeEnum::DB_MYSQL) {
                    if (isset($item['instance_raw']) && !strstr($item['instance_raw'], ':')) {
                        $item['instance_raw'] = $item['instance_raw'] . ':3306';
                    }
                    if (isset($item['instance_raw'])) {
                        $explode = explode(':', $item['instance_raw']);
                        if (!$explode[1]) {
                            $item['instance_raw'] = $item['instance_raw'] . '3306';
                        }
                    }
                }
                $return[] = $item;
            }
        }

        ArrayHelper::sortByUser($return, 'wt', 'desc');

        return array_values($return);
    }

    /**
     * 从堆栈中获取错误及概览信息
     *
     * @param $doc
     * @param $setting
     * @param $iServiceType
     *
     * @return array
     */
    public function getErrorsFromCodeTree($doc, $setting, $iServiceType, $params, $iAccount_id)
    {
        $return = [
            'errors'     => [],
            'exceptions' => [],
            'dashboard'  => [],
        ];

        $return['dashboard']['time'] = '-';
        $return['dashboard']['status'] = 'red';
        if (isset($doc['is_file_error']) && $doc['is_file_error'] == 1) {
            $list = [$doc['error']];
            Business::instance()->replaceDataForTableList($list, 'file_raw', $iAccount_id, $iServiceType);
            $return['errors'][] = [
                'summary' => 'php_error',
                'detail'  => $list[0],
            ];
        } else {
            if ($doc['isError']) {
                $return['errors'][] = [
                    'summary' => $doc['httpResponseCode'],
                    'detail'  => $params,
                ];
            } elseif ($doc['totalTime'] > $setting['very_slow'] * 1000) {
                $return['dashboard']['status'] = 'very_slow';
            } elseif ($doc['totalTime'] > $setting['slow'] * 1000) {
                $return['dashboard']['request_status'] = 'slow';
            } else {
                $return['dashboard']['request_status'] = 'normal';
            }
        }

        if ($doc['isException']) {
            if ($iServiceType == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
                Business::instance()->replaceDataForTableList(
                    $doc['nest_exceptions'], 'file_raw', $iAccount_id, $iServiceType);
                foreach ($doc['nest_exceptions'] as $exception) {
                    $return['exceptions'][] = [
                        'summary' => 'php_exception',
                        'detail'  => $exception,
                    ];;
                }
            } elseif ($iServiceType == ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON) {
                if (!isset($doc['nest_exceptions'][0]['excTraceback_raw'])) {
                    $return['exceptions'][] = [
                        'summary' => $doc['nest_exceptions'][0]['excp_raw'],
                        'detail'  => '请更新版本',
                    ];
                } else {
                    $return['exceptions'][] = [
                        'summary' => $doc['nest_exceptions'][0]['excp_raw'],
                        'detail'  => $doc['nest_exceptions'][0]['excTraceback_raw'],
                    ];
                }
            } else {
                foreach ($doc['nest_sub_methods'] as $exception) {
                    if (isset($exception['exception']) && $exception['exception'] == 1) {
                        if (!isset($exception['exstack_raw'])) {
                            $return['exceptions'][] = [
                                'summary' => $exception['errorMsg_raw'],
                                'detail'  => '请更新版本',
                            ];
                        } else {
                            $return['exceptions'][] = [
                                'summary' => $exception['errorMsg_raw'],
                                'detail'  => $exception['exstack_raw'],
                            ];
                        }
                    }
                }

                Business::instance()->replaceRawIdDataForTableList($return['exceptions'], 'detail');
            }
        }

        return $return;
    }

    /**
     * 获取api调用关联信息
     *
     * @param $params
     *
     * @return array
     */
    public function getAppSnapRelation($params)
    {
        $return = [
            'r_id_list'   => [],
            'doc_id_list' => [],
        ];
        $params['service_type'] = ServiceTypeEnum::$codeAgentType;
        $aQueryParams = $this->getNewQueryParams($params, ['start_time', 'end_time', 'account_id', 'request_id']);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

        try {
            $result = $this->client->search($aTplParams);
            if ($result['hits']['hits']) {
                foreach ($result['hits']['hits'] as $hit) {
                    $apiBool = $sqlBool = false;
                    $temp = [];
                    foreach ($hit['_source']['nest_sub_methods'] as $method) {
                        if (isset($method['pst']) && in_array($method['pst'], SmartAgentFunctionTypeEnum::$API_PST)) {
                            $apiBool = true;
                        }
                    }
                    if (isset($hit['_source']['nest_sub_sqls']) && $hit['_source']['nest_sub_sqls']) {
                        $sqlBool = true;
                    }

                    $temp['app_id'] = $hit['_source']['app_id'];
                    $temp['api_exists'] = $apiBool;
                    $temp['sql_exist'] = $sqlBool;
                    $temp['api_origin'] = true;
                    $temp['doc_id'] = $hit['_id'];
                    $temp['request_id'] = $hit['_source']['request_id'];

                    if (isset($hit['_source']['r_id']) && $hit['_source']['r_id']) {
                        $temp['r_id'] = $hit['_source']['r_id'];
                        $temp['type'] = 'r_id';
                        $return['r_id_list'][ $hit['_source']['r_id'] ] = $temp;
                    } else {
                        $temp['doc_id'] = $hit['_id'];
                        $temp['r_id'] = '';
                        $temp['type'] = 'doc_id';
                        $return['doc_id_list'][] = $temp;
                    }
                }
            }
        } catch (Exception $e) {
            LogService::logException($e);
        }

        return $return;
    }

    /**
     * 单次追踪-api列表信息
     *
     * @param $params
     *
     * @return array
     */
    public function getSingleCalledApiSnapTopo($params)
    {
        $return = [];
        $params['app_ids'] = [];
        foreach ($params['app_from'] as $app_id) {
            if (is_numeric($app_id)) {
                $params['app_ids'][] = $app_id;
            }
        }
        $params['service_type'] = ServiceTypeEnum::$codeAgentType;
        $aQueryParams = $this->getNewQueryParams(
            $params, ['start_time', 'end_time', 'account_id', 'request_id', 'app_ids']);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                $this->ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            $date = $result['hits']['hits'];

            if ($date) {
                foreach ($date as $hit) {
                    foreach ($hit['_source']['nest_sub_methods'] as $method) {
                        if (isset($method['pst']) && in_array(
                                $method['pst'],
                                SmartAgentFunctionTypeEnum::$API_PST) && isset($method['app_id']) && $method['app_id'] == $params['app_to']
                        ) {
                            $temp['url'] = $method['ps_raw'];
                            $path_info = explode('?', $hit['_source']['reqUrl_raw']);
                            $temp['call_url'] = array_shift($path_info);
                            if (isset($method['r_id'])) {
                                $temp['r_id'] = $method['r_id'];
                            } else {
                                $temp['r_id'] = '';
                            }
                            if (isset($method['collTime'])) {
                                $temp['date'] = $method['collTime'];
                            } else {
                                $temp['date'] = $hit['_source']['collTime'];
                            }
                            $temp['resp_time'] = round($method['wt'] / 1000, 2);
                            $temp['request_id'] = $params['request_id'];
                            $temp['api_app_id'] = $params['app_from'];
                            $temp['api_exists'] = false;
                            $temp['sql_exist'] = false;
                            $temp['api_origin'] = false;
                            array_push($return, $temp);
                        }
                    }
                }

                ArrayHelper::sortByUser($return, 'date', 'desc');

                foreach ($aQueryParams['service_type'] as $iServiceType) {
                    Business::replaceDataForTableList($return, ['url'], $params['account_id'], $iServiceType);
                }

                $order = 1;
                foreach ($return as $index => $item) {
                    $item['url'] = str_replace(['{host=', '}'], ['', ''], $item['url']);
                    $url_info = pathinfo($item['url']);
                    if (isset($url_info['basename'])) {
                        $item['uri'] = '/' . $url_info['basename'];
                    } else {
                        $item['uri'] = '/';
                    }
                    $item['order'] = $order++;
                    $return[ $index ] = $item;
                }

                //获取 api sql信息
                $appDetailInfo = $this->getAppSnapRelation($params);
                foreach ($return as $k => $v) {
                    if (array_key_exists($v['r_id'], $appDetailInfo['r_id_list'])) {
                        $return[ $k ] = ArrayHelper::mergeArray($return[ $k ], $appDetailInfo['r_id_list'][ $v['r_id'] ]);
                    } else {
                        if (count($appDetailInfo['doc_id_list']) > 0) {
                            foreach ($appDetailInfo['doc_id_list'] as $index => $item) {
                                if ($item['app_id'] == $v['api_app_id']) {
                                    $return[ $k ] = ArrayHelper::mergeArray($return[ $k ], $item);
                                    unset($appDetailInfo['doc_id_list'][ $index ]);
                                    break;
                                }
                            }
                            $return[ $k ] = ArrayHelper::mergeArray($return[ $k ], array_pop($appDetailInfo['doc_id_list']));
                        }
                    }
                }

                return $return;

            }
        } catch (Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 单次追踪-拓扑弹窗-mqc调用列表
     *
     * @param $params
     *
     * @return array
     */
    public function getSingleCalledApiMqcSnapTopo($params)
    {
        $return = [];
        $params['app_id'] = $params['api_app_id'];
        $aQueryParams = $this->getNewQueryParams(
            $params, ['start_time', 'end_time', 'account_id', 'request_id', 'app_id']);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        try {
            $result = $this->client->search($aTplParams);

            if ($result['hits']['total']) {
                foreach ($result['hits']['hits'] as $item) {
                    $sql_exist = $item['_source']['nest_sub_sqls'] ? true : false;
                    $return[] = [
                        'call_url'   => '-',
                        'url'        => $item['_source']['reqUrl_raw'],
                        'uri'        => $item['_source']['reqUri_raw'],
                        'date'       => $item['_source']['collTime'],
                        'date_p'     => date('Y-m-d H:i:s', $item['_source']['collTime'] / 1000),
                        'wt'         => round($item['_source']['totalTime'] / 1000, 2),
                        'request_id' => $params['request_id'],
                        'api_app_id' => $params['api_app_id'],
                        'api_exists' => false,
                        'sql_exist'  => $sql_exist,
                        'api_origin' => true,
                        'doc_id'     => $item['_id'],
                        'app_id'     => $item['_source']['app_id'],
                    ];
                }
            }

            return $return;
        } catch (Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 单次追踪topN request_id
     *
     * @param $params
     *
     * @return array
     */
    public function getTopTenRequestId($params)
    {
        $return = [];
        $order_map = [
            'resp_time' => 'totalTime',
            'time'      => 'collTime',
        ];
        $params['order'] = ArrayHelper::extractValueFromArray(['order', $params, 'resp_time'], $order_map);
        $params['sort'] = ArrayHelper::extractValueFromArray('sort', $params, 'desc');
        $iServiceType = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);
        if ($iServiceType == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $params['nest_path'] = 'nest_exceptions';
            $this->fields['search_exception']['field'] = 'msg_raw';
        } else {
            $params['nest_path'] = 'nest_sub_methods';
        }
        $aQueryParams = $this->getNewQueryParams(
            $params, [
            'app_id',
            'account_id',
            'start_time',
            'end_time',
            'uri',
            'slow',
            'search_url',
            'search_instances',
            'search_from',
            'search_to',
            'search_errors',
            'error_or_exception',
        ], ['search_exceptions']);
        //                dd(json_encode($aQueryParams));

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//                        $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                foreach ($result['hits']['hits'] as $hit) {
                    $return[] = $hit['_source']['request_id'];
                }
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取响应时间区间
     *
     * @param $params
     *
     * @return array
     */
    public function getTimeRange($params)
    {
        $return = [];
        $aQueryParams = $this->getNewQueryParams(
            $params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri', 'slow']);

        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
        //                        self::ddTpl($aTplParams);
        try {
            $result = $this->client->search($aTplParams);
            if ($result['hits']['total']) {
                $return['max'] = $result['aggregations']['time']['max'];
                $return['min'] = $result['aggregations']['time']['min'];
            }

            return $return;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $return;
        }
    }

    /**
     * 获取分布区间列表
     *
     * @param     $min
     * @param     $max
     * @param int $num
     *
     * @return array
     */
    public function getRangeList($min, $max, $num = 10)
    {
        $return = [];

        if ($max != $min) {
            $interval = ($max - $min) / $num;
            for ($i = 0; $i < $num; $i++) {
                $from = round(($min + $i * $interval) / 1000, 2);
                $to = round(($min + ($i + 1) * $interval) / 1000, 2);
                $label = $from . '-' . $to . 'ms';
                $return[] = [
                    'from'  => $min + $i * $interval,
                    'to'    => $min + ($i + 1) * $interval,
                    'label' => $label,
                ];
            }
        } else {
            $from = round($min / 1000, 2);
            $label = $from . 'ms';
            $return[] = [
                'from'  => $min,
                'to'    => $max,
                'label' => $label,
            ];
        }


        return $return;
    }

    /**
     * @param $left
     *
     * @return mixed
     */
    public function getOtherItem($left)
    {
        $tmp = array_pop($left);
        $tmp['error_code'] = 'Other';
        foreach ($left as $item) {
            if ($item['happen_start'] < $tmp['happen_start']) {
                $tmp['happen_start'] = $item['happen_start'];
            }

            if ($item['happen_end'] > $tmp['happen_end']) {
                $tmp['happen_end'] = $item['happen_end'];
            }

            $tmp['error_count'] += $item['error_count'];
        }

        return $tmp;
    }


}