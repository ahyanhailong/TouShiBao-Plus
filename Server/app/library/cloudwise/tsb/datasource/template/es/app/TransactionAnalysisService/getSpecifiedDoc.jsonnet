{
    "content": {
        "index": params.index,
            "body": {
                "sort": {
                    [params.order]: {
                        "order": params.sort
                    }
                },
                "size": params.size,
                "from": params.from,
                "query": common_es.addQuery(params.query)
            }
    }
}
