{
    "content": {
        "index": params.index,
            "body": {
                "size": 0,
                "query": common_es.addQuery(params.query),
                "aggs": {
                    "uri": {
                        "aggs": {
                            "error": {
                                "stats": {
                                    "script": "doc['isError'].value ==1 || doc['is_file_error'].value ? 1:0"
                                }
                            },
                            "exception": {
                                "stats": {
                                    "script": "doc['isException'].value ==1 ? 1:0"
                                }
                            },
                            "resp_time": {
                                "aggs": {
                                    "time": {
                                        "avg": {
                                            "field": "totalTime"
                                        }
                                    }
                                },
                                "filter": {
                                    "term": {
                                        "isError": 0
                                    }
                                }
                            },
                            "slow": {
                                "stats": {
                                    "script": "doc['isError'].value == 0 && doc['isException'].value == 0 && doc['totalTime'].value > "+params.slow+" && doc['totalTime'].value <= "+params.very_slow+" ? 1:0"
                                }
                            },
                            "very_slow": {
                                "stats": {
                                    "script": "doc['isError'].value == 0 && doc['isException'].value == 0 && doc['totalTime'].value > "+params.very_slow+" ? 1:0"
                                }
                            }
                        },
                        "terms": {
                            "field": "reqUri_raw",
                            "order": {
                                "resp_time>time": "desc"
                            },
                            "size": params.aggs_size
                        }
                    }
                }
            }
    }
}
