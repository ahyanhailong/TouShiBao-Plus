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
                     "sql": {
                       "aggs": {
                         "wt": {
                           "avg": {
                             "field": "nest_sub_methods.wt"
                           }
                         },
                         "time":{
                           "stats": {
                             "field": "nest_sub_methods.collTime"
                           }
                         }
                       },
                       "terms": {
                         "field": "nest_sub_methods.ps_raw",
                         "size": $.params.aggs_size,
                         "order": {
                           [$.params.order]: $.params.sort
                         }
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