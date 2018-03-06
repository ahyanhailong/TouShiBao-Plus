<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:44
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;

/**
 * Class Error
 * @package cloudwise\tsb\business\app\web
 */
class Error extends Business
{
    /**
     * @var Error
     */
    private static $self = null;

    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function getErrorAndExceptionTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getErrorAndExceptionTrendChart($params);

        return $es_data;
    }

    public function getErrorRatePie($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getErrorRatePie($params);

        return $es_data;
    }

    public function getExceptionRatePie($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getExceptionRatePie($params);

        return $es_data;
    }

    public function getErrorAndExceptionAggsList($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getErrorAndExceptionAggsList($params);

        return $es_data;
    }

    public function getSingleElementErrorTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getSingleElementErrorTrendChart($params);

        return $es_data;
    }

    public function getSingleElementInstanceErrorRatePie($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getSingleElementInstanceErrorRatePie($params);

        return $es_data;
    }

    public function getSingleElementStatisticsErrorPie($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getSingleElementStatisticsErrorPie($params);

        return $es_data;
    }

    public function getSingleElementErrorDetail($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getSingleElementErrorDetail($params);

        return $es_data;
    }

    public function getSingleElementException($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getSingleElementException($params);

        return $es_data;
    }

    public function getErrorFilterList($params)
    {

        $es_data = self::$provider->getAppProvider()->getErrorService()->getErrorFilterList($params);

        return $es_data;
    }

}