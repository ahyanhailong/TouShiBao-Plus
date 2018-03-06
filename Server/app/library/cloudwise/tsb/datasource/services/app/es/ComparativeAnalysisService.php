<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午8:32
 */

namespace cloudwise\tsb\datasource\services\app\es;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;
use App\library\Service\DataProcessorES;


class ComparativeAnalysisService extends ESService
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
        'search_uri' => [
            'type'  => 'regexp',
            'field' => 'reqUri_raw',
        ],
        'uri'        => [
            'type'  => 'term',
            'field' => 'reqUri_raw',
        ],
        'host_id'    => [
            'type'  => 'term',
            'field' => 'host_id',
        ],

    ];

    public function getUriList($params)
    {

        $data                    = [];

        try {
            $aQueryParams            = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
            $aQueryParams['pattern'] = '.*' . trim($params['name']) . '.*';
//                        dd($aQueryParams);
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']['uri']['buckets']) {
                foreach ($result['aggregations']['uri']['buckets'] as $uri) {
                    $real_key        = urlencode($uri['key']);
                    $data[$real_key] = e(urldecode($uri['key']));
                }
            }

        } catch (\Exception $e) {
            dd($e->getMessage(),$e->getLine());
            LogService::logException($e);
        }

        return $data;
    }

    public function getHostList($params)
    {

        return __FUNCTION__;
    }


    public function getRequestTrendLine($params)
    {

        $data                 = [];
        $params['search_uri'] = isset($params['search_uri']) ? trim(urldecode($params['search_uri']), '*') : '';
        $aQueryParams         = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'search_uri', 'host_id', 'uri']);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $data['count'][$bucket['key']] = $bucket['doc_count'];
                }

                $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            }

        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getRespTimeTrendLine($params)
    {

        $data                 = [];
        $params['search_uri'] = isset($params['search_uri']) ? trim(urldecode($params['search_uri']), '*') : '';
        $aQueryParams         = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'search_uri', 'host_id', 'uri']);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $data['time'][$bucket['key']] = round($bucket['resp_time']['avg'] / 1000, 2);
                }

                $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            }
        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

    public function getErrorTrendLine($params)
    {

        $data                 = [];
        $params['search_uri'] = isset($params['search_uri']) ? trim(urldecode($params['search_uri']), '*') : '';
        $aQueryParams         = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time', 'search_uri', 'host_id', 'uri']);
        //                dd($aQueryParams);
        try {
            $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//$this->ddTpl($aTplParams);
            $result = $this->client->search($aTplParams);

            if ($result['aggregations']) {
                foreach ($result['aggregations']['time']['buckets'] as $bucket) {
                    $data['error'][$bucket['key']] = $bucket['exception']['value'];
                }

                $data = DataProcessorES::instance()->processLineData($params['start_time'], $params['end_time'], $data);
            }
        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $data;
    }

}