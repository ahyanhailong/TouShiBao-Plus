{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "url": {
                  "aggs": {
                    "nest": {
                      "aggs": {
                        "exc_msg": {
                          "terms": {
                            "field": "nest_exceptions.excp_raw",
                            "size": params.aggs_size
                          }
                        }
                      },
                      "nested": {
                        "path": "nest_exceptions"
                      }
                    },
                    "time": {
                      "stats": {
                        "field": "collTime"
                      }
                    }
                  },
                  "terms": {
                    "script": "doc['reqUrl_raw'].value+'||||'+doc['reqUri_raw'].value",
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
