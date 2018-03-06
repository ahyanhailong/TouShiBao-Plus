<?php
/**
 * Created by PhpStorm.
 * User: napple
 * Date: 17/11/14
 * Time: 下午6:36
 */

namespace cloudwise\tsb\business\app\web;

use cloudwise\tsb\business\Business;
use cloudwise\tsb\datasource\helper\ArrayHelper;
use Yaf\Exception;
use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\AjaxPageEnum;

/**
 * Class KeyTransaction
 * @package cloudwise\tsb\business\app\web
 */
class KeyTransaction extends Business
{
    /**
     * @var KeyTransaction
     */
    private static $self = null;

    /**
     * @return KeyTransaction
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function getKeyTransactionList($params)
    {
        $params        = $this->initListParams($params, 'apdex_status');
        $business_list = self::$provider->getAppProvider()->getKeyAffairsService()->getBusinessList($params);


        foreach ($business_list as $item) {
            $str = $item->name . '(' . $item->uri . ')';
            if($params['surf']) {
                if (strstr($str, $params['surf'])) {
                    $params['business_list'][] = [
                        'name' => $item->name,
                        'uri' => $item->uri,
                        'apdex' => $item->apdex,
                        'type' => $item->type,
                        'business_id'=>$item->business_id,
                    ];
                }
            }else{
                $params['business_list'][] = [
                    'name' => $item->name,
                    'uri' => $item->uri,
                    'apdex' => $item->apdex,
                    'type' => $item->type,
                    'business_id'=>$item->business_id,
                ];
            }
        }

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getKeyTransactionList($params);
        $return  = AjaxPageEnum::processPageResult($es_data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $return;
    }

    public function getProfilingStatisticalIndicators($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getProfilingRespTimeAndCountDataMixed($params);

        return $es_data;
    }

    public function getProfilingTransactionSlowElement($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getProfilingRespTimeAndCountDataMixed($params);

        return $es_data;
    }

    public function getProfilingSingleUrlStatisticalIndicatorst($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getProfilingRespTimeAndCountDataMixed($params);

        return $es_data;
    }

    public function getProfilingRespTimeAndCountDataMixed($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getProfilingRespTimeAndCountDataMixed($params);

        return $es_data;
    }

    public function getProfilingErrorAndExceptionTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getProfilingErrorAndExceptionTrendChart($params);

        return $es_data;
    }

    public function getProfilingApdexAnalysisTrendChart($params)
    {
        $business_list         = self::$provider->getAppProvider()->getKeyAffairsService()->fetchRow(array('account_id' => $params['account_id'], 'app_id' => $params['app_id'], 'uri' => $params['uri']));
        $params['apdex']       = $business_list->apdex;
        $es_data               = self::$provider->getAppProvider()->getKeyTransactionService()->getProfilingApdexAnalysisTrendChart($params);
        $es_data['apdex_time'] = $business_list->apdex;

        return $es_data;
    }

    public function getErrorAnalysisErrorAndExceptionTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getErrorAnalysisErrorAndExceptionTrendChart($params);

        return $es_data;
    }

    public function getErrorAnalysisErrorRatePie($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getErrorAnalysisErrorRatePie($params);

        return $es_data;
    }

    public function getErrorAnalysisExceptionRatePie($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getErrorAnalysisExceptionRatePie($params);

        return $es_data;
    }

    public function getErrorAnalysisErrorList($params)
    {
        $params['service_type'] = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);
        $es_data                = self::$provider->getAppProvider()->getKeyTransactionService()->getErrorAnalysisErrorList($params);
        $params                 = $this->initListParams($params, 'count');
        ArrayHelper::sortByUser($es_data, $params['order'], $params['sort']);
        $es_data = AjaxPageEnum::processPageResult($es_data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $es_data;
    }

    public function getErrorAnalysisExceptionList($params)
    {
        $params['service_type'] = AppGeneralMethod::instance()->getCodeServiceType($params['account_id'], $params['app_id']);
        $es_data                = self::$provider->getAppProvider()->getKeyTransactionService()->getErrorAnalysisExceptionList($params);
        $params                 = $this->initListParams($params, 'count');
        ArrayHelper::sortByUser($es_data, $params['order'], $params['sort']);
        $es_data = AjaxPageEnum::processPageResult($es_data, $params['page'], AjaxPageEnum::PAGE_APP_NOSQL);

        return $es_data;
    }

    public function getSqlAnalysisTimeAndRpmTrendChart($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getSqlAnalysisTimeAndRpmTrendChart($params);

        return $es_data;
    }

    public function getSqlAnalysisTimeDistributionLine($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getSqlAnalysisTimeDistributionLine($params);

        return $es_data;
    }

    public function getSqlAnalysisSqlAggsList($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getSqlAnalysisSqlAggsList($params);

        return $es_data;
    }

    public function getSnapAnalysisTimeDistributionLine($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getSnapAnalysisTimeDistributionLine($params);

        return $es_data;
    }

    public function getSnapAnalysisSqlSnapList($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getSnapAnalysisSqlSnapList($params);

        return $es_data;
    }

    public function createKeyTransaction($params)
    {

        $data         = self::$provider->getAppProvider()->getKeyAffairsService()->createKeyTransaction($params);

        return $data;
    }

    public function deleteTransaction($params)
    {

        $data         = self::$provider->getAppProvider()->getKeyAffairsService()->deleteTransaction($params);

        return $data;
    }

    public function updateTransaction($params)
    {

        $data         = self::$provider->getAppProvider()->getKeyAffairsService()->updateTransaction($params);

        return $data;
    }

    public function getSettingUriList($params)
    {

        $es_data = self::$provider->getAppProvider()->getKeyTransactionService()->getSettingUriList($params);

        return array('data'=>$es_data,'num'=>count($es_data));
    }

    public function getSingleTransactionData($params)
    {

        $data         = self::$provider->getAppProvider()->getKeyAffairsService()->getSingleTransactionData($params);

        return $data;
    }


    public function initListParams($params, $order = 'wt', $sort = 'desc')
    {
        $params['page']  = isset($params['page']) && $params['page'] ? $params['page'] : 1;
        $params['order'] = isset($params['order']) && $params['order'] ? $params['order'] : $order;
        $params['sort']  = isset($params['sort']) && $params['sort'] ? $params['sort'] : $sort;

        return $params;
    }

}