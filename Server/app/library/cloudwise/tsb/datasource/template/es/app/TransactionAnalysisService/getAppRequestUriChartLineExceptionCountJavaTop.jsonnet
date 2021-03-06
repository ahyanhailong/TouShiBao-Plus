{
    "content": {
        "index": params.index,
        "body": {
          "size": 0,
          "query": common_es.addQuery(params.query),
          "aggs":{
            "nest":{
              "nested": {
                "path": "nest_sub_methods"
              },
              "aggs": {
                "filter": {
                  "filter": {
                    "and": {
                      "filters": common_es.addFilters(params.nest_query)
                    }
                  },
                  "aggs":{
                    "exception_msg":{
                      "terms": {
                        "field": "nest_sub_methods.errorMsg_raw",
                        "size": params.topCount
                      },
                      "aggs": {
                        "nest":{
                          "reverse_nested": {},
                          "aggs": {
                            "happen_time":{
                                "stats":{
                                    "field":"collTime"
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
    }
}