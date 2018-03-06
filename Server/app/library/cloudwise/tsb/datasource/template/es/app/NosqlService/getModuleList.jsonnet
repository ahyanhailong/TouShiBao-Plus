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
                                "terms": {
                                    "nest_sub_methods.service_type": params.service_types
                                }
                            },
                            "aggs":{
                                "service_type":{
                                    "terms": {
                                        "field": "nest_sub_methods.service_type",
                                        "size": params.aggs_size
                                    },
                                    "aggs": {
                                        "pst": {
                                            "terms": {
                                                "field": "nest_sub_methods.pst",
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
    }
}
