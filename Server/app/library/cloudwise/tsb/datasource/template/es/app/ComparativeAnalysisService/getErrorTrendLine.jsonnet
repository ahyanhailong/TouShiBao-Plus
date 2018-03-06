{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "exception_sum": {
                  "sum": {
                    "script": "doc['isError'].value==1 || doc['is_file_error'].value == 1  ? 1 : 0"
                  }
                },
                "time": {
                  "aggs": {
                    "exception": {
                      "sum": {
                        "script": "doc['isError'].value==1 || doc['is_file_error'].value == 1  ? 1 : 0"
                      }
                    }
                  },
                  "date_histogram": {
                    "field": "collTime",
                    "interval": params.interval
                  }
                }
            }

        }
    }
}
