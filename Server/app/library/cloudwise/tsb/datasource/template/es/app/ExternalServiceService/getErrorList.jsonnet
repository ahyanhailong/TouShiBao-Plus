{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "uri": {
                  "aggs": {
                    "nest": {
                      "aggs": {
                        "condition": {
                          "aggs": {
                            "ct": {
                              "stats": {
                                "field": "nest_sub_methods.wt"
                              }
                            },
                            "error_type": {
                              "aggs": {
                                "time": {
                                  "stats": {
                                    "field": "nest_sub_methods.collTime"
                                  }
                                }
                              },
                              "terms": {
                                "field": "nest_sub_methods.errorMsg_raw",
                                "size": params.aggs_size
                              }
                            }
                          },
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
                  "terms": {
                    "field": "reqUri_raw",
                    "include": {
                      "flags": "CANON_EQ|CASE_INSENSITIVE",
                      "pattern": params.patten
                    },
                    "order": {
                      "nest>condition": "desc"
                    },
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
