<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:42
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;

/**
 * Class ExternalService
 * @package cloudwise\tsb\business\app\web
 */
class ExternalService extends Business
{
    /**
     * @var ExternalService
     */
    private static $self = null;

    /**
     * @return ExternalService
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function getUrlList($params)
    {

        $params['page'] = isset($params['page'])&&$params['page'] ? $params['page'] : 1;
        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getUrlList($params);
        $return  = AjaxPageEnum::processPageResult($es_data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $return;
    }

    public function getSingleUriList($params)
    {

        $params['page'] = isset($params['page'])&&$params['page'] ? $params['page'] : 1;
        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getSingleUriList($params);
        $return  = AjaxPageEnum::processPageResult($es_data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $return;
    }

    public function getRespTimeTrendChart($params)
    {
        $params['type'] = 'resp';
        $top_data = self::$provider->getAppProvider()->getExternalServiceService()->getRespTimeTopInstance($params);
        $params['domain'] = $top_data['domain'];
        $params['port'] = $top_data['port'];

        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getIntanceTrendChart($params);

        return $es_data;
    }

    public function getRpmTrendChart($params)
    {

        $params['type'] = 'throughput';
        $top_data = self::$provider->getAppProvider()->getExternalServiceService()->getRespTimeTopInstance($params);
        $params['domain'] = $top_data['domain'];
        $params['port'] = $top_data['port'];
        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getIntanceTrendChart($params);

        return $es_data;
    }

    public function getNetworkErrorTrendChart($params)
    {
        $params['type'] = 'net_error';
        $top_data = self::$provider->getAppProvider()->getExternalServiceService()->getRespTimeTopInstance($params);
        $params['domain'] = $top_data['domain'];
        $params['port'] = $top_data['port'];
        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getIntanceTrendChart($params);

        return $es_data;
    }

    public function getRpmAndRespTimeTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getRpmAndRespTimeTrendChart($params);

        return $es_data;
    }

    public function getCallerRate($params)
    {

        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getCallerRate($params);

        return $es_data;
    }

    public function getCallerList($params)
    {

        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getCallerList($params);
        $return  = AjaxPageEnum::processPageResult($es_data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $return;
    }

    public function getErrorNetworkTypeTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getErrorNetworkTypeTrendChart($params);

        return $es_data;
    }

    public function getErrorList($params)
    {

        $es_data = self::$provider->getAppProvider()->getExternalServiceService()->getErrorList($params);
        $return  = AjaxPageEnum::processPageResult($es_data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $return;
    }

}