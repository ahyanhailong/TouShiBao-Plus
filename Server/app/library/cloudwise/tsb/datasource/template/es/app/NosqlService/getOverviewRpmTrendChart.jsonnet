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
                                "group": {
                                    "aggs": {
                                        "time": {
                                            "date_histogram": {
                                                "field": "nest_sub_methods.rt",
                                                "interval": params.interval
                                            }
                                        }
                                    },
                                    "terms": {
                                        "field": params.terms_field,
                                        "size": 5,
                                        "order": {
                                            "_count": "desc"
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
