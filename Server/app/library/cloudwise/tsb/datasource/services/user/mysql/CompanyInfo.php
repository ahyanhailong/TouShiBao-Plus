<?php
/**
 * Created by PhpStorm.
 * User: Bear
 * Date: 17/11/1
 * Time: 下午10:37
 */

namespace cloudwise\tsb\datasource\services\user\mysql;


use cloudwise\tsb\datasource\base\MysqlService;

class CompanyInfo extends MysqlService
{
    protected $primaryKey = 'account_id';
    protected $table      = 'company_info';

    public $account_id;

    public $company_name;

    public $company_address = '';

    public $company_tel = '';

    public $company_fax = '';

    public $company_url;

    public $company_logo = '';

    public $company_industry;

    public function selfInsert()
    {
        $insert = [
            'account_id'       => $this->account_id,
            'company_name'     => $this->company_name,
            'company_address'  => $this->company_address,
            'company_tel'      => $this->company_tel,
            'company_fax'      => $this->company_fax,
            'company_url'      => $this->company_url,
            'company_logo'     => $this->company_logo,
            'company_industry' => $this->company_industry,
        ];

        return $this->insert($insert);
    }

    public function getAccountCompanyName($account_id){
        return $this->client->table($this->table)
            ->select(array('company_name'))
            ->where('account_id','=',$account_id)
            ->get();
    }

}