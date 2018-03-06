{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "uri": {
                    "terms": {
                        "field": "reqUri_raw",
                        "size": params.aggs_size,
                        "order": {
                            "nest>filter>time": "desc"
                        }
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
                                        "pst": {
                                            "terms": {
                                                "field": "nest_sub_methods.pst",
                                                "size" : params.aggs_size,
                                                "order": {
                                                    "time": "desc"
                                                }
                                            },
                                            "aggs": {
                                                "time": {
                                                    "avg": {
                                                        "field": "nest_sub_methods.wt"
                                                    }
                                                }
                                            }
                                        },
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
