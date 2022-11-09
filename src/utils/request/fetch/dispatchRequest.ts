import isomorphicFetch from "isomorphic-fetch";
import { transformData } from "./transformData";
import FetchHeaders from "./FetchHeaders";
import CanceledError from "./cancel/CanceledError";
import { FetchRequestConfig } from "./types";

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config: FetchRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw CanceledError();
  }
}

function dispatchRequest<R, D>(
  url: string,
  config: FetchRequestConfig<D>
): Promise<R> {
  throwIfCancellationRequested(config);

  config.headers = FetchHeaders.from(config.headers);
  // const requestConfig = Object.assign(config, {
  //   headers: config.headers.toJSON(),
  // });

  // 转化请求参数
  config.body = transformData.call(config, config.transformRequest);
  console.log("requestConfig", config);
  return isomorphicFetch(url, {
    body: config.body,
    // headers: config.headers,
    method: config.method,
    // signal: config.signal,
  })
    .then(
      function onResolution(response) {
        throwIfCancellationRequested(config);
        return response.json().then((data) => ({
          data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config,
        }));
      },
      function onReject(reason) {
        // 判断是否是取消报错
        if (!reason) {
          throwIfCancellationRequested(config);
          return reason;
        }
        return Promise.reject(reason);
      }
    )
    .then((response) => ({
      ...response,
      data: {
        ...response.data,
        data: transformData.call(
          config,
          config.transformResponse || [],
          response.data || null
        ),
      },
    })) as Promise<R>;
}

export default dispatchRequest;
