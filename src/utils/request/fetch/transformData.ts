import defaults from './defaults';
import { FetchRequestConfig, FetchResponseHeaders, FetchResponseTransformer } from '@/utils/request/fetch/types';
import { isArray } from 'lodash';

/**
 * 转化返回的数据
 * @param fns       注入的拦截函数
 * @param response  响应结果体
 */
export function transformData<D extends FetchRequestConfig['transformRequest'] | FetchRequestConfig['transformResponse'], R extends Response>(fns: D, response?: R) {
  const config = this || defaults;
  const context = response || config;
  const headers = context.headers || (context.headers as FetchResponseHeaders);

  let data = context.data;

  if (!fns) {
    return data;
  }

  // 循环处理返回的数据，如果是数组，则循环处理
  (isArray(fns) ? fns : [fns]).forEach((fn: FetchResponseTransformer) => {
    data = fn.call(config, data, headers, response ? response.status : undefined);
  });

  return data;
}
