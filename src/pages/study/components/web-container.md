# webContainer 组件

[webcontainers.io](https://webcontainers.io/guides/introduction)

## 文件系统

创建一个目录格式

```
const files = {
  // This is a directory - provide its name as a key
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // Here we will add files
    },
  },
};
```

示例:

```ts
const files = {
  // This is a directory - provide its name as a key
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // This is a file - provide its path as a key:
      'main.js': {
        // Because it's a file, add the "file" key
        file: {
          contents: `
            console.log('Hello from WebContainers!')
          `,
        },
      },
    },
  },
};
```
