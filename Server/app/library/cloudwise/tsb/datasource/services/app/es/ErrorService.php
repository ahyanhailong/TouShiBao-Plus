<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午8:36
 */

namespace cloudwise\tsb\datasource\services\app\es;

use App\library\Service\DataProcessorES;
use cloudwise\tsb\business\app\web\AppGeneralMethod;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use cloudwise\tsb\business\Business;


class ErrorService extends ESService
{
    public $fields = [
        'start_time'       => [
            'type'  => 'gte',
            'field' => 'collTime',
        ],
        'end_time'         => [
            'type'  => 'lte',
            'field' => 'collTime',
        ],
        'app_id'           => [
            'type'  => 'term',
            'field' => 'app_id',
        ],
        'account_id'       => [
            'type'  => 'term',
            'field' => 'account_id',
        ],
        'url'              => [
            'type'  => 'term',
            'field' => 'reqUrl_raw',
        ],
        'error'            => [
            'type'  => 'term',
            'field' => 'isError',
        ],
        'exception'        => [
            'type'  => 'term',
            'field' => 'isException',
        ],
        'method_exception' => [
            'type'  => 'term',
            'field' => 'exception',
        ],
        'error_code'       => [
            'type'  => 'term',
            'field' => 'httpResponseCode',
        ],
        'error_msg'        => [
            'type'  => 'term',
            'field' => 'errorMsg_raw',
        ],
        'file_raw'         => [
            'type'  => 'term',
            'field' => 'error.file_raw',
        ],
        'line'             => [
            'type'  => 'term',
            'field' => 'error.line',
        ],
        'msg_raw'          => [
            'type'  => 'term',
            'field' => 'error.msg_raw',
        ],
        'is_file_error'          => [
            'type'  => 'term',
            'field' => 'is_file_error',
        ],
        'exception_file_raw'         => [
            'type'  => 'term',
            'field' => 'file_raw',
        ],
        'exception_line'             => [
            'type'  => 'term',
            'field' => 'line',
        ],
        'exception_msg_raw'          => [
            'type'  => 'term',
            'field' => 'msg_raw',
        ],
        'excp_raw'          => [
            'type'  => 'term',
            'field' => 'excp_raw',
        ],
    ];

    public function getSingleElementInstanceErrorRatePie($params)
    {
        $data = [];

        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri', 'exception', 'error']);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                foreach ($result['aggregations']['intance']['buckets'] as $bucket) {

                    $data[$bucket['key']] = $bucket['doc_count'];
                }
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getSingleElementStatisticsErrorPie($params)
    {
        //开始时间未当日 0:0:0点,截止时间未 当日23:59:59
        $params['start_time'] = mktime(0, 0, 0, date('m'), date('d'), date('Y')) * 1000;
        $params['end_time']   = (mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1) * 1000;

        $data         = [];
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'uri', 'exception', 'error']);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                $all_count = $result['hits']['total'];

                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $data['count'][$bucket['key']] = $bucket['doc_count'];
                    $data['rate'][$bucket['key']]  = round($bucket['doc_count'] / $all_count * 100, 2);
                }

                $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getSingleElementErrorDetail($params)
    {
        $data      = array();
        $params['url'] = urldecode($params['url']);
        $code_type = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);

        if ($code_type == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $data = $this->getPhpErrorData($params);
        } else {
            $data = $this->getJavaErrorData($params);
        }

        return $data;
    }

    public function getJavaErrorData($params)
    {
        $data           = [];
        $params['page'] = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $per_page_num   = 4;

        $aQueryParams              = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'url', 'error_code']);
        $aQueryParams['page_size'] = $per_page_num;
        $aQueryParams['offset']    = $per_page_num * ($params['page'] - 1);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['hits']['hits']) {

                foreach ($result['hits']['hits'] as $hit) {

                    $data[] = [
                        'uri'            => $hit['_source']['reqUri_raw'],
                        'time'           => date('Y-m-d H:i', $hit['_source']['collTime'] / 1000),
                        'instance'       => $hit['_source']['host_instance_raw'],
                        'request_params' => $this->formaterEsRequestParams($hit['_source']['nest_parameters']),
                        'error_code'     => $params['error_code'],
                    ];
                }
                $data['length']    = count($data);
                $data['min_time']  = $params['min_time'];
                $data['max_time']  = $params['max_time'];
                $data['all_count'] = $result['hits']['total'];
                $data['url']       = $params['url'];
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }


    public function getPhpErrorData($params)
    {
        $data           = [];
        $params['page'] = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $per_page_num   = 4;

        $params['error_msg'] = urldecode($params['error_msg']);
        $error_info              = explode('||||', $params['error_msg']);

        $params['file_raw']      = $error_info[0];
        $params['line']          = $error_info[1];
        $params['msg_raw']       = $error_info[2];
        $params['is_file_error'] = 1;
//dd($params['msg_raw']);
        $aQueryParams              = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'url', 'is_file_error', 'file_raw', 'line', 'msg_raw']);
        $aQueryParams['page_size'] = $per_page_num;
        $aQueryParams['offset']    = $per_page_num * ($params['page'] - 1);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['hits']['hits']) {

                foreach ($result['hits']['hits'] as $hit) {

                    $data[] = [
                        'url'            => $params['url'],
                        'uri'            => $hit['_source']['reqUri_raw'],
                        'time'           => date('Y-m-d H:i', $hit['_source']['collTime'] / 1000),
                        'instance'       => $hit['_source']['host_instance_raw'],
                        'request_params' => $this->formaterEsRequestParams($hit['_source']['nest_parameters']),
                        'error_code'     => $hit['_source']['error']['file_raw'].'###'.$hit['_source']['error']['line'].'###'.$hit['_source']['error']['msg_raw'],
                    ];
                }

                $data['length']    = count($data);
                $data['min_time']  = $params['min_time'];
                $data['max_time']  = $params['max_time'];
                $data['all_count'] = $result['hits']['total'];
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }


    public function formaterEsRequestParams($params)
    {
        $data = array();
        if ($params) {
            foreach ($params as $param) {
                foreach ($param['values'] as $value) {
                    $data[] = [
                        'name'  => $param['name'],
                        'value' => $value,
                    ];
                }
            }
        }

        return $data;
    }


    public function getSingleElementException($params)
    {
        $data      = array();
        $params['url'] = urldecode($params['url']);
        $code_type = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);

        if ($code_type == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $data = $this->getPhpExceptionData($params);
        } elseif ($code_type == ServiceTypeEnum::TYPE_CODE_AGENT_PYTHON) {
            $data = $this->getPythonExceptionData($params);
        } else {
            $data = $this->getJavaExceptionData($params);
        }

        return $data;
    }

    public function getJavaExceptionData($params)
    {
        $data           = [];
        $params['page'] = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $per_page_num   = 4;

        $params['nest_path']            = 'nest_sub_methods';
        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'url'], ['method_exception', 'error_msg']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['method_exception', 'error_msg']), 'nest_sub_methods');

        $aQueryParams['page_size'] = $per_page_num;
        $aQueryParams['offset']    = $per_page_num * ($params['page'] - 1);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['hits']['hits']) {

                foreach ($result['hits']['hits'] as $hit) {
                    foreach ($hit['_source']['nest_sub_methods'] as $item) {
                        if ($params['error_msg'] == $item['errorMsg_raw']) {
                            $data[] = [
                                'uri'            => $hit['_source']['reqUri_raw'],
                                'time'           => date('Y-m-d H:i', $hit['_source']['collTime'] / 1000),
                                'instance'       => $hit['_source']['host_instance_raw'],
                                'request_params' => $this->formaterEsRequestParams($hit['_source']['nest_parameters']),
                                'errorMsg_raw'   => $item['errorMsg_raw'],
                                'exstack_raw'    => $item['exstack_raw'],
                            ];
                        }
                    }
                }

                $data = AppGeneralMethod::instance()->processStackList($data);

                $data['length']    = count($data);
                $data['all_count'] = $result['aggregations']['nest']['exceptionNum']['doc_count'];
                $data['min_time']  = $params['min_time'];
                $data['max_time']  = $params['max_time'];
                $data['url']       = $params['url'];
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getPhpExceptionData($params)
    {

        $data           = [];
        $params['page'] = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $per_page_num   = 4;

        $params['error_msg'] = urldecode($params['error_msg']);
        $error_info              = explode('||||', $params['error_msg']);

        $params['exception_file_raw']      = $error_info[0];
        $params['exception_line']          = $error_info[1];
        $params['exception_msg_raw']       = $error_info[2];

        $params['nest_path']            = 'nest_exceptions';
        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'url'], ['exception_file_raw', 'exception_line','exception_msg_raw']);

        $aQueryParams['page_size'] = $per_page_num;
        $aQueryParams['offset']    = $per_page_num * ($params['page'] - 1);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['hits']['hits']) {

                foreach ($result['hits']['hits'] as $hit) {
                    foreach ($hit['_source']['nest_exceptions'] as $item) {
                        if ($params['exception_file_raw'] == $item['file_raw']) {
                            $data[] = [
                                'uri'            => $hit['_source']['reqUri_raw'],
                                'time'           => date('Y-m-d H:i', $hit['_source']['collTime'] / 1000),
                                'instance'       => $hit['_source']['host_instance_raw'],
                                'request_params' => $this->formaterEsRequestParams($hit['_source']['nest_parameters']),
                                'errorMsg_raw'   => $item['file_raw'].'###'.$item['line'].'###'.$item['msg_raw'],
                                'exstack_raw'    => '',
                            ];
                        }
                    }
                }

                $data = AppGeneralMethod::instance()->processStackList($data);

                $data['length']    = count($data);
                $data['all_count'] = $result['aggregations']['nest']['exceptionNum']['doc_count'];
                $data['min_time']  = $params['min_time'];
                $data['max_time']  = $params['max_time'];
                $data['url']       = $params['url'];
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }


    public function getPythonExceptionData($params)
    {
        $data           = [];
        $params['page'] = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $per_page_num   = 4;

        $params['exception'] = 1;
        $params['nest_path']            = 'nest_exceptions';
        $aQueryParams                   = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'url' ,'exception'], ['excp_raw']);
        $aQueryParams['filter']['nest'] = $this->setFilterQuery($params, $this->getFields(['excp_raw']), 'nest_exceptions');

        $aQueryParams['page_size'] = $per_page_num;
        $aQueryParams['offset']    = $per_page_num * ($params['page'] - 1);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//            $this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['hits']['hits']) {

                foreach ($result['hits']['hits'] as $hit) {
                    foreach ($hit['_source']['nest_exceptions'] as $item) {
                        if ($params['excp_raw'] == $item['excp_raw']) {
                            $data[] = [
                                'uri'            => $hit['_source']['reqUri_raw'],
                                'time'           => date('Y-m-d H:i', $hit['_source']['collTime'] / 1000),
                                'instance'       => $hit['_source']['host_instance_raw'],
                                'request_params' => $this->formaterEsRequestParams($hit['_source']['nest_parameters']),
                                'errorMsg_raw'   => $item['excp_raw'],
                                'exstack_raw'    => $item['excTraceback_raw'],
                            ];
                        }
                    }
                }

                $data = AppGeneralMethod::instance()->processStackList($data);

                $data['length']    = count($data);
                $data['all_count'] = $result['aggregations']['nest']['exceptionNum']['doc_count'];
                $data['min_time']  = $params['min_time'];
                $data['max_time']  = $params['max_time'];
                $data['url']       = $params['url'];
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getErrorFilterList($params){


        return __FUNCTION__;
    }

}