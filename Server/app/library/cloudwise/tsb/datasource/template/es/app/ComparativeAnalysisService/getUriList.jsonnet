{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "uri": {
                  "terms": {
                    "field": "reqUri_raw",
                    "include": {
                      "flags": "CASE_INSENSITIVE",
                      "pattern": params.pattern
                    },
                    "order": {
                      "_count": "desc"
                    },
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
