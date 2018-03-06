{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
           "aggs": {
               "nest": {
                 "aggs": {
                   "condition": {
                     "aggs": {
                       "ct": {
                         "stats": {
                           "field": "nest_sub_methods.wt"
                         }
                       },
                       "domain": {
                         "aggs": {
                           "ct": {
                             "stats": {
                               "field": "nest_sub_methods.wt"
                             }
                           },
                           "error": {
                             "sum": {
                               "field": "nest_sub_methods.exception"
                             }
                           }
                         },
                         "terms": {
                           "field": "nest_sub_methods.uri_raw",
                           "order": {
                             [params.order]: "desc"
                           },
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
                   },
                   "conditionSum": {
                     "aggs": {
                       "ct": {
                         "avg": {
                           "field": "nest_sub_methods.wt"
                         }
                       },
                       "error": {
                         "sum": {
                           "field": "nest_sub_methods.exception"
                         }
                       }
                     },
                     "filter": {
                       "and": {
                         "filters": [
                           {
                             "terms": {
                               "nest_sub_methods.pst": [
                                 1101
                               ]
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
           }

        }
    }
}
