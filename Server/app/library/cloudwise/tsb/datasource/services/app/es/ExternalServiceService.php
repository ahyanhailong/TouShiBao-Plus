<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午8:35
 */

namespace cloudwise\tsb\datasource\services\app\es;

use App\library\Service\DataProcessorES;
use cloudwise\tsb\datasource\base\EsService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;


class ExternalServiceService extends EsService
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
        'domain'     => [
            'type'  => 'terms',
            'field' => 'domain_raw',
        ],
        'port'       => [
            'type'  => 'terms',
            'field' => 'port',
        ],
        'uri'        => [
            'type'  => 'term',
            'field' => 'uri_raw',
        ],
        'pst'        => [
            'type'  => 'term',
            'field' => 'pst',
        ],
        'exception'  => [
            'type'  => 'term',
            'field' => 'exception',
        ],
    ];

    public function getUrlList($params)
    {
        $data                  = [];
        $order_map             = [
            'error_rate'            => 'error.sum',
            'throughput'            => '_count',
            'avg_response_time'     => 'ct.avg',
            'response_time_percent' => 'ct.sum',
        ];
        $aQueryParams          = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['order'] = isset($params['type']) && $order_map[$params['type']] ? $order_map[$params['type']] : 'ct.sum';
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            $date   = $result['aggregations']['nest']['condition']['domain']['buckets'];

            $sum      = $result['aggregations']['nest']['condition']['ct']['sum'];
            $errorSum = $result['aggregations']['nest']['condition']['error']['value'];
            $minute   = ($params['end_time'] - $params['start_time']) / (1000 * 60);
            if ($date) {
                foreach ($date as $k => $v) {
                    $explode = explode('###', $v['key']);
                    if ($params['type'] == 'error_rate') {
                        if (!$v['error']['value']) {
                            continue;
                        }
                    }
                    $temp['key']        = implode(':', $explode);
                    $temp['domain']     = $explode[0];
                    $temp['port']       = $explode[1];
                    $temp['percent']    = $sum ? round($v['ct']['sum'] / $sum * 100, 2) : 0;
                    $temp['avg_resp_p'] = round($v['ct']['avg'], 2);

                    $temp['throughput'] = round($v['doc_count'] / $minute, 2);
                    $temp['error_rate'] = $errorSum ? round($v['error']['value'] / $errorSum * 100, 2) : 0;
                    $temp['errors']     = $v['error']['value'];
                    array_push($data, $temp);
                }
            }
        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getSingleUriList($params)
    {
        $data      = [];
        $order_map = [
            'error_rate'            => 'error.sum',
            'throughput'            => '_count',
            'avg_response_time'     => 'ct.avg',
            'response_time_percent' => 'ct.sum',
        ];

        $params['pst']                  = 1101;
        $params['domain']               = (array)$params['domain'];
        $params['port']                 = (array)$params['port'];
        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['order']          = isset($params['type']) && $order_map[$params['type']] ? $order_map[$params['type']] : 'ct.sum';
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst']), 'nest_sub_methods');

//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            $date = $result['aggregations']['nest']['condition']['domain']['buckets'];

            $sum      = $result['aggregations']['nest']['conditionSum']['ct']['sum'];
            $errorSum = $result['aggregations']['nest']['conditionSum']['error']['value'];
            $minute   = ($params['end_time'] - $params['start_time']) / (1000 * 60);
            if ($date) {
                foreach ($date as $k => $v) {
                    $temp['key'] = $v['key'];

                    $temp['percent']    = $sum ? round($v['ct']['sum'] / $sum * 100, 2) : 0;
                    $temp['avg_resp_p'] = round($v['ct']['avg'], 2);

                    $temp['throughput'] = round($v['doc_count'] / $minute, 2);
                    $temp['error_rate'] = $errorSum ? round($v['error']['value'] / $errorSum * 100, 2) : 0;
                    $temp['errors']     = $v['error']['value'];
                    array_push($data, $temp);
                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }


    public function getRespTimeTopInstance($params)
    {
        $domain    = $port = [];
        $order_map = [
            'resp'       => 'ct.sum',
            'throughput' => '_count',
            'net_error'  => 'error.avg',
        ];


        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['order']          = isset($params['type']) && $order_map[$params['type']] ? $order_map[$params['type']] : 'ct.sum';
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst']), 'nest_sub_methods');

//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            $date   = $result['aggregations']['nest']['condition']['domain']['buckets'];

            if ($date) {
                foreach ($date as $k => $v) {

                    $tmp      = explode(':', $v['key']);
                    $domain[] = $tmp[0];
                    $port[]   = $tmp[1];
                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return array('domain' => $domain, 'port' => $port);
    }

    public function getIntanceTrendChart($params)
    {

        $data = [];

        $params['pst'] = 1101;

        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst']), 'nest_sub_methods');
//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']) {
                foreach ($result['aggregations']['date_range']['buckets'] as $bucket) {
                    if ($bucket['nest']['condition']['domain']['buckets']) {
                        if ($params['type'] == 'resp') {
                            $data['resp'][$bucket['key']] = round($bucket['nest']['condition']['domain']['buckets'][0]['ct']['avg'] / 1000, 2);
                        } elseif ($params['type'] == 'throughput') {
                            $data['count'][$bucket['key']] = $bucket['nest']['condition']['domain']['buckets'][0]['doc_count'];

                        } elseif ($params['type'] == 'net_error') {
                            $data['error'][$bucket['key']] = round($bucket['nest']['condition']['domain']['buckets'][0]['error']['avg'] * 100, 2);

                        }
                    }
                }
                $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;

    }

    public function getRpmTrendChart($params)
    {

        return __FUNCTION__;
    }

    public function getNetworkErrorTrendChart($params)
    {

        return __FUNCTION__;
    }

    public function getRpmAndRespTimeTrendChart($params)
    {
        $data             = [];
        $params['pst']    = 1101;
        $params['domain'] = (array)$params['domain'];
        $params['port']   = (array)$params['port'];

        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst', 'uri']), 'nest_sub_methods');
//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']) {
                $mins = TimeRangeEnum::getFactsInterval($params['start_time'], $params['end_time'], true);
                foreach ($result['aggregations']['date_range']['buckets'] as $bucket) {
                    $data['resp'][$bucket['key']] = round($bucket['nest']['condition']['ct']['avg'] / 1000, 2);
                    $data['rpm'][$bucket['key']]  = round($bucket['nest']['condition']['doc_count'] / $mins, 2);
                }

                $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }


    public function getCallerRate($params)
    {
        $returnData       = [];
        $params['pst']    = 1101;
        $params['domain'] = (array)$params['domain'];
        $params['port']   = (array)$params['port'];

        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst', 'uri']), 'nest_sub_methods');
//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            $return        = array();
            $callerBuckets = $result['aggregations']['uri']['buckets'];

            $sumCt    = $result['aggregations']['nest']['condition']['ct']['sum'] ? $result['aggregations']['nest']['condition']['ct']['sum'] : 0;
            $sumCount = $result['aggregations']['nest']['condition']['doc_count'] ? $result['aggregations']['nest']['condition']['doc_count'] : 0;

            $sumCtInList    = 0;
            $sumCountInList = 0;
            if ($callerBuckets) {
                foreach ($callerBuckets as $k => $v) {
                    if ($v['nest']['condition']['doc_count']) {
                        $return[$v['key']] = array(
                            $sumCt ? round($v['nest']['condition']['ct']['sum'] / $sumCt * 100, 2) : 0,
                            $v['nest']['condition']['reverse']['doc_count'], //调用次数
                            round($v['nest']['condition']['ct']['avg'] / 1000, 2), //平均耗时
                            round($v['nest']['condition']['ct']['sum'] / 1000, 2), //调用者耗时
                        );
                        $sumCtInList += $v['nest']['condition']['ct']['sum'];
                        $sumCountInList += $v['nest']['condition']['doc_count'];
                    }

                }
                $return['其他'] = array(
                    $sumCt ? round(($sumCt - $sumCtInList) / $sumCt * 100, 2) : 0,
                    $sumCount - $sumCountInList,
                    $sumCt - $sumCtInList ? round(($sumCt - $sumCtInList) / ($sumCount - $sumCountInList), 2) : 0,
                    $sumCt - $sumCtInList,
                );
            }

            $returnData = array(
                'labels' => array(
                    '慢元素',
                ),
                'data'   => $return,
            );

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }

    public function getCallerList($params)
    {
        $returnData       = [];
        $params['pst']    = 1101;
        $params['domain'] = (array)$params['domain'];
        $params['port']   = (array)$params['port'];

        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst', 'uri']), 'nest_sub_methods');
//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            $callerBuckets = $result['aggregations']['uri']['buckets'];

            $sumCt = $result['aggregations']['nest']['condition']['ct']['sum'] ? $result['aggregations']['nest']['condition']['ct']['sum'] : 0;

            $num = 0;
            if ($callerBuckets) {
                foreach ($callerBuckets as $k => $v) {
                    if ($v['nest']['condition']['doc_count']) {
                        $temp['uri']     = $v['key'];
                        $temp['ct']      = round($v['nest']['condition']['ct']['avg'] / 1000, 2);
                        $temp['percent'] = $sumCt ? round($v['nest']['condition']['ct']['sum'] / $sumCt * 100, 2) : 0;
                        $temp['count']   = $v['nest']['condition']['reverse']['doc_count'];
                        $temp['order']   = ++$num;
                        array_push($returnData, $temp);
                    }
                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }

    public function getErrorNetworkTypeTrendChart($params)
    {
        $return           = [];
        $params['pst']    = 1101;
        $params['domain'] = (array)$params['domain'];
        $params['port']   = (array)$params['port'];

        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst', 'uri']), 'nest_sub_methods');
//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                foreach ($result['aggregations']['date_range']['buckets'] as $bucket) {
                    $tmp = $bucket['nest']['condition']['error_type']['buckets'];
                    if ($tmp) {
                        foreach ($tmp as $item) {
                            $return[$item['key']][$bucket['key']] = $item['doc_count'];
                        }
                    }
                }

                //排序
                $sizeLimit = 5;
                $sumTop    = $tops = array();
                foreach ($return as $k => $v) {
                    $sumTop[$k] = array_sum($v);
                }
                arsort($sumTop);
                $sumTop = array_slice($sumTop, 0, $sizeLimit);
                $tops   = array_keys($sumTop);

                foreach ($return as $k => $v) {
                    if (!in_array($k, $tops)) {
                        unset($return[$k]);
                    }
                }

                $return = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $return);

            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $return;
    }

    public function getErrorList($params)
    {
        $data                = [];
        $params['pst']       = 1101;
        $params['domain']    = (array)$params['domain'];
        $params['port']      = (array)$params['port'];
        $params['exception'] = 1;
        $params['sort']      = isset($params['sort']) ? $params['sort'] : 'desc';

        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['domain', 'port', 'pst', 'exception', 'uri']), 'nest_sub_methods');
        $aQueryParams['patten']         = isset($params['name']) ? '.*' . $params['name'] . '.*' : '.*';
//        dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                foreach ($result['aggregations']['uri']['buckets'] as $bucket) {
                    $tmp = $bucket['nest']['condition']['error_type']['buckets'];
                    if ($tmp) {
                        foreach ($tmp as $item) {
                            $data[] = [
                                'uri'         => $bucket['key'],
                                'error_type'  => $item['key'],
                                'first_time'  => date('Y-m-d H:i:s', $item['time']['min'] / 1000),
                                'last_time'   => date('Y-m-d H:i:s', $item['time']['max'] / 1000),
                                'error_count' => $item['doc_count'],
                            ];
                        }
                    }
                }

                ArrayHelper::sortByUser($data, 'error_count', $params['sort']);
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

}