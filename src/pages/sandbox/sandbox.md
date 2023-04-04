# sandBox 实践方案

引入 babel,react,react-dom 等基础包

使用 requireJs 加载 react,react-dom 等包

`requirejs`就是一个 window 对象加载器模块打包之后,本质在浏览器上也是挂载在 window 对象

使用 iframe 方案

- 应用间运行时隔离
- 应用间通信
- 路由劫持

## 流程

1. 先加载远程所有依赖
2. 转译模块
3. 执行代码(处理 commonjs,esmodule)
