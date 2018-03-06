<?php
namespace cloudwise\tsb\business\host;
use cloudwise\tsb\business\Business;
//use cloudwise\tsb\datasource\services\host\es\HostList;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 18/1/4
 * Time: 下午2:20
 */
class HostList extends Business
{
    /**
     * @var HostList
     */
    private static $self = null;

    /**
     * @return HostList
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }


}