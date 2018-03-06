<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/27
 * Time: 下午6:19
 */

namespace cloudwise\tsb\datasource\constants;


/**
 * 参数及路由验证枚举
 * Class ParamsEnum
 *
 * @package cloudwise\tsb\datasource\constants
 */
class ParamsEnum
{
    //应用拓扑图
    const APPLICATION_TOPO_GETTOPODATA = 'ApplicationTopoGetTopoData';

    //应用关键事务
    const APPLICATION_KEYTRANSACTION_GETPROFILINGRESPTIMEANDCOUNTDATAMIXED = 'ApplicationKeyTransactionGetProfilingRespTimeAndCountDataMixed';

    //应用对比分析
    const APPLICATION_COMPARATIVEANALYSIS_GETURILIST = 'ApplicationComparativeAnalysisGetUriList';

    //应用外部服务
    const APPLICATION_EXTERNALSERVICE_GETURLLIST = 'ApplicationExternalServiceGetUrlList';

    //应用错误
    const APPLICATION_ERROR_GETERRORANDEXCEPTIONTRENDCHART = 'ApplicationErrorGetErrorAndExceptionTrendChart';

    //应用nosql
    const APPLICATION_NOSQL_GETMOUDLEANDINSTANCELIST = 'ApplicationNosqlGetMoudleAndInstanceList';

    //应用设置
    const APPLICATION_SETTING_CREATEAPPDETAILSETTING = 'ApplicationSettingCreateAppDetailSetting';

    //应用消息队列
    const APPLICATION_MESSAGEQUEEN_GETPRODUCERINSTANCELIST = 'ApplicationMessageQueenGetProducerInstanceList';

    //列出的参数是必须的
    /**
     * @var array
     */
    public static $aParamsList = [

        self::APPLICATION_MESSAGEQUEEN_GETPRODUCERINSTANCELIST                          => [
            'app_id' => '',
        ],
        self::APPLICATION_SETTING_CREATEAPPDETAILSETTING                                => [
            'app_id' => '',
        ],
        self::APPLICATION_NOSQL_GETMOUDLEANDINSTANCELIST                                => [
            'app_id' => '',
        ],
        self::APPLICATION_ERROR_GETERRORANDEXCEPTIONTRENDCHART                          => [
            'app_id' => '',
        ],
        self::APPLICATION_EXTERNALSERVICE_GETURLLIST                                    => [
            'app_id' => '',
        ],
        self::APPLICATION_COMPARATIVEANALYSIS_GETURILIST                                => [
            'app_id' => '',
        ],

        self::APPLICATION_KEYTRANSACTION_GETPROFILINGRESPTIMEANDCOUNTDATAMIXED          => [
            'app_id' => '',
        ],
        self::APPLICATION_TOPO_GETTOPODATA                                              => [
            'app_id' => '',
        ],
    ];

    const MODULE_NAME_APPLICATION = 'Application';
    const MODULE_NAME_HOST = 'Host';
    const MODULE_NAME_MOBILE = 'Mobile';
    const MODULE_NAME_ACCOUNT = 'Account';
    const MODULE_NAME_BROWSER = 'Browser';

    /**
     * 获取模块对应的参数配置
     *
     * @param $sModuleName
     * @param $sControllerName
     *
     * @return array|void
     */
    public static function getRouteParams($sModuleName, $sControllerName)
    {
        $params = [];
        switch ($sModuleName) {
            case self::MODULE_NAME_APPLICATION:
                $params = AppParamsEnum::getControllerParams($sControllerName);
                break;
            case self::MODULE_NAME_HOST:
                $params = HostParamsEnum::getControllerParams($sControllerName);
                break;
            case self::MODULE_NAME_MOBILE:
                $params = MobileParamsEnum::getControllerParams($sControllerName);
                break;
            case self::MODULE_NAME_ACCOUNT:
                $params = AccountParamsEnum::getControllerParams($sControllerName);
                break;
            case self::MODULE_NAME_BROWSER:
                $params = BrowserParamsEnum::getControllerParams($sControllerName);
                break;
        }

        return $params;
    }
}