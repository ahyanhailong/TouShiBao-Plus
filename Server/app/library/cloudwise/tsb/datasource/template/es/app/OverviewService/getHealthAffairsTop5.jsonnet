{
    "content": {
        "index": params.index,
            "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "filter": {
                    "filter": {
                        "and": {
                            "filters": [
                            {
                                "term": {
                                    "isError": 0
                                }
                            },
                            {
                                "term": {
                                    "is_file_error": 0
                                }
                            }
                            ]
                        }
                    },
                    "aggs": {
                        "uri": {
                            "terms": {
                                "field": "reqUri_raw",
                                "size": params.top_count,
                                "order": {
                                    "time": "desc"
                                }
                            },
                            "aggs": {
                                "time": {
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
                                                "lte": params.very_slow,
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
