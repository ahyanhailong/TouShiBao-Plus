<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:17
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\helper\ArrayHelper;

class RolesInfo extends MysqlService
{
    protected $table      = 'roles_info';
    protected $primaryKey = 'role_id';


    public function getUserRole($user_id)
    {
        $rsRoleUserTable = 'relationship_roles_user';
        $role = $this->client->table($rsRoleUserTable)
            ->where($rsRoleUserTable . '.user_id', '=', $user_id)
            ->leftJoin($this->table, $this->table . '.role_id', '=', $rsRoleUserTable . '.role_id')
            ->select($this->table . '.role_right', $this->table . '.role_name')
            ->first();

        return ArrayHelper::objToArray($role);
    }
}