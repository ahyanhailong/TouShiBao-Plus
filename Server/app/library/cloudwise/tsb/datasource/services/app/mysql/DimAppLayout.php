<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/15
 * Time: 下午1:50
 */

namespace cloudwise\tsb\datasource\services\app\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use App\library\Service\RESTService;

class DimAppLayout extends MysqlService
{
    protected $table = 'dim_app_layout';
    protected $primaryKey = 'id';

    public function saveTopoLayout($params){

        $position = $params['nodes_position'];

        $select = array(
            'account_id' => $params['account_id'],
            'app_id' => $params['app_id'],
        );
        $insert = array(
            'account_id' => $params['account_id'],
            'app_id' => $params['app_id'],
            'node_position' => json_encode($position),
        );

        try {
            if ($updateId = $this->exists($select)) {
                $this->update(array('node_position' => json_encode($position)), $updateId);
            } else {
                $this->insert($insert);

            }
        } catch (\Exception $e) {
            RESTService::instance()->error('save wrong');
        }

        return true;
    }

    public function getTopoLayout($params){

        $data = $this->fetchRow( array('account_id'=>$params['account_id'],'app_id'=>$params['app_id']) );
        if($data){
            $data = json_decode($data->node_position ,1);

        }else{

            return array();
        }

        return $data;
    }

}