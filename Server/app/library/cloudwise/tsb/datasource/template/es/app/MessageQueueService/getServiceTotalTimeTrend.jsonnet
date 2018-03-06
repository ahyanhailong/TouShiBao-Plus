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
                            "filter": {
                                "and": {
                                    "filters": common_es.addFilters(params.nest_query)
                                }
                            },
                            "aggs": {
                                "instance": {
                                    "terms": {
                                        "field": "nest_sub_methods.instance_raw",
                                        "order": {
                                            "order": "desc"
                                        },
                                        "size": params.aggs_size
                                    },
                                    "aggs": {
                                        "order": {
                                            "sum": {
                                                "field": "nest_sub_methods.wt"
                                            }
                                        },
                                        "time": {
                                            "date_histogram": {
                                                "field": "nest_sub_methods.collTime",
                                                "interval": params.interval
                                            },
                                            "aggs": {
                                                "time": {
                                                    "sum": {
                                                        "field": "nest_sub_methods.wt"
                                                    }
                                                }
                                            }
                                        }
                                    }
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
