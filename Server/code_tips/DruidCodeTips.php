<?php

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/4
 * Time: 上午1:14
 */
class Druid
{
    /**
     * @param null $instanceName
     *
     * @return Druid
     */
    public static function getInstance($instanceName = NULL)
    {
        return new self();
    }

    /**
     * @param $bDebug
     *
     * @return void
     */
    public static function debugWitch($bDebug)
    {

    }

    /**
     * @param array $hosts
     *
     * @return void
     */
    public static function setDruidHosts(array $hosts)
    {

    }

    /**
     * @param $sPath
     *
     * @return void
     */
    public static function setTplPath($sPath)
    {

    }

    /**
     * @param $sContent
     *
     * @return array
     */
    public static function getData($sContent)
    {
        return array();
    }

    /**
     * @param       $sTpl
     * @param array $content
     *
     * @return array
     */
    public static function getDataByTpl($sTpl, $content = array())
    {
        return array();
    }

    /**
     * @return array
     */
    public static function getDebugInfo()
    {
        return array();
    }
}