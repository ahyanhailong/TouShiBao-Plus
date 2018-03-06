<?php
use cloudwise\tsb\business\app\web\Topo;
use cloudwise\tsb\business\app\web\TransactionAnalysis;
use cloudwise\tsb\business\app\web\Setting;
use cloudwise\tsb\datasource\constants\AppEnum;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午5:04
 */
class TopoController extends BaseController
{
    /**
     * 设置慢参数
     */
    public function setSlowParams()
    {
        $aBasicSetting = Setting::instance()->getAppSetting($this->params);
        $this->params['slow'] = $aBasicSetting[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_SLOW];
        $this->params['very_slow'] = $aBasicSetting[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_VERY_SLOW];
    }

    public function getTopoDataAction()
    {
        $this->setSlowParams();
        $data = Topo::instance()->getTopoData($this->params);
        $this->rest->success($data);
    }

    public function getTopoInstanceInfoAction()
    {
//        $this->params['start_time'] = (time() - 3600) * 1000;
//        $this->params['end_time']   = time() * 1000;
        $data = Topo::instance()->getTopoInstanceInfo($this->params);
        $this->rest->success($data);
    }

    public function getRequestStatisticsTableAction()
    {
        $this->setSlowParams();
        $data = TransactionAnalysis::instance()->getDashboardRequestStatistics($this->params);
        $this->rest->success($data);
    }

    public function getRequestTrendChartAction()
    {
        $data = Topo::instance()->getRequestTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getRespTimeTrendChartAction()
    {
        $data = Topo::instance()->getRespTimeTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getErrorTrendChartAction()
    {
        $data = Topo::instance()->getErrorTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getTopoLayoutAction()
    {
        $data = Topo::instance()->getTopoLayout($this->params);
        $this->rest->success($data);
    }

    public function saveTopoLayoutAction()
    {
        $data = Topo::instance()->saveTopoLayout($this->params);
        $this->rest->success($data);
    }

    public function getAppCurrentStatusAction()
    {
        $data = Topo::instance()->getAppCurrentStatus($this->params);
        $this->rest->success($data);
    }

    public function getAppNameAction()
    {
        $data = Topo::instance()->getAppName($this->params);
        $this->rest->success($data);
    }

}