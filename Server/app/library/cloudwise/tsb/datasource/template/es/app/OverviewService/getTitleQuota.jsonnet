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
                "normal":{
                    "filter": {
                        "range": {
                            "totalTime": {
                                "lte": params.slow
                            }
                        }
                    }
                },
                "slow":{
                    "filter": {
                        "range": {
                            "totalTime": {
                                "gt": params.slow,
                                "lte": params.very_slow
                            }
                        }
                    }
                },
                "very_slow":{
                    "filter": {
                        "range": {
                            "totalTime": {
                                "gt": params.very_slow
                            }
                        }
                    }
                },
                "error":{
                    "sum": {
                        "script": "doc['isError'].value == 1 || doc['is_file_error'].value == 1 ? 1 : 0"
                    }
                },
                "exception":{
                    "sum": {
                        "field": "isException"
                    }
                }
            }
        }
    }
}
