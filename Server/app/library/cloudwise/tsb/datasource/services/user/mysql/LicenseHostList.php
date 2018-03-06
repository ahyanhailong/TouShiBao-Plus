<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 18/1/2
 * Time: 下午3:58
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class LicenseHostList extends MysqlService
{
    protected $primaryKey = 'id';
    protected $table = 'lic_host_list';
}