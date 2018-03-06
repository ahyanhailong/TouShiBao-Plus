<?php
namespace cloudwise\tsb\datasource\base;

use App\library\Service\ConfigService;
use cloudwise\tsb\datasource\base\druid\lib\DruidException;
use cloudwise\tsb\datasource\base\druid\lib\DruidView;
use cloudwise\tsb\datasource\resource\Manager;

/**
 * Class DruidService
 *
 * @package cloudwise\tsb\datasource\base
 */
class DruidService extends Service
{
    public $clientType = BusinessProvider::TYPE_PROVIDER_SERVICE_DRUID;

    /**
     * @var \Druid
     */
    public $client;
    /**
     * @var string 模块名称
     */
    public $moduleName;

    /**
     * @var string 视图名称
     */
    public $name;


    /**
     * @var \Druid $view
     */
    protected static $view;


    /**
     * @var string $viewContent usage: cache
     */
    private $_viewContent;


    /**
     * @var array $renderParams usage: cache
     */
    private $_renderParams;

    /**
     * @var array $params
     */
    protected $params = [];

    public static $configs;

    /**
     * DruidService constructor
     *
     * @param array $configs 配置数组
     */
    public function __construct()
    {

    }

    public function addConnection($config)
    {
        $config['path'] = APPLICATION_PATH . '/' . $config['path'];
        self::$configs = $config;
        $druid = \Druid::getInstance();
        $druid->setDruidHosts((array)self::$configs['hosts']);
        $druid->debugWitch(self::$configs['debug']);
        self::$configs = $config;

        return $druid;
    }

    /**
     * 获取视图对象
     *
     * @return DruidView
     */
    protected function getView()
    {
        if (self::$view == null) {
            self::$view = new DruidView(self::$configs);
        }

        return self::$view;
    }


    /**
     * 获取调试信息
     *
     * @return array
     */
    protected function getDebugInfo()
    {
        return $this->client->getDebugInfo();
    }


    /**
     * 获取模板名称
     *
     * @throws DruidException
     * @return string
     */
    public function getViewName()
    {
        $data = $this->getModuleName();
        if (empty($data)) {
            throw new DruidException(
                "module name is NULL", DruidException::ERROR_TYPE_BASE);
        }

        $name = $this->getName();
        if (empty($name)) {
            throw new DruidException(
                "view name is NULL", DruidException::ERROR_TYPE_BASE);
        }

        $module_name = $this->getModuleName();
        $module_name = str_replace('_', DIRECTORY_SEPARATOR, $module_name);

        return $module_name . DIRECTORY_SEPARATOR . $this->getName();
    }


    /**
     * 模块名称
     *
     * @param string $moduleName 模块名称
     *
     * @return DruidService
     */
    protected function setModuleName($moduleName)
    {
        if (is_string($moduleName)) {
            $this->moduleName = $moduleName;
        }

        return $this;
    }

    /**
     * 获取模块名称
     *
     * @return string
     */
    protected function getModuleName()
    {
        return $this->moduleName;
    }

    /**
     * 获取视图名称
     *
     * @return string
     */
    protected function getName()
    {
        return $this->name;
    }


    /**
     * 设置视图名称
     *
     * @param string $name 视图名称
     *
     * @return DruidService
     */
    protected function setName($name)
    {
        if (is_string($name)) {
            $this->name = $name;
        }

        return $this;
    }

    /**
     * 获取参数数组
     *
     * @return array
     */
    protected function getParams()
    {
        return $this->params;
    }

    /**
     * 设置参数数组
     *
     * @param array $params
     *
     * @return DruidService
     */
    protected function setParams(array $params)
    {
        $params['path'] = APPLICATION_PATH . '/app/views/druid_query_templates/main.txt';

        $this->params = $params;

        return $this;
    }


    /**
     * 视图传递数据
     *
     * @param string $name  参数名称
     * @param mixed  $value 参数数组
     *
     * @return DruidService
     */
    protected function assign($name, $value)
    {
        $this->params[ $name ] = $value;

        return $this;
    }

    /**
     * 渲染数据
     *
     * @return array
     */
    protected function getRenderParams()
    {
        if (null == $this->_renderParams) {
            $this->_renderParams = self::getView()->render($this->getViewContent());
        }

        return $this->_renderParams;
    }

    /**
     * 获取视图内容, 多次调用从类内存获取
     *
     * @return string
     */
    protected function getViewContent()
    {
        if (null == $this->_viewContent) {
            $this->_viewContent = self::getView()->getViewContent($this->getViewName(), $this->params);
        }

        return $this->_viewContent;
    }

    /**
     * 向druid服务发送数据,获取Result结果
     *
     * @param \Closure $callback callback
     *
     * @throws \Exception
     * @return array
     */
    protected function getResult(\Closure $callback = null, $clear = true)
    {
        try {
            $renderString = json_encode($this->getRenderParams());
            $result = $this->client->getData($renderString);

            if ($clear) {
                $this->_clearQueryParams();
            }

            if ($callback) {
                $result = $callback($result, $params = []);
            }
        } catch (\Exception $e) {
            throw new \Exception(
                $e->getMessage(), $e->getCode());
        }

        return $result;
    }

    private function _clearQueryParams()
    {
        $this->_renderParams = null;
        $this->_viewContent = null;
    }
}