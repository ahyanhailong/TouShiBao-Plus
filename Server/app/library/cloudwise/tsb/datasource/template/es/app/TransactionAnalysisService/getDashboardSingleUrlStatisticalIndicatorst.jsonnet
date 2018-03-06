{
    "content": {
        "index": params.index,
            "body": {
                "size": 0,
                "query": common_es.addQuery(params.query),
                "aggs": {
                    "total_avg_time": {
                      "avg": {
                        "field": "totalTime"
                      }
                    },
                    "all_uri_count": {
                      "filter": {}
                    },
                    "nest": {
                      "nested": {
                        "path": "nest_sub_methods"
                      },
                      "aggs": {
                        "code_time": {
                          "aggs": {
                            "time": {
                              "avg": {
                                "field": "nest_sub_methods.wt"
                              }
                            }
                          },
                          "filter": {
                            "not": {
                              "filter": {
                                "and": {
                                  "filters": [
                                    {
                                      "term": {
                                        "nest_sub_methods.pst": params.pst_filter
                                      }
                                    },
                                    {
                                      "terms": {
                                        "nest_sub_methods.service_type": params.db_filter
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        },
                        "method_call_count": {
                          "filter": {
                            "term": {
                              "nest_sub_methods.mn_raw": params.ele_filter
                            }
                          }
                        }
                      }
                    },
                    "request_call_count": {
                      "filter": {
                        "nested": {
                          "path": "nest_sub_methods",
                          "query": {
                            "filtered": {
                              "filter": {
                                "term": {
                                  "nest_sub_methods.mn_raw": params.ele_filter
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                }
            }
    }
}
