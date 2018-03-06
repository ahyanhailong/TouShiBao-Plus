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
                     [$.params.filter_keys[0]]: {
                       "filter": {
                         "range": {
                           "nest_sub_methods.wt": {
                             "gte": $.params.distance[0][0],
                             "lte": $.params.distance[0][1]
                           }
                         }
                       }
                     },
                       [$.params.filter_keys[1]]:{
                         "filter": {
                           "range": {
                             "nest_sub_methods.wt": {
                               "gte": $.params.distance[1][0],
                                "lte": $.params.distance[1][1]
                             }
                           }
                         }
                       },
                         [$.params.filter_keys[2]]:{
                           "filter": {
                             "range": {
                               "nest_sub_methods.wt": {
                                 "gte": $.params.distance[2][0],
                                  "lte": $.params.distance[2][1]
                               }
                             }
                           }
                         },
                       [$.params.filter_keys[3]]:{
                         "filter": {
                           "range": {
                             "nest_sub_methods.wt": {
                               "gte": $.params.distance[3][0],
                                "lte": $.params.distance[3][1]
                             }
                           }
                         }
                       },
                         [$.params.filter_keys[4]]:{
                           "filter": {
                             "range": {
                               "nest_sub_methods.wt": {
                                 "gte": $.params.distance[4][0],
                                  "lte": $.params.distance[4][1]
                               }
                             }
                           }
                         },
                       [$.params.filter_keys[5]]:{
                         "filter": {
                           "range": {
                             "nest_sub_methods.wt": {
                               "gte": $.params.distance[5][0],
                                "lte": $.params.distance[5][1]
                             }
                           }
                         }
                       },
                         [$.params.filter_keys[6]]:{
                           "filter": {
                             "range": {
                               "nest_sub_methods.wt": {
                                 "gte": $.params.distance[6][0],
                                  "lte": $.params.distance[6][1]
                               }
                             }
                           }
                         },
                       [$.params.filter_keys[7]]:{
                         "filter": {
                           "range": {
                             "nest_sub_methods.wt": {
                               "gte": $.params.distance[7][0],
                                "lte": $.params.distance[7][1]
                             }
                           }
                         }
                       },
                         [$.params.filter_keys[8]]:{
                           "filter": {
                             "range": {
                               "nest_sub_methods.wt": {
                                 "gte": $.params.distance[8][0],
                                  "lte": $.params.distance[8][1]
                               }
                             }
                           }
                         },
                       [$.params.filter_keys[9]]:{
                         "filter": {
                           "range": {
                             "nest_sub_methods.wt": {
                               "gte": $.params.distance[9][0],
                                "lte": $.params.distance[9][1]
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