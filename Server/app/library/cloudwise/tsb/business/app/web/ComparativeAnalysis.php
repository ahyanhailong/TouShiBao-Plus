<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:41
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;

/**
 * Class ComparativeAnalysis
 * @package cloudwise\tsb\business\app\web
 */
class ComparativeAnalysis extends Business
{
    /**
     * @var ComparativeAnalysis
     */
    private static $self = null;

    /**
     * @return ComparativeAnalysis
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function getUriList($params)
    {

        $es_uri = self::$provider->getAppProvider()->getComparativeAnalysisService()->getUriList($params);
        $key_uri = self::$provider->getAppProvider()->getKeyAffairsService()->getKeyTransaction($params);
        $es_uri = array_diff($es_uri,$key_uri);
        return array('key_uri'=>$key_uri,'uri'=>$es_uri);
    }

    public function getHostList($params)
    {

        $host_data = self::$provider->getAppProvider()->getDimHostService()->getHostDataByAppIds($params);

        return $host_data;
    }

    public function getRequestTrendLine($params)
    {

        $es_data = self::$provider->getAppProvider()->getComparativeAnalysisService()->getRequestTrendLine($params);

        return $es_data;
    }

    public function getRespTimeTrendLine($params)
    {

        $es_data = self::$provider->getAppProvider()->getComparativeAnalysisService()->getRespTimeTrendLine($params);

        return $es_data;
    }

    public function getErrorTrendLine($params)
    {

        $es_data = self::$provider->getAppProvider()->getComparativeAnalysisService()->getErrorTrendLine($params);

        return $es_data;
    }

}