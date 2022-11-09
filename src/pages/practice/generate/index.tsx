// @ts-nocheck

/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-09-17 17:34:44
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-09-17 17:54:50
 */
import React from "react";

// generator 处理原来的函数
function* fnc_() {
  let i = 0;
  const start = performance.now();
  while (performance.now() - start <= 5000) {
    yield i++;
  }

  return i;
}

console.log(fnc_().constructor.name);

// 简易时间分片
function timeSlice(fnc) {
  console.log(fnc.constructor.name);
  if (fnc.constructor.name !== "GeneratorFunction") return fnc();

  return async function (...args) {
    const fnc_ = fnc(...args);
    let data;
    do {
      data = fnc_.next();
      // 每执行一步就休眠，注册一个宏任务 setTimeout 来叫醒他
      await new Promise((resolve) => setTimeout(resolve));
    } while (!data.done);

    return data.value;
  };
}

setTimeout(async () => {
  const fnc = timeSlice(fnc_);
  console.log(1, fnc_().constructor);
  const start = performance.now();
  console.log("开始");
  const num = await fnc();
  console.log("结束", `${(performance.now() - start) / 1000}s`);
  console.log(num);
}, 1000);

const GenerateFc = () => {
  return <></>;
};

export default GenerateFc;
