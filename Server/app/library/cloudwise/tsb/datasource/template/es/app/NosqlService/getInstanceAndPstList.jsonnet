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
                            "aggs":{
                                "instance":{
                                    "terms": {
                                        "field": "nest_sub_methods.instance_raw",
                                        "size": params.aggs_size
                                    },
                                    "aggs": {
                                        "pst": {
                                            "terms": {
                                                "field": "nest_sub_methods.pst",
                                                "size": params.aggs_size
                                            },
                                            "aggs":{
                                                "resp_time": {
                                                    "avg": {
                                                        "field": "nest_sub_methods.wt"
                                                    }
                                                }
                                            }
                                        },
                                        "resp_time": {
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
