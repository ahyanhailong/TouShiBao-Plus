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
                                "and": {
                                    "filters": common_es.addFilters(params.nest_query)
                                }
                            },
                            "aggs": {
                                "time": {
                                    "date_histogram": {
                                        "field": "nest_sub_methods.collTime",
                                        "interval": params.interval
                                    },
                                    "aggs": {
                                        "flow": {
                                            "sum": {
                                                "field": "nest_sub_methods.fl"
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
