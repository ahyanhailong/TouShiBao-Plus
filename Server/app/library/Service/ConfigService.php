<?php
namespace App\library\Service;

/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/24
 * Time: 上午9:40
 */

class ConfigService extends BaseService
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
     * @param $config
     * @param $key
     *
     * @return null
     */
    public function getConfig($key, $config = null)
    {
        if ($config == null) {
            $config = \Yaf\Registry::get('config')->toArray();
        }
        if (strstr($key, '.')) {
            $key_params = explode('.', $key);

            $first_key = array_shift($key_params);
            if (array_key_exists($first_key, $config)) {
                return self::instance()->getConfig(implode('.', $key_params), $config[ $first_key ]);
            }
        } else {
            if (array_key_exists($key, $config)) {
                return $config[ $key ];
            } else {
                return '';
            }
        }
    }
}
