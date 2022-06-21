/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-25 16:50:52
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-27 15:15:16
 */
import { actionCreatorFactory, DvaModelBuilder } from "dva-model-creator";

export interface BuildThemeState {
  menuSpace: number; // 菜单间距
  elementSpace: number; // 元素列表间距
  panelSpace: number; //
}

export interface ThemeState {
  buildTheme: BuildThemeState;
}

const actionCreator = actionCreatorFactory("theme");
const updateBuildTheme = actionCreator<BuildThemeState>("updateBuildTheme"); // 更新build主题

let initialState: ThemeState = {
  buildTheme: {
    menuSpace: 0, // 菜单间距
    elementSpace: 0, // 元素列表间距
    panelSpace: 0, //
  },
};

const model = new DvaModelBuilder<ThemeState>(
  initialState,
  "theme"
)
  .case(
    updateBuildTheme,
    (
      state: ThemeState,
      payload: BuildThemeState
    ) => {
      return {
        ...state,
        buildTheme: {
          ...payload,
        },
      };
    }
  )
  // .takeEvery(updateBuildTheme, function* (payload, { select, put }) {
  //   console.log(updateBuildThemeReducer(payload));
  //   yield put(updateBuildThemeReducer(payload));
  // })
  .build();

export default model;
