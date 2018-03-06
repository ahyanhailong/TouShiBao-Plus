<?php
/**
 * @author bear
 * Date: 17/12/7 下午6:25
 */

namespace cloudwise\tsb\datasource\constants;


class AccountParamsEnum
{
    const CONTROLLER_NAME_USER = 'User';

    const ACCOUNT_USER_LOGIN = 'AccountUserLogin';
    const ACCOUNT_USER_LOGOUT = 'AccountUserLogout';
    const ACCOUNT_USER_REGISTER = 'AccountUserRegister';
    const ACCOUNT_USER_REGISTER_FROM_CWOP = 'AccountUserRegisterFromCwop';
    const ACCOUNT_USER_ACTIVATE = 'AccountUserActivate';
    const ACCOUNT_USER_GET_LOGIN_TICKET = 'AccountUserGetLoginTicket';
    const ACCOUNT_USER_LOGIN_BY_TICKET = 'AccountUserLoginByTicket';
    const ACCOUNT_USER_SEND_RESET_EMAIL = 'AccountUserSendResetEmail';
    const ACCOUNT_USER_RESET_EMAIL = 'AccountUserResetEmail';
    const ACCOUNT_USER_SEND_RESET_MOBILE_CODE = 'AccountUserSendResetMobileCode';
    const ACCOUNT_USER_RESET_MOBILE = 'AccountUserResetMobile';
    const ACCOUNT_USER_UPDATE_USER_INFO = 'AccountUserUpdateUserInfo';
    const ACCOUNT_USER_RESET_PWD = 'AccountUserResetPwd';
    const ACCOUNT_USER_SEND_RESET_PWD_EMAIL = 'AccountUserSendResetPwdEmail';
    const ACCOUNT_USER_CONFIRM_RESET_PWD = 'AccountUserConfirmResetPwd';

    const ACCOUNT_USER_GET_GROUP_LIST = 'AccountUserGetGroupList';
    const ACCOUNT_USER_GET_USER_LIST = 'AccountUserGetUserList';
    const ACCOUNT_USER_ADD_OR_UPDATE_GROUP = 'AccountUserAddOrUpdateGroup';
    const ACCOUNT_USER_REMOVE_GROUP = 'AccountUserRemoveGroup';
    const ACCOUNT_USER_GET_GROUP_ITEM = 'AccountUserGetGroupItem';
    const ACCOUNT_USER_UPDATE_GROUP_USER = 'AccountUserUpdateGroupUser';
    const ACCOUNT_USER_ADD_GROUP_USER = 'AccountUserAddGroupUser';


    //个人中心
    const ACCOUNT_USER_GET_USER_INFO = 'AccountUserGetUserInfo';
    const ACCOUNT_USER_GET_QUOTA_LEFT = 'AccountUserGetQuotaLeft';
    const ACCOUNT_USER_GET_MOUDLE_OVER_TIME = 'AccountUserGetMoudleOverTime';
    const ACCOUNT_USER_GET_MOUDLE_QUOTA = 'AccountUserGetMoudleQuota';
    const ACCOUNT_USER_GET_PLUGIN_PANEL_LIST = 'AccountUserGetPluginPanelList';
    const ACCOUNT_USER_GET_API_SECRET_KEY = 'AccountUserGetApiSecretKey';
    const ACCOUNT_USER_CHANGE_API_SECRET = 'AccountUserChangeApiSecret';
    const ACCOUNT_USER_SAVE_API_SECRET = 'AccountUserSaveApiSecret';
    const ACCOUNT_USER_MODIFY_USER_NAME = 'AccountUserModifyUserName';
    const ACCOUNT_USER_GET_PLUGIN_LIST = 'AccountUserGetPluginList';
    const ACCOUNT_USER_REGISTER_GEE_INIT = 'AccountUserGetRegisterGeeInit';


    public static $accountList = [
        self::ACCOUNT_USER_LOGIN                  => [
            'email' => '',
            'pw'    => '',
            'token' => '',
        ],
        self::ACCOUNT_USER_LOGOUT                 => [],
        self::ACCOUNT_USER_REGISTER               => [
            'company_name' => '',
            'company_url'  => '',
            'user_name'    => '',
            'user_email'   => [
                'email' => '邮件格式错误',
            ],
            'user_mobile'  => [
                'phone' => '手机号格式错误',
            ],
        ],
        self::ACCOUNT_USER_ACTIVATE               => [
            'token' => '',
        ],
        self::ACCOUNT_USER_GET_LOGIN_TICKET       => [

        ],
        self::ACCOUNT_USER_LOGIN_BY_TICKET        => [

        ],
        self::ACCOUNT_USER_REGISTER_FROM_CWOP     => [

        ],
        self::ACCOUNT_USER_SEND_RESET_EMAIL       => [
            'email' => ['email' => '邮件格式错误',],
        ],
        self::ACCOUNT_USER_RESET_EMAIL            => [
            'token' => '',
        ],
        self::ACCOUNT_USER_SEND_RESET_MOBILE_CODE => [
            'mobile' => '',
        ],
        self::ACCOUNT_USER_RESET_MOBILE           => [
            'token' => '',
        ],
        self::ACCOUNT_USER_UPDATE_USER_INFO       => [

        ],
        self::ACCOUNT_USER_RESET_PWD              => [
            'old'    => '',
            'new'    => ['password' => '密码必须包含字母数字特殊字符的任意两种组合', 'string' => '8'],
            'repeat' => '',
        ],
        self::ACCOUNT_USER_SEND_RESET_PWD_EMAIL   => [
            'email' => 'email',
        ],
        self::ACCOUNT_USER_CONFIRM_RESET_PWD      => [
            'token'     => '',
            'pw'        => '',
            'pw_repeat' => '',
        ],

        self::ACCOUNT_USER_GET_GROUP_LIST        => [
            'filter' => ['user'],
        ],
        self::ACCOUNT_USER_GET_USER_LIST         => [
            'filter' => ['user'],
            //            'page'      => ['default' => 1],
            //            'page_size' => ['default' => 5],
        ],
        self::ACCOUNT_USER_ADD_OR_UPDATE_GROUP   => [
            'filter'     => ['user'],
            'group_name' => '',
        ],
        self::ACCOUNT_USER_REMOVE_GROUP          => [
            'filter'   => ['user'],
            'group_id' => '',
        ],
        self::ACCOUNT_USER_GET_GROUP_ITEM        => [
            'filter'   => ['user'],
            'group_id' => '',
        ],
        self::ACCOUNT_USER_UPDATE_GROUP_USER     => [
            'filter'  => ['user'],
            'user_id' => '',
        ],
        self::ACCOUNT_USER_ADD_GROUP_USER        => [
            'filter'   => ['user'],
            'group_id' => '',
            'email'    => '',
            'role'     => '',
        ],
        self::ACCOUNT_USER_GET_USER_INFO         => [],
        self::ACCOUNT_USER_GET_QUOTA_LEFT        => [],
        self::ACCOUNT_USER_GET_MOUDLE_OVER_TIME  => [],
        self::ACCOUNT_USER_GET_MOUDLE_QUOTA      => [],
        self::ACCOUNT_USER_GET_PLUGIN_PANEL_LIST => [],
        self::ACCOUNT_USER_GET_API_SECRET_KEY    => [],
        self::ACCOUNT_USER_CHANGE_API_SECRET     => [],
        self::ACCOUNT_USER_GET_PLUGIN_LIST       => [],
        self::ACCOUNT_USER_SAVE_API_SECRET       => [
            'data' => '',
        ],
        self::ACCOUNT_USER_MODIFY_USER_NAME      => [
            'name' => '',
        ],
        self::ACCOUNT_USER_REGISTER_GEE_INIT     => [],
    ];

    /**
     * @param $controller
     *
     * @return array
     */
    public static function getControllerParams($controller)
    {
        $params = [];
        switch ($controller) {
            case self::CONTROLLER_NAME_USER:
                $params = self::$accountList;
                break;
        }

        return $params;
    }
}