{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "app_id": {
                  "aggs": {
                    "nest": {
                      "aggs": {
                        "filter": {
                          "aggs": {
                            "db_name": {
                              "aggs": {
                                "info": {
                                  "avg": {
                                    "field": "nest_sub_sqls.wt"
                                  }
                                }
                              },
                              "terms": {
                                "field": "nest_sub_sqls.dbn_raw",
                                "size": params.aggs_size
                              }
                            }
                          },
                          "filter": {
                            "and": {
                              "filters": [
                                {
                                  "terms": {
                                    "nest_sub_sqls.dbn_raw": params.db_raw
                                  }
                                },
                                {
                                  "term": {
                                    "nest_sub_sqls.instance_raw": params.instance
                                  }
                                },
                                {
                                  "term": {
                                    "nest_sub_sqls.db_name": params.db_type
                                  }
                                }
                              ]
                            }
                          }
                        }
                      },
                      "nested": {
                        "path": "nest_sub_sqls"
                      }
                    }
                  },
                  "terms": {
                    "field": "app_id",
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
