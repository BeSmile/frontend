// headers的类型 提供各种方法。 暂时未实现
import FetchHeaders from './FetchHeaders';

export interface CancelStatic {
  new (message?: string): Cancel;
}

// 定义自定义的FetchHeaders类
export type FetchHeaderValue = FetchHeaders | string | string[] | number | boolean | null;

export type ContentType = FetchHeaderValue | 'application/vnd.myapp.type+json' | 'application/octet-stream' | 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

export interface Cancel {
  message: string | undefined;
}
export type FetchPromise<T = any> = Promise<FetchResponse<T>>;

export interface Canceler {
  (message?: string, config?: FetchRequestConfig, request?: any): void;
}

export interface CancelTokenStatic {
  new (executor: (cancel: Canceler) => void): CancelToken;

  source(): CancelTokenSource;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  throwIfRequested(): void;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

type DataFormMethod = 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';

export type ParamMethod = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK';

export type Method = ParamMethod & DataFormMethod;

export interface GenericFormData {
  append(name: string, value: any, options?: any): any;
}

// 常用header变量,以及预制Authorization
export type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization';

// 基础请求header变量
export type RawFetchRequestHeaders = Partial<
  RawFetchHeaders & {
    [Key in CommonRequestHeadersList]: FetchHeaderValue;
  }
> & {
  'Content-Type': ContentType;
};

// 对请求体的headers做配置
export type FetchRequestHeaders = RawFetchRequestHeaders;

export interface FormDataVisitorHelpers {
  defaultVisitor: SerializerVisitor;
  convertValue: (value: any) => any;
  isVisitable: (value: any) => boolean;
}

export interface SerializerVisitor {
  (this: GenericFormData, value: any, key: string | number, path: null | Array<string | number>, helpers: FormDataVisitorHelpers): boolean;
}

export interface SerializerOptions {
  visitor?: SerializerVisitor;
  dots?: boolean;
  metaTokens?: boolean;
  indexes?: boolean;
}

export interface ParamEncoder {
  (value: any, defaultEncoder: (value: any) => any): any;
}

export interface ParamsSerializerOptions extends SerializerOptions {
  encode?: ParamEncoder;
}

// CommonHeaders 对应的是全局的header信息
export interface HeadersDefaults {
  common: RawFetchRequestHeaders;
  // delete: RawAxiosRequestHeaders;
  // get: RawAxiosRequestHeaders;
  // head: RawAxiosRequestHeaders;
  // post: RawAxiosRequestHeaders;
  // put: RawAxiosRequestHeaders;
  // patch: RawAxiosRequestHeaders;
  // options?: RawAxiosRequestHeaders;
  // purge?: RawAxiosRequestHeaders;
  // link?: RawAxiosRequestHeaders;
  // unlink?: RawAxiosRequestHeaders;
}

export interface GenericAbortSignal {
  aborted: boolean;
  onabort: ((...args: any) => any) | null;
  addEventListener: (...args: any) => any;
  removeEventListener: (...args: any) => any;
}

export interface FetchDefaults<D = any> extends Omit<FetchRequestConfig<D>, 'headers'> {
  headers: HeadersDefaults;
}

// 给data添加上泛型
export type FetchRequestConfig<D = any> = {
  url?: string;
  method?: string;
  data?: D;
  baseURL?: string;
  // eslint-disable-next-line no-undef
  body?: BodyInit;
  // params为请求参数
  params?: D;
  paramsSerializer?: ParamsSerializerOptions;
  withCredentials?: boolean;
  signal?: GenericAbortSignal;
  // 支持常用headers对象, 或者是定义的FetchHeaders对象
  headers?: (RawFetchRequestHeaders & MethodsHeaders) | FetchHeaders;
  cancelToken?: CancelToken;

  transformRequest?: FetchRequestTransformer | FetchRequestTransformer[];
  transformResponse?: FetchResponseTransformer | FetchResponseTransformer[];
};

// 未被fetch定义的headers
export type RawFetchHeaders = {
  [key: string]: FetchHeaderValue;
};

// 处理method方法也支持自定义的headers
export type MethodsHeaders = {
  [Key in Method as Lowercase<Key>]: FetchHeaders;
} & {
  common: FetchHeaders;
};

//
export type FetchHeaderMatcher = (this: FetchHeaders, value: string, name: string, headers: RawFetchHeaders) => boolean;

// 定义headers的常用方法
// export declare class FetchHeaders {
//   constructor(headers?:  RawFetchRequestHeaders & MethodsHeaders);
//
//   //
//   set(headerName?: string, value?: FetchHeaderValue, rewrite?: boolean | FetchHeaderMatcher): FetchHeaders;
//   // set(headers?: RawFetchHeaders | FetchHeaders, rewrite?: boolean): FetchHeaders;
//   //
//   // get(headerName: string, parser: RegExp): RegExpExecArray | null;
//   // get(headerName: string, matcher?: true | AxiosHeaderMatcher): AxiosHeaderValue;
//   //
//   // has(header: string, matcher?: true | AxiosHeaderMatcher): boolean;
//   //
//   // delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;
//   //
//   clear(): boolean;
//
//   //
//   normalize(format?: boolean): FetchHeaders;
//
//   //
//   toJSON(): RawFetchHeaders;
//
//   //
//   static from(thing?: FetchHeaders | RawFetchHeaders | string): FetchRequestHeaders;
//
//   //
//   // static accessor(header: string | string[]): FetchHeaders;
//   //
//   setContentType(value: ContentType, rewrite?: boolean): FetchHeaders;  // getContentType: AxiosHeaderGetter;
//   getContentType(): ContentType;  // getContentType: AxiosHeaderGetter;
//   // hasContentType: AxiosHeaderTester;
//   //
//   // setContentLength: AxiosHeaderSetter;
//   // getContentLength: AxiosHeaderGetter;
//   // hasContentLength: AxiosHeaderTester;
//   //
//   // setAccept: AxiosHeaderSetter;
//   // getAccept: AxiosHeaderGetter;
//   // hasAccept: AxiosHeaderTester;
//   //
//   // setUserAgent: AxiosHeaderSetter;
//   // getUserAgent: AxiosHeaderGetter;
//   // hasUserAgent: AxiosHeaderTester;
//   //
//   // setContentEncoding: AxiosHeaderSetter;
//   // getContentEncoding: AxiosHeaderGetter;
//   // hasContentEncoding: AxiosHeaderTester;
// }

export interface FetchRequestTransformer {
  (this: FetchRequestConfig, data: any, headers: FetchHeaders): any;
}

export interface FetchResponseTransformer {
  (this: FetchRequestConfig, data: any, headers: FetchResponseHeaders, status?: number): any;
}

// 响应response  set-cookie.后端设置响应
export type RaFetchResponseHeaders = Partial<
  Record<string, string> & {
    'set-cookie'?: string[];
  }
>;
export type FetchResponseHeaders = RaFetchResponseHeaders & FetchHeaders;

export interface FetchResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RaFetchResponseHeaders | FetchResponseHeaders;
  config: FetchRequestConfig<D>;
  request?: any;
}

export interface FetchInterceptorOptions {
  synchronous: boolean;
  runWhen?: (config: FetchRequestConfig) => boolean;
}

export interface FetchInterceptorManager<V> {
  use<T = V>(onFulfilled?: (value: V) => T | Promise<T>, onRejected?: (error: any) => any, options?: FetchInterceptorOptions): number;

  eject(id: number): void;

  forEach<I>(fn: (interceptor: I) => void): void;
}

export type InterceptorHandler = {
  onFulfilled: (value: any) => any | Promise<any>;
  onRejected: (error: any) => any;
} & FetchInterceptorOptions;

export interface IFetch {
  interceptors: {
    request: FetchInterceptorManager<FetchRequestConfig>;
    response: FetchInterceptorManager<FetchResponse>;
  };
  defaults: FetchDefaults;
  request: <T, R = FetchResponse<T>, D = any>(url: string, data?: D, options?: FetchRequestConfig<D>) => Promise<R>;

  getUri(config?: FetchRequestConfig): string;
  get<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, config?: FetchRequestConfig<D>): Promise<R>;
  delete<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, config?: FetchRequestConfig<D>): Promise<R>;
  head<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, config?: FetchRequestConfig<D>): Promise<R>;
  options<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, config?: FetchRequestConfig<D>): Promise<R>;
  post<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, data?: D, config?: FetchRequestConfig<D>): Promise<R>;
  put<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, data?: D, config?: FetchRequestConfig<D>): Promise<R>;
  patch<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, data?: D, config?: FetchRequestConfig<D>): Promise<R>;
  postForm<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, data?: D, config?: FetchRequestConfig<D>): Promise<R>;
  putForm<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, data?: D, config?: FetchRequestConfig<D>): Promise<R>;
  patchForm<T = any, R = FetchResponse<T>, D = any>(url: string | FetchRequestConfig, data?: D, config?: FetchRequestConfig<D>): Promise<R>;
}

export interface IFetchInstance extends IFetch {
  <T = any, R = FetchResponse<T>, D = any>(config: FetchRequestConfig<D>): FetchPromise<R>;
  <T = any, R = FetchResponse<T>, D = any>(url: string, config?: FetchRequestConfig<D>): FetchPromise<R>;

  defaults: Omit<FetchDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: FetchHeaderValue;
    };
  };
}
