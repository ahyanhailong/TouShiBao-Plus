<?php
namespace cloudwise\tsb\datasource\base;

use Illuminate\Cache\RedisStore;
use Illuminate\Redis\Database;

class CacheService extends Service
{

    public $clientType = BusinessProvider::TYPE_PROVIDER_SERVICE_CACHE;

    const EXPIRE_DEFAULT = 5;

    //redis获取长度的命令
    const COMMAND_HLEN = 'HLEN';

    /**
     * @var RedisStore
     */
    public $client;

    /**
     * @param $config
     *
     * @return RedisStore
     */
    public function addConnection($config)
    {
        $redis = new Database($config);
        $client = new RedisStore($redis);

        return $client;
    }

    /**
     * 检测是否存在某key 或 某tags下某key
     *
     * @param      $key
     * @param null $tags
     *
     * @return mixed
     */
    public function exists($key, $tags = null)
    {
        if (empty($tags)) {
            return $this->client->get($key);
        }

        if (!is_array($tags)) {
            $tags = [$tags];
        }

        return $this->client->tags($tags)->get($key);
    }

    /**
     * 设置某key值 或 某tags下某key值
     *
     * @param      $key
     * @param      $value
     * @param int  $expireTime
     * @param null $tags
     *
     * @return mixed
     */
    public function set($key, $value, $expireTime = 0, $tags = null)
    {
        $expireTime = $this->getiExpiresAt($expireTime);

        if (is_null($tags)) {
            if ($this->exists($key)) {
                $this->del($key);
            }

            $this->client->put($key, $value, $expireTime);
        } else {
            $tags = $this->getaTags($tags);
            if ($this->exists($key, $tags)) {
                $this->del($key, $tags);
            }
            $this->client->tags($tags)->put($key, $value, $expireTime);
        }

        return true;
    }

    /**
     * 永久的设置某key值 或 某tags下某key值
     *
     * @param      $key
     * @param      $value
     * @param null $tags
     */
    public function setForever($key, $value, $tags = null)
    {
        if (is_null($tags)) {
            if ($this->exists($key)) {
                $this->del($key);
            }

            $this->client->forever($key, $value);
        } else {
            $tags = $this->getaTags($tags);
            if ($this->exists($key, $tags)) {
                $this->del($key, $tags);
            }
            $this->client->tags($tags)->forever($key, $value);
        }
    }

    /**
     * 取得某key对应值 或 某tags下某key对应值
     *
     * @param      $key
     * @param null $default
     * @param null $tags
     *
     * @return mixed
     */
    public function get($key, $tags = null, $default = null)
    {
        if (is_null($tags)) {
            return $this->client->get($key);
        } else {
            $tags = $this->getaTags($tags);

            return $this->client->tags($tags)->get($key, $default);
        }
    }

    /**
     * 删除某key 或 某tags下所有key
     *
     * @param      $key
     * @param null $tags
     *
     * @return mixed
     */
    public function del($key, $tags = null)
    {
        if (is_null($tags)) {
            return $this->client->forget($key);
        } else {
            $tags = $this->getaTags($tags);
            if (!empty($key)) {
                return $this->client->tags($tags)->forget($key);
            } else {
                $this->client->tags($tags)->flush();
            }
        }
    }


    /**
     * redis  hlen function
     *
     * @param $key
     *
     * @return mixed
     * @throws \Exception
     */
    public function getHlen($key)
    {
        $redis = $this->client->getRedis();
        try {
            $result = $redis->command(self::COMMAND_HLEN, [$key]);
        } catch (\Exception $e) {
            throw new \Exception(
                $e->getMessage(), $e->getCode());
        }

        return $result;
    }

    /**
     * redis 其他命令
     *
     * @param       $command
     * @param array $params
     *
     * @return mixed
     * @throws \Exception
     */
    public function getRedisCommand($command, array $params = [])
    {
        $redis = $this->client->getRedis();
        try {
            $result = $redis->command($command, $params);
        } catch (\Exception $e) {
            throw new \Exception(
                $e->getMessage(), $e->getCode());
        }

        return $result;
    }


    private function getiExpiresAt($expireTime = 0)
    {
        if ((int)$expireTime <= 0) {
            $expireTime = self::EXPIRE_DEFAULT;
        }

        return $expireTime;
    }

    private function getaTags($tags = null)
    {
        if (!is_array($tags) && !empty($tags)) {
            $tags = [$tags];
        }

        return $tags;
    }

}