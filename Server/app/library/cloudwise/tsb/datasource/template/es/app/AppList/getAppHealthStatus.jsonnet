{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "app_id": {
                  "aggs": {
                    "error_rate": {
                      "avg": {
                        "script": "doc['isError'].value==1 || doc['is_file_error'].value == 1  ? 1 : 0"
                      }
                    },
                    "filter": {
                      "aggs": {
                        "much_slow_count": {
                          "sum": {
                            "script": "doc['totalTime'].value>" + params.aggs.very_slow + "?1:0"
                          }
                        },
                        "normal_count": {
                          "sum": {
                            "script": "doc['totalTime'].value<" + params.aggs.slow + "?1:0"
                          }
                        },
                        "slow_count": {
                          "sum": {
                            "script": "doc['totalTime'].value>" + params.aggs.slow + " && doc['totalTime'].value<" + params.aggs.very_slow + "?1:0"
                          }
                        }
                      },
                      "filter": {
                        "and": {
                          "filters": [
                            {
                              "term": {
                                "isError": 0
                              }
                            },
                            {
                              "term": {
                                "is_file_error": 0
                              }
                            }
                          ]
                        }
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
