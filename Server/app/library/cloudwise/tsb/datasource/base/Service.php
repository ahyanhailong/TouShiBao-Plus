<?php
namespace cloudwise\tsb\datasource\base;

use Illuminate\Database\Capsule\Manager;

/**
 * Class Service
 *
 * @package cloudwise\tsb\datasource\base
 */
class Service
{
    /**
     * @var int
     */
    public $clientType;

    /**
     * @var object
     */
    protected $client;

    /**
     * get client
     *
     * @return Manager
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * set client
     *
     * @param $client set client
     *
     * @return void
     */
    public function setClient($client)
    {
        $this->client = $client;
    }

    /**
     * get client type
     *
     * @return int
     */
    public function getClientType()
    {
        return $this->clientType;
    }
}