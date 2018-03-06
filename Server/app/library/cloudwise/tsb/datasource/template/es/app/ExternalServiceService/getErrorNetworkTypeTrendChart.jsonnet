{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "date_range": {
                  "aggs": {
                    "nest": {
                      "aggs": {
                        "condition": {
                          "aggs": {
                            "error_type": {
                              "terms": {
                                "field": "nest_sub_methods.errorMsg_raw",
                                "size": params.aggs_size
                              }
                            }
                          },
                          "filter": {
                            "and": {
                              "filters": [
                                {
                                  [i.type]: {
                                    [i.field]: i.value
                                  }
                                }
                                for i in params.filter.nest
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
                  "date_histogram": {
                    "field": "collTime",
                    "interval": params.interval
                  }
                }
            }

        }
    }
}
