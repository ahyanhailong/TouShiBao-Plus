<?php
namespace cloudwise\tsb\datasource\constants;

/**
 * @author Neeke.Gao
 * Date: 14-5-13 下午5:42
 *
 * cache时间 分钟
 */
class CacheExpireEnum
{
    //redis hlen
    const COMMAND_HLEN = 'HLEN';
    const COMMAND_HDEL = 'HDEL';
    const COMMAND_HEXISTS = 'HEXISTS';
    const COMMAND_HGET = 'HGET';
    const COMMAND_HGETALL = 'HGETALL';
    const COMMAND_HINCRBY = 'HINCRBY';
    const COMMAND_HINCRBYFLOAT = 'HINCRBYFLOAT';
    const COMMAND_HKEYS = 'HKEYS';
    const COMMAND_HVALS = 'HVALS';
    const COMMAND_HMGET = 'HMGET';
    const COMMAND_HMSET = 'HMSET';
    const COMMAND_HSCAN = 'HSCAN';
    const COMMAND_HSET = 'HSET';
    const COMMAND_HSETNX = 'HSETNX';
    const COMMAND_HSTRLEN = 'HSTRLEN';

    const EXPIRE_DEFAULT = 5;

    const EXPIRE_DOMAIN_LIST = 1;

    //用户中心修改有邮箱过期时间配置
    const USER_CENTER_CHECK_CODE_TIME = 1440; //用户中心修改邮箱,验证码的过期时间1天
    const USER_CENTER_SEND_CODE_TIME = 2;     //用户中心修改邮箱,限制发送发送验证码间隔2分钟

    /**
     * smartAgent 心跳状态过期时间(分钟).
     */
    const EXPIRE_HEART_BEAT_TIME = 5; //60*5 smartAgent发送心跳每60s发送一次，因此是5个周期

    const EXPIRE_MOBILE_API = 5;

    public static function getMobileApiCacheExpire()
    {
        $config = Config::get('cache.api_cache_expire');
        if ($config) {
            return $config;
        }

        return self::EXPIRE_MOBILE_API;
    }

    /**
     * 数据共享密钥缓存时间.
     */
    const EXPIRE_SECRET_CODE_TIME = 10;
}
