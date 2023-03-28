# 基础

## 获取 enum 枚举对应的类型以及值

```ts
// 假设我一个枚举
enum ENUM_TYPE {
  ALL = 'all',
  SOME = 'some',
  LITTLE = 'little',
}

// 获取枚举的 value
type IValue = `${ENUM_TYPE}`; // 'all' | 'some' | 'little'

// 获取枚举的 key
type IKey = keyof typeof ENUM_TYPE; // 'ALL' | 'SOME' | 'LITTLE'
```
