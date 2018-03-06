{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "nest":{
                    "nested": {
                        "path": params.nest_path
                    },
                    "aggs": {
                        "exception": {
                            "terms": {
                                "field": params.nest_field,
                                "size": 0
                            }
                        }
                    }
                }
            }

        }
    }
}
