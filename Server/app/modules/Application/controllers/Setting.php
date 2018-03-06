<?php
use cloudwise\tsb\business\app\web\Setting;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:04
 */
class SettingController extends BaseController
{
    public function setParams()
    {
        $field_array = [
            'transaction' => AppEnum::SETTING_BASIC,
            'topology'    => AppEnum::SETTING_TOPO,
            'host'        => AppEnum::SETTING_HOST,
            'sql'         => AppEnum::SETTING_SQL,
            'db'          => AppEnum::SETTING_DB,
        ];

        if (!array_key_exists($this->params['type'], $field_array)) {
            $this->rest->error('配置类型错误');
        }

        $this->params['setting'][ $field_array[ $this->params['type'] ] ] = $this->params['params'];
    }

    public function getAppListAction()
    {
        $data = Setting::instance()->getAppList($this->params);
        $this->rest->success($data);
    }

    /**
     * 设置应用参数
     */
    public function updateAppSettingAction()
    {
        $this->setParams();
        $return = Setting::instance()->updateAppSetting($this->params);
        $this->rest->checkReturn($return);
    }

    /**
     * 获取错误/异常白名单
     */
    public function getWhiteListAction()
    {
        $field_map = [
            'error'     => AppEnum::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE,
            'exception' => AppEnum::APP_ERROR_EX_TYPE_JAVA_EXCEPTION,
        ];
        $this->params['type'] = ArrayHelper::extractValueFromArray(['type', $this->params, 'error'], $field_map);
        $data = Setting::instance()->getWhiteList($this->params);
        $this->rest->success($data);
    }

    /**
     * 获取单条错误或异常信息
     */
    public function getWhiteItemAction()
    {
        $field_map = [
            'error'     => AppEnum::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE,
            'exception' => AppEnum::APP_ERROR_EX_TYPE_JAVA_EXCEPTION,
        ];
        $this->params['type'] = ArrayHelper::extractValueFromArray(['type', $this->params, 'error'], $field_map);
        $data = Setting::instance()->getWhiteItem($this->params);
        $this->rest->success($data);
    }

    /**
     * 添加错误白名单
     */
    public function addOrUpdateErrorWhiteAction()
    {
        $this->params['value'] = $this->params['error_code'];
        $this->params['type'] = AppEnum::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE;
        $return = Setting::instance()->addOrUpdateWhite($this->params);
        $this->rest->checkReturn($return);
    }

    /**
     * 添加异常白名单
     */
    public function addOrUpdateExceptionWhiteAction()
    {
        $this->params['value'] = $this->params['description'];
        $this->params['type'] = AppEnum::APP_ERROR_EX_TYPE_JAVA_EXCEPTION;
        $return = Setting::instance()->addOrUpdateWhite($this->params);
        $this->rest->checkReturn($return);
    }

    /**
     * 删除白名单
     */
    public function deleteWhiteAction()
    {
        $return = Setting::instance()->deleteWhite($this->params);
        $this->rest->checkReturn($return);
    }

    /**
     * 获取异常描述列表
     */
    public function getExceptionMsgAction()
    {
        $data = Setting::instance()->getExceptionMsg($this->params);
        $this->rest->success($data);
    }

    /**
     * 获取应用设置
     */
    public function getAppSettingAction()
    {
        $data = Setting::instance()->getAppSetting($this->params);
        $this->rest->success($data);
    }

    /**
     * 更新应用名称
     */
    public function updateAppNameAction()
    {
        $data = Setting::instance()->updateAppName($this->params);
        $this->rest->checkReturn($data);
    }



    /**
     *  获取应用配置,Agent版本路径等信息
     */
    public function getPluginInfoAction()
    {
        $data = Setting::instance()->getPluginInfo($this->params);
        $this->rest->success($data);
    }
}