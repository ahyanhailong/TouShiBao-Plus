<?php
use cloudwise\tsb\business\app\web\Error;
use cloudwise\tsb\business\app\web\TransactionAnalysis;
use cloudwise\tsb\business\app\web\KeyTransaction;
use Yaf\Controller_Abstract;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:00
 */
class ErrorController extends BaseController
{
    public function ErrorAction()
    {
        $exception = $this->_request->getException();
        \cloudwise\tsb\datasource\base\LogService::logException($exception);
        throw $exception;
    }

    public function getErrorAndExceptionTrendChartAction()
    {
        $data = TransactionAnalysis::instance()->getErrorAnalysisErrorExceptionCountChart($this->params);

        $this->rest->success($data);
    }

    public function getErrorRatePieAction()
    {
        $data = TransactionAnalysis::instance()->getErrorAnalysisErrorRatePie($this->params);
        $this->rest->success($data);
    }

    public function getExceptionRatePieAction()
    {
        $data = TransactionAnalysis::instance()->getErrorAnalysisExceptionRatePie($this->params);
        $this->rest->success($data);
    }

    public function getErrorAggsListAction()
    {
        $data = KeyTransaction::instance()->getErrorAnalysisErrorList($this->params);

        $this->rest->success($data);
    }

    public function getExceptionAggsListAction()
    {
        $data = KeyTransaction::instance()->getErrorAnalysisExceptionList($this->params);

        $this->rest->success($data);
    }


    //详情页
    public function getSingleElementErrorTrendChartAction()
    {
        $data = TransactionAnalysis::instance()->getErrorAnalysisErrorExceptionCountChart($this->params);

        if($data) {
            if ($this->params['exception'] && $this->params['exception']) {
                unset($data['error']);
            }else{
                unset($data['exception']);
            }
        }

        $this->rest->success($data);
    }

    public function getSingleElementInstanceErrorRatePieAction()
    {
        $data = Error::instance()->getSingleElementInstanceErrorRatePie($this->params);
        $this->rest->success($data);
    }

    public function getSingleElementStatisticsErrorPieAction()
    {
        $data = Error::instance()->getSingleElementStatisticsErrorPie($this->params);
        $this->rest->success($data);
    }

    public function getSingleElementErrorDetailAction()
    {
        $data = Error::instance()->getSingleElementErrorDetail($this->params);
        $this->rest->success($data);
    }

    public function getSingleElementExceptionAction()
    {
        $data = Error::instance()->getSingleElementException($this->params);
        $this->rest->success($data);
    }

    public function getErrorFilterListAction(){
        $data = Error::instance()->getErrorFilterList($this->params);
        $this->rest->success($data);
    }

}