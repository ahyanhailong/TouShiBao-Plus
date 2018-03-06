<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/3
 * Time: 下午6:16
 */

namespace cloudwise\tsb\datasource\services\app\es;


use cloudwise\tsb\datasource\base\ESService;

class EsDatabase extends ESService
{
    public function getDatabaseData()
    {
        $params = [
            'index' => 'phptopic_20171103',
            'size'  => 1,
        ];
        $params = $this->renderQueryParams('app/getDatabaseData', $params);
        $result = $this->client->search($params);

        return $result;
    }
}