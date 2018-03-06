{
    "content": {
        "index": params.index,
        "body": {
          "query": common_es.addQuery(params.query),
          "aggs": {
            "http": {
              "filter": {
                "range": {
                  "httpResponseCode": {
                    "gte": 400
                  }
                }
              },
              "aggs": {
                "error_code": {
                  "terms": {
                    "field": "httpResponseCode",
                    "size": params.aggs_size
                  },
                  "aggs": {
                    "time": {
                      "stats": {
                        "field": "collTime"
                      }
                    }
                  }
                }
              }
            },
            "error_file": {
              "filter": {
                "exists": {
                  "field": "error"
                }
              },
              "aggs": {
                "error_msg": {
                  "terms": {
                    "field": "error.msg_raw",
                    "size": params.aggs_size
                  },
                  "aggs": {
                    "time": {
                      "stats": {
                        "field": "collTime"
                      }
                    }
                  }
                }
              }
            }
          },
          "size": 0
        }
    }
}