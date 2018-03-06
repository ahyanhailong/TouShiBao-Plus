<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午11:12
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class LicAccountQuota extends MysqlService
{
    protected $table      = 'lic_account_quota';
    protected $primaryKey = 'id';
}