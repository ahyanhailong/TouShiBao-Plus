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
                          "stats": {
                            "field": "nest_sub_methods.wt"
                          }
                        },
                        "reverse": {
                          "reverse_nested": {}
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
                },
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
                            "reverse": {
                              "reverse_nested": {}
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
