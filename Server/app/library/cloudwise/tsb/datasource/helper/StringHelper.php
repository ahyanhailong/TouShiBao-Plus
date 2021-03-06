<?php

namespace cloudwise\tsb\datasource\helper;


class StringHelper
{
    /**
     * Returns the number of bytes in the given string.
     * This method ensures the string is treated as a byte array by using `mb_strlen()`.
     *
     * @param string $string the string being measured for length
     *
     * @return int the number of bytes in the given string.
     */
    public static function byteLength($string)
    {
        return mb_strlen($string, '8bit');
    }

    /**
     * Returns the portion of string specified by the start and length parameters.
     * This method ensures the string is treated as a byte array by using `mb_substr()`.
     *
     * @param string $string the input string. Must be one character or longer.
     * @param int    $start  the starting position
     * @param int    $length the desired portion length. If not specified or `null`, there will be
     *                       no limit on length i.e. the output will be until the end of the string.
     *
     * @return string the extracted part of string, or FALSE on failure or an empty string.
     * @see http://www.php.net/manual/en/function.substr.php
     */
    public static function byteSubstr($string, $start, $length = null)
    {
        return mb_substr($string, $start, $length === null ? mb_strlen($string, '8bit') : $length, '8bit');
    }

    /**
     * Returns the trailing name component of a path.
     * This method is similar to the php function `basename()` except that it will
     * treat both \ and / as directory separators, independent of the operating system.
     * This method was mainly created to work on php namespaces. When working with real
     * file paths, php's `basename()` should work fine for you.
     * Note: this method is not aware of the actual filesystem, or path components such as "..".
     *
     * @param string $path   A path string.
     * @param string $suffix If the name component ends in suffix this will also be cut off.
     *
     * @return string the trailing name component of the given path.
     * @see http://www.php.net/manual/en/function.basename.php
     */
    public static function basename($path, $suffix = '')
    {
        if (($len = mb_strlen($suffix)) > 0 && mb_substr($path, -$len) === $suffix) {
            $path = mb_substr($path, 0, -$len);
        }
        $path = rtrim(str_replace('\\', '/', $path), '/\\');
        if (($pos = mb_strrpos($path, '/')) !== false) {
            return mb_substr($path, $pos + 1);
        }

        return $path;
    }

    /**
     * Returns parent directory's path.
     * This method is similar to `dirname()` except that it will treat
     * both \ and / as directory separators, independent of the operating system.
     *
     * @param string $path A path string.
     *
     * @return string the parent directory's path.
     * @see http://www.php.net/manual/en/function.basename.php
     */
    public static function dirname($path)
    {
        $pos = mb_strrpos(str_replace('\\', '/', $path), '/');
        if ($pos !== false) {
            return mb_substr($path, 0, $pos);
        }

        return '';
    }

    /**
     * Explodes string into array, optionally trims values and skips empty ones.
     *
     * @param string $string    String to be exploded.
     * @param string $delimiter Delimiter. Default is ','.
     * @param mixed  $trim      Whether to trim each element. Can be:
     *                          - boolean - to trim normally;
     *                          - string - custom characters to trim. Will be passed as a second argument to `trim()`
     *                          function.
     *                          - callable - will be called for each value instead of trim. Takes the only argument -
     *                          value.
     * @param bool   $skipEmpty Whether to skip empty strings between delimiters. Default is false.
     *
     * @return array
     * @since 2.0.4
     */
    public static function explode($string, $delimiter = ',', $trim = true, $skipEmpty = false)
    {
        $result = explode($delimiter, $string);
        if ($trim) {
            if ($trim === true) {
                $trim = 'trim';
            } elseif (!is_callable($trim)) {
                $trim = function ($v) use ($trim) {
                    return trim($v, $trim);
                };
            }
            $result = array_map($trim, $result);
        }
        if ($skipEmpty) {
            // Wrapped with array_values to make array keys sequential after empty values removing
            $result = array_values(
                array_filter(
                    $result, function ($value) {
                    return $value !== '';
                }));
        }

        return $result;
    }

    /**
     * Counts words in a string.
     *
     * @since 2.0.8
     *
     * @param string $string
     *
     * @return int
     */
    public static function countWords($string)
    {
        return count(preg_split('/\s+/u', $string, null, PREG_SPLIT_NO_EMPTY));
    }

    /**
     * Returns string representation of number value with replaced commas to dots, if decimal point
     * of current locale is comma.
     *
     * @param int|float|string $value
     *
     * @return string
     * @since 2.0.11
     */
    public static function normalizeNumber($value)
    {
        $value = "$value";

        $localeInfo = localeconv();
        $decimalSeparator = isset($localeInfo['decimal_point']) ? $localeInfo['decimal_point'] : null;

        if ($decimalSeparator !== null && $decimalSeparator !== '.') {
            $value = str_replace($decimalSeparator, '.', $value);
        }

        return $value;
    }

    /**
     * Encodes string into "Base 64 Encoding with URL and Filename Safe Alphabet" (RFC 4648).
     *
     * > Note: Base 64 padding `=` may be at the end of the returned string.
     * > `=` is not transparent to URL encoding.
     *
     * @see   https://tools.ietf.org/html/rfc4648#page-7
     *
     * @param string $input the string to encode.
     *
     * @return string encoded string.
     * @since 2.0.12
     */
    public static function base64UrlEncode($input)
    {
        return strtr(base64_encode($input), '+/', '-_');
    }

    /**
     * Decodes "Base 64 Encoding with URL and Filename Safe Alphabet" (RFC 4648).
     *
     * @see   https://tools.ietf.org/html/rfc4648#page-7
     *
     * @param string $input encoded string.
     *
     * @return string decoded string.
     * @since 2.0.12
     */
    public static function base64UrlDecode($input)
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }

    /**
     * Safely casts a float to string independent of the current locale.
     *
     * The decimal separator will always be `.`.
     *
     * @param float|int $number a floating point number or integer.
     *
     * @return string the string representation of the number.
     * @since 2.0.13
     */
    public static function floatToString($number)
    {
        // . and , are the only decimal separators known in ICU data,
        // so its safe to call str_replace here
        return str_replace(',', '.', (string)$number);
    }

    /**
     * 生成随机字符
     * @param int    $length
     * @param string $level
     *
     * @return string
     */
    public static function mkRandomChar($length = 6, $level = 3)
    {
        $char_list = [
            '1'=>'1234567890',
            '2'=>'abcdefghijklmnopqrstuvwxyz',
            '3'=>'1234567890@#$%^&*abcdefghijklmnopqrstuvwxyz',
        ];
        if(array_key_exists($level, $char_list)){
            $pattern = $char_list[$level];
        }else{
            $pattern = '1234567890@#$%^&*abcdefghijklmnopqrstuvwxyz';
        }
        $key = '';
        for ($i = 0; $i < $length; $i++) {
            $key .= $pattern{mt_rand(0, strlen($pattern) - 1)}; //生成php随机数
        }

        return $key;
    }

    /**
     * 判断手机号码的国家代码归属地
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

        return false;
    }

    /**
     * @param $string
     * @param $split
     *
     * @return array
     */
    public static function getCamelCaseParams($string, $split = '_')
    {
        $return = [];
        $aItemParams = explode($split, $string);
        foreach ($aItemParams as $segment) {
            $return[] = ucfirst($segment);
        }

        return implode('', $return);
    }

    public static function makeClippingValue($str){
        if($str && strlen($str) >= 20){
            $str = '#'.strtoupper( substr(md5($str ),8 ,16) );
        }

        return $str;
    }

}