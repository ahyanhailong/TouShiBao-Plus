{
  "params": <?php echo json_encode($params,JSON_UNESCAPED_UNICODE);?>,
  "content": {
    "index": $.params.index,
    "body": {
         "size": $.params.doc_size,
         "query": {
           "filtered": {
           "query": {
               "nested": {
                 "path": "nest_sub_methods",
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
                           for i in $.params.nest_query
                         ]
                       }
                     }
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
                    for i in $.params.query
                 ]
               }
             }
           }
         },
         "_source": {
             "include": [
                 "nest_sub_methods",
                 "request_id",
                 "stack_tree"
               ]
         }
    }
  }
}