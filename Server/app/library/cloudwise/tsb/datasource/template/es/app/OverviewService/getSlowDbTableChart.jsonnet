{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "nest":{
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
                                "db":{
                                    "terms": {
                                        "script": "doc['nest_sub_methods.dbn_raw'].value+'#on#'+doc['nest_sub_methods.db_table'].value",
                                        "size": params.aggs_size
                                    },
                                    "aggs": {
                                        "time": {
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
