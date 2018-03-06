<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/12
 * Time: 下午6:00
 */

namespace cloudwise\tsb\datasource\services\app\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use App\library\Service\RESTService;


class RelationshipAppGroup extends MysqlService
{
    protected $table = 'relationship_app_group';
    protected $primaryKey = 'id';

    public function setAppGroup($params)
    {
        try {
            $aInsertData = array();
            $this->transStart();

            $this->delete( array('account_id'=>$params['account_id'],'app_id in'=>$params['app_ids']) );
            foreach ($params['app_ids'] as $app_id){
                $inset = [
                    'account_id'   => $params['account_id'],
                    'app_id'       => $app_id,
                    'app_group_id' => $params['app_group_id']
                ];

                array_push($aInsertData, $inset);
            }

            $this->insert($aInsertData);
            $this->transCommit();


        } catch (\Exception $e) {
            $this->transRollBack();
            LogService::logException($e);
            RESTService::instance()->error('set wrong');
        }

        return true;
    }

    public function getGroupApp($params ,$dim_app){

        $group_app_ids = $data = array();
        $group_app = $this->fetchAll(array('account_id'=>$params['account_id'],'app_group_id'=>$params['app_group_id']));
        foreach ($group_app as $item){
            $group_app_ids[] = $item->app_id;
        }

        $dim_app->setSelect(array('app_name', 'app_id', 'port'));
        $app_data = $dim_app->fetchAll( array('account_id'=>$params['account_id'],'app_id in'=>$group_app_ids) );
        $dim_app->removeSelect();

        foreach ($app_data as $item){
            if(isset($params['name']) && $params['name']){
                if(strstr($item->app_name.':'.$item->port,$params['name'])){
                    $data[] = [
                        'app_id'=>$item->app_id,
                        'name'=>$item->app_name.':'.$item->port,
                        'group_name'=>$params['app_group_name'],
                    ];
                }
            }else{
                $data[] = [
                    'app_id'=>$item->app_id,
                    'name'=>$item->app_name.':'.$item->port,
                    'group_name'=>$params['app_group_name'],
                ];
            }

        }

        return $data;
    }

    public function deleteAppFromGroup($params){

        if($this->exists( array('account_id'=>$params['account_id'],'app_id'=>$params['app_id']) )){
            $this->delete( array('account_id'=>$params['account_id'],'app_id'=>$params['app_id']) );
        }else{
            RESTService::instance()->error('delete wrong');
        }

        return true;
    }

}