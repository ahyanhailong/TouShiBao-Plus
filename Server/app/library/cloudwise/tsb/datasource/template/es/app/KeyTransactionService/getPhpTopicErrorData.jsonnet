{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "url": {
                  "aggs": {
                    "error": {
                      "aggs": {
                        "time": {
                          "stats": {
                            "field": "collTime"
                          }
                        }
                      },
                      "terms": {
                        "script": "doc['error.file_raw'].value+'||||'+doc['error.line'].value+'||||'+doc['error.msg_raw'].value+'||||'+doc['httpResponseCode'].value",
                        "size": params.aggs_size
                      }
                    }
                  },
                  "terms": {
                    "params": {
                      "combine": "combine"
                    },
                    "script": "doc['reqUrl_raw'].value+'||||'+doc['reqUri_raw'].value",
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
