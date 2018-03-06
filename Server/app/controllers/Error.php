<?php
use Yaf\Controller_Abstract;
use Yaf\Dispatcher;
use Yaf\Application;

/**
 * Class ErrorController
 */
class ErrorController extends Controller_Abstract
{
    /**
     * 错误控制器
     *
     * @param exception $exception 异常对象
     *
     * @return false
     */
    public function errorAction($exception)
    {
        //关闭自动渲染
        Dispatcher::getInstance()->autoRender(false);
        $isDisplayDebugInfo = (bool)Application::app()->getConfig()->get('app.debug');
        if ($isDisplayDebugInfo) {
            header("HTTP/1.0 500 Internal Server Error");
            $this->getView()->e = $exception;
            $this->getView()->errorClass = get_class($exception);
            $this->getView()->errorMessage = $exception->getMessage();
            $this->getView()->errorStringTrace = $exception->getTraceAsString();
            $params = $this->getRequest()->getParams();
            unset($params['exception']);
            $this->getView()->params = array_merge(
                [], $params, $this->getRequest()->getPost(), $this->getRequest()->getQuery());
            $template = 'error';
        } else {
            switch ($exception->getCode()) {
                case YAF_ERR_AUTOLOAD_FAILED:
                case YAF_ERR_NOTFOUND_MODULE:
                case YAF_ERR_NOTFOUND_CONTROLLER:
                case YAF_ERR_NOTFOUND_ACTION:
                case Exception_News::NEWS_ERROR_NUM_NOT_FOUND_DATA;
                case Exception_News::NEWS_ERROR_NUM_NOT_FOUND_INDUSTRY;
                case Exception_News::NEWS_ERROR_NUM_INDUSTRY_NOT_OPEN;
                case Exception_News::NEWS_ERROR_NUM_NOT_GET_ACCESS_XML_DATA;
                case Exception_Dict::DICT_ERROR_NUM_SLUG_NOT_FOUND;
                    header('HTTP/1.0 404 Not Found');
                    $template = '404';
                    break;
                default:
                    header("HTTP/1.0 500 Internal Server Error");
                    $template = '500';
                    break;
            }
        }
        $this->display($template, ['exception' => $exception]);

        return false;
    }


}
