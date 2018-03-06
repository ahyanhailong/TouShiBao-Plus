<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/3
 * Time: 下午5:22
 */

namespace cloudwise\tsb\business;

use App\library\Service\ConfigService;
use cloudwise\tsb\datasource\base\CacheService;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\helper\ApiClient;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use cloudwise\tsb\datasource\helper\DESHelper;
use Yaf\Registry;
use Yaf\Exception;
use cloudwise\tsb\datasource\Provider;

class Business
{
    /**
     * @var Provider;
     */
    public static $provider;

    /**
     * @var CacheService;
     */
    public static $cache;

    /**
     * @var MysqlService
     */
    public static $db;

    /**
     * @var Business
     */
    private static $self = null;

    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function __construct()
    {
        self::$provider = Registry::get(Provider::PROVIDER_NAME);
        self::$cache = self::$provider->getMainProvider()->getCacheService();
        self::$db = self::$provider->getMainProvider()->getMysqlService();
    }

    /**
     * 获取堆栈数据
     * @param $list
     * @param $field
     *
     * @return mixed
     */
    public function replaceRawIdDataForTableList(&$list, $field)
    {
        $map_list = ArrayHelper::extractFromArray($list, $field);
        $sHost = ConfigService::instance()->getConfig('hbase.hosts');
        $sApi = 'http://'.$sHost.'/getTrackTree';
        $raw_id = (array)$map_list;

        $key = DESHelper::instance()->encode(json_encode($raw_id));

        $result = ApiClient::instance()->restPost(
            $sApi, json_encode(
            [
                'id' => $key
            ]));

        ArrayHelper::replaceDataValue($list, $field, $result);
    }

    /**
     * @param $aOriginData  array 包含要裁剪的数据的结果集
     * @param $fields       array 要置换的字段
     * @param $account_id   int 要置换的字段
     * @param $service_type string 要置换的字段
     *
     * @return 返回传递进来并且置换后的数据
     **/
    public static function replaceDataForTableList(&$aOriginData, $fields, $account_id, $service_type)
    {
        $fields = (array)$fields;
        $map_list = $request = [];
        try {
            //获取要置换的数据列表
            foreach ($fields as $field) {
                $map_list += ArrayHelper::extractFromArray(
                    $aOriginData, $field, function ($value) {
                    if (substr($value, 0, 1) == '#') {
                        return ltrim($value, '#');
                    }

                    return false;
                });
            }

            if (!$map_list) {
                return $aOriginData;
            }
            $sApi = ConfigService::instance()->getConfig('hbase.hosts');
            if (!$sApi) {
                LogService::setLog('critical', 'hbase api not set', $sApi, [], LogService::EXCEPTION_LOG_PATH);

                return false;
            }
            //获取置换后的数据
            $api = 'http://' . ConfigService::instance()->getConfig('hbase.hosts') . '/getInfo';
            $replace_result = ApiClient::instance()->restPost(
                $api, json_encode(
                [
                    'account_id'   => $account_id,
                    'key_list'     => $map_list,
                    'service_type' => 'type_' . $service_type,
                ]));
            if (!$replace_result) {
                return $aOriginData;
            }
            //置换源数据
            foreach ($fields as $field) {
                ArrayHelper::replaceDataValue(
                    $aOriginData, $field, $replace_result, function ($value) {
                    if (substr($value, 0, 1) == '#') {
                        return substr($value, 1);
                    }

                    return false;
                });
            }

            return $aOriginData;
        } catch (Exception $e) {
            LogService::logException($e);

            return $aOriginData;
        }
    }


    /**
     * @param $data
     * @param $params
     *
     * @return mixed
     */
    public function replaceDataForLineChart($data, $account_id, $service_type)
    {
        $map_list = $request = [];
        try {
            foreach ($data as $key => $item) {
                if (substr($key, 0, 1) == '#') {
                    $map_list[] = ltrim($key, '#');
                }
            }
            if (!$map_list) {
                return $data;
            }

            //获取置换后的数据
            $replace_result = $this->getReplaceDataFromHbase($map_list, $account_id, $service_type);
            if (!$replace_result) {
                return $data;
            }

            //置换源数据
            foreach ($data as $key => $item) {
                $replace_key = ltrim($key, '#');
                if (isset($replace_result[ $replace_key ]) && $replace_result[ $replace_key ]) {
                    $data[ $replace_result[ $replace_key ] ] = $item;
                    unset($data[ $key ]);
                }
            }

        } catch (Exception $e) {
            //            LogService::instance()->logException($e);
            return $data;
        }

        return $data;
    }

    public function getReplaceDataFromHbase($map_list, $account_id, $service_type)
    {
        $map_list = array_unique($map_list);
        $map_list = array_values($map_list);
        $request = [
            'account_id'   => $account_id,
            'key_list'     => $map_list,
            'service_type' => $service_type,
        ];
        $api = 'http://' . ConfigService::instance()->getConfig('hbase.hosts') . '/getInfo';

        if ($api) {
            $replace_result = ApiClient::instance()->ES_replace($request, $api);
        } else {
            throw new Exception('API is not configured');
        }

        return $replace_result;
    }


}