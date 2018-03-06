{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                [i.label]: {
                    "filter": {
                        "range": {
                            "totalTime":
                            if(i.from == i.to) then
                            {
                                "gte": i.from,
                                "lte": i.to
                            }
                            else
                            {
                                "gt": i.from,
                                "lte": i.to
                            }
                        }
                    }

                }
                for i in params.range_list
            }

        }
    }
}
