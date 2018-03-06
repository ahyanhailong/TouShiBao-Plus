{
  "content": {
    "index": params.index,
    "body": {
         "size": 1,
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
                          for i in params.nest_query
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
                  for i in params.query
                ]
              }
            }
          }
        }

    }
  }
}