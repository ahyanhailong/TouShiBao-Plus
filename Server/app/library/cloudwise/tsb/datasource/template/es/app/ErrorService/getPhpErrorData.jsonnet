{
    "content": {
        "index": params.index,
        "body": {
            "size": params.page_size,
            "query": common_es.addQuery(params.query),
            "_source": {
                "include": [
                    "reqUri_raw",
                    "collTime",
                    "nest_parameters",
                    "request_id",
                    "error"
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
