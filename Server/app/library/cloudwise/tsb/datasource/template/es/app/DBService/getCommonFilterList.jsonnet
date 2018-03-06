{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "leach": {
                  "aggs": {
                    "dimension": {
                      "terms": {
                        "field": params.terms_key,
                        "size": params.aggs_size
                      }
                    }
                  },
                  "filter": {
                    "regexp": {
                      [params.terms_key]: {
                        "value": params.filter_regexp
                      }
                    }
                  }
                }
            }
        }
    }
}
