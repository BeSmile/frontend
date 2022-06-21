/*
 * @Description: saga注入相关
 * @Version: 1.0.0
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-14 13:57:52
 */
import * as sagaEffects from "redux-saga/effects";
import { call, fork, put, takeLatest } from "redux-saga/effects";

// saga相关/ 已经不是最优的解决方案
function getWatcher(
  key,
  sagaWithOnEffect
) {
  const _this = this;
  return function* () {
    const curry = function (action) {
      return sagaWithOnEffect.call(
        _this,
        action,
        { call, put, fork }
      );
    };
    yield takeLatest(
      key,
      curry
    );
  };
}

export default function getSaga(effects, model) {
  return function* () {
    for (const key in effects) {
      if (Object.prototype.hasOwnProperty.call(
        effects,
        key
      )) {
        const watcher = getWatcher.call(
          effects,
          `${model.namespace}/${key}`,
          effects[key]
        );
        // 将 watcher 分离到另一个线程去执行
        const task = yield sagaEffects.fork(watcher);
        // 同时 fork 了一个线程，用于在 model 卸载后取消正在进行中的 task
        // `${model.namespace}/@@CANCEL_EFFECTS` 的发出动作在 index.js 的 start 方法中，unmodel 方法里。
        yield sagaEffects.fork(function* () {
          yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
          yield sagaEffects.cancel(task);
        });
      }
    }
  };
}
