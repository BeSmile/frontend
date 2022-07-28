/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:45:18
 */
var login = localStorage.getItem('login') || false;

export interface LoginState {}

export default {
    namespace: 'login',
    state: {
        loggedIn: login
    },
    effects: {
        *login(state, { put }) {
            yield put({
                type: 'login',
                payload: {
                    loggedIn: true
                }
            });
            localStorage.setItem('login', 'true');
            state.callback && state.callback();
        }
    },
    reducers: {
        login: (state, action) => {
            const { payload = {} } = action;
            return {
                ...state,
                ...payload
            };
        }
    }
};
