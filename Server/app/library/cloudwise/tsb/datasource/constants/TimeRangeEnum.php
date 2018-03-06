<?php
/**
 * Created by PhpStorm.
 * User: admin-chen
 * Date: 14-6-19
 * Time: 上午10:55.
 */
namespace cloudwise\tsb\datasource\constants;

class TimeRangeEnum
{
    const ONE_MINUTE = 60000;   //1分钟=1*60*1000
    const TWO_MINUTE = 120000;   //2分钟=2*60*1000
    const TEN_MINUTE = 600000; //10分钟=10*60*1000
    const FIFTEEN_MINUTE = 900000; //15分钟=15*60*1000
    const HUNDRED_MINUTE = 6000000; //100分钟=100*60*1000
    const THIRTY_HUNDRED_MINUTE = 18000000; //300分钟=300*60*1000
    const THIRTY_MINUTE = 1800000; //30分钟=30*60*1000
    const ONE_HOUR = 3600000; // 1小时=60*60*1000
    const TWO_HOUR = 7200000; // 2小时=2*60*60*1000
    const THREE_HOUR = 10800000; // 3小时=3*60*60*1000
    const FOUR_HOUR = 14400000; // 4小时=4*60*60*1000
    const SIX_HOUR = 21600000; // 6小时=6*3600*1000
    const TWELVE_HOUR = 43200000; // 12小时=12*3600*1000
    const ONE_DAY = 86400000; // 24小时=24*3600*1000
    const TWO_DAY = 172800000; // 48小时=48*3600*1000
    const THREE_DAY = 259200000; // 3天=*324*3600*1000
    const FIVE_DAY = 432000000; // 5天=5*24*3600*1000
    const SEVEN_DAY = 604800000; // 7天=7*24*3600*1000
    const FIFTEEN_DAY = 1296000000; // 15天=15*24*3600*1000
    const THIRTY_DAY = 2592000000; // 30天=30*24*3600*1000
    const SIXTY_DAY = 5184000000; // 60天=60*24*3600*1000
    const NINETY_DAY = 7776000000; // 90天=90*24*3600*1000

    const TIME_RANGE_MAX = self::NINETY_DAY;

    const BOARD_RANGE_TIME = 43200000;//面板默认统计使用时间

    const UNIT_TIME_MS = 'millisecond';
    const UNIT_TIME_S = 'second';
    const UNIT_TIME_M = 'minute';
    const UNIT_TIME_H = 'hour';
    const UNIT_TIME_D = 'day';
    const UNIT_TIME_W = 'week';
    const UNIT_TIME_MTH = 'month';
    const UNIT_TIME_Y = 'year';

    const TIME_STEP_THIRTY_M = 1;
    const TIME_STEP_ONE_H = 2;
    const TIME_STEP_SIX_H = 3;
    const TIME_STEP_TWELVE_H = 4;
    const TIME_STEP_ONE_DAY = 5;
    const TIME_STEP_SEVEN_DAY = 7;

    public static $timeStep = [
        self::TIME_STEP_THIRTY_M  => self::THIRTY_MINUTE,
        self::TIME_STEP_ONE_H     => self::ONE_HOUR,
        self::TIME_STEP_SIX_H     => self::SIX_HOUR,
        self::TIME_STEP_TWELVE_H  => self::TWELVE_HOUR,
        self::TIME_STEP_ONE_DAY   => self::ONE_DAY,
        self::TIME_STEP_SEVEN_DAY => self::SEVEN_DAY,
    ];


    public static function getEndTime($start_time, $time_step)
    {
        if (!array_key_exists($time_step, TimeRangeEnum::$timeStep)) {
            return false;
        }
        $end_time = $start_time + TimeRangeEnum::$timeStep[ $time_step ];

        return $end_time;
    }

    static public $timeName = [
        self::THIRTY_MINUTE => 'half_hour',
        self::ONE_HOUR      => 'one_hour',
        self::SIX_HOUR      => 'six_hours',
        self::TWELVE_HOUR   => 'twelve_hours',
        self::ONE_DAY       => 'one_day',
        self::SEVEN_DAY     => 'seven_days',
        self::THIRTY_DAY    => 'thirty_days',
    ];


    /**
     * 获取刻度列表
     * @param $iStartTime
     * @param $iEndTime
     * @param $iExampleTime
     *
     * @return array
     */
    public static function getTimeList($iStartTime, $iEndTime, $iExampleTime)
    {
        $returnData = [];
        $iDiffTime = $iEndTime - $iStartTime;

        //时间段间隔
        $sInterval = self::getInterval($iStartTime, $iEndTime);
        $iStep = self::$intervalTime[$sInterval];
        $iCount = ceil($iDiffTime / $iStep);

        $returnData[] = $iExampleTime / 1000;
        for ($i = 1; $i <= $iCount; ++$i) {
            $iLeft = $iExampleTime - $i * $iStep;
            //开始刻度应该在小于开始时间
            if ($iLeft > $iStartTime) {
                $returnData[] = $iLeft / 1000;
            }

            $iRight = $iExampleTime + $i * $iStep;
            if ($iRight < $iEndTime) {
                $returnData[] = $iRight / 1000;
            }
        }

        $returnData = array_unique($returnData);
        sort($returnData);

        return $returnData;
    }

    /**
     * 自定义获取时间分割数组.
     *
     * @param array  $params
     * @param string $status
     * @param int    $interval
     *
     * @return array
     */
    public static function getTimeRangeNew(array $params, $status = '', $interval = 1)
    {
        $start_time = $params['start_time'];
        $end_time = $params['end_time'];
        $min_time = $params['min_time'];
        $returnData = [];
        $diff_time = (string)($end_time - $start_time);

        //时间段间隔
        $step = TimeRangeEnum::getFactsInterval($start_time, $end_time, true);
        $time_range_num = ceil($diff_time / $step);

        $returnData[] = (int)($min_time / 1000);

        for ($i = 1; $i <= $time_range_num; ++$i) {
            $temp_time = $min_time - $i * $step;
            //开始刻度应该在小于开始时间
            if ($temp_time > ($start_time - $step)) {
                $returnData[] = (int)($temp_time / 1000);
            }
            $temp_time = $min_time + $i * $step;
            if ($temp_time < ($end_time)) {
                $returnData[] = (int)($temp_time / 1000);
            }
        }

        $returnData = array_unique($returnData);
        sort($returnData);

        return $returnData;
    }

    public static $intervalTime = [
        '1m'  => self::ONE_MINUTE,
        '2m'  => self::TWO_MINUTE,
        '15m' => self::FIFTEEN_MINUTE,
        '30m' => self::THIRTY_MINUTE,
        '1h'  => self::ONE_HOUR,
        '2h'  => self::TWO_HOUR,
        '3h'  => self::THREE_HOUR,
        '4h'  => self::FOUR_HOUR,
        '6h'  => self::SIX_HOUR,
        '12h' => self::TWELVE_HOUR,
        '1d'  => self::ONE_DAY,
    ];

    /**
     * 获取es时间刻度
     *
     * @param $iStartTime
     * @param $iEndTime
     *
     * @return string
     */
    public static function getInterval($iStartTime, $iEndTime)
    {
        $iDiffTime = $iEndTime - $iStartTime;
        if ($iDiffTime <= self::THIRTY_MINUTE) {
            $return = '1m';
        } elseif ($iDiffTime <= self::ONE_HOUR) {
            $return = '2m';
        } elseif ($iDiffTime <= self::SIX_HOUR) {
            $return = '15m';
        } elseif ($iDiffTime <= self::TWELVE_HOUR) {
            $return = '30m';
        } elseif ($iDiffTime <= self::ONE_DAY) {
            $return = '1h';
        } elseif ($iDiffTime <= self::TWO_DAY) {
            $return = '2h';
        } elseif ($iDiffTime <= self::THREE_DAY) {
            $return = '3h';
        } elseif ($iDiffTime <= self::FIVE_DAY) {
            $return = '4h';
        } elseif ($iDiffTime <= self::SEVEN_DAY) {
            $return = '6h';
        } elseif ($iDiffTime <= self::FIFTEEN_DAY) {
            $return = '12h';
        } elseif ($iDiffTime <= self::THIRTY_DAY) {
            $return = '1d';
        } else {
            $return = '1d';
        }

        return $return;
    }

    /**
     * 自定义 es分割时间的刻度
     *
     * @param $startTime
     * @param $endTime
     * @param $switch //false 返回刻度 interval  true 返回长度 timeRange
     *
     * @return string
     */
    public static function getFactsInterval($startTime, $endTime, $switch = false)
    {
        $diff_time = $endTime - $startTime;
        if ($diff_time > self::ONE_MINUTE && $diff_time <= self::THIRTY_MINUTE) {
            $interval = '1m';
            $timeRange = self::ONE_MINUTE;
        } elseif ($diff_time > self::THIRTY_MINUTE && $diff_time <= self::ONE_HOUR) {
            $interval = '2m';
            $timeRange = self::TWO_MINUTE;
        } elseif ($diff_time > self::ONE_HOUR && $diff_time <= self::SIX_HOUR) {
            $interval = '15m';
            $timeRange = self::FIFTEEN_MINUTE;
        } elseif ($diff_time > self::SIX_HOUR && $diff_time <= self::TWELVE_HOUR) {
            $interval = '30m';
            $timeRange = self::THIRTY_MINUTE;
        } elseif ($diff_time > self::TWELVE_HOUR && $diff_time <= self::ONE_DAY) {
            $interval = '1h';
            $timeRange = self::ONE_HOUR;
        } elseif ($diff_time > self::ONE_DAY && $diff_time <= self::TWO_DAY) {
            $interval = '2h';
            $timeRange = self::TWO_HOUR;
        } elseif ($diff_time > self::TWO_DAY && $diff_time <= self::THREE_DAY) {
            $interval = '3h';
            $timeRange = self::THREE_HOUR;
        } elseif ($diff_time > self::THREE_DAY && $diff_time <= self::FIVE_DAY) {
            $interval = '4h';
            $timeRange = self::FOUR_HOUR;
        } elseif ($diff_time > self::FIVE_DAY && $diff_time <= self::SEVEN_DAY) {
            $interval = '6h';
            $timeRange = self::SIX_HOUR;
        } elseif ($diff_time > self::SEVEN_DAY && $diff_time <= self::FIFTEEN_DAY) {
            $interval = '12h';
            $timeRange = self::TWELVE_HOUR;
        } elseif ($diff_time > self::FIFTEEN_DAY && $diff_time <= self::THIRTY_DAY) {
            $interval = '1d';
            $timeRange = self::ONE_DAY;
        } else {
            $interval = '1d';
            $timeRange = self::ONE_DAY;
        }
        if ($switch) {
            return $timeRange;
        } else {
            return $interval;
        }

    }

    /**
     * 根据时间段获取曲线图(curve) 中的interval.
     *
     * @param $start_time
     * @param $end_time
     *
     * @return mixed
     */
    public static function getCurveInterval($start_time, $end_time)
    {
        $interval = self::getFactsInterval($start_time, $end_time);

        return $interval;
    }

    /**
     * 根据时间段获取Morris Line 中的xLables.
     *
     * @param $start_time
     * @param $end_time
     *
     * @return mixed
     */
    public static function getMorrisxLables($start_time, $end_time)
    {
        $format = self::getEchatsxKeyTimeFormat($start_time, $end_time);

        return $format;
    }

    /**
     * 根据时间段获取Morris Line 中的xLabels.
     *
     * @param $start_time
     * @param $end_time
     *
     * @return mixed
     */
    public static function getMorrisxKeyTimeFormat($start_time, $end_time)
    {
        $format = self::getEchatsxKeyTimeFormat($start_time, $end_time);

        return $format;
    }

    /**
     * 根据时间段获取echarts Line 中的xLabels.
     *
     * @param $start_time
     * @param $end_time
     *
     * @return mixed
     */
    public static function getEchatsxKeyTimeFormat($start_time, $end_time)
    {
        $diff_time = $end_time - $start_time;

        if ($diff_time <= self::THIRTY_MINUTE) {
            $format = 'H:i';
        } elseif ($diff_time <= self::ONE_HOUR) {
            $format = 'H:i';
        } elseif ($diff_time <= self::SIX_HOUR) {
            $format = 'H:i';
        } elseif ($diff_time <= self::TWELVE_HOUR) {
            $format = 'H:i';
        } elseif ($diff_time <= self::ONE_DAY) {
            $format = 'H:i';
        } elseif ($diff_time <= self::TWO_DAY) {
            $format = 'm-d H:i';
        } elseif ($diff_time <= self::THREE_DAY) {
            $format = 'm-d H:i';
        } elseif ($diff_time <= self::FIVE_DAY) {
            $format = 'm-d H:i';
        } elseif ($diff_time <= self::SEVEN_DAY) {
            $format = 'm-d H:i';
        } elseif ($diff_time <= self::FIFTEEN_DAY) {
            $format = 'm-d H:i';
        } elseif ($diff_time <= self::THIRTY_DAY) {
            $format = 'm-d H:i';
        } else {
            $format = 'm-d H:i';
        }

        return $format;
    }

    /**
     * 获取时间间隔的timestamp.
     *
     * @param $start_time
     * @param $end_time
     *
     * @return float
     */
    public static function getIntervalTimeStamp($start_time, $end_time)
    {
        $timeRange = self::getFactsInterval($start_time, $end_time, true);

        return $timeRange;
    }

    public static function getIntervalTimeMin($start_time, $end_time)
    {
        return self::getIntervalTimeStamp($start_time, $end_time) / 60000;
    }

    /**
     * 计算相差多少天.
     *
     * @param $time1
     * @param $time2
     *
     * @return float
     */
    public static function getTimeDiff($time1, $time2)
    {
        $diff_time = abs($time1 - $time2);
        $num = ceil($diff_time / 86400);

        return $num;
    }


    /**
     * 将 秒级别 时间长度 处理成 天时分秒 刻度长度
     * @param $sec
     * @return string
     */
    public static function getTimeFormat($sec)
    {
        if ($sec < 60) {
            return '0'.'秒';
        }
        $time = array();
        if ($sec / 86400 > 1) {
            $day = floor($sec / 86400);
            array_push($time, $day.'天');
            $sec = $sec - $day * 86400;
        }
        if ($sec / 3600 > 1) {
            $hour = floor($sec / 3600);
            array_push($time, $hour.'小时');
            $sec = $sec - $hour * 3600;
        }
        if ($sec / 60 > 1) {
            $minute = floor($sec / 60);
            array_push($time, $minute.'分');
        }
        $return = implode($time);

        return $return;
    }

}
