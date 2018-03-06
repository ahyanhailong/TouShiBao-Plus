<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 18/1/4
 * Time: 下午3:54
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;

class AccountType extends MysqlService
{
    protected $primaryKey = 'id';
    protected $table = 'account_type';

    public function getDataSourceTypes($account_id)
    {
        $list = $this->fetchAll(array('account_id' => $account_id));
        $service_types = array();
        foreach ($list as $item) {
            array_push($service_types, $item->data_type);
        }

        $data_types = array();
        foreach (ServiceTypeEnum::$dataSourceType as $service_type => $source_list) {
            if (array_intersect(array_keys($source_list), $service_types)) {
                array_push($data_types, $service_type);
            }
        }

        return $data_types;
    }


}