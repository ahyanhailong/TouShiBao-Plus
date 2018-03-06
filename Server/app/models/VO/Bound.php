<?php
namespace App\models\VO;

/**
 * VO.
 *
 * @author Neeke.Gao
 * Date: 14-5-14 下午5:07
 */
class Bound
{
    /**
     * @param array  $aParams
     * @param Common $oVO
     *
     * @return Common $oVO
     */
    public static function Bound(array $aParams, Common $oVO)
    {
        if (count($aParams) < 1) {
            return $oVO;
        }

        //没有进行 $oVO限定参数的 过滤
        foreach ($aParams as $key => $val) {
            $oVO->$key = $val;
        }

        return $oVO;
    }
}
