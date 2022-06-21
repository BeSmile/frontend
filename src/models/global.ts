/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:49:22
 */
import { actionCreatorFactory, DvaModelBuilder } from "dva-model-creator";
import { ThemeState } from "./theme";
import { LoginState } from "./login";

export interface breadcrumb {
  name: string;
  url: string;
}

export interface RootState {
  theme: ThemeState;
  login: LoginState;
}

export type BreadcrumbList = Array<breadcrumb>;

export interface GlobalState {
  breadcrumbs: BreadcrumbList;
}

let initialState: GlobalState = {
  breadcrumbs: [],
};

const actionCreator = actionCreatorFactory("global");
const updateBreadcrumb = actionCreator<any>("updateBreadcrumb");
const updateBreadcrumbReducer = actionCreator<BreadcrumbList>(
  "updateBreadcrumbReducer"
);

const model = new DvaModelBuilder<GlobalState>(
  initialState,
  "global"
)
  .case(
    updateBreadcrumbReducer,
    (
      state: GlobalState,
      payload: BreadcrumbList
    ) => {
      return {
        ...state,
        breadcrumbs: payload,
      };
    }
  )
  .takeEvery(
    updateBreadcrumb,
    function* (
      payload,
      { put }
    ) {
      yield put(updateBreadcrumbReducer(payload.breadcrumbs));
    }
  )
  .build();

export default model;
