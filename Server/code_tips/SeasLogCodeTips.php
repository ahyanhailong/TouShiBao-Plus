<?php
/**
 * 仅用作SeasLog代码提示
 *
 * @author neeke@php.net
 * Date: 14-10-30 上午11:34
 */
class SeasLog
{
    public function __construct()
    {
        #SeasLog init
    }

    public function __destruct()
    {
        #SeasLog distroy
    }

    /**
     * 设置basePath
     * @param $basePath
     * @return bool
     */
    static public function setBasePath($basePath)
    {
        return TRUE;
    }

    /**
     * 获取basePath
     * @return string
     */
    static public function getBasePath()
    {
        return 'the base_path';
    }

    /**
     * 设置模块目录
     * @param $module
     * @return bool
     */
    static public function setLogger($module)
    {
        return TRUE;
    }

    /**
     * 获取最后一次设置的模块目录
     * @return string
     */
    static public function getLastLogger()
    {
        return 'the lastLogger';
    }

    /**
     * 统计所有类型（或单个类型）行数
     * @param $level
     * @param string $log_path
     * @param string $key_word
     * @return array | long
     */
    static public function analyzerCount($level = 'all',$log_path = '*', $key_word = '')
    {
        return array();
    }

    /**
     * 以数组形式，快速取出某类型log的各行详情
     * @param $level
     * @param string $log_path
     * @return array
     */
    static public function analyzerDetail($level, $date, $key_word, $start, $end)
    {
        return array();
    }

    /**
     * 获得当前日志buffer中的内容
     * @return array
     */
    static public function getBuffer()
    {
        return array();
    }

    /**
     * 记录debug日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function debug($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_DEBUG
    }

    /**
     * 记录info日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function info($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_INFO
    }

    /**
     * 记录notice日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function notice($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_NOTICE
    }

    /**
     * 记录warning日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function warning($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_WARNING
    }

    /**
     * 记录error日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function error($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_ERROR
    }

    /**
     * 记录critical日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function critical($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_CRITICAL
    }

    /**
     * 记录alert日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function alert($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_ALERT
    }

    /**
     * 记录emergency日志
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function emergency($message,array $content = array(),$module = '')
    {
        #$level = SEASLOG_EMERGENCY
    }

    /**
     * 通用日志方法
     * @param $level
     * @param $message
     * @param array $content
     * @param string $module
     */
    static public function log($level,$message,array $content = array(),$module = '')
    {

    }
}