<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:20
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class RsRolesUser extends MysqlService
{
    protected $table = 'relationship_roles_user';
    protected $primaryKey = 'role_id';

    public function updateUserRole($params)
    {
        $roleInfo = $this->client->table('roles_info')
            ->where('account_id', '=', $params['account_id'])
            ->where('role_right', '=', $params['role_right'])
            ->first();

        $rsRole = $this->client->table($this->table)
            ->where('user_id', '=', $params['user_id'])
            ->first();

        //如果角色与要更新的相同直接返回
        if ($rsRole->role_id == $roleInfo->role_id) {
            return true;
        }

        return $this->client->table($this->table)
            ->where('user_id', '=', $params['user_id'])
            ->update(['role_id' => $roleInfo->role_id]);
    }
}