<?php
namespace cloudwise\tsb\datasource\constants;

/**
 * @author Neeke.Gao
 * Date: 14-5-13 下午5:42
 *
 * cache时间 分钟
 */
class CacheKeyEnum
{
    /**
     * Druid 相关
     */
    const TAG_DATA_CENTER = 'data_center';

    /*
     * ES terms min_doc_count
     * */
    const MIN_DOC_COUNT = 'min_doc_count';

    /**
     * Cwop 相关
     */
    const TAG_CWOP = 'cwop';

    /**
     * app 相关
     */
    const TAG_APP_OPERATOR_VIEW ='oPeratorView';

    /**
     * smartAgent 心跳相关.
     */
    //smartAgent 相关的tag
    const TAG_SMART_AGENT = 'tsb_smartAgent';

    //smartAgent 主机状态相关的key
    public static function makeSmartAgentHostKey($account_id, $host_id)
    {
        return md5($account_id . $host_id);
    }

    //smartAgent 插件工作状态相关的key
    public static function makeSmartAgentPluginWorkKey($account_id, $host_id, $service_type, $service_qualifier, $plugin_version, $prefix)
    {
        return md5($account_id . $host_id . $service_type . $service_qualifier . $plugin_version . $prefix);
    }

    //smartAgent 插件安装状态相关的key
    //static public function makeSmartAgentPluginInstallKey($account_id,$host_id,$service_type,$service_qualifier,$plugin_version,$prefix){
    public static function makeSmartAgentPluginInstallKey($account_id, $host_id, $service_type, $service_qualifier, $plugin_version, $prefix)
    {
        return md5($account_id . $host_id . $service_type . $service_qualifier . $plugin_version . $prefix);
    }
}
