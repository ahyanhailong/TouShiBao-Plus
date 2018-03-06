<?php

use App\library\Service\MailService;

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/30
 * Time: 下午5:39
 */

class MailTest extends PHPUnit_YafTestCase
{
	public function testInit()
	{
		$result = MailService::instance()->sendMail('This is a Test', ['bear.zheng@yunzhihui.com', '912804875@qq.com'], 'This is Content');

		var_dump($result);
	}
}