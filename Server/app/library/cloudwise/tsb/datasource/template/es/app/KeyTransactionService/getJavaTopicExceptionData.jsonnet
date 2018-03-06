{
    "content": {
        "index": params.index,
            "body": {
                "size": 0,
                "query": {
                    "filtered": {
                      "filter": {
                        "and": {
                          "filters": [
                            {
                                [i.type]: {
                                    [i.field]: i.value
                                }
                            },
                            for i in params.query
                          ]
                        }
                      },
                      "query": {
                          "filtered": {
                            "filter": {
                              "nested": {
                                "path": "nest_sub_methods",
                                "query": {
                                  "term": {
                                    "nest_sub_methods.exception": {
                                      "value": 1
                                    }
                                  }
                                }
                              }
                            }
                          }
                      }
                    }
                },
                "aggs": {
                    "url": {
                      "aggs": {
                        "nest": {
                          "aggs": {
                            "filter": {
                              "aggs": {
                                "errorMsg": {
                                  "aggs": {
                                    "exceptionCount": {
                                      "sum": {
                                        "field": "nest_sub_methods.exception"
                                      }
                                    },
                                    "reverse": {
                                      "aggs": {
                                        "time": {
                                          "stats": {
                                            "field": "collTime"
                                          }
                                        }
                                      },
                                      "reverse_nested": {}
                                    }
                                  },
                                  "terms": {
                                    "field": "nest_sub_methods.errorMsg_raw"
                                  }
                                }
                              },
                              "filter": {
                                "term": {
                                  "nest_sub_methods.exception": 1
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
                        "script": "doc['reqUrl_raw'].value+'||||'+doc['reqUri_raw'].value",
                        "size": params.aggs_size
                      }
                    }
                  }

            }
    }
}
