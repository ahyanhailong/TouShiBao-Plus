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
                        "filter": {
                            "filter": {
                                "terms": {
                                    "nest_sub_methods.service_type": params.service_types
                                }
                            },
                            "aggs": {
                                "sql": {
                                    "terms": {
                                        "field": "nest_sub_methods.ps_raw",
                                        "size": params.top_count,
                                        "order": {
                                            "resp_time": "desc"
                                        }
                                    },
                                    "aggs": {
                                        "resp_time": {
                                            "avg": {
                                                "field": "nest_sub_methods.wt"
                                            }
                                        },
                                        "time": {
                                            "date_histogram": {
                                                "field": "nest_sub_methods.collTime",
                                                "interval": params.interval
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
