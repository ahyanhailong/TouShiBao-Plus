{
    "content": {
        "index": params.index,
        "body": {
          "query": common_es.addQuery(params.query),
          "aggs": {
            "time": {
              "date_histogram": {
                "field": "collTime",
                "interval": params.interval
              },
              "aggs": {
                "nest": {
                  "nested": {
                    "path": "nest_exceptions"
                  },
                  "aggs": {
                    "filter": {
                      "filter": {
                        "and": {
                          "filters": common_es.addFilters(params.nest_query)
                        }
                      },
                      "aggs":{
                        "ex_msg":{
                          "terms": {
                            "field": "nest_exceptions.msg_raw",
                            "size": params.topCount,
                          },
                         "aggs": {
                           "nest": {
                             "reverse_nested": {},
                             "aggs": {
                               "time": {
                                 "stats": {
                                   "field": "collTime"
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
            }
          },
          "size": 0
        }
    }
}