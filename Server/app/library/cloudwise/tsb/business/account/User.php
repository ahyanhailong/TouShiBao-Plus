<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/4
 * Time: 下午4:24
 */

namespace cloudwise\tsb\business\account;

use App\library\Service\ConfigService;
use App\library\Service\MailService;
use App\library\Service\RESTService;
use App\library\Service\GeetestLib;
use App\models\BaseModel;
use cloudwise\tsb\business\Business;
use cloudwise\tsb\business\host\HostList;
use cloudwise\tsb\datasource\base\CacheService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\AccountEnum;
use cloudwise\tsb\datasource\constants\AccountLicenseEnum;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;
use cloudwise\tsb\datasource\constants\CacheExpireEnum;
use cloudwise\tsb\datasource\constants\CacheKeyEnum;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;
use cloudwise\tsb\datasource\constants\ServiceCommonEnum;
use cloudwise\tsb\datasource\constants\ServiceTypeEnum;
use cloudwise\tsb\datasource\constants\UserEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\helper\EnvHelper;
use cloudwise\tsb\datasource\services\main\Provider;
use cloudwise\tsb\datasource\services\user\mysql\UserInfo;
use cloudwise\tsb\datasource\helper\ApiClient;
use cloudwise\tsb\datasource\helper\StringHelper;
use App\library\Service\ParamsService;

/**
 * 负责用户的注册激活登录与退出
 * Class User
 *
 * @package cloudwise\tsb\business\account
 */
class User extends Business
{

    /**
     * @var \cloudwise\tsb\datasource\services\user\Provider
     */
    private $userProvider;

    /**
     * @var User
     */
    private static $self = null;

    private $GtSdk = null;

    /**
     * @return User
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    /**
     * User constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->userProvider = self::$provider->getUserProvider();
    }

    /**
     * @return UserInfo
     */
    public function getUserCache()
    {
        if (isset(ParamsService::$params['sign'])) {
            return self::$cache->get(ParamsService::$params['sign'], UserEnum::USER_INFO_CACHE_TAG);
        }

        if (isset($_COOKIE[UserEnum::USER_INFO_COOKIE_KEY])) {
            return self::$cache->get($_COOKIE[UserEnum::USER_INFO_COOKIE_KEY], UserEnum::USER_INFO_CACHE_TAG);
        }

        return false;
    }

    /**
     * 发送激活邮件
     *
     * @param $email
     * @param $domain
     */
    public function sendActivateEmail($email, $domain, $accessToken)
    {
        $token = md5(StringHelper::mkRandomChar(6, 3));
        $url   = $domain . '/#/activate?token=' . $token;
        $cache = [
            'email'       => $email,
            'accessToken' => $accessToken,
        ];
        self::$cache->set($token, $cache, 7 * 24 * 60);
        MailService::instance()->sendMail('TSB激活邮件', [$email], $url);
    }


    /**
     * 初始化 滑块验证
     * 返回 测试服务的结果
     */
    public function getRegisterGeeInit()
    {
        $data = array(
            "user_id"     => "cloudwise", # 网站用户id
            "client_type" => "web", #web:电脑上的浏览器；h5:手机上的浏览器，包括移动应用内完全内置的web_view；native：通过原生SDK植入APP应用的方式
            "ip_address"  => "127.0.0.1" # 请在此处传输用户请求验证时所携带的IP
        );
        if(!$this->GtSdk){
            $this->GtSdk = new GeetestLib();
        }

        //测试服务器 是否正常工作
        $status = $this->GtSdk->pre_process($data, 1);
        $result = $this->GtSdk->get_response_str();

        return json_decode($result);
    }


    /**
     * @param $aUserInfo
     *
     * @return bool|int
     */
    public function checkGeeSlider($aUserInfo){

        $resultG = false;
        if(!$this->GtSdk){
            $this->GtSdk = new GeetestLib();
        }

        if (isset($aUserInfo['gee']) && $aUserInfo['gee']) {

            $geeParams = $aUserInfo['gee'];

            if (!$resultG = $this->GtSdk->success_validate($geeParams['geetest_challenge'], $geeParams['geetest_validate'], $geeParams['geetest_seccode'], array())) {
                RESTService::instance()->error('每次滑块验证只能使用一次,请刷新页面重新操作');
            }
        }

        return $resultG;
    }

    /**
     * 本机房注册
     *
     * @param $aUserInfo
     *
     * @return array
     */
    public function registerLocal($aUserInfo)
    {
        if( !$this->checkGeeSlider($aUserInfo) ){
            RESTService::instance()->error('滑块验证未通过');
        }
        $mUserInfo    = $this->userProvider->getUserInfo();
        $mCompanyInfo = $this->userProvider->getCompanyInfo();
        //poc环境可以自定义密码
        if (ConfigService::instance()->getConfig('poc.default_password')) {
            $aUserInfo['user_pass'] = md5('123456');
        } else {
            $aUserInfo['user_pass'] = md5(StringHelper::mkRandomChar());
        }
        $mUserInfo->Bind($aUserInfo);
        $mCompanyInfo->Bind($aUserInfo);
        //cwop注册
        $aSignUpResult = \Cwop::signUp($mUserInfo->user_name, $mUserInfo->user_pass, $mUserInfo->user_email, 0, $mUserInfo->user_mobile, $mCompanyInfo->company_name, $mCompanyInfo->company_url, $mCompanyInfo->company_address, 'CN');
//        $aSignUpResult = \Cwop::signIn($mUserInfo->user_email, md5(123456));
        //注册失败则返回错误信息
        if ($aSignUpResult['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return $aSignUpResult;
        }
        $sAccessToken = $aSignUpResult['data']['accessToken'];


        //如果不需要邮件验证,则执行激活操作
        if (ConfigService::instance()->getConfig('poc.remove_email_activate')) {
            \Cwop::updateStatus($sAccessToken, $aSignUpResult['data']['user_id'], \Cwop::USER_STATUS_NORMAL);
        } else {
            self::instance()->sendActivateEmail($mUserInfo->user_email, $aSignUpResult['data']['accountRegion']['domain_name'], $sAccessToken);
        }

        //单机房处理
        $aCwopInfo  = \Cwop::getInfo($sAccessToken);
        $aGroupInfo = \Cwop::groupGet($sAccessToken);
        $result     = $this->migrateUserFromCwop($aCwopInfo, $aGroupInfo, false);

        return $result;
    }

    /**
     * 多机房注册
     *
     * @param $aUserInfo
     *
     * @return array|mixed|null
     */
    public function registerPublic($aUserInfo)
    {
        if( !$this->checkGeeSlider($aUserInfo) ){
            RESTService::instance()->error('滑块验证未通过');
        }
        $mUserInfo    = $this->userProvider->getUserInfo();
        $mCompanyInfo = $this->userProvider->getCompanyInfo();
        //poc环境可以自定义密码
        if (ConfigService::instance()->getConfig('poc.default_password')) {
            $aUserInfo['user_pass'] = md5('123456');
        } else {
            $aUserInfo['user_pass'] = md5(StringHelper::mkRandomChar(6));
        }

        $mUserInfo->Bind($aUserInfo);
        $mCompanyInfo->Bind($aUserInfo);

        //cwop注册
        $aSignUpResult = \Cwop::signUp(
            $mUserInfo->user_name, $mUserInfo->user_pass, $mUserInfo->user_email, 0, $mUserInfo->user_mobile, $mCompanyInfo->company_name, $mCompanyInfo->company_url, $mCompanyInfo->company_address, StringHelper::getRegionCode($mUserInfo->user_mobile));

        //注册失败则返回错误信息
        if ($aSignUpResult['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return $aSignUpResult;
        }

        $sAccessToken = $aSignUpResult['data']['accessToken'];

        //如果不需要邮件验证,则执行激活操作
        if (ConfigService::instance()->getConfig('poc.remove_email_activate')) {
            \Cwop::updateStatus($sAccessToken, $aSignUpResult['data']['user_id'], \Cwop::USER_STATUS_NORMAL);
        } else {
            self::instance()->sendActivateEmail($mUserInfo->user_email, $aSignUpResult['data']['accountRegion']['domain_name'], $sAccessToken);
        }

        //将配置同步到指定机房
        $region = $aSignUpResult['data']['accountRegion']['domain_name'];

        ApiClient::instance()->setApi($region . '/account/user/register_from_cwop');
        ApiClient::instance()->setData(['accessToken' => $sAccessToken]);
        ApiClient::instance()->setMethod(ApiClient::METHOD_GET);
        ApiClient::instance()->go();
        $result = ApiClient::instance()->getBody();
        $result = json_decode($result, true);
        if ($result['code'] == ErrorCodeEnum::STATUS_SUCCESS) {
            $sToken = md5(time());
            self::$cache->set($sToken, $mUserInfo->user_email, 7 * 24 * 60);
        }

        return $result;
    }

    /**
     * 激活用户
     *
     * @param $sAccessToken
     * @param $sEmail
     *
     * @return array
     */
    public function activateUser($sAccessToken, $sEmail)
    {
        $mUserInfo     = $this->userProvider->getUserInfo();
        $mUserRegister = $this->userProvider->getUserRegisterService();

        $oUserInfo = $mUserInfo->fetchRow(['user_email' => $sEmail]);

        //更新透视宝状态事务
        self::$db->transStart();

        //更新用户状态
        $bUserInfoUpdate = $mUserInfo->update(
            ['user_status' => UserEnum::USER_STATUS_NORMAL], ['user_id' => $oUserInfo->user_id]);

        //更新注册状态
        $bUserRegisterUpdate = $mUserRegister->update(
            ['register_status' => UserEnum::REGISTER_STATUS_PASS], ['user_email' => $oUserInfo->user_email]);

        if ($bUserInfoUpdate && $bUserRegisterUpdate) {
            //更新cwop状态
            $result = \Cwop::updateStatus(
                $sAccessToken, $oUserInfo->relationship_cwop_user_id, \Cwop::USER_STATUS_NORMAL);
            if ($result['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
                return $result;
            }

            self::$db->transCommit();
            $return = [
                'msg' => '激活成功',
            ];
        } else {
            $return = [
                'code' => ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB_UFALSE,
                'msg'  => '激活失败',
            ];
            self::$db->transRollBack();
        }

        return $return;
    }

    /**
     * cwop注册后迁移到透视宝
     *
     * @param $accessToken
     *
     * @return array
     */
    public function registerFromCwop($accessToken)
    {
        $cwopInfo  = \Cwop::getInfo($accessToken);
        $groupInfo = \Cwop::groupGet($accessToken);
        $return    = self::instance()->migrateUserFromCwop($cwopInfo, $groupInfo, false);

        return $return;
    }

    /**
     * 多机房登录
     *
     * @param $sUserEmail
     * @param $sPassword
     *
     * @return array|mixed
     */
    public function loginByPublic($sUserEmail, $sPassword)
    {
        //从cwop获取登录信息
        $signInParams = \Cwop::signIn($sUserEmail, md5($sPassword));

        if ($signInParams['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return $signInParams;
        }

        $sAccessToken = $signInParams['data']['accessToken'];
        $sRegion      = $signInParams['data']['accountRegion']['domain_name'];
        //多机房登录
        $result = $this->loginWithRegion($sAccessToken, $sRegion);
        if ($result['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return $result;
        } else {
            return [
                'code' => ErrorCodeEnum::STATUS_SUCCESS,
                'msg'  => '验证通过',
                'data' => [
                    "region" => $signInParams['data']['accountRegion']['domain_name'] . '/account/user/login_by_ticket',
                    "ticket" => $result['data']['ticket'],
                ],
            ];
        }
    }

    /**
     * 多机房登录接口调用
     *
     * @param $sAccessToken
     * @param $sRegion
     *
     * @return mixed
     */
    public function loginWithRegion($sAccessToken, $sRegion)
    {
        $aPostData = [
            'accessToken' => $sAccessToken,
        ];
        $url       = $sRegion . '/account/user/get_login_ticket';
        ApiClient::instance()->setApi($url);
        ApiClient::instance()->setMethod(ApiClient::METHOD_GET);
        ApiClient::instance()->setData($aPostData);
        ApiClient::instance()->go();
        $result = ApiClient::instance()->getBody();

        return json_decode($result, true);
    }

    /**
     * 获取登录签名
     *
     * @param $sAccessToken
     *
     * @return array
     */
    public function getLoginTicket($sAccessToken)
    {
        $cwopInfo = \Cwop::getInfo($sAccessToken);
        if ($cwopInfo['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return [
                'code' => $cwopInfo['code'],
                'msg'  => $cwopInfo['msg'],
            ];
        }

        if ($cwopInfo['data']['status'] != UserEnum::USER_STATUS_NORMAL) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_STATUS_ERROR,
                'msg'  => '平台用户状态异常:' . $cwopInfo['data']['status'],
            ];
        }

        $mUser     = $this->userProvider->getUserInfo();
        $oUserInfo = $mUser->fetchRow(['relationship_cwop_user_id' => $cwopInfo['data']['user_id']]);
        if (!$oUserInfo) {
            $groupInfo      = \Cwop::groupGet($sAccessToken);
            $migrate_result = $this->migrateUserFromCwop($cwopInfo, $groupInfo);
            if ($migrate_result['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
                return $migrate_result;
            }
        } else {
            if ($oUserInfo->user_status != UserEnum::USER_STATUS_NORMAL) {
                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_STATUS_ERROR,
                    'msg'  => '用户状态异常:' . $oUserInfo->user_status,
                ];
            }
        }

        //登录验证,持续5分钟
        $ticket = md5(time());

        self::$cache->set(md5(time()), $sAccessToken, 5);

        return [
            'code' => ErrorCodeEnum::STATUS_SUCCESS,
            'msg'  => '登录验证通过',
            'data' => [
                'ticket' => $ticket,
            ],
        ];
    }

    /**
     * 使用签名登录
     *
     * @param $sTicket
     *
     * @return array
     */
    public function loginByTicket($sTicket)
    {
        $sAccessToken = self::$cache->get($sTicket);
        if (!$sAccessToken) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_CACHE_EXPIRE,
                'msg'  => '登录失效,请重新登录',
            ];
        }
        $cwopInfo                = \Cwop::getInfo($sAccessToken);
        $mUserInfo               = $this->userProvider->getUserInfo();
        $oUserInfo               = $mUserInfo->fetchRow(['user_email' => $cwopInfo['data']['user_email']]);
        $cache_for_user          = md5($sAccessToken);
        $oUserInfo->access_token = $sAccessToken;
        self::$cache->set(
            $cache_for_user, $oUserInfo, UserEnum::getDefaultUserCacheTime(), UserEnum::USER_INFO_CACHE_TAG);
        setcookie(
            UserEnum::USER_INFO_COOKIE_KEY, $cache_for_user, time() + UserEnum::getDefaultUserCacheTime() * 60, '/');

        $return = [
            'code' => ErrorCodeEnum::STATUS_SUCCESS,
            'msg'  => '登录成功',
        ];
        if (!EnvHelper::checkBrowserClient()) {
            $return['data'] = [
                'sign' => $cache_for_user,
            ];
        }

        return $return;
    }

    /**
     * 本地登录
     *
     * @param      $sUserEmail
     * @param      $sPassword
     *
     * @return mixed
     */
    public function loginByLocal($sUserEmail, $sPassword)
    {
        //从cwop获取登录信息
        $signInParams = \Cwop::signIn($sUserEmail, md5($sPassword));

        if ($signInParams['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return $signInParams;
        }

        //获取账号基本信息
        $cwopInfo = \Cwop::getInfo($signInParams['data']['accessToken']);
        $mUser    = $this->userProvider->getService(UserInfo::class);
        //透视宝是否存在此账号
        if (!$mUser->exists(['user_email' => $sUserEmail])) {
            $groupInfo = \Cwop::groupGet($signInParams['data']['accessToken']);
            try {
                //账号迁移
                $result = $this->migrateUserFromCwop($cwopInfo, $groupInfo);

                return $result;
            } catch (\Exception $e) {
                LogService::logException($e);

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR,
                    'msg'  => $e->getMessage(),
                ];
            }
        }
        $result = $this->loginWithoutRegion($cwopInfo, $signInParams);

        return $result;
    }

    /**
     * @param $cwopInfo
     * @param $signInParams
     *
     * @return array
     */
    public function loginWithoutRegion($cwopInfo, $signInParams)
    {
        $cache                 = self::$provider->getMainProvider()->getCacheService();
        $iCwopUserId           = $cwopInfo['data']['user_id'];
        $mUser                 = $this->userProvider->getUserInfo();
        $mAccountExpireSetting = $this->userProvider->getAccountExpireSettingService();
        //获取用户信息
        $oUserInfo = $mUser->fetchRow(['user_email' => $cwopInfo['data']['user_email']]);

        //检查用户状态
        if ($oUserInfo->user_status != $mUser::USER_STATUS_NORMAL) {
            return [
                'msg'  => '用户状态异常',
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_STATUS_ERROR,
            ];
        }

        //用户过期状态
        $oAccountExpireSetting = $mAccountExpireSetting->fetchRow(['account_id' => $oUserInfo->account_id]);
        if ($oAccountExpireSetting->privilege == $mAccountExpireSetting::PRIVILEGE_OFF && time() > $oAccountExpireSetting->end_time) {
            return [
                'msg'  => '用户已过期',
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_EXPIRE,
            ];
        }

        //cwop信息同步到透视宝
        $update = $this->mkUpdateDataFromCwop($cwopInfo['data'], $oUserInfo);
        if ($update) {
            $mUser->update($update, ['user_id' => $oUserInfo->user_id]);
        }

        $mRole     = $this->userProvider->getRolesInfo();
        $aUserRole = $mRole->getUserRole($oUserInfo->user_id);

        $oUserInfo->role_name  = $aUserRole['role_name'];
        $oUserInfo->role_right = $aUserRole['role_right'];
        $sCacheKey             = md5($signInParams['data']['accessToken']);
        //添加缓存与客户端cookie完成登录
        $oUserInfo->access_token = $signInParams['data']['accessToken'];
        $cache->set($sCacheKey, $oUserInfo, UserEnum::getDefaultUserCacheTime(), UserEnum::USER_INFO_CACHE_TAG);
        setcookie(UserEnum::USER_INFO_COOKIE_KEY, $sCacheKey, time() + UserEnum::getDefaultUserCacheTime() * 60, '/');

        $return = [
            'code' => ErrorCodeEnum::STATUS_SUCCESS,
            'msg'  => '登录成功',
        ];
        if (!EnvHelper::checkBrowserClient()) {
            $return['data'] = [
                'sign' => $sCacheKey,
            ];
        }

        return $return;
    }

    /**
     * 删除cookie与缓存
     */
    public function logout()
    {
        if (array_key_exists(UserEnum::USER_INFO_COOKIE_KEY, $_COOKIE)) {
            $cache = self::$cache->get($_COOKIE[UserEnum::USER_INFO_COOKIE_KEY], UserEnum::USER_INFO_CACHE_TAG);
            if ($cache) {
                self::$cache->del($_COOKIE[UserEnum::USER_INFO_COOKIE_KEY], UserEnum::USER_INFO_CACHE_TAG);
            }
            setcookie(UserEnum::USER_INFO_COOKIE_KEY, '', -1, '/');
        }

        return [
            'msg'  => '退出成功',
            'code' => ErrorCodeEnum::STATUS_SUCCESS,
        ];
    }

    /**
     * cwop基本信息的同步
     *
     * @param $cwop_data
     * @param $tsb_data
     *
     * @return array
     */
    public function mkUpdateDataFromCwop($cwop_data, $tsb_data)
    {
        $update = [];
        if ($cwop_data['user_name'] && $tsb_data->user_name != $cwop_data['user_name']) {
            $update['user_name'] = $cwop_data['user_name'];
        }
        if ($cwop_data['user_email'] && $tsb_data->user_email != $cwop_data['user_email']) {
            $update['user_email'] = $cwop_data['user_email'];
        }
        if ($cwop_data['user_mobile'] && $tsb_data->user_mobile != $cwop_data['user_mobile']) {
            $update['user_mobile'] = $cwop_data['user_mobile'];
        }
        if ($cwop_data['user_id'] && $tsb_data->relationship_cwop_user_id != $cwop_data['user_id']) {
            $update['relationship_cwop_user_id'] = $cwop_data['user_id'];
        }
        if ($cwop_data['account_id'] && $tsb_data->relationship_cwop_account_id != $cwop_data['account_id']) {
            $update['relationship_cwop_account_id'] = $cwop_data['account_id'];
        }
        if (isset($cwop_data['created_time']) && $tsb_data->register_time != $cwop_data['created_time']) {
            $update['register_time'] = $cwop_data['created_time'];
        }
        if (isset($cwop_data['app_id']) && $tsb_data->app_id != $cwop_data['app_id']) {
            $update['app_id'] = $cwop_data['app_id'];
        }
        if (isset($cwop_data['accessToken']) && $tsb_data->relationship_cwop_accessToken != $cwop_data['accessToken']) {
            $update['relationship_cwop_accessToken'] = $cwop_data['accessToken'];
        }

        return $update;
    }

    /**
     * 登录时从cwop迁移用户信息
     *
     * @param $cwopInfo
     * @param $groupInfo
     * @param $ifMigrate
     *
     * @return array
     */
    public function migrateUserFromCwop($cwopInfo, $groupInfo, $ifMigrate = true)
    {
        $mUserInfo = $this->userProvider->getUserInfo();

        $aUserInfo                     = $groupInfo['data']['master'];
        $aUserInfo['company_name']     = $aUserInfo['company'];
        $aUserInfo['company_industry'] = '';
        $aUserInfo['company_url']      = $cwopInfo['data']['company_linkman'];
        $aUserInfo['user_pass']        = '';
        $aUserInfo['activating_time']  = time();
        //如果是是迁移用户或者cwop用户正常,则直接将用户状态置为正常
        if ($ifMigrate || $cwopInfo['data']['status'] == \Cwop::USER_STATUS_NORMAL) {
            $aUserInfo['user_status']     = UserEnum::USER_STATUS_NORMAL;
            $aUserInfo['register_status'] = UserEnum::REGISTER_STATUS_PASS;
        } else {
            $aUserInfo['user_status']     = UserEnum::USER_STATUS_AWAITING_ACTIVATE;
            $aUserInfo['register_status'] = UserEnum::REGISTER_STATUS_NORMAL;
        }

        $aUserInfo['relationship_cwop_user_id']    = $aUserInfo['user_id'];
        $aUserInfo['relationship_cwop_account_id'] = $aUserInfo['account_id'];
        $aUserInfo['register_time']                = $cwopInfo['data']['created_time'];
        $aUserInfo['app_id']                       = $cwopInfo['data']['app_id'];
        $mUserRegister                             = $this->userProvider->getUserRegisterService();

        //获取主账号信息
        $tsbMaster = $mUserInfo->fetchRow(['relationship_cwop_user_id' => $aUserInfo['user_id']]);
        self::$db->transStart();
        //主账号迁移
        if (array_key_exists('master', $groupInfo['data']) && !$tsbMaster) {
            //用户注册表
            if (!self::instance()->addRegisterUser($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '注册表信息添加失败',
                ];
            }

            //用户信息表
            if (!$user_id = self::instance()->addUserInfo($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '用户信息添加失败',
                ];
            };
            //获取主账号信息
            $tsbMaster = $mUserInfo->fetchRow(['relationship_cwop_user_id' => $aUserInfo['user_id']]);
            //更新关联信息
            $mUserRegister->update(['relationship_user' => $user_id], ['user_email' => $aUserInfo['user_email']]);

            $aUserInfo['user_id']    = $tsbMaster->user_id;
            $aUserInfo['account_id'] = $tsbMaster->account_id;
            //用户配置表
            if (!self::instance()->addUserPersonalSettings($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '用户配置信息添加失败',
                ];
            }

            if (!self::instance()->addAccountInfo($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '用户账号信息添加失败',
                ];
            }

            if (!self::instance()->addCompanyInfo($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '公司信息添加失败',
                ];
            }

            if (!self::instance()->setRoles($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '角色信息添加失败',
                ];
            }

            if (!self::instance()->setGroupInfo($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '部门信息添加失败',
                ];
            }

            if (!$this->setPersonalSetting($aUserInfo)) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_MASTER_ERROR,
                    'msg'  => '个人配置失败',
                ];
            }

            if (!self::instance()->initAccountExpireData($aUserInfo['account_id'])) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '账号过期信息添加失败',
                ];
            }

            if (!self::instance()->initAccountServiceExpireTime($aUserInfo['account_id'])) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '服务过期信息添加失败',
                ];
            }

            if (!self::instance()->initAccountLicenseQuotaData($aUserInfo['account_id'])) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_REGISTER,
                    'msg'  => '配额信息添加失败',
                ];
            }
        }

        $aUserInfo['account_id'] = $tsbMaster->account_id;
        //子账号迁移
        if (!$cwopInfo['data']['is_master']) {
            if (array_key_exists('users', $groupInfo['data'])) {
                $mRolesInfo    = $this->userProvider->getRolesInfo();
                $mGroupInfo    = $this->userProvider->getGroupInfo();
                $mUserRegister = $this->userProvider->getUserRegisterService();
                $mRsRolesUser  = $this->userProvider->getRsRolesUser();
                $mRsGroupUser  = $this->userProvider->getRsGroupUser();
                $role          = $mRolesInfo->fetchRow(
                    ['role_right' => UserEnum::USER_ROLE_ADVANCED, 'account_id' => $tsbMaster->account_id], ['role_id' => 'asc']);
                $group         = $mGroupInfo->fetchRow(
                    ['account_id' => $tsbMaster->account_id], ['group_id' => 'asc']);
                foreach ($groupInfo['data']['users'] as $user) {
                    $user_id = $mUserInfo->exists(
                        [
                            'relationship_cwop_user_id'    => $user['user_id'],
                            'relationship_cwop_account_id' => $user['account_id'],
                        ]);
                    if (!$user_id) {
                        $aUserInfo['relationship_cwop_account_id'] = $user['account_id'];
                        $aUserInfo['relationship_cwop_user_id']    = $user['user_id'];
                        $aUserInfo['user_email']                   = $user['user_email'];
                        $aUserInfo['user_mobile']                  = $user['user_mobile'];
                        $aUserInfo['status']                       = $user['status'];
                        if (!$this->addRegisterUser($aUserInfo)) {
                            self::$db->transRollBack();

                            return [
                                'code' => ErrorCodeEnum::STATUS_ERROR_USER_MASTER_ERROR,
                                'msg'  => '子账号注册失败',
                            ];
                        }
                        if (!$user_id = $this->addUserInfo($aUserInfo)) {
                            self::$db->transRollBack();

                            return [
                                'code' => ErrorCodeEnum::STATUS_ERROR_USER_MASTER_ERROR,
                                'msg'  => '子账号用户信息添加失败',
                            ];
                        }
                        $aUserInfo['user_id'] = $user_id;
                        $aUserInfo['account'] = $tsbMaster->account_id;
                        if (!$this->addUserPersonalSettings($aUserInfo)) {
                            self::$db->transRollBack();

                            return [
                                'code' => ErrorCodeEnum::STATUS_ERROR_USER_MASTER_ERROR,
                                'msg'  => '子账号用户配置信息添加失败',
                            ];
                        }
                        if (!$this->setPersonalSetting($aUserInfo)) {
                            self::$db->transRollBack();

                            return [
                                'code' => ErrorCodeEnum::STATUS_ERROR_USER_MASTER_ERROR,
                                'msg'  => '个人配置失败',
                            ];
                        }
                        $mUserRegister->update(
                            ['relationship_user' => $user_id], ['user_email' => $aUserInfo['user_email']]);
                        $insert         = [
                            'user_id' => $user_id,
                            'role_id' => $role->role_id,
                        ];
                        $exists_rs_role = $mRsRolesUser->exists($insert);
                        if (!$exists_rs_role) {
                            $mRsRolesUser->insert($insert);
                            if (!$mRsRolesUser->fetchRow($insert)) {
                                self::$db->transRollBack();

                                return [
                                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_MASTER_ERROR,
                                    'msg'  => '子账号角色关联信息添加失败',
                                ];
                            }
                        }
                        $exists_rs_group = $mRsGroupUser->exists(['user_id' => $user_id]);
                        if (!$exists_rs_group) {
                            $insert_rs_group = [
                                'user_id'  => $user_id,
                                'group_id' => $group->group_id,
                            ];
                            $mRsGroupUser->insert($insert_rs_group);
                            if (!$mRsGroupUser->fetchRow($insert_rs_group)) {
                                self::$db->transRollBack();

                                return [
                                    'code' => ErrorCodeEnum::STATUS_ERROR_USER_MASTER_ERROR,
                                    'msg'  => '子账号部门关联信息添加失败',
                                ];
                            }
                        }

                    }
                }
            }
        }

        self::$db->transCommit();

        return [
            'code' => ErrorCodeEnum::STATUS_SUCCESS,
            'msg'  => '注册成功',
        ];
    }

    /**
     * 添加用户注册信息
     *
     * @param $aUserInfo
     *
     * @return bool|int
     */
    public function addRegisterUser($aUserInfo)
    {
        $mUserRegister = $this->userProvider->getUserRegisterService();
        $mUserRegister->Bind($aUserInfo);
        if ($mUserRegister->exists(['user_email' => $mUserRegister->user_email])) {
            return true;
        }

        return $mUserRegister->selfInsert();
    }

    /**
     * 添加用户信息
     *
     * @param $aUserInfo
     *
     * @return bool|int
     */
    public function addUserInfo($aUserInfo)
    {
        $mUserInfo = $this->userProvider->getUserInfo();
        $mUserInfo->Bind($aUserInfo);
        if ($user_id = $mUserInfo->exists(['user_email' => $mUserInfo->user_email])) {
            return $user_id;
        }

        return $mUserInfo->selfInsert();
    }

    /**
     * 用户配置信息
     *
     * @param $aUserInfo
     *
     * @return bool|int
     */
    public function addUserPersonalSettings($aUserInfo)
    {
        $mUserPersonalSettings = $this->userProvider->getUserPersonalSettings();
        $mUserPersonalSettings->Bind($aUserInfo);
        if (!$mUserPersonalSettings->exists(['user_id' => $aUserInfo['user_id']])) {

            return $mUserPersonalSettings->selfInsert();
        }

        return true;
    }

    /**
     * 账号表
     *
     * @param $aUserInfo
     *
     * @return bool|int
     */
    public function addAccountInfo($aUserInfo)
    {
        $mAccountInfo = $this->userProvider->getAccountInfo();
        $mAccountInfo->Bind($aUserInfo);
        if (!$mAccountInfo->exists(['account_id' => $mAccountInfo->account_id])) {

            return $mAccountInfo->selfInsert();
        }

        return true;
    }

    /**
     * 公司信息创建
     *
     * @param $aUserInfo
     *
     * @return bool|int
     */
    public function addCompanyInfo($aUserInfo)
    {
        $mCompany = $this->userProvider->getCompanyInfo();
        $mCompany->Bind($aUserInfo);
        if (!$mCompany->exists(['account_id' => $mCompany->account_id])) {

            $mCompany->selfInsert();

            return $mCompany->exists(['account_id' => $mCompany->account_id]);
        }

        return true;
    }

    /**
     * 角色信息创建
     *
     * @param $aUserInfo
     *
     * @return bool
     */
    public function setRoles($aUserInfo)
    {
        $mRolesInfo = $this->userProvider->getRolesInfo();
        $mRsRole    = $this->userProvider->getRsRolesUser();
        if (!$mRolesInfo->exists(['account_id' => $aUserInfo['account_id']])) {
            $role_list = [];
            $userRoles = UserEnum::getRoles();
            foreach ($userRoles as $role_right => $role_des) {
                $id = $mRolesInfo->insert(
                    [
                        'role_right' => $role_right,
                        'role_des'   => $role_des,
                        'role_name'  => $role_des,
                        'account_id' => $aUserInfo['account_id'],
                    ]);
                if (!$id) {
                    return false;
                }
                $role_list[$role_right] = $id;
            }

            if (!isset($aUserInfo['role_right']) || !$aUserInfo['role_right'] || !array_key_exists($aUserInfo['role_right'], $role_list)) {
                $aUserInfo['role_right'] = UserEnum::USER_ROLE_ADMIN;
            }
            $insert = [
                'user_id' => $aUserInfo['user_id'],
                'role_id' => $role_list[$aUserInfo['role_right']],
            ];
            $mRsRole->insert($insert);

            return $mRsRole->fetchRow($insert);
        }

        return true;
    }

    /**
     * 部门信息创建
     *
     * @param $aUserInfo
     *
     * @return bool
     */
    public function setGroupInfo($aUserInfo)
    {
        $mGroupInfo = $this->userProvider->getGroupInfo();
        $exists     = $mGroupInfo->exists(
            ['account_id' => $aUserInfo['account_id'], 'group_name' => $aUserInfo['company_name']]);
        if (!$exists) {
            $id = $mGroupInfo->insert(
                [
                    'group_name' => $aUserInfo['company_name'],
                    'parent_id'  => 0,
                    'level'      => 1,
                    'level_sort' => 1,
                    'group_des'  => $aUserInfo['company_name'],
                    'account_id' => $aUserInfo['account_id'],
                ]);
            if (!$id) {
                return false;
            }
            $insert = [
                'user_id'  => $aUserInfo['user_id'],
                'group_id' => $id,
            ];

            $this->userProvider->getRsGroupUser()->insert($insert);
        }

        return true;
    }

    public function setPersonalSetting($aUserInfo)
    {
        $mPersonalSetting = $this->userProvider->getUserPersonalSettings();
        if ($mPersonalSetting->exists(['user_id' => $aUserInfo['user_id']])) {
            return true;
        }

        $mPersonalSetting->Bind($aUserInfo);

        return $mPersonalSetting->selfInsert();
    }

    /**
     * 初始化服务过期表
     *
     * @param $account_id
     *
     * @return bool|int
     */
    public function initAccountServiceExpireTime($account_id)
    {
        $mAccountServiceExpireSetting = $this->userProvider->getAccountServiceExpireSettingService();
        if (ConfigService::instance()->getConfig('account.account_data_expiry_date_default')) {
            $expire = ConfigService::instance()->getConfig('account.account_data_expiry_date_default');
        } else {
            $expire = AccountEnum::EXPIRE_TIME;
        }
        $insert_data = [];
        $day_mins    = 24 * 60 * 60;
        foreach (ServiceTypeEnum::$serviceGroup as $group_id => $item) {
            $current_time = time();
            $expire_real  = $expire;
            foreach ($item as $service_type) {
                $exists = $mAccountServiceExpireSetting->exists(
                    [
                        'account_id'    => $account_id,
                        'service_type'  => $service_type,
                        'service_group' => $group_id,
                    ]);
                if ($exists) {
                    continue;
                }
                $tmp = [
                    'account_id'    => $account_id,
                    'service_group' => $group_id,
                    'service_type'  => $service_type,
                    'start_time'    => $current_time,
                    'end_time'      => $current_time + $expire_real * $day_mins,
                    'updated_time'  => $current_time,
                    'created_time'  => $current_time,
                ];
                array_push($insert_data, $tmp);
            }
        }
        if ($insert_data) {
            $mAccountServiceExpireSetting->insert($insert_data);
        }

        return $mAccountServiceExpireSetting->exists(['account_id' => $account_id]);
    }

    /**
     * 账号过期时间初始化
     *
     * @param $account_id
     *
     * @return bool|int
     */
    public function initAccountExpireData($account_id)
    {
        $mAccountExpire = $this->userProvider->getAccountExpireSettingService();
        $current_time   = time();
        if (ConfigService::instance()->getConfig('admin.account_data_expiry_date_default')) {
            $expire_day = ConfigService::instance()->getConfig('admin.account_data_expiry_date_default');
        } else {
            $expire_day = AccountEnum::EXPIRE_TIME;
        }
        $expire_real = $expire_day;
        $day_mins    = 43200;
        if ($mAccountExpire->exists(
            [
                'account_id' => $account_id,
            ])
        ) {
            return true;
        }
        $insert_data = [
            'account_id'   => $account_id,
            'start_time'   => $current_time,
            'end_time'     => $current_time + $expire_real * $day_mins,
            'privilege'    => AccountEnum::PRIVILEGE_OFF,
            'switch_data'  => AccountEnum::ACCOUNT_DATA_SWITCH_ON,
            'updated_time' => $current_time,
            //            'switch_sap'   => 1,
            'paid_status'  => 1,
            'created_time' => $current_time,
        ];

        $mAccountExpire->insert($insert_data);

        return $mAccountExpire->exists(['account_id' => $account_id]);
    }

    /**
     * 初始化Account配额表
     * app.licenseEnv == 1  || 3 进行初始化配额
     *
     * @param $account_id
     *
     * @return bool
     */
    public function initAccountLicenseQuotaData($account_id)
    {
        if (!ConfigService::instance()->getConfig('app.licenseEnv') || ConfigService::instance()->getConfig(
                'app.licenseEnv') == AccountLicenseEnum::LICENSE_ENV_SAAS || ConfigService::instance()->getConfig(
                'app.licenseEnv') == AccountLicenseEnum::LICENSE_ENV_AGENT
        ) {
            $mLicenseQuota = $this->userProvider->getLicAccountQuota();
            if (ConfigService::instance()->getConfig('app.saasDefaultQuota')) {
                $defaultQuota = ConfigService::instance()->getConfig('app.saasDefaultQuota');
            } else {
                $defaultQuota = AccountLicenseEnum::DEFAULT_ACCOUNT_QUOTA;
            }

            if (ConfigService::instance()->getConfig('app.saasDefaultMobileQuota')) {
                $defaultMobileQuota = ConfigService::instance()->getConfig('app.saasDefaultMobileQuota');
            } else {
                $defaultMobileQuota = AccountLicenseEnum::DEFAULT_ACCOUNT_MOBILE_QUOTA;
            }

            //service_group 只初始化code的
            $serviceGroup = [
                ServiceTypeEnum::TYPE_CODE_AGENT_PHP => $defaultQuota,
                ServiceTypeEnum::TYPE_MOBILE_SDK     => $defaultMobileQuota,
            ];
            foreach ($serviceGroup as $group_id => $item) {
                $exist = $mLicenseQuota->exists(
                    [
                        'account_id'    => $account_id,
                        'service_group' => $group_id,
                    ]);

                if (!$exist) {
                    $inserData = [
                        'account_id'    => $account_id,
                        'quota'         => $item,
                        'service_group' => $group_id,
                        'create_time'   => time(),
                        'update_time'   => time(),
                        'status'        => 1,
                    ];
                    //没有检查是否已经存在该Account配额，因为是空表
                    if (!$mLicenseQuota->insert($inserData)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /**
     * @param $sOriginEmail
     * @param $sNewEmail
     *
     * @return array
     */
    public function resetEmail($sOriginEmail, $sNewEmail, $sAccessToken)
    {
        $mUserInfo     = $this->userProvider->getUserInfo();
        $mUserRegister = $this->userProvider->getUserRegisterService();
        if ($sOriginEmail == $sNewEmail) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_EMAIL_EXISTS,
                'msg'  => '邮箱相同',
            ];
        }
        if ($mUserInfo->exists(['user_email' => $sNewEmail])) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_EMAIL_EXISTS,
                'msg'  => '邮箱已存在',
            ];
        }
        self::$db->transStart();
        $bUpdateUserInfo     = $mUserInfo->update(['user_email' => $sNewEmail], ['user_email' => $sOriginEmail]);
        $bUpdateUserRegister = $mUserRegister->update(['user_email' => $sNewEmail], ['user_email' => $sOriginEmail]);
        if (!$bUpdateUserInfo || !$bUpdateUserRegister) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                'msg'  => '数据更新失败',
            ];
        }

        $result = \Cwop::updateInfo($sAccessToken, '', $sNewEmail);
        if ($result['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            self::$db->transRollBack();

            return $result;
        }

        self::$db->transCommit();

        unset($result['data']);

        return $result;
    }

    /**
     * 短信发送验证
     *
     * @param $mobile
     *
     * @return array
     */
    public function sendValidateCode($mobile)
    {
        $send_sms_api = ConfigService::instance()->getConfig('external_api.send_sms');
        $code         = StringHelper::mkRandomChar(4, 1);
        $data         = [
            'accountId' => '1_107',
            'messages'  => [
                'sms' => [
                    '_body' => '您收到的验证码为:' . $code,
                ],
            ],
            'receivers' => [
                [
                    'sms' => $mobile,
                ],
            ],
            'reqId'     => '0',
        ];

        if ($send_sms_api) {
            ApiClient::instance()->setApi($send_sms_api);
            ApiClient::instance()->setMethod(ApiClient::METHOD_POST);
            ApiClient::instance()->setData(json_encode($data));
            ApiClient::instance()->setHeader('t-userid', '107');
            ApiClient::instance()->setHeader('access_key', 'A9C791D1-FC82-7A67-07BA-4F990BDEE389');
            ApiClient::instance()->go();
            $header = ApiClient::instance()->getHeader();
            //            $body = ApiClient::instance()->getBody();
            //            dd($header, $body);
            if ($header['http_code'] != 200) {
                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_API_RESPONSE_ERROR,
                    'msg'  => '验证码发送失败',
                ];
            } else {
                return [
                    'msg'  => '验证码发送成功',
                    'data' => $code,
                ];
            }
        } else {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_API_RESPONSE_ERROR,
                'msg'  => '短信发送失败',
            ];
        }
    }

    /**
     * @param $sOldMobile
     * @param $sNewMobile
     * @param $sAccessToken
     *
     * @return array
     */
    public function resetMobile($sOldMobile, $sNewMobile, $sAccessToken)
    {
        $mUserInfo     = $this->userProvider->getUserInfo();
        $mUserRegister = $this->userProvider->getUserRegisterService();
        if ($mUserInfo->exists(['user_mobile' => $sNewMobile])) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_MOBILE_EXISTS,
                'msg'  => '号码已存在',
            ];
        }
        self::$db->transStart();
        $bUpdateUserInfo     = $mUserInfo->update(['user_mobile' => $sNewMobile], ['user_mobile' => $sOldMobile]);
        $bUpdateUserRegister = $mUserRegister->update(['user_mobile' => $sNewMobile], ['user_mobile' => $sOldMobile]);
        if (!$bUpdateUserInfo || !$bUpdateUserRegister) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                'msg'  => '数据更新失败',
            ];
        }

        $result = \Cwop::updateInfo($sAccessToken, '', '', $sNewMobile);
        if ($result['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            self::$db->transRollBack();

            return $result;
        }

        self::$db->transCommit();

        unset($result['data']);

        return $result;
    }

    /**
     * 重置密码
     *
     * @param $params
     *
     * @return array
     */
    public function resetPwd($params)
    {
        $old        = $params['old'];
        $new        = $params['new'];
        $user_email = User::instance()->getUserCache()->user_email;

        //登录验证
        $login = \Cwop::signIn($user_email, md5($old));
        if ($login['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR,
                'msg'  => '原密码错误',
            ];
        }

        //更新密码
        $reset = \Cwop::updatePwd($login['data']['accessToken'], md5($old), md5($new));

        return [
            'code' => $reset['code'],
            'msg'  => $reset['msg'],
        ];
    }

    /**
     * 获取部门与分类列表
     *
     * @param $params
     *
     * @return mixed
     */
    public function getGroupList($params)
    {
        $mGroupInfo = $this->userProvider->getGroupInfo();
        $mUserInfo  = $this->userProvider->getUserInfo();
        $groupInfo  = $mGroupInfo->getGroupAnalysis($params['account_id']);
        $groupList  = ArrayHelper::objToArray($groupInfo);
//        dd($groupList);
        $first = array_shift($groupList);
        //分组列表
        $return['grouped_list'] = $groupList;
        //统计所有用户
        $return['all_user'] = $mUserInfo->count(['account_id' => $params['account_id']]);
        //统计暂停用户
        $return['paused_user']  = $mUserInfo->count(['account_id' => $params['account_id'], 'user_status' => UserEnum::USER_STATUS_PAUSED]);
        $return['normal_user']  = $mUserInfo->count(['account_id' => $params['account_id'], 'user_status' => UserEnum::USER_STATUS_NORMAL]);
        $return['deleted_user'] = $mUserInfo->count(['account_id' => $params['account_id'], 'user_status' => UserEnum::USER_STATUS_DELETED]);
        //统计待激活用户
        $return['waiting_activate_user'] = $mUserInfo->count(['account_id' => $params['account_id'], 'user_status' => UserEnum::USER_STATUS_AWAITING_ACTIVATE]);
        //统计未分组用户
        $return['ungrouped_user'] = $first['user_num'];

        return $return;
    }

    /**
     * 获取用户列表
     *
     * @param $params
     *
     * @return array|static[]
     */
    public function getUserList($params)
    {
        $mGroupInfo = $this->userProvider->getGroupInfo();
        $list       = $mGroupInfo->getUserList($params);
        //如果传递了page,则返回分页数据,否则返回全部数据
        if (!isset($params['page'])) {
            $return['list'] = $list;
            $return['total_items_origin'] = count($this->userProvider->getUserInfo()->fetchAll(['account_id'=>$params['account_id']]));
        } else {
            $return = AjaxPageEnum::processPageResult($list, $params['page'], $params['page_size']);
        }

        return $return;
    }

    public function addOrUpdateGroup($params)
    {
        $mGroupInfo = $this->userProvider->getGroupInfo();

        self::$db->transStart();
        //如果未含有group_id则新增部门
        if (!isset($params['group_id'])) {
            if ($mGroupInfo->exists(['account_id' => $params['account_id'], 'group_name' => $params['group_name']])) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB_REPEAT,
                    'msg'  => '部门名称重复',
                ];
            }

            $mGroupInfo->Bind($params);
            $group_id = $mGroupInfo->selfInsert();
            if (!$group_id) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                    'msg'  => '部门添加错误',
                ];
            }

            $params['group_id'] = $group_id;
        }

        //向部门添加用户
        $rsGroupUser = $this->userProvider->getRsGroupUser();
        if (isset($params['user_ids']) && $params['user_ids']) {
            $update = $rsGroupUser->update(['group_id' => $params['group_id']], ['user_id in ?' => $params['user_ids']]);
            if (!$update) {
                self::$db->transRollBack();

                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                    'msg'  => '用户更新错误',
                ];
            }
        }

        //部门权限
        if (isset($params['privilege'])) {
            $rsTypeName      = ServiceCommonEnum::$rsTypeName;
            $check           = [
                'account_id' => $params['account_id'],
                'group_id'   => $params['group_id'],
            ];
            $mGroupPrivilege = $this->userProvider->getGroupPrivilege();
            foreach ($params['privilege'] as $item) {
                if (!$item['ids'] || !array_key_exists($item['type'], $rsTypeName)) {
                    continue;
                }

                $check['target_list'] = array_unique($item['ids']);
                $check['target_type'] = $rsTypeName[$item['type']];
                $mGroupPrivilege->Bind($check);
                if (!$mGroupPrivilege->selfExists()) {
                    $status = $mGroupPrivilege->selfInsert();
                } else {
                    $status = $mGroupPrivilege->selfUpdate();
                }

                if (!$status) {
                    self::$db->transRollBack();

                    return [
                        'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                        'msg'  => '部门权限更新错误',
                    ];
                }
            }
        }

        self::$db->transCommit();

        return [
            'data' => [
                'group_id' => $params['group_id'],
            ],
        ];
    }

    public function removeGroup($params)
    {
        $groupId = $params['group_id'];
        self::$db->transStart();
        $where      = ['group_id' => $groupId, 'account_id' => $params['account_id']];
        $mGroupInfo = $this->userProvider->getGroupInfo();
        if (!$mGroupInfo->delete($where)) {
            self::$db->transRollBack();

            return [
                'msg'  => '部门删除失败',
                'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,

            ];
        }
        $rsGroupUser = $this->userProvider->getRsGroupUser();
        if (!$rsGroupUser->updateDeletedGroup($where)) {
            self::$db->transRollBack();

            return [
                'msg'  => '部门关系迁移失败',
                'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,

            ];
        }

        $mGroupPrivilege = $this->userProvider->getGroupPrivilege();
        if ($mGroupPrivilege->exists($where) && !$mGroupPrivilege->delete($where)) {
            self::$db->transRollBack();

            return [
                'msg'  => '部门权限修改失败',
                'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,

            ];
        }
        self::$db->transCommit();

        return [
            'msg' => '删除成功',
        ];
    }

    /**
     * 获取部门详情
     *
     * @param $params
     *
     * @return array
     */
    public function getGroupItem($params)
    {
        $aTypeName  = array_flip(ServiceCommonEnum::$rsTypeName);
        $return     = [];
        $mGroupInfo = $this->userProvider->getGroupInfo();
        $where      = ['account_id' => $params['account_id'], 'group_id' => $params['group_id']];
        $groupInfo  = $mGroupInfo->fetchRow($where);
        if (!$groupInfo) {
            return [
                'code' => ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB_DATA_EMPTY,
                'msg'  => '未查到数据',
            ];
        }
        $return['group_name'] = $groupInfo->group_name;
        $mGroupPrivilege      = $this->userProvider->getGroupPrivilege();
        $privilegeList        = $mGroupPrivilege->fetchAll($where);
        foreach ($privilegeList as $item) {
            $list = json_decode($item->target_list, true);
            $list = array_unique($list);
            $tmp  = [];
            foreach ($list as $id) {
                if ($id) {
                    $tmp[] = $id;
                }
            }
            $name = $aTypeName[$item->target_type];
            if ($tmp) {
                $return['privilege'][$name] = $tmp;
            }
        }

        $return['user_list'] = $mGroupInfo->getUserList($params);

        return [
            'data' => $return,
        ];
    }

    /**
     * 修改用户角色与启用状态
     *
     * @param $params
     *
     * @return array
     */
    public function updateGroupUser($params)
    {
        $user_id    = $params['user_id'];
        $mUserInfo  = $this->userProvider->getUserInfo();
        $userInfo   = $mUserInfo->fetchRow(['user_id' => $user_id]);
        $account_id = User::getUserCache()->account_id;
        if (User::getUserCache()->role_right != UserEnum::USER_ROLE_ADMIN || $userInfo->account_id != $account_id) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR,
                'msg'  => '权限不足',
            ];
        }

        //更新用户角色
        if (isset($params['role_right'])) {
            $mRsRole = $this->userProvider->getRsRolesUser();
            if (!$mRsRole->updateUserRole(['role_right' => $params['role_right'], 'user_id' => $user_id, 'account_id' => $params['account_id']])) {
                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                    'msg'  => '服务端处理错误',
                ];
            }
        }

        //更新用户状态
        if (isset($params['user_status'])) {
            $mUserInfo = $this->userProvider->getUserInfo();
            if (!in_array($params['user_status'], [UserEnum::USER_STATUS_PAUSED, UserEnum::USER_STATUS_NORMAL, UserEnum::USER_STATUS_DELETED])) {
                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR,
                    'msg'  => '权限不足',
                ];
            }

            $userInfo = $mUserInfo->fetchRow(['user_id' => $user_id, 'account_id' => $account_id]);
            if ($userInfo['user_status'] == UserEnum::USER_STATUS_AWAITING_ACTIVATE) {
                if ($params['user_status'] != UserEnum::USER_STATUS_DELETED) {
                    return [
                        'code' => ErrorCodeEnum::STATUS_ERROR,
                        'msg'  => '权限不足',
                    ];
                }
            }
            if (in_array($userInfo['user_status'], [UserEnum::USER_STATUS_PAUSED, UserEnum::USER_STATUS_NORMAL])) {
                if (!in_array($params['user_status'], [UserEnum::USER_STATUS_PAUSED, UserEnum::USER_STATUS_NORMAL])) {
                    return [
                        'code' => ErrorCodeEnum::STATUS_ERROR,
                        'msg'  => '权限不足',
                    ];
                }
            }
            if ($userInfo->user_status != $params['user_status']) {
                if (!$mUserInfo->update(['user_status' => $params['user_status']], ['user_id' => $user_id])) {
                    return [
                        'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                        'msg'  => '服务端处理错误',
                    ];
                }
            } else {
                return [
                    'code' => ErrorCodeEnum::STATUS_ERROR_API_DB_ERROR,
                    'msg'  => '角色未变化',
                ];
            }
        }

        return [
            'msg' => 'success',
        ];
    }

    public function addGroupUser($params)
    {
        $mUserInfo = $this->userProvider->getUserInfo();
        //poc环境可以自定义密码
        if (ConfigService::instance()->getConfig('poc.default_password')) {
            $aUserInfo['user_pass'] = md5(ConfigService::instance()->getConfig('poc.default_password'));
        } else {
            $aUserInfo['user_pass'] = md5(StringHelper::mkRandomChar());
        }

        //cwop注册
        $aSignUpResult = \Cwop::signUp($params['email'], $aUserInfo['user_pass'], $params['email'], User::getUserCache()->relationship_cwop_account_id);
//        $aSignUpResult = \Cwop::signIn($params['email'], md5(123456));
        //注册失败则返回错误信息
        if ($aSignUpResult['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            return $aSignUpResult;
        }
        $sAccessToken = $aSignUpResult['data']['accessToken'];

        //如果不需要邮件验证,则执行激活操作
        if (ConfigService::instance()->getConfig('poc.remove_email_activate')) {
            \Cwop::updateStatus($sAccessToken, $aSignUpResult['data']['user_id'], \Cwop::USER_STATUS_NORMAL);
        } else {
            self::instance()->sendActivateEmail($mUserInfo->user_email, $aSignUpResult['data']['accountRegion']['domain_name'], $sAccessToken);
        }

        //单机房处理
        $aCwopInfo  = \Cwop::getInfo($sAccessToken);
        $aGroupInfo = \Cwop::groupGet($sAccessToken);
        $result     = $this->migrateUserFromCwop($aCwopInfo, $aGroupInfo, false);
        $userInfo   = $mUserInfo->fetchRow(['user_email' => $params['email']]);

        //更新角色
        $mRsRole = $this->userProvider->getRsRolesUser();
        $mRsRole->updateUserRole(['user_id' => $userInfo->user_id, 'account_id' => $userInfo->account_id, 'role_right' => $params['role_right']]);

        //更新部门
        $mRsGroup = $this->userProvider->getRsGroupUser();
        $mRsGroup->update(['group_id' => $params['group_id']], ['user_id' => $userInfo->user_id]);

        return $result;
    }


    public function getUserInfo($params)
    {
        $companyModel = self::$provider->getUserProvider()->getCompanyInfo();
        $companyName  = $companyModel->getAccountCompanyName($this->getUserCache()->account_id);
        if ($companyName) {
            $companyName = array_pop($companyName)->company_name;
        } else {
            $companyName = 'unkonwn';
        }

        $accountExpireSetting = self::$provider->getUserProvider()->getAccountExpireSettingService();
        $userType             = $accountExpireSetting->getAccountType($this->getUserCache()->account_id);
        $userType             = array_pop($userType)->paid_status;
        $userType             = (int)$userType == 2 ? 'paid' : 'free';

        $mUserInfo               = $this->userProvider->getUserInfo();
        $user_info = $mUserInfo->fetchRow($this->getUserCache()->user_id);

        return array(
            'user_name'   => $user_info->user_name,
            'user_email'  => $user_info->user_email,
            'user_mobile' => $user_info->user_mobile,
            'compony'     => $companyName,
            'user_type'   => $userType,
        );
    }

    public function getQuotaLeft($params)
    {

        $serverHostInfo         = $this->getAppHostInfo();
        $mobileInfo             = $this->getMobileQuotaInfo();
        $mobile_used_from_redis = $this->getLicenseUsedQuotaFromRedis();
        $mobileInfo['used']     = $mobile_used_from_redis;

        $ue_info = $this->getCurrentUeInfo();

        return array('app' => $serverHostInfo, 'mobile' => $mobileInfo, 'ue' => $ue_info);
    }


    public function getCurrentUeInfo()
    {

        // sasa用户 获取历史信息
        if (!AccountLicenseEnum::isPocEnv()) {
            $account_id = $this->getUserCache()->account_id;
            $licAccount = self::$provider->getUserProvider()->getLicAccountQuota();
            $licAccount->setSelect(array('quota', 'used', 'excess'));
            $current_data = $licAccount->fetchRow(array('account_id' => $account_id, 'service_group' => ServiceTypeEnum::TYPE_UE));

        } else {
            //私有环境获取历史信息
            $licConsume = self::$provider->getUserProvider()->getLicConsumeStatus();
            $licConsume->setSelect(array('quota', 'used', 'excess'));
            $current_data = $licConsume->fetchRow(array('service_group' => ServiceTypeEnum::TYPE_UE));
        }

        return (array)$current_data;
    }


    /**
     * 从redis 查询 当前月份的mobile 累计活跃用户数
     *
     * @param key m_u(year)-(month)(account_id  | private)
     *
     * @return mixed
     */
    public function getLicenseUsedQuotaFromRedis()
    {
        $account_id = $this->getUserCache()->account_id;
        switch ((int)ConfigService::instance()->getConfig('app.licenseEnv')) {
            case AccountLicenseEnum::LICENSE_ENV_SAAS:
                $title = $account_id;
                break;
            case AccountLicenseEnum::LICENSE_ENV_PRIVATE:
                $title = 'private';
                break;
            case AccountLicenseEnum::LICENSE_ENV_AGENT:
                $title = $account_id;
                break;
            default:
                $title = $account_id;
                break;
        }

        $cache  = self::$provider->getMainProvider()->getCacheService();
        $key    = 'm_u' . date('Y', time()) . '-' . date('m', time()) . $title;
        $result = $cache->getHlen($key);

        return $result;
    }

    public function getMobileQuotaInfo()
    {
        $data              = array(
            'quota' => 0,
            'used'  => 0,
        );
        $quotaCurrentQuota = 0;
        //获取当前配置
        if (!AccountLicenseEnum::isPocEnv()) {
            $fetchParams      = array(
                'account_id'    => $this->getUserCache()->account_id,
                'service_group' => ServiceTypeEnum::TYPE_MOBILE_SDK,
            );
            $licAccount       = self::$provider->getUserProvider()->getLicAccountQuota();
            $quotaCurrentInfo = $licAccount->fetchRow($fetchParams);
            if ($quotaCurrentInfo) {
                $quotaCurrentQuota = $quotaCurrentInfo->quota;
            }
        } else {
            $fetchParams      = array(
                'service_group' => ServiceTypeEnum::TYPE_MOBILE_SDK,
            );
            $licConsume       = self::$provider->getUserProvider()->getLicConsumeStatus();
            $quotaCurrentInfo = $licConsume->fetchRow($fetchParams);
            if ($quotaCurrentInfo) {
                $quotaCurrentQuota = $quotaCurrentInfo->quota;
            }
        }

        $data['quota'] = $quotaCurrentQuota;

        return $data;
    }


    public function getAppHostInfo()
    {

        $licAccountQuotaModel  = self::$provider->getUserProvider()->getLicAccountQuota();
        $licConsumeStatusModel = self::$provider->getUserProvider()->getLicConsumeStatus();
        $licHostLicenseModel   = self::$provider->getUserProvider()->getLicenseHostList();

        if (!AccountLicenseEnum::isPocEnv()) {
            $licAccountQuotaModel->setSelect(array('quota'));
            $quota_num = $licAccountQuotaModel->fetchRow(
                array(
                    'account_id'    => $this->getUserCache()->account_id,
                    'service_group' => AccountEnum::$EXPIRE_WARNING_MOUDEL['app'],
                )
            );

            $active_host_id = $licHostLicenseModel->fetchAll(array('account_id' => $this->getUserCache()->account_id, 'is_active' => AccountLicenseEnum::LICENSE_HOST_IS_ACTIVE_TRUE));

        } else {
            $active_host_id = $licHostLicenseModel->fetchAll(array('is_active' => AccountLicenseEnum::LICENSE_HOST_IS_ACTIVE_TRUE));

            $licConsumeStatusModel->setSelect(array('quota', 'start_time', 'end_time'));
            $quota_num = $licConsumeStatusModel->fetchRow(
                array(
                    'service_group' => AccountEnum::$EXPIRE_WARNING_MOUDEL['app'],
                )
            );
            $all_days  = ceil(($quota_num->end_time - $quota_num->start_time) / 24 / 3600);
            $all_days  = $all_days > 0 ? $all_days : 0;

            $days                 = ceil(($quota_num->end_time - time()) / 24 / 3600);
            $days                 = $days > 0 ? $days : 0;
            $days                 = $days > $all_days ? $all_days : $days;
            $quota_num->left_days = $days;
        }
        if ($quota_num) {
            $quota_num->used = count($active_host_id);
        } else {
            //没有初始化lic_account_quota表的时候，初始化默认值
            $quota_num             = new stdClass();
            $quota_num->quota      = '-';
            $quota_num->used       = '-';
            $quota_num->start_time = '-';
            $quota_num->end_time   = '-';
            $quota_num->left_days  = '-';
        }

        return $quota_num;
    }


    public function getMoudleOverTime($params)
    {

        $serviceExpireSettingModel = self::$provider->getUserProvider()->getAccountServiceExpireSettingService();
        $service_list              = $serviceExpireSettingModel->getMoudelExpireTime($this->getUserCache()->account_id);
        $moudelInfo                = $this->processModuleInfo($service_list);

        return $moudelInfo;
    }

    public function processModuleInfo($service_list)
    {

        foreach ($service_list as $service) {
            $service->group_name = ServiceTypeEnum::getServiceGroupName($service->service_group);

            $all_days = floor(($service->end_time - $service->start_time) / 24 / 3600);
            $all_days = $all_days > 0 ? $all_days : 0;

            $days = floor(($service->end_time - time()) / 24 / 3600);
            $days = $days > 0 ? $days : 0;
            $days = $days > $all_days ? $all_days : $days;

            $service->left_by_days = $days;
            $service->all_days     = $all_days;
            if ($all_days) {
                $service->rate = round($days / $all_days, 3) * 100;
            } else {
                $service->rate = 0;
            }

            $service->start_time = date('Y-m-d', $service->start_time);
            $service->end_time   = date('Y-m-d', $service->end_time);
        }

        return $service_list;
    }

    public function getMoudleQuota($params)
    {

        $data           = array();
        $params['page'] = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $mobile_info    = $this->getMobileHistoryList();

        $ue_info = $this->getUeHistoryList();

        foreach ($mobile_info as $month => $item) {
            $data[] = [
                'month'        => $month,
                'mobile_quota' => $item['quota'],
                'mobile_used'  => $item['used'],
                'ue_quota'     => $ue_info[$month]['quota'],
                'ue_used'      => $ue_info[$month]['used'],
                'ue_excess'    => $ue_info[$month]['excess'],
                'time'         => $item['time'],
            ];
        }

        ArrayHelper::sortByUser($data, 'time', 'desc');
        $data = AjaxPageEnum::processPageResult($data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $data;
    }


    public function getMobileHistoryList()
    {

        $return = array();
        if (!AccountLicenseEnum::isPocEnv()) {
            $account_id  = $this->getUserCache()->account_id;
            $fetchParams = array(
                'account_id'    => $account_id,
                'service_group' => ServiceTypeEnum::TYPE_MOBILE_SDK,
            );
        } else {
            $account_id  = 0;
            $fetchParams = array(
                'service_group' => ServiceTypeEnum::TYPE_MOBILE_SDK,
            );
        }

        $licenseUpdatedHistoryModel = self::$provider->getUserProvider()->getLicenseQuotaUpdatedHistory();
        $licenseUpdatedHistoryModel->setTable($account_id);

        $data = $licenseUpdatedHistoryModel->fetchAll($fetchParams);

        //非连续月份  处理方式
        $dateArray = array();

        foreach ($data as $k => $v) {
            $temp['date']                  = date('Y-m', $v->date);
            $temp['quota']                 = $v->quota;
            $temp['used']                  = $v->used;
            $temp['time']                  = $v->date;
            $return[date('Y-m', $v->date)] = $temp;
        }

        return $return;
    }


    public function getUeHistoryList()
    {

        $result = array();
        // sasa用户 获取历史信息
        if (!AccountLicenseEnum::isPocEnv()) {
            $account_id = $this->getUserCache()->account_id;

        } else {
            $account_id = 0;
        }

        $licenseUpdatedHistoryModel = self::$provider->getUserProvider()->getLicenseQuotaUpdatedHistory();
        $licenseUpdatedHistoryModel->setTable($account_id);
        $quota_data = $licenseUpdatedHistoryModel->fetchAll(array('account_id' => $account_id, 'service_group' => ServiceTypeEnum::TYPE_UE));


        foreach ($quota_data as $item) {

            $result[date('Y-m', $item->date - 24 * 3600)] = [
                'date'   => date('Y-m', $item->date - 24 * 3600),
                'quota'  => $item->quota,
                'used'   => $item->used,
                'excess' => (int)$item->excess,
                'time'   => $item->date,
            ];
        }

        return $result;
    }

    public function getPluginPanelList($params)
    {

        $return               = array();
        $account_id           = $this->getUserCache()->account_id;
        $mHostModel           = self::$provider->getHostProvider()->getDimHostService();
        $params['start_time'] = (time() - 3600) * 1000;
        $params['end_time']   = time() * 1000;
        $params['page']       = isset($params['page']) && $params['page'] ? $params['page'] : 1;

        $whereHost = array(
            'account_id = ?' => $account_id,
            //            'status = ?'=>HostEnum::HOST_STATUS_NORMAL,
        );
        $filter    = array();
        if (isset($params['name']) && $params['name']) {
            $title                          = str_replace(array('_', '%'), array('\_', '\%'), $params['name']);
            $whereHost['host_name like ? '] = '%' . $title . '%';
        }
        if (isset($params['filter']) && !empty($params['filter'])) {
            $filter            = array_keys($params['filter']);
            $service_type_list = array_keys(ServiceTypeEnum::$serviceNameList);
            $filter            = array_diff($service_type_list, $filter);
            $filter            = array_values($filter);
        }

        if (isset($params['order']) && in_array($params['order'], array('ram_rate', 'cpu_rate', 'wait', '15min'))) {
            $order = $params['order'];
        } else {
            $order = 'ram_rate';
        }

        if (isset($params['sort']) && in_array($params['sort'], array('desc', 'asc'))) {
            $sort = $params['sort'];
        } else {
            $sort = 'desc';
        }

        $mPluginOfHost = self::$provider->getHostProvider()->getNewPluginOfHost();

        $host_in  = $mPluginOfHost->getGroupHostIdByServiceType($account_id, $filter);
        $host_ids = array();
        foreach ($host_in as $value) {
            $host_ids[] = $value->host_id;
        }
        $host_ids = array_unique($host_ids);

        if ($host_ids) {
            $whereHost['host_id in ?'] = $host_ids;

            $mHostModel->setSelect(array('host_id', 'host_name', 'host_type'));

            $host_list = $mHostModel->fetchAll($whereHost);

            $host_plugin = $mPluginOfHost->getGroupSserviceTypeByHostId($account_id, $host_ids);

            $host_ids = array_unique($host_ids);


            $hostData = self::$provider->getAppProvider()->getAppListService()->getHostList($params, array_values($host_ids));


            foreach ($host_list as $hostObj) {
                $return[$hostObj->host_id] = array(
                    'host_name'    => $hostObj->host_name,
                    //                'sys_version'=>$hostObj->sys_version,
                    'host_type'    => $hostObj->host_type,
                    'service_type' => array(),
                    'ram_rate'     => '-',
                    'cpu_rate'     => '-',
                    'wait'         => '-',
                    '15min'        => '-',
                    'host_id'      => $hostObj->host_id,
                );
            }

            foreach ($host_plugin as $pluginObj) {
                if (array_key_exists($pluginObj->host_id, $return)) {
                    $return[$pluginObj->host_id]['service_type'][ServiceTypeEnum::$serviceNameList[$pluginObj->service_type]] = $pluginObj->count;
                }
            }

            foreach ($hostData as $key => $es_data) {
                if (array_key_exists($key, $return)) {
                    $return[$key]['ram_rate'] = $es_data['ram_rate'];
                    $return[$key]['cpu_rate'] = $es_data['cpu_rate'];
                    $return[$key]['wait']     = $es_data['wait'];
                    $return[$key]['15min']    = $es_data['15min'];
                }
            }

            //根据排序参数排序
            ArrayHelper::sortByUser($return, $order, $sort);
            $return = AjaxPageEnum::processPageResult($return, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        }

        return $return;
    }

    public function getApiSecretKey($params)
    {

        $secret = \Cwop::getSecretCode($this->getUserCache()->access_token);
        if (!$secret['data']['secret_code']) {
            $secret = \Cwop::updateSecretCode($this->getUserCache()->access_token);
        }
        if ($secret['code'] == ErrorCodeEnum::STATUS_SUCCESS) {
            $secret = $secret['data']['secret_code'];
        } else {
            $secret = '';
        }
        $data_types = self::$provider->getUserProvider()->getAccountType()->getDataSourceTypes($this->getUserCache()->account_id);

        return array(
            'secret'     => $secret,
            'data_types' => $data_types,
            'api'=>ConfigService::instance()->getConfig('dataShare'),
        );
    }

    public function changeApiSecret($params)
    {

//        if ($error_info = $this->informDataSourceUpdateSecret()) {
//            $this->rest->error($error_info);
//        }
        $result = \Cwop::updateSecretCode($this->getUserCache()->access_token);
        if ($result['code'] == ErrorCodeEnum::STATUS_SUCCESS) {
            $secret_key = $this->getUserCache()->relationship_cwop_account_id . '_secret';
            $cache      = self::$provider->getMainProvider()->getCacheService();
            $cache->set($secret_key, $result['data']['secret_code'], CacheExpireEnum::EXPIRE_SECRET_CODE_TIME, CacheKeyEnum::TAG_CWOP);
            $data = array('secret' => $result['data']['secret_code']);
            RESTService::instance()->success($data);
        } else {
            RESTService::instance()->error($result['msg'], $result['code']);
        }
    }


    public function saveApiSecret($params)
    {

        $mAccountType = self::$provider->getUserProvider()->getAccountType();
        BaseModel::transStart();
        try {
            $account_id = $this->getUserCache()->account_id;
            $status     = false;

            //传过来是一个数组/对象 七次 有的添加没有删除
            foreach ($params['data'] as $data_type => $data_value) {
                if (!array_key_exists($data_type, ServiceTypeEnum::$dataSourceType)) {
                    RESTService::instance()->error();
                }
                $data_source = ServiceTypeEnum::$dataSourceType[$data_type];
                if ($data_value == UserEnum::DATA_SHARE_CHOSEN) {
                    foreach ($data_source as $type => $group) {
                        $check = array(
                            'account_id' => $account_id,
                            'data_type'  => $type,
                            'group_name' => $group,
                        );
                        if (!$mAccountType->exists($check)) {
                            $check['create_time'] = time();
                            if (!$mAccountType->insert($check)) {
                                $status = true;
                                break 2;
                            }
                        }
                    }
                } else {
                    if ($data_value == UserEnum::DATA_SHARE_NOT_CHOSEN) {
                        foreach ($data_source as $type => $group) {
                            $check = array(
                                'account_id' => $account_id, //$id =$mAccountType->exists();返回id 然后就是把id放到一个列表里面 统一删除
                                'data_type'  => $type,
                            );
                            if ($mAccountType->exists($check)) {
                                if (!$mAccountType->delete($check)) {
                                    $status = true;
                                    break 2;
                                }
                            }
                        }
                    }
                }
            }

            if ($status) {
                BaseModel::transRollBack();
                RESTService::instance()->error();
            } else {
                BaseModel::transCommit();
                RESTService::instance()->success();
            }
        } catch (\Exception $e) {
            BaseModel::transRollBack();
            RESTService::instance()->error();
        }

    }

    public function ModifyUserName($params)
    {

        $dimAppModel = self::$provider->getUserProvider()->getUserInfo();

        if ($dimAppModel->exists(array('user_name' => $params['name']))) {
            RESTService::instance()->error('用户名已经存在');
        } else {
            $dimAppModel->update(array('user_name' => $params['name']), array('user_id' => $this->getUserCache()->user_id));
            RESTService::instance()->success('修改成功');
        }

    }

    public function getPluginList(){

        $data = self::$provider->getHostProvider()->getNewPluginOfHost()->getUserPluginType($this->getUserCache()->account_id);

        return $data;
    }



}