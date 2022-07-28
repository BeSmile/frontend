/*
 * @Description: 创建history
 * @Version: 1.0.0
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-14 15:22:35
 */
import { createHashHistory, createBrowserHistory } from 'history';
export const hasHistory = createHashHistory();
export const history = createBrowserHistory({});
