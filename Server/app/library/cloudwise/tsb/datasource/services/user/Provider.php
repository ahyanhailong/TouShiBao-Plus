<?php
namespace cloudwise\tsb\datasource\services\user;

use cloudwise\tsb\datasource\constants\AccountLicenseEnum;
use cloudwise\tsb\datasource\services\user\mysql\AccountInfo;
use cloudwise\tsb\datasource\services\user\mysql\AccountServiceExpireSetting;
use cloudwise\tsb\datasource\services\user\mysql\CompanyInfo;
use cloudwise\tsb\datasource\services\user\mysql\GroupInfo;
use cloudwise\tsb\datasource\services\user\mysql\GroupPrivilege;
use cloudwise\tsb\datasource\services\user\mysql\LicAccountQuota;
use cloudwise\tsb\datasource\services\user\mysql\RolesInfo;
use cloudwise\tsb\datasource\services\user\mysql\RsGroupUser;
use cloudwise\tsb\datasource\services\user\mysql\RsRolesUser;
use cloudwise\tsb\datasource\services\user\mysql\UserPersonalSettings;
use cloudwise\tsb\datasource\base\BusinessProvider;
use cloudwise\tsb\datasource\services\user\mysql\AccountExpireSetting;
use cloudwise\tsb\datasource\services\user\mysql\UserInfo;
use cloudwise\tsb\datasource\services\user\mysql\UserRegister;
use cloudwise\tsb\datasource\services\user\mysql\LicConsumeStatus;
use cloudwise\tsb\datasource\services\user\mysql\LicenseHostList;
use cloudwise\tsb\datasource\services\user\mysql\LicenseQuotaUpdatedHistory;
use cloudwise\tsb\datasource\services\user\mysql\AccountType;

/**
 * Class Provider
 *
 * @package cloudwise\tsb\datasource\services\user
 */
class Provider extends BusinessProvider
{
    const PROVIDER_NAME = "tsb_user_service_provider";

    public $name = self::PROVIDER_NAME;


    /**
     * @return UserInfo
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getUserInfo()
    {
        return $this->getService(UserInfo::class);
    }

    /**
     * @return AccountExpireSetting
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getAccountExpireSettingService()
    {
        return $this->getService(AccountExpireSetting::class);
    }


    public function getLicConsumeStatus(){

        return $this->getService(LicConsumeStatus::class);
    }


    public function getLicenseHostList(){

        return $this->getService(LicenseHostList::class);
    }

    public function getLicenseQuotaUpdatedHistory(){

        return $this->getService(LicenseQuotaUpdatedHistory::class);
    }

    public function getAccountType(){

        return $this->getService(AccountType::class);
    }


    /**
     * @return AccountServiceExpireSetting
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getAccountServiceExpireSettingService()
    {
        return $this->getService(AccountServiceExpireSetting::class);
    }

    /**
     * @return LicAccountQuota
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getLicAccountQuota()
    {
        return $this->getService(LicAccountQuota::class);
    }

    /**
     * @return UserRegister
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getUserRegisterService()
    {
        return $this->getService(UserRegister::class);
    }

    /**
     * @return UserPersonalSettings
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getUserPersonalSettings()
    {
        return $this->getService(UserPersonalSettings::class);
    }

    /**
     * @return AccountInfo
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getAccountInfo()
    {
        return $this->getService(AccountInfo::class);
    }

    /**
     * @return CompanyInfo
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getCompanyInfo()
    {
        return $this->getService(CompanyInfo::class);
    }

    /**
     * @return RolesInfo
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getRolesInfo()
    {
        return $this->getService(RolesInfo::class);
    }

    /**
     * @return RsRolesUser
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getRsRolesUser()
    {
        return $this->getService(RsRolesUser::class);
    }

    /**
     * @return GroupInfo
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getGroupInfo()
    {
        return $this->getService(GroupInfo::class);
    }

    /**
     * @return RsGroupUser
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getRsGroupUser()
    {
        return $this->getService(RsGroupUser::class);
    }

    /**
     * @return GroupPrivilege
     * @throws \cloudwise\tsb\datasource\exception\RuntimeException
     */
    public function getGroupPrivilege()
    {
        return $this->getService(GroupPrivilege::class);
    }
}


