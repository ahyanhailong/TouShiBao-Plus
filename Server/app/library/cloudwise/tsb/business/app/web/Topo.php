<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:34
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\AppEnum;


/**
 * Class Topo
 * @package cloudwise\tsb\business\app\web
 */
class Topo extends Business
{

    /**
     * @var Topo
     */
    private static $self = null;

    /**
     * @return Topo
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function getTopoData($params)
    {
        $dimAppModel    = self::$provider->getAppProvider()->getDimAppService();
        $rsAppHostModel = self::$provider->getAppProvider()->getRsAppHostService();
        $connections    = self::$provider->getAppProvider()->getAppTopoItemsService()->getAppConnections($params, $dimAppModel, $rsAppHostModel);
        $nodes          = $connections['nodes'];
        $edges          = $connections['edges'];
        $app_ids        = $connections['app_ids'];

        $params['app_ids']     = $app_ids;
        $params['query_index'] = 'day';
        $app_health            = AppList::instance()->getAppHealthStatus($params);

        foreach ($nodes as $key => $node) {
            if (isset($node['type']) && $node['type'] == 'app' && isset($app_health[$node['id']])) {
                $nodes[$key]['group'] = AppEnum::$app_topo_healthy_group[$app_health[$node['id']]];
            }
        }

        return array('nodes' => $nodes, 'edges' => $edges);
    }

    public function getTopoInstanceInfo($params)
    {

        $es_data = self::$provider->getAppProvider()->getTopoService()->getTopoInstanceInfo($params);

        return $es_data;
    }

    public function getRequestStatisticsTable($params)
    {

        $es_data = self::$provider->getAppProvider()->getTopoService()->getRequestStatisticsTable($params);

        return $es_data;
    }

    public function getRequestTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getTopoService()->getRequestTrendChart($params);

        return $es_data;
    }

    public function getRespTimeTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getTopoService()->getRespTimeTrendChart($params);

        return $es_data;
    }

    public function getErrorTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getTopoService()->getErrorTrendChart($params);

        return $es_data;
    }

    public function getTopoLayout($params)
    {

        $es_data = self::$provider->getAppProvider()->getDimAppLayoutService()->getTopoLayout($params);

        return $es_data;
    }

    public function saveTopoLayout($params)
    {
        $es_data = self::$provider->getAppProvider()->getDimAppLayoutService()->saveTopoLayout($params);

        return $es_data;
    }

    public function getAppCurrentStatus($params)
    {
        $es_data = self::$provider->getAppProvider()->getTopoService()->getAppCurrentStatus($params);

        return $es_data;
    }


    public function getAppName($params)
    {
        $es_data = self::$provider->getAppProvider()->getDimAppService()->getAppName($params);

        return $es_data;
    }

}