<?php
namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;

/**
 * Class Database
 *
 * @package cloudwise\tsb\business\app\web
 */
class Database extends Business
{
    /**
     * @var Database
     */
    private static $self = null;

    /**
     * @return Database
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    /**
     *  测试数据库
     */
    public function getAppList()
    {
        return self::$provider->getAppProvider()->getDimAppService()->fetchRow(['account_id' => 107]);
    }

    /**
     * @return array 测试es
     */
    public function getEsData()
    {
        return self::$provider->getAppProvider()->getEsHostService()->getDatabaseData();
    }

    /**
     *  测试druid
     */
    public function getDruidData()
    {
        return self::$provider->getAppProvider()->getDruidDatabase()->getDbNameList();
    }

    /**
     * 测试缓存
     */
    public function getCacheData()
    {
        $cache = self::$provider->getMainProvider()->getCacheService();
        $cache->set('a', 'b', 1, 'test');

        return $cache->get('a', 'test');
    }
}