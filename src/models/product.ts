/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:47:31
 */
import * as Api from '@services/api';

export default {
    namespace: 'product',
    state: {
        products: []
    },
    effects: {
        *fetchProduct({ payload }, { put, call }) {
            try {
                const books = yield call(Api.fetchBook, payload);
                yield put({ type: 'addProduct', payload: books.reviews });
            } catch (e) {
                yield put({ type: 'USER_FETCH_FAILED', message: e.message });
            }
        }
    },
    reducers: {
        addProduct: (state, action) => {
            return {
                state,
                products: action.payload
            };
        }
    }
};
