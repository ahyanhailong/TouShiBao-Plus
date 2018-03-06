<?php
use App\library\Service\ParamsService;
use Yaf\Dispatcher;
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/1
 * Time: 上午11:44
 */

class RouterTest extends PHPUnit_YafTestCase
{
    public function testInit()
    {
        ParamsService::instance()->initRouter();
        echo json_encode(array_keys(Dispatcher::getInstance()->getRouter()->getRoutes()));
    }
}