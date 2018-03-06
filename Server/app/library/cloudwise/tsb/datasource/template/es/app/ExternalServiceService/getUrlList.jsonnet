{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "nest": {
                  "aggs": {
                    "condition": {
                      "aggs": {
                        "ct": {
                          "avg": {
                            "field": "nest_sub_methods.wt"
                          }
                        },
                        "domain": {
                          "aggs": {
                            "ct": {
                              "stats": {
                                "field": "nest_sub_methods.wt"
                              }
                            },
                            "error": {
                              "sum": {
                                "field": "nest_sub_methods.exception"
                              }
                            }
                          },
                          "terms": {
                            "order": {
                              [params.order]: "desc"
                            },
                            "script": "doc['nest_sub_methods.domain_raw'].value+'###'+doc['nest_sub_methods.port'].value",
                            "size": params.aggs_size
                          }
                        },
                        "error": {
                          "sum": {
                            "field": "nest_sub_methods.exception"
                          }
                        }
                      },
                      "filter": {
                        "and": {
                          "filters": [
                            {
                              "term": {
                                "nest_sub_methods.pst": [
                                  1101
                                ]
                              }
                            }
                          ]
                        }
                      }
                    }
                  },
                  "nested": {
                    "path": "nest_sub_methods"
                  }
                }
            }

        }
    }
}
