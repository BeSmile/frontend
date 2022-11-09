type answer1 = 64 extends number ? true : false;

export type tDat = typeof Date extends { new (...args: any[]): any } ? true : false;

type FavoriteColors = 'dark sienna' | 'van dyke brown' | [number, number] | { red: number; green: number } | { red: number; green: number; blue: number };

export type StringColor = Extract<FavoriteColors, string>;

export type ObjectColor = Extract<FavoriteColors, { red: number }>;

export type NumberArrayColor = Extract<FavoriteColors, [number]>;

export type NumberColor = Extract<FavoriteColors, number[]>;

type Record<KeyType extends string, ValueType> = {
  [Key in KeyType]: ValueType;
};

export type PickWindowProperties<Keys extends keyof Window> = {
  [Key in Keys]: Window[Key];
};

interface DataState {
  digits: number;
  names: string[];
  flags: Record<'darkMode' | 'mobile', boolean>;
}

export type DataSdk = {
  [K in keyof DataState as `set${Capitalize<K>}`]: (arg: DataState[K]) => void;
};

type DocKeys = Extract<keyof Document, `query${string}`>;
export type KeyFilterDoc = {
  [Key in DocKeys]: Document[Key];
};

export type ValueFilterDoc = {
  [K in keyof Document]: Document[K] extends {
    new (...args: any[]): Element | Element[];
  }
    ? Document[K]
    : never;
};

interface Color {
  red: string;
  green: number;
  blue: number;
}

type ElementFunction = (...args: any[]) => Element | Element[];

type FilteredKeys<ToFilter, Condition> = {
  [K in keyof ToFilter]: ToFilter[K] extends Condition ? K : never;
}[keyof ToFilter];

type Test = { a: string; b: never; c: number };

type ToTest = Test['a' | 'b'];

// 非green会显示never
type RelevantColorKeys = FilteredKeys<Color, string>;

// 构造函数才会返回函数类型
export type RelevantDocumentKeys = FilteredKeys<Document, ElementFunction>;

export type ValueFilterFnDoc = Pick<Color, RelevantColorKeys>;

// const getAll = <T extends keyof Color>(id: string, props: Partial<Color[T]>): void => {
//   console.log(id, props);
// };
//
// getAll("111","123");

export type EKey = Partial<Color>;

type Contact<S1 extends string, S2 extends string> = `${S1}-${S2}`;
type ToString<T extends string | number | null> = `${T}`;

type TestT2 = {
  name: string;
  age: number;
};

type T1 = Contact<'Lin', 'jinzhi'>;
type T2 = {
  [Key in keyof TestT2]: ToString<TestT2[Key]>;
};
type T3 = ToString<keyof TestT2>;

type Direction = 'left' | 'right' | 'top' | 'bottom';
// 正则匹配了marginRight
// Capitalize 首字母大写
type InferRoot<T> = T extends `${infer R}${Capitalize<Direction>}` ? R : T;
type MarginDirection = Contact<'margin', Direction>;
type T7 = InferRoot<'marginRight'>; // "margin"
type T8 = InferRoot<'paddingLeft'>; // "padding"

type GetFuncName<T> = T extends `func${infer R}` ? R : never;

type T9 = GetFuncName<'funcName'>;
