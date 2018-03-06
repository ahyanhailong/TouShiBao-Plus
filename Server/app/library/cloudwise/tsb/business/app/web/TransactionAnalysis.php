<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:40
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\helper\DESHelper;
use Yaf\Exception;
use cloudwise\tsb\business\app\web\Setting;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\datasource\constants\ReportAppTopologyEnum;

/**
 * Class TransactionAnalysis
 *
 * @package cloudwise\tsb\business\app\web
 */
class TransactionAnalysis extends Business
{
    /**
     * @var TransactionAnalysis
     */
    private static $self = null;

    /**
     * @var \cloudwise\tsb\datasource\services\app\es\TransactionAnalysisService
     */
    private $sTransaction;

    /**
     * @return TransactionAnalysis
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function __construct()
    {
        parent::__construct();
        $this->sTransaction = self::$provider->getAppProvider()->getTransactionAnalysisService();
    }

    /**
     * 设置百分位的时间阈值
     *
     * @param $params
     *
     * @return bool
     */
    public function setPercentTime($params)
    {
        $total = $this->sTransaction->getTotalCount($params);
        if (!$total) {
            return false;
        }

        if ($params['percent'] == AppEnum::APP_TIME_PERCENT_FIVE) {
            $params['from'] = ceil($total * 0.05);
        } else {
            if ($params['percent'] == AppEnum::APP_TIME_PERCENT_TEN) {
                $params['from'] = ceil($total * 0.1);
            } else {
                return false;
            }
        }
        $params['size'] = 1;
        $params['order'] = 'totalTime';
        $params['sort'] = 'desc';
        $doc = $this->sTransaction->getSpecifiedDoc($params);
        if ($doc) {
            return $doc[0]['_source']['totalTime'];
        }

        return false;
    }

    /**
     * 获取请求分布趋势图
     *
     * @param $params
     *
     * @return array
     */
    public function getOverviewRespAndRpmTrendChart($params)
    {
        if ($params['percent']) {
            $time = $this->setPercentTime($params);
            if ($time) {
                $params['percent_time'] = $time;
            }
        }

        $es_data = $this->sTransaction->getOverviewRespAndRpmTrendChart($params);

        return $es_data;
    }

    public function getOverviewRequestDistributionPie($params)
    {
        $es_data = $this->sTransaction->getOverviewRequestDistributionPie($params);

        return $es_data;
    }

    public function getOverviewTransactionList($params)
    {
        $es_data = $this->sTransaction->getOverviewTransactionList($params);
        $return = AjaxPageEnum::processPageResult($es_data, $params['page'], $params['page_size']);

        return $return;
    }

    public function getOverviewTransactionPopList($params)
    {
        $es_data = $this->sTransaction->getOverviewTransactionPopList($params);
        $return = AjaxPageEnum::processPageResult($es_data, $params['page'], $params['page_size']);

        return $return;
    }

    public function getDashboardStatisticalIndicators($params)
    {
        $es_data = $this->sTransaction->getDashboardStatisticalIndicators($params);

        return $es_data;
    }

    public function getDashboardRespAndRpmTrendChart($params)
    {
        $es_data = $this->sTransaction->getOverviewRespAndRpmTrendChart($params);

        return $es_data;
    }

    public function getDashboardRequestStatistics($params)
    {
        $es_data = $this->sTransaction->getOverviewRequestDistributionPie($params);

        return $es_data;
    }

    /**
     * 获取错误列表
     *
     * @param $params
     *
     * @return array
     */
    public function getDashboardErrorInfoList($params)
    {
        $es_data = $this->sTransaction->getDashboardErrorInfoList($params);

        return $es_data;
    }

    /**
     * 获取异常top5
     *
     * @param $params
     *
     * @return array
     */
    public function getDashboardExceptionTop5List($params)
    {
        $params['isException'] = 1;
        $params['nest_exception'] = 1;
        $params['appCodeType'] = AppGeneralMethod::instance()->getCodeServiceType(
            $params['account_id'], $params['app_id']);

        if ($params['appCodeType'] == ServiceTypeEnum::TYPE_CODE_AGENT_PHP) {
            $data = $this->sTransaction->getAppRequestUriChartLineExceptionCountPHP($params);
        } else {
            $data = $this->sTransaction->getAppRequestUriChartLineExceptionCountJava($params);
        }
        foreach ($data as $index => $item) {
            $item['order'] = $index + 1;
            $data[ $index ] = $item;
        }

        return $data;
    }

    /**
     * 慢请求时间分布
     *
     * @param $params
     *
     * @return array
     */
    public function getSlowAnalysisTimeDistributionLine($params)
    {
        //获取时间区间分布
        $range = $this->sTransaction->getTimeRange($params);
        if (!$range) {
            return [];
        }
        $params = array_merge($params, $range);

        //不同区间聚合数据
        $data = $this->sTransaction->getSlowAnalysisTimeDistributionLine($params);

        return $data;
    }

    /**
     * 获取快照列表
     *
     * @param $params
     *
     * @return array
     */
    public function getAnalysisSnapList($params)
    {
        $params['page_size'] = isset($params['page_size']) ? $params['page_size'] : AjaxPageEnum::PAGE_APP_NOSQL;
        //时间范围过滤
        if (isset($params['search_from'])) {
            $params['search_from'] *= 1000;

            //如果是含有慢过滤,则去掉慢过滤条件
            if (isset($params['slow'])) {
                if ($params['search_from'] < $params['slow']) {
                    $params['search_from'] = $params['slow'];
                }
                unset($params['slow']);
            }
        }

        if (isset($params['search_to'])) {
            $params['search_to'] *= 1000;
        }

        //获取排序完成的request_id列表
        $aRequestId = $this->sTransaction->getTopTenRequestId($params);
        $data = AjaxPageEnum::processPageResult($aRequestId, $params['page'], $params['page_size']);

        if (!$aRequestId) {
            return $data;
        }
        $params['request_ids'] = $data['list'];
        $setting = Setting::instance()->getAppSetting($params);
        $params['basic_setting'] = $setting[AppEnum::SETTING_BASIC];

        //将request_id转化为快照
        $data['list'] = $this->sTransaction->getAnalysisSnapList($params);

        return $data;
    }

    public function getSnapAnalysisSnapFilter($params)
    {
        $data = [];
        switch($params['filter_type']){
            case 'instance':
                if(isset($params['search'])){
                    $params['search_instance'] = $params['search'];
                }
                $params['field'] = 'host_instance_raw';
                $data = $this->sTransaction->getSnapAnalysisFilterErrorOrInstance($params);
                break;
            case 'error':
                if(isset($params['search'])){
                    $params['search_error'] = $params['search'];
                }
                $params['field'] = 'httpResponseCode';
                $params['error'] = 1;
                $data = $this->sTransaction->getSnapAnalysisFilterErrorOrInstance($params);
                break;
            case 'exception':
                $params['exception'] = 1;
                if(isset($params['search'])){
                    $params['search_exception'] = $params['search'];
                }
                $data = $this->sTransaction->getSnapAnalysisFilterException($params);
                break;
        }

        return $data;
    }

    public function getErrorAnalysisErrorExceptionCountChart($params)
    {

        $es_data = $this->sTransaction->getErrorAnalysisErrorExceptionCountChart($params);

        return $es_data;
    }

    public function getErrorAnalysisErrorRatePie($params)
    {

        $es_data = $this->sTransaction->getErrorAnalysisErrorRatePie($params);

        return $es_data;
    }

    public function getErrorAnalysisExceptionRatePie($params)
    {

        $es_data = $this->sTransaction->getErrorAnalysisExceptionRatePie($params);

        return $es_data;
    }

    /**
     * 单次追踪拓扑数据
     *
     * @param $params
     *
     * @return array
     */
    public function getSingleTopoData($params)
    {
        $setting = Setting::instance()->getAppSetting($params);
        $params['basic_setting'] = $setting[AppEnum::SETTING_BASIC];
        $aRequestFlow = $this->sTransaction->getRequestFlow($params);
        $aAppHealth = $this->getAppStatus($aRequestFlow, $params);
        $data = $this->getTopoData($aRequestFlow, $params);
        $main = $this->getMainAppParams($aRequestFlow);
        if (!$main) {
            $data['main'] = $aRequestFlow[0];
        } else {
            $data['main'] = $main;
        }
        foreach ($data['nodes'] as $type => $node) {
            if (array_key_exists($node['id'], $aAppHealth)) {
                $data['nodes'][ $type ]['group'] = $aAppHealth[ $node['id'] ];
            }
        }

        return $data;
    }

    /**
     * 获取主请求参数
     *
     * @param $aRequestFlow
     *
     * @return bool
     */
    public function getMainAppParams($aRequestFlow)
    {
        foreach ($aRequestFlow as $source) {
            if ((isset($source['host_id_from']) && !$source['host_id_from']) || (isset($source['service_type_from']) && $source['service_type_from'] == ServiceTypeEnum::TYPE_MOBILE_SDK)) {
                return $source;
            }
        }

        return false;
    }

    /**
     * 获取应用健康状态
     *
     * @param $app_info
     * @param $params
     *
     * @return array
     */
    public function getAppStatus($app_info, $params)
    {
        $return = [];
        foreach ($app_info as $app) {
            $setting = Setting::instance()->getAppSetting(['app_id' => $app['app_id'], 'account_id' => $params['account_id']]);
            $setting = $setting[AppEnum::SETTING_BASIC];
            if($app['app_id'] == $params['app_id']){
                if($app['doc_id'] != $params['doc_id']){
                    continue;
                }
            }
            if ($app['isError']) {
                $return[ $app['app_id'] ] = ReportAppTopologyEnum::GROUP_APP_ERROR;
            } else {
                if ($app['time'] > $setting['basic_setting']['very_slow'] * 1000) {
                    $return[ $app['app_id'] ] = ReportAppTopologyEnum::GROUP_APP_VERY_SLOW;
                } else {
                    if ($app['time'] >= $setting['basic_setting']['slow'] * 1000) {
                        $return[ $app['app_id'] ] = ReportAppTopologyEnum::GROUP_APP_SLOW;
                    } else {
                        $return[ $app['app_id'] ] = ReportAppTopologyEnum::GROUP_APP_NORMAL;
                    }
                }
            }
        }

        return $return;
    }

    /**
     * 获取topo结构
     *
     * @param $aRequestFlow
     * @param $params
     *
     * @return array
     */
    public function getTopoData($aRequestFlow, $params)
    {
        $data = $nodes = $edges = [];
        foreach ($aRequestFlow as $request) {
            $nodes_info = $this->formatRequestFlow($request, $params['account_id']);
            $node_detail = $this->getRequestNodes($nodes_info);
            $edge_detail = $this->getRequestEdges($nodes_info);
            $nodes = ArrayHelper::array_add($nodes, $node_detail);
            $edges = ArrayHelper::array_add($edge_detail, $edges);
            $data = ArrayHelper::array_add($data, $nodes_info);
        }

        $return = [
            'serviceInfo' => $data,
            'nodes'       => array_values($nodes),
            'edges'       => array_values($edges),
        ];

        return $return;
    }

    /**
     * 获取节点 数据
     *
     * @param $nodes_info
     *
     * @return array
     */
    public function getRequestNodes($nodes_info)
    {
        $nodes = [];
        foreach ($nodes_info as $index => $node) {
            $tmp = [];
            $tmp['id'] = (string)$node['id'];
            $tmp['label'] = $node['id'];
            if (in_array($node['resource_type'], ReportAppTopologyEnum::$appTopologyLayerService['code_layer'])) {
                $tmp['group'] = 'app_normal';
                $tmp['role'] = isset($node['role']) ? $node['role'] : '';
                $tmp['title'] = ReportAppTopologyEnum::$appTopologyNameMap[ $node['resource_type'] ]['name'];
                if (isset($node['app_port']) && $node['app_port']) {
                    $tmp['label'] = $node['app_name'] . ':' . $node['app_port'];
                } else {
                    $tmp['label'] = $node['app_name'];
                }
            } elseif ($node['resource_type'] == ReportAppTopologyEnum::TOPO_CURL) {
                $tmp['group'] = 'cloud';
                if (isset($node['uri'])) {
                    $tmp['label'] = 'Api:' . $node['host_ip'] . ':' . $node['host_port'] . $node['uri'];
                } else {
                    $tmp['label'] = 'Api:' . $node['host_ip'] . ':' . $node['host_port'];
                }
            } elseif (in_array(
                    $node['resource_type'], ReportAppTopologyEnum::$appTopologyLayerService['web_layer']) || in_array(
                    $node['resource_type'], ReportAppTopologyEnum::$appTopologyLayerService['proxy_layer'])
            ) {
                $tmp['group'] = ReportAppTopologyEnum::$rsServiceName[ $node['resource_type'] ];
                if (isset($node['host_name'])) {
                    $tmp['label'] = ReportAppTopologyEnum::$appTopologyNameMap[ $node['resource_type'] ]['name'] . ':' . $node['host_name'];
                } else {
                    $tmp['label'] = ReportAppTopologyEnum::$appTopologyNameMap[ $node['resource_type'] ]['name'];
                }
            } elseif (in_array($node['resource_type'], ReportAppTopologyEnum::$appTopologyLayerService['mq'])) {
                $tmp['label'] = $node['label'];
                $tmp['group'] = ReportAppTopologyEnum::$rsServiceName[ $node['resource_type'] ];
            } else {
                $tmp['group'] = ReportAppTopologyEnum::$rsServiceName[ $node['resource_type'] ];
            }
            $nodes[ $node['id'] ] = $tmp;
        }

        return $nodes;
    }

    /**
     * 获取节点连接数据
     *
     * @param $nodes
     *
     * @return array
     */
    public function getRequestEdges($nodes)
    {
        $edges = [];
        ksort($nodes);
        $first_nodes = array_shift($nodes);
        foreach ($nodes as $nodes_info) {
            $edge_id = $first_nodes['id'] . '_' . $nodes_info['id'];
            $edges[ $edge_id ] = [
                'id'     => $edge_id,
                'from'   => $first_nodes['id'],
                'to'     => $nodes_info['id'],
                'arrows' => 'to',
                'label' => '',
            ];
            if (isset($nodes_info['mqc']) && $nodes_info['mqc']) {
                $edges[ $edge_id ]['dashes'] = true;
            }
        }

        return $edges;
    }

    /**
     * 对追踪数据进行格式化
     *
     * @param $request_item
     * @param $account_id
     *
     * @return array
     */
    public function formatRequestFlow($request_item, $account_id)
    {
        $nodes = [];
        $mApp = self::$provider->getAppProvider()->getDimAppService();
        $mHost = self::$provider->getAppProvider()->getDimHostService();
        $request_nodes = explode(';', $request_item['req_flow_raw']);
        $i = 0;
        krsort($request_nodes);
        $role = '';

        foreach ($request_nodes as $index => $request) {
            if ($request == '') {
                continue;
            }
            $nodes_info = explode(':', $request);
            if (in_array($nodes_info[0], ReportAppTopologyEnum::$appTopologyLayerService['code_layer'])) {
                if (++$i == 2) {
                    break;
                }
            }
            $resource_type = $nodes_info[0];
            if ($nodes_info[0] == ReportAppTopologyEnum::TOPO_CURL) {
                $app_info['host_ip'] = $nodes_info[1];
                $app_info['host_port'] = (int)$nodes_info[2];
                $host_list = $mHost->fetchAll(['account_id' => $account_id, 'host_ip' => $app_info['host_ip']]);
                if ($host_list) {
                    $host = array_shift($host_list);
                    $app_info['host_id'] = $host->host_id;
                    $app_info['host_name'] = $host->host_name;
                }
                $app_id = DESHelper::instance()->md5ToDec(md5($app_info['host_ip'] . ':' . $app_info['host_port']));
                $app = $mApp->fetchRow(
                    [
                        'account_id'  => $account_id,
                        'app_id'      => $app_id,
                        'app_type in' => [
                            AppEnum::APP_TYPE_DOMAIN,
                            AppEnum::APP_TYPE_RUM_AND_DOMAIN,
                        ],
                    ]);
                if (strstr($nodes_info[2], '/')) {
                    $app_info['uri'] = str_replace($app_info['host_port'], '', $nodes_info[2]);
                }
                if ($app) {
                    $app_info['app_id'] = (string)$app->app_id;
                    $app_info['app_name'] = $app->app_name;
                    $app_info['app_port'] = $app->port;
                    if (isset($host)) {
                        $app_info['host_id'] = $host->host_id;
                    }
                    $app_info['app_code_type'] = AppGeneralMethod::instance()->AppTopoGetAppType(
                        [
                            'account_id' => $account_id,
                            'app_id'     => $app->app_id,
                        ]);
                    $id = (string)$app->app_id;
                    $resource_type = $app_info['app_code_type'];
                    $app_info['service_type'] = ReportAppTopologyEnum::$appTopologyNameMap[ $resource_type ]['call_data']['service_type'];
                    $app_info['id'] = $id;
                    $nodes[ $index ] = $app_info;
                } else {
                    $id = $nodes_info[0] . ':' . $nodes_info[1] . ':' . $nodes_info[2];
                    $app_info['id'] = $id;
                    $nodes[ $index ] = $app_info;
                }
            } elseif (in_array($nodes_info[0], ReportAppTopologyEnum::$appTopologyLayerService['db_layer'])) {
                $host_info['host_ip'] = $nodes_info[1];
                $host_info['host_port'] = $nodes_info[2];
                $host = $mHost->getHostByIp($account_id, $nodes_info[1]);
                if ($host) {
                    $host_info['host_id'] = $host->host_id;
                    $host_info['host_name'] = $host->host_name;
                }
                $id = ReportAppTopologyEnum::$appTopologyNameMap[ $nodes_info[0] ]['name'] . ':' . $nodes_info[1] . ':' . $nodes_info[2];
                $host_info['id'] = $id;
                $nodes[ $index ] = $host_info;
            } elseif (in_array($nodes_info[0], ReportAppTopologyEnum::$appTopologyLayerService['code_layer'])) {
                $app = $mApp->fetchRow(['app_id' => $request_item['app_id'], 'account_id' => $account_id]);
                $app_info['app_id'] = (string)$app->app_id;
                $app_info['app_name'] = $app->app_name;
                $app_info['app_port'] = $app->port;
                $app_info['role'] = $role;
                $app_info['app_code_type'] = $request_item['codeFlag'];
                $app_info['service_type'] = ReportAppTopologyEnum::$appTopologyNameMap[ $app_info['app_code_type'] ]['call_data']['service_type'];
                $id = (string)$app->app_id;
                $app_info['id'] = $id;
                $nodes[ $index ] = $app_info;
            } elseif (in_array($nodes_info[0], ReportAppTopologyEnum::$appTopologyLayerService['proxy_layer'])) {
                $host_info['host_id'] = $nodes_info[1];
                $host_info['host_port'] = 0;
                $host_list = $mHost->fetchAll(['account_id' => $account_id, 'host_id' => $nodes_info[1]]);
                if ($host_list) {
                    $host = array_shift($host_list);
                    $host_info['host_id'] = $host->host_id;
                    $host_info['host_name'] = $host->host_name;
                }
                $id = $nodes_info[0] . ':' . $nodes_info[1] . ':' . $nodes_info[2] . ':' . $nodes[3];
                $host_info['id'] = $id;
                $nodes[ $index ] = $host_info;
            } elseif (in_array($nodes_info[0], ReportAppTopologyEnum::$appTopologyLayerService['web_layer'])) {
                $host_info['host_id'] = $nodes_info[1];
                $host_info['host_port'] = $nodes_info[2];
                $host_list = $mHost->fetchAll(['account_id' => $account_id, 'host_id' => $nodes_info[1]]);
                if ($host_list) {
                    $host = array_shift($host_list);
                    $host_info['host_name'] = $host->host_name;
                }
                $id = $nodes_info[0] . ':' . $nodes_info[1] . ':' . $nodes_info[2] . ':' . $nodes_info[3];
                $host_info['id'] = $id;
                $nodes[ $index ] = $host_info;
            } elseif (in_array($nodes_info[0], ReportAppTopologyEnum::$appTopologyLayerService['mq'])) {
                $role = $nodes_info[0];
                $port = explode('/', $nodes_info[2]);
                $port = $port[0];
                $mq_info = [
                    'id'    => $nodes_info[1] . ':' . $port,
                    'label' => 'mq' . ':' . $nodes_info[1] . ':' . $port,
                ];
                if ($nodes_info[0] == ReportAppTopologyEnum::TOPO_MQC) {
                    $mq_info['mqc'] = true;
                }
                $nodes[ $index ] = $mq_info;
            } else {
                continue;
            }
            $nodes[ $index ]['resource_type'] = $resource_type;
            $nodes[ $index ]['data_type'] = ReportAppTopologyEnum::$appTopologyNameMap[ $resource_type ]['call_data']['data_type'];
            $nodes[ $index ]['request_time'] = substr(array_pop($nodes_info), 0, 10) * 1000;
        }


        return $nodes;
    }

    public function getSingleDetailData($params)
    {
        $setting = Setting::instance()->getAppSetting($params);
        $params['setting'] = $setting[AppEnum::SETTING_BASIC];
        $es_data = $this->sTransaction->getSingleDetailData($params);

        return $es_data;
    }

    public function getSingleCalledApiSnapTopo($params)
    {
        if (isset($params['role']) && $params['role'] == 'mqc') {
            $data = $this->sTransaction->getSingleCalledApiMqcSnapTopo($params);
        } else {
            $data = $this->sTransaction->getSingleCalledApiSnapTopo($params);
        }
        $data = AjaxPageEnum::processPageResult($data, $params['page'], $params['page_size']);

        return $data;
    }
}