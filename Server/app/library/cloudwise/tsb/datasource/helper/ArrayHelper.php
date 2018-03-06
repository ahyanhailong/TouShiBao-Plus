<?php
namespace cloudwise\tsb\datasource\helper;

/**
 * Class ArrayHelper
 *
 * @package cloudwise\tsb\helper
 */
class ArrayHelper
{
    /**
     * 获取方法执行路径
     *
     * @param $result
     * @param $tree
     * @param $node
     *
     * @return bool
     */
    public static function getTreeRoute(&$result, $tree, $node)
    {
        foreach ($tree as $index => $value) {
            $result[ $index ] = [];
            if ($index == $node) {
                break;
            }
            if ($value) {
                $data = &$result[ $index ];
                if (self::getTreeRoute($data, $value, $node)) {
                    break;
                }
            }
            unset($result[ $index ]);
        }

        return (bool)$result;
    }

    /**
     * 将数组的所有key整理为一维索引数组
     *
     * @param $return
     * @param $result
     */
    public static function getKeyList(&$return, $result)
    {
        foreach ($result as $key => $value) {
            $return[] = $key;
            if ($value) {
                self::getKeyList($return, $value);
            }
        }
    }

    /**
     * 多维度排序
     *
     * @param              $aList
     * @param array|string $aOrder
     * @param              $sSort
     * @param              $aOrderWeight
     */
    public static function sortByUser(&$aList, $aOrder, $sSort, $aOrderWeight = [])
    {
        if ($aOrderWeight) {
            foreach ($aList as $index => $item) {
                if (array_key_exists($item[ $aOrder ], $aOrderWeight)) {
                    $aList[ $index ]['value'] = $aOrderWeight[ $item[ $aOrder ] ];
                } else {
                    if (is_numeric($item[ $aOrder ])) {
                        $aList[ $index ]['value'] = $item[ $aOrder ];
                    } else {
                        $aList[ $index ]['value'] = -1;
                    }
                }
            }
            $aOrder = 'value';
        }
        $aOrder = (array)$aOrder;
        uasort(
            $aList, function ($pre, $next) use ($aOrder, $sSort) {
            if ($sSort == 'desc') {
                foreach ($aOrder as $sOrder) {
                    if ($pre[ $sOrder ] < $next[ $sOrder ]) {
                        return 1;
                    } else {
                        if ($pre[ $sOrder ] > $next[ $sOrder ]) {
                            break;
                        }
                    }
                }
            }

            if ($sSort == 'asc') {
                foreach ($aOrder as $sOrder) {
                    if ($pre[ $sOrder ] > $next[ $sOrder ]) {
                        return 1;
                    } else {
                        if ($pre[ $sOrder ] < $next[ $sOrder ]) {
                            break;
                        }
                    }
                }
            }
        });

        if ($aOrderWeight) {
            foreach ($aList as $index => $item) {
                if (isset($aList[ $index ]['value'])) {
                    unset($aList[ $index ]['value']);
                }
            }
        }
    }

    /**
     * 对数组中的指定字段的值进行替换
     *
     * @param $aOrigin
     * @param $field
     * @param $aReplace
     * @param $callable
     *
     * @return void
     */
    public static function replaceDataValue(&$aOrigin, $field, $aReplace, $callable = '')
    {
        foreach ($aOrigin as $key => $item) {
            if (array_key_exists($field, $item)) {
                $originValue = $item[ $field ];
                if (is_callable($callable) && $value = $callable($originValue)) {
                    $originValue = $value;
                    if (array_key_exists($originValue, $aReplace)) {
                        $aOrigin[ $key ][ $field ] = $aReplace[ $originValue ];
                    }
                } else {
                    if (array_key_exists($originValue, $aReplace)) {
                        $aOrigin[ $key ][ $field ] = $aReplace[ $originValue ];
                    }
                }
            }
        }
    }


    /**
     * 获取二维数组中的某个字段,生成新的数组
     *
     * @param        $data
     * @param        $field
     * @param string $callable
     *
     * @return array
     */
    public static function extractFromArray($data, $field, $callable = '')
    {
        $return = [];
        foreach ($data as $item) {
            $item = (array)$item;
            if (array_key_exists($field, $item)) {
                if (is_callable($callable)) {
                    if ($value = $callable($item[ $field ])) {
                        $return[] = $value;
                    }
                } else {
                    $return[] = $item[ $field ];
                }
            }
        }

        return $return;
    }

    /**
     * 数组合并
     *
     * @param $array1
     * @param $array2
     *
     * @return mixed
     */
    public static function array_add($array1, $array2)
    {
        foreach ($array2 as $item) {
            if (!array_key_exists($item['id'], $array1)) {
                if (is_numeric($item['id'])) {
                    $item['id'] = (string)$item['id'];
                }
                $array1[ $item['id'] ] = $item;
            }
        }

        return $array1;
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
     * 获取数组中指定key的值,当key不存在时指定默认值
     *
     * @param $array
     * @param $key
     * @param $default
     *
     * @return mixed
     */
    public static function extractValueFromArray($key, $array, $default = null)
    {
        if (is_array($key) && count($key) == 3) {
            $key = array_values($key);
            $key = self::extractValueFromArray($key[0], $key[1], $key[2]);
        }
        if (array_key_exists($key, $array)) {
            return $array[ $key ];
        }

        return $default;
    }

    /**
     * 使用第二个数组的值覆盖第一个数组中的值
     *
     * @param $array1
     * @param $array2
     *
     * @return mixed
     */
    public static function mergeArray($array1, $array2)
    {
        $return = $array1;
        foreach ($array2 as $index => $item) {
            if (array_key_exists($index, $array1)) {
                if (is_array($array1[ $index ]) && is_array($array2[ $index ])) {
                    $return[ $index ] = self::mergeArray($array1[ $index ], $array2[ $index ]);
                } else {
                    $return[ $index ] = $array2[ $index ];
                }
            } else {
                $return[ $index ] = $item;
            }
        }

        return $return;
    }

    public static function objToArray($input)
    {
        if(is_object($input)){
            $input = (array)$input;
        }

        foreach($input as $index=>$item){
            if(is_object($item)){
                $input[$index] = self::objToArray($item);
            }
        }

        return $input;
    }
}