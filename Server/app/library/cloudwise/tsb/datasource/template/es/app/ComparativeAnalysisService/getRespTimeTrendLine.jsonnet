{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "resp_time": {
                  "avg": {
                    "field": "totalTime"
                  }
                },
                "time": {
                  "aggs": {
                    "resp_time": {
                      "stats": {
                        "field": "totalTime"
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
