<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/31
 * Time: 下午6:10
 */

namespace cloudwise\tsb\datasource\constants;


class RouterEnum
{
    const FIELD_NAME_CONTROLLER = 'controller';
    const FIELD_NAME_ACTION = 'action';
    const FIELD_NAME_PARAMS = 'params';

    const FIELD_NAME_VALID_EMAIL = 'email';
    const FIELD_NAME_VALID_DEFAULT = 'default';

    const ACCOUNT = 'account';
    const ACCOUNT_USER = 'user';
    const ACCOUNT_USER_REGISTER = 'register';//注册用户
    const ACCOUNT_USER_REGISTER_REMOTE = 'registerRemote';//多机房注册
    const ACCOUNT_USER_ACTIVATE = 'activate';//激活
    const ACCOUNT_USER_LOGIN = 'login';//登录
    const ACCOUNT_USER_GET_LOGIN_SIGN = 'getLoginSign';//获取远程机房登录的签名
    const ACCOUNT_USER_LOGIN_BY_SIGN = 'loginBySign';//使用签名登录
    const ACCOUNT_USER_IS_LOGIN = 'isLogin';//验证登录状态
    const ACCOUNT_USER_LOGOUT = 'logout';//退出登录

    const APP = 'app';
    const APP_WEB = 'web';
    const APP_WEB_LIST = 'list';
    const APP_WEB_LIST_APP_LIST = 'appList';//应用列表,包含聚合数据
    const APP_WEB_LIST_APP_UPDATE = 'appUpdate';//应用名称修改
    const APP_WEB_LIST_APP_HOST_DATA = 'appHostData';//应用关联的主机数据
    const APP_WEB_LIST_APP_STATUS = 'appStatus';//应用健康状态
    const APP_WEB_LIST_APP_SWITCH_CHANGE = 'appSwitchChange';//应用切换开关状态
    const APP_WEB_LIST_APP_SWITCH_BATCH_CHANGE = 'appSwitchBatchChange';//批量切换开关状态
    const APP_WEB_LIST_APP_GROUP_ADD = 'appGroupAdd';//应用分组添加
    const APP_WEB_LIST_APP_GROUP_LIST = 'appGroupList';//应用分组列表
    const APP_WEB_LIST_APP_GROUP_UPDATE = 'appGroupUpdate';//应用分组名称更新
    const APP_WEB_LIST_APP_GROUP_DELETE = 'appGroupDelete';//应用分组删除
    const APP_WEB_LIST_APP_GROUP_ADD_APP = 'appGroupAddApp';//应用分组添加应用

    const APP_WEB_OVERVIEW = 'overview';
    const APP_WEB_OVERVIEW_APP_FILTER_LIST = 'appFilterList';//应用列表,包含分组信息
    const APP_WEB_OVERVIEW_APP_TOPO = 'appTopo';//应用拓扑结构信息
    const APP_WEB_OVERVIEW_APP_TOPO_POSITION = 'appTopoPosition';//应用拓扑位置信息
    const APP_WEB_OVERVIEW_APP_NODE_INFO = 'appTopoNodeInfo';//应用拓扑节点弹窗
    const APP_WEB_OVERVIEW_APP_REQUEST_ANALYSIS = 'appRequestAnalysis';//应用请求统计信息
    const APP_WEB_OVERVIEW_APP_REQUEST_LINE_TREND = 'appRequestLineTrend';//应用请求趋势图
    const APP_WEB_OVERVIEW_APP_TIME_LINE_TREND = 'appTimeLineTrend';//应用响应时间趋势图
    const APP_WEB_OVERVIEW_APP_ERROR_LINE_TREND = 'appErrorLineTrend';//应用响应时间趋势图

    const APP_WEB_DATABASE = 'db';//数据库模块API配置枚举
    const APP_WEB_DATABASE_FILTER = 'filter';//数据库过滤
    const APP_WEB_DATABASE_FILTER_INSTANCE_LIST = 'instanceList';//主机实例列表
    const APP_WEB_DATABASE_FILTER_DB_TYPE_LIST = 'DBTypeList';//数据库类型列表
    const APP_WEB_DATABASE_FILTER_TABLE_LIST = 'tableList';//数据表列表
    const APP_WEB_DATABASE_FILTER_PST_LIST = 'pstList';//操作命令列表
    const APP_WEB_DATABASE_FILTER_URI_LIST = 'uriList';//调用者列表
    const APP_WEB_DATABASE_TIME = 'time';//数据库时间页
    const APP_WEB_DATABASE_TIME_RPM_TREND = 'timeAndRpmTrend';//响应时间与吞吐率趋势图
    const APP_WEB_DATABASE_TIME_DISTRIBUTION_TREND = 'timeDistributionTrend';//时间分布图
    const APP_WEB_DATABASE_TIME_SQL_LIST = 'sqlList';//SQL统计列表
    const APP_WEB_DATABASE_TIME_URI_RATE = 'uriRate';//按照Uri统计耗时占比
    const APP_WEB_DATABASE_TIME_SQL_SNAP_LIST = 'sqlSnapList';//SQL快照列表
    const APP_WEB_DATABASE_TIME_SQL_SNAP_DETAIL = 'sqlSnapDetail';//SQL快照详情
    const APP_WEB_DATABASE_ERROR = 'error';//数据库错误页
    const APP_WEB_DATABASE_ERROR_TREND = 'errorTrend';//错误趋势图
    const APP_WEB_DATABASE_ERROR_SQL_LIST = 'sqlList';//SQL统计列表
    const APP_WEB_DATABASE_ERROR_URI_RATE = 'uriRate';//按照Uri统计耗时占比
    const APP_WEB_DATABASE_ERROR_SQL_SNAP_LIST = 'sqlSnapList';//SQL错误快照列表
    const APP_WEB_DATABASE_ERROR_SQL_SNAP_DETAIL = 'sqlSnapDetail';//SQL错误快照列表

    /**
     * 路由配置
     *
     * @var array
     */
    public static $router = [
        //关于账号的路由
        self::ACCOUNT => [
            //关于用户的路由
            self::ACCOUNT_USER => [
                //用户登录
                self::ACCOUNT_USER_LOGIN           => [
                    self::FIELD_NAME_CONTROLLER => 'user',
                    self::FIELD_NAME_ACTION     => 'login',
                    self::FIELD_NAME_PARAMS     => [
                        'email' => [self::FIELD_NAME_VALID_EMAIL => '邮件格式错误'],
                        'pw'    => [self::FIELD_NAME_VALID_DEFAULT => 123456],
                    ],
                ],
                //用户注册
                self::ACCOUNT_USER_REGISTER        => [
                    self::FIELD_NAME_CONTROLLER => 'user',
                    self::FIELD_NAME_ACTION     => 'register',
                    self::FIELD_NAME_PARAMS     => [
                        'company_name' => '',
                        'company_url'  => '',
                        'user_name'    => '',
                        'user_email'   => [
                            'email' => '邮件格式错误',
                        ],
                        'user_mobile'  => [
                            'phone' => '手机号格式错误',
                        ],
                    ],
                ],
                //用户远程注册
                self::ACCOUNT_USER_REGISTER_REMOTE => [
                    self::FIELD_NAME_CONTROLLER => 'user',
                    self::FIELD_NAME_ACTION     => 'registerRemote',
                    self::FIELD_NAME_PARAMS     => [
                        'accessToken' => '',
                    ],
                ],
                //获取认证签名
                self::ACCOUNT_USER_GET_LOGIN_SIGN  => [
                    self::FIELD_NAME_CONTROLLER => 'user',
                    self::FIELD_NAME_ACTION     => 'getLoginSign',
                    self::FIELD_NAME_PARAMS     => [
                        'accessToken' => '',
                    ],
                ],
                //使用认证签名登录
                self::ACCOUNT_USER_LOGIN_BY_SIGN   => [
                    self::FIELD_NAME_CONTROLLER => 'user',
                    self::FIELD_NAME_ACTION     => 'loginBySign',
                    self::FIELD_NAME_PARAMS     => [
                        'sign' => '',
                    ],
                ],
                //查看登录状态
                self::ACCOUNT_USER_IS_LOGIN        => [
                    self::FIELD_NAME_CONTROLLER => 'user',
                    self::FIELD_NAME_ACTION     => 'isLogin',
                    self::FIELD_NAME_PARAMS     => [],
                ],
                //用户退出
                self::ACCOUNT_USER_LOGOUT          => [
                    self::FIELD_NAME_CONTROLLER => 'user',
                    self::FIELD_NAME_ACTION     => 'logout',
                    self::FIELD_NAME_PARAMS     => [],
                ],
            ],
        ],
        self::APP     => [
            self::APP_WEB => [
                self::APP_WEB_DATABASE => [
                    self::APP_WEB_DATABASE_FILTER => [
                        self::APP_WEB_DATABASE_FILTER_DB_TYPE_LIST  => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_FILTER_INSTANCE_LIST => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_FILTER_PST_LIST      => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_FILTER_TABLE_LIST    => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_FILTER_URI_LIST      => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                    ],
                    self::APP_WEB_DATABASE_TIME   => [
                        self::APP_WEB_DATABASE_TIME_RPM_TREND          => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_TIME_DISTRIBUTION_TREND => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_TIME_SQL_LIST           => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_TIME_SQL_SNAP_DETAIL    => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_TIME_SQL_SNAP_LIST      => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_TIME_URI_RATE           => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                    ],
                    self::APP_WEB_DATABASE_ERROR  => [
                        self::APP_WEB_DATABASE_ERROR_SQL_LIST        => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_ERROR_SQL_SNAP_DETAIL => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_ERROR_SQL_SNAP_LIST   => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_ERROR_TREND           => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                        self::APP_WEB_DATABASE_ERROR_URI_RATE        => [
                            self::FIELD_NAME_CONTROLLER => '',
                            self::FIELD_NAME_ACTION     => '',
                            self::FIELD_NAME_PARAMS     => [],
                        ],
                    ],
                ],
            ],
        ],
    ];

    /**
     * 获取路由所需参数
     *
     * @param $uri
     *
     * @return mixed
     */
    public static function getValid($uri)
    {
        $uri = explode('/', $uri);
        $params = self::$router;
        for ($i = 0; $i < count($uri); $i++) {
            if (array_key_exists($uri[ $i ], $params)) {
                $params = $params[ $uri[ $i ] ];
            }
        }

        return $params['params'];
    }
}