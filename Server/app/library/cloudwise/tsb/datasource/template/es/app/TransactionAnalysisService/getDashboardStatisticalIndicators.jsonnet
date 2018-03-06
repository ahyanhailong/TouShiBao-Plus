{
    "content": {
        "index": params.index,
            "body": {
                "size": 0,
                "query": common_es.addQuery(params.query),
                "aggs": {
                    "total_time":{
                        "avg": {
                            "field": "totalTime"
                        }
                    },
                    "nest": {
                        "nested": {
                            "path": "nest_sub_methods"
                        },
                        "aggs": {
                            "api_time": {
                                "aggs": {
                                    "time": {
                                        "sum": {
                                            "field": "nest_sub_methods.pt"
                                        }
                                    }
                                },
                                "filter": {
                                    "term": {
                                        "nest_sub_methods.pst": params.pst_filter
                                    }
                                }
                            },
                            "db_time": {
                                "aggs": {
                                    "time": {
                                        "sum": {
                                            "field": "nest_sub_methods.pt"
                                        }
                                    }
                                },
                                "filter": {
                                    "terms": {
                                        "nest_sub_methods.service_type": params.db_filter
                                    }
                                }
                            },
                            "code_time": {
                                "aggs": {
                                    "time": {
                                        "sum": {
                                            "field": "nest_sub_methods.pt"
                                        }
                                    }
                                },
                                "filter": {
                                    "not": {
                                        "filter": {
                                            "and": {
                                                "filters": [
                                                {
                                                    "term": {
                                                        "nest_sub_methods.pst": params.pst_filter
                                                    }
                                                },
                                                {
                                                    "terms": {
                                                        "nest_sub_methods.service_type": params.db_filter
                                                    }
                                                }
                                                ]
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
