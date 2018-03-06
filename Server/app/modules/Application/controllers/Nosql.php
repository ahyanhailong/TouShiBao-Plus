<?php
use cloudwise\tsb\business\app\web\Nosql;
use cloudwise\tsb\business\app\web\AppGeneralMethod;
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:02
 */
class NosqlController extends BaseController
{
    public function setParams()
    {
        if(isset($this->params['service_type'])){
            $this->params['service_index'] = $this->params['service_type'];
            unset($this->params['service_type']);
        }
        $this->params['app_code_type'] = AppGeneralMethod::instance()->AppTopoGetAppType($this->params);
    }

    public function getModuleListAction()
    {
        $data = Nosql::instance()->getModuleList($this->params);
        $this->rest->success($data);
    }

    public function getInstanceAndPstListAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getInstanceAndPstList($this->params);
        $this->rest->success($data);
    }

    public function getOverviewRespTrendChartAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getOverviewRespTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getOverviewRpmTrendChartAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getOverviewRpmTrendChart($this->params);
        $this->rest->success($data);
    }

    public function getOverviewInstanceListAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getOverviewInstanceList($this->params);
        $this->rest->success($data);
    }

    public function getMethodRpmAndRespTimeAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getMethodRpmAndRespTime($this->params);
        $this->rest->success($data);
    }

    public function getCallerRateAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getCallerRate($this->params);
        $this->rest->success($data);
    }

    public function getPstListAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getPstList($this->params);
        $this->rest->success($data);
    }

    public function getUrlListAction()
    {
        $this->setParams();
        $data = Nosql::instance()->getUrlList($this->params);
        $this->rest->success($data);
    }

}