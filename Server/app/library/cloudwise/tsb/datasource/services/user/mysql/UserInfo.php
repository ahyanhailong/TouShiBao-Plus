<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/1
 * Time: 下午4:59
 */

namespace cloudwise\tsb\datasource\services\user\mysql;

use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;
use cloudwise\tsb\datasource\helper\StringHelper;

/**
 * Class UserInfo
 * @package cloudwise\tsb\datasource\services\user\mysql
 */
class UserInfo extends MysqlService
{
    /**
     * @var string
     */
    protected $table = 'user_info';

    /**
     * @var string
     */
    protected $primaryKey = 'user_id';

    /**
     * @var
     */
    public $user_id;

    /**
     * @var
     */
    public $account_id;

    /**
     * @var
     */
    public $user_email;

    /**
     * @var
     */
    public $user_pass;

    /**
     * @var
     */
    public $user_name;

    /**
     * @var
     */
    public $user_status;

    /**
     * @var
     */
    public $user_ticket;

    /**
     * @var
     */
    public $user_mobile;

    /**
     * @var
     */
    public $mobile_auth;

    /**
     * @var
     */
    public $user_qq;

    /**
     * @var
     */
    public $user_from;

    /**
     * @var
     */
    public $login_time;

    /**
     * @var
     */
    public $last_login_time;

    /**
     * @var
     */
    public $activating_time;

    /**
     * @var
     */
    public $channel;

    /**
     * @var
     */
    public $relationship_cwop_user_id;

    /**
     * @var
     */
    public $relationship_cwop_account_id;

    /**
     * @var
     */
    public $app_id;

    /**
     * @var
     */
    public $register_time;

    /**
     * @var
     */
    public $access_token;

    /**
     * @var
     */
    public $role_name;

    /**
     * @var
     */
    public $role_right;

    //user_status
    /**
     * 正常使用
     */
    const USER_STATUS_NORMAL = 1;

    /**
     * 等待激活
     */
    const USER_STATUS_AWAITING_ACTIVATE = 2;
    /**
     * 已暂停
     */
    const USER_STATUS_PAUSED = 3;

    /**
     * 已删除
     */
    const USER_STATUS_DELETED = 4;

    //channel
    /**
     * cloudwise
     */
    const CLOUDWISE = 1;
    /**
     * 青云
     */
    const QINGYUN = 2;

    /**
     * 监控宝
     */
    const JKB = 3;

    /**
     * CAS 统一登陆用户
     */
    const CAS = 4;

    /**
     * 压测宝
     */
    const YCB = 5;

    /**
     * 中信云
     */
    const ZXY = 6;

    /**
     * @return int
     */
    public function selfInsert()
    {
        $insert = [
            'user_name'                    => $this->user_name,
            'user_email'                   => $this->user_email,
            'user_mobile'                  => $this->user_mobile ? $this->user_mobile : 0,
            'user_qq'                      => $this->user_qq ? $this->user_qq : 0,
            'account_id'                   => $this->account_id ? $this->account_id : 0,
            'user_ticket'                  => $ticket = md5(time().StringHelper::mkRandomChar(8)),
            'user_pass'                    => '',
            'channel'                      => $this->channel ? $this->channel : self::CLOUDWISE,
            'activating_time'              => $this->activating_time ? $this->activating_time : 0,
            'relationship_cwop_user_id'    => $this->relationship_cwop_user_id ? $this->relationship_cwop_user_id : 0,
            'relationship_cwop_account_id' => $this->relationship_cwop_account_id ? $this->relationship_cwop_account_id : 0,
            'user_status'                  => $this->user_status ? $this->user_status : self::USER_STATUS_AWAITING_ACTIVATE,
            'app_id'                       => $this->app_id,
            'register_time'                => $this->register_time,
        ];

        return $this->insert($insert);
    }

    /**
     * @param $field
     *
     * @return array
     */
    public function selfUpdate($field)
    {
        $update_limited = ['user_name'];
        if (in_array($field, $update_limited)) {
            if ($this->update([$field => $this->$field], ['user_id' => $this->user_id])) {
                return [
                    'msg' => '更新成功',
                ];
            }

            return [
                'msg'  => '更新失败',
                'code' => ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB_UFALSE,
            ];
        }

        return [
            'msg'  => '更新失败',
            'code' => ErrorCodeEnum::STATUS_ERROR_API_PARAMS_INVALID,
        ];
    }
}