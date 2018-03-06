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
                                "instance": {
                                    "terms": {
                                        "field": "nest_sub_methods.instance_raw",
                                        "order": {
                                            [params.order]: params.sort
                                        },
                                        "size": params.aggs_size
                                    },
                                    "aggs": {
                                        "flow": {
                                            "sum": {
                                                "field": "nest_sub_methods.fl"
                                            }
                                        },
                                        "resp": {
                                            "avg": {
                                                "field": "nest_sub_methods.wt"
                                            }
                                        },
                                        "dbn": {
                                            "terms": {
                                                "field": "nest_sub_methods.dbn_raw",
                                                "order": {
                                                    "_count": "desc"
                                                },
                                                "size": params.aggs_size
                                            },
                                            "aggs": {
                                                "flow": {
                                                    "sum": {
                                                        "field": "nest_sub_methods.fl"
                                                    }
                                                },
                                                "resp": {
                                                    "avg": {
                                                        "field": "nest_sub_methods.wt"
                                                    }
                                                }
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
