{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "nest": {
                    "aggs": {
                        "filter": {
                            "aggs": {
                                "time": {
                                    "date_histogram": {
                                        "field": "nest_sub_methods.rt",
                                        "interval": params.interval
                                    },
                                    "aggs": {
                                        "resp_time": {
                                            "avg": {
                                                "field": "nest_sub_methods.wt"
                                            }
                                        }
                                    }
                                }
                            },
                            "filter": {
                                "and": {
                                    "filters": common_es.addFilters(params.nest_query)
                                }
                            }
                        }
                    },
                    "nested": {
                        "path": "nest_sub_methods"
                    }
                }
            }
        }

    }
}
