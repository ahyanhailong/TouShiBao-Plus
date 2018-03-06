<?php
/**
 * Created by PhpStorm.
 * User: admin-chen
 * Date: 14-5-26
 * Time: 下午3:37.
 */
namespace cloudwise\tsb\datasource\constants;

class AjaxPageEnum
{
    const AJAX_PAGE_FUNC = 'ajax_paginate_func_name'; //指定处理ajax分页的函数名称

    const PAGE_DEFAULT = 5; //默认分页数

    const PAGE_APP_NOSQL = 5;

    const PAGE_DEFAULT_20 = 20; //默认分页数

    const PAGE_ALERT_TEMPLATE = 6;  //告警模板分页

    const PROMO_STRATEGY_PAGE_NUM = 10; //优惠策略列表的分页数

    const PROJECT_PAGE_NUM = 10; //网站下属页面列表分页数

    const DOMAIN_LIST_NUM = 6; //网站列表分页

    const ALERT_LIST_NUM = 8; //告警列表分页

    const PAGE_APP_TRACK_URI_LIST_NUM = 5;//显示页码数

    const PAGE_APP_TRACK_URL_LIST_NUM = 5;//显示页码数

    const PAGE_BROWSER_URI_NUM = 5;//显示页码数

    const PAGE_REPORT_INFO_NUM = 5;

    public static function getPageData($data, $current_page)
    {
        $return             = [];
        $return['max_page'] = ceil(count($data) / AjaxPageEnum::PAGE_DEFAULT);
        $return['list']     = array_slice($data, ($current_page - 1) * AjaxPageEnum::PAGE_DEFAULT, AjaxPageEnum::PAGE_DEFAULT);

        return $return;
    }

    /**
     * 生成分页
     *
     * @param     $aList
     * @param     $iCurrentPage
     * @param int $iLimit
     *
     * @return array
     */
    public static function processPageResult($aList, $iCurrentPage, $iLimit = self::PAGE_DEFAULT)
    {
        $aList      = (array)$aList;
        $iPageMax   = ceil(count($aList) / $iLimit);
        $aPageItems = array_slice($aList, ($iCurrentPage - 1) * $iLimit, $iLimit);
        $order = 1;
        foreach($aPageItems as $index=>$item){
            if(is_array($item)){
                $aPageItems[$index]['order'] = ($iCurrentPage - 1) * $iLimit + $order++;
            }
        }
        $result = [
            'list'         => $aPageItems,
            'page_max'     => $iPageMax,
            'page_current' => (int)$iCurrentPage,
            'total_items'  => count($aList),
            'limit'        => $iLimit,
        ];

        return $result;
    }
}
