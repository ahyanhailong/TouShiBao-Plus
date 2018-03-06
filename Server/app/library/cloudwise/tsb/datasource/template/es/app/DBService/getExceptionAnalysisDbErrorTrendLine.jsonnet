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
                    "date_range": {
                      "date_histogram": {
                        "field": "nest_sub_methods.collTime",
                        "interval": $.params.interval
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
                              "filter": {
                                "term": {
                                  "nest_sub_methods.exception": "1"
                                }
                              }
                            },
                            "normal": {
                              "filter": {
                                "term": {
                                  "nest_sub_methods.exception": "0"
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