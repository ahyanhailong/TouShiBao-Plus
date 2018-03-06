<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/7
 * Time: 下午5:27
 */

namespace cloudwise\tsb\datasource\helper;

/**
 * 获取环境信息
 * Class EnvHelper
 *
 * @package cloudwise\tsb\datasource\helper
 */
class EnvHelper
{
    /**
     * 获取浏览器的类型
     *
     * @return bool|string
     */
    public static function checkBrowserClient()
    {
        $sBrowserName = false;
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        if (strpos($user_agent, 'Opera') || strpos($user_agent, 'OPR/')) {
            $sBrowserName = 'Opera';
        } elseif (strpos($user_agent, 'Edge')) {
            $sBrowserName = 'Edge';
        } elseif (strpos($user_agent, 'Chrome')) {
            $sBrowserName = 'Chrome';
        } elseif (strpos($user_agent, 'Safari')) {
            $sBrowserName = 'Safari';
        } elseif (strpos($user_agent, 'Firefox')) {
            $sBrowserName = 'Firefox';
        } elseif (strpos($user_agent, 'MSIE') || strpos($user_agent, 'Trident/7')) {
            $sBrowserName = 'Internet Explorer';
        }

        return $sBrowserName;
    }
}