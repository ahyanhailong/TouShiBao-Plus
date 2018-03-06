<?php
/**
 * @author bear
 * Date: 17/11/15 上午12:08
 */

namespace App\library\Service;


use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;

class DataProcessorES extends BaseService
{
    /**
     * @var ConfigService
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
     * 单线图方法
     *
     * @param $iStartTime
     * @param $iEndTime
     * @param $list
     * @param $call
     *
     * @return array
     */
    public function processLineData($iStartTime, $iEndTime, $list, $call = '')
    {
        //获取维度列表
        $sLabelName = array_keys($list);
        //获取其中一个时间的采样值
        $values = array_values($list);
        $aTimes = array_keys($values[0]);
        $iExampleTime = array_shift($aTimes);
        //获取时间列表
        $aRangeList = TimeRangeEnum::getTimeList($iStartTime, $iEndTime, $iExampleTime);
        //获取时间格式
        $sTimeFormat = TimeRangeEnum::getEchatsxKeyTimeFormat($iStartTime, $iEndTime);
        //获取默认返回值
        $return = $this->getDefaultData($sLabelName, $aRangeList, $sTimeFormat);
        //填充数据
        foreach ($list as $label => $data) {
            foreach ($data as $time => $value) {
                $time /= 1000;
                if (array_key_exists($time, $return['data'][ $label ])) {
                    if (is_callable($call)) {
                        $value = $call($value);
                    }
                    $return['data'][ $label ][ $time ] = $value;
                }
            }
        }
        //返回数据的处理
        $return = $this->processReturnData($return);
        $return = $this->processDataFormat($return);

        return $return;
    }

    public function processReturnData($result)
    {
        foreach ($result['data'] as $label => $item) {
            $result['data'][ $label ] = array_values($item);
        }

        return $result;
    }

    /**
     * 处理 echarts数据接口，线状图中只有一个点有数据时 不显示的问题
     * 相邻点设置为0，保证有连接线显示
     *
     * @param $result
     *
     * @return mixed
     */
    static function processDataFormat($result)
    {
        try {
            foreach ($result['data'] as $name => $list) {
                foreach ($list as $key => $item) {
                    if ($item !== '-' && $item > 0) {
                        if (isset($result['data'][ $name ][ $key - 1 ]) && $result['data'][ $name ][ $key - 1 ] === '-') {
                            $result['data'][ $name ][ $key - 1 ] = 0;
                        }

                        if (isset($result['data'][ $name ][ $key + 1 ]) && $result['data'][ $name ][ $key + 1 ] === '-') {
                            $result['data'][ $name ][ $key + 1 ] = 0;
                        }
                        continue;
                    }

                    if ($item !== '-' && (int)$item === 0) {
                        if (isset($result['data'][ $name ][ $key - 1 ]) && $result['data'][ $name ][ $key - 1 ] === '-') {
                            $result['data'][ $name ][ $key - 1 ] = 0;
                        }
                        if ($key == 0 && isset($result['data'][ $name ][ $key + 1 ]) && $result['data'][ $name ][ $key + 1 ] === '-') {
                            $result['data'][ $name ][ $key + 1 ] = 0;
                        }
                    }
                }
            }

            return $result;
        } catch (\Exception $e) {
            LogService::logException($e);

            return $result;
        }
    }

    /**
     * 初始化结果
     *
     * @param $aLabels
     * @param $aTimeList
     * @param $sTimeFormat
     *
     * @return array
     */
    public function getDefaultData($aLabels, $aTimeList, $sTimeFormat)
    {
        $aLabels = (array)$aLabels;
        $return = [
            'data'   => [],
            'labels' => [],
        ];

        foreach ($aTimeList as $time) {
            $return['labels'][] = date($sTimeFormat, $time);
        }

        foreach ($aLabels as $label) {
            $return['data'][ $label ] = [];
            foreach ($aTimeList as $time) {
                // 这里把默认值 从 - 改为 0 因为页面需要渐变,全是-会报错
                $return['data'][ $label ][ $time ] = 0;
            }
        }

        return $return;
    }

    /**
     * 饼图返回值
     *
     * @param $data
     *
     * @return array
     */
    public function processPie($data)
    {
        return $data;
//        $return = [];
//        $sum = array_sum($data);
//        foreach ($data as $key => $value) {
//            $tmp = [
//                'key'   => $key,
//                'value' => $value,
//                'rate'  => 0,
//            ];
//            if ($sum) {
//                $tmp['rate'] = round($value / $sum * 100, 2);
//            }
//
//            $return[] = $tmp;
//        }
//
//        return $return;
    }

    /**
     * @param $format    [
     *                   'ret_key'=>'name',
     *                   'val'=>'val',
     *                   'precision'=>2,         结果精度
     *                   'divisor'=>1000,       除以的单位
     *                   ]
     *
     * @param $data      要处理的数据
     *
     * @return array
     */
    public function processEsListData($format, $data)
    {
        $result = array();
        if ($data) {
            foreach ($format as $item) {
                if (isset($item['precision'])) {
                    $result[$item['ret_key']] = round($item['val'] / $item['divisor'], 2);
                } else {
                    $result[$item['ret_key']] = $item['val'];
                }
            }
        }

        return $result;
    }

    /**
     * @param $time_list
     * @param $labels
     * @param $time_format
     *
     * @return array
     */
    public static function processDefaultLineData($time_list,$labels,$time_format)
    {
        $return = array(
            'labels'=>array(),
            'data'=>array(),
        );
        $data = array();
        foreach($time_list as $time){
            $return['labels'][] = date($time_format,$time);
        }
        foreach($labels as $field=>$label){
            if(is_array($label) && isset($label['name'])){
                $name = $label['name'];
            }else{
                $name = $label;
            }
            $data[$name] = array();
        }

        foreach($labels as $label){
            foreach($time_list as $time){
                if(is_array($label) && isset($label['name'])){
                    $name = $label['name'];
                }else{
                    $name = $label;
                }
                $data[$name][$time] = '-';
            }
        }
        $return['data'] = $data;

        return $return;
    }

    public static function processResult($result)
    {
        if(!isset($result['data'])){
            return $result;
        }
        foreach($result['data'] as $field=>$value){
            $result['data'][$field] = array_values($value);
        }

        $result['data'] = self::processDataFormat($result['data']);

        return $result;
    }


}