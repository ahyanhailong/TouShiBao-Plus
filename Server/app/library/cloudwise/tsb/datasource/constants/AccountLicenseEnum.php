<?phpnamespace cloudwise\tsb\datasource\constants;use App\library\Service\ConfigService;/** * Created by PhpStorm. * User: jimmy.jin@cloudwise.com * Date: 2017-4-12 * Time: 3:30pm */class AccountLicenseEnum{    const LICENSE_ENV_SAAS = 1;    const LICENSE_ENV_PRIVATE = 2;    const LICENSE_ENV_AGENT = 3;    //代理商    const LICENSE_HOST_IS_ACTIVE_TRUE = 1;    const LICENSE_HOST_IS_ACTIVE_FALSE = 0;    const DEFAULT_ACCOUNT_QUOTA = 5;    const DEFAULT_ACCOUNT_MOBILE_QUOTA = 5;    public static function isPocEnv()    {        return (int)ConfigService::instance()->getConfig('app.licenseEnv') === 2;    }    public static function getLicenseHostStatus($status)    {        $type = [            self::LICENSE_HOST_IS_ACTIVE_FALSE => '未接收',            self::LICENSE_HOST_IS_ACTIVE_TRUE  => '接收',        ];        if (array_key_exists($status, $type)) {            return [                'status' => $status,                'info'   => $type[ $status ],            ];        } else {            return [                'status' => self::LICENSE_HOST_IS_ACTIVE_FALSE,                'info'   => '未接收',            ];        }    }}