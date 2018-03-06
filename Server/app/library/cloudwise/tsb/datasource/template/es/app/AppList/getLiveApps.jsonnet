{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "app_id": {
                  "terms": {
                    "field": "app_id",
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
