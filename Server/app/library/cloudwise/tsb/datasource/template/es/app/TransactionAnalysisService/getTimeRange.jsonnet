{
    "content": {
        "index": params.index,
            "body": {
                "size": 0,
                "query": common_es.addQuery(params.query),
                "aggs": {
                    "time": {
                        "stats": {
                            "field":"totalTime"
                        }
                    }
                }

            }
    }
}
