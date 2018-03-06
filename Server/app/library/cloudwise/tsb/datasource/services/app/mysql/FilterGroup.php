<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/24
 * Time: 上午9:43
 */

namespace cloudwise\tsb\datasource\services\app\mysql;
use cloudwise\tsb\datasource\base\MysqlService;


class FilterGroup extends MysqlService
{
    protected $table = 'mobile_http_params';
    protected $primaryKey = 'id';

}