import defaults from './defaults';
import { FetchRequestConfig } from './types';
import FetchHeaders from './FetchHeaders';

import { forEach } from '@/utils/request/utils';

/**
 * 转化返回的数据
 * @param fns       注入的拦截函数
 * @param response  响应结果体
 */
export function transformData<D extends FetchRequestConfig['transformRequest'] | FetchRequestConfig['transformResponse'], R extends Response>(fns: D, response?: R) {
  const config = this || defaults;
  const context = response || config;
  const headers = FetchHeaders.from(context.headers);
  let data = context.data;
  if (!fns) {
    return data;
  }
  // 循环处理返回的数据，如果是数组，则循环处理
  forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();
  return data;
}
