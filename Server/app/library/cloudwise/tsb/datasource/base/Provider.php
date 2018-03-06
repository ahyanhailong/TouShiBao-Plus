<?php
namespace cloudwise\tsb\datasource\base;

use cloudwise\tsb\datasource\exception\RuntimeException;
use cloudwise\tsb\datasource\resource;

/**
 * Class Provider
 *
 * @package cloudwise\tsb\datasource\base
 */
class Provider
{
    /**
     * @var string
     */
    public $name;

    /**
     * @var resource\Manager
     */
    protected $manager;

    /**
     * @var array
     */
    protected $providers;


    /**
     * Provider constructor.
     *
     * @param resource\Manager $manager
     */
    public function __construct(resource\Manager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * Get Provider Manager
     *
     * @return resource\Manager
     */
    public function getManager()
    {
        return $this->manager;
    }

    /**
     * Get Provider Name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }


    /**
     * Get Provider Object
     *
     * @param string $providerClass
     *
     * @throws RuntimeException
     * @return object
     */
    protected function getProvider($providerClass)
    {
        //TODO 参数检测和限制
        if (!class_exists($providerClass)) {
            throw new RuntimeException("Provider class {$providerClass} not found.");
        }

        $provider = null;
        if (isset($this->providers[ $providerClass ])) {
            $provider = $this->providers[ $providerClass ];
        } else {
            $provider = new $providerClass($this->getManager());
            $this->providers[ $providerClass ] = $provider;
        }

        return $provider;
    }
}