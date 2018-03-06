<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/10/25
 * Time: 下午12:04
 */

namespace cloudwise\tsb\datasource\constants;


class AppModuleEnum
{
    //定义接口,及其参数
    const GET_OVER_DB_TREND_LINE = 'getoverdbtrendline';

    public static $methodParams = [
        self::GET_OVER_DB_TREND_LINE => [
            'app_id',

        ],
    ];

}