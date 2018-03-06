<?php

/**
 * Created by PhpStorm.
 * User: dengchao
 * Date: 14-6-5
 * Time: 下午4:49
 */

namespace cloudwise\tsb\datasource\helper;


class ToolKit
{
    /**
     * 生成随机验证码
     *
     * @param int $length
     *
     * @return string
     */
    public static function mkValidatorCode($length = 6)
    {
        $string = "aAbBcCdDeEfFgGhHjJkKmMnNpPqQrRsStTxXyYzZ123456789";
        $key = '';
        for ($i = 0; $i < $length; $i++) {
            $key .= $string{mt_rand(0, strlen($string) - 1)}; //生成php随机数
        }

        return $key;
    }

    /**
     * 生成随机密码
     *
     * @param int $length
     *
     * @return string
     */
    public static function mkPassword($length = 6)
    {
        $pattern = '1234567890@#$%^&*abcdefghijklmnopqrstuvwxyz';
        $key = '';
        for ($i = 0; $i < $length; $i++) {
            $key .= $pattern{mt_rand(0, strlen($pattern) - 1)}; //生成php随机数
        }

        return $key;
    }

    /**
     * 对多维数组排序
     *
     * @param        $arr
     * @param        $keys
     * @param string $type
     *
     * @return array
     * @example
     * $arr = array(
     * array('name'=>'手机','brand'=>'诺基亚','price'=>1050),
     * array('name'=>'笔记本电脑','brand'=>'lenovo','price'=>4300)
     * ),
     * self::array_sort($arr,'price','desc')
     */
    public static function array_sort($arr, $keys, $type = 'asc')
    {
        $keysvalue = $new_array = [];
        foreach ($arr as $k => $v) {
            if (gettype($v) == "object") {
                $v = (array)$v;
            }
            if (isset($v[ $keys ])) {
                $keysvalue[ $k ] = $v[ $keys ];
            } else {
                return $arr;
            }
        }
        if ($type == 'asc') {
            asort($keysvalue);
        } else {
            arsort($keysvalue);
        }
        reset($keysvalue);
        foreach ($keysvalue as $k => $v) {
            $new_array[] = $arr[ $k ];
        }

        return $new_array;
    }

    public static function arraySort($list, $field, $sort)
    {
        usort(
            $list, function ($v1, $v2) use ($field, $sort) {
            if ($sort == 'desc') {
                if ($v1[ $field ] < $v2[ $field ]) {
                    return 1;
                }
            }
            if ($sort == 'asc') {
                if ($v1[ $field ] > $v2[ $field ]) {
                    return 1;
                }
            }
        });

        return $list;
    }


    /**
     * 获取字符串的字母和数字
     */
    public static function getLetterNum($str)
    {
        $pattern = '/[^a-zA-Z0-9]/i';
        $replacement = '';

        return preg_replace($pattern, $replacement, $str);
    }

    /**
     * 字节转换成M
     */
    public static function ByteIntoM($bytes, $median = 2)
    {
        return round($bytes / (1024 * 1024), $median);
    }

    /**
     * 字节转换成G
     */
    public static function ByteIntoG($bytes, $median = 2)
    {
        return round($bytes / (1024 * 1024 * 1024), $median);
    }

    /**
     * kb转换成G
     */
    public static function KbIntoG($bytes, $median = 2)
    {
        return round($bytes / (1024 * 1024), $median);
    }

    /**
     * 匹配字符串中包含http或Http
     */
    public static function regexHttp($str)
    {
        $regex = '/http|Http/';

        return preg_match($regex, $str);
    }

    /**
     * 制作分页列表
     *
     * @param        $current_page_num   当前页码数
     * @param        $total_num          总的页码数
     * @param string $class              每个页码的CSS class名称
     * @param int    $pagelen            显示页面个数
     *
     * @return string
     */
    public static function makePageList($current_page_num, $total_num, $class = 'page_list_class', $pagelen = 7)
    {

        //页码范围计算
        $init = 1; //起始页码数
        $max = $total_num; //结束页码数
        //            $pagelen    = 7; //要显示的页码个数
        $pagelen = ($pagelen % 2) ? $pagelen : $pagelen + 1; //页码个数
        $pageoffset = ($pagelen - 1) / 2; //页码个数左右偏移量
        //分页数大于页码个数时可以偏移
        if ($total_num > $pagelen) {
            //如果当前页小于等于左偏移
            if ($current_page_num <= $pageoffset) {
                $init = 1;
                $max = $pagelen;
            } else { //如果当前页大于左偏移
                //如果当前页码右偏移超出最大分页数
                if ($current_page_num + $pageoffset >= $total_num + 1) {
                    $init = $total_num - $pagelen + 1;
                } else {
                    //左右偏移都存在时的计算
                    $init = $current_page_num - $pageoffset;
                    $max = $current_page_num + $pageoffset;
                }
            }
        }

        $pageList = '';
        $pageList .= '<div style="margin-right:20px;">';
        $pageList .= '<ul class="pagination pull-right">';
        if ($current_page_num == 1) {
            $pageList .= '<li class="disabled"><span style="color: #B6C4C9">«</span></li>';
        } else {
            $pageList .= '<li><a href="javascript:void(0);" class="' . $class . '" page_num="' . ($current_page_num - 1) . '">«</a></li>';
        }

        for ($i = $init; $i <= $max; $i++) {
            if ($i == $current_page_num) {
                $pageList .= '<li class="active"><span>' . $current_page_num . '</span></li>';
            } else {
                $pageList .= '<li><a href="javascript:void(0);" class="' . $class . '" page_num="' . $i . '">' . $i . '</a></li>';
            }
        }
        if ($current_page_num == $total_num) {
            $pageList .= '<li class="disabled"><span style="color: #B6C4C9">»</span></li>';
        } else {
            $pageList .= '<li><a href="javascript:void(0);" class="' . $class . '" page_num="' . ($current_page_num + 1) . '">»</a></li>';
        }
        $pageList .= '</ul></div>';

        return $pageList;
    }

    static public function checkEmailFormat($email)
    {

        if (preg_match(
            "/^[a-z0-9]([a-z0-9]*[-_.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[.][a-z]{2,3}([.][a-z]{2})?$/i", $email)) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * @param $data
     *
     * @return array
     */
    static function disposeChartTableData($data)
    {
        $newData = [];
        if (!$data) {
            return $newData;
        }
        $newData['table_data'] = $data['table_data'];
        $newData['labels'] = [];
        $newData['data'] = [];
        if (array_key_exists('show_data', $data['chart_data'])) {
            $data['chart_data']['showData'] = $data['chart_data']['show_data'];
            unset($data['chart_data']['show_data']);
        }
        if (array_key_exists('showData', $data['chart_data'])) {
            if (count($data['chart_data']['showData'])) {
                foreach ($data['chart_data']['showData'] as $v) {
                    array_push($newData['labels'], $v['time']);
                    unset($v['time']);
                    foreach ($v as $k1 => $v1) {
                        $newData['data'][ $k1 ][] = $v1;
                    }
                }
            } else {
                return $newData;
            }
        }

        return $newData;
    }

    /**
     * 处理前端图表数据，以适应新的echarts数据结构
     */
    static function disposeChartData($data)
    {
        $newData = [];
        if (!$data) {
            return $newData;
        }
        if (array_key_exists('show_data', $data)) {
            $data['showData'] = $data['show_data'];
            unset($data['show_data']);
        }
        if (array_key_exists('showData', $data)) {
            if (array_key_exists('legend', $data['labels'])) {
                $newData['name'] = $data['labels']['name'];
                $newData['data'] = [];
                if (count($data['showData'])) {
                    foreach ($data['showData'] as $v) {
                        $newData['data'][ $v['name'] ] = $v['value'];
                    }
                }
            } else {
                $newData['labels'] = [];
                $newData['data'] = [];
                if (count($data['showData'])) {
                    foreach ($data['showData'] as $v) {
                        if (!isset($v['time'])) {
                            continue;
                        }
                        array_push($newData['labels'], $v['time']);
                        unset($v['time']);
                        foreach ($v as $k1 => $v1) {
                            $newData['data'][ $k1 ][] = $v1;
                        }
                    }
                }
            }
        } else {
            if (array_key_exists('mapData', $data)) {
                if (count($data['mapData']['data'])) {
                    $max = 0;
                    if (isset($data['mapData']['unit'])) {
                        $unit = $data['mapData']['unit'];
                    } else {
                        $unit = '';
                    }
                    foreach ($data['mapData']['data'] as $value) {
                        if ($value['value'] >= $max) {
                            $max = $value['value'];
                        }
                        $newData[ $value['name'] ] = $value['value'];
                    }
                    $newData['list'] = [];
                    foreach ($data['mapRightListData']['listData'] as $value) {
                        $value['value'] .= $unit;
                        array_push($newData['list'], $value);
                    }
                    //                    $newData['head_value'] = $max . $unit;
                    $newData['head_value'] = $data['mapRightListData']['areaValue'];
                }
            }
        }
        if (isset($newData['data'])) {
            $newData['data'] = self::processDataFormat($newData['data']);
        }

        return $newData;
    }


    /**
     * 处理 echarts数据接口，线状图中只有一个点有数据时 不显示的问题
     * 相邻点设置为0，保证有连接线显示
     *
     * @param $data
     *
     * @return mixed
     */
    static function processDataFormat($data)
    {
        try {
            foreach ($data as $name => $list) {
                if (!is_array($list) || !$list) {
                    return $data;
                }
                foreach ($list as $key => $item) {
                    if ($item !== '-' && $item > 0) {
                        if (isset($data[ $name ][ $key - 1 ]) && $data[ $name ][ $key - 1 ] === '-') {
                            $data[ $name ][ $key - 1 ] = 0;
                        }

                        if (isset($data[ $name ][ $key + 1 ]) && $data[ $name ][ $key + 1 ] === '-') {
                            $data[ $name ][ $key + 1 ] = 0;
                        }
                        continue;
                    }

                    if ($item !== '-' && (int)$item === 0) {
                        if (isset($data[ $name ][ $key - 1 ]) && $data[ $name ][ $key - 1 ] === '-') {
                            $data[ $name ][ $key - 1 ] = 0;
                        }
                        if ($key == 0 && isset($data[ $name ][ $key + 1 ]) && $data[ $name ][ $key + 1 ] === '-') {
                            $data[ $name ][ $key + 1 ] = 0;
                        }
                    }
                }
            }

            return $data;
        } catch (\Exception $e) {
            return $data;
        }
    }

    //mysql缓存适应新的图表数据
    public static function disposeMysqlQueryCacheData($data)
    {
        $newData = [];
        $newData['table_data'] = $data['table_data'];
        unset($data['table_data']);
        foreach ($data as $key => $tipData) {
            $newData[ $key ] = [
                'labels' => [],
                'data'   => [],
            ];
            if (count($tipData['showData'])) {
                foreach ($tipData['showData'] as $v) {
                    array_push($newData[ $key ]['labels'], $v['time']);
                    unset($v['time']);
                    foreach ($v as $k1 => $v1) {
                        $newData[ $key ]['data'][ $k1 ][] = $v1;
                    }
                }
            }
        }

        return $newData;
    }


    public static function processTopoData($data)
    {
        $data = json_decode($data, true);
        //get nodes
        $return = [];
        $nodes = [];
        $serviceInfo = [];
        $mApp = new Project_AppModel();
        foreach ($data['details'] as $detail) {
            if (count($detail)) {
                foreach ($detail as $item) {
                    $node = [];
                    $serviceNames = array_flip(ReportAppTopologyEnum::$rsServiceName);
                    if (array_key_exists(
                        $item['call_data']['data_type'], array_flip(ReportAppTopologyEnum::$rsServiceName))) {
                        $type = $serviceNames[ $item['call_data']['data_type'] ];
                    } else {
                        $type = 'curl';
                    }
                    $node['group'] = $item['call_data']['data_type'];

                    if ($item['call_data']['data_type'] == 'user') {
                        continue;
                    } else {
                        if (in_array($type, ReportAppTopologyEnum::$appTopologyLayerService['proxy_layer'])) {
                            $level = 2;
                            $node['group'] = 'nginx';
                            $node['title'] = $item['call_data']['data_type'];
                        } else {
                            if (in_array($type, ReportAppTopologyEnum::$appTopologyLayerService['web_layer'])) {
                                $mHost = new Project_HostModel();
                                $host_info = $mHost->fetchRow(
                                    [
                                        'host_id'    => $item['call_data']['host_id'],
                                        'account_id' => UserService::getUserCache()->account_id,
                                    ]);
                                $level = 2;
                                if (in_array($item['call_data']['data_type'], ['apache', 'IIS', 'tomcat'])) {
                                    $node['group'] = $item['call_data']['data_type'];
                                } else {
                                    $node['group'] = 'server';
                                }
                                //                            $node['group'] = 'tomcat';
                                $node['label'] = $item['call_data']['data_type'] . ':' . $host_info->host_name;
                            } else {
                                if (in_array($type, ReportAppTopologyEnum::$appTopologyLayerService['code_layer'])) {
                                    $level = 3;
                                    $node['title'] = ReportAppTopologyEnum::$appTopologyNameMap[ $type ]['name'];
                                    $node['group'] = 'app_normal';
                                } else {
                                    if (in_array($type, ReportAppTopologyEnum::$appTopologyLayerService['db_layer'])) {


                                        if ($type == ReportAppTopologyEnum::TOPO_CURL) {
                                            $host_info = json_decode($item['call_data']['host_id'], true);
                                            $label = $host_info['host_ip'] . ':' . $host_info['port'];
                                            $app_id = DESService::instance()->md5ToDec(md5($label));
                                            if ($mApp->exists(
                                                [
                                                    'app_id'     => $app_id,
                                                    'account_id' => UserService::getUserCache()->account_id,
                                                ])
                                            ) {
                                                $node['group'] = ReportAppTopologyEnum::GROUP_APP_NORMAL;
                                                $codeType = AppTopoService::instance()->AppTopoGetAppType(
                                                    [
                                                        'app_id'     => $app_id,
                                                        'account_id' => UserService::getUserCache()->account_id,
                                                    ]);
                                                $item['call_data']['data_type'] = ReportAppTopologyEnum::$appTopologyNameMap[ $codeType ]['data_type'];
                                                $item['call_data']['app_id'] = $app_id;
                                                $item['call_data']['service_type'] = ReportAppTopologyEnum::$appTopologyNameMap[ $codeType ]['call_data']['service_type'];
                                                if (array_key_exists(
                                                    $codeType, ReportAppTopologyEnum::$appTopologyNameMap)) {
                                                    $node['title'] = ReportAppTopologyEnum::$appTopologyNameMap[ $codeType ]['name'];
                                                } else {
                                                    LogService::instance()->setLog(
                                                        'error', '拓扑未找到类别', $item, [], 'App/appTopo');
                                                    continue;
                                                }

                                                $node['label'] = $label;
                                            } else {
                                                $node['group'] = ReportAppTopologyEnum::GROUP_THIRD_TYPE;
                                                $node['label'] = $label . $item['call_data']['uri'];
                                            }
                                        } else {
                                            $level = 4;
                                            $host_info = json_decode($item['call_data']['host_id'], true);
                                            $node['label'] = $item['name'] . ':' . $host_info['host_ip'] . ':' . $host_info['port'];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $node['level'] = $level;
                    $node['id'] = $item['link_name'];
                    array_push($nodes, $node);

                    $serviceInfo[ $item['link_name'] ] = $item['call_data'];
                }
            }
        }
        $return['nodes'] = $nodes;
        $edges = [];
        foreach ($data['relations'] as $detail) {
            array_push($edges, ['from' => $detail['start'], 'to' => $detail['end'], 'level' => 0]);
        }
        $return['edges'] = $edges;
        $return['color'] = ReportAppTopologyEnum::$groupColor;
        $return['serviceInfo'] = $serviceInfo;

        return $return;
    }

    /**
     * 将字符串转换成html实体
     */
    static public function encode_str_to_html($str)
    {
        return htmlspecialchars($str);
    }

    /**
     * 将html实体换成字符串转
     */
    static public function decode_html_to_str($str)
    {
        return htmlspecialchars_decode($str);
    }


    static public function processCodeTrack($data)
    {
        $data = json_decode($data, true);
        $return = [];
        foreach ($data['maps'] as $node => $value) {

            if (!isset($value['wt'])) {
                continue;
            }

            if ($node == '{start}') {
                continue;
            }
            if (!isset($value['pst'])) {
                $value['pst'] = '';
            }
            $time = $value['wt'];
            $childNode = self::getNode($data['tree'], $node);
            $child_node_time = 0;
            if ($childNode) {
                foreach ($childNode as $k) {
                    if (array_key_exists($k, $data['maps'])) {
                        $node_time = $data['maps'][ $k ]['wt'];
                        $time -= $node_time;
                        $child_node_time += $node_time;
                        if ($time < 0) {
                            LogService::instance()->setLog(
                                'info', 'codetree负值错误', [$data['maps']['{start}'], $value], [], 'App/getCodeTree');
                            continue 2;
                        }
                    } else {
                        LogService::instance()->setLog(
                            'error', 'codetree节点缺失错误', $data['maps']['{start}'], [], 'App/getCodeTree');
                    }
                }
            }

            $return[ $node ] = [
                'time'  => $time,
                'count' => $value['ct'],
                'mn'    => $value['mn'],
                'pst'   => $value['pst'],
            ];
        }


        //            $total_time = 0;
        //            foreach($return as $value){
        //                $total_time += $value['time'];
        //            }
        $total_time = $data['maps']['{start}']['wt'] / 1000;

        //方法合并
        $returnData = [];
        foreach ($return as $node => $value) {
            if (isset($returnData[ $value['mn'] ])) {
                $returnData[ $value['mn'] ]['time'] += $value['time'];
                $returnData[ $value['mn'] ]['count'] += $value['count'];
            } else {
                $returnData[ $value['mn'] ] = $value;
            }
        }

        uasort(
            $returnData, function ($v1, $v2) {
            if ($v1['time'] < $v2['time']) {
                return 1;
            }
        });

        foreach ($returnData as $index => $item) {
            if (isset($item['time'])) {
                $returnData[ $index ]['time'] /= 1000;
            }
        }

        $limit = Config::get('app.app_stack_limit');
        if (!$limit) {
            $limit = AppReportMenuEnum::CODE_STACK_LIMIT;
        }

        if (is_numeric($limit)) {
            $returnData = array_slice($returnData, 0, $limit);
        }


        if ($total_time) {
            foreach ($returnData as $k => $item) {
                $returnData[ $k ]['rate'] = round($returnData[ $k ]['time'] / $total_time * 100, 2);
            }
        } else {
            foreach ($returnData as $k => $item) {
                $returnData[ $k ]['rate'] = 100;
            }
        }

        return $returnData;
    }

    static public function getNode($data, $key)
    {
        //            foreach ($data as $k => $v) {
        //                if ($k == $key && is_array($v)) {
        //                    return array_keys($v);
        //                }else if(is_array($v)){
        //                    if($return = self::getNode($v, $key)){
        //                        return $return;
        //                    }
        //                }
        //            }
        //
        //            return FALSE;
        $keys = [];
        foreach ($data as $k => $v) {
            if ($k == $key && is_array($v)) {
                $keys = array_merge($keys, array_keys($v));
            } else {
                if (is_array($v)) {
                    if ($return = self::getNode($v, $key)) {
                        $keys = array_merge($keys, $return);
                    }
                }
            }
        }

        return array_unique($keys);
    }


    /**
     * 获取数组中 某一个value对应的key
     *
     * @param $array  数据
     * @param $value  某一个value
     *
     * @return bool|int|string
     */
    public static function getArrayIndex($array, $value)
    {
        if (!$array || !in_array($value, $array)) {
            return false;
        }
        foreach ($array as $key => $item) {
            if ($value == $item) {
                return $key;
            }
        }

        return false;
    }

    public function getApdex($pleased, $stand, $disappointed)
    {
        if ($pleased + $stand + $disappointed == 0) {
            return false;
        } else {
            return ($pleased + $stand / 2) / ($pleased + $stand + $disappointed);
        }
    }

    public static function strToUTF8($str)
    {
        return mb_convert_encoding($str, 'UTF8', 'UTF8');
    }

    public static function processNumberList($data, $key_list)
    {
        foreach ($key_list as $key) {
            if (array_key_exists($key, $data)) {
                $data[ $key ] = self::processNumber($data[ $key ]);
            }
        }

        return $data;
    }

    /**
     * 将数字 装换成 英文单位数字
     * 1000 => 1thousand 1000000=> 1million 1000000000 => 1billion
     *
     * @param $number
     *
     * @return float|string
     */
    public static function processNumber($number)
    {
        if ($number < 1000) {
            return $number;
        }
        if ($number < 1000000) {
            $unix = FileSizeEnum::THOUSAND;
            $number = round($number / 1000, 2);

            return $number . $unix;
        }
        if ($number < 1000000000) {
            $unix = FileSizeEnum::MILLION;
            $number = round($number / 1000000, 2);

            return $number . $unix;
        }

        return round(($number / 1000000000), 2) . FileSizeEnum::BILLION;
    }

    /**
     * 将数值  处理成 K单位数字
     * 1000 => 1k
     *
     * @param $number
     *
     * @return float|string
     */
    public static function processNumberForK($number)
    {
        if ($number < 1000) {
            return $number;
        } else {
            $unix = 'k';
            $number = round($number / 1000, 2);

            return $number . $unix;
        }
    }

    public static function formatUrl($url)
    {
        return str_replace('cw_pound', '#', $url);
        //            return str_replace('/','#',$url);
    }

    public static function getHardCodeUri($uri)
    {
        $origin = ['.', ':', '(', ')', '?', '&', '*'];
        $replace = ['\.', '\:', '\(', '\)', '\?', '\&', '.*'];

        return str_replace($origin, $replace, $uri);
    }

    public static function getHardCodeUriForDruid($uri)
    {
        $origin = ['(', ')', '*'];
        $replace = ['\\\\(', '\\\\)', '.*'];

        return str_replace($origin, $replace, $uri);
    }

    /**
     * 判断手机号码的 归属地
     *
     * @param $phone
     *
     * @return bool|string
     */
    public static function getRegionCode($phone)
    {
        $phone = ltrim($phone, '+0');
        $phone = preg_replace('/^86/', '', $phone);

        if (preg_match("/^1[34578][0-9]{9}$/", $phone)) {
            return 'CN';
        }

        $phone = preg_replace('/^886/', '', $phone);
        if (preg_match('/^9[0-9]{8}$|^09[0-9]{8}$/', $phone)) {
            return 'TW';
        }
        //            $map = CountryCodeToRegionCodeEnum::$countryCodeToRegionCodeMap;
        //            $phone = ltrim($phone,'+0');
        //            for($i = 1;$i <= 4; $i++){
        //                $code = substr($phone,0,$i);
        //                if(array_key_exists($code,$map)){
        //                    $phone_number = str_replace($code,'',$phone);
        //                    if(array_key_exists($code,CountryCodeToRegionCodeEnum::$regineRegex)){
        //                        if(!preg_match(CountryCodeToRegionCodeEnum::$regineRegex[$code],$phone_number)){
        //                            return false;
        //                        }
        //                    }
        //                    $list = $map[$code];
        //                    return array_pop($list);
        //                }
        //            }
        return false;
    }

    /**
     * 处理数据 keys
     * 通过百度翻译接口  将中文翻译成英文
     *
     * @param $data
     *
     * @return array
     */
    public static function translateToEnForLine($data)
    {
        if ($data && isset($data['data'])) {
            $data['data'] = ToolKit::processDataFormat($data['data']);
            foreach (($data['data']) as $k => $v) {
                if (App::getLocale() == LangEnum::$lang[ LangEnum::ENGLISH ]) {
                    $traslate = BaiduTranslate::translate(
                        $k, BaiduTranslateEnum::API_LANG_ZH_CN, BaiduTranslateEnum::API_LANG_EN);
                    $lang = $traslate['data'][0]['dst'];
                } else {
                    $lang = $k;
                }
                unset($data['data'][ $k ]);
                $data['data'][ $lang ] = $v;
            }
        } else {
            $data = [];
        }

        return $data;
    }

    /**
     * 将数字 处理成 会计计数
     * 11111.22 => 111,11.22
     *
     * @param $num
     *
     * @return string
     */
    public static function formatFinancialNumber($num)
    {
        if ($num) {
            $explode = explode('.', $num);
            $explodeP = str_split(strrev($explode[0]), 3);
            $implode = implode(',', $explodeP);
            $explode[0] = strrev($implode);
            $return = implode('.', $explode);

            return $return;
        } else {
            return $num;
        }
    }

    /**
     * @param         $data
     * @param Closure $callback
     * @param null    $file_path
     */
    public static function writeSelectDataIntoFile($data, \Closure $callback, $file_path = null)
    {
        $result = '';
        foreach ($data as $value) {
            $result .= $callback($value);
        }
        if (!$file_path) {
            $file_path = public_path() . '/copy_data.txt';
        }
        if ($result) {
            try {
                file_put_contents($file_path, $result, FILE_APPEND);
            } catch (Exception $e) {
                LogService::instance()->logException($e);
            }
        }
    }


    /**
     * 获取 多维数组的 维度
     *
     * @param $params
     *
     * @return int
     */
    public static function getChildDeeps($params)
    {
        $deep = 0;
        if (is_array($params)) {
            $deep += 1;
        } else {
            return $deep;
        }

        $tmp = 0;
        foreach ($params as $key => $value) {
            $deep_tmp = self::getChildDeeps($value);
            if ($deep_tmp > $tmp) {
                $tmp = $deep_tmp;
            }
        }

        return $deep + $tmp;
    }


    /**
     * 某大神写的 函数，看起来像array_merge
     *
     * @param $array1
     * @param $array2
     *
     * @return mixed
     */
    public static function array_plus($array1, $array2)
    {
        $return = $array1;
        foreach ($array2 as $key => $value) {
            $return[ $key ] = $value;
        }

        return $return;
    }

    /**
     * 获取 数据中的 堆栈
     *
     * @param $returnData
     * @param $key  指定的key
     *
     * @return mixed
     */
    public static function processStackList($returnData, $key)
    {
        if ($returnData) {
            $list = [];
            foreach ($returnData as $item) {
                if (isset($item[ $key ])) {
                    $list[] = $item[ $key ];
                }
            }
            if ($list) {
                $ex_list = DataFromHbaseService::instance()->getExStackData($list);

                foreach ($returnData as $index => $item) {
                    if (isset($ex_list[ $item[ $key ] ])) {
                        $item[ $key ] = $ex_list[ $item[ $key ] ];
                        $returnData[ $index ] = $item;
                    }
                }
            }
        }

        return $returnData;
    }


    /**
     * 秒或者毫秒时间长度 转化成 时-分-秒格式
     *
     * @param $value
     * @param $timeType   数值类型，秒s还是毫秒ms
     * @param $formatType y:年;m:月;d:天;h:时;i:分;s:秒;ms:毫秒  仅支持 formatType 从大到小 输入
     */
    public static function timeIntoDate($value, $timeType = 's', $formatType = 'y:m:d:h:i:s:ms')
    {
        $return = [];
        //都转化成ms
        switch ($timeType) {
            case 's':
                $value = $value * 1000;
                break;
            case 'ms':
                break;
        }
        if ($value) {
            $explodeType = explode(':', $formatType);
            $length = count($explodeType);
            foreach ($explodeType as $k => $v) {
                switch ($v) {
                    case 'y':
                        $y = $value / (12 * 30 * 24 * 3600 * 1000);
                        $value = $value - (12 * 30 * 24 * 3600 * 1000 * floor($y));
                        if ($k == $length - 1) {
                            if (round($y, 2)) {
                                array_push($return, round($y, 2) . Lang::get('common.year'));
                            }
                        } else {
                            if (floor($y)) {
                                array_push($return, floor($y) . Lang::get('common.year'));
                            }
                        }

                        break;
                    case 'm':
                        $m = $value / (30 * 24 * 3600 * 1000);
                        $value = $value - (30 * 24 * 3600 * 1000 * floor($m));
                        if ($k == $length - 1) {
                            if (round($m, 2)) {
                                array_push($return, round($m, 2) . Lang::get('common.month'));
                            }
                        } else {
                            if (floor($m)) {
                                array_push($return, floor($m) . Lang::get('common.month'));
                            }
                        }

                        break;
                    case 'd':
                        $d = $value / (24 * 3600 * 1000);
                        $value = $value - (24 * 3600 * 1000 * floor($d));
                        if ($k == $length - 1) {
                            if (round($d, 2)) {
                                array_push($return, round($d, 2) . Lang::get('common.day'));
                            }
                        } else {
                            if (floor($d)) {
                                array_push($return, floor($d) . Lang::get('common.day'));
                            }
                        }
                        break;
                    case 'h':
                        $h = $value / (3600 * 1000);
                        $value = $value - (3600 * 1000 * floor($h));
                        if ($k == $length - 1) {
                            if (round($h, 2)) {
                                array_push($return, round($h, 2) . Lang::get('common.hour'));
                            }
                        } else {
                            if (floor($h)) {
                                array_push($return, floor($h) . Lang::get('common.hour'));
                            }
                        }
                        break;
                    case 'i':
                        $i = $value / (60 * 1000);
                        $value = $value - (60 * 1000 * floor($i));
                        if ($k == $length - 1) {
                            if (round($i, 2)) {
                                array_push($return, round($i, 2) . Lang::get('common.minute'));
                            }
                        } else {
                            if (floor($i)) {
                                array_push($return, floor($i) . Lang::get('common.minute'));
                            }
                        }
                        break;
                    case 's':
                        $s = $value / (1000);
                        $value = $value - (1000 * floor($s));
                        if ($k == $length - 1) {
                            if (round($s, 2)) {
                                array_push($return, round($s, 2) . Lang::get('common.second'));
                            }
                        } else {
                            if (floor($s)) {
                                array_push($return, floor($s) . Lang::get('common.second'));
                            }
                        }

                        break;
                    case 'ms':
                        if (floor($value)) {
                            array_push($return, floor($value) . Lang::get('common.millisecond'));
                        }
                        break;
                }
            }

            return implode('', $return);
        } else {
            return $value;
        }
    }

    /**
     *
     * 多维数据的 多字段排序
     * $array1 = array(
     *  0=>array('id'=>8,'name'=>'Apple','age'=> 18),
     *  1=>array('id'=>8,'name'=>'Bed','age'=>17),
     *  2=>array('id'=>5,'name'=>'Cos','age'=>16),
     *  3=>array('id'=>5,'name'=>'Cos','age'=>14)
     *);
     * $arr = ToolKit::sortArrByManyField($array1,'id',SORT_ASC,'name',SORT_ASC,'age',SORT_DESC);
     */
    public static function sortArrByManyField()
    {
        $args = func_get_args();
        if (empty($args)) {
            return null;
        }
        $arr = array_shift($args);
        if (!is_array($arr)) {
            throw new Exception("第一个参数不为数组");
        }

        foreach ($args as $key => $field) {
            if (is_string($field)) {
                $temp = [];
                foreach ($arr as $index => $val) {
                    $temp[ $index ] = $val[ $field ];
                }
                $args[ $key ] = $temp;
            }
        }
        $args[] = &$arr;//引用值
        call_user_func_array('array_multisort', $args);

        return array_pop($args);
    }


    /**
     * 利用 UA 和 IP 和 time 生成 webtoken
     * 设置到缓存中，如果 submit 请求成功，删除这个key
     */
    public static function makeWebToken()
    {
        $origin = $_SERVER['HTTP_USER_AGENT'] . '-' . $_SERVER['SERVER_ADDR'] . '-' . $_SERVER['SERVER_PORT'] . '-' . $_SERVER['REMOTE_ADDR'] . time();
        $returnKey = md5($origin);
        CacheService::instance()->set($returnKey, 1);

        return $returnKey;
    }

    public static function array_usort(&$list, $sort_field, $sort_type)
    {
        usort(
            $list, function ($v1, $v2) use ($sort_field, $sort_type) {
            if (!array_key_exists($sort_field, $v1) || !array_key_exists($sort_field, $v2)) {
                return 0;
            }
            if ($sort_type == 'desc') {
                if ($v1[ $sort_field ] < $v2[ $sort_field ]) {
                    return 1;
                }
            }

            if ($sort_type == 'asc') {
                if ($v1[ $sort_field ] > $v2[ $sort_field ]) {
                    return 1;
                }
            }
        });
    }

}