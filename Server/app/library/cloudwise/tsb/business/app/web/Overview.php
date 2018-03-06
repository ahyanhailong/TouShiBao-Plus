<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午3:36
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\services\app\es\OverviewService;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;

/**
 * Class Overview
 * @package cloudwise\tsb\business\app\web
 */
class Overview extends Business
{
    /**
     * @var Overview
     */
    private static $self = null;

    /**
     * @var OverviewService
     */
    private $sOverview;

    /**
     * @return Overview
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function __construct()
    {
        parent::__construct();
        $this->sOverview = self::$provider->getAppProvider()->getOverviewService();
    }

    public function getTitleQuota($params)
    {

        $es_data = $this->sOverview->getTitleQuota($params);

        return $es_data;
    }

    public function getSlowDbTableChart($params)
    {

        $es_data = $this->sOverview->getSlowDbTableChart($params);


        return $es_data;
    }

    public function getHealthAffairsTop5($params)
    {

        $es_data = $this->sOverview->getHealthAffairsTop5($params);

        return $es_data;
    }

    public function getDbInstanceTop5($params)
    {

        $es_data = $this->sOverview->getDbInstanceTop5($params);

        return $es_data;
    }

    public function getExternalServiceTop3($params)
    {
        $es_data = $this->sOverview->getExternalServiceTop3($params);
        return $es_data;
    }

    public function getHostStatusChart($params)
    {
        $mRsAppHost = self::$provider->getAppProvider()->getRsAppHostService();
        $mHost = self::$provider->getHostProvider()->getDimHostService();
        $rsList = $mRsAppHost->fetchAll(['app_id'=>$params['app_id'], 'account_id'=>$params['account_id']]);
        $params['host_ids'] = ArrayHelper::extractFromArray($rsList, 'host_id',function($item){
            return (string)$item;
        });
        $hostList = $mHost->fetchAll(['account_id'=>$params['account_id'], 'host_id in ?'=>$params['host_ids']]);
        $hostName = [];
        foreach($hostList as $host){
            $hostName[$host->host_id] = $host->host_name;
        }

        $list = $this->sOverview->getHostStatusChart($params);
        ArrayHelper::replaceDataValue($list, 'host_name', $hostName);
        return $list;
    }

    public function getSlowSqlTop5($params)
    {
        $es_data = $this->sOverview->getSlowSqlTop5($params);
        return $es_data;
    }


}