<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/11/8
 * Time: 上午10:38
 */

namespace App\library\Service;


use cloudwise\tsb\business\account\User;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;

/**
 * Class FilterService
 *
 * @package App\library\Service
 */
class FilterService extends BaseService
{
    /**
     * @var ConfigService
     */
    private static $self = null;

    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    /**
     * @return array
     */
    public function userFilter()
    {
        if (!isset(ParamsService::$params['sign']) || !User::instance()->getUserCache()) {
            return [
                'code' => ErrorCodeEnum::STATUS_ERROR_USER_FILTER,
                'msg'  => '用户未登录',
            ];
        }

        return [];
    }
}