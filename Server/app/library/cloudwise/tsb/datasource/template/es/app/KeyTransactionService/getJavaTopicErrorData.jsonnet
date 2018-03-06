{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "error_code": {
                  "terms": {
                    "script": "doc['reqUrl_raw'].value+'||||'+doc['httpResponseCode'].value+'||||'+doc['reqUri_raw'].value",
                    "size": params.aggs_size
                  },
                  "aggs": {
                    "time": {
                      "stats": {
                        "field": "collTime"
                      }
                    }
                  }
                }
            }

        }
    }
}
