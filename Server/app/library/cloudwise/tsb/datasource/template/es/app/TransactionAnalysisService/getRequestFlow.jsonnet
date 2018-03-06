{
    "content": {
        "index": params.index,
        "body": {
            "size": params.doc_size,
            "_source": {
                "include": [
                    "totalTime",
                    "r_id",
                    "req_flow_raw",
                    "isError",
                    "host_id_from",
                    "service_type_from",
                    "app_id",
                ]
            },
            "query": common_es.addQuery(params.query),
        }
    }
}
