<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:47
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use Yaf\Exception;

/**
 * Class Setting
 *
 * @package cloudwise\tsb\business\app\web
 */
class Setting extends Business
{
    /**
     * @var Setting
     */
    private static $self = null;

    /**
     * @return Setting
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function getAppList($params)
    {
        $mApp = self::$provider->getAppProvider()->getDimAppService();
        $list = $mApp->getGroupAppList($params['account_id']);
        $return = [
            'ungrouped'    => [],
            'grouped_list' => [],
        ];
        foreach ($list as $item) {
            $group_id = $item->app_group_id;
            $group_name = $item->app_group_name;
            unset($item->app_group_id);
            unset($item->app_group_name);
            if (!$group_id) {
                $return['ungrouped'][] = [
                    'app_id'   => $item->app_id,
                    'app_name' => $item->app_name,
                ];
            } else {
                if (array_key_exists($group_id, $return['grouped_list'])) {
                    $return['grouped_list'][ $group_id ]['app_list'][] = ArrayHelper::objToArray($item);
                } else {
                    $return['grouped_list'][ $group_id ] = [
                        'group_name' => $group_name,
                        'group_id'   => $group_id,
                        'app_list'   => [
                            ArrayHelper::objToArray($item),
                        ],
                    ];
                }
            }
        }
        $return['grouped_list'] = array_values($return['grouped_list']);

        return $return;
    }

    public function updateAppSetting($params)
    {
        $return = [
            'msg' => "更新成功",
        ];
        $mApp = self::$provider->getAppProvider()->getDimAppService();
        $appInfo = $mApp->fetchRow(['account_id' => $params['account_id'], 'app_id' => $params['app_id']]);
        if ($appInfo) {
            if($appInfo->app_setting){
                $aSetting = json_decode($appInfo->app_setting, true);
            }else{
                $aSetting = [];
            }
            $aUpdateSetting = ArrayHelper::mergeArray($aSetting, $params['setting']);
            if ($aSetting == $aUpdateSetting) {
                $return['code'] = ErrorCodeEnum::STATUS_ERROR;
                $return['msg'] = '不需要更新';
            } else {
                $updateStatus = $mApp->update(
                    ['app_setting' => json_encode($aUpdateSetting), 'updated_time' => time()], $appInfo->id);
                if (!$updateStatus) {
                    $return['code'] = ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB;
                    $return['msg'] = '更新失败';
                }
            }
        } else {
            $return['code'] = ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB;
            $return['msg'] = '应用不存在';
        }

        return $return;
    }

    public function getWhiteList($params)
    {
        $mWhite = self::$provider->getAppProvider()->getAppWhiteList();
        $mWhite->setSelect(['id', 'uri', 'created_time', 'value']);
        $list = $mWhite->fetchAll(
            [
                'account_id'    => $params['account_id'],
                'app_id'        => $params['app_id'],
                'type'          => $params['type'],
                'delete_status' => AppEnum::APP_ERROR_EX_DELETE_STATUS_NO,
            ]);
        $return = [];
        foreach ($list as $index => $item) {
            $tmp = (array)$item;
            if ($params['type'] == AppEnum::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE) {
                $tmp['uri'] = json_decode($tmp['uri'], true);
            }
            $return[] = $tmp;
        }
        $return = AjaxPageEnum::processPageResult($return, $params['page'], $params['page_size']);

        return $return;
    }

    public function getWhiteItem($params)
    {
        $return = [];
        $mWhite = self::$provider->getAppProvider()->getAppWhiteList();
        $mWhite->setSelect(['id', 'uri', 'value', 'created_time']);
        $mWhiteInfo = $mWhite->fetchRow(
            [
                'account_id'    => $params['account_id'],
                'app_id'        => $params['app_id'],
                'type'          => $params['type'],
                'delete_status' => AppEnum::APP_ERROR_EX_DELETE_STATUS_NO,
                'id'            => $params['id'],
            ]);
        if ($mWhiteInfo) {
            $return = (array)$mWhiteInfo;

            if ($params['type'] == AppEnum::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE) {
                $return['uri'] = json_decode($return['uri'], true);
            }
        }

        return $return;
    }

    public function addOrUpdateWhite($params)
    {
        $return = [];
        $mWhite = self::$provider->getAppProvider()->getAppWhiteList();
        $mWhite->Bind($params);
        if (array_key_exists('id', $params)) {
            $return['data'] = $params['id'];
            if ($msg = $mWhite->selfUpdate()) {
                if ($msg == 'exists') {
                    $return['code'] = ErrorCodeEnum::STATUS_ERROR;
                    $return['msg'] = '未更改';
                } else {
                    $return['msg'] = '更新成功';
                }
            } else {
                $return['code'] = ErrorCodeEnum::STATUS_ERROR;
                $return['msg'] = '更新失败';
            }
        } else {
            $return = [];
            if ($id = $mWhite->selfInsert()) {
                $return['msg'] = '添加成功';
                $return['data'] = $id;
            } else {
                $return['code'] = ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB;
                $return['msg'] = '添加失败';
            }
        }

        return $return;
    }

    public function deleteWhite($params)
    {
        $mAppWhite = self::$provider->getAppProvider()->getAppWhiteList();
        if ($mAppWhite->exists(
            ['id' => $params['id'], 'account_id' => $params['account_id'], 'app_id' => $params['app_id']])
        ) {
            $update = [
                'updated_time'  => time(),
                'delete_status' => AppEnum::APP_ERROR_EX_DELETE_STATUS_YES,
                'status'        => AppEnum::APP_ERROR_EX_WHITE_DISPATCH_WAIT,
            ];
            if ($mAppWhite->update($update, ['id' => $params['id']])) {
                return [
                    'msg' => '删除成功',
                ];
            } else {
                return [
                    'msg'  => '删除失败',
                    'code' => ErrorCodeEnum::STATUS_ERROR,
                ];
            }
        } else {
            return [
                'msg'  => '不存在的信息',
                'code' => ErrorCodeEnum::STATUS_ERROR,
            ];
        }
    }

    public function getExceptionMsg($params)
    {
        $es_data = self::$provider->getAppProvider()->getSettingService()->getExceptionMsg($params);

        return $es_data;
    }

    public function getAppSetting($params)
    {
        $return = AppEnum::getDefaultAppSetting();
        $mApp = self::$provider->getAppProvider()->getDimAppService();
        $appInfo = $mApp->fetchRow(['account_id' => $params['account_id'], 'app_id' => $params['app_id']]);
        if ($appInfo && $appInfo->app_setting) {
            $aSetting = json_decode($appInfo->app_setting, true);
            $return = ArrayHelper::mergeArray($return, $aSetting);
        }

        $return['app_name'] = $appInfo->app_name;
        return $return;
    }

    public function updateAppName($params)
    {
        $mApp = self::$provider->getAppProvider()->getDimAppService();
        $app = $mApp->fetchRow(['account_id' => $params['account_id'], 'app_id' => $params['app_id']]);
        if ($app) {
            if ($app->app_name == $params['app_name']) {
                return [
                    'code' => ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB_REPEAT,
                    'msg'  => '应用名称重复',
                ];
            } else {
                $updateStatus = $mApp->update(['updated_time' => time(), 'app_name' => $params['app_name']], $app->id);
                if ($updateStatus) {
                    return [
                        'msg' => '更新成功',
                    ];
                } else {
                    return [
                        'code' => ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB,
                        'msg'  => '更新失败',
                    ];
                }
            }
        }
    }


    // 获取应用配置,Agent版本路径等信息
    public function getPluginInfo($params){

        $mPluginBank = self::$provider->getAppProvider()->getPluginBankService();
        $data = $mPluginBank->getAgentInfo($params);

        return $data;
    }


}