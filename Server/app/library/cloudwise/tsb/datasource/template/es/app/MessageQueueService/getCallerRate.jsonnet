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
                                "term": {
                                    "nest_sub_methods.pst": params.pst
                                }
                            },
                            "aggs": {
                                "total": {
                                    "sum": {
                                        "field": "nest_sub_methods.wt"
                                    }
                                }
                            }
                        }
                    }
                },
                "uri": {
                    "terms": {
                        "field": "reqUri_raw",
                        "size": params.top_count,
                        "order": {
                            "nest>filter>total": "desc"
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
                                        "total": {
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
    }
}
