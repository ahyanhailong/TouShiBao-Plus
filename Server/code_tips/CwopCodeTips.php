<?php
/**
 * @author ciogao@gmail.com
 * Date: 15-5-20 上午9:45
 */
class Cwop
{


    /* 字段名 */
    const USER_NAME = 'user_name';
    const USER_PWD = 'user_pwd';
    const USER_MOBILE = 'user_mobile';
    const USER_EMAIL = 'user_email';

    const COMPANY = 'company';
    const ACCOUNT_ID = 'account_id';
    const COMPANY_LINKMAN = 'company_linkman';
    const ADDRESS = 'address';

    const ACCESS_TOKEN = 'accessToken';
    const TIMESTAMP = 'timestamp';
    const APP_ID = 'app_id';
    const SIGN = 'sign';

    const SUCCESS = 1000;

    const USER_STATUS_NORMAL = 1; //用户状态正常
    const USER_STATUS_STOP = 2; //暂停
    const USER_STATUS_DELETED = 3; //已删除
    const USER_STATUS_UNACTIVATED = 4; //未激活

    const USER_STATUS_DEFAULT = 4; //默认状态值

    /**
     * 登录
     * @param string $user_name 用户名
     * @param string $user_pwd 密码
     * @return array 返回用户信息
     */
    public static function signIn($user_name, $user_pwd)
    {
        return array();
    }


    /**
     * @param $account_id
     * @param $user_id
     *
     * @return array
     */
    public static function signInByAccountUser($account_id, $user_id)
    {
        return array();
    }

    /**
     * 注册
     * @param string $user_name 用户名
     * @param string $user_pwd 密码
     * @param string $user_email Email
     * @param int $account_id
     * @param string $user_mobile 手机号
     * @param string $company 公司名
     * @param string $company_linkman 联系人
     * @param string $adress 地址
     * @param string $region_code 地址
     * @return array
     */
    public static function signUp($user_name, $user_pwd, $user_email, $account_id = 0, $user_mobile = '', $company = '', $company_linkman = '', $adress = '', $region_code = 'CN')
    {
        return array();

    }

    /**
     * 获取信息
     * @param string $access_token accessToken
     * @return array
     */
    public static function getInfo($access_token)
    {
        return array();
    }


    /**
     * @param string $access_token accessToken
     * @param string $old_pwd 旧密码
     * @param string $new_pwd 新密码
     * @return array
     */
    public static function updatePwd($access_token, $old_pwd, $new_pwd)
    {
        return array();
    }


    /**
     * @param $access_token
     * @param $user_name
     * @param $user_email
     * @param $user_mobile
     * @param string $company
     * @param string $company_linkman
     * @param string $adress
     * @return array
     */
    public static function updateInfo($access_token, $user_name = '', $user_email = '', $user_mobile = '', $company = '', $company_linkman = '', $adress = '')
    {
        return array();
    }

    /**
     * @param string $user_email
     * @param string $user_mobile
     * @param string $user_name
     * @param string $company
     * @return array
     */
    public static function resetPwd($user_email = '', $user_mobile = '', $user_name = '', $company = '', $new_pwd = '')
    {
        return array();
    }

    /**
     * @param $access_token
     * @param $user_id
     * @param $status
     * @return array
     */
    public static function updateStatus($access_token, $user_id, $status)
    {
        return array();
    }

    /**
     * @todo
     *
     * @param $access_token
     * @param string $groups
     * @return array
     */
    public static function groupPush($access_token, string $groups)
    {
        return array();
    }

    /**
     * @param $access_token
     * @return array
     */
    public static function groupGet($access_token)
    {
        return array();
    }

    /**
     * 验证手机号是否存在
     * @param $mobile
     * @return array
     */
    public static function validateMobileExists($mobile)
    {
        return array();
    }

    /**
     * 验证邮箱是否存在
     * @param $email
     * @return array
     */
    public function validateEmailExists($email)
    {
        return array();
    }
}
?>