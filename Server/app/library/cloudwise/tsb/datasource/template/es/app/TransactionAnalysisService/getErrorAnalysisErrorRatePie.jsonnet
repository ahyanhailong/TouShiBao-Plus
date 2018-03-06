{
    "content": {
        "index": params.index,
            "body": {
                "size": 0,
                "query": common_es.addQuery(params.query),
                "aggs": {
                    "error": {
                        "terms": {
                            "field": "httpResponseCode",
                            "size": params.aggs_size
                        }
                    },
                    "file_error": {
                        "terms": {
                            "field": "error.msg_raw",
                            "size": params.aggs_size
                        }
                    }
                }

            }
    }
}
