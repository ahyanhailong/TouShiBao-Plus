/**
 * Created by mark on 2017/5/18.
 */
/* 添加认证服务 */
// MyApp.factory('httpResponseChecker', function ($q) {
//     var interceptor = {
//         'response': function (response) {
//             if (response.data.code && (response.data.code == 10010 || response.data.code == 10006 || response.data.code == 10007)) {
//                 //console.log(response.data.code)
//                 window.location.href = '/users/login';
//             }
//             return response;
//         }
//     };
//     return interceptor;
// });
/* 定义路由控制器*/
MyApp.config(['$locationProvider', '$httpProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$stateProvider', '$urlRouterProvider', routeFn]);
function routeFn($locationProvider, $httpProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $stateProvider, $urlRouterProvider) {
    // $httpProvider.interceptors.push('httpResponseChecker');
    /* 重新修改配置，实现路由懒加载*/
    MyApp.controller = $controllerProvider.register;
    MyApp.directive = $compileProvider.directive;
    MyApp.filter = $filterProvider.register;
    MyApp.factory = $provide.factory;
    MyApp.service = $provide.service;
    MyApp.constant = $provide.constant;
    MyApp.value = $provide.value;
    /* 路由重定向*/
    $urlRouterProvider.otherwise("/navigation/applyListdefault/applyList");
    /* 默认跳转到任务管理综合视图*/
    // $urlRouterProvider.when("/taskmanagement", "/taskmanagement/comprehensive");

    /* 路由状态*/
    $stateProvider
        .state('navigation', {
            /* 监控概览路由*/
            url: "/navigation",
            controller: 'navigation',
            templateUrl: './public/components/Navigation/Navigation.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/Navigation/Navigation.css', './public/components/Navigation/Navigation.js']
                    );
                }]
            }
        })
        .state('navigation.apply', {
            /* 监控概览路由*/
            url: "/apply",
            controller: 'apply',
            templateUrl: './public/components/apply/apply.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/apply.css', './public/components/apply/apply.js']
                    );
                }]
            }
        }).state('navigation.apply.database', {
            /* 监控概览路由*/
            url: "/database",
            controller: 'database',
            templateUrl: './public/components/apply/database/database.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/database/database.css', './public/components/apply/database/database.js']
                    );
                }]
            }
        }).state('navigation.apply.database.timeanalysis', {
            /* 监控概览路由*/
            url: "/timeanalysis",
            controller: 'timeanalysis',
            templateUrl: './public/components/apply/database/timeanalysis/timeanalysis.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/database/timeanalysis/timeanalysis.css',
                            './public/components/apply/database/timeanalysis/timeanalysis.js',
                            './public/components/apply/database/timeanalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.database.timeanalyFirst', {
            /* 监控概览路由*/
            url: "/timeanalyFirst/:app_id",
            controller: 'timeanalyFirst',
            templateUrl: './public/components/apply/database/timeanalysis/timeanalyFirst/timeanalyFirst.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/timeanalysis/timeanalyFirst/timeanalyFirst.js',
                            './public/components/apply/database/timeanalysis/timeanalyFirst/timeanalyFirst.css',
                            './public/components/apply/database/timeanalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.database.timeanalySecond', {
            /* 监控概览路由*/
            url: "/timeanalySecond/:app_id/:sql",
            controller: 'timeanalySecond',
            templateUrl: './public/components/apply/database/timeanalysis/timeanalySecond/timeanalySecond.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/database/timeanalysis/timeanalysis.css',
                            './public/components/apply/database/timeanalysis/timeanalySecond/timeanalySecond.js',
                            './public/components/apply/database/timeanalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.database.erroranalysis', {
            /* 监控概览路由*/
            url: "/erroranalysis",
            controller: 'erroranalysis',
            templateUrl: './public/components/apply/database/erroranalysis/erroranalysis.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/database/erroranalysis/erroranalysis.css',
                            './public/components/apply/database/erroranalysis/erroranalysis.js',
                            './public/components/apply/database/erroranalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.database.erroranalyFirst', {
            /* 监控概览路由*/
            url: "/erroranalyFirst/:app_id",
            controller: 'erroranalyFirst',
            templateUrl: './public/components/apply/database/erroranalysis/erroranalyFirst/erroranalyFirst.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/erroranalysis/erroranalyFirst/erroranalyFirst.js',
                            './public/components/apply/database/erroranalysis/erroranalyFirst/erroranalyFirst.css',
                            './public/components/apply/database/erroranalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.database.erroranalySecond', {
            /* 监控概览路由*/
            url: "/erroranalySecond/:app_id/:sql",
            controller: 'erroranalySecond',
            templateUrl: './public/components/apply/database/erroranalysis/erroranalySecond/erroranalySecond.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/erroranalysis/erroranalySecond/erroranalySecond.js',
                            './public/components/apply/database/erroranalysis/erroranalySecond/erroranalySecond.css',
                            './public/components/apply/database/erroranalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('errortThred', {
            /* 监控概览路由*/
            url: "/errortThred",
            controller: 'errortThred',
            templateUrl: './public/components/apply/database/erroranalysis/errortThred/errortThred.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/erroranalysis/errortThred/errortThred.js',
                            './public/components/apply/database/erroranalysis/errortThred/errortThred.css',
                            './public/components/apply/database/erroranalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('timeanalyThred', {
            /* 监控概览路由*/
            url: "/timeanalyThred",
            controller: 'timeanalyThred',
            templateUrl: './public/components/apply/database/timeanalysis/timeanalyThred/timeanalyThred.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/timeanalysis/timeanalyThred/timeanalyThred.js',
                            './public/components/apply/database/timeanalysis/timeanalyThred/timeanalyThred.css',
                            './public/components/apply/database/timeanalysis/service.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.content', {
            /* 监控概览路由*/
            url: "/content",
            controller: 'contentctl',
            templateUrl: './public/components/content/content.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/content/content.css', './public/components/content/content.js']
                    );
                }]
            }
        }).state('navigation.apply.overview', {
            /* 应用 概览 路由*/
            url: "/overview/:app_id",
            controller: 'overview',
            templateUrl: './public/components/apply/overview/overview.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/overview/overview.css', './public/components/apply/overview/overview.js']
                    );
                }]
            }
        }).state('navigation.apply.topology', {
            /* 应用 拓扑 路由*/
            url: "/topology/:app_id",
            controller: 'topology',
            templateUrl: './public/components/apply/topology/topology.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/topology/topology.css',
                            './public/components/apply/topology/topology.js',
                            './public/components/apply/topology/topologyService.js',
                            './public/script/diretives/visTopo.js',
                        ]
                    );
                }]
            }
        })

        .state('navigation.apply.keybusiness', {
            /* 应用 关键事务 路由*/
            url: "/keybusiness",
            controller: 'keybusiness',
            templateUrl: './public/components/apply/keybusiness/keybusiness.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/keybusiness/keybusiness.css',
                            './public/components/apply/keybusiness/keybusinessService.js',
                            './public/components/apply/keybusiness/keybusiness.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.default', {
            /* 应用 关键事务 路由*/
            url: "/default/:app_id",
            controller: 'KBdefault',
            templateUrl: './public/components/apply/keybusiness/default/default.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/keybusiness/default/default.js',
                            './public/components/apply/keybusiness/default/default.css',
                            './public/components/apply/keybusiness/default/defaultService.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.tabList', {
            /* 应用 关键事务 路由*/
            url: "/tabList",
            controller: 'tabList',
            templateUrl: './public/components/apply/keybusiness/tabList/tabList.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/keybusiness/tabList/tabList.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.tabList.dashboard', {
            /* 应用 关键事务-概要分析 路由*/
            url: "/dashboard/:uri/:app_id",
            controller: 'Kbdashboard',
            templateUrl: './public/components/apply/keybusiness/details/dashboard/dashboard.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/keybusiness/details/dashboard/dashboard.css',
                            './public/components/apply/keybusiness/details/dashboard/dashboard.js',
                            './public/components/apply/keybusiness/details/dashboard/dbService.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.tabList.error', {
            /* 应用 事务分析-错误分析 路由*/
            url: "/error/:uri/:app_id",
            controller: 'error',
            templateUrl: './public/components/apply/keybusiness/details/error/error.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/keybusiness/details/error/error.css',
                            './public/components/apply/keybusiness/details/error/error.js',
                            './public/components/apply/keybusiness/details/error/errorService.js'

                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.tabList.sql', {
            /* 应用 关键事务-SQL分析 路由*/
            url: "/sql",
            controller: 'sql',
            templateUrl: './public/components/apply/keybusiness/details/sql/sql.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/keybusiness/details/sql/sql.css', './public/components/apply/keybusiness/details/sql/sql.js']
                    );
                }]
            }
        })

        .state('navigation.apply.keybusiness.tabList.sql.ErrorAbnormal', {
            /* 应用 关键事务-SQL分析 路由*/
            url: "/ErrorAbnormal/:uri/:app_id",
            controller: 'errorAbnormal',
            templateUrl: './public/components/apply/database/timeanalysis/timeanalyFirst/timeanalyFirst.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/timeanalysis/timeanalysis.css',
                            './public/components/apply/keybusiness/details/sql/errorAbnormal/errorAbnormal.js',
                            './public/components/apply/database/timeanalysis/service.js'

                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.tabList.sql.errorAbnormalSecond', {
            /* 应用 关键事务-SQL分析 路由*/
            url: "/errorAbnormalSecond/:uri/:sql/:app_id",
            controller: 'errorAbnormalSecond',
            templateUrl: './public/components/apply/database/timeanalysis/timeanalySecond/timeanalySecond.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/timeanalysis/timeanalysis.css',
                            './public/components/apply/keybusiness/details/sql/errorAbnormal/timeanalySecond.js',
                            './public/components/apply/database/timeanalysis/service.js'

                        ]
                    );
                }]
            }
        })

        .state('navigation.apply.keybusiness.tabList.sql.abnormalAnalysis', {
            /* 应用 关键事务-SQL分析-异常分析 路由*/
            url: "/abnormalAnalysis/:uri/:app_id",
            controller: 'abnormalAnalysis',
            templateUrl: './public/components/apply/database/erroranalysis/erroranalyFirst/erroranalyFirst.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/erroranalysis/erroranalysis.css',
                            './public/components/apply/keybusiness/details/sql/abnormalAnalysis/abnormalAnalysis.js',
                            './public/components/apply/database/erroranalysis/service.js'

                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.tabList.sql.abnormalAnalySecond', {
            /* 应用 关键事务-SQL分析-异常分析 路由*/
            url: "/abnormalAnalySecond/:uri/:sql/:app_id",
            controller: 'abnormalAnalySecond',
            templateUrl: './public/components/apply/database/erroranalysis/erroranalySecond/erroranalySecond.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/database/erroranalysis/erroranalysis.css',
                            './public/components/apply/keybusiness/details/sql/abnormalAnalysis/errorAnalySecond.js',
                            './public/components/apply/database/erroranalysis/service.js'

                        ]
                    );
                }]
            }
        })

        .state('navigation.apply.setting', {
            /* 应用 关键事务-setting设置 路由*/
            url: "/setting/:business_id/:app_id",
            controller: 'setting',
            templateUrl: './public/components/apply/keybusiness/setting/setting.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/keybusiness/setting/setting.css',
                            './public/components/apply/keybusiness/setting/setting.js',
                            './public/components/apply/keybusiness/setting/settingService.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.keybusiness.tabList.snapshoot', {
            /* 应用 关键事务-快照分析 路由*/
            url: "/snapshoot/:uri/:app_id",
            controller: 'snapshoot',
            templateUrl: './public/components/apply/keybusiness/details/snapshoot/snapshoot.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/keybusiness/details/snapshoot/snapshoot.css',
                            './public/components/apply/keybusiness/details/snapshoot/snapshoot.js',
                            './public/components/apply/keybusiness/details/snapshoot/snapshootService.js'

                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.business', {
            /* 应用 事务分析 路由*/
            url: "/business",
            controller: 'business',
            templateUrl: './public/components/apply/business/business.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/business/business.css',
                            './public/components/apply/business/business.js',
                            './public/components/apply/business/businessService.js'
                        ]
                    );
                }]
            }

        })
        .state('navigation.apply.business.main', {
            /* 应用 事务分析 路由*/
            url: "/:app_id",
            controller: 'businessMain',
            templateUrl: './public/components/apply/business/main/main.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        './public/components/apply/business/main/main.css',
                        './public/components/apply/business/main/main.js',
                        './public/components/apply/business/main/mainService.js'
                    ]);
                }]
            }

        })
        .state('navigation.apply.business.details', {
            /* 应用 事务分析 路由*/
            url: "/details",
            controller: 'businessDetails',
            templateUrl: './public/components/apply/business/details/details.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        './public/components/apply/business/details/details.js'
                    ]);
                }]
            }
        })
        .state('navigation.apply.business.details.dashboard', {
            /* 应用 事务分析-仪表盘 路由*/
            url: "/dashboard/:app_id/:uri",
            controller: 'dashboard',
            templateUrl: './public/components/apply/business/details/dashboard/dashboard.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/business/details/dashboard/dashboard.css', './public/components/apply/business/details/dashboard/dashboard.js']
                    );
                }]
            }
        })
        .state('navigation.apply.business.details.slow', {
            /* 应用 事务分析-缓慢分析 路由*/
            url: "/slow/:app_id/:uri",
            controller: 'slow',
            templateUrl: './public/components/apply/business/details/slow/slow.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/business/details/slow/slow.css', './public/components/apply/business/details/slow/slow.js']
                    );
                }]
            }
        })
        .state('navigation.apply.business.details.errorException', {
            /* 应用 事务分析-错误and异常分析 路由*/
            url: "/errorException/:app_id/:uri",
            controller: 'errorException',
            templateUrl: './public/components/apply/business/details/errorException/errorException.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/business/details/errorException/errorException.css', './public/components/apply/business/details/errorException/errorException.js']
                    );
                }]
            }
        })
        .state('navigation.apply.business.details.snapshoot', {
            /* 应用 事务分析-快照分析 路由*/
            url: "/snapshoot/:app_id/:uri",
            controller: 'snapshoot',
            templateUrl: './public/components/apply/business/details/snapshoot/snapshoot.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/business/details/snapshoot/snapshoot.css', './public/components/apply/business/details/snapshoot/snapshoot.js']
                    );
                }]
            }
        })

        .state('navigation.apply.contrastiveAnalysis', {
            /*  应用 对比分析 路由*/
            url: "/contrastiveAnalysis/:app_id",
            controller: 'contrastiveAnalysis',
            templateUrl: './public/components/apply/contrastiveAnalysis/contrastiveAnalysis.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/contrastiveAnalysis/contrastiveAnalysis.css', './public/components/apply/contrastiveAnalysis/contrastiveAnalysis.js']
                    );
                }]
            }
        })
        .state('navigation.apply.externalServices', {
            /* 应用 外部服务 路由*/
            url: "/externalServices",
            controller: 'externalServices',
            templateUrl: './public/components/apply/externalServices/externalServices.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/externalServices/externalServices.css', './public/components/apply/externalServices/externalServices.js']
                    );
                }]
            }
        })
        .state('navigation.apply.externalServices.default', {
            /* 应用 外部服务 路由*/
            url: "/default/:app_id",
            controller: 'externalServicesdefault',
            templateUrl: './public/components/apply/externalServices/default/default.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/externalServices/default/default.css',
                            './public/components/apply/externalServices/default/default.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.externalServices.performance', {
            /* 应用 外部服务 路由*/
            url: "/performance/:domain/:port/:uri/:app_id",
            controller: 'performance',
            templateUrl: './public/components/apply/externalServices/performance/performance.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/externalServices/performance/performance.css',
                            './public/components/apply/externalServices/performance/performance.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.externalServices.error', {
            /* 应用 外部服务 错误 路由*/
            url: "/error/:domain/:port/:uri/:app_id",
            controller: 'error',
            templateUrl: './public/components/apply/externalServices/error/error.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/externalServices/error/error.css',
                            './public/components/apply/externalServices/error/error.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.messageQueue', {
            /* 应用 消息队列 路由*/
            url: "/messageQueue",
            controller: 'messageQueue',
            templateUrl: './public/components/apply/messageQueue/messageQueue.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/messageQueue/messageQueue.css', './public/components/apply/messageQueue/messageQueue.js']
                    );
                }]
            }
        })
        .state('navigation.apply.messageQueue.producers', {
            /* 应用 消息队列 生产者路由*/
            url: "/producers/:app_id",
            controller: 'producers',
            templateUrl: './public/components/apply/messageQueue/producers/producers.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/messageQueue/producers/producers.css', './public/components/apply/messageQueue/producers/producers.js']
                    );
                }]
            }
        })
        .state('navigation.apply.messageQueue.consumer', {
            /* 应用 消息队列 消费者路由*/
            url: "/consumer/:app_id",
            controller: 'consumer',
            templateUrl: './public/components/apply/messageQueue/consumer/consumer.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/messageQueue/consumer/consumer.css', './public/components/apply/messageQueue/consumer/consumer.js']
                    );
                }]
            }
        })
        .state('navigation.apply.NoSQL', {
            /* 应用 NoSQL 路由*/
            url: "/NoSQL/:app_id",
            controller: 'NoSQL',
            templateUrl: './public/components/apply/NoSQL/NoSQL.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/NoSQL/NoSQL.css', './public/components/apply/NoSQL/NoSQL.js']
                    );
                }]
            }
        })
        .state('navigation.apply.error', {
            /* 应用 错误 路由*/
            url: "/error/:app_id",
            controller: 'error',
            templateUrl: './public/components/apply/error/error.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/error/error.css',
                            './public/components/apply/error/error.js',
                            './public/components/apply/error/errorService.js',
                            './public/components/apply/keybusiness/keybusinessService.js',
                        ]
                    );
                }]
            }
        })
        .state('errorDetail', {
            /* 应用 错误-详情 路由*/
            url: "/errorDetail/:url/:app_id/:error_code/:start_time/:end_time",
            controller: 'errorDetail',
            templateUrl: './public/components/apply/error/detail/error/errorDetail.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/error/detail/error/errorDetail.css',
                            './public/components/apply/error/detail/error/errorDetail.js',
                            './public/components/apply/error/detail/error/errorDetailService.js',
                            './public/components/apply/error/errorService.js',

                        ]
                    );
                }]
            }
        })
        .state('abnormalDetail', {
            /* 应用 错误-详情 路由*/
            url: "/abnormalDetail/:url/:app_id/:error_code/:start_time/:end_time",
            controller: 'abnormalDetail',
            templateUrl: './public/components/apply/error/detail/abnormal/errorDetail.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/error/detail/abnormal/errorDetail.css',
                            './public/components/apply/error/detail/abnormal/abnormalService.js',
                            './public/components/apply/error/detail/abnormal/errorDetail.js',
                        ]
                    );
                }]
            }
        })
        .state('navigation.apply.set', {
            /* 应用 设置 路由*/
            url: "/set/:app_id",
            controller: 'set',
            templateUrl: './public/components/apply/set/set.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        ['./public/components/apply/set/set.css', './public/components/apply/set/set.js']
                    );
                }]
            }
        })
        .state('navigation.applyListdefault', {
            /* 应用 应用列表 路由*/
            url: "/applyListdefault",
            controller: 'applyListdefault',
            templateUrl: './public/components/apply/applyList/applyListdefault/applyListdefault.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/applyList/applyListdefault/applyListdefault.css',
                            './public/components/apply/applyList/applyListdefault/applyListdefault.js',
                            './public/components/apply/applyList/applyListService.js'
                        ]
                    );
                }]
            }
        })
        .state('navigation.applyListdefault.applyList', {
            /* 应用 应用列表 路由*/
            url: "/applyList",
            controller: 'applyList',
            templateUrl: './public/components/apply/applyList/applyList.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/applyList/applyList.css',
                            './public/components/apply/apply.css',
                            './public/components/apply/applyList/applyList.js',
                            './public/components/apply/applyList/applyListService.js'
                        ]
                    );
                }]
            }
        }).state('navigation.applyListdefault.stopList', {
            /* 应用 应用列表-暂停 路由*/
            url: "/stopList",
            controller: 'stopList',
            templateUrl: './public/components/apply/applyList/stopList/stopList.html',
            resolve: {
                deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        [
                            './public/components/apply/applyList/applyList.css',
                            './public/components/apply/apply.css',
                            './public/components/apply/applyList/stopList/stopList.css',
                            './public/components/apply/applyList/stopList/stopList.js',
                            './public/components/apply/applyList/applyListService.js'
                        ]
                    );
                }]
            }
        });

    // 应用快照路由配置
    $stateProvider.state('applySnapshot', {
        /* 应用快照 */
        url: "/apply_snapshot/:app_id",
        controller: 'applySnapshot',
        templateUrl: './public/components/apply/snapshotList/snapshotList.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/snapshotList.css',
                        './public/components/apply/snapshotList/snapshotList.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.overview', {
        /* 应用快照-概览 */
        url: "/overview",
        controller: 'applySnapshotOverview',
        templateUrl: './public/components/apply/snapshotList/overview/overview.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/overview/overview.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.slow', {
        /* 应用快照-慢元素追踪 */
        url: "/slow",
        controller: 'applySnapshotSlow',
        templateUrl: './public/components/apply/snapshotList/slow/slow.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/slow/slow.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.track', {
        /* 应用快照-追踪详情 */
        url: "/track",
        controller: 'applySnapshotTrack',
        templateUrl: './public/components/apply/snapshotList/track/track.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/track/track.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.resource', {
        /* 应用快照-资源时序图 */
        url: "/resource",
        controller: 'applySnapshotResource',
        templateUrl: './public/components/apply/snapshotList/resource/resource.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/resource/resource.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.error', {
        /* 应用快照-错误&异常分析 */
        url: "/error",
        controller: 'applySnapshotError',
        templateUrl: './public/components/apply/snapshotList/error/error.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/error/error.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.sql', {
        /* 应用快照-SQL分析 */
        url: "/sql",
        controller: 'applySnapshotSql',
        templateUrl: './public/components/apply/snapshotList/sql/sql.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/sql/sql.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.api', {
        /* 应用快照-API调用 */
        url: "/api",
        controller: 'applySnapshotApi',
        templateUrl: './public/components/apply/snapshotList/api/api.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/api/api.js'
                    ]
                );
            }]
        }
    }).state('applySnapshot.params', {
        /* 应用快照-请求参数 */
        url: "/params",
        controller: 'applySnapshotParams',
        templateUrl: './public/components/apply/snapshotList/params/params.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/snapshotList/params/params.js'
                    ]
                );
            }]
        }
    }).state('navigation.configApply', {
        /* 应用配置-应用 */
        url: "/configApply",
        controller: 'configApply',
        templateUrl: './public/components/apply/config/configApply/configApply.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/config/configApply/configApply.css',
                        './public/components/apply/config/configApply/configApply.js'
                    ]
                );
            }]
        }
    }).state('navigation.configApply.java', {
        /* 应用配置-应用-java */
        url: "/java",
        controller: 'java',
        templateUrl: './public/components/apply/config/configApply/java/java.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/config/configApply/java/java.css',
                        './public/components/apply/config/configApply/java/java.js'
                    ]
                );
            }]
        }
    }).state('navigation.configApply.php', {
        /* 应用配置-应用-php */
        url: "/php",
        controller: 'php',
        templateUrl: './public/components/apply/config/configApply/php/php.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/config/configApply/php/php.css',
                        './public/components/apply/config/configApply/php/php.js'
                    ]
                );
            }]
        }
    }).state('navigation.configApply.net', {
        /* 应用配置-应用-net */
        url: "/net",
        controller: 'net',
        templateUrl: './public/components/apply/config/configApply/net/net.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/config/configApply/net/net.css',
                        './public/components/apply/config/configApply/net/net.js'

                    ]
                );
            }]
        }
    }).state('navigation.configApply.python', {
        /* 应用配置-应用-python */
        url: "/python",
        controller: 'python',
        templateUrl: './public/components/apply/config/configApply/python/python.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/config/configApply/python/python.css',
                        './public/components/apply/config/configApply/python/python.js'
                    ]
                );
            }]
        }
    }).state('navigation.configApply.nodeJs', {
        /* 应用配置-应用-nodeJs */
        url: "/nodeJs",
        controller: 'nodeJs',
        templateUrl: './public/components/apply/config/configApply/nodeJs/nodeJs.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/apply/config/configApply/nodeJs/nodeJs.css',
                        './public/components/apply/config/configApply/nodeJs/nodeJs.js'
                    ]
                );
            }]
        }
    }).state('navigation.personal', {
        /* 个人中心-路由*/
        url: "/personal",
        controller: 'personal',
        templateUrl: './public/components/personal/personal.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    ['./public/components/personal/personal.css', './public/components/personal/personal.js']
                );
            }]
        }
    }).state('navigation.personal.accountInfo', {
        /*个人中心设置 - 账户信息*/
        url: "/accountInfo",
        controller: 'accountInfo',
        templateUrl: './public/components/personal/accountInfo/accountInfo.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/personal/accountInfo/accountInfo.css',
                        './public/components/personal/accountInfo/accountInfo.js',
                        './public/components/personal/accountInfo/accountInfoService.js'
                    ]
                );
            }]
        }
    }).state('navigation.personal.mobile', {
        /*个人中心设置 - 账户信息-修改手机号码*/
        url: "/mobile",
        controller: 'mobile',
        templateUrl: './public/components/personal/accountInfo/mobile/mobile.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/personal/accountInfo/accountInfo.css',
                        './public/components/personal/accountInfo/mobile/mobile.css',
                        './public/components/personal/accountInfo/mobile/mobile.js'
                    ]
                );
            }]
        }
    }).state('navigation.personal.email', {
        /*个人中心设置 - 账户信息-修改手机号码*/
        url: "/email",
        controller: 'email',
        templateUrl: './public/components/personal/accountInfo/email/email.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/personal/accountInfo/accountInfo.css',
                        './public/components/personal/accountInfo/email/email.css',
                        './public/components/personal/accountInfo/email/email.js',
                        './public/components/personal/accountInfo/accountInfoService.js',
                    ]
                );
            }]
        }
    }).state('navigation.personal.password', {
        /*个人中心设置 - 密码设置*/
        url: "/password",
        controller: 'password',
        templateUrl: './public/components/personal/password/password.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/personal/accountInfo/accountInfo.css',
                        './public/components/personal/password/password.css',
                        './public/components/personal/password/password.js']
                );
            }]
        }
    }).state('navigation.personal.userManager', {
        /*个人中心设置 - 用户管理*/
        url: "/userManager",
        controller: 'userManager',
        templateUrl: './public/components/personal/userManager/userManager.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/personal/accountInfo/accountInfo.css',
                        './public/components/personal/userManager/userManager.css',
                        './public/components/personal/userManager/userManager.js']
                );
            }]
        }
    }).state('navigation.personal.plugin', {
        /*个人中心设置 - 插件管理*/
        url: "/plugin",
        controller: 'plugin',
        templateUrl: './public/components/personal/plugin/plugin.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/personal/accountInfo/accountInfo.css',
                        './public/components/personal/plugin/plugin.css',
                        './public/components/personal/plugin/plugin.js']
                );
            }]
        }
    }).state('navigation.personal.apiConfig', {
        /*个人中心设置 - api配置*/
        url: "/apiConfig",
        controller: 'apiConfig',
        templateUrl: './public/components/personal/apiConfig/apiConfig.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/personal/accountInfo/accountInfo.css',
                        './public/components/personal/apiConfig/apiConfig.css',
                        './public/components/personal/apiConfig/apiConfig.js']
                );
            }]
        }
    }).state('login', {
        /*登录*/
        url: "/login",
        controller: 'login',
        templateUrl: './public/components/login/login.html',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(
                    [
                        './public/components/login/login.css',
                        './public/components/login/login.js']
                );
            }]
        }
    });

    //个人中心模块配置
    $locationProvider.html5Mode({
        enabled: false,  //true 为消除URL路由前面的#号
        requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
    });
}