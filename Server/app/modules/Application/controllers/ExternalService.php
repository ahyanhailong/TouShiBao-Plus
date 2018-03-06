<?php
use cloudwise\tsb\business\app\web\ExternalService;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午5:58
 */
class ExternalServiceController extends BaseController
{
    public function getUrlListAction()
    {
        $data = ExternalService::instance()->getUrlList($this->params);
        $this->rest->success($data);
    }

    public function getSingleUriListAction()
    {
        $data = ExternalService::instance()->getSingleUriList($this->params);
        $this->rest->success($data);
    }

    public function getRespTimeTrendChartAction()
    {
        $data = ExternalService::instance()->getRespTimeTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getRpmTrendChartAction()
    {
        $data = ExternalService::instance()->getRpmTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getNetworkErrorTrendChartAction()
    {
        $data = ExternalService::instance()->getNetworkErrorTrendChart($this->params);
        $this->rest->success($data);
    }


    //二级页面
    public function getRpmAndRespTimeTrendChartAction()
    {
        $data = ExternalService::instance()->getRpmAndRespTimeTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getCallerRateAction()
    {
        $data = ExternalService::instance()->getCallerRate($this->params);
        $this->rest->success($data);
    }

    public function getCallerListAction()
    {
        $data = ExternalService::instance()->getCallerList($this->params);
        $this->rest->success($data);
    }

    public function getErrorNetworkTypeTrendChartAction()
    {
        $data = ExternalService::instance()->getErrorNetworkTypeTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getErrorListAction()
    {
        $data = ExternalService::instance()->getErrorList($this->params);
        $this->rest->success($data);
    }


    //uri 三级页面
    public function getUriRpmAndRespTimeTrendChartAction()
    {
        $data = ExternalService::instance()->getRpmAndRespTimeTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getUriCallerRateAction()
    {
        $data = ExternalService::instance()->getCallerRate($this->params);
        $this->rest->success($data);
    }

    public function getUriCallerListAction()
    {
        $data = ExternalService::instance()->getCallerList($this->params);
        $this->rest->success($data);
    }


    public function getUriErrorNetworkTypeTrendChartAction()
    {
        $data = ExternalService::instance()->getErrorNetworkTypeTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getUriErrorListAction()
    {
        $data = ExternalService::instance()->getErrorList($this->params);
        $this->rest->success($data);
    }

}