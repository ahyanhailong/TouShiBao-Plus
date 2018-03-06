<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:45
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\datasource\services\app\es\NosqlService;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;

/**
 * Class Nosql
 * @package cloudwise\tsb\business\app\web
 */
class Nosql extends Business
{

    /**
     * @var NosqlService
     */
    private $sNosql;

    /**
     * @var Nosql
     */
    private static $self = null;

    /**
     * @return Nosql
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
        $this->sNosql = self::$provider->getAppProvider()->getNosqlService();
    }

    public function getModuleList($params)
    {

        $return = $this->sNosql->getModuleList($params);

        return $return;
    }

    public function getInstanceAndPstList($params)
    {
        $return = $this->sNosql->getInstanceAndPstList($params);

        return $return;
    }

    public function getOverviewRespTrendChart($params)
    {
        $return = $this->sNosql->getOverviewRespTrendChart($params);

        return $return;
    }

    public function getOverviewRpmTrendChart($params)
    {
        $return = $this->sNosql->getOverviewRpmTrendChart($params);

        return $return;
    }

    public function getOverviewInstanceList($params)
    {
        $return = $this->sNosql->getOverviewInstanceList($params);
        $return = AjaxPageEnum::processPageResult($return, $params['page'], $params['page_size']);
        return $return;
    }

    public function getMethodRpmAndRespTime($params)
    {
        $return = $this->sNosql->getMethodRpmAndRespTime($params);

        return $return;
    }

    public function getCallerRate($params)
    {

        $return = $this->sNosql->getCallerRate($params);

        return $return;
    }

    public function getPstList($params)
    {
        $return = $this->sNosql->getPstList($params);

        $return = AjaxPageEnum::processPageResult($return, $params['page'], $params['page_size']);

        return $return;
    }

    public function getUrlList($params)
    {
        $return = $this->sNosql->getUrlList($params);

        $return = AjaxPageEnum::processPageResult($return, $params['page'], $params['page_size']);

        return $return;
    }

}