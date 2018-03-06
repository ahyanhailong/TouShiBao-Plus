<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/6
 * Time: 下午5:34
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\datasource\services\app\es\DBService;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\helper\StringHelper;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\constants\FilterGroupParamsEnum;


/**
 * Class RelationDb
 *
 * @package cloudwise\tsb\business\app\web
 */
class RelationDb extends Business
{
    /**
     * @var RelationDb
     */
    private static $self = null;

    /**
     * @var DBService
     */
    public $sDbService;

    /**
     * @return RelationDb
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function initService()
    {
        $this->sDbService = self::$provider->getAppProvider()->getDBService();
    }

    /**
     * @param $params
     *
     * @return array
     */
    public function getTimeAnalysisAggsSqlList($params)
    {

        $data   = self::$provider->getAppProvider()->getDBService()->getTimeAnalysisAggsSqlList($params);
        $return = AjaxPageEnum::processPageResult($data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $return;
    }

    /**
     * @param $params
     *
     * @return array
     */
    public function getTimeAnalysisSingleElementDistributionLine($params)
    {
        $params['sql'] = StringHelper::makeClippingValue($params['sql']);
        $filter        = [
            'term' => [
                'ps_raw' => $params['sql'],
            ],
        ];

        $data = $this->getTimeAnalysisDistributionLine($params, $filter);

        return $data;
    }


    /**
     * 获取快照列表
     *
     * @param $params
     *
     * @return array
     */
    public function getTimeAnalysisSnapSqlList($params)
    {
        $this->initService();
        $aNodeIds = $this->sDbService->getNodeIdList($params);
        if ($aNodeIds) {
            $return                 = AjaxPageEnum::processPageResult($aNodeIds, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);
            $params['node_id_list'] = $return['list'];
        }
        $return['list'] = array_values($this->sDbService->getSqlSnapDetailInfo($params));

        return $return;
    }

    /**
     * 获取sql堆栈
     *
     * @param $params
     *
     * @return array
     */
    public function getTimeAnalysisDbStackTree($params)
    {
        $data = self::$provider->getAppProvider()->getDBService()->getTimeAnalysisDbStackTree($params);
        if ($data) {
            $aNodeInfo  = explode('#on#', $params['r_nid']);
            $iNodeId    = array_pop($aNodeInfo);
            $aTreeRoute = [];
            $aCodeData  = $data['code_data'];
            ArrayHelper::getTreeRoute($aTreeRoute, $aCodeData['tree'], $iNodeId);
            $aTreeKey = [];
            ArrayHelper::getKeyList($aTreeKey, $aTreeRoute);
            krsort($aTreeKey);
            foreach ($aTreeKey as $key) {
                $aCodeData['maps'][$key]['wt'] = round($aCodeData['maps'][$key]['wt'] / 1000, 2);
                $data['stack_tree'][]          = $aCodeData['maps'][$key];
            }
            $data['sql'] = $data['stack_tree'][0]['ps'][0];
        }

        return $data;
    }

    /**
     * 获取异常栈
     *
     * @param $params
     *
     * @return array|mixed
     */
    public function getExceptionAnalysisDbStackTree($params)
    {
        $data = self::$provider->getAppProvider()->getDBService()->getTimeAnalysisDbStackTree($params);
        if ($data) {
            $iServiceType = AppGeneralMethod::instance()->getCodeServiceType(
                $params['account_id'], $params['app_id']);
            $data         = [$data];
            $this->replaceDataForTableList($data, ['sql'], $params['account_id'], $iServiceType);
            $data = AppGeneralMethod::instance()->processStackList($data);

            $data = array_pop($data);
        }

        return $data;
    }

    /**
     * @param $params
     *
     * @return array
     */
    public function getExceptionAnalysisAggsSqlErrorList($params)
    {
        $result = self::$provider->getAppProvider()->getDBService()->getExceptionAnalysisAggsSqlErrorList($params);
        $return = AjaxPageEnum::processPageResult($result, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $return;
    }

    /**
     * @param $params
     *
     * @return array
     */
    public function getExceptionAnalysisSingleElementDbCaller($params)
    {
        $params['exception'] = 1;
        $data                = $this->getTimeAnalysisDbCaller($params);

        return $data;
    }

    /**
     * @param $params
     *
     * @return array
     */
    public function getExceptionAnalysisSingleElementSqlErrorSnapList($params)
    {
        $params['exception'] = 1;

        $data = $this->getTimeAnalysisSnapSqlList($params);

        return $data;
    }

    public function saveRelationDbFiltrationCondition($params)
    {

        return AppGeneralMethod::instance()->saveFilterGroup($params, FilterGroupParamsEnum::APP_RELATION_DB_FILTER_TYPE);

    }

    public function getRelationDbFiltrationCondition($params)
    {

        return AppGeneralMethod::instance()->getSavedFilterGroup($params, FilterGroupParamsEnum::APP_RELATION_DB_FILTER_TYPE);
    }

    public function deleteRelationDbFiltrationCondition($params)
    {

        return AppGeneralMethod::instance()->deleteSavedFilterGroup($params, FilterGroupParamsEnum::APP_RELATION_DB_FILTER_TYPE);
    }

    public function createExportFile($params)
    {
        if (!in_array($params['target'], array('timeAggsList', 'timeSnapList', 'exceptionAggsList', 'exceptionSnapList'))) {
            return false;
        }
        switch ($params['target']) {
            case 'timeAggsList':

                $data       = self::$provider->getAppProvider()->getDBService()->getTimeAnalysisAggsSqlList($params);
                $file_title = 'sql列表';
                $th_title   = [
                    '序号'       => 'order',
                    'SQL语句'    => 'sql',
                    '响应时间'     => 'wt',
                    '吞吐率'      => 'rpm',
                    '发生次数'     => 'count',
                    '第一次发生时间'  => 'min_real_time',
                    '最近一次发生时间' => 'max_real_time',
                ];
                $file_name  = PROJECT_PATH . '/Frontend/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';
                $file_path  = '/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';
                break;
            case 'timeSnapList':
                $this->initService();
                $aNodeIds = $this->sDbService->getNodeIdList($params);
                if ($aNodeIds) {
                    $params['node_id_list'] = $aNodeIds;
                }
                $data       = self::$provider->getAppProvider()->getDBService()->getSqlSnapDetailInfo($params);
                $file_title = 'sql快照列表';
                $th_title   = [
                    '序号'    => 'order',
                    'SQL语句' => 'sql',
                    '调用者'   => 'req_url',
                    '发生时间'  => 'happen_time',
                    '响应时间'  => 'wt',
                    '实例'    => 'instance',
                    '数据库类型' => 'db_type',
                    '数据表'   => 'table',
                    '操作类型'  => 'pst',
                ];
                $file_name  = PROJECT_PATH . '/Frontend/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';
                $file_path  = '/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';
                break;
            case 'exceptionAggsList':
                $params['exception'] = 1;
                $data                      = self::$provider->getAppProvider()->getDBService()->getExceptionAnalysisAggsSqlErrorList($params);
                $file_title                = 'sql列表';
                $th_title                  = [
                    '序号'       => 'order',
                    'SQL语句'    => 'sql',
                    '错误类型'     => 'error_type',
                    '发生次数'     => 'count',
                    '第一次发生时间'  => 'min_real_time',
                    '最后一次发生时间' => 'max_real_time',
                ];
                $file_name                 = PROJECT_PATH . '/Frontend/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';
                $file_path                 = '/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';

                break;
            case 'exceptionSnapList':
                $params['exception'] = 1;
                $this->initService();
                $aNodeIds = $this->sDbService->getNodeIdList($params);
                if ($aNodeIds) {
                    $params['node_id_list'] = $aNodeIds;
                }
                $data       = self::$provider->getAppProvider()->getDBService()->getSqlSnapDetailInfo($params);
                $file_title                = 'sql快照列表';
                $th_title                  = [
                    '序号'    => 'order',
                    'SQL语句' => 'sql',
                    '调用者'   => 'req_url',
                    '发生时间'  => 'happen_time',
                    '错误类型'  => 'error_type',
                    '实例'    => 'instance',
                    '数据库类型' => 'db_type',
                    '数据表'   => 'table',
                    '操作类型'  => 'pst',
                ];
                $file_name                 = PROJECT_PATH . '/Frontend/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';
                $file_path                 = '/public/static/report/' . $file_title . '_' . date('Y-m-d', time()) . '.xlsx';
                break;
        }

        return AppGeneralMethod::instance()->createExportFile($file_title, $th_title, $data, $file_name, $file_path);

    }

}