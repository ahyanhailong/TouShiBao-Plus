<?php
/**
 * @author bear
 * Date: 17/12/13 下午2:23
 */

namespace cloudwise\tsb\datasource\helper;

use Respect\Validation\Validator;

class ValidHelper
{
    /**
     * @param $input
     *
     * @return bool
     */
    public static function validEmail($input)
    {
        return Validator::email()->validate($input);
    }

    /**
     * @param      $input
     * @param      $min
     * @param null $max
     *
     * @return bool
     */
    public static function validLength($input, $min, $max = null)
    {
        $validator = Validator::stringType()->length($min, $max);

        return $validator->validate($input);
    }

    /**
     * @param $input
     *
     * @return bool
     */
    public static function validArray($input)
    {
        $validator = Validator::arrayType();

        return $validator->validate($input);
    }

    /**
     * @param $input
     *
     * @return bool
     */
    public static function validMobile($input)
    {
        $validator = Validator::numeric()->length(11);

        return $validator->validate($input);
    }

    /**
     * @param $input
     *
     * @return int
     */
    public static function validPassword($input)
    {
        $matches = [
            '/[A-Za-z]/',  //字母
            '/[0-9]/',  //数字
            '/[~!@#$%^&*()\-_=+{};:<,.>?\/\[\]\'\"\\\|~`]/',//特殊字符
        ];
        $matched = 0;
        foreach($matches as $match){
            if (preg_match_all($match, $input, $o) > 0) {
                $matched++;
            }
        }

        return $matched > 1;
    }
}