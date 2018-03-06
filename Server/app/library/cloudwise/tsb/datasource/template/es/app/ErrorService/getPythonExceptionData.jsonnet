{
    "content": {
        "index": params.index,
        "body": {
            "size": params.page_size,
            "query": common_es.addQuery(params.query),
            "_source": {
                "include": [
                    "reqUri_raw",
                    "httpResponseCode",
                    "collTime",
                    "nest_exceptions.excp_raw",
                    "nest_exceptions.excTraceback_raw",
                    "nest_parameters",
                    "request_id",
                    "host_instance_raw"
                ]
            },
            "from": params.offset,
            "sort": {
                "collTime": {
                  "order": "desc"
                }
            }
        }
    }
}
