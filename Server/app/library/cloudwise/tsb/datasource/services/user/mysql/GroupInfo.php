<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:18
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\UserEnum;

class GroupInfo extends MysqlService
{
    protected $table = 'group_info';
    protected $primaryKey = 'group_id';

    public $group_name;
    public $parent_id;
    public $level;
    public $level_sort;
    public $account_id;
    public $group_des;


    public function selfInsert()
    {
        $insert = [
            'group_name'  => $this->group_name,
            'parent_id'   => 0,
            'level'       => 1,
            'level_sort'  => 1,
            'account_id'  => $this->account_id,
            'group_des'   => $this->group_des ? $this->group_des : $this->group_name,
            'create_time' => time(),
        ];

        return $this->insert($insert);
    }

    public function getGroupAnalysis($account_id)
    {
        $rsGroupUserTable = 'relationship_group_user';
        $userInfoTable    = 'user_info';
        $result           = $this->client->table($this->table)
            ->where($this->table . '.account_id', '=', $account_id)
            ->leftJoin($rsGroupUserTable, $rsGroupUserTable . '.group_id', '=', $this->table . '.group_id')
            ->leftJoin($userInfoTable, $userInfoTable . '.user_id', '=', $rsGroupUserTable . '.user_id')
            ->select($this->table . '.group_name', $this->table . '.group_id', $this->client->connection()->raw('count(distinct(user_info.user_id)) as user_num'))
            ->groupBy($this->table . '.group_id')
            ->orderBy('group_id', 'asc')
            ->get();

        return $result;
    }

    public function getUserList($where)
    {
        $rsGroupUserTable = 'relationship_group_user';
        $rsRoleUserTable  = 'relationship_roles_user';
        $rolesInfoTable   = 'roles_info';
        $userInfoTable    = 'user_info';

        $oQuery = $this->client->table($userInfoTable)
            ->where($userInfoTable . '.account_id', '=', $where['account_id'])
            ->leftJoin($rsGroupUserTable, $rsGroupUserTable . '.user_id', '=', $userInfoTable . '.user_id')
            ->leftJoin($this->table, $this->table . '.group_id', '=', $rsGroupUserTable . '.group_id')
            ->leftJoin($rsRoleUserTable, $rsRoleUserTable . '.user_id', '=', $userInfoTable . '.user_id')
            ->leftJoin($rolesInfoTable, $rolesInfoTable . '.role_id', '=', $rsRoleUserTable . '.role_id')
            ->groupBy($userInfoTable . '.user_id')
            ->select($userInfoTable . '.user_id',$userInfoTable . '.user_name', $userInfoTable . '.user_status', $userInfoTable . '.user_email',$userInfoTable . '.user_mobile', $rolesInfoTable . '.role_right', $this->table . '.group_id',$this->table . '.group_name');

        //用户部门过滤
        if (isset($where['group_id'])) {
            $oQuery->where($this->table . '.group_id', '=', $where['group_id']);
        }

        //用户邮件/名称过滤
        if (isset($where['search_email'])) {
            $keywords = '%' . $where['search_email'] . '%';
            $oQuery->where(function ($oQuery) use ($keywords) {
                $oQuery->where('user_info.user_email', 'like', $keywords)
                    ->orWhere('user_info.user_name', 'like', $keywords);
            });
        }

        //用户分类过滤
        if (isset($where['type'])) {
            switch ($where['type']) {
                case 'normal_user':
                    $status = UserEnum::USER_STATUS_NORMAL;
                    $oQuery->where('user_info.user_status', '=', $status);
                    break;
                case 'paused_user':
                    $status = UserEnum::USER_STATUS_PAUSED;
                    $oQuery->where('user_info.user_status', '=', $status);
                    break;
                case 'waiting_activate_user':
                    $status = UserEnum::USER_STATUS_AWAITING_ACTIVATE;
                    $oQuery->where('user_info.user_status', '=', $status);
                    break;
                case 'ungrouped_user':
                    $defaultGroup = $this->client->table($this->table)
                        ->where('account_id', '=', $where['account_id'])
                        ->orderBy('group_id', 'asc')
                        ->first();
                    $oQuery->where($this->table . '.group_id', '=', $defaultGroup->group_id);
                    break;

            }
        }
        $result = $oQuery->get();

        return $result;
    }
}