{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "url": {
                  "aggs": {
                    "nest": {
                      "aggs": {
                        "excep": {
                          "aggs": {
                            "rever": {
                              "aggs": {
                                "resp": {
                                  "stats": {
                                    "field": "collTime"
                                  }
                                }
                              },
                              "reverse_nested": {}
                            }
                          },
                          "terms": {
                            "script": "doc['nest_exceptions.file_raw'].value+'||||'+doc['nest_exceptions.line'].value+'||||'+doc['nest_exceptions.msg_raw'].value",
                            "size": params.aggs_size
                          }
                        }
                      },
                      "nested": {
                        "path": "nest_exceptions"
                      }
                    },
                    "resp": {
                      "stats": {
                        "field": "collTime"
                      }
                    }
                  },
                  "terms": {
                    "params": {
                      "combine": "combine"
                    },
                    "script": "doc['reqUrl_raw'].value+'||||'+doc['reqUri_raw'].value",
                    "size": params.aggs_size
                  }
                }
            }

        }
    }
}
