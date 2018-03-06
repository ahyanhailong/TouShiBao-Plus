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
            "aggs": {
              "leach": {
                "aggs": {
                  "dimension": {
                    "terms": {
                      "field": $.params.field,
                      "size": $.params.aggs_size
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
            },
            "nested": {
              "path": "nest_sub_methods"
            }
          }
        }
    }
  }
}