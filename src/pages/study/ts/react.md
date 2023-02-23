# React

## 类组件

<code>React.Component<P, S={}></code>与<code>React.PureComponent<P, S={} SS={}></code>

- P: props 定义的类型
- S: state 定义的类型

```typescript
import React, { PureComponent, Component } from 'react';

class App extends PureComponent<IProps, IState> {}

class App extends Component<IProps, IState> {}
```

## 函数组件

函数声明两种方式

<code>React.FunctionComponent<P={}></code>简写<code>React.FC<P={}></code>

使用 React.FC 声明函数组件和普通声明的区别如下：

- React.FC 显式地定义了返回类型，其他方式是隐式推导的；
- React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全；
- React.FC 为 children 提供了隐式的类型（ReactElement | null）。

```tsx
// 定义组件
function MyComponent<P>(props: P) {
  return (
    <span>
    	{props}
    </span>
  );
}

// 使用组件
type IProps = { name: string; age: number; };

0
// 33

<MyComponent<IProps> name="React" age={18} />;          // Success
<MyComponent<IProps> name="TypeScript" age="hello" />;  // Error

```

使用函数定义

```tsx
const MyComponent = <P extends any>(props: P) => {
  return <span>{props}</span>;
};
```

### 懒加载类型

```tsx
export interface RouteType {
  pathname: string;
  component: LazyExoticComponent<any>;
  exact: boolean;
  title?: string;
  icon?: string;
  children?: RouteType[];
}
export const AppRoutes: RouteType[] = [
  {
    pathname: '/login',
    component: lazy(() => import('../views/Login/Login')),
    exact: true,
  },
  {
    pathname: '/404',
    component: lazy(() => import('../views/404/404')),
    exact: true,
  },
  {
    pathname: '/',
    exact: false,
    component: lazy(() => import('../views/Admin/Admin')),
  },
];
```

定义 LazyExoticComponent 组件

```tsx
type LazyExoticComponent<T extends ComponentType<any>> = ExoticComponent<ComponentPropsWithRef<T>> & {
  readonly _result: T;
};

function lazy<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>): LazyExoticComponent<T>;
```
