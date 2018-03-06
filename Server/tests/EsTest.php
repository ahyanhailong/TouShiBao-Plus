<?php

use App\library\Service\ESService;
use cloudwise\tsb\business\app\web\RelationDb;

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/31
 * Time: 上午11:53
 */
class EsTest extends PHPUnit_YafTestCase
{
	public function testInit()
	{
//		$this->getDayTimeIndex();
//		$this->getDayIndex();
//        $this->saveRelationDbFiltrationCondition();
        $this->getRelationDbFiltrationCondition();
//        $this->deleteRelationDbFiltrationCondition();
	}

	public function getDayTimeIndex()
	{
		$start_time = mktime(5, 0, 0, 10, 31, 2017) * 1000;
		$end_time = mktime(6, 0, 0, 10, 31, 2017) * 1000;
		$this->assertTrue(array('2017103105', '2017103106') == ESService::instance()->getDayTimeIndex($start_time, $end_time, ElasticSearchEnum::INDEX_TYPE_HOUR));
	}

	public function getDayIndex()
	{
		$start_time = mktime(0, 0, 0, 10, 30, 2017) * 1000;
		$end_time = mktime(0, 0, 0, 10, 31, 2017) * 1000;
		$this->assertTrue('agenttopic_20171030,agenttopic_20171031' == ESService::instance()->getESIndex(ServiceTypeEnum::TYPE_DOCKER, $start_time, $end_time));
	}

    public function saveRelationDbFiltrationCondition(){
        $params = [
            'params'=>[
                'domian'=>[
                    'baidu.com',
                    'tousshibao.com'
                ],
                'version'=>[
                    '1.2.9',
                    '1.3.1',
                ],
            ],

            'account_id'=>107,
            'record_id'=>129,
            'app_id'=>'8836450120768828',
        ];
        $data = RelationDb::instance()->saveRelationDbFiltrationCondition($params);
        echo '参数----'.json_encode($params)."\n";
        echo 'result----:'.$data;
    }

    public function getRelationDbFiltrationCondition(){
        $params = [

            'account_id'=>107,
            'record_id'=>'',
            'app_id'=>'8836450120768828',
        ];
        $data = RelationDb::instance()->getRelationDbFiltrationCondition($params);
        echo 'result----:'.json_encode($data);
    }

    public function deleteRelationDbFiltrationCondition(){
        $params = [

            'account_id'=>107,
            'record_id'=>129,
            'app_id'=>'8836450120768828',
        ];
        $data = RelationDb::instance()->deleteRelationDbFiltrationCondition($params);
        echo 'result----:'.json_encode($data);
    }

}