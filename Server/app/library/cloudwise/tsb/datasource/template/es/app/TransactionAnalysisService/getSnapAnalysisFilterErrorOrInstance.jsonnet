{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "list": {
                    "terms": {
                        "field": params.field,
                        "size": params.aggs_size
                    }
                }
            }
        }
    }
}
