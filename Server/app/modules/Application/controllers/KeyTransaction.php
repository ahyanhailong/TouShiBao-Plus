<?php
use cloudwise\tsb\business\app\web\KeyTransaction;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午5:50
 */
use cloudwise\tsb\business\app\web\TransactionAnalysis;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\business\app\web\Setting;


class KeyTransactionController extends BaseController
{

    public function setUriParams()
    {
        if(strstr($this->params['uri'], '*')){
            $this->params['search_uri'] = $this->params['uri'];
            unset($this->params['uri']);
        }
    }

    public function setSlowParams()
    {
        $aBasicSetting = Setting::instance()->getAppSetting($this->params);
        $this->params['slow'] = $aBasicSetting[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_SLOW];
        $this->params['very_slow'] = $aBasicSetting[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_VERY_SLOW];
        $this->params['topo_setting'] = $aBasicSetting[AppEnum::SETTING_TOPO];
    }

    public function getKeyTransactionListAction()
    {
        $this->setSlowParams();
        $data = KeyTransaction::instance()->getKeyTransactionList($this->params);
        $this->rest->success($data);
    }

    public function getProfilingStatisticalIndicatorsAction()
    {
        $this->setUriParams();
        $data = TransactionAnalysis::instance()->getDashboardStatisticalIndicators($this->params);

        $this->rest->success($data);
    }

    //概要分析
    public function getProfilingTransactionSlowElementAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getKeyTransactionList($this->params);
        $this->rest->success($data);
    }

    public function getProfilingSingleUrlStatisticalIndicatorstAction()
    {
        $this->setUriParams();
        $data = $this->provider->getAppProvider()->getTransactionAnalysisService()->getDashboardTopMethods($this->params);
        $this->rest->success($data);
    }

    public function getProfilingRespTimeAndCountDataMixedAction()
    {
        $this->setUriParams();
        $this->setSlowParams();
        $data = TransactionAnalysis::instance()->getOverviewRespAndRpmTrendChart($this->params);

        $this->rest->success($data);
    }

    public function getProfilingRequestStatisticsAction()
    {
        $this->setUriParams();
        $this->setSlowParams();
        $data = TransactionAnalysis::instance()->getDashboardRequestStatistics($this->params);

        $this->rest->success($data);
    }

    public function getProfilingErrorAndExceptionTrendChartAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getProfilingErrorAndExceptionTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getProfilingApdexAnalysisTrendChartAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getProfilingApdexAnalysisTrendChart($this->params);
        $this->rest->success($data);
    }


    //错误分析
    public function getErrorAnalysisErrorAndExceptionTrendChartAction()
    {
        $this->setUriParams();
        $data = TransactionAnalysis::instance()->getErrorAnalysisErrorExceptionCountChart($this->params);
        $this->rest->success($data);
    }

    public function getErrorAnalysisErrorRatePieAction()
    {
        $this->setUriParams();
        $data = TransactionAnalysis::instance()->getErrorAnalysisErrorRatePie($this->params);
        $this->rest->success($data);
    }

    public function getErrorAnalysisExceptionRatePieAction()
    {
        $this->setUriParams();
        $data = TransactionAnalysis::instance()->getErrorAnalysisExceptionRatePie($this->params);
        $this->rest->success($data);
    }

    public function getErrorAnalysisErrorListAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getErrorAnalysisErrorList($this->params);
        $this->rest->success($data);
    }

    public function getErrorAnalysisExceptionListAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getErrorAnalysisExceptionList($this->params);
        $this->rest->success($data);
    }

    //sql分析  不过这里没有使用这几个路由,还是用数据库的路由
    public function getSqlAnalysisTimeAndRpmTrendChartAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getSqlAnalysisTimeAndRpmTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getSqlAnalysisTimeDistributionLineAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getSqlAnalysisTimeDistributionLine($this->params);
        $this->rest->success($data);
    }

    public function getSqlAnalysisSqlAggsListAction()
    {
        $this->setUriParams();
        $data = KeyTransaction::instance()->getSqlAnalysisSqlAggsList($this->params);
        $this->rest->success($data);
    }

    //快照分析
    public function getSnapAnalysisTimeDistributionLineAction()
    {
        $this->setUriParams();
        $data = TransactionAnalysis::instance()->getSlowAnalysisTimeDistributionLine($this->params);
        $this->rest->success($data);
    }

    public function getSnapAnalysisSqlSnapListAction()
    {
        $this->setUriParams();
        $this->params['order'] = isset($this->params['order']) ? $this->params['order'] : 'wt';
        $this->params['sort'] = isset($this->params['sort']) ? $this->params['sort'] : 'desc';
        $this->params['page'] = isset($this->params['page']) ? $this->params['page'] : 1;
        $data = TransactionAnalysis::instance()->getAnalysisSnapList($this->params);
        $this->rest->success($data);
    }

    public function createKeyTransactionAction()
    {

        $data = KeyTransaction::instance()->createKeyTransaction($this->params);
        $this->rest->success($data);
    }

    public function getSettingUriListAction(){
        $data = KeyTransaction::instance()->getSettingUriList($this->params);
        $this->rest->success($data);
    }

    public function deleteTransactionAction()
    {

        $data = KeyTransaction::instance()->deleteTransaction($this->params);
        $this->rest->success($data);
    }

    public function updateTransactionAction()
    {

        $data = KeyTransaction::instance()->updateTransaction($this->params);
        $this->rest->success($data);
    }

    public function getSingleTransactionDataAction()
    {

        $data = KeyTransaction::instance()->getSingleTransactionData($this->params);
        $this->rest->success($data);
    }

}