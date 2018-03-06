<?php

use cloudwise\tsb\datasource\Provider;
use cloudwise\tsb\business\app\web\Database;
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/1
 * Time: 下午4:27
 */
class ProviderTest extends PHPUnit_YafTestCase
{
    /**
     * @var Provider
     */
    public $provider;

    public function testWithConfig()
    {
        $this->provider = Yaf\Registry::get(Provider::PROVIDER_NAME);
        $druid = Database::instance()->getDruidData();
        $es = Database::instance()->getEsData();
        $mysql = Database::instance()->getAppList();
        var_dump($druid, $es, $mysql);
    }
}