{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "intance": {
                  "terms": {
                    "field": "host_instance_raw",
                    "size": 5,
                    "order": {
                      "_count": "desc"
                    }
                  }
                }
            }

        }
    }
}
