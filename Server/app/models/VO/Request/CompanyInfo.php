<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/26
 * Time: 下午7:29
 */

namespace App\models\VO\Request;


use App\models\VO\Common;

class CompanyInfo extends Common
{
    public $account_id;

    public $company_name;

    public $company_address = '';

    public $company_tel = '';

    public $company_fax = '';

    public $company_url;

    public $company_logo = '';

    public $company_industry;
}