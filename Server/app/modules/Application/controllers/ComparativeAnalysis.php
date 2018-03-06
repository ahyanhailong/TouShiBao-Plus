<?php
use cloudwise\tsb\business\app\web\ComparativeAnalysis;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午5:57
 */
class ComparativeAnalysisController extends BaseController
{
    public function getUriListAction()
    {
        $data = ComparativeAnalysis::instance()->getUriList($this->params);
        $this->rest->success($data);
    }

    public function getHostListAction()
    {
        $data = ComparativeAnalysis::instance()->getHostList($this->params);
        $this->rest->success($data);
    }

    public function getRequestTrendLineAction()
    {
        $data = ComparativeAnalysis::instance()->getRequestTrendLine($this->params);
        $this->rest->success($data);
    }

    public function getRespTimeTrendLineAction()
    {
        $data = ComparativeAnalysis::instance()->getRespTimeTrendLine($this->params);
        $this->rest->success($data);
    }

    public function getErrorTrendLineAction()
    {
        $data = ComparativeAnalysis::instance()->getErrorTrendLine($this->params);
        $this->rest->success($data);
    }

}