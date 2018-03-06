<?php
use cloudwise\tsb\datasource\base\ESService;

/**
 * @author bear
 * Date: 17/11/28 下午4:22
 */
class JsonNetTest extends PHPUnit_YafTestCase
{
    public $fields = [
        'start_time'         => [
            'type'  => 'gte',
            'field' => 'collTime',
        ],
        'end_time'           => [
            'type'  => 'lte',
            'field' => 'collTime',
        ],
        'app_id'             => [
            'type'  => 'terms',
            'field' => 'app_id',
        ],
        'error'              => [
            'type'  => 'term',
            'field' => 'isError',
        ],
        'exception'          => [
            'type'  => 'term',
            'field' => 'isException',
        ],
        'error_or_exception' => [
            'type'  => 'or',
            'field' => 'filters',
        ],
        'uri'                => [
            'type'  => 'regexp',
            'field' => 'reqUri_raw',
        ],
        'exception_msg'      => [
            'type'  => 'terms',
            'field' => 'errorMsg_raw',
        ],
        'url'                => [
            'type'  => 'regexp',
            'field' => 'url_raw',
        ],
        'isError'            => [
            'type'  => 'bool',
            'field' => 'should',
        ],
    ];


    public function testEsFilterQuery()
    {
        $params = [
            'start_time' => 1,
            'end_time'   => 2,
            'app_id'     => 3,
            'account_id' => 4,
            'url'        => 'aaa',
            'error'      => 1,
            'isError'    => ['error'],
        ];

        $nest_field = 'nest_requests';
        $es = new ESService();
        $es->fields = $this->fields;
        $result = $es->setFilterQuery(
            $params, $es->getFields(
            ['start_time', 'end_time', 'app_id', 'account_id', 'url', 'isError']), $nest_field);
        $expected = [
            ["field" => "nest_requests.app_id", "type" => "terms", "value" => [3]],
            [
                "field" => "should",
                "type"  => "bool",
                "value" => [["field" => "nest_requests.isError", "type" => "term", "value" => 1]],
            ],
            ["field" => "nest_requests.collTime", "type" => "range", "value" => ["gte" => 1, "lte" => 2]],
            ["field" => "nest_requests.url_raw", "type" => "regexp", "value" => ".*aaa.*"],
        ];
        $this->assertTrue($expected == $result);
    }

    /**
     * 过滤参数的测试
     */
    public function testEsQuery()
    {
        $es = new ESService();
        $es->fields = $this->fields;
        $params['error'] = 1;
        $params['app_id'] = 2;
        $params['service_type'] = 1002;
        $params['start_time'] = mktime(0, 0, 0, 11, 29, 2017) * 1000;
        $params['uri'] = 'search';
        $params['exception_msg'] = [1, 3];
        $params['end_time'] = mktime(0, 0, 0, 11, 30, 2017) * 1000;
        $params['error_or_exception'] = ['error'];
        $params['nest_path'] = 'nest_sub_methods';
        $aQueryParams = $es->getNewQueryParams(
            $params, [
            'app_id',
            'account_id',
            'error_or_exception',
            'start_time',
            'end_time',
            'uri',
        ], ['exception_msg',]);
        $aQueryParams['nest_query'] = $es->setFilterQuery($params, $es->getFields(['error']), 'nest_sub_methods');
        $path = APPLICATION_PATH . '/app/library/cloudwise/tsb/datasource/template/main/test.jsonnet';
        $result = $es->renderQueryParams($path, $aQueryParams);
        $expected = <<<TEXT
            {
              "body": {
                "aggs": {
                  "nest": {
                    "aggs": {
                      "filter": {
                        "filter": {
                          "and": {
                            "filters": [
                              {
                                "term": {
                                  "nest_sub_methods.isError": 1
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    "nested": {
                      "path": "nest_sub_methods"
                    }
                  }
                },
                "index": "javatopic_20171129,javatopic_20171130",
                "query": {
                  "filtered": {
                    "filter": {
                      "and": {
                        "filters": [
                          {
                            "terms": {
                              "app_id": [
                                2
                              ]
                            }
                          },
                          {
                            "range": {
                              "collTime": {
                                "gte": 1511884800000,
                                "lte": 1511971200000
                              }
                            }
                          },
                          {
                            "or": {
                              "filters": [
                                {
                                  "term": {
                                    "isError": 1
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "regexp": {
                              "reqUri_raw": ".*search.*"
                            }
                          },
                          {
                            "nested": {
                              "path": "nest_sub_methods",
                              "query": {
                                "filtered": {
                                  "filter": {
                                    "and": {
                                      "filters": [
                                        {
                                          "terms": {
                                            "nest_sub_methods.errorMsg_raw": [
                                              1,
                                              3
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                },
                "size": 200
              }
            }
TEXT;
        $this->assertTrue(json_decode($expected, true) == $result);

    }
}