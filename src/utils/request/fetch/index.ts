import merge from 'lodash/merge';
// const AbortController = require('abort-controller');
import InterceptorManager from './InterceptorManager';
import { FetchResponse, FetchRequestConfig, IFetch, FetchDefaults } from './types';
import dispatchRequest from './dispatchRequest';
import defaults from './defaults';

class Fetch implements IFetch {
    defaults: FetchDefaults;
    interceptors;
    constructor(config: FetchRequestConfig) {
        this.defaults = (config || defaults) as FetchDefaults;
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        };
    }
    request<T, R = FetchResponse<T>, D = any>(
        url: string,
        options?: FetchRequestConfig<D>
    ): Promise<R> {
        const config = merge(this.defaults, options);
        console.log(options, 'options');
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

        //todo 处理header下的请求配置 。如header common以及对应不同请求下的配置

        // filter out skipped interceptors
        const requestInterceptorChain = []; // 实际会请求的拦截器
        let synchronousRequestInterceptors = true; // 获取是否当前的拦截器是否为同步的

        this.interceptors.request.forEach(function unshiftRequest(interceptor) {
            // 如果不是运行中的拦截器跳过
            if (
                typeof interceptor.runWhen === 'function' &&
                interceptor.runWhen(config) === false
            ) {
                return;
            }
            // 判断是否都是同步请求
            synchronousRequestInterceptors =
                synchronousRequestInterceptors && interceptor.synchronous;

            requestInterceptorChain.unshift(interceptor);
        });

        const responseInterceptorChain = []; // 相应链
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            requestInterceptorChain.push(interceptor.onFulfilled, interceptor.onRejected);
        });

        let promise;
        let i = 0;
        let len;

        // 非同步情况下, 将执行步骤放入数组当中
        if (!synchronousRequestInterceptors) {
            const chain = [dispatchRequest.bind(this), undefined]; // 作用是啥？？？
            chain.unshift.apply(chain, requestInterceptorChain); // 头部插入请求拦截器
            chain.push.apply(chain, responseInterceptorChain); // 末尾插入相应拦截器

            len = chain.length;

            promise = Promise.resolve(config); // 获取到异步的config值

            while (i < len) {
                // 使用promise.then进行promise的链式调用。resolve和reject都使用同一个函数，保证链式调用的正确性
                promise = promise.then(chain[i++], chain[i++]);
            }

            return promise;
        }

        // 同步情况下，直接执行
        len = requestInterceptorChain.length;

        let newConfig = config;

        i = 0;

        // 调用拦截器
        while (i < len) {
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];

            // 失败调用OnRejected函数跳出本次循环
            try {
                newConfig = onFulfilled(newConfig);
            } catch (error) {
                onRejected.call(this, error);
                break;
            }
        }

        try {
            promise = dispatchRequest.call(this, url, newConfig);
        } catch (error) {
            return Promise.reject(error);
        }

        i = 0;

        len = responseInterceptorChain.length;

        while (i < len) {
            promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }

        return promise;
    }
    GET: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    DELETE: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    HEAD: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    LINK: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    OPTIONS: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    PATCH: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    POST: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    PUT: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    patch: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    post: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    put: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    putForm: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    postForm: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    patchForm: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    PURGE: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    UNLINK: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;

    delete: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    head: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    link: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    get: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    options: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    purge: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
    unlink: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
}

const FormMethods = ['post', 'put', 'patch', 'POST', 'PUT', 'PATCH'];
const ParamsMethods = ['delete', 'get', 'head', 'options', 'DELETE', 'GET', 'HEAD', 'OPTIONS'];

ParamsMethods.forEach((method) => {
    Fetch.prototype[method] = function (url, config) {
        return this.request(
            url,
            merge(config || {}, {
                method,
                data: (config || {}).data
            })
        );
    };
});

FormMethods.forEach((method) => {
    const generateHttpMethod = (isForm?: boolean) => {
        return function httpMethod(url, data, config) {
            return this.request(
                url,
                merge(config || {}, {
                    method,
                    data,
                    headers: isForm
                        ? {
                              'Content-Type': 'multipart/form-data'
                          }
                        : {}
                })
            );
        };
    };
    Fetch.prototype[method] = generateHttpMethod();
    Fetch.prototype[`${method}Form`] = generateHttpMethod(true);
});

const fetch = new Fetch({
    // transformRequest: (data) => {
    //   console.log(data, 'xxxxdd')
    //   return {
    //     d: 33
    //   };
    // },
    // transformResponse: [(ddd) => {
    //   return [23,4,4,5]
    // }]
});

export default fetch;
