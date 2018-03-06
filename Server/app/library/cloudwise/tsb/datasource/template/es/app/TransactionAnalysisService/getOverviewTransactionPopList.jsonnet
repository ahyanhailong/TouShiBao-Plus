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
                            "size": params.aggs_size
                        },
                        "aggs": {
                            "time": {
                                "stats": {
                                    "field": "totalTime"
                                }
                            },
                            "collect_time":{
                                "stats": {
                                    "field": "collTime"
                                }
                            }
                        }
                    }
                }
            }
    }
}
