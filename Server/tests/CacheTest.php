<?php
use \App\library\Tool\CacheService;
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/25
 * Time: 上午10:40
 */

class CacheTest extends PHPUnit_YafTestCase
{
	public function testInit()
	{
		CacheService::instance()->set('a','b',1);
		$this->assertTrue(CacheService::instance()->get('a') == 'b');
		$this->assertTrue(CacheService::instance()->exists('a') == TRUE);
		CacheService::instance()->del('a');
		$this->assertTrue(CacheService::instance()->exists('a') == FALSE);
	}
}