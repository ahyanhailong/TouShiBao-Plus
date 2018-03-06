<?php

namespace cloudwise\tsb\datasource\services\main;

use cloudwise\tsb\datasource\base\BusinessProvider;
use cloudwise\tsb\datasource\base\CacheService;
use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\base\PHPExcelService;

/**
 * Class Provider
 *
 * @package cloudwise\tsb\datasource\services\main
 */
class Provider extends BusinessProvider
{
    const PROVIDER_NAME = "tsb_main_service_provider";

    /**
     * @return \cloudwise\tsb\datasource\base\CacheService
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getCacheService()
    {
        return $this->getService(CacheService::class);
    }

    /**
     * @return \cloudwise\tsb\datasource\base\PHPExcelService
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getExcelService()
    {
        return $this->getService(PHPExcelService::class);
    }

    /**
     * @return MysqlService
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getMysqlService()
    {
        return $this->getService(MysqlService::class);
    }
}