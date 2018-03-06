{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "time": {
                  "date_histogram": {
                    "field": "collTime",
                    "interval": "1h"
                  }
                }
            }

        }
    }
}
