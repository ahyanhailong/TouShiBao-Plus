{
    "content": {
        "body": {
            "size": params.doc_size,
                "index": params.index,
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
                                }
                            }
                        }
                    }
                }
        }
    }
}
