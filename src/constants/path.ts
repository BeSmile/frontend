import queryString from 'query-string';

type queryParamsType = {
  debug?: boolean | string;
};

export const QUERY_PARAMS: queryParamsType = queryString.parse(window.location.search);
// 是否是DEBUG模式
export const IS_DEBUG = Boolean(QUERY_PARAMS?.debug) && QUERY_PARAMS?.debug === 'true';
