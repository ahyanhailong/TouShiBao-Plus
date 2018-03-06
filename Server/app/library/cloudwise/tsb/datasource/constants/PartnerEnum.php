<?php
namespace cloudwise\tsb\datasource\constants;

/**
 * Created by PhpStorm.
 * User: admin-chen
 * Date: 15-2-6
 * Time: 下午3:06.
 */
class PartnerEnum
{
    //channel的配置
    const CLOUDWISE = 1; //cloudwise

    const QINGYUN = 2;  //青云

    const JKB = 3;    //监控宝

    const CAS = 4;  //CAS 统一登陆用户

    const YCB = 5;  //压测宝

    const ZXY = 6;  //中信云

    /**
     * 合作伙伴对应的模板
     */
    public static $partnerMasterTpl = [
        self::QINGYUN => 'layouts.partner.qingyun.master',
        self::CAS     => 'layouts.casInfo.master',
    ];
    /**
     * 隐藏用户管理的合作伙伴.
     */
    public static $partnerHideUserCenter = [
        self::QINGYUN,
    ];

    public static $app_passport = [
        self::JKB => '666666',
        self::YCB => '999999',
        self::CAS => '111111',
        self::ZXY => '0d5a7ffbe8665dff68e1f48eaae76c54',
    ];
}
