<?php
use cloudwise\tsb\business\app\web\RelationDb;
use cloudwise\tsb\datasource\services\app\es\DBService;
use cloudwise\tsb\datasource\helper\StringHelper;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/24
 * Time: 下午5:35
 */
class RelationDbController extends BaseController
{

    /**
     * @var DBService
     */
    public $db;

    public function init()
    {
        parent::init();
        $this->params['db_type'] = ServiceTypeEnum::$relational_type_db;

        if (isset($this->params['sql'])) {
            $this->params['sql'] = StringHelper::makeClippingValue($this->params['sql']);
        }

        if (isset($this->params['r_nid'])) {
            $this->params['r_nid'] = str_replace('$on$', '#on#', $this->params['r_nid']);
        }

        $this->db = $this->provider->getAppProvider()->getDBService();
    }

    public function getTimeAnalysisDbTrendLineAction()
    {
        $data = $this->db->getTimeAnalysisDbTrendLine($this->params);
        $this->rest->success($data);
    }

    public function getTimeAnalysisDistributionLineAction()
    {
        $data = $this->db->getTimeAnalysisDistributionLine($this->params);
        $this->rest->success($data);
    }

    public function getTimeAnalysisAggsSqlListAction()
    {
        $data = RelationDb::instance()->getTimeAnalysisAggsSqlList($this->params);
        $this->rest->success($data);
    }

    public function getTimeAnalysisSingleElementDbTrendLineAction()
    {
        $data = $this->db->getTimeAnalysisDbTrendLine($this->params);
        $this->rest->success($data);
    }

    public function getTimeAnalysisSingleElementDistributionLineAction()
    {
        $data = $this->db->getTimeAnalysisDistributionLine($this->params);
        $this->rest->success($data);
    }

    public function getTimeAnalysisDbCallerAction()
    {
        $data = $this->db->getTimeAnalysisDbCaller($this->params);
        $this->rest->success($data);
    }

    public function getTimeAnalysisSnapSqlListAction()
    {
        $data = RelationDb::instance()->getTimeAnalysisSnapSqlList($this->params);
        $this->rest->success($data);
    }

    public function getTimeAnalysisDbStackTreeAction()
    {
        $data = RelationDb::instance()->getTimeAnalysisDbStackTree($this->params);
        $this->rest->success($data);
    }

    public function getExceptionAnalysisDbErrorTrendLineAction()
    {
        $data = $this->db->getExceptionAnalysisDbErrorTrendLine($this->params);
        $this->rest->success($data);
    }

    public function getExceptionAnalysisAggsSqlErrorListAction()
    {
        $this->params['exception'] = 1;
        $data                      = RelationDb::instance()->getExceptionAnalysisAggsSqlErrorList($this->params);
        $this->rest->success($data);
    }

    public function getExceptionAnalysisSingleElementErrorTrendLineAction()
    {
        $data = $this->db->getExceptionAnalysisDbErrorTrendLine($this->params);
        $this->rest->success($data);
    }

    public function getExceptionAnalysisSingleElementDbCallerAction()
    {
        $this->params['exception'] = 1;
        $data                      = $this->db->getTimeAnalysisDbCaller($this->params);
        $this->rest->success($data);
    }

    public function getExceptionAnalysisSingleElementSqlErrorSnapListAction()
    {
        $this->params['exception'] = 1;
        $data                      = RelationDb::instance()->getTimeAnalysisSnapSqlList($this->params);
        $this->rest->success($data);
    }

    public function getExceptionAnalysisSqlErrorStackTreeAction()
    {
        $this->params['exception'] = 1;
        $data                      = RelationDb::instance()->getExceptionAnalysisDbStackTree($this->params);
        $this->rest->success($data);
    }

    public function getFilterElementForDbAction()
    {
        $data = $this->db->getFilterElementForDb($this->params);
        $this->rest->success($data);
    }

    public function getCommonFilterListAction()
    {
        $data = $this->db->getCommonFilterList($this->params);
        $this->rest->success($data);
    }

    public function createExportFileAction()
    {
        $file_path    = RelationDb::instance()->createExportFile($this->params);

        $this->rest->success($file_path);
    }

    public function saveRelationDbFiltrationConditionAction()
    {
        $data = RelationDb::instance()->saveRelationDbFiltrationCondition($this->params);
        $this->rest->success($data);
    }

    public function getRelationDbFiltrationConditionAction()
    {
        $data = RelationDb::instance()->getRelationDbFiltrationCondition($this->params);
        $this->rest->success($data);
    }

    public function deleteRelationDbFiltrationConditionAction()
    {
        $data = RelationDb::instance()->deleteRelationDbFiltrationCondition($this->params);
        $this->rest->success($data);
    }

}