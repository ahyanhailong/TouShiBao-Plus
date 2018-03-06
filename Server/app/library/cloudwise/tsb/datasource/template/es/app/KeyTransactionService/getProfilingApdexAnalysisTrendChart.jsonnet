{
    "content": {
        "index": params.index,
        "body": {
            "size": 0,
            "query": common_es.addQuery(params.query),
            "aggs": {
                "time": {
                    "date_histogram": {
                        "field": "collTime",
                        "interval": params.interval
                    },
                    "aggs": {
                        "one_t": {
                            "filter": {
                                "range": {
                                    "totalTime": {
                                        "to": params.aggs.oneT.to
                                    }
                                }
                            }
                        },
                        "four_t": {
                            "filter": {
                                "range": {
                                    "totalTime": {
                                        "from": params.aggs.fourT.from,
                                        "to": params.aggs.fourT.to
                                    }
                                }
                            }
                        },
                        "over_t": {
                            "filter": {
                                "range": {
                                    "totalTime": {
                                        "from": params.aggs.overT.from
                                    }
                                }
                            }
                        }
                    }
                },
                "one_t": {
                    "filter": {
                        "range": {
                            "totalTime": {
                                "to": params.aggs.oneT.to
                            }
                        }
                    }
                },
                "four_t": {
                    "filter": {
                        "range": {
                            "totalTime": {
                                "from": params.aggs.fourT.from,
                                "to": params.aggs.fourT.to
                            }
                        }
                    }
                },
                "over_t": {
                    "filter": {
                        "range": {
                            "totalTime": {
                                "from": params.aggs.overT.from
                            }
                        }
                    }
                }
            }

        }
    }
}
