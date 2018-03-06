<?php
namespace App\library\Service;

/**
 * interface of all services
 */
interface ServiceInterface
{
    /**
     * service 应明确为单例
     *
     * @return mixed
     */
    static public function instance();
}