{
    "content": {
        "index": params.index,
        "type": params.type,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "host": {
                    "aggs": {
                        "cpu_burden": {
                            "avg": {
                                "field": "5mins"
                            }
                        },
                        "cpu_rate": {
                            "avg": {
                                "field": "idle"
                            }
                        },
                        "process_num": {
                            "avg": {
                                "field": "totalCount"
                            }
                        },
                        "ram_rate": {
                            "avg": {
                                "field": "memUsedPercent"
                            }
                        }
                    },
                    "terms": {
                        "field": "target_id",
                        "size": params.aggs_size,
                        "order": {
                            [params.order]: params.sort
                        }
                    }
                },
                "host_num": {
                    "cardinality": {
                        "field": "target_id"
                    }
                }
            }
        }
    }
}
