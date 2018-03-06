{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "date_range": {
                  "aggs": {
                    "nest": {
                      "aggs": {
                        "condition": {
                          "aggs": {
                            "domain": {
                              "aggs": {
                                "ct": {
                                  "stats": {
                                    "field": "nest_sub_methods.wt"
                                  }
                                },
                                "error": {
                                  "stats": {
                                    "script": "doc['nest_sub_methods.exception'].value == 1 ? 1 : 0"
                                  }
                                },
                                "rever": {
                                  "aggs": {
                                    "NAME": {
                                      "terms": {
                                        "field": "request_id",
                                        "size": 10
                                      }
                                    }
                                  },
                                  "reverse_nested": {}
                                }
                              },
                              "terms": {

                                "script": "doc['nest_sub_methods.domain_raw'].value+':'+doc['nest_sub_methods.port'].value",
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
                  "date_histogram": {
                    "field": "collTime",
                    "interval": params.interval
                  }
                }
            }

        }
    }
}
