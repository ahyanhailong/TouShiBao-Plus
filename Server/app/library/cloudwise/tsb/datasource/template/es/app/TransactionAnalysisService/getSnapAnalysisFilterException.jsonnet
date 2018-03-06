{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "nest": {
                    "nested": {
                        "path": params.nest_path
                    },
                    "aggs": {
                        "list": {
                            "terms": {
                                "field": params.nest_field,
                                "size": params.aggs_size
                            }
                        }
                    }
                }
            }
        }
    }
}
