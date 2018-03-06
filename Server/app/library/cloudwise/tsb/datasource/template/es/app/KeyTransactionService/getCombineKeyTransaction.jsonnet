{
    "params": <?php echo json_encode($params,JSON_UNESCAPED_UNICODE);?>,
    "content":{
        "index": $.params.indexName,
        "body": {
          "aggs": {
            "combine": {
              "terms": {
                "script": "combine",
                "params": {
                  "combine": "combine"
                }
              },
              "aggs": {
                "resp_time": {
                        "avg": {
                            "field": "totalTime"
                        }
                    },
                     "normal": {
                            "filter": {
                                "and":[
                                    {
                                        "range":{
                                            "totalTime":{
                                                "to": $.params.aggs.setting.slow
                                            }
                                        }
                                    },
                                    {
                                        "term": {
                                            "isError": 0
                                        }
                                    },
                                    {
                                        "term":{
                                            "is_file_error":0
                                        }
                                    }
                                ]
                            }
                        },
                        "slow": {
                            "filter": {
                                "and":[
                                    {
                                        "range":{
                                            "totalTime":{
                                                "from": $.params.aggs.setting.slow,
                                                "to": $.params.aggs.setting.very_slow
                                            }
                                        }
                                    },
                                    {
                                        "term": {
                                            "isError": 0
                                        }
                                    },
                                    {
                                        "term":{
                                            "is_file_error":0
                                        }
                                    }
                                ]
                            }
                        },
                        "very_slow": {
                            "filter": {
                                "and":[
                                    {
                                        "range":{
                                            "totalTime":{
                                                "from": $.params.aggs.setting.very_slow
                                            }
                                        }
                                    },
                                    {
                                        "term": {
                                            "isError": 0
                                        }
                                    },
                                    {
                                        "term":{
                                            "is_file_error":0
                                        }
                                    }
                                ]
                            }
                        },
                    "error_info": {
                        "sum": {
                            "script":"doc['isError'].value==1 || doc['is_file_error'].value == 1  ? 1 : 0"
                        }
                    }
              }
            }
          },
          "query": {
              "filtered": {
                  "query": {
                      "regexp": {
                        "reqUri_raw": {
                          "value": $.params.aggs.reqUri_raw
                        }
                      }
                    },
                  "filter": {
                      "and": [
                          {
                              [i.parentKey]: {
                                  [i.key]: i.value
                              }
                          }
                          for i in $.params.query.filter
                      ]
                  }
              }
          },
          "size": 0
        }
    }

}