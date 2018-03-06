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
                        "size": 5,
                        "order": {
                            "nest>filter>wt": "desc"
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
                                        "wt": {
                                            "sum": {
                                                "field": "nest_sub_methods.wt"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
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
                                "wt": {
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

    }
}
