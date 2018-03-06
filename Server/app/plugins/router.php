<?php
use App\library\Service\ParamsService;
use cloudwise\tsb\datasource\helper\StringHelper;

/**
 * @name SamplePlugin
 * @desc   Yaf定义了如下的6个Hook,插件之间的执行顺序是先进先Call
 * @see    http://www.php.net/manual/en/class.yaf-plugin-abstract.php
 * @author bear
 */
class routerPlugin extends \Yaf\Plugin_Abstract
{

    /**
     * @param \Yaf\Request_Abstract  $request
     * @param \Yaf\Response_Abstract $response
     *
     * @return mixed|void
     */
    public function routerStartup(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {

    }

    /**
     * @todo $aUriParams 可能不足3个元素，因此该函数中存在下标越界风险
     *
     * @param \Yaf\Request_Abstract  $request
     * @param \Yaf\Response_Abstract $response
     *
     * @return mixed|void
     */
    public function routerShutdown(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
        $sRealUri = str_replace(\App\library\Service\ConfigService::instance()->getConfig('app.base_uri'), '', $request->getRequestUri());
        $request->setRequestUri($sRealUri);
        $aUriParams = $this->setCamelCaseParams($request->getRequestUri());
        $request->setModuleName($aUriParams[0]);
        $request->setControllerName($aUriParams[1]);
        $request->setActionName($aUriParams[2]);
        ParamsService::instance()->setParams($request);
        ParamsService::instance()->checkParams($request);
    }

    /**
     * @param \Yaf\Request_Abstract  $request
     * @param \Yaf\Response_Abstract $response
     *
     * @return mixed|void
     */
    public function dispatchLoopStartup(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }

    /**
     * @param \Yaf\Request_Abstract  $request
     * @param \Yaf\Response_Abstract $response
     *
     * @return mixed|void
     */
    public function preDispatch(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }

    /**
     * @param \Yaf\Request_Abstract  $request
     * @param \Yaf\Response_Abstract $response
     *
     * @return mixed|void
     */
    public function postDispatch(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }

    /**
     * @param \Yaf\Request_Abstract  $request
     * @param \Yaf\Response_Abstract $response
     *
     * @return mixed|void
     */
    public function dispatchLoopShutdown(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }

    /**
     * @param $uri
     *
     * @return array
     */
    private function setCamelCaseParams($uri)
    {
        $aUriParams = explode('/', $uri);
        array_shift($aUriParams);
        foreach ($aUriParams as $index => $item) {
            $aUriParams[$index] = StringHelper::getCamelCaseParams($item);
        }

        return $aUriParams;
    }
}
