{
    "content": {
        "index": params.index,
            "body": {
                "size": params.aggs_size,
                "sort": {
                    [params.order]: params.sort
                },
                "_source": "request_id",
                "query": common_es.addQuery(params.query)
            }
    }
}
