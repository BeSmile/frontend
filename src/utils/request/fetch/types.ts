// headers的类型 提供各种方法。 暂时未实现

export interface CancelStatic {
    new (message?: string): Cancel;
}

export interface Cancel {
    message: string | undefined;
}

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

export type ParamMethod =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK';

export type Method = ParamMethod & DataFormMethod;

export interface GenericFormData {
    append(name: string, value: any, options?: any): any;
}

export type RawFetchRequestHeaders = Partial<RawFetchHeaders & MethodsHeaders & CommonHeaders>;

// 对请求体的headers做配置
export type FetchRequestHeaders = Partial<RawFetchHeaders & MethodsHeaders & CommonHeaders> &
    FetchHeaders;

export interface FormDataVisitorHelpers {
    defaultVisitor: SerializerVisitor;
    convertValue: (value: any) => any;
    isVisitable: (value: any) => boolean;
}

export interface SerializerVisitor {
    (
        this: GenericFormData,
        value: any,
        key: string | number,
        path: null | Array<string | number>,
        helpers: FormDataVisitorHelpers
    ): boolean;
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
interface CommonHeaders {
    common: FetchHeaders;
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

// 给data添加上泛型
export type FetchRequestConfig<D = any> = {
    url?: string;
    method?: string;
    data?: D;
    baseURL?: string;
    // eslint-disable-next-line no-undef
    body?: BodyInit;
    // params为请求参数
    params?: any;
    paramsSerializer?: ParamsSerializerOptions;
    withCredentials?: boolean;
    signal?: GenericAbortSignal;
    headers?: FetchRequestHeaders;
    transformRequest?: FetchRequestTransformer | FetchRequestTransformer[];
    transformResponse?: FetchResponseTransformer | FetchResponseTransformer[];
};

// 定义会用到的类型
type FetchHeaderValue = string | string[] | number | boolean | null;

// 未被fetch定义的headers
type RawFetchHeaders = Record<string, FetchHeaderValue>;

// 定义每个请求类型的headers对象
type MethodsHeaders = {
    [Key in Method as Lowercase<Key>]: FetchHeaders;
};

//
type FetchHeaderMatcher = (
    this: FetchHeaders,
    value: string,
    name: string,
    headers: RawFetchHeaders
) => boolean;

// 定义headers的常用方法
export declare class FetchHeaders {
    constructor(
        headers?: RawFetchHeaders | FetchHeaders,
        defaultHeaders?: RawFetchHeaders | FetchHeaders
    );
    //
    set(
        headerName?: string,
        value?: FetchHeaderValue,
        rewrite?: boolean | FetchHeaderMatcher
    ): FetchHeaders;
    // set(headers?: RawFetchHeaders | FetchHeaders, rewrite?: boolean): FetchHeaders;
    //
    // get(headerName: string, parser: RegExp): RegExpExecArray | null;
    // get(headerName: string, matcher?: true | AxiosHeaderMatcher): AxiosHeaderValue;
    //
    // has(header: string, matcher?: true | AxiosHeaderMatcher): boolean;
    //
    // delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;
    //
    clear(): boolean;
    //
    normalize(format: boolean): FetchHeaders;
    //
    toJSON(): RawFetchHeaders;
    //
    static from(thing?: FetchHeaders | RawFetchHeaders | string): FetchHeaders;
    //
    // static accessor(header: string | string[]): FetchHeaders;
    //
    // setContentType: AxiosHeaderSetter;
    // getContentType: AxiosHeaderGetter;
    // hasContentType: AxiosHeaderTester;
    //
    // setContentLength: AxiosHeaderSetter;
    // getContentLength: AxiosHeaderGetter;
    // hasContentLength: AxiosHeaderTester;
    //
    // setAccept: AxiosHeaderSetter;
    // getAccept: AxiosHeaderGetter;
    // hasAccept: AxiosHeaderTester;
    //
    // setUserAgent: AxiosHeaderSetter;
    // getUserAgent: AxiosHeaderGetter;
    // hasUserAgent: AxiosHeaderTester;
    //
    // setContentEncoding: AxiosHeaderSetter;
    // getContentEncoding: AxiosHeaderGetter;
    // hasContentEncoding: AxiosHeaderTester;
}

export interface FetchRequestTransformer {
    (this: FetchRequestConfig, data: any, headers: FetchHeaders): any;
}

export interface FetchResponseTransformer {
    (this: FetchRequestConfig, data: any, headers: AxiosResponseHeaders, status?: number): any;
}

// 响应response  set-cookie.后端设置响应
export type RaFetchResponseHeaders = Partial<
    Record<string, string> & {
        'set-cookie'?: string[];
    }
>;
export type AxiosResponseHeaders = RaFetchResponseHeaders & FetchHeaders;

export interface FetchResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: RaFetchResponseHeaders | AxiosResponseHeaders;
    config: FetchRequestConfig<D>;
    request?: any;
}

export interface FetchInterceptorOptions {
    synchronous?: boolean;
    runWhen?: (config: FetchRequestConfig) => boolean;
}

export interface FetchInterceptorManager<V> {
    use<T = V>(
        onFulfilled?: (value: V) => T | Promise<T>,
        onRejected?: (error: any) => any,
        options?: FetchInterceptorOptions
    ): number;
    eject(id: number): void;
}

export type IFetch = {
    [P in ParamMethod]: <T, R = FetchResponse<T>, D = any>(
        url: string,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
} & {
    [F in DataFormMethod]: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
} & {
    [F in DataFormMethod as `${Lowercase<F>}Form`]: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: FetchRequestConfig<D>
    ) => Promise<R>;
} & {
    interceptors?: {
        request: FetchInterceptorManager<FetchRequestConfig>;
        response: FetchInterceptorManager<FetchResponse>;
    };
    defaults: FetchDefaults;
    request: <T, R = FetchResponse<T>, D = any>(
        url: string,
        data?: D,
        options?: FetchRequestConfig<D>
    ) => Promise<R>;
};
