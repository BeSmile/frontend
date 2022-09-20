import defaults from './defaults';
import { FetchResponseTransformer } from '@utils/request/fetch/types';
import { isArray } from 'lodash';

// 转化返回的数据
export function transformData(
    fns: FetchResponseTransformer | FetchResponseTransformer[],
    response: Response
) {
    const config = this || defaults;
    const context = response || config;
    const headers = context.headers || context.headers;

    let data = context.data;

    // 循环处理返回的数据，如果是数组，则循环处理
    (isArray(fns) ? fns : [fns]).forEach((fn) => {
        data = fn.call(config, data, headers, response ? response.status : undefined);
    });

    return data;
}
