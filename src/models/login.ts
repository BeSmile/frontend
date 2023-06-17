/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:45:18
 */
const login = localStorage.getItem('login') || false;

export interface LoginState {
  userName: string;
}

export default {
  namespace: 'login',
  state: {
    loggedIn: login,
  },
  effects: {
    *login(state: { callback: () => any }, { put }: any) {
      yield put({
        type: 'login',
        payload: {
          loggedIn: true,
        },
      });
      localStorage.setItem('login', 'true');
      state.callback && state.callback();
    },
  },
  reducers: {
    login: (state: any, action: { payload?: Record<any, any> | undefined }) => {
      const { payload = {} } = action;
      return {
        ...state,
        ...payload,
      };
    },
  },
};
