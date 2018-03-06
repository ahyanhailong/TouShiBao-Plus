{
    "content": {
        "index": params.index,
        "body": {
            "size": params.page_size,
            "query": common_es.addQuery(params.query),
            "_source": {
                "include": [
                  "reqUri_raw",
                  "nest_sub_methods.errorMsg_raw",
                  "nest_sub_methods.exception",
                  "nest_sub_methods.exstack_raw",
                  "collTime",
                  "nest_parameters",
                  "request_id",
                  "host_instance_raw"
                ]
            },
            "aggs": {
                "nest": {
                  "aggs": {
                    "exceptionNum": {
                      "filter": {
                        "and": {
                          "filters": [
                            {
                              [i.type]: {
                                [i.field]: i.value
                              }
                            }
                            for i in params.filter.nest
                          ]
                        }
                      }
                    }
                  },
                  "nested": {
                    "path": "nest_sub_methods"
                  }
                }
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