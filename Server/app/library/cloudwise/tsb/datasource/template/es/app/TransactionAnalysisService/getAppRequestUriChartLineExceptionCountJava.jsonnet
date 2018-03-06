{
    "content": {
        "index": params.index,
        "body": {
          "size": 0,
          "query": common_es.addQuery(params.query),
          "aggs":{
             "time": {
               "date_histogram": {
                 "field": "collTime",
                 "interval": params.interval
               },
               "aggs": {
                 "nest": {
                   "aggs": {
                     "filter": {
                       "aggs": {
                         "exception_msg": {
                           "terms": {
                             "field": "nest_sub_methods.errorMsg_raw",
                             "size": params.topCount
                           }
                         }
                       },
                       "filter": {
                         "and": {
                           "filters": common_es.addFilters(params.nest_query)
                         }
                       }
                     }
                   },
                   "nested": {
                     "path": "nest_sub_methods"
                   }
                 }
               }
             }
           }
        }
    }
}