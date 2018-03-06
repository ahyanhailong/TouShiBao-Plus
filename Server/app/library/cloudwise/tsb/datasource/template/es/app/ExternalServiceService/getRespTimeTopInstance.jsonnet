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
                       "domain": {
                         "aggs": {
                           "ct": {
                             "stats": {
                               "field": "nest_sub_methods.wt"
                             }
                           },
                           "error": {
                             "stats": {
                                "script": "doc['nest_sub_methods.exception'].value == 1 ? 1 : 0"

                             }
                           }
                         },
                         "terms": {
                           "order": {
                             [params.order]: "desc"
                           },
                           "script": "doc['nest_sub_methods.domain_raw'].value+':'+doc['nest_sub_methods.port'].value",
                           "size": 5
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
