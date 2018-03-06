{
    "content": {
        "index": params.index,
            "body": {
                "size": params.doc_size,
                "query": common_es.addQuery(params.query)
            }
    }
}
