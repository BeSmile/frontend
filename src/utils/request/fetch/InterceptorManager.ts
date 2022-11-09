import { FetchInterceptorManager, FetchInterceptorOptions } from "./types";

// 拦截器
class InterceptorManager<V> implements FetchInterceptorManager<any> {
  handlers: any[];

  constructor() {
    this.handlers = [];
  }

  use<T = V>(
    onFulfilled?: (value: V) => T | Promise<T>,
    onRejected?: (error: any) => any,
    options?: FetchInterceptorOptions
  ): number {
    this.handlers.push({
      onFulfilled,
      onRejected,
      // 是否同步
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    });
    return this.handlers.length - 1;
  }

  // 弹出
  eject(id: number): void {
    this.handlers[id] = null;
  }

  /**
   * 遍历调用注册过的函数
   * @param fn fn The function to call for each interceptor
   * @returns {void}
   */
  forEach(fn: {
    (interceptor: FetchInterceptorOptions): void;
    (interceptor: FetchInterceptorOptions): void;
    (arg0: any): void;
  }) {
    this.handlers.forEach(function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

export default InterceptorManager;
