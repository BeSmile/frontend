import { FetchRequestConfig, MethodsHeaders, RawFetchRequestHeaders } from './types';
import { findKey, forEach, formatHeader, isArray, normalizeValue, toCamelCase } from '../utils';
import merge from 'lodash/merge';

const $internals = Symbol('internals');

function normalizeHeader(header: string): string {
  return header && String(header).trim().toLowerCase();
}

function buildAccessors(obj: any, header: string) {
  const accessorName = toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function (arg1: any, arg2: any, arg3: any) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true,
    });
  });
}

class FetchHeaders {
  constructor(headers: RawFetchRequestHeaders & MethodsHeaders) {
    headers && this.set(headers);
  }

  set(headers: RawFetchRequestHeaders & MethodsHeaders) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (headers) {
      const { common, ...other } = headers;
      const mergeHeaders = merge(common, other);
      Object.keys(mergeHeaders).forEach((key) => {
        // @ts-ignore
        self[key] = mergeHeaders[key];
      });
    }
    return this;
  }
  normalize(format?: boolean): FetchHeaders {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const headers = {};

    forEach(this, (value: any, header) => {
      const key = findKey(headers, header as string);
      if (key) {
        // @ts-ignore
        self[key] = normalizeValue(value);
        // @ts-ignore
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header as string) : String(header).trim();
      if (normalized !== header) {
        // @ts-ignore
        delete self[header];
      }

      // @ts-ignore
      self[normalized] = normalizeValue(value);
      // @ts-ignore
      headers[normalized] = true;
    });
    return this;
  }
  toJSON(asStrings?: string) {
    const obj = Object.create(null);

    forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && isArray(value) ? value.join(', ') : value);
    });
    return obj;
  }
  static from(thing: FetchRequestConfig['headers']): FetchHeaders {
    return thing instanceof this ? thing : new this(thing as RawFetchRequestHeaders & MethodsHeaders);
  }
  static accessor(header: string[]) {
    // @ts-ignore
    const internals =
      (this[$internals] =
      this[$internals] =
        {
          accessors: {},
        });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    // todo 处理函数方法
    // 对header添加set,get方法
    function defineAccessor(_header: string) {
      const lHeader = normalizeHeader(_header);

      // @ts-ignore
      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        // @ts-ignore
        accessors[lHeader] = true;
      }
    }

    isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

FetchHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);
//
// type TransferMeaning<T> = T extends `${infer R}-${infer F}` ? `${R}${F}` : T
//
// type FetchHeaders = FetchHeaders & {
//   [Key in CommonRequestHeadersList as `set${TransferMeaning<Key>}`]: (_header: string) => void
// } & {
//   [Key in CommonRequestHeadersList as `get${TransferMeaning<Key>}`]: (_header: string) => void
// }

export default FetchHeaders;
