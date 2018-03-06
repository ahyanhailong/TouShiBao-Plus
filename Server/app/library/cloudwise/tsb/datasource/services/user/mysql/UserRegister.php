<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:09
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class UserRegister extends MysqlService
{
    protected $table = 'user_register';

    protected $primaryKey = 'register_id';

    public $register_id;

    public $user_email;

    public $user_name;

    public $user_mobile;

    public $company_name;

    public $company_industry;

    public $company_url;

    public $register_time;

    public $register_status;

    public $relationship_user;

    public $channel;

    //register_status
    const REGISTER_STATUS_NORMAL = 1; //已注册，等待审核
    const REGISTER_STATUS_PASS = 2; //审核通过
    const REGISTER_STATUS_FAIL = 3; //审核失败

    public function selfInsert()
    {
        $insert = [
            'user_email'       => $this->user_email,
            'user_name'        => $this->user_name,
            'user_mobile'      => $this->user_mobile,
            'company_name'     => $this->company_name,
            'company_industry' => $this->company_industry,
            'company_url'      => $this->company_url,
            'register_time'    => time(),
            'register_status'  => $this->register_status ? $this->register_status : self::REGISTER_STATUS_PASS,
            'channel'          => $this->channel ? $this->channel : UserInfo::CLOUDWISE,
        ];

        return $this->insert($insert);
    }
}