<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/12/11
 * Time: 上午10:13
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\datasource\constants\AppEnum;


class AppList extends Business
{

    /**
     * @var AppList
     */
    private static $self = null;

    /**
     * @return AppList
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function initListParams($params, $order = 'wt', $sort = 'desc')
    {
        $params['page']  = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $params['order'] = isset($params['order']) && $params['order'] ? $params['order'] : $order;
        $params['sort']  = isset($params['sort']) && $params['sort'] ? $params['sort'] : $sort;

        return $params;
    }

    public function getAppList($params)
    {
        $params = $this->initListParams($params);

        //获取用户主机app_id
        $app_list = self::$provider->getAppProvider()->getDimAppService()->getAppList($params);

        $app_ids    = $app_list['app_ids'];
        $app_status = $app_list['app_status'];
        $app_list   = $app_list['app_list'];

        $app_ids = AppGeneralMethod::instance()->getAppsCodeTypes($params['account_id'], $app_ids);

        //获取用户应用数据指标(目前从ES查询获取)
        $es_data = self::$provider->getAppProvider()->getAppListService()->getAppList($params, $app_ids);

        foreach ($app_list as $app_id => $item) {
            if (isset($es_data[$app_id])) {
                $app_list[$app_id]['wt']          = $es_data[$app_id]['wt'];
                $app_list[$app_id]['rpm']         = $es_data[$app_id]['rpm'];
                $app_list[$app_id]['error_count'] = $es_data[$app_id]['error_count'];
                $app_list[$app_id]['error_rate']  = $es_data[$app_id]['error_rate'];

            } else {
                $app_list[$app_id]['wt']          = '-';
                $app_list[$app_id]['rpm']         = '-';
                $app_list[$app_id]['error_count'] = '-';
                $app_list[$app_id]['error_rate']  = '-';
            }
        }

        //根据排序参数排序
        ArrayHelper::sortByUser($app_list, $params['order'], $params['sort']);
        $result = AjaxPageEnum::processPageResult($app_list, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        //获取应用分组
        $group_data = $this->getAppGroup($params);
        $result['group'] = $group_data;
        $result['app_status'] = $app_status;

        return $result;
    }


    public function getAppHealthStatus($params){

        $app_ids = AppGeneralMethod::instance()->getAppsCodeTypes($params['account_id'], $params['app_ids']);

        $es_data = self::$provider->getAppProvider()->getAppListService()->getAppHealthStatus($params ,$app_ids);

        return $es_data;
    }

    public function getHostList($params){

        //获取用户主机列表
        $host_list = self::$provider->getAppProvider()->getDimAppService()->getHostList($params);
        $host_ids = $host_list['host_ids'];
        $host_list = $host_list['data'];

        $params = $this->initListParams($params ,'cpu_rate');
        $es_data = self::$provider->getAppProvider()->getAppListService()->getHostList($params ,$host_ids);
        foreach ($host_list as $app_id=>$host_data){
            foreach ($host_data as $host_id=>$item){
                if(isset($es_data[$host_id])){
                    $host_list[$app_id][$host_id]['cpu_used'] = $es_data[$host_id]['cpu_rate'];
                    $host_list[$app_id][$host_id]['ram_used'] = $es_data[$host_id]['ram_rate'];
                    $host_list[$app_id][$host_id]['cpu_burden'] = $es_data[$host_id]['cpu_burden'];
                }
            }
        }



        return $host_list;
    }


    public function setAppStatus($params){

        $data = self::$provider->getAppProvider()->getDimAppService()->setAppStatus($params);

        return $data;
    }

    public function createAppGroup($params){
        $data = self::$provider->getAppProvider()->getAppGroupService()->createAppGroup($params);

        return $data;
    }

    public function getAppGroup($params){
        $relationAppGroup = self::$provider->getAppProvider()->getRelationshipAppGroupService();
        $data = self::$provider->getAppProvider()->getAppGroupService()->getAppGroup($params ,$relationAppGroup);

        return $data;
    }
    public function updateAppGroup($params){
        $data = self::$provider->getAppProvider()->getAppGroupService()->updateAppGroup($params);

        return $data;
    }
    public function deleteAppGroup($params){
        $data = self::$provider->getAppProvider()->getAppGroupService()->deleteAppGroup($params);

        return $data;
    }

    public function setAppGroup($params){
        $data = self::$provider->getAppProvider()->getRelationshipAppGroupService()->setAppGroup($params);

        return $data;
    }

    public function getGroupApp($params){
        $dim_app = self::$provider->getAppProvider()->getDimAppService();
        $data = self::$provider->getAppProvider()->getRelationshipAppGroupService()->getGroupApp($params ,$dim_app);

        return $data;
    }

    public function setAppName($params){
        $data = self::$provider->getAppProvider()->getDimAppService()->setAppName($params);

        return $data;
    }

    public function pauseApp($params){

        $params['end_time'] = time() * 1000;
        $params['start_time'] = (time() - AppEnum::$app_setting_pause_day[$params['pause']] * 3600 * 24) * 1000;
        $source_app_ids = self::$provider->getAppProvider()->getDimAppService()->getLiveAppIds($params);

        $app_ids = AppGeneralMethod::instance()->getAppsCodeTypes($params['account_id'], $source_app_ids);

        $live_app_ids = self::$provider->getAppProvider()->getAppListService()->getLiveApps($params,$app_ids);
        $die_app_ids = array_diff($source_app_ids,$live_app_ids);

        $data = self::$provider->getAppProvider()->getDimAppService()->pauseApp($params,$die_app_ids);

        return $data;
    }

    public function deleteAppFromGroup($params){
        $dim_app = self::$provider->getAppProvider()->getDimAppService();
        $data = self::$provider->getAppProvider()->getRelationshipAppGroupService()->deleteAppFromGroup($params ,$dim_app);

        return $data;
    }

}