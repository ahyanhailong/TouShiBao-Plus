<?php
namespace cloudwise\tsb\datasource\base;

use cloudwise\tsb\business\app\web\AppGeneralMethod;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
use cloudwise\tsb\datasource\constants\ElasticSearchEnum;

use cloudwise\tsb\datasource\helper\ArrayHelper;
use Elasticsearch\Client;
use Yaf\Exception;

/**
 * Created by PhpStorm.
 * User: admin-chen
 * Date: 14-6-5
 * Time: 下午4:15.
 */

/**
 * Class ESService
 *
 * @package cloudwise\tsb\datasource\base
 */
class ESService extends Service
{
    public $fields = [];

    public $clientType = BusinessProvider::TYPE_PROVIDER_SERVICE_ES;
    /**
     * @var Client
     */
    public $client;

    public static $configs = [];

    //实例ES的sdk
    public function __construct()
    {
        if (!extension_loaded('JsonNet')) {
            throw new \Exception('Please install php jsonnet extension');
        }
    }

    public function addConnection($params)
    {
        $queryTemplateBasePath = APPLICATION_PATH . '/' . $params['queryTemplateBasePath'];
        if (!file_exists($queryTemplateBasePath)) {
            throw new \Exception('Invalid Config, template path not exist');
        }

        $client = new Client(self::getEsParams($params));
        $params['queryTemplateBasePath'] = rtrim($queryTemplateBasePath, DIRECTORY_SEPARATOR);
        self::$configs = $params;

        return $client;
    }

    //对方法的全名空间格式处理为模板路径
    public function getTplPath($method)
    {
        $params = explode('\\', $method);
        $sPureMethod = array_pop($params);
        array_pop($params);
        $sPureMethod = array_pop($params) . '/' . $sPureMethod;

        return str_replace(['::'], '/', $sPureMethod);
    }

    /**
     * 获取es的连接参数
     *
     * @param $params
     *
     * @return array
     * @throws \Exception
     */
    public static function getEsParams($params)
    {
        $return = [];
        if (isset($params['hosts'])) {
            $return['hosts'] = explode(',', $params['hosts']);
        } else {
            throw new \Exception('please config the hosts of es');
        }

        if (isset($params['connectionParams'])) {
            $basic_info = explode(':', $params['connectionParams']);
            if (count($basic_info) == 2) {
                $return['connectionParams'][] = 'Basic';
                $return['connectionParams'][] = $basic_info[0];
                $return['connectionParams'][] = $basic_info[1];
            }
        }

        return $return;
    }

    /**
     * 获取es type
     *
     * @param $iServiceTypes
     *
     * @return string
     */
    public function getESType($iServiceTypes)
    {
        $iServiceTypes = (array)$iServiceTypes;
        $list = [];
        foreach($iServiceTypes as $type){
            $list[] = 'type_' . $type;
        }

        return implode(',', $list);
    }

    /**
     * 获取索引
     *
     * @param $iServiceType
     * @param $iStartTime
     * @param $iEndTime
     * @param $iTimeSpan
     *
     * @return string
     * @throws Exception
     */
    public function getESIndex($iServiceType, $iStartTime, $iEndTime, $iTimeSpan = ElasticSearchEnum::INDEX_TYPE_DAY)
    {
        $aServiceType = (array)$iServiceType;
        $aIndexArray = [];

        foreach($aServiceType as $iService){
            if (!array_key_exists($iService, ElasticSearchEnum::$esReportDBNamePrefix)) {
                throw new Exception('服务类型未注册');
            }

            $sDBNamePrefix = ElasticSearchEnum::$esReportDBNamePrefix[ $iService ];

            $aTimeIndex = $this->getDayTimeIndex($iStartTime, $iEndTime, $iTimeSpan);

            foreach ($aTimeIndex as $sTimeIndex) {
                $aIndexArray[] = $sDBNamePrefix . $sTimeIndex;
            }
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
                date_default_timezone_set('UTC');
                $sTimeFormat = 'YmdH';
                $iTime = TimeRangeEnum::ONE_HOUR;
                break;
            case ElasticSearchEnum::INDEX_TYPE_DAY:
                $sTimeFormat = 'Ymd';
                $iTime = TimeRangeEnum::ONE_DAY;
                break;
            case ElasticSearchEnum::INDEX_TYPE_MONTH:
                $sTimeFormat = 'Ym';
                $iTime = TimeRangeEnum::THIRTY_DAY;
                break;
            default:
                $sTimeFormat = 'Ymd';
                $iTime = TimeRangeEnum::ONE_DAY;
        }
        $timezone = ElasticSearchEnum::getTimeZone();

        date_default_timezone_set($timezone['es']);

        array_push($return, date($sTimeFormat, $start_time / 1000));
        array_push($return, date($sTimeFormat, $end_time / 1000));

        $days = floor($end_time - $start_time) / $iTime;
        if ($days) {
            for ($i = 1; $i <= $days; $i++) {
                array_push($return, date($sTimeFormat, ($start_time + $i * $iTime) / 1000));
            }
        }

        date_default_timezone_set($timezone['local']);
        return array_unique($return);
    }

    /**
     * 获取生成模板根路径.
     *
     * @return string
     */
    public function getQueryTemplateBasePath()
    {
        return self::$configs['queryTemplateBasePath'];
    }

    /**
     * 获取当前服务的生成查询模板路径.
     *
     * @return string
     */
    public function getQueryTemplatePath()
    {
        $className = str_replace('ES_', '', get_called_class());
        $className = str_replace('_', DIRECTORY_SEPARATOR, $className);

        return implode(DIRECTORY_SEPARATOR, [$this->getQueryTemplateBasePath(), $className]);
    }

    /**
     * 渲染JsonNet 数据.
     *
     * @param $relative_file
     * @param $params
     *
     * @return string
     * @throws \Exception
     */
    public function renderJsonNet($relative_file, $params)
    {
        $file = $this->getFindQueryTemplateFile($relative_file);
        $main = APPLICATION_PATH . '/app/library/cloudwise/tsb/datasource/template/main/';
        ob_start();
        ob_implicit_flush(false);
        require "{$main}/main.txt";
        require "$file";

        return ob_get_clean();
    }

    /**
     * @param       $method_name
     * @param       $params
     *
     * @return mixed
     */
    public function renderQueryParams($method_name, array $params)
    {
        $renderJsonNet = $this->renderJsonNet($method_name, $params);
        $res = \JsonNet::evaluateSnippet($renderJsonNet);

        return $res['content'];
    }

    /**
     * 获取模板真实路径.
     *
     * @param $relative_file
     *
     * @return string
     * @throws \Exception
     */
    protected function getFindQueryTemplateFile($relative_file)
    {
        $file = $this->getQueryTemplateBasePath() . DIRECTORY_SEPARATOR . $relative_file . '.' . self::$configs['queryTemplateDefaultExtension'];
        $file = trim($file, '.');
        if (!file_exists($file)) {
            throw new \Exception('Query template file not found: ' . $file);
        }

        return $file;
    }

    /**
     * 处理数据格式
     * 原始数据格式 array（"a" => "b"）
     * 转换数据格式 array（array（"key" => a ,"value" => "b"））.
     *
     * @param array $params
     *
     * @return mixed
     */
    public static function getEsQueryFormatArray(array $params)
    {
        $order = ['terms', 'term', 'bool', 'range', 'regexp'];
        $return = [];
        if ($params) {
            foreach ($order as $type) {
                if (array_key_exists($type, $params) && $params[ $type ]) {
                    $list = $params[ $type ];
                    if ($list == array_values($list)) {
                        //terms
                        foreach ($list as $index => $c_list) {
                            foreach ($c_list as $field => $inner_list) {
                                $temp['parentKey'] = $type;
                                $temp['key'] = $field;
                                $temp['value'] = $inner_list;
                                array_push($return, $temp);
                            }
                        }
                    } else {
                        //term  range bool
                        foreach ($list as $key => $value) {
                            $temp['parentKey'] = $type;
                            $temp['key'] = $key;
                            $temp['value'] = $value;
                            array_push($return, $temp);
                        }
                    }
                }
            }
        }

        return $return;
    }

    /**
     * 获取es facets 的时间刻度.
     *
     * @param        $data
     * @param        $start_time
     * @param        $end_time
     * @param string $type
     * @param string $status
     * @param int    $interval
     *
     * @return array|bool
     */
    public function getFacetsRangeTime($data, $start_time, $end_time, $type = 'facets', $status = '', $interval = 1)
    {
        //时间段间隔
        $time_interval = TimeRangeEnum::getFactsInterval($start_time, $end_time, true);
        if (!empty($data)) {
            $min_time = null;
            foreach ($data as $item) {
                if ($type == 'facets') {
                    $min_time = $item['time'];
                }
                if ($type == 'aggs') {
                    $min_time = $item['key'];
                }
                if ($min_time < $start_time) {
                    continue;
                } else {
                    break;
                }
            }

            $time_params = [
                'start_time' => $start_time,
                'end_time'   => $end_time,
                'min_time'   => $min_time,
            ];
            $range_time = TimeRangeEnum::getTimeRangeNew($time_params, $status, $interval);

            return $range_time;
        }

        return false;
    }


    /**
     * 过滤使用的公共结构
     *
     * @param       $params
     * @param       $fields
     * @param       $nest_field
     *
     * @return array
     */
    public function setFilterQuery($params, $fields, $nest_field = '')
    {
        $aOrderWeight = [
            'term'   => 0,
            'terms'  => 1,
            'gt'     => 2,
            'gte'    => 2,
            'lt'     => 2,
            'or'     => 2,
            'not'     => 2,
            'bool'   => 2,
            'lte'    => 2,
            'regexp' => 3,
        ];

        ArrayHelper::sortByUser($fields, 'type', 'asc', $aOrderWeight);
        //按照优先级排序
        $return = [];
        $range_list = [];
        foreach ($fields as $field => $opt) {
            if (!array_key_exists($field, $params) || $params[ $field ] === '') {
                continue;
            }
            $tmp = [
                'field' => $opt['field'],
                'type'  => $opt['type'],
            ];

            if ($nest_field) {
                $tmp['field'] = $nest_field . '.' . $tmp['field'];
            }
            //不同的过滤类型组装成不同的结构
            switch ($opt['type']) {
                case 'or':
                case 'not':
                    $tmp['value'] = $this->setFilterQuery($params, $this->getFields($params[ $field ]));
                    break;
                case 'term':
                case 'bool':
                    if(in_array($opt['field'], ['must_not', 'should'])){
                        $tmp['field'] = $opt['field'];
                        $tmp['value'] = $this->setFilterQuery($params, $this->getFields($params[ $field ]), $nest_field);
                    }else{
                        $tmp['value'] = $params[ $field ];
                    }
                    break;
                case 'terms':
                    $tmp['value'] = (array)$params[ $field ];
                    break;
                case 'gt':
                case 'gte':
                case 'lt':
                case 'lte':
                    if (array_key_exists($opt['field'], $range_list)) {
                        $return[ $range_list[ $opt['field'] ] ]['value'][ $opt['type'] ] = $params[ $field ];
                        continue 2;
                    } else {
                        $range_list[ $opt['field'] ] = $field;
                    }
                    $tmp['value'] = [
                        $opt['type'] => $params[ $field ],
                    ];
                    $tmp['type'] = 'range';
                    break;
                    break;
                case 'regexp':
                    $params[ $field ] = str_replace('*', '.*', $params[ $field ]);
                    $tmp['value'] = '.*' . $params[ $field ] . '.*';
                    break;
                    break;
                default:
                    $tmp['value'] = $params[ $field ];
                    break;
            }

            $return[ $field ] = $tmp;
        }

        return array_values($return);
    }


    /**
     * @param     $iServiceType
     * @param     $iStartTime
     * @param     $iEndTime
     * @param int $iTimeSpan
     *
     * @return array
     * @throws Exception
     */
    public function getCommonParams(
        $iServiceType,
        $iStartTime,
        $iEndTime,
        $iTimeSpan = ElasticSearchEnum::INDEX_TYPE_DAY
    ) {
        $return = ElasticSearchEnum::getSizeLimit();
        $return['index'] = $this->getESIndex($iServiceType, $iStartTime, $iEndTime, $iTimeSpan);
        $return['type'] = 'type_' . $iServiceType;
        $return['interval'] = TimeRangeEnum::getFactsInterval($iStartTime, $iEndTime);
        $return['service_type'] = $iServiceType;

        return $return;
    }

    /**
     * 断点打印模板
     * @param $tpl
     */
    public function ddTpl($tpl)
    {
        var_dump(json_encode($tpl));exit;
    }

    /**
     * @param       $aParams
     * @param array $aQueryFields
     * @param array $aNestFields
     *
     * @return array
     */
    public function getQueryParams($aParams, $aQueryFields = [], $aNestFields = [])
    {
        //非code类型的需要传递service_type参数
        if (!array_key_exists('service_type', $aParams)) {
            $queryParams['service_type'] = AppGeneralMethod::instance()->getCodeServiceType($aParams['account_id'], $aParams['app_id']);
        }
        $queryParams = $this->getCommonParams($queryParams['service_type'], $aParams['start_time'], $aParams['end_time']);
        if ($aQueryFields) {
            $queryParams['query'] = $this->setFilterQuery($aParams, $this->getFields($aQueryFields));
        }
        if ($aNestFields) {
            $queryParams['nest_query'] = $this->setFilterQuery(
                $aParams, $this->getFields($aNestFields), 'nest_sub_methods');
        }

        if (isset($aParams['order'])) {
            $queryParams['order'] = $aParams['order'];
            $queryParams['sort'] = $aParams['sort'];
        }

        return $queryParams;
    }

    /**
     * 过滤文档的公共函数
     *
     * @param       $aParams
     * @param array $aQueryFields
     * @param array $aNestFields
     *
     * @return array
     */
    public function getNewQueryParams($aParams, $aQueryFields = [], $aNestFields = [])
    {
        //添加外来字段配置
        if(array_key_exists('fields', $aParams)){
            $this->fields = $aParams['fields'];
        }
        $queryParams = [];

        //非code类型的需要传递service_type参数
        if (!array_key_exists('service_type', $aParams)) {
            $queryParams['service_type'] = AppGeneralMethod::instance()->getCodeServiceType(
                $aParams['account_id'], $aParams['app_id']);
        }else{
            $queryParams['service_type'] = $aParams['service_type'];
        }

        //获取能用参数
        $queryParams = $this->getCommonParams(
            $queryParams['service_type'], $aParams['start_time'], $aParams['end_time']);

        //非嵌套结构
        if ($aQueryFields) {
            $queryParams['query'] = $this->setFilterQuery($aParams, $this->getFields($aQueryFields));
        }

        //嵌套结构过滤
        if ($aNestFields) {
            $list = $this->setFilterQuery($aParams, $this->getFields($aNestFields), $aParams['nest_path']);
            if($list){
                $queryParams['query'][] = [
                    'type' => 'nest',
                    'path' => $aParams['nest_path'],
                    'list' => $list,
                ];
            }
        }

        //排序
        if (isset($aParams['order'])) {
            $queryParams['order'] = $aParams['order'];
            $queryParams['sort'] = $aParams['sort'];
        }

        //时间分片
        $queryParams['interval'] = TimeRangeEnum::getFactsInterval($aParams['start_time'], $aParams['end_time'], false);

        return $queryParams;
    }

    /**
     * 获取过滤字段的配置参数
     *
     * @param $aList
     *
     * @return array
     */
    public function getFields($aList)
    {
        $fields = $this->fields;

        $return = [];
        foreach ($aList as $item) {
            if (array_key_exists($item, $fields)) {
                $return[ $item ] = $fields[ $item ];
            }
        }

        return $return;
    }

    /**
     * 递归查找key，并且进行替换.
     *
     * @param        $params  //准备数据数组
     * @param string $replace 替换值
     * @param        $key     //查找要替换的数组key
     *
     * @return array
     */
    public function recurrenceReplaceKey($params, $replace = ' ', $key)
    {
        if (is_array($params)) {
            foreach ($params as $k => $v) {
                if ($k === $key) {
                    $params[$k] = $replace;
                } else {
                    $params[$k] = self::recurrenceReplaceKey($v, $replace, $key);
                }
            }
        }

        return $params;
    }


    public function recurrenceReplaceVal($params, $replace = ' ', $val)
    {
        if (is_array($params)) {
            foreach ($params as $k => $v) {
                if ($v === $val) {
                    $params[$k] = $replace;
                } else {
                    $params[$k] = self::recurrenceReplaceVal($v, $replace, $val);
                }
            }
        }

        return $params;
    }


}

