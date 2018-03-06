<?php
namespace cloudwise\tsb\datasource\resource;

use cloudwise\tsb\datasource\base\CacheService;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\DruidService;
use Elasticsearch\Client;
use Illuminate\Database\Capsule\Manager as DB;

/**
 * Class Manager
 *
 * @package cloudwise\tsb\datasource\resource
 */
class Manager
{
    /**
     * @var array
     */
    protected $esConfig = [];

    /**
     * @var array
     */
    protected $mysqlConfig = [];


    /**
     * @var array
     */
    protected $druidConfig = [];

    /**
     * @var array
     */
    protected $cacheConfig = [];

    /**
     * @var mixed
     */
    protected $druidClient = null;

    /**
     * @var mixed
     */
    protected $mysqlClient = null;

    /**
     * @var mixed
     */
    protected $esClient = null;

    /**
     * @var mixed
     */
    protected $cacheClient = null;

    /**
     * Manager constructor.
     */
    public function __construct()
    {

    }

    /**
     * set es config
     *
     * @param array $config
     *
     * @return $this
     */
    public function setEsConfig(array $config)
    {
        $this->esConfig = $config;

        return $this;
    }

    /**
     * get es config
     *
     * @return array
     */
    public function getEsConfig()
    {
        return $this->esConfig;
    }

    /**
     * set druid config
     *
     * @param array $config
     *
     * @return $this
     */
    public function setDruidConfig(array $config)
    {
        $this->druidConfig = $config;

        return $this;
    }

    /**
     * get druid config
     *
     * @return array
     */
    public function getDruidConfig()
    {
        return $this->druidConfig;
    }

    /**
     * set mysql config
     *
     * @param array $config
     *
     * @return array
     */
    public function setMysqlConfig(array $config)
    {
        $this->mysqlConfig = $config;

        return $this;
    }

    /**
     * get mysql config
     *
     * @return array
     */
    public function getMysqlConfig()
    {
        return $this->mysqlConfig;
    }

    /**
     * set cache config
     *
     * @return array
     */
    public function setCacheConfig($config)
    {
        $this->cacheConfig = $config;

        return $this;
    }

    public function getCacheConfig()
    {
        return $this->cacheConfig;
    }

    /**
     * @return \Illuminate\Cache\RedisStore
     */
    public function getCacheClient()
    {
        if (!$this->cacheClient) {
            $cache = new CacheService();
            $this->cacheClient = $cache->addConnection($this->cacheConfig);
        }

        return $this->cacheClient;
    }

    /**
     * get mysql client
     *
     * @return \Illuminate\Database\Capsule\Manager
     */
    public function getMysqlClient()
    {
        if (!$this->mysqlClient) {
            //初始化 illuminate/database
            $capsule = new DB();
            $capsule->addConnection($this->mysqlConfig);
            $capsule->setAsGlobal();
            //开启Eloquent ORM
            $this->mysqlClient = $capsule;
        }

        return $this->mysqlClient;
    }

    /**
     * get druid client
     *
     * @return \Druid
     */
    public function getDruidClient()
    {
        if (!$this->druidClient) {
            $druid = new DruidService();
            $this->druidClient = $druid->addConnection($this->druidConfig);
        }

        return $this->druidClient;
    }

    /**
     * get es client
     *
     * @return Client
     */
    public function getEsClient()
    {
        if (!$this->esClient) {
            $es = new ESService();
            $this->esClient = $es->addConnection($this->esConfig);
        }

        return $this->esClient;
    }
}