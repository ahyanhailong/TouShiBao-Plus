{
  "params": <?php echo json_encode($params,JSON_UNESCAPED_UNICODE);?>,
  "content": {
    "index": $.params.index,
    "body": {
         "size": 0,
         "query": {
           "filtered": {
             "filter": {
               "and": {
                 "filters": [
                   {
                        [i.type]: {
                          [i.field]: i.value
                        }
                      }
                      for i in $.params.query
                 ]
               }
             }
           }
         },
         "aggs": {
             "nest": {
               "nested": {
                 "path": "nest_sub_methods"
               },
               "aggs": {
                 "leach": {
                   "aggs": {
                     "uri": {
                       "aggs": {
                         "time": {
                           "sum": {
                             "field": "nest_sub_methods.wt"
                           }
                         }
                       },
                       "terms": {
                         "field": "nest_sub_methods.reqUri_raw",
                         "size": 5,
                         "order": {
                           "time": "desc"
                         }
                       }
                     },
                     "total":{
                       "sum": {
                         "field": "nest_sub_methods.wt"
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
                            for i in $.params.nest_query
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