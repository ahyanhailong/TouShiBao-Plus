<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:49
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\datasource\services\app\es\MessageQueueService;
use Yaf\Exception;

/**
 * Class MessageQueue
 * @package cloudwise\tsb\business\app\web
 */
class MessageQueue extends Business
{
    /**
     * @var MessageQueue
     */
    private static $self = null;

    /**
     * @var MessageQueueService
     */
    private $sMeesageQueue;

    /**
     * @return MessageQueue
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
        $this->sMeesageQueue = self::$provider->getAppProvider()->getMessageQueenService();
    }

    public function getInstanceAndDbnList($params)
    {

        $return = $this->sMeesageQueue->getInstanceAndDbnList($params);

        return $return;
    }

    public function getServiceTotalTimeTrend($params)
    {

        $return = $this->sMeesageQueue->getServiceTotalTimeTrend($params);

        return $return;
    }

    public function getRpmAndTimeTrend($params)
    {

        $return = $this->sMeesageQueue->getRpmAndTimeTrend($params);

        return $return;
    }

    public function getFlowPmTrend($params)
    {

        $return = $this->sMeesageQueue->getFlowPmTrend($params);

        return $return;
    }

    public function getCallerRate($params)
    {

        $return = $this->sMeesageQueue->getCallerRate($params);

        return $return;
    }

    public function getConsumerList($params)
    {

        $return = $this->sMeesageQueue->getConsumerList($params);
        $return = AjaxPageEnum::processPageResult($return, $params['page'], $params['page_size']);
        return $return;
    }

    public function getConsumerInstanceList($params)
    {

        $return = $this->sMeesageQueue->getConsumerInstanceList($params);
        $return = AjaxPageEnum::processPageResult($return, $params['page'], $params['page_size']);
        return $return;
    }

}