// @ts-nocheck
/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-18 11:27:44
 */
import { combineReducers } from "redux";

export default function injectReducers(models) {
  let rootReducers = {};

  models.forEach((model) => {
    if (!model) return;
    const reducers = model.reducers || {};
    const namespace = model.namespace; //命名空间
    let initialState = model.state; //初始化reduce state值
    if (0 === Object.keys(reducers).length) {
      rootReducers[namespace] = (state = initialState) => state;
    }
    const fn = function (state = initialState, action) {
      if (action.type.indexOf("/") < 0) {
        // console.warn("不是合法的reducer");
        return state;
      }
      const reducerSplit = action.type.split("/");
      const reducerName = reducerSplit[1]; // reducer对应的name名称
      // eslint-disable-next-line no-prototype-builtins
      if (reducers.hasOwnProperty(reducerName)) {
        // 匹配reducer函数 生成结果
        const tmpState = reducers[reducerName](state, action);
        return {
          ...state,
          ...tmpState,
        };
      } else {
        return state;
      }
    };
    rootReducers[namespace] = fn;
  });
  return combineReducers(rootReducers);
}
