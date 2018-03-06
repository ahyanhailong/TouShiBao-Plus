{
    "content": {
        "index": params.index,
        "body": {
          "query": common_es.addQuery(params.query),
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
                  "aggs": {
                    "msg": {
                      "terms": {
                        "field": "nest_exceptions.msg_raw",
                        "size": params.topCount
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
          },
          "size": 0
        }
    }
}