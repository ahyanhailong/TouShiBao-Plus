<?php
namespace cloudwise\tsb\datasource\helper;

use App\library\Service\ConfigService;
use cloudwise\tsb\datasource\base\LogService;

/**
 * RestClient
 *
 * @author Neeke.Gao
 *
 * demo
 *        $data = array(
 *            'param1' => 'test',
 *            'param2' => 'test',
 *            );
 *
 *        $this->c = ApiClient::instance();
 *        $this->c->setMethod(ApiClient::METHOD_POST);
 *        $this->c->setData($data);
 *        $this->c->setApi('http://www.baidu.com');
 *        $this->c->go();
 *        $body = $this->c->getBody();
 *        var_dump($body);
 */
class ApiClient
{
    const METHOD_GET = 'GET';
    const METHOD_POST = 'POST';
    const METHOD_PUT = 'PUT';
    const METHOD_DELETE = 'DELETE';
    const SUCCESS = 1000;

    /**
     * @var ApiClient
     */
    private static $self = null;

    /**
     * @static
     * @return ApiClient
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self;
        }

        return self::$self;
    }

    private $header = null;

    function getHeader()
    {
        return $this->header;
    }

    public function setHeader($key, $value)
    {
        $this->header[ $key ] = $value;

        return $this->header;
    }

    private $body = null;

    function getBody()
    {
        return $this->body;
    }

    /**
     * method方法
     *
     * @var (string)GET|POST|PUT|DELETE
     */
    private $method = self::METHOD_GET;

    public function setMethod($method = self::METHOD_GET)
    {
        $this->method = $method;
    }

    /**
     * api url
     *
     * @var (string)url
     */
    private $api = null;

    public function setApi($api = null)
    {
        $this->api = $api;
    }

    /**
     * GET或POST的请求参数
     *
     * @var (array)请求参数
     */
    private $data   = [];
    private $ifData = false;

    public function setData($data)
    {
        $this->ifData = true;
        $this->data = $data;
    }

    /**
     * 设置referer来源
     *
     * @var (string)referer
     */
    private $referer   = null;
    private $ifReferer = false;

    public function setReferer($referer)
    {
        $this->ifReferer = true;
        $this->referer = $referer;
    }

    /**
     * 走起
     */
    public function go()
    {
        self::valid();
        self::myCurl();
    }

    public function restPost($api, $data)
    {
        $this->setApi($api);
        $this->setData($data);
        $this->setMethod(self::METHOD_POST);
        $this->go();
        $header = $this->getHeader();
        if ($header['http_code'] == 200) {
            return json_decode($this->body, true);
        } else {
            return [];
        }
    }

    private function valid()
    {
        if ($this->api == null) {
            throw new \Exception('$this->api can not be null');
        }

        if ($this->ifData) {
            if ((is_array($this->data) && count($this->data) < 1) || (is_string($this->data) && strlen(
                        $this->data) < 1)
            ) {
                throw new \Exception('$this->data is empty');
            }

        }

        if ($this->ifReferer && (strlen($this->referer) < 1)) {
            throw new \Exception('$this->referer is empty');
        }

        if ($this->method != 'GET' && !in_array($this->method, ['POST', 'PUT', 'DELETE'])) {
            throw new \Exception('$this->method is error');
        }
    }

    private function myCurl()
    {
        $ch = curl_init();
        $timeout = 300;
        $useragent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)";
        $header = [
            'Accept-Language: zh-cn',
            'Connection: Keep-Alive',
            'Cache-Control: no-cache',
            'Content-Type: application/json;charset=utf-8',
        ];
        if (count($this->header) > 0) {
            foreach ($this->header as $key => $value) {
                if (is_string($value)) {
                    array_push($header, $key . ':' . $value);
                }
            }
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
        //curl_setopt($ch, CURLOPT_USERPWD , "$name:$pwd");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        switch ($this->method) {
            case self::METHOD_GET:
                if (is_array($this->data) && count($this->data) > 0) {
                    $this->api .= '?' . http_build_query($this->data);

                }
                curl_setopt($ch, CURLOPT_URL, $this->api);
                break;
            case self::METHOD_POST:
                if (is_array($this->data)) {
                    $this->data = http_build_query($this->data);
                }
                curl_setopt($ch, CURLOPT_URL, $this->api);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $this->data);
                break;
            case self::METHOD_PUT:
                curl_setopt($ch, CURLOPT_PUT, true);
                break;
            case self::METHOD_DELETE:
                curl_setopt($ch, CURLOPT_URL, $this->api);
                curl_setopt($ch, CURLOPT_FILETIME, true);
                curl_setopt($ch, CURLOPT_FRESH_CONNECT, false);
                curl_setopt($ch, CURLOPT_NOSIGNAL, true);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, self::METHOD_DELETE);
                break;
        }

        if ($this->ifReferer) {
            curl_setopt($ch, CURLOPT_REFERER, $this->referer);
        }

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

        if (curl_errno($ch)) {
            throw new \Exception('CURL was error');
        } else {
            $this->body = curl_exec($ch);
            $this->header = curl_getinfo($ch);
        }

        curl_close($ch);
    }

    public function ES_replace($list_uri, $api)
    {
        $uri_raw = [];
        try {
            //            $api = ConfigService::instance()->getConfig('hbase.es_replace');
            if ($api) {
                self::instance()->setApi(trim($api));
                self::instance()->setMethod('POST');
                self::instance()->setData(json_encode($list_uri));
                self::instance()->go();
                $uri_raw = self::instance()->getBody();
                $header = self::instance()->getHeader();

                if ($header['http_code'] == 200) {
                    $uri_raw = json_decode($uri_raw, true);
                } else {
                    $uri_raw = [];
                }
            }

            return $uri_raw;
        } catch (\Exception $e) {
            //            LogService::instance()->logException($e);
            return [];
        }
    }


    public function getCodeStackTree($raw_id)
    {
        $raw_id = (array)$raw_id;
        $es_host = ConfigService::instance()->getConfig('hbase.hosts');

        if (!$es_host) {
            return false;
        }

        $url = 'http://' . rtrim($es_host, '/') . '/getTrackTree';
        $key = DESHelper::instance()->encode(json_encode($raw_id));

        self::instance()->setApi($url);
        self::instance()->setMethod('POST');
        self::instance()->setData(json_encode(['id' => $key]));
        self::instance()->go();

        $header = self::instance()->getHeader();

        if (!$header || !is_array($header) || !array_key_exists('http_code', $header) || $header['http_code'] != 200) {
            $array = [
                'url'     => $url,
                'request' => [
                    'id' => $key,
                ],
            ];
            LogService::setLog('critical', 'ES_RequestTrackCodeService error', $array);
        }

        $code_tree = self::instance()->getBody();
        $code_tree = json_decode($code_tree, true);
        $code_tree = array_pop($code_tree);

        return $code_tree;
    }

    public function getExStackData($raw_id_list)
    {
        $es_host = ConfigService::instance()->getConfig('hbase.hosts');

        if (!$es_host) {
            return false;
        }
        $api = 'http://' . rtrim($es_host, '/') . '/getTrackTree';
        $data = json_encode(['id' => DESHelper::instance()->encode(json_encode($raw_id_list))]);

        self::instance()->setApi($api);
        self::instance()->setData($data);
        self::instance()->setMethod('POST');
        self::instance()->go();

        $body = self::instance()->getBody();
        $header = self::instance()->getHeader();
        if ($header['http_code'] == 200 || $header['http_code'] == 204) {
            return $body;
        } else {
            LogService::setLog('error', '获取数据失败', [$api, $data], [], 'TsbApi/hbase');

            return false;
        }
    }


}