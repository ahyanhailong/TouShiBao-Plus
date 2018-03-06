<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:51
 */

namespace cloudwise\tsb\datasource\services\app\es;

use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ReportAppTopologyEnum;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use App\library\Service\DataProcessorES;
use cloudwise\tsb\datasource\helper\ArrayHelper;


class KeyTransactionService extends ESService
{

    const BUSINESS_TYPE_SINGLE = 1;   //单一事务
    const BUSINESS_TYPE_COMBINE = 2;  //归类事务

    public $fields = [
        'start_time'         => [
            'type'  => 'gte',
            'field' => 'collTime',
        ],
        'end_time'           => [
            'type'  => 'lte',
            'field' => 'collTime',
        ],
        'app_id'             => [
            'type'  => 'term',
            'field' => 'app_id',
        ],
        'account_id'         => [
            'type'  => 'term',
            'field' => 'account_id',
        ],
        'uri'                => [
            'type'  => 'term',
            'field' => 'reqUri_raw',
        ],
        'slow'               => [
            'type'  => 'gt',
            'field' => 'totalTime',
        ],
        'request_ids'        => [
            'type'  => 'in',
            'field' => 'request_id',
        ],
        'search_url'         => [
            'type'  => 'regexp',
            'field' => 'reqUrl_raw',
        ],
        'search_exception'   => [
            'type'  => 'terms',
            'field' => 'errorMsg_raw',
        ],
        'search_instance'    => [
            'type'  => 'terms',
            'field' => 'host_instance_raw',
        ],
        'search_from'        => [
            'type'  => 'gt',
            'field' => 'totalTime',
        ],
        'search_to'          => [
            'type'  => 'lte',
            'field' => 'totalTime',
        ],
        'error'              => [
            'type'  => 'term',
            'field' => 'isError',
        ],
        'file_error'         => [
            'type'  => 'term',
            'field' => 'is_file_error',
        ],
        'exception'          => [
            'type'  => 'term',
            'field' => 'isException',
        ],
        'error_or_exception' => [
            'type'  => 'or',
            'field' => 'filters',
        ],
        'r_id'               => [
            'type'  => 'term',
            'field' => 'r_id',
        ],
        'request_id'         => [
            'type'  => 'term',
            'field' => 'request_id',
        ],
        'doc_id'             => [
            'type'  => 'ids',
            'field' => 'values',
        ],
        'isException'        => [
            'type'  => 'term',
            'field' => 'isException',
        ],
        'nest_exception'     => [
            'type'  => 'term',
            'field' => 'exception',
        ],
        'exception_list'     => [
            'type'  => 'term',
            'field' => 'msg_raw',
        ],
        'search_uri'         => [
            'type'  => 'regexp',
            'field' => 'reqUri_raw',
        ],
        'reqUri_raw'         => [
            'type'  => 'term',
            'field' => 'reqUri_raw',
        ],
        'httpResponseCode'   => [
            'type'  => 'gte',
            'field' => 'httpResponseCode',
        ],
    ];


    public function getQueryFilterParams()
    {
        return ['app_id', 'account_id', 'start_time', 'end_time', 'uri', 'reqUri_raw', 'search_uri'];
    }

    public function getKeyTransactionList($params)
    {

        $data = [];
        if ($params['business_list']) {
            foreach ($params['business_list'] as $item) {
                $params['name']        = $item['name'];
                $params['business_id'] = $item['business_id'];
                if(strstr($item['uri'], '*')){
                    $params['search_uri'] = str_replace('*', '.*', $item['uri']);
                }else{
                    $params['uri'] = $item['uri'];
                }
                $tmp = $this->getSingleKeyTransaction($params);
                $tmp['uri'] = $item['uri'];
                $data[]                = $tmp;

            }
        }

        ArrayHelper::sortByUser($data, $params['order'], $params['sort']);

        return $data;
    }

    public function getSingleKeyTransaction($params)
    {

        $data                                 = array();
        $aQueryFields                         = $this->getQueryFilterParams();
        $aQueryParams                         = $this->getNewQueryParams($params, $aQueryFields);
        $aQueryParams['setting']['slow']      = $params['slow'];
        $aQueryParams['setting']['very_slow'] = $params['very_slow'];

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']) {
                $mins = ($params['end_time'] - $params['start_time']) / 60000;
                $data = [
                    'resp_time'       => round($result['aggregations']['resp_time']['value'] / 1000, 2),
                    'error_count'     => $result['aggregations']['error_info']['value'],
                    'exception_count' => $result['aggregations']['exc_info']['value'],
                    'rpm'             => round($result['hits']['total'] / $mins, 2),
                    'count'           => $result['hits']['total'],
                    'error_rate'      => round($result['aggregations']['error_info']['value'] / $result['hits']['total'] * 100, 2),
                    'normal_rate'     => round($result['aggregations']['normal']['doc_count'] / $result['hits']['total'] * 100, 2),
                    'slow_rate'       => round($result['aggregations']['slow']['doc_count'] / $result['hits']['total'] * 100, 2),
                    'very_slow_rate'  => round($result['aggregations']['very_slow']['doc_count'] / $result['hits']['total'] * 100, 2),
                    'apdex_value'     => 0,
                    'name'            => $params['name'] . '(' . $params['reqUri_raw'] . ')',
                    'business_id'     => $params['business_id'],
                ];

                if ($result['hits']['total'] == 0) {
                    $data['health']       = ReportAppTopologyEnum::GROUP_APP_NODATA;
                    $data['apdex_status'] = 1;//良好
                    $data['desc']         = 'no_data';
                    $data['img']          = AppEnum::$app_health_img[AppEnum::SETTING_TOPO_NORMAL];//良好
                    return $data;
                }
                if ($data['error_rate'] >= $params['topo_setting']['error']) {
                    $data['health']       = ReportAppTopologyEnum::GROUP_APP_ERROR;
                    $data['apdex_status'] = 5;//非常差
                    $data['desc']         = 'error';//非常差
                    $data['img']          = AppEnum::$app_health_img[AppEnum::SETTING_TOPO_ERROR];//非常差
                } else {
                    if ($data['very_slow_rate'] >= $params['topo_setting']['very_slow']) {
                        $data['health']       = ReportAppTopologyEnum::GROUP_APP_VERY_SLOW;
                        $data['apdex_status'] = 4;//很差
                        $data['desc']         = 'very_slow';
                        $data['img']          = AppEnum::$app_health_img[AppEnum::SETTING_TOPO_VERY_SLOW];//很差
                    } else {
                        if ($data['slow_rate'] >= $params['topo_setting']['slow']) {
                            $data['health']       = ReportAppTopologyEnum::GROUP_APP_SLOW;
                            $data['apdex_status'] = 3;//一般
                            $data['desc']         = 'slow';
                            $data['img']          = AppEnum::$app_health_img[AppEnum::SETTING_TOPO_SLOW];//一般
                        } else {
                            $data['health']       = ReportAppTopologyEnum::GROUP_APP_NORMAL;
                            $data['apdex_status'] = 2;//良好
                            $data['desc']         = 'normal';
                            $data['img']          = AppEnum::$app_health_img[AppEnum::SETTING_TOPO_NORMAL];//良好
                        }
                    }
                }
            }


        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getCombineKeyTransaction()
    {
        return __FUNCTION__;
    }

    public function getProfilingRespTimeAndCountDataMixed($params)
    {

        return __FUNCTION__;
    }

    public function getProfilingErrorAndExceptionTrendChart($params)
    {
        $data         = array();
        $aQueryFields = $this->getQueryFilterParams();
        $aQueryParams = $this->getNewQueryParams($params, $aQueryFields);

        try {
            $aQueryParams['script'] = "doc['isError'].value==1 ? 1 : 0";
            $aTplParams             = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $errResult = $this->client->search($aTplParams);

            $aQueryParams['script'] = "doc['isError'].value==1 ? 1 : 0";
            $aTplParams             = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $excResult = $this->client->search($aTplParams);

            if ($errResult['aggregations']['time']['buckets']) {
                foreach ($errResult['aggregations']['time']['buckets'] as $bucket) {
                    $data['errorRate'][$bucket['key']] = round($bucket['error_rate']['value'] / 1000, 2);
                }
            }

            if ($excResult['aggregations']['time']['buckets']) {
                foreach ($excResult['aggregations']['time']['buckets'] as $bucket) {
                    $data['excRate'][$bucket['key']] = round($bucket['error_rate']['value'] / 1000, 2);
                }
            }

            $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getProfilingApdexAnalysisTrendChart($params)
    {
        $data                 = array();
        $aQueryFields         = $this->getQueryFilterParams();
        $aQueryParams         = $this->getNewQueryParams($params, $aQueryFields);
        $aQueryParams['aggs'] = [
            'oneT'  => array(
                'to' => $params['apdex'] * 1000,
            ),
            'fourT' => array(
                'from' => $params['apdex'] * 1000,
                'to'   => $params['apdex'] * 4000,
            ),
            "overT" => array(
                "from" => $params['apdex'] * 4000,
            ),
        ];

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']['time']['buckets']) {
                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $sum = $bucket['over_t']['doc_count'] + $bucket['one_t']['doc_count'] + $bucket['four_t']['doc_count'];
                    if ($sum > 0) {
                        $data['apdex'][$bucket['key']] = round(($bucket['one_t']['doc_count'] + $bucket['four_t']['doc_count'] / 2) / $sum, 2);
                    }
                }
            }

            $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getErrorAnalysisErrorAndExceptionTrendChart($params)
    {

        return __FUNCTION__;
    }

    public function getErrorAnalysisErrorRatePie($params)
    {

        return __FUNCTION__;
    }

    public function getErrorAnalysisExceptionRatePie($params)
    {

        return __FUNCTION__;
    }

    public function getErrorAnalysisErrorList($params)
    {
        if ($params['service_type'] == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $data = $this->getPhpTopicErrorData($params);

        } else {
            $data = $this->getJavaTopicErrorData($params);
        }

        return $data;
    }

    public function getErrorAnalysisExceptionList($params)
    {
        if ($params['service_type'] == ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON) {
            $data = $this->getPythonTopicExceptionData($params);
        } elseif ($params['service_type'] == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $data = $this->getPhpTopicExceptionData($params);

        } else {
            $data = $this->getJavaTopicExceptionData($params);
        }

        return $data;
    }

    public function getJavaTopicErrorData($params)
    {
        $returnData   = array();
        $aQueryFields = $this->getQueryFilterParams();
        array_push($aQueryFields, 'httpResponseCode');
        $aQueryParams = $this->getNewQueryParams($params, $aQueryFields);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['error_code']['buckets']) {
                if (isset($value['uri']) && strstr($value['uri'], '*')) {
                    $link = 0;
                } else {
                    $link = 1;
                }
                foreach ($result['aggregations']['error_code']['buckets'] as $code) {
                    $tmp         = array();
                    $tmp['link'] = $link;
                    $urlCodes    = explode('||||', $code['key']);
                    if ($urlCodes[1] < 400) {
                        continue;
                    }
                    $tmp['event']        = $urlCodes[0];
                    $tmp['decode_event'] = e(urldecode($urlCodes[2]));
                    $tmp['uri']          = $urlCodes[2];
                    $tmp['message']      = $urlCodes[1];
                    $tmp['mes']          = urlencode($urlCodes[1]);
                    $tmp['mixed']        = md5($urlCodes[2] . $urlCodes[1]);
                    $tmp['start_time']   = date('Y-m-d H:i', $code['time']['min'] / 1000);
                    $tmp['end_time']     = date('Y-m-d H:i', $code['time']['max'] / 1000);
                    $tmp['count']        = $code['doc_count'];
                    array_push($returnData, $tmp);
                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }


    public function getPhpTopicErrorData($params)
    {
        $returnData   = array();
        $params['file_error'] = 1;
        $aQueryFields = $this->getQueryFilterParams();
        $aQueryFields = array_merge($aQueryFields, ['file_error']);
        $aQueryParams = $this->getNewQueryParams($params, $aQueryFields);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
//            dd($result);
            if ($result['aggregations']['url']['buckets']) {
                if (isset($value['uri']) && strstr($value['uri'], '*')) {
                    $link = 0;
                } else {
                    $link = 1;
                }

                foreach ($result['aggregations']['url']['buckets'] as $url) {
                    $tmp      = array();
                    $urlCodes = explode('||||', $url['key']);
                    if (count($urlCodes) == 1) {
                        $tmp['event']        = $value['uri'];
                        $tmp['decode_event'] = e(urldecode($value['uri']));
                        $tmp['uri']          = $value['uri'];
                    } else {
                        $tmp['event']        = urlencode($urlCodes[1]);
                        $tmp['decode_event'] = preg_replace('/combine{1}$/', '',
                            e(urldecode($urlCodes[1])));
                        $tmp['uri']          = $urlCodes[1];
                    }
                    $tmp['link'] = $link;
                    if ($url['error']['buckets']) {
                        foreach ($url['error']['buckets'] as $error) {
                            $error_params = explode('||||', $error['key']);
                            if ($error_params[3] >= 400) {
                                $tmp['message'] = $error_params[3];
                                $tmp['mes']     = $error_params[3];
                            } else {
                                array_pop($error_params);
//                                    $tmp['message'] = implode('||||',$error_params);
                                $tmp['message'] = array(
                                    'file_raw' => $error_params[0],
                                    'line'     => $error_params[1],
                                    'msg_raw'  => $error_params[2],
                                );
                                $tmp['mes']     = urlencode(implode('||||', $tmp['message']));
//                                $tmp['mes']     = implode('||||', $tmp['message']);
                            }

                            $tmp['start_time'] = date('Y-m-d H:i', $error['time']['min'] / 1000);
                            $tmp['end_time']   = date('Y-m-d H:i', $error['time']['max'] / 1000);
                            $tmp['count']      = $error['doc_count'];
                            $tmp['mixed']      = md5($tmp['uri'] . $error['key']);
                            array_push($returnData, $tmp);
                        }
                    }
                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }

    public function getPhpTopicExceptionData($params)
    {
        $returnData   = array();
        $aQueryFields = $this->getQueryFilterParams();
        array_push($aQueryFields, 'exception');
        $aQueryParams = $this->getNewQueryParams($params, $aQueryFields);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['url']['buckets']) {
                if (isset($value['uri']) && strstr($value['uri'], '*')) {
                    $link = 0;
                } else {
                    $link = 1;
                }
                foreach ($result['aggregations']['url']['buckets'] as $url) {
                    $tmp         = array();
                    $tmp['link'] = $link;
                    $url_p       = explode('||||', $url['key']);

                    if ($url['nest']['excep']['buckets']) {
                        foreach ($url['nest']['excep']['buckets'] as $ex) {
                            $excep_tmp           = explode('||||', $ex['key']);
                            $tmp['url']          = urlencode($url_p[0]);
                            $tmp['uri']          = e(urldecode($url_p[1]));
                            $tmp['event']        = urlencode($url_p[0]);
                            $tmp['decode_event'] = e(urldecode($url_p[1]));
                            $tmp['mes']          = urlencode($ex['key']);
//							$tmp['message'] = $excep_tmp[0] . Lang::get('app.ERROR.in_the_file') . $excep_tmp[1] . Lang::get('app.ERROR.exception_line') . $excep_tmp[2];
                            $tmp['message']    = array(
                                'file_raw' => $excep_tmp[0],
                                'line'     => $excep_tmp[1],
                                'msg_raw'  => $excep_tmp[2],
                            );
                            $tmp['start_time'] = date('Y-m-d H:i:s', $ex['rever']['resp']['min'] / 1000);
                            $tmp['end_time']   = date('Y-m-d H:i:s', $ex['rever']['resp']['max'] / 1000);
                            $tmp['count']      = $ex['doc_count'];
                            $tmp['mixed']      = md5($url_p[1] . $ex['key']);
                            array_push($returnData, $tmp);
                        }
                    }


                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }

    public function getPythonTopicExceptionData($params)
    {
        $returnData   = array();
        $aQueryFields = $this->getQueryFilterParams();
        array_push($aQueryFields, 'exception');
        $aQueryParams = $this->getNewQueryParams($params, $aQueryFields);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['url']['buckets']) {
                $index = 1;
                if (isset($value['uri']) && strstr($value['uri'], '*')) {
                    $link = 0;
                } else {
                    $link = 1;
                }
                foreach ($result['aggregations']['url']['buckets'] as $url) {
                    $tmp         = array();
                    $tmp['link'] = $link;
                    $urlCodes    = explode('||||', $url['key']);
                    if (count($urlCodes) < 2) {
                        continue;
                    }
                    $tmp['event']        = urlencode($urlCodes[0]);
                    $tmp['decode_event'] = e(urldecode($urlCodes[1]));
                    $tmp['uri']          = e(urldecode($urlCodes[1]));
                    $tmp['index']        = $index++;
                    if (count($url['nest']['exc_msg']['buckets'])) {
                        foreach ($url['nest']['exc_msg']['buckets'] as $message) {
                            $tmp['message']    = $message['key'];
                            $tmp['mes']        = urlencode($message['key']);
                            $tmp['mixed']      = md5($urlCodes[0] . $message['key']);
                            $tmp['count']      = $message['doc_count'];
                            $tmp['start_time'] = date('Y-m-d H:i', $url['time']['min'] / 1000);
                            $tmp['end_time']   = date('Y-m-d H:i', $url['time']['max'] / 1000);
                            array_push($returnData, $tmp);
                        }
                    }

                }
            }


        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }

    public function getJavaTopicExceptionData($params)
    {
        $returnData   = array();
        $aQueryFields = $this->getQueryFilterParams();
        $aQueryParams = $this->getNewQueryParams($params, $aQueryFields);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
            $aTplParams = $this->recurrenceReplaceKey($aTplParams, new \stdClass(), 'reverse_nested');

//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['url']['buckets']) {
                $index = 1;
                if (isset($value['uri']) && strstr($value['uri'], '*')) {
                    $link = 0;
                } else {
                    $link = 1;
                }
                foreach ($result['aggregations']['url']['buckets'] as $url) {
                    $tmp         = array();
                    $tmp['link'] = $link;
                    $urlCodes    = explode('||||', $url['key']);
                    if (count($urlCodes) < 2) {
                        continue;
                    }
                    $tmp['event']        = urlencode($urlCodes[0]);
                    $tmp['decode_event'] = e(urldecode($urlCodes[1]));
                    $tmp['uri']          = e(urldecode($urlCodes[1]));
                    $tmp['index']        = $index++;
                    if (count($url['nest']['filter']['errorMsg']['buckets'])) {
                        foreach ($url['nest']['filter']['errorMsg']['buckets'] as $message) {
                            $tmp['message']    = $message['key'];
                            $tmp['mes']        = urlencode($message['key']);
                            $tmp['mixed']      = md5($urlCodes[0] . $message['key']);
                            $tmp['count']      = $message['doc_count'];
                            $tmp['start_time'] = date('Y-m-d H:i', $message['reverse']['time']['min'] / 1000);
                            $tmp['end_time']   = date('Y-m-d H:i', $message['reverse']['time']['max'] / 1000);
                            array_push($returnData, $tmp);
                        }
                    }

                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }


    public function getSqlAnalysisTimeAndRpmTrendChart($params)
    {

        return __FUNCTION__;
    }

    public function getSqlAnalysisTimeDistributionLine($params)
    {

        return __FUNCTION__;
    }

    public function getSqlAnalysisSqlAggsList($params)
    {

        return __FUNCTION__;
    }

    public function getSnapAnalysisTimeDistributionLine($params)
    {

        return __FUNCTION__;
    }

    public function getSnapAnalysisSqlSnapList($params)
    {

        return __FUNCTION__;
    }

    public function createKeyTransaction($params)
    {

        return __FUNCTION__;
    }

    public function getSettingUriList($params)
    {
        $returnData   = array();
        $params['end_time'] = time() * 1000;
        $params['start_time'] = (time() - 3600 * 24 * 7)*1000;
        $aQueryFields = $this->getQueryFilterParams();
        $aQueryParams = $this->getNewQueryParams($params, $aQueryFields);

        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);

            $result = $this->client->search($aTplParams);
            if ($result['aggregations']['uri']['buckets']) {
                foreach ($result['aggregations']['uri']['buckets'] as $uri) {
                    $real_key              = urlencode($uri['key']);
                    $returnData[$real_key] = e(urldecode($uri['key']));
                }
            }
        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $returnData;
    }


}