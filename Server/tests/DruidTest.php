<?php
use App\library\Service\Druid\App\DBService;


/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/10/29
 * Time: 下午9:07
 */
class DruidTest extends PHPUnit_YafTestCase
{

    public function testInit()
    {
        $this->getDataList();
    }

    public function getDataList(){

        $params = [
            'app_id'=>'10717101157655920',
            'account_id'=>107,
        ];
        $data = DBService::instance()->getProducerFlowChart($params);
    }

}