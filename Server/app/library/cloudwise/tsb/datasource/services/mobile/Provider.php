<?php
namespace cloudwise\tsb\datasource\services\mobile;

use cloudwise\tsb\datasource\base\BusinessProvider;

/**
 * Class Provider
 *
 * @package cloudwise\tsb\datasource\services\mobile
 */
class Provider extends BusinessProvider
{
    const PROVIDER_NAME = "tsb_mobile_service_provider";

    public $name = self::PROVIDER_NAME;
}