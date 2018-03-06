<?php
namespace cloudwise\tsb\datasource;

use cloudwise\tsb\datasource\base;
use cloudwise\tsb\datasource\services\app;
use cloudwise\tsb\datasource\services\mobile;
use cloudwise\tsb\datasource\services\user;
use cloudwise\tsb\datasource\services\host;
use \cloudwise\tsb\datasource\services\main;

/**
 * Class Provider
 *
 * @package cloudwise\tsb
 */
class Provider extends base\Provider
{
    const PROVIDER_NAME = "tsb_service_provider";
    public $name = self::PROVIDER_NAME;

    /**
     * Getting a app service provider
     *
     * @return app\Provider
     */
    public function getAppProvider()
    {
        return $this->getProvider(app\Provider::class);
    }

    /**
     * Getting a mobile service provider
     *
     * @return mobile\Provider
     */
    public function getMobileProvider()
    {
        return $this->getProvider(mobile\Provider::class);
    }

    /**
     * Getting a user service provider
     *
     * @return user\Provider
     */
    public function getUserProvider()
    {
        return $this->getProvider(user\Provider::class);
    }

    /**
     * Getting a user service provider
     *
     * @return host\Provider
     */
    public function getHostProvider()
    {
        return $this->getProvider(host\Provider::class);
    }

    /**
     * Getting a user service provider
     *
     * @return main\Provider
     */
    public function getMainProvider()
    {
        return $this->getProvider(main\Provider::class);
    }
}