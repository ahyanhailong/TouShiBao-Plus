<?php
use cloudwise\tsb\business\app\web\Database;
use cloudwise\tsb\datasource\base\LogService;

/**
 * Class DataBaseController
 */
class DataBaseController extends \BaseController
{
    public static $vo_db;


    public function init()
    {
        return parent::init(); // TODO: Change the autogenerated stub
    }

    public function indexAction()
    {
        $this->rest->success();
    }

    public function AppListAction()
    {
        echo "<pre>";
        echo "db test\n";
        var_dump(Database::instance()->getAppList());
        echo "es test\n";
        var_dump(Database::instance()->getEsData());
        echo "druid test\n";
        var_dump(Database::instance()->getDruidData());
        echo "cache test\n";
        var_dump(DataBase::instance()->getCacheData());
        LogService::setLog('debug', 'test', ['test'], [], 'debug');
    }
}