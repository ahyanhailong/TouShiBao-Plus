<?php
use App\library\Service\RESTService;
use App\library\Service\ParamsService;
use cloudwise\tsb\datasource\Provider;
use cloudwise\tsb\business\account\User;
use cloudwise\tsb\datasource\constants\TimeRangeEnum;
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/23
 * Time: 下午4:59
 */
class BaseController extends \Yaf\Controller_Abstract
{
    /**
     * @var App\library\Service\RESTService
     */
    protected $rest = null;

    protected $params = null;

    /**
     * @var Provider
     */
    protected $provider;

    public function init()
    {
        $this->params = ParamsService::instance()->getParams();
        if(User::instance()->getUserCache()) {
            $this->params['account_id'] = User::instance()->getUserCache()->account_id;
        }

        if(!is_numeric($this->params['start_time'])){
            $this->params['start_time'] = strtotime($this->params['start_time']) * 1000;
        }

        if(!is_numeric($this->params['end_time'])){
            $this->params['end_time'] = strtotime($this->params['end_time']) * 1000;
        }

        if($this->params['end_time'] - $this->params['start_time'] > TimeRangeEnum::TIME_RANGE_MAX){
            $this->params['start_time'] = $this->params['end_time'] - TimeRangeEnum::TIME_RANGE_MAX;
        }

        $this->rest = RESTService::instance();
        $this->provider = \Yaf\Registry::get(Provider::PROVIDER_NAME);

        return $this;
    }
}