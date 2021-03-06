<?php

namespace App\library\Service;

use cloudwise\tsb\datasource\base\LogService;
use cloudwise\tsb\datasource\constants\ErrorCodeEnum;

/**
 * REST
 *
 * @author Neeke.Gao
 *
 * demo
 *        $this->rest = RESTService::instance();
 *        $this->rest->method('POST');
 *        $this->rest->oParamsValide()->setParamsMustMap(array('user','pwd'));
 *        $this->rest->oParamsValide()->ckParamsMustMap($requestParams);
 *
 *        $this->data = do_some_service();
 *
 *        if ($this->data == FALSE) {
 *            $this->rest->error(NULL,ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_DB);
 *        }
 *
 *        $this->rest->success($this->data);
 *
 *
 *
 */
class RESTService
{
    private $format = 'JSON';

    private $haveCheckedMethod = false;
    private $method_           = 'GET';
    private $checkMethod       = false;
    private $data              = [];
    private $xml_data          = '';
    private $status            = 0;
    private $msg               = null;

    private static $status_msgs = null;

    /**
     * @var RESTService
     */
    private static $self = null;

    /**
     * @static
     * @return RESTService
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self;
        }

        return self::$self;
    }

    protected function __construct()
    {

    }


    /**
     * 设置method,同时检测
     *
     * @param string $method
     */
    public function method($method = 'GET')
    {
        $method = strtoupper($method);
        if ($method !== 'GET') {
            $this->method_ = $method;
        }

        $this->checkMethod = true;

        self::checkMethod();
    }

    /**
     * 成功执行
     *
     * @param array||bollen  $data
     * @param int    $status
     * @param string $msg
     */
    public function success($data = null, $status = ErrorCodeEnum::STATUS_SUCCESS, $msg = null)
    {
        if ($status == '') {
            $status = ErrorCodeEnum::STATUS_SUCCESS;
        }
        self::baseResponse($data, $status, $msg);
    }

    /**
     * 出现错误
     *
     * @param null  $msg
     * @param int   $status
     * @param array $data
     */
    public function error($msg = null, $status = ErrorCodeEnum::STATUS_ERROR, $data = [])
    {
        self::baseResponse($data, $status, $msg);
    }

    /**
     * 检查method是否正确
     */
    private function checkMethod()
    {
        if (!$this->checkMethod) {
            return true;
        }

        $method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
        if ($this->haveCheckedMethod == false && $method != $this->method_) {
            $this->haveCheckedMethod = true;
            self::error('', ErrorCodeEnum::STATUS_ERROR_METHOD);
        }
    }


    private function baseResponse($data, $status, $msg)
    {
        self::checkMethod();
        $this->data = $data;
        $this->status = (int)$status;
        $this->msg = (string)(($msg == null && isset(self::$status_msgs[ $status ])) ? self::$status_msgs[ $status ] : $msg);
        unset($data);
        self::mkheader();
        self::mkdata();
    }

    /**
     * 设置返回资源类型
     */
    private function mkheader()
    {
        switch ($this->format) {
            case 'JSON':
                $header = 'application/json';
                break;
            case 'XML':
                $header = 'application/xml';
                break;
            default:
                $header = 'application/json';
        }

        header("Content-type: $header");
    }

    /**
     *　依资源类型,加工返回数据
     */
    private function mkdata()
    {
        switch ($this->format) {
            case 'JSON':
                self::byJson();
                break;
            case 'XML':
                self::byXml();
                break;
            default:
                self::byJson();
        }
    }

    private function byJson()
    {
        echo json_encode(
            [
                'code' => $this->status,
                'msg'  => $this->msg,
                'data' => $this->data,
            ]);
        die;
    }

    private function byXml()
    {
        $this->xml_data = "<?xml version='1.0' encoding='utf-8'?>";
        $this->xml_data = '<xml>';
        $this->xml_data .= "<code>{$this->status}</code>";
        $this->xml_data .= "<msg>{$this->msg}</msg>";
        $this->xml_data .= '<data>';

        $this->xml_data .= self::toXml($this->data);

        $this->xml_data .= '</data>';
        $this->xml_data .= '</xml>';
        echo $this->xml_data;
        die;
    }

    private function toXml($data)
    {
        $xml = '';
        if (!is_array($data)) {
            return $data;
        } else {
            foreach ($data as $key => $value) {
                $xml .= "<$key>";
                if (is_array($value)) {
                    self::toXml($value);
                } else {
                    $xml .= "$value";
                }
                $xml .= "</$key>";
            }

            return $xml;
        }

    }


    /**
     * @param $return
     */
    public function checkError(array $return)
    {
        $init = [
            'msg'  => '',
            'code' => ErrorCodeEnum::STATUS_SUCCESS,
            'data' => '',
        ];
        $return = array_merge($init, $return);
        if (isset($return['code']) && $return['code'] != ErrorCodeEnum::STATUS_SUCCESS) {
            self::instance()->error($return['msg'], $return['code'], $return['data']);
        }
    }

    /**
     * @param $return
     */
    public function checkReturn($return)
    {
        $init = [
            'msg'  => '',
            'code' => ErrorCodeEnum::STATUS_SUCCESS,
            'data' => '',
        ];

        if (is_array($return)) {
            $return = array_merge($init, $return);
        } else {
            $return['data'] = $return;
        }

        self::instance()->success($return['data'], $return['code'], $return['msg']);
    }

    /**
     * @param \Exception $e
     */
    public function checkException(\Exception $e)
    {
        LogService::logException($e);

        self::instance()->error($e->getMessage(), $e->getCode());
    }
}