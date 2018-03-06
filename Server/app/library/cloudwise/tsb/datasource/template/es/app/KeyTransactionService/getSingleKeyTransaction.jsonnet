{
    "params": <?php echo json_encode($params,JSON_UNESCAPED_UNICODE);?>,
    "content":{
        "index": $.params.index,
        "body": {
            "size": 0,
            "query": {
                "filtered": {
                    "filter": {
                        "and": [
                            {
                                [i.type]: {
                                    [i.field]: i.value
                                }
                            }
                            for i in $.params.query
                        ]
                    }
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
                                            "to": $.params.setting.slow
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
                                            "from": $.params.setting.slow,
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
                                            "from": $.params.setting.very_slow
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
                        "script": "doc['isError'].value==1 || doc['is_file_error'].value == 1 ? 1 : 0"
                      }
                    },
                "exc_info": {
                  "sum": {
                    "field": "isException"
                  }
                }
            }
        }
    }

}