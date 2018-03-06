<?php
/**
 * @author bear
 * Date: 17/12/19 下午3:47
 */

namespace cloudwise\tsb\datasource\services\app\mysql;


use cloudwise\tsb\datasource\base\MysqlService;
use cloudwise\tsb\datasource\constants\AppEnum;

class AppWhiteList extends MysqlService
{
    protected $table      = 'app_error_exception_white_list';
    protected $primaryKey = 'id';

    public $id;
    public $uri;
    public $app_id;
    public $account_id;
    public $type;
    public $value;

    public function selfInsert()
    {
        if ($this->type == AppEnum::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE) {
            $this->uri = json_encode($this->uri);
        } else {
            $this->uri = '';
        }
        $insert = [
            'account_id'    => $this->account_id,
            'app_id'        => $this->app_id,
            'type'          => $this->type,
            'uri'           => $this->uri,
            'value'         => $this->value,
            'status'        => AppEnum::APP_ERROR_EX_WHITE_DISPATCH_WAIT,
            'delete_status' => AppEnum::APP_ERROR_EX_DELETE_STATUS_NO,
            'created_time'  => time(),
            'updated_time'  => time(),
        ];

        return $this->insert($insert);
    }

    public function selfUpdate()
    {
        $update = [
            'value' => $this->value,
            'type'  => $this->type,
        ];
        if ($this->type == AppEnum::APP_ERROR_EX_TYPE_JAVA_HTTP_CODE) {
            $update['uri'] = json_encode($this->uri);
        } else {
            $this->uri = '';
        }

        if ($this->exists($update)) {
            return 'exists';
        } else {
            if($this->update($update, $this->id)){
                return $this->id;
            }else{
                return false;
            }
        }
    }
}