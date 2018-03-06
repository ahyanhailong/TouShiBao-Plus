<?php

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/20
 * Time: 下午5:15
 */
use Yaf\Registry;
use cloudwise\tsb\datasource\Provider;

Class DemoTest extends PHPUnit_YafTestCase
{
	/**
	 * @var Illuminate\Database\Capsule\Manager
	 */
	public $db;

	public $es;

	/**
	 * @var \cloudwise\tsb\datasource\base\CacheService
	 */
	public $cache;

	/**
	 * @var RedisStore
	 */
	public $store;

	public function testInit()
	{
		$provider = Registry::get(Provider::PROVIDER_NAME);
		$this->cache = $provider->getMainProvider()->getCacheService();
		$this->cache->set('a',[1,2,3]);
		dd($this->cache->get('a'));
	}
}