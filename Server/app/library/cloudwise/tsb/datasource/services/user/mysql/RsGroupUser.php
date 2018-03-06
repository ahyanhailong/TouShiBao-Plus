<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:21
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class RsGroupUser extends MysqlService
{
    protected $table = 'relationship_group_user';
    protected $primaryKey = 'user_id';

    public function updateDeletedGroup($where)
    {
        if(!$this->client->table($this->table)->where('group_id', '=', $where['group_id'])->get()){
            return true;
        }

        $defaultGroup = $this->client->table('group_info')
            ->where('account_id', '=', $where['account_id'])
            ->orderBy('group_id', 'asc')
            ->first();

        return $this->update(['group_id' => $defaultGroup->group_id], ['group_id' => $where['group_id']]);
    }
}