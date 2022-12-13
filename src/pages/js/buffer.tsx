import { useMount } from 'ahooks';
import React from 'react';

/**
 * JavaScript 类型化数组（typed array）是一种类似数组的对象，并提供了一种用于在内存缓冲区中访问原始二进制数据的机制。
 *
 * Array 存储的对象能动态增多和减少，并且可以存储任何 JavaScript 值。JavaScript 引擎会做一些内部优化，以便对数组的操作可以很快。然而，随着 Web 应用程序变得越来越强大，尤其一些新增加的功能例如：音频视频编辑、访问 WebSockets 的原始数据等，很明显有些时候如果使用 JavaScript 代码可以快速方便地通过类型化数组来操作原始的二进制数据将会非常有帮助。JavaScript 类型化数组中的每一个元素都是原始二进制值，而二进制值采用多种支持的格式之一（从 8 位整数到 64 位浮点数）。
 *
 * 但是，不要把类型化数组与普通数组混淆，因为在类型数组上调用 Array.isArray() 会返回 false。此外，并不是所有可用于普通数组的方法都能被类型化数组所支持（如 push 和 pop）。
 *
 * 操作缓冲时需要通过DataView操作
 *
 * DataView 是一种底层接口，它提供有可以操作缓冲区中任意数据的访问器（getter/setter）API。这对操作不同类型数据的场景很有帮助，例如：类型化数组视图都是运行在本地字节序模式（参考字节序），可以通过使用 DataView 来控制字节序。默认是大端字节序（Big-endian），但可以调用 getter/setter 方法改为小端字节序（Little-endian）。
 *
 *  [JavaScript 类型化数组 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)
 */
const Buffer = () => {
  const testBuffer = () => {
    const buffer = new ArrayBuffer(24);

    const idView = new Uint32Array(buffer, 0, 1);
    const usernameView = new Uint8Array(buffer, 4, 16);
    const amountDueView = new Float32Array(buffer, 20, 1);

    console.log(idView, usernameView, amountDueView);
  };

  useMount(() => {
    const buffer = new ArrayBuffer(16);

    if (buffer.byteLength === 16) {
      console.log("Yes, it's 16 bytes.");
    } else {
      console.log("Oh no, it's the wrong size!");
    }

    const int32View = new Int32Array(buffer);

    for (let i = 0; i < int32View.length; i++) {
      int32View[i] = i * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2;
    }

    console.log(int32View);

    testBuffer();
  });

  return <div>Test Buffer</div>;
};

export default Buffer;
