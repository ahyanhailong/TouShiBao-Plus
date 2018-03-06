<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/3
 * Time: 下午6:42
 */

namespace cloudwise\tsb\datasource\services\app\druid;


use cloudwise\tsb\datasource\base\DruidService;

class DruidDatabase extends DruidService
{
    public function getDbNameList()
    {
        $this->setModuleName('app');
        $this->setName('test.json');

        return $this->getResult();
    }
}