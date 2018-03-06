<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/7
 * Time: 上午10:57
 */

namespace cloudwise\tsb\business\app\web;

use App\library\Service\RESTService;
use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\datasource\constants\AppEnum;
use cloudwise\tsb\datasource\constants\ReportAppTopologyEnum;
use cloudwise\tsb\datasource\constants\ElasticSearchEnum;
use cloudwise\tsb\datasource\helper\ApiClient;
use cloudwise\tsb\datasource\services\app\es\DBService;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;
use \cloudwise\tsb\datasource\base\PHPExcelService;

/**
 * Class AppGeneralMethod
 * @package cloudwise\tsb\business\app\web
 */
class AppGeneralMethod extends Business
{
    /**
     * @var AppGeneralMethod
     */
    private static $self = null;

    /**
     * @return AppGeneralMethod
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    /**
     * 获取应用类型
     *
     * @param $iAccountId
     * @param $iAppId
     *
     * @return bool
     */
    public function getCodeServiceType($iAccountId, $iAppId)
    {
        $return   = false;

        $app_info = self::$provider->getAppProvider()->getDimAppService()->fetchRow(
            ['account_id' => $iAccountId, 'app_id' => $iAppId]);

        $appCodeType = false;

        if ($app_info) {
            $types = json_decode($app_info->service_types, true);
            if (isset($types['appType'])) {
                $appCodeType = $types['appType'];
            } else {
                $appCodeType = AppEnum::getAppCodeType($app_info->service_types);
            }
        }

        if ($appCodeType && isset(ReportAppTopologyEnum::$codeTypeMaps[$appCodeType])) {
            $return = ReportAppTopologyEnum::$codeTypeMaps[$appCodeType];
        }

        return $return;
    }


    /**
     * 以code类型,对app_id分组
     *
     * @param $account_id
     * @param $app_ids
     *
     * @return array
     */
    public function getAppsCodeTypes($account_id, $app_ids)
    {

        $return = [];
        self::$provider->getAppProvider()->getDimAppService()->removeGroupBy();
        self::$provider->getAppProvider()->getDimAppService()->removeSelect();
        $app_infos = self::$provider->getAppProvider()->getDimAppService()->fetchAll(array('account_id' => $account_id, 'app_id in' => array_values($app_ids)));

        if ($app_infos) {
            foreach ($app_infos as $app_info) {
                $appCodeType = false;

                $types = json_decode($app_info->service_types, true);
                if (isset($types['appType'])) {
                    $appCodeType = $types['appType'];
                } else {
                    $appCodeType = AppEnum::getAppCodeType($app_info->service_types);
                }

                if ($appCodeType && isset(ReportAppTopologyEnum::$codeTypeMaps[$appCodeType])) {
                    $return[ReportAppTopologyEnum::$codeTypeMaps[$appCodeType]][] = $app_info->app_id;
                }
            }
        }

        return $return;
    }


    /**
     * 获取应用类型
     *
     * @param $params
     *
     * @return mixed|string
     */
    public function AppTopoGetAppType($params)
    {
        $params   = (array)$params;
        $app_id   = (int)$params['app_id'];
        $app_info = self::$provider->getAppProvider()->getDimAppService()->fetchRow(
            ['account_id' => $params['account_id'], 'app_id' => $app_id]);

        if ($app_info) {
            $types = json_decode($app_info->service_types, true);
            if (isset($types['appType'])) {
                return $types['appType'];
            } else {
                return AppEnum::getAppCodeType($app_info->service_types);
            }
        }
    }


    /**
     * @param $str_code_type
     *
     * @return bool
     */
    public function getCodeType($str_code_type)
    {
        if ($str_code_type && isset(ReportAppTopologyEnum::$codeTypeMaps[$str_code_type])) {
            return ReportAppTopologyEnum::$codeTypeMaps[$str_code_type];
        }

        return false;
    }

    /**
     * 获取es type
     *
     * @param $iServiceType
     *
     * @return string
     */
    public function getESType($iServiceType)
    {
        return 'type_' . $iServiceType;
    }

    /**
     * 获取索引
     *
     * @param     $iServiceType
     * @param     $iStartTime
     * @param     $iEndTime
     * @param int $iTimeSpan
     *
     * @return string
     * @throws \Exception
     */
    public function getESIndex($iServiceType, $iStartTime, $iEndTime, $iTimeSpan = ElasticSearchEnum::INDEX_TYPE_DAY)
    {
        if (!array_key_exists($iServiceType, ElasticSearchEnum::$esReportDBNamePrefix)) {
            throw new \Exception('服务类型未注册');
        }

        $sDBNamePrefix = ElasticSearchEnum::$esReportDBNamePrefix[$iServiceType];

        $aTimeIndex = self::instance()->getDayTimeIndex($iStartTime, $iEndTime, $iTimeSpan);

        $aIndexArray = [];
        foreach ($aTimeIndex as $sTimeIndex) {
            $aIndexArray[] = $sDBNamePrefix . $sTimeIndex;
        }

        return implode(',', $aIndexArray);
    }

    /**
     * 获取时间索引
     *
     * @param $start_time
     * @param $end_time
     * @param $time_span
     *
     * @return array
     */
    public function getDayTimeIndex($start_time, $end_time, $time_span = ElasticSearchEnum::INDEX_TYPE_DAY)
    {
        $return = [];
        switch ($time_span) {
            case ElasticSearchEnum::INDEX_TYPE_HOUR:
                $sTimeFormat = 'YmdH';
                $iTime       = TimeRangeEnum::ONE_HOUR;
                break;
            case ElasticSearchEnum::INDEX_TYPE_DAY:
                $sTimeFormat = 'Ymd';
                $iTime       = TimeRangeEnum::ONE_DAY;
                break;
            case ElasticSearchEnum::INDEX_TYPE_MONTH:
                $sTimeFormat = 'Ym';
                $iTime       = TimeRangeEnum::THIRTY_DAY;
                break;
            default:
                $sTimeFormat = 'Ymd';
                $iTime       = TimeRangeEnum::ONE_DAY;
        }

        array_push($return, date($sTimeFormat, $start_time / 1000));
        array_push($return, date($sTimeFormat, $end_time / 1000));

        $days = floor($end_time - $start_time) / $iTime;
        if ($days) {
            for ($i = 1; $i <= $days; $i++) {
                array_push($return, date($sTimeFormat, ($start_time + $i * $iTime) / 1000));
            }
        }

        return array_unique($return);
    }


    /**
     * @param     $buckets 时间分片聚合桶
     * @param     $values
     * @param int $unit
     *
     * @return array
     * 制作平均响应时间 趋势图
     */
    public function handleDataSlice($buckets, $values, $unit = 1000)
    {
        $tmp_data       = $label = [];
        $xKeyTimeFormat = TimeRangeEnum::getEchatsxKeyTimeFormat($values['start_time'], $values['end_time']);
        try {
            if ($buckets) {

                $range_time = self::$provider->getAppProvider()->getESService()->getFacetsRangeTime(
                    $buckets, $values['start_time'], $values['end_time'], 'aggs');

                foreach ($range_time as $time) {
                    $label[]         = date($xKeyTimeFormat, $time);
                    $tmp_data[$time] = 0;
                }

                foreach ($buckets as $item) {
                    if (isset($tmp_data[$item['key'] / 1000])) {
                        $tmp_data[$item['key'] / 1000] = round($item['wt']['value'] / $unit, 2);
                    }
                }

            }

            $tmp_data = array_values($tmp_data);
        } catch (\Exception $e) {
            return [];
        }

        return ['data' => $tmp_data, 'label' => $label];
    }

    /**
     * @param $buckets 时间分片聚合桶
     * @param $values
     *
     * @return array
     * 制作count 时间分片趋势图
     */
    public function handleDataDocCountSlice($buckets, $values)
    {
        $tmp_data       = $label = [];
        $xKeyTimeFormat = TimeRangeEnum::getEchatsxKeyTimeFormat($values['start_time'], $values['end_time']);
        try {
            if ($buckets) {

                $range_time = self::$provider->getAppProvider()->getESService()->getFacetsRangeTime(
                    $buckets, $values['start_time'], $values['end_time'], 'aggs');

                foreach ($range_time as $time) {
                    $label[]         = date($xKeyTimeFormat, $time);
                    $tmp_data[$time] = 0;
                }

                foreach ($buckets as $item) {
                    if (isset($tmp_data[$item['key'] / 1000])) {
                        $tmp_data[$item['key'] / 1000] = $item['doc_count'];
                    }
                }

            }

            $tmp_data = array_values($tmp_data);
        } catch (\Exception $e) {
            return [];
        }

        return ['data' => $tmp_data, 'label' => $label];
    }

    /**
     * @param $returnData
     *
     * @return mixed
     */
    public function processStackList($returnData)
    {
        if ($returnData) {
            $list = [];
            foreach ($returnData as $item) {
                if (isset($item['exstack_raw']) && $item['exstack_raw']) {
                    $list[] = $item['exstack_raw'];
                }
            }
            if ($list) {
                $ex_list = ApiClient::instance()->getExStackData($list);
                if ($ex_list) {
                    $ex_list = json_decode($ex_list, 1);
                }
                foreach ($returnData as $index => $item) {
                    if (isset($item['exstack_raw']) && isset($ex_list[$item['exstack_raw']])) {
                        $item['exstack_raw'] = str_replace(["\n"], ['<br>'], e($ex_list[$item['exstack_raw']]));
                        $returnData[$index]  = $item;
                    }
                }
            }
        }

        return $returnData;
    }


    /**
     * @param $params
     * @param $EnumType
     *
     * @return bool|int
     * @throws Exception
     */
    public function saveFilterGroup($params, $EnumType)
    {
        $result           = false;
        $FilterGroupModel = self::$provider->getAppProvider()->getFilterGroupModel();
        //校验参数是否为空
        try {
            if (isset($params['params']) && $params['params']) {
                if (isset($params['record_id']) && $params['record_id']) {
                    //修改  根据account_id  menu枚举  记录id
                    $exsit = [
                        'id'         => $params['record_id'],
                        'account_id' => $params['account_id'],
                        'type'       => $EnumType,
                        'app_id'     => $params['app_id'],
                    ];
                    if ($FilterGroupModel->exists($exsit)) {
                        $update = [
                            'params_info' => json_encode($params['params']),
                            'update_time' => time(),
                        ];

                        if ($FilterGroupModel->update($update, $params['record_id'])) {
                            $result = $params['record_id'];
                        } else {
                            RESTService::instance()->error('更新异常');
                        }

                    } else {
                        RESTService::instance()->error('异常数据');
                    }

                } else {
                    //插入 -》判断已经满三个,满了返回错误提示,否则插入
                    $exsit = [
                        'account_id' => $params['account_id'],
                        'type'       => $EnumType,
                        'app_id'     => $params['app_id'],
                    ];

                    $exist_data = $FilterGroupModel->fetchAll($exsit);

                    if (count($exist_data) >= 3) {
                        RESTService::instance()->error('数据以满三条');
                    } else {
                        $insert = [
                            'account_id'  => $params['account_id'],
                            'type'        => $EnumType,
                            'app_id'      => $params['app_id'],
                            'params_info' => json_encode($params['params']),
                            'create_time' => time(),
                        ];

                        $result = $FilterGroupModel->insert($insert);
                    }

                }
            }
        } catch (Exception $e) {
            LogService::logException($e);
            throw new Exception('参数异常', ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_AJAX_LOAD);
        }

        return $result;
    }


    /**
     * @param $params       array 参数
     * @param $EnumType     int  过滤type的枚举类
     *
     * @return array
     * @throws Exception
     */
    public function getSavedFilterGroup($params, $EnumType)
    {
        // 根据 account_id,app_id,枚举类获取表里数据
        $FilterGroupModel = self::$provider->getAppProvider()->getFilterGroupModel();

        $where = [
            'app_id'     => $params['app_id'],
            'account_id' => $params['account_id'],
            'type'       => $EnumType,
        ];

        $return = array();
        try {
            $FilterGroupModel->setSelect(array('id', 'params_info'));
            $result = $FilterGroupModel->fetchAll($where, array(), array('id' => 'asc'));
            if ($result) {
                foreach ($result as $key => $item) {
                    $return[$item->id]['id']          = $item->id;
                    $return[$item->id]['order']       = $key + 1;
                    $return[$item->id]['params_info'] = json_decode($item->params_info);
                    unset($result[$key]);
                }
            }
        } catch (Exception $e) {
            LogService::logException($e);
            throw new Exception('参数异常', ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_AJAX_LOAD);
        }

        return $return;
    }

    public function deleteSavedFilterGroup($params, $EnumType)
    {
        //根据 account_id app_id record_id 来删除用户过滤组合条件
        $FilterGroupModel = self::$provider->getAppProvider()->getFilterGroupModel();
        $result           = false;
        $where            = [
            'app_id'     => $params['app_id'],
            'account_id' => $params['account_id'],
            'type'       => $EnumType,
            'id'         => $params['record_id'],
        ];

        if ($FilterGroupModel->exists($where)) {
            $result = $FilterGroupModel->delete($where);
        } else {
            throw new Exception('参数异常', ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_AJAX_LOAD);
        }

        return $result;

    }

    public function createExportFile($file_title, $th_title, $data, $file_name, $file_path)
    {
        // 文件title  th->title  data  file_name  file_path
        try {
            if ($data) {
                PHPExcelService::instance()->setCellTitle(array_keys($th_title));
                PHPExcelService::instance()->setTitle($file_title);
                PHPExcelService::instance()->setCellValue($data, array_values($th_title));
                PHPExcelService::instance()->outPutExcel($file_name);

                return $file_path;
            } else {
                RESTService::instance()->error('导出内容为空');
            }
        } catch (Exception $e) {
            throw new Exception('导出错误', ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_AJAX_LOAD);
        }
    }


}