<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/3
 * Time: 下午5:58
 */

namespace cloudwise\tsb\datasource\services\app\mysql;

use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\business\account\User;
use App\library\Service\RESTService;

class DimApp extends MysqlService
{
    protected $table = 'dim_app';
    protected $primaryKey = 'id';


    public function getAppGroupFilterList($account_id, $app_id)
    {
        $return = array(
            'group'    => array(),
            'no_group' => array(),
        );

        try {
            $group_list    = $this->client->getConnection()->select('select dim_app.app_id,dim_app.app_name,dim_app.port,app_group_info.app_group_name from dim_app left join relationship_app_group on relationship_app_group.app_id=dim_app.app_id and relationship_app_group.account_id=dim_app.account_id left join app_group_info on app_group_info.app_group_id=relationship_app_group.app_group_id where dim_app.status=' . AppEnum::APP_SWITCH_STATUS_ON . ' and dim_app.account_id=' . $account_id . ' and dim_app.app_type in(' . AppEnum::APP_TYPE_DOMAIN . ',' . AppEnum::APP_TYPE_RUM_AND_DOMAIN . ');');
            $group_app_ids = array(0);
            if ($group_list) {
                foreach ($group_list as $group_info) {
                    if (!$group_info->app_group_name) {
                        continue;
                    }
                    $return['group'][$group_info->app_group_name] = array();
                    $group_app_ids[]                              = $group_info->app_id;
                }
                foreach ($group_list as $group_info) {
                    if (!$group_info->app_group_name) {
                        continue;
                    }
                    $return['group'][$group_info->app_group_name][$group_info->app_id] = $group_info->app_name . ':' . $group_info->port;
                }
            }

            $app_list = $this->client->table($this->table)
                ->where('account_id', '=', $account_id)
                ->whereIn('app_type', array(AppEnum::APP_TYPE_DOMAIN, AppEnum::APP_TYPE_RUM_AND_DOMAIN))
                ->where($this->table . '.status', '=', AppEnum::APP_SWITCH_STATUS_ON)
                ->whereNotIn('app_id', $group_app_ids)
                ->get(array('app_id', 'app_name', 'port'));
            if ($app_list) {
                foreach ($app_list as $app) {
                    $return['no_group'][$app->app_id] = $app->app_name . ':' . $app->port;
                }
            }
        } catch (\Exception $e) {
            LogService::logException($e);
        }

        return $return;
    }

    public function getAppList($params)
    {
        //开启暂停,以及模糊匹配
        $params['status']   = isset($params['status']) && $params['status'] ? (int)$params['status'] : AppEnum::APP_SWITCH_STATUS_ON;
        $params['name']     = isset($params['name']) ? $params['name'] : '';
        $params['group_id'] = isset($params['group_id']) ? $params['group_id'] : '';
        $app_ids            = $result_app_ids = array();
        $result             = array();

        //获取权限管理的应用黑名单
        $user_id       = User::instance()->getUserCache()->user_id;
        $black_app_ids = $this->getTargetTypeListForUser($user_id, AppEnum::APP_TYPE_DOMAIN);

        $where = [
            'account_id'  => $params['account_id'],
            'status'      => $params['status'],
            'app_type in' => array(AppEnum::APP_TYPE_DOMAIN, AppEnum::APP_TYPE_RUM_AND_DOMAIN),
            'created_by'  => AppEnum::APP_CREATED_BY_SYS,
        ];

        if ($black_app_ids) {
            $where['app_id not in'] = $black_app_ids;
        }

        $this->setSelect(array('app_id', 'app_name', 'port', 'pause_info'));
        $app_list = $this->fetchAll($where);
        if ($app_list) {
            foreach ($app_list as $key => $item) {
                if ($params['name'] && !strstr($item->app_name . ':' . $item->port, trim($params['name']))) {
                    unset($app_list[$key]);
                    continue;
                }
                $app_ids[] = $item->app_id;

                $result[$item->app_id] = [
                    'app_id'     => $item->app_id,
                    'app_name'   => $item->app_name . ':', $item->port,
                    'group_id'   => '-',
                    'group_name' => '-',
                ];

                if ($item->pause_info && $params['status'] == AppEnum::APP_SWITCH_STATUS_OFF) {
                    $pause_info                          = json_decode($item->pause_info, true);
                    $result[$item->app_id]['start_time'] = date('Y-m-d H:i', $pause_info['pause_time']);
                    $result[$item->app_id]['last_time']  = TimeRangeEnum::getTimeFormat(time() - $pause_info['pause_time']);
                    $result[$item->app_id]['user_name']  = $pause_info['user_name'];
                }
            }
        }

        //获取应用分组
        $group_list = $this->getAppGroupByAppId($params['account_id'], $app_ids);

        if ($group_list) {
            foreach ($result as $key => $item) {
                if (isset($group_list[$item['app_id']])) {
                    $result[$key]['group_id']   = $group_list[$item['app_id']]['group_id'];
                    $result[$key]['group_name'] = $group_list[$item['app_id']]['group_name'];
                }

                $result_app_ids[$key] = $item['app_id'];
                //根据group_id进行分组过滤
                if ($params['group_id'] && $result[$key]['group_id'] != $params['group_id']) {
                    unset($result[$key]);
                    unset($result_app_ids[$key]);
                }
            }
        }

        //获取关闭和开启的应用数
        $sWhere = [
            'account_id = ?' => $params['account_id'],
            'app_type in ?'  => array(AppEnum::APP_TYPE_DOMAIN, AppEnum::APP_TYPE_RUM_AND_DOMAIN),
        ];

        if ($black_app_ids) {
            $sWhere['app_id not in ?'] = $black_app_ids;
        }

        $this->removeSelect();
        $this->setSelect(array('status', $this->client->getConnection()->raw('count(distinct(app_id)) as count')));
        $this->setGroupBy('status');

        $ret = $this->fetchAll($sWhere);
        $this->removeGroupBy();
        $app_status = array();
        foreach ($ret as $obj) {
            $app_status[$obj->status] = $obj->count;
        }

        return array('app_list' => $result, 'app_ids' => array_values($result_app_ids), 'app_status' => $app_status);
    }


    public function getTargetTypeListForUser($user_id, $target_type)
    {
        $target_list = $this->client->table('user_info')
            ->leftJoin('relationship_group_user', 'relationship_group_user.user_id', '=', 'user_info.user_id')
            ->where('user_info.user_id', '=', $user_id)
            ->where('group_privilege.target_type', '=', $target_type)
            ->leftJoin('group_privilege', 'group_privilege.group_id', '=', 'relationship_group_user.group_id')
            ->select('group_privilege.target_list')
            ->first();

        if ($target_list) {
            return json_decode($target_list->target_list, true);
        } else {
            return array();
        }
    }

    /**
     * 根据app_id查询分组信息.
     */
    public function getAppGroupByAppId($account_id, $app_ids)
    {
        $data   = array();
        $result = $this->client->table('relationship_app_group')
            ->leftJoin('app_group_info', 'relationship_app_group.app_group_id', '=', 'app_group_info.app_group_id')
            ->whereIn('relationship_app_group.app_id', $app_ids)
            ->where('relationship_app_group.account_id', '=', $account_id)
            ->get();

        foreach ($result as $item) {
            $data[$item->app_id] = [
                'group_name' => $item->app_group_name,
                'group_id'   => $item->app_group_id,
            ];
        }

        return $data;
    }


    public function getHostList($params)
    {
        $result = $host_ids = array();

        $host_list = $this->getHostInfoByAppIds($params['app_ids'], $params['account_id']);
        $host_ids  = $host_list['host_ids'];
        $host_list = $host_list['data'];
        foreach ($params['app_ids'] as $app_id) {
            if (isset($host_list[$app_id])) {
                foreach ($host_list[$app_id] as $obj) {
                    $result[$app_id][$obj->host_id] = [
                        'host_name'  => $obj->host_name,
                        'hoat_id'    => $obj->host_id,
                        'cpu_used'   => '-',
                        'ram_used'   => '-',
                        'cpu_burden' => '-',
                    ];
                }
            } else {
                $result[$app_id] = [];
            }
        }

        return array('data' => $result, 'host_ids' => $host_ids);
    }

    //根据app_id获取主机id
    public function getHostInfoByAppIds($app_ids, $account_id)
    {
        $data = $host_ids = array();
        $info = $this->client->table('relationship_app_host')
            ->select('dim_host.host_id', 'relationship_app_host.app_id', 'dim_host.host_name')
            ->leftJoin('dim_host', 'relationship_app_host.host_id', '=', 'dim_host.host_id')
            ->where('relationship_app_host.account_id', '=', $account_id)
            ->whereIn('relationship_app_host.app_id', $app_ids)
            ->get();

        if ($info) {
            foreach ($info as $item) {
                $data[$item->app_id][] = $item;
                $host_ids[]            = $item->host_id;
            }
        }

        return array('data' => $data, 'host_ids' => $host_ids);
    }


    public function setAppStatus($params)
    {

        $where = [
            'app_id in'  => $params['app_ids'],
            'account_id' => $params['account_id'],
        ];
        try {
            if ($params['status'] == AppEnum::APP_SWITCH_STATUS_OFF) {
                $pause_info = [
                    'pause_time' => time(),
                    'user_name'  => User::instance()->getUserCache()->user_name,
                    'user_id'    => User::instance()->getUserCache()->user_id,
                ];
                $update     = $this->update(array('status' => $params['status'], 'pause_info' => json_encode($pause_info)), $where);
            } elseif ($params['status'] == AppEnum::APP_SWITCH_STATUS_ON) {
                $update = $this->update(array('status' => $params['status']), $where);
            }
        } catch (\Exception $e) {
            RESTService::instance()->error('set wrong');
            LogService::logException($e);
        }

        return true;
    }


    public function setAppName($params)
    {
        if ($this->exists(array('account_id' => $params['account_id'], 'app_name' => $params['app_name']))) {
            RESTService::instance()->error('name has exsit');
        } else {
            $this->update(array('app_name' => $params['app_name']), array('account_id' => $params['account_id'], 'app_id' => $params['app_id']));
        }

        return true;
    }

    public function getLiveAppIds($params)
    {
        $data  = array();
        $where = [
            'account_id'  => $params['account_id'],
            'status'      => AppEnum::APP_SWITCH_STATUS_ON,
            'app_type in' => array(AppEnum::APP_TYPE_DOMAIN, AppEnum::APP_TYPE_RUM_AND_DOMAIN),
            'created_by'  => AppEnum::APP_CREATED_BY_SYS,
        ];

        $this->setSelect(array('app_id'));
        $app_list = $this->fetchAll($where);
        $this->removeSelect();

        foreach ($app_list as $item) {
            $data[] = $item->app_id;
        }

        return $data;
    }

    public function pauseApp($params, $die_app_ids)
    {
        $params['app_ids'] = $die_app_ids;
        $params['status']  = AppEnum::APP_SWITCH_STATUS_OFF;

        return $this->setAppStatus($params);
    }

    public function getAppName($params)
    {
        $name = '';
        $data = $this->fetchRow(array('account_id' => $params['account_id'], 'app_id' => $params['app_id']));
        if ($data) {
            $name = $data->app_name . ':' . $data->port;
        }

        return $name;
    }


    public function getGroupAppList($account_id)
    {
        $rsAppGroupTable = 'relationship_app_group';
        $appGroupTable   = 'app_group_info';
        $list            = $this->client->table($this->table)
            ->where($this->table . '.account_id', '=', $account_id)
            ->where($this->table . '.status', '=', AppEnum::APP_SWITCH_STATUS_ON)
            ->whereIn($this->table . '.app_type', [AppEnum::APP_TYPE_DOMAIN, AppEnum::APP_TYPE_RUM_AND_DOMAIN])
            ->leftJoin($rsAppGroupTable, $rsAppGroupTable . '.app_id', '=', $this->table . '.app_id')
            ->leftJoin($appGroupTable, $appGroupTable . '.app_group_id', '=', $rsAppGroupTable . '.app_group_id')
            ->select($this->table . '.app_name', $this->table . '.app_id', $appGroupTable . '.app_group_name', $appGroupTable . '.app_group_id')
            ->get();

        return $list;
    }
}