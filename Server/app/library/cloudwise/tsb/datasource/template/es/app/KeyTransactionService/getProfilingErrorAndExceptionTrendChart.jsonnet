{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "error_rate": {
                  "avg": {
                    "script": params.script
                  }
                },
                "time": {
                  "aggs": {
                    "error_rate": {
                      "avg": {
                        "script": params.script
                      }
                    }
                  },
                  "date_histogram": {
                    "field": "collTime",
                    "interval": params.interval
                  }
                }
            }

        }
    }
}
