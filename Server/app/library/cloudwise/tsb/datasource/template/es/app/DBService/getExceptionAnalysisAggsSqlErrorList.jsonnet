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
             "aggs":{
                "nest":{
                    "nested":{
                        "path" : "nest_sub_methods"
                    },
                       "aggs": {
                         "sqls": {
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
                           },
                           "aggs": {
                             "error": {
                               "terms": {
                                 "script": "doc['nest_sub_methods.ps_raw'].value+'###'+doc['nest_sub_methods.errorMsg_raw'].value",
                                 "size": $.params.aggs_size,
                                 "order": {
                                       [$.params.order]: $.params.sort

                                 }
                               },
                               "aggs": {
                                 "time": {
                                   "stats": {
                                     "field": "nest_sub_methods.collTime"
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