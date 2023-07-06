export const { isArray } = Array;

interface ForEachOptions {
  allOwnKeys?: boolean;
}
export function forEach(obj: any, fn: (value: any, key: string | number, obj: any) => void, { allOwnKeys = false }: ForEachOptions = {}): void {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i: number;
  let l: number;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key: string;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

const kindOf = (function (cache: Record<string, string>) {
  return function (thing: any) {
    const str = Object.prototype.toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

export const isFormData = function isFormData(thing: any): boolean {
  const kind = kindOf(thing);
  return (
    thing &&
    ((typeof FormData === 'function' && thing instanceof FormData) ||
      (typeof thing.append === 'function' &&
        (kind === 'formdata' ||
          // detect form-data instance
          (kind === 'object' && typeof thing.toString === 'function' && thing.toString() === '[object FormData]'))))
  );
};

export function formatHeader(header: string): string {
  return header
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (_, char, str) => {
      return char.toUpperCase() + str;
    });
}

export function normalizeValue(value: any): any {
  if (value === false || value == null) {
    return value;
  }

  return Array.isArray(value) ? value.map(normalizeValue) : String(value);
}

export function findKey(obj: Record<string, any>, key: string): string | null {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key: string;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

export const toCamelCase = (str: string) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(_, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};

export function bind<T, A extends any[], R>(fn: (this: T, ...args: A) => R, thisArg: T): (...args: A) => R {
  return function wrap(...args: A): R {
    return fn.apply(thisArg, args);
  };
}

interface ExtendOptions {
  allOwnKeys?: boolean;
}

export function extend<T = any, U = any>(a: any, b: any, thisArg: any, { allOwnKeys = false }: ExtendOptions = {}): T & U {
  forEach(
    b,
    (val, key) => {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key as keyof T] = val;
      }
    },
    { allOwnKeys },
  );
  return a as T & U;
}
