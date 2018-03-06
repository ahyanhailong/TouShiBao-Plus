{
    "content": {
        "index": params.index,
        "type": params.type,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "groupBy": {
                  "aggs": {
                    "15min": {
                      "avg": {
                        "field": "15mins"
                      }
                    },
                    "cpu_burden": {
                      "avg": {
                        "field": "5mins"
                      }
                    },
                    "cpu_rate": {
                      "avg": {
                        "field": "idle"
                      }
                    },
                    "process_num": {
                      "avg": {
                        "field": "totalCount"
                      }
                    },
                    "ram_rate": {
                      "avg": {
                        "field": "memUsedPercent"
                      }
                    },
                    "wait": {
                      "avg": {
                        "field": "wait"
                      }
                    }
                  },
                  "terms": {
                    "field": "target_id",
                    "order": {
                      [params.order]: params.sort
                    },
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
