<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/6
 * Time: 下午5:34
 */

namespace cloudwise\tsb\datasource\services\app\mysql;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\base\MysqlService;
use App\library\Service\RESTService;


class keyAffairs extends MysqlService
{
    protected $table = 'critical_business';
    protected $primaryKey = 'business_id';

    const BUSINESS_TYPE_SINGLE = 1;   //单一事务
    const BUSINESS_TYPE_COMBINE = 2;  //归类事务

    public function getBusinessList($params)
    {
        $list = $this->client->table($this->table)
            ->where('app_id', '=', $params['app_id'])
            ->where('account_id', '=', $params['account_id'])
            ->get();

        return $list;
    }

    public function createKeyTransaction($params){

        try {
            //存在,返回提醒
            if ($this->exists(array('account_id' => $params['account_id'], 'app_id' => $params['app_id'], 'name' => $params['name']))) {
                RESTService::instance()->success('name has exisit');
            } else {

                $insert = [
                    'app_id'     => $params['app_id'],
                    'account_id' => $params['account_id'],
                    'name'       => $params['name'],
                    'uri'        => $params['uri'],
                    'apdex'      => $params['app_id'],
                    'value'     => 1,
                    'created_time'=>time(),
                    'type'=>$params['business_type'],
                ];

                $this->insert($insert);
            }
        }catch (\Exception $e){
            LogService::logException($e);
            RESTService::instance()->error('invalid params');
        }

        return true;
    }

    public function deleteTransaction($params){

        try{

            $this->transStart();
            if($this->exists(array('business_id'=>$params['business_id'],'account_id'=>$params['account_id']))){
                $this->delete( array('business_id'=>$params['business_id'],'account_id'=>$params['account_id']) );
            }
            $this->transCommit();
        }catch (\Exception $e){
            $this->transRollBack();
            LogService::logException($e);
            RESTService::instance()->error('delete wrong');
        }

        return true;
    }

    public function updateTransaction($params){

        //是否存在,存在更新,不存在错误
        if($this->exists(array('business_id'=>$params['business_id'],'account_id'=>$params['account_id']))){
            $update = [
                'name'       => $params['name'],
                'uri'        => $params['uri'],
                'apdex'      => $params['apdex'],
                'updated_time'=>time(),
                'type'=>$params['business_type'],
            ];

            $this->update($update,array('business_id'=>$params['business_id'],'account_id'=>$params['account_id']));
        }else{
            RESTService::instance()->error('transaction not exist');
        }
        return true;
    }

    public function getSingleTransactionData($params)
    {
        $result = $this->fetchRow(array('business_id' => $params['business_id'], 'account_id' => $params['account_id']));

        return $result;
    }

    public function getKeyTransaction($params){
        $result = array();
        $params['name'] = isset($params['name']) ? $params['name'] : '';
        $data = $this->client->table($this->table)
            ->where('app_id', '=', $params['app_id'])
            ->where('account_id', '=', $params['account_id'])
            ->where('uri', 'like', '%'.$params['name'].'%')
            ->get();

        if($data){
            foreach ($data as $item){
                $result[urlencode($item->uri)] = e(urlencode($item->uri));
            }
        }

        return  $result;
    }


}