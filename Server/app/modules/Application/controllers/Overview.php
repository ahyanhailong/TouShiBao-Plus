<?php
use cloudwise\tsb\business\app\web\Overview;
use cloudwise\tsb\business\app\web\Setting;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\business\app\web\TransactionAnalysis;
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午3:33
 */
class OverviewController extends BaseController
{

    /**
     * 设置慢参数
     */
    public function setAppSlowParams()
    {
        $aSettings = Setting::instance()->getAppSetting($this->params);
        $this->params['slow'] = $aSettings[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_SLOW];
        $this->params['very_slow'] = $aSettings[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_VERY_SLOW];
    }

    public function setDbSlowParams()
    {
        $aSettings = Setting::instance()->getAppSetting($this->params);
        $this->params['slow'] = $aSettings[AppEnum::SETTING_DB][AppEnum::SETTING_BASIC_SLOW];
        $this->params['very_slow'] = $aSettings[AppEnum::SETTING_DB][AppEnum::SETTING_BASIC_VERY_SLOW];
    }

    public function setHostParams()
    {
        $aSettings = Setting::instance()->getAppSetting($this->params);
        $this->params['type'] = $aSettings[AppEnum::SETTING_HOST][AppEnum::SETTING_HOST_TYPE];
        $this->params['warning'] = $aSettings[AppEnum::SETTING_HOST][AppEnum::SETTING_HOST_WARNING];
        $this->params['fatal_warning'] = $aSettings[AppEnum::SETTING_HOST][AppEnum::SETTING_HOST_FATAL_WARNING];
    }

    public function getTitleQuotaAction()
    {
        $this->setAppSlowParams();
        $data = Overview::instance()->getTitleQuota($this->params);
        $this->rest->success($data);
    }

    public function getSlowDbTableChartAction()
    {
        $this->setDbSlowParams();
        $data = Overview::instance()->getSlowDbTableChart($this->params);
        $this->rest->success($data);
    }

    public function getHealthAffairsTop5Action()
    {
        $data = Overview::instance()->getHealthAffairsTop5($this->params);
        $this->rest->success($data);
    }

    public function getDbInstanceTop5Action()
    {
        $this->setDbSlowParams();
        $data = Overview::instance()->getDbInstanceTop5($this->params);
        $this->rest->success($data);
    }

    public function getExceptionTop5Action()
    {
        $data = TransactionAnalysis::instance()->getErrorAnalysisExceptionRatePie($this->params);
        $this->rest->success($data);
    }

    public function getErrorTypeTop5Action()
    {
        $data = TransactionAnalysis::instance()->getErrorAnalysisErrorRatePie($this->params);
        $this->rest->success($data);
    }

    public function getExternalServiceTop3Action()
    {
        $data = Overview::instance()->getExternalServiceTop3($this->params);
        $this->rest->success($data);
    }

    public function getHostStatusChartAction()
    {
        $this->setHostParams();
        $data = Overview::instance()->getHostStatusChart($this->params);
        $this->rest->success($data);
    }

    public function getSlowSqlTop5Action()
    {
        $data = Overview::instance()->getSlowSqlTop5($this->params);
        $this->rest->success($data);
    }

}