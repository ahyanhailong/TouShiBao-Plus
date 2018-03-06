{
    "content":{
        "index": params.index,
        "body": {
          "aggs": {
              "uri": {
                "terms": {
                  "field": "reqUri_raw",
                  "order": {
                    "_count": "desc"
                  },
                  "size": params.aggs_size
                }
              }
          },
          "query": common_es.addQuery(params.query),
          "size": 0
        }
    }

}