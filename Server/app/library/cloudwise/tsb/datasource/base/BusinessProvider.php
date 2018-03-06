<?php
namespace cloudwise\tsb\datasource\base;

use cloudwise\tsb\datasource\exception\RuntimeException;

/**
 * Class BusinessProvider
 *
 * @package cloudwise\tsb\datasource\base
 */
class BusinessProvider extends Provider
{
    const TYPE_PROVIDER_SERVICE_MYSQL = 0;
    const TYPE_PROVIDER_SERVICE_ES = 1;
    const TYPE_PROVIDER_SERVICE_DRUID = 2;
    const TYPE_PROVIDER_SERVICE_CACHE = 3;
    const TYPE_PROVIDER_SERVICE_EXCEL = 4;

    public $typeList = [
        self::TYPE_PROVIDER_SERVICE_MYSQL,
        self::TYPE_PROVIDER_SERVICE_ES,
        self::TYPE_PROVIDER_SERVICE_DRUID,
        self::TYPE_PROVIDER_SERVICE_CACHE,
        self::TYPE_PROVIDER_SERVICE_EXCEL,
    ];

    /**
     * @var string
     */
    public $serviceEsClass;
    /**
     * @var string
     */
    public $serviceDruidClass;
    /**
     * @var string
     */
    public $serviceMysqlClass;

    /**
     * @var array
     */
    protected $services;


    /**
     * Get service object
     *
     * @param $serviceClass
     *
     * @return MysqlService
     * @throws RuntimeException
     */
    public function getService($serviceClass)
    {
        //TODO 参数检查
        if (!class_exists($serviceClass)) {
            throw new RuntimeException("Service class {$serviceClass} not found.");
        }
        $service = null;
        if (isset($this->services[ $serviceClass ])) {
            $service = $this->services[ $serviceClass ];
        } else {
            $service = new $serviceClass();
            $this->services[ $serviceClass ] = $service;
        }

        return $this->mountClient($service);
    }


    /**
     * Detecting the validity of type
     *
     * @param int $type
     *
     * @throws RuntimeException
     *
     * @return bool
     */
    protected function isValidClientType($type)
    {
        if (is_null($type)) {
            throw new RuntimeException("Service type must be set.");
        }

        if (!is_int($type)) {
            throw new RuntimeException("The parameter type must be int type.");
        }

        return in_array($type, $this->typeList);
    }

    /**
     * mount client
     *
     * @param Service $service
     *
     * @throws RuntimeException
     * @return Service
     */
    protected function mountClient(Service $service)
    {
        $clientType = $service->getClientType();
        if ($this->isValidClientType($clientType)) {
            $client = null;
            if ($clientType == self::TYPE_PROVIDER_SERVICE_MYSQL) {
                $client = $this->getManager()->getMysqlClient();
            } else {
                if ($clientType == self::TYPE_PROVIDER_SERVICE_ES) {
                    $client = $this->getManager()->getEsClient();
                } else {
                    if ($clientType == self::TYPE_PROVIDER_SERVICE_DRUID) {
                        $client = $this->getManager()->getDruidClient();
                    } else {
                        if ($clientType == self::TYPE_PROVIDER_SERVICE_CACHE) {
                            $client = $this->getManager()->getCacheClient();
                        }
                    }
                }
            }
            $service->setClient($client);
        }

        return $service;
    }
}