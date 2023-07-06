import merge from 'lodash/merge';
// const AbortController = require('abort-controller');
import InterceptorManager from './InterceptorManager';
import { FetchResponse, FetchRequestConfig, FetchInterceptorManager, InterceptorHandler, FetchDefaults } from './types';
import dispatchRequest from './dispatchRequest';
import defaults from './defaults';
import { isString } from 'lodash';
import { bind, extend } from '@/utils/request/utils';

class Fetch {
  defaults: FetchDefaults;
  interceptors: {
    request: FetchInterceptorManager<FetchRequestConfig>;
    response: FetchInterceptorManager<FetchResponse>;
  };

  constructor(defaultConfig: FetchDefaults) {
    this.defaults = defaultConfig;
    // 生成拦截器
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  request<T, R = FetchResponse<T>, D = any>(configOrUrl: string | FetchRequestConfig<D>, config?: FetchRequestConfig<D>): Promise<R> {
    // const config = merge(this.defaults, options);
    if (isString(configOrUrl)) {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl;
    }

    config = merge(config, this.defaults);

    // const controller = new AbortController();
    // const signal = controller.signal;

    // if (transitional !== undefined) {
    //   validator.assertOptions(transitional, {
    //     silentJSONParsing: validators.transitional(validators.boolean),
    //     forcedJSONParsing: validators.transitional(validators.boolean),
    //     clarifyTimeoutError: validators.transitional(validators.boolean)
    //   }, false);
    // }
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    if (config.method === 'GET') {
      // Get请求删除Data
      delete config.data;
    }
    //todo 处理header下的请求配置 。如header common以及对应不同请求下的配置

    // filter out skipped interceptors
    const requestInterceptorChain: InterceptorHandler[] = []; // 实际会请求的拦截器
    let synchronousRequestInterceptors = true; // 获取是否当前的拦截器是否为同步的

    this.interceptors.request.forEach(function unshiftRequest(interceptor: InterceptorHandler) {
      // 如果不是运行中的拦截器跳过
      if (typeof interceptor.runWhen === 'function' && !interceptor.runWhen(config!)) {
        return;
      }
      // 判断是否都是同步请求
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor);
    });

    const responseInterceptorChain: any = []; // 响应链
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor: any) {
      requestInterceptorChain.push(interceptor.onFulfilled, interceptor.onRejected);
    });

    let promise;
    let i = 0;
    let len;

    // 非同步情况下, 将执行步骤放入数组当中
    if (!synchronousRequestInterceptors) {
      const chain: any = [dispatchRequest.bind(this), undefined]; // 作用是啥？？？
      // eslint-disable-next-line prefer-spread
      chain.unshift.apply(chain, requestInterceptorChain); // 头部插入请求拦截器
      // eslint-disable-next-line prefer-spread
      chain.push.apply(chain, responseInterceptorChain); // 末尾插入相应拦截器

      len = chain.length;

      promise = Promise.resolve(config); // 获取到异步的config值

      while (i < len) {
        // 使用promise.then进行promise的链式调用。resolve和reject都使用同一个函数，保证链式调用的正确性
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise as unknown as Promise<R>;
    }

    // 同步情况下，直接执行
    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    // 调用拦截器
    while (i < len) {
      const onFulfilled: any = requestInterceptorChain[i++];
      const onRejected: any = requestInterceptorChain[i++];

      // 失败调用OnRejected函数跳出本次循环
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, config.url!, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;

    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise as Promise<R>;
  }
}

const FormMethods = ['post', 'put', 'patch', 'POST', 'PUT', 'PATCH'];
const ParamsMethods = ['delete', 'get', 'head', 'options', 'DELETE', 'GET', 'HEAD', 'OPTIONS'];

ParamsMethods.forEach((method) => {
  // @ts-ignore
  Fetch.prototype[method] = function (url: string, config: FetchRequestConfig) {
    return this.request(
      url,
      merge(config || {}, {
        method,
        data: (config || {}).data,
      }),
    );
  };
});

FormMethods.forEach((method) => {
  const generateHttpMethod = (isForm?: boolean) => {
    return function httpMethod(url: any, data: any, config: any) {
      return this.request(
        url,
        merge(config || {}, {
          method,
          data,
          headers: isForm
            ? {
                'Content-Type': 'multipart/form-data',
              }
            : {},
        }),
      );
    };
  };
  // @ts-ignore
  Fetch.prototype[method] = generateHttpMethod();
  // @ts-ignore
  Fetch.prototype[`${method}Form`] = generateHttpMethod(true);
});

// {
// transformRequest: (data) => {
//   console.log(data, 'xxxxdd')
//   return {
//     d: 33
//   };
// },
// transformResponse: [(ddd) => {
//   return [23,4,4,5]
// }]
// }

function createInstance(defaultConfig: FetchDefaults): <T, R = FetchResponse<T>, D = any>(configOrUrl: string | FetchRequestConfig<D>, config: FetchRequestConfig<D> | undefined) => Promise<R> {
  const context = new Fetch(defaultConfig);
  const instance = bind(Fetch.prototype.request, context);

  // Copy axios.prototype to instance
  extend(instance, Fetch.prototype, context, { allOwnKeys: true });

  // Copy context to instance
  extend(instance, context, null, { allOwnKeys: true });
  // instance.create = function create(instanceConfig) {
  //   return createInstance(mergeConfig(defaultConfig, instanceConfig));
  // };

  return instance;
}

const fetch = createInstance(defaults);

export default fetch;
