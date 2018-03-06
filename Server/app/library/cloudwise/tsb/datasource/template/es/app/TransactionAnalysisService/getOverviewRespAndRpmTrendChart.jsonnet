{
  "content": {
    "index": params.index,
    "body": {
      "size": 0,
      "query": common_es.addQuery(params.query),
      "aggs": {
          "time_range": {
            "aggs": {
              "error": {
                "stats": {
                  "script": "doc['isError'].value ==1 || doc['is_file_error'].value ? 1:0"
                }
              },
              "request": {
                "filter": {
                  "and": {
                    "filters": [
                      {
                        "term": {
                          "isError": 0
                        }
                      },
                      {
                        "term": {
                          "is_file_error": 0
                        }
                      }
                    ]
                  }
                },
                "aggs": {
                  "normal": {
                    "filter": {
                      "range": {
                        "totalTime": {
                          "lte": params.slow
                        }
                      }
                    }
                  },
                  "slow": {
                    "filter": {
                      "range": {
                        "totalTime": {
                          "gt": params.slow,
                          "lte": params.very_slow
                        }
                      }
                    }
                  },
                  "very_slow": {
                    "filter": {
                      "range": {
                        "totalTime": {
                          "gt": params.very_slow
                        }
                      }
                    }
                  },
                  "resp_time": {
                    "avg": {
                      "field": "totalTime"
                    }
                  },
                  "percent_line": {
                    "filter": {
                      "range": {
                        "totalTime": {
                          "gte": params.percent_time
                        }
                      }
                    },
                    "aggs": {
                      "resp_time": {
                        "avg": {
                          "field": "totalTime"
                        }
                      }
                    }
                  }
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