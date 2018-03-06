<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午8:39
 */

namespace cloudwise\tsb\datasource\services\app\es;

use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\base\LogService;


class SettingService extends ESService
{
    public $fields = [
        'start_time' => [
            'type'  => 'gt',
            'field' => 'collTime',
        ],
        'end_time'   => [
            'type'  => 'lte',
            'field' => 'collTime',
        ],
        'app_id'     => [
            'type'  => 'term',
            'field' => 'app_id',
        ],
        'exception'  => [
            'type'  => 'term',
            'field' => 'exception',
        ],
        'search_ex'  => [
            'type'  => 'regexp',
            'field' => 'errorMsg_raw',
        ],
    ];

    public function getExceptionMsg($params)
    {
        $return = [];
        $params['exception'] = 1;
        $params['nest_path'] = 'nest_sub_methods';
        $aQueryParams = $this->getNewQueryParams($params, ['app_id', 'account_id', 'start_time', 'end_time']);
        $aQueryParams['nest_query'] = $this->setFilterQuery(
            $params, $this->getFields(['exception', 'search_ex']), 'nest_sub_methods');
//        dd($aQueryParams);
        $aTplParams = $this->renderQueryParams($this->getTplPath(__METHOD__), $aQueryParams);
//        $this->ddTpl($aTplParams);
        try{
            $result = $this->client->search($aTplParams);
            if($result['aggregations']){
                foreach($result['aggregations']['nest']['filter']['exception']['buckets'] as $exception){
                    $return[] = $exception['key'];
                }
            }

            return $return;
        }catch(\Exception $e){
            LogService::logException($e);

            return $return;
        }

    }
}