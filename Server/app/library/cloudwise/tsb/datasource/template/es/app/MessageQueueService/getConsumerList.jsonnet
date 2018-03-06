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
                            "aggs": {
                                "consumer": {
                                    "terms": {
                                        "order": {
                                            "_count": "desc"
                                        },
                                        "script": "doc['nest_sub_methods.instance_raw'].value+'#on#'+doc['nest_sub_methods.dbn_raw'].value+'#on#'+doc['nest_sub_methods.app_id'].value",
                                        "size": params.aggs_size
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
