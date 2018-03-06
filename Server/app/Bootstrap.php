<?php
use Yaf\Dispatcher;
use Yaf\Application;
use Yaf\Registry;
use Yaf\Loader;
use local\framework\yaf\Request;
use cloudwise\tsb\datasource\resource\Manager;
use cloudwise\tsb\datasource\Provider;
use App\library\Service\ConfigService;
use Illuminate\Redis\Database;
use Illuminate\Cache\RedisStore;

/**
 * @name Bootstrap
 * @author bear
 * @desc   所有在Bootstrap类中, 以_init开头的方法, 都会被Yaf调用,
 * @see    http://www.php.net/manual/en/class.yaf-bootstrap-abstract.php
 * 这些方法, 都接受一个参数:Yaf_Dispatcher $dispatcher
 * 调用的次序, 和申明的次序相同
 */
class Bootstrap extends \Yaf\Bootstrap_Abstract
{

    /**
     * 引入配置
     */
    public function _initConfig()
    {
        //把配置保存起来
        $arrConfig = Application::app()->getConfig();
        Registry::set('config', $arrConfig);
        //为了兼容 不同操作系统 下的大小写敏感， 改为手动 加载 viewTpl
        Dispatcher::getInstance()->autoRender(false);  // 关闭自动加载模板
    }

    /**
     * 指定框架的异常处理方式
     *
     * @param Dispatcher $dispatcher
     *
     * @return void
     */
    public function _initErrorHandler(Dispatcher $dispatcher)
    {
//        $dispatcher->setErrorHandler(array(get_class($this), 'error_handler'));
    }

    public function _initLoader()
    {
        Loader::import(APPLICATION_PATH . '/vendor/autoload.php');
    }

    /**
     * 初始化全局
     *
     * @param Dispatcher $dispatcher
     *
     * @return void
     */
    public function _initEnv(Dispatcher $dispatcher)
    {
        //时区设置
        $config = Application::app()->getConfig();
        $timezone = $config->application->env->timezone;
        date_default_timezone_set($timezone);
    }

    /**
     * 初始化内部上下文组件
     *
     * @desc  主要用户扩充框架request对象, 方便扩展
     *
     * @param Dispatcher $dispatcher
     *
     * @return void
     */
    public function _initInnerContext(Dispatcher $dispatcher)
    {
        $dispatcher->setRequest(new Request);
    }

    /**
     * 初始化服务共应组件
     *
     * @param Dispatcher $dispatcher
     */
    public function _initServiceProvider(Dispatcher $dispatcher)
    {
        $mysqlConfig = (array)ConfigService::instance()->getConfig('db');
        $esConfig = (array)ConfigService::instance()->getConfig('es');
        $druidConfig = (array)ConfigService::instance()->getConfig('druid');
        $cacheConfig = (array)ConfigService::instance()->getConfig('cache');

        $manager = new Manager();
        $manager->setMysqlConfig($mysqlConfig);
        $manager->setEsConfig($esConfig);
        $manager->setDruidConfig($druidConfig);
        $manager->setCacheConfig($cacheConfig);
        $tsbServiceProvider = new Provider($manager);
        Registry::set(Provider::PROVIDER_NAME, $tsbServiceProvider);
    }

    /**
     * 添加路由插件
     *
     * @param Dispatcher $dispatcher
     */
    public function _initRoute(Dispatcher $dispatcher)
    {
        //在这里注册自己的路由协议,默认使用简单路由
        //注册一个插件
        $router = new routerPlugin();
        $dispatcher->registerPlugin($router);
    }

    /**
     * 初始化路由
     *
     * @param Dispatcher $dispatcher
     *
     * @return void
     */
    public function _initRouter(Dispatcher $dispatcher)
    {
        $modules = $dispatcher->getApplication()->getModules();
        foreach ($modules as $module) {
            $router        = Dispatcher::getInstance()->getRouter();
            $routeConfFile = APPLICATION_PATH . '/' . $dispatcher->getApplication()->getConfig()->application->conf->route->directory . DIRECTORY_SEPARATOR . $module . ".ini";
            if (file_exists($routeConfFile)) {
                $routeConf = new \Yaf\Config\Ini($routeConfFile);
                $router->addConfig($routeConf->routes);
            }
        }
    }

    /**
     * 缓存初始化
     */
    public function _initCache()
    {
        $config = ConfigService::instance()->getConfig('cache');
        $redis = new Database($config);
        $store = new RedisStore($redis);
        \Yaf\Registry::set('cache', $store);
    }

    /**
     * 异常处理方法
     *
     * @param int    $errNo   contains the level of the error raised
     * @param string $errStr  contains the error message
     * @param string $errFile which contains the filename that the error was raised in
     * @param int    $errLine which contains the line number the error was raised at
     *
     * @throws ErrorException
     */
    public static function error_handler($errNo, $errStr, $errFile, $errLine)
    {
        throw new ErrorException($errStr, 0, $errNo, $errFile, $errLine);
    }
}
