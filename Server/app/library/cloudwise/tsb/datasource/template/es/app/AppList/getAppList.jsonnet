{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "app_id": {
                  "aggs": {
                    "error": {
                      "stats": {
                        "script": "doc['isError'].value==1 || doc['is_file_error'].value == 1  ? 1 : 0"
                      }
                    },
                    "resp_time": {
                      "avg": {
                        "field": "totalTime"
                      }
                    }
                  },
                  "terms": {
                    "field": "app_id",
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
