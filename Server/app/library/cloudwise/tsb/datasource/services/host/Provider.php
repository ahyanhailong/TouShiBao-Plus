<?php
namespace cloudwise\tsb\datasource\services\host;

use cloudwise\tsb\datasource\base\BusinessProvider;
use cloudwise\tsb\datasource\services\host\es\HostList;
use cloudwise\tsb\datasource\services\host\mysql\DimHost;
use cloudwise\tsb\datasource\services\host\mysql\NewPluginOfHost;


/**
 * Class Provider
 *
 * @package cloudwise\tsb\datasource\services\user
 */
class Provider extends BusinessProvider
{
    const PROVIDER_NAME = "tsb_host_service_provider";

    public $name = self::PROVIDER_NAME;


    /**
     * @return DimHost
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getDimHostService()
    {
        return $this->getService(DimHost::class);
    }

    /**
     * @return NewPluginOfHost
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getNewPluginOfHost()
    {
        return $this->getService(NewPluginOfHost::class);
    }

    public function getHostListService()
    {
        return $this->getService(HostList::class);
    }

}


