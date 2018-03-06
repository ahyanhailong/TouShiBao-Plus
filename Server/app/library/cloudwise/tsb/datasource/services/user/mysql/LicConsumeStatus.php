<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 18/1/2
 * Time: 下午3:28
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class LicConsumeStatus extends MysqlService
{

    protected $primaryKey = 'id';
    protected $table = 'lic_consume_status';
}