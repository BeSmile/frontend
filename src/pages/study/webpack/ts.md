# webpack 支持 ts 配置文件

安装`ts-node`

```bash
npm install --save-dev typescript ts-node @types/node @types/webpack

```

## 第一种方法

open your `tsconfig.json` file and look for `compilerOptions`. Set target to `"ES5"` and module to `"CommonJS"` (or completely remove the module option).

## 第二种方法

通过 ts-node 配置

```
{
  "compilerOptions": {
    "module": "ESNext",
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```

## 第三种方法

安装`tsconfig-paths`

修改`tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

修改`package.json`,并添加配置项目`TS_NODE_PROJECT`

```json
{
  "scripts": {
    "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
  }
}
```

[链接](https://webpack.js.org/configuration/configuration-languages/)
