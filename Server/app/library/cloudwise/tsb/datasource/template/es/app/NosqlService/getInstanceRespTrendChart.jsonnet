{
    "content": {
        "index": params.index,
            "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "time": {
                    "date_histogram": {
                        "field": "collTime",
                        "interval": params.interval
                    },
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
                                        "method": {
                                            "terms": {
                                                "field": "nest_sub_methods.pst",
                                                "size": params.aggs_size
                                            },
                                            "aggs": {
                                                "time": {
                                                    "avg": {
                                                        "field": "nest_sub_methods.wt"
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
    }
}
