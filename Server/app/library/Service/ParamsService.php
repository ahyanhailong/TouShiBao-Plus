<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/10/25
 * Time: 上午11:40
 */

namespace App\library\Service;

use cloudwise\tsb\datasource\constants\ParamsEnum;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\helper\ValidHelper;
use Yaf\Request_Abstract;
use Respect\Validation\Validator;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;
use cloudwise\tsb\datasource\base\CacheService;
use cloudwise\tsb\datasource\constants\UserEnum;
use cloudwise\tsb\datasource\Provider;

/**
 * 参数服务
 * Class ParamsService
 *
 * @package App\library\Service
 */
class ParamsService extends BaseService
{
    public static $params = null;

    /**
     * @var CacheService
     */
    private $cache;

    /**
     * @var ParamsService
     */
    private static $self = null;

    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    /**
     * 参数初始化
     *
     * @param Request_Abstract $request
     */
    public function setParams(Request_Abstract $request)
    {
        $params = (array)$request->getParams();
        $aPostRawData = (array)json_decode(trim(file_get_contents('php://input')), true);
        //接收get form-data
        $params = array_merge($params, $_GET);
        //接收post form-data
        $params = array_merge($params, $_POST);
        //接收post raw-data
        $params = array_merge($params, $aPostRawData);
        //浏览器访问时不需要显式添加签名的参数
        $this->cache = \Yaf\Registry::get(Provider::PROVIDER_NAME)->getMainProvider()->getCacheService();
        if (!isset($params['sign']) && isset($_COOKIE[ UserEnum::USER_INFO_COOKIE_KEY ])) {
            $params['sign'] = $_COOKIE[ UserEnum::USER_INFO_COOKIE_KEY ];
        }
        $params['route_name'] = implode(
            '', [
            $request->getModuleName(),
            $request->getControllerName(),
            $request->getActionName(),
        ]);
        self::$params = $params;
    }

    public function getParams()
    {
        return self::$params;
    }

    /**
     * 测试路由及参数的合法性
     * @param Request_Abstract $request
     */
    public function checkParams(Request_Abstract $request)
    {
//        dd(self::$params['route_name']);
        $routeParams = ParamsEnum::getRouteParams($request->getModuleName(), $request->getControllerName());
        //路由过滤
        if (!array_key_exists(self::$params['route_name'], $routeParams)) {
            RESTService::instance()->checkError(
                [
                    'msg'  => 'route undefined',
                    'code' => ErrorCodeEnum::STATUS_ROUTE_UNDEFINED,
                ]);
        }
        $valid_params = $routeParams[ self::$params['route_name'] ];

        //过滤器过滤
        if (isset($valid_params['filter'])) {
            foreach ($valid_params['filter'] as $filter) {
                call_user_func(
                    function () use ($filter) {
                        switch ($filter) {
                            case 'user':
                                $check = FilterService::instance()->userFilter();
                                RESTService::instance()->checkError($check);
                                break;
                        }

                    });
            }
        }
        unset($valid_params['filter']);

        //字段完整性检测
        foreach ($valid_params as $field => $item) {
            if (!array_key_exists($field, self::$params)) {
                if (is_array($item) && array_key_exists('default', $item)) {
                    self::$params[ $field ] = $item['default'];
                } else {
                    RESTService::instance()->error('param ' . $field . ' is required');
                }
            }

            if (is_array($item)) {
                foreach ($item as $rule => $rule_set) {
                    $bValid = true;
                    $params_tip = '';
                    switch($rule){
                        case 'email':
                            $bValid = ValidHelper::validEmail(self::$params[ $field ]);
                            break;
                        case 'string':
                            $ps = [];
                            if(array_key_exists('params', $rule_set)){
                                $ps = explode(',', $rule_set['params']);
                                if(count($ps) == 2){
                                    $params_tip = implode('-', $ps);
                                }else{
                                    $params_tip = 'min length:'. $ps[0];
                                }
                            }
                            $ps = ArrayHelper::mergeArray([null, null], $ps);
                            $bValid = ValidHelper::validLength(self::$params[ $field ], $ps[0], $ps[1]);
                            break;
                        case 'array':
                            $bValid = ValidHelper::validArray(self::$params[ $field ]);
                            break;
                        case 'mobile':
                            $bValid = ValidHelper::validMobile(self::$params[ $field ]);
                            break;
                        case 'password':
                            $bValid = ValidHelper::validPassword(self::$params[ $field ]);
                            break;
                    }
                    if (!$bValid) {
                        if(is_string($rule_set)){
                            $msg = $rule_set;
                        }else if(is_array($rule_set) && array_key_exists('msg', $rule_set)){
                            $msg = $rule_set['msg'];
                        }else{
                            $msg = '';
                        }

                        if(is_array(self::$params[$field])){
                            self::$params[$field] = json_encode(self::$params[$field]);
                        }

                        if($params_tip){
                            $returnMsg = $msg . ',['. $field . ':' . implode(',',[self::$params[ $field ], $params_tip]) .']';
                        }else{
                            $returnMsg = $msg . ',['. $field . ':' . self::$params[ $field ] .']';
                        }
                        $return = [
                            'msg'  => $returnMsg,
                            'code' => ErrorCodeEnum::STATUS_ERROR_PARAMS,
                        ];
                        RESTService::instance()->checkError($return);
                    }
                }
            }
        }
    }
}