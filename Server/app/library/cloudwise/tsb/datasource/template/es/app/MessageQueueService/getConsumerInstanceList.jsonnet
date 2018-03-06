{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "uri": {
                    "terms": {
                        "field": "reqUri_raw",
                        "size": params.top_count
                    },
                    "aggs": {
                        "nest": {
                            "nested": {
                                "path": "nest_sub_methods"
                            },
                            "aggs": {
                                "filter": {
                                    "filter": {
                                        "and": {
                                            "filters": [
                                            {
                                                "term": {
                                                    "nest_sub_methods.pst": params.pst
                                                }
                                            }
                                            ]
                                        }
                                    },
                                    "aggs": {
                                        "consumer": {
                                            "terms": {
                                                "order": {
                                                    "_count": "desc"
                                                },
                                                "script": "doc['nest_sub_methods.instance_raw'].value+'#on#'+doc['nest_sub_methods.app_id'].value",
                                                "size": params.aggs_size
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "nest": {
                  "nested": {
                    "path": "nest_sub_methods"
                  },
                  "aggs": {
                    "filter": {
                      "filter": {
                        "and": {
                          "filters": [
                            {
                              "term": {
                                "nest_sub_methods.pst": "1301"
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
            }
        }
    }
}
