<?php
namespace cloudwise\tsb\datasource\services\app;

use cloudwise\tsb\datasource\services\app\druid\DruidDatabase;
use cloudwise\tsb\datasource\services\app\es\EsDatabase;
use cloudwise\tsb\datasource\services\app\es\DBService;
use cloudwise\tsb\datasource\services\app\es\MessageQueueService;
use cloudwise\tsb\datasource\services\app\mysql\DimApp;
use cloudwise\tsb\datasource\base\BusinessProvider;
use cloudwise\tsb\datasource\base\ESService;
use cloudwise\tsb\datasource\services\app\es\OverviewService;
use cloudwise\tsb\datasource\services\app\es\TopoService;
use cloudwise\tsb\datasource\services\app\es\KeyTransactionService;
use cloudwise\tsb\datasource\services\app\es\TransactionAnalysisService;
use cloudwise\tsb\datasource\services\app\es\ComparativeAnalysisService;
use cloudwise\tsb\datasource\services\app\es\NosqlService;
use cloudwise\tsb\datasource\services\app\es\SettingService;
use cloudwise\tsb\datasource\services\app\es\ErrorService;
use cloudwise\tsb\datasource\services\app\es\ExternalServiceService;
use cloudwise\tsb\datasource\services\app\es\AppList;
use cloudwise\tsb\datasource\services\app\mysql\RsAppHost;
use cloudwise\tsb\datasource\services\host\mysql\DimHost;
use cloudwise\tsb\datasource\services\app\mysql\FilterGroup;
use cloudwise\tsb\datasource\services\app\mysql\keyAffairs;
use cloudwise\tsb\datasource\services\app\mysql\AppGroup;
use cloudwise\tsb\datasource\services\app\mysql\RelationshipAppGroup;
use cloudwise\tsb\datasource\services\app\mysql\AppTopoItems;
use cloudwise\tsb\datasource\services\app\mysql\DimAppLayout;
use cloudwise\tsb\datasource\services\app\mysql\AppWhiteList;
use cloudwise\tsb\datasource\services\app\mysql\PluginBank;

/**
 * Class Provider
 *
 * @package cloudwise\tsb\datasource\services\user
 */
class Provider extends BusinessProvider
{
    const PROVIDER_NAME = "tsb_app_service_provider";

    public $name = self::PROVIDER_NAME;


    /**
     * @return DimApp
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getDimAppService()
    {
        return $this->getService(DimApp::class);
    }

    /**
     * @return RsAppHost
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getRsAppHostService()
    {
        return $this->getService(RsAppHost::class);
    }

    /**
     * @return keyAffairs
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getKeyAffairsService()
    {
        return $this->getService(keyAffairs::class);
    }

    /**
     * @return keyAffairs
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getPluginBankService()
    {
        return $this->getService(PluginBank::class);
    }

    /**
     * @return AppGroup
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getAppGroupService()
    {
        return $this->getService(AppGroup::class);
    }

    /**
     * @return AppTopoItems
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getAppTopoItemsService()
    {
        return $this->getService(AppTopoItems::class);
    }


    /**
     * @return RelationshipAppGroup
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getRelationshipAppGroupService()
    {
        return $this->getService(RelationshipAppGroup::class);
    }


    /**
     * @return EsDatabase
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getEsHostService()
    {
        return $this->getService(EsDatabase::class);
    }

    /**
     * @return DruidDatabase
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getDruidDatabase()
    {
        return $this->getService(DruidDatabase::class);
    }

    /**
     * @return \cloudwise\tsb\datasource\services\host\mysql\DimHost
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getDimHostService()
    {
        return $this->getService(DimHost::class);
    }


    /**
     * @return DBService
     */
    public function getDBService()
    {
        return $this->getService(DBService::class);
    }

    /**
     * @return OverviewService
     */
    public function getOverviewService()
    {
        return $this->getService(OverviewService::class);
    }

    /**
     * @return DBService
     */
    public function getESService()
    {
        return $this->getService(ESService::class);
    }

    /**
     * @return TopoService
     */
    public function getTopoService()
    {
        return $this->getService(TopoService::class);
    }

    /**
     * @return KeyTransactionService
     */
    public function getKeyTransactionService()
    {
        return $this->getService(KeyTransactionService::class);
    }

    /**
     * @return KeyTransactionService
     */
    public function getDimAppLayoutService()
    {
        return $this->getService(DimAppLayout::class);
    }

    /**
     * @return TransactionAnalysisService
     */
    public function getTransactionAnalysisService()
    {
        return $this->getService(TransactionAnalysisService::class);
    }

    /**
     * @return ComparativeAnalysisService
     */
    public function getComparativeAnalysisService()
    {
        return $this->getService(ComparativeAnalysisService::class);
    }

    /**
     * @return NosqlService
     */
    public function getNosqlService()
    {
        return $this->getService(NosqlService::class);
    }

    /**
     * @return SettingService
     */
    public function getSettingService()
    {
        return $this->getService(SettingService::class);
    }

    /**
     * @return OverviewService
     */
    public function getMessageQueenService()
    {
        return $this->getService(MessageQueueService::class);
    }

    /**
     * @return ExternalServiceService
     */
    public function getExternalServiceService()
    {
        return $this->getService(ExternalServiceService::class);
    }

    /**
     * @return ErrorService
     */
    public function getErrorService()
    {
        return $this->getService(ErrorService::class);
    }

    /**
     * @return FilterGroup
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getFilterGroupModel()
    {
        return $this->getService(FilterGroup::class);
    }

    /**
     * @return AppList
     */
    public function getAppListService()
    {
        return $this->getService(AppList::class);
    }

    /**
     * @return AppWhiteList
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getAppWhiteList()
    {
        return $this->getService(AppWhiteList::class);
    }
}


