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
                                    "methods":{
                                        "terms": {
                                            "field": "nest_sub_methods.mn_raw",
                                            "size": 3
                                        },
                                        "aggs": {
                                            "pt": {
                                                "sum": {
                                                    "field": "nest_sub_methods.pt"
                                                }
                                            },
                                            "nest":{
                                                "reverse_nested": {
                                                    "path":"nest_sub_methods"
                                                }
                                            },
                                            "r_nid":{
                                                "terms": {
                                                    "field": "nest_sub_methods.r_nid_raw",
                                                    "size": 5,
                                                    "order": {
                                                        "pt": "desc"
                                                    }
                                                },
                                                "aggs": {
                                                    "pt": {
                                                        "sum": {
                                                            "field": "nest_parameters.pt"
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
