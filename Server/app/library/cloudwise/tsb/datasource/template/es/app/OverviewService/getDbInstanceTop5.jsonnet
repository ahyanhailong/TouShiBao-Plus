{
    "content": {
        "index": params.index,
            "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "nest": {
                    "nested": {
                        "path": "nest_sub_methods"
                    },
                    "aggs": {
                        "instance": {
                            "terms": {
                                "field": "nest_sub_methods.instance_raw",
                                "size": params.top_count
                            },
                            "aggs": {
                                "time": {
                                    "avg": {
                                        "field": "nest_sub_methods.wt"
                                    }
                                },
                                "normal":{
                                    "filter": {
                                        "range": {
                                            "nest_sub_methods.wt": {
                                                "lte": params.slow
                                            }
                                        }
                                    }
                                },
                                "slow":{
                                    "filter": {
                                        "range": {
                                            "nest_sub_methods.wt": {
                                                "gt": params.slow,
                                                "lte":params.very_slow
                                            }
                                        }
                                    }
                                },
                                "very_slow":{
                                    "filter": {
                                        "range": {
                                            "nest_sub_methods.wt": {
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
