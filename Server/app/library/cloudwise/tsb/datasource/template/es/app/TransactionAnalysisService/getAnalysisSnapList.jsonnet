{
    "content": {
        "index": params.index,
            "body": {
                "size": params.aggs_size,
                "sort": {
                    [params.order]: params.sort
                },
                "query": common_es.addQuery(params.query)
            }
    }
}
