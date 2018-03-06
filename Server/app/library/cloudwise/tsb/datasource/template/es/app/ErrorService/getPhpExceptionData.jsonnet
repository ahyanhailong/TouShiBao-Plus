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
                  "nest_exceptions.file_raw",
                  "nest_exceptions.msg_raw",
                  "nest_exceptions.line",
                  "nest_parameters",
                  "request_id"
                ]
            },
            "aggs": {
                "exception_num": {
                  "aggs": {
                    "excepts": {
                      "terms": {
                        "script": "doc['nest_exceptions.file_raw'].value+'||||'+doc['nest_exceptions.line'].value+'||||'+doc['nest_exceptions.msg_raw'].value",
                        "size": 0
                      }
                    }
                  },
                  "nested": {
                    "path": "nest_exceptions"
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
