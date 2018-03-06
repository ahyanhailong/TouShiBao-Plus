<?php
use cloudwise\tsb\business\app\web\AppList;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\business\app\web\Setting;

/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/11
 * Time: 上午10:12
 */
class AppListController extends BaseController
{

    public function setSlowParams()
    {
        $aBasicSetting = Setting::instance()->getAppSetting($this->params);
        $this->params['slow'] = $aBasicSetting[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_SLOW];
        $this->params['very_slow'] = $aBasicSetting[AppEnum::SETTING_BASIC][AppEnum::SETTING_BASIC_VERY_SLOW];
        $this->params['topo_setting'] = $aBasicSetting[AppEnum::SETTING_TOPO];
    }

    public function getAppListAction()
    {
        $this->params['start_time'] = (time() - 3600) * 1000;
        $this->params['end_time']   = time() * 1000;
        $data = AppList::instance()->getAppList($this->params);
        $this->rest->success($data);
    }

    public function getAppHealthStatusAction()
    {
        $this->setSlowParams();
        $this->params['start_time'] = (time() - 3600) * 1000;
        $this->params['end_time']   = time() * 1000;
        $data = AppList::instance()->getAppHealthStatus($this->params);
        $this->rest->success($data);
    }

    public function getHostListAction()
    {
        $this->params['start_time'] = (time() - 3600) * 1000;
        $this->params['end_time']   = time() * 1000;
        $data = AppList::instance()->getHostList($this->params);
        $this->rest->success($data);
    }

    public function setAppStatusAction()
    {

        $data = AppList::instance()->setAppStatus($this->params);
        $this->rest->success($data);
    }

    public function createAppGroupAction()
    {

        $data = AppList::instance()->createAppGroup($this->params);
        $this->rest->success($data);
    }


    public function getAppGroupAction()
    {

        $data = AppList::instance()->getAppGroup($this->params);
        $this->rest->success($data);
    }

    public function updateAppGroupAction()
    {

        $data = AppList::instance()->updateAppGroup($this->params);
        $this->rest->success($data);
    }

    public function deleteAppGroupAction()
    {

        $data = AppList::instance()->deleteAppGroup($this->params);
        $this->rest->success($data);
    }

    public function setAppGroupAction()
    {

        $data = AppList::instance()->setAppGroup($this->params);
        $this->rest->success($data);
    }

    public function getGroupAppAction()
    {

        $data = AppList::instance()->getGroupApp($this->params);
        $this->rest->success($data);
    }

    public function setAppNameAction()
    {

        $data = AppList::instance()->setAppName($this->params);
        $this->rest->success($data);
    }

    public function pauseAppAction()
    {

        $data = AppList::instance()->pauseApp($this->params);
        $this->rest->success($data);
    }

    public function deleteAppFromGroupAction()
    {

        $data = AppList::instance()->deleteAppFromGroup($this->params);
        $this->rest->success($data);
    }

}