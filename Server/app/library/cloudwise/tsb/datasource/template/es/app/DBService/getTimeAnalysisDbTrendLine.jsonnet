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
                            "leach": {
                                "aggs": {
                                    "time": {
                                        "aggs": {
                                            "wt": {
                                                "avg": {
                                                    "field": "nest_sub_methods.wt"
                                                }
                                            }
                                        },
                                        "date_histogram": {
                                            "field": "nest_sub_methods.collTime",
                                            "interval": params.interval
                                        }
                                    }
                                },
                                "filter": {
                                    "and": {
                                        "filters": common_es.addFilters(params.nest_query)
                                    }
                                }
                            }
                        }
                    }
                }
            }
    }
}
