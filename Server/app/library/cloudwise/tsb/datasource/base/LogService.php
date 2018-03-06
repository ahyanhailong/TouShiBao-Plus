<?php
namespace cloudwise\tsb\datasource\base;

/**
 * Class LogService
 *
 * @package cloudwise\tsb\datasource\base
 */
class LogService
{
    const PAGE_LIMIT = 10;

    const EXCEPTION_LOG_PATH = 'critical';

    /**
     * @param        $level
     * @param string $txt
     * @param array  $jsondata
     * @param array  $content
     * @param string $module
     */
    public static function setLog($level, $txt = '', $jsondata = [], array $content = [], $module = '')
    {
        if (!empty($jsondata)) {

            $jsondata = $txt . (json_encode($jsondata));

        } else {
            $jsondata = $txt;
        }
        if ($module) {
            \Seaslog::$level($jsondata, $content, $module);
        } else {
            \Seaslog::$level($jsondata, $content);
        }
    }

    /**
     * 设置日志路径
     *
     * @param $module
     */
    public static function setLogger($module)
    {
        \Seaslog::setLogger($module);
    }

    /**
     * 对异常进行日志
     *
     * @param $e \Exception
     */
    public static function logException($e)
    {
        \Seaslog::critical(
            json_encode([$e->getCode(), $e->getFile(), $e->getLine(), $e->getMessage(), $_SERVER['REQUEST_URI']]), [], self::EXCEPTION_LOG_PATH);
    }
}