<?php
namespace cloudwise\tsb\datasource\constants;

/**
 * Elasticsearch Query function
 * Class EsQueryDslEnum
 *
 * @date   2017-09-26 6:00pm
 * @author jimmy.jin@cloudwise.com
 */
class EsQueryDslEnum
{
    const SORT_DESC = 'desc';
    const SORT_ASC = 'asc';

    const MATCH = 'match';
    const MATCH_ALL = 'match_all';
    const MATCH_PHRASE = 'match_phrase';
    const MATCH_PHRASE_PREFIX = 'match_phrase_prefix';

    const FILTERED = 'filtered';
    const FILTER = 'filter';
    const FILTERS = 'filters';

    const BOOL_AND = 'and';
    const BOOL_OR = 'or';
    const BOOL_MUST = 'must';
    const BOOL_NOT = 'not';
    const BOOL_SHOULD = 'should';
    const BOOL_MUST_NOT = 'must_not';

    const LT = 'lt';
    const LTE = 'lte';
    const GT = 'gt';
    const GTE = 'gte';

    const BOOL = 'bool';
    const TERM = 'term';
    const TERMS = 'terms';
    const RANGE = 'range';
    const REGEXP = 'regexp';

    const NESTED = 'nested';
    const PATH = 'path';
    const AGGS = 'aggs';

    const STATS = 'stats';
    const EXTENDED_STATS = 'extended_stats';
    const CARDINALITY = 'cardinality';
    const PERCENTILES = 'percentiles';  //正态分布，百分位计算
    const PERCENTILE_RANKS = 'percentile_ranks';  //正态分布，百分位计算

    const VALUE = 'value';
    const FIELD = 'field';
    const SCRIPT = 'script';
    const KEYED = 'keyed';

    const SUM = 'sum';
    const MAX = 'max';
    const AVG = 'avg';
    const MIN = 'min';

    const QUERY = 'query';
    const SIZE = 'size';
    const SORT = 'sort';
    const ORDER = 'order';
    const SOURCE = '_source';
    const INCLUDES = 'include';

    const PATTERN = 'pattern';
    const FLAGS = 'flags';

    //search_type
    const ES_QUERY_AND_FETCH = 'query_and_fetch';
    const ES_QUERY_THEN_FETCH = 'query_then_fetch';
    const ES_DFS_QUERY_AND_FETCH = 'dfs_query_and_fetch';
    const ES_DFS_QUERY_THEN_FETCH = 'dfs_query_then_fetch';


}