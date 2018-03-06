<?php
/**
 * @author bear
 * Date: 17/12/24 下午3:45
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class GroupPrivilege extends MysqlService
{
    protected $table = 'group_privilege';
    protected $primaryKey = 'id';

    public $account_id;
    public $group_id;
    public $target_type;
    public $target_list;

    public function selfExists()
    {
        $exists = [
            'target_type' => $this->target_type,
            'group_id'    => $this->group_id,
            'account_id'  => $this->account_id,
        ];

        return $this->exists($exists);
    }

    public function selfInsert()
    {
        $insert = [
            'target_type'  => $this->target_type,
            'group_id'     => $this->group_id,
            'account_id'   => $this->account_id,
            'target_list'  => json_encode($this->target_list),
            'updated_time' => time(),
            'created_time' => time(),
        ];

        return $this->insert($insert);
    }

    public function selfUpdate()
    {
        $update = [
            'target_list'  => json_encode($this->target_list),
            'updated_time' => time(),
        ];

        $where = [
            'target_type' => $this->target_type,
            'group_id'    => $this->group_id,
            'account_id'  => $this->account_id,
        ];

        return $this->update($update, $where);
    }
}