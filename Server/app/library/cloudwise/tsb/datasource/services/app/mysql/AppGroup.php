<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/12
 * Time: 下午5:40
 */

namespace cloudwise\tsb\datasource\services\app\mysql;


use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\base\MysqlService;
use App\library\Service\RESTService;


class AppGroup extends MysqlService
{
    protected $table = 'app_group_info';
    protected $primaryKey = 'app_group_id';


    public function createAppGroup($params)
    {

        if (mb_strlen($params['app_group_name']) > 30) {
            RESTService::instance()->error('too long');
        }
        if (preg_match_all('/[^a-zA-Z0-9_\x{4e00}-\x{9fa5}]/u', $params['app_group_name'])) {
            RESTService::instance()->error('Illegal characters');
        }

        try {
            if ($this->exists(array('account_id' => $params['account_id'], 'app_group_name' => $params['app_group_name']))) {
                RESTService::instance()->success('name has exsit');
            } else {
                $this->insert(array('account_id' => $params['account_id'], 'app_group_name' => $params['app_group_name'], 'create_time' => time()));
            }

        } catch (\Exception $e) {
            LogService::logException($e);
            RESTService::instance()->error('create wrong');
        }

        return true;
    }

    public function getAppGroup($params, $relationAppGroup)
    {
        $group_ids  = array();
        $group_data = $this->fetchAll(array('account_id' => $params['account_id']));
        foreach ($group_data as $item) {
            $group_ids[] = $item->app_group_id;
        }

        $relationAppGroup->setSelect(array($relationAppGroup->client->getConnection()->raw('count(app_id) as app_count'), 'app_group_id'));
        $relationAppGroup->setGroupBy('app_group_id');
        $app_list = $relationAppGroup->fetchAll(array('account_id' => $params['account_id'], 'app_group_id in' => $group_ids));

        foreach ($app_list as $key => $item) {
            $app_list[$item->app_group_id] = $item;
            unset($app_list[$key]);
        }

        foreach ($group_data as $key => $item) {

            if (isset($app_list[$item->app_group_id])) {
                $group_data[$key]->app_count = $app_list[$item->app_group_id]->app_count;
            } else {

                $group_data[$key]->app_count = 0;
            }
        }

        return $group_data;
    }


    public function updateAppGroup($params)
    {
        try {
            if ($this->exists(array('account_id' => $params['account_id'], 'app_group_name' => $params['app_group_name']))) {
                RESTService::instance()->error('name has exsit');
            } else {
                $this->update(array('app_group_name' => trim($params['app_group_name']), 'update_time' => time()), $params['app_group_id']);
            }

        } catch (\Exception $e) {
            LogService::logException($e);
            RESTService::instance()->error('update wrong');
        }

        return true;
    }

    public function deleteAppGroup($params)
    {
        try {

            if ($this->exists(array('account_id' => $params['account_id'], 'app_group_id' => $params['app_group_id']))) {

                $this->delete(array('account_id' => $params['account_id'], 'app_group_id' => $params['app_group_id']));
            } else {
                RESTService::instance()->error('invalid perform');
            }

        } catch (\Exception $e) {
            LogService::logException($e);
            RESTService::instance()->error('delete wrong');
        }

        return true;
    }

}