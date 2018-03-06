<?php
use cloudwise\tsb\business\account\User;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;
use cloudwise\tsb\datasource\helper\DESHelper;
use App\library\Service\ConfigService;
use cloudwise\tsb\datasource\helper\ApiClient;
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/10/26
 * Time: 下午9:38
 */

class UserTest extends PHPUnit_YafTestCase
{
    public function testInit()
    {
//        $this->sendValidateCode();
        $this->getLoginParams();
//        $this->Sign();
//        $this->Login();
//        $this->RegisterUser();
    }


    public function getLoginParams()
    {
        $token = time();
        $email = 'bear@yunzhihui.com';
        $password = '123456';
        $email = urlencode(DESHelper::instance()->AesEncode($token, $email));
        $password = urlencode(DESHelper::instance()->AesEncode($token, $password));
        echo '/account/user/login?email='.$email.'&pw='.$password.'&token='.$token;
    }

    /**
     * 短信发送验证
     */
    public function sendValidateCode()
    {
        $send_sms_api = ConfigService::instance()->getConfig('external_api.send_sms');
        $data = array(
            'messages' => array(
                'sms' => array(
                    '_body' => '您的注册验证码为:123456'
                )
            ),
            'receivers' => array(
                array(
                    'sms' => 15811076475,
                )
            ),
            'reqId' => '0'
        );

        if ($send_sms_api) {
            ApiClient::instance()->setApi($send_sms_api);
            ApiClient::instance()->setMethod(ApiClient::METHOD_POST);
            ApiClient::instance()->setData(json_encode($data));
            ApiClient::instance()->setHeader('t-userid', '107');
            ApiClient::instance()->setHeader('access_key', 'A9C791D1-FC82-7A67-07BA-4F990BDEE389');
            ApiClient::instance()->go();
            $body = ApiClient::instance()->getBody();
            dd($body);
        }
    }

    /**
     * 获取远程登录签名
     */
    public function Sign()
    {
        $aResultSign = User::instance()->getLoginTicket('585ffe76f547c318cb3614cfb74b05e5');
        $this->assertTrue($aResultSign['code'] == ErrorCodeEnum::STATUS_SUCCESS);
        var_dump($aResultSign);
        $aResultLogin = User::instance()->loginByTicket($aResultSign['data']['ticket']);
        $this->assertTrue($aResultLogin['code'] == ErrorCodeEnum::STATUS_SUCCESS);
        var_dump($aResultLogin);
    }

    public function Login()
    {
        //本地登录
        $result = User::instance()->loginByLocal('mona.wang@yunzhihui.com','123456');
        $this->assertTrue($result['code'] == ErrorCodeEnum::STATUS_SUCCESS);
        var_dump($result);
        $result = User::instance()->loginByPublic('mona.wang@yunzhihui.com','123456');
        dd($result);
        $this->assertTrue($result['code'] == ErrorCodeEnum::STATUS_SUCCESS);
        var_dump($result);
        $aResultLogin = User::instance()->loginByTicket($result['data']['ticket']);
        $this->assertTrue($aResultLogin['code'] == ErrorCodeEnum::STATUS_SUCCESS);
        var_dump($aResultLogin);
    }

    /**
     * 注册
     */
    public function RegisterUser()
    {
        $email = 'test@125.com';
        $mobile = '15811076458';
        $aExistsEmail = Cwop::validateEmailExists($email);
        $aExistsMobile = Cwop::validateMobileExists($mobile);
        if(!$aExistsMobile['data']['isExistsMobile'] && !$aExistsEmail['data']['isExistsEmail']){
            $params = array(
                'company_address'=>'test',
                'company_name'=>'test',
                'company_url'=>'test',
                'user_name'=>'test',
                'user_email'=>$email,
                'user_mobile'=>$mobile,
            );

            $result = User::instance()->registerPublic($params);
            $this->assertTrue($result['code'] == ErrorCodeEnum::STATUS_SUCCESS);
            var_dump($result);
        }
    }
}