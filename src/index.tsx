/*
 * @Description: 初始化入口文件
 * @Version: v1.0.0
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-03 15:21:53
 */
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import APP from './router';
import getSaga from '@/utils/getSaga';
import injectReducers from '@/utils/injectReducers';
import { initWatch } from '@/utils/monitor';
import './global.less';

initWatch();
// MODELS_PATH 根据模型来进行model的注册
// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = MODELS_PATH.map((item: string) => require(`./models/${item}`).default);
// 创建saga中间件方法
const sagaMiddleware = createSagaMiddleware();
// 根据model 生成对的reducer对象
const rootReducer = injectReducers(models);

// crate
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// 创建store 并且添加saga中间件
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
  ),
);

models.forEach(function (model) {
  // 生成对应的saga对象
  sagaMiddleware.run(getSaga(model.effects, model));
});

(function (containerId) {
  const render = ReactDOM.createRoot(document.getElementById(containerId)!);
  const theme = createTheme({
    typography: {
      fontFamily: ['zpix', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
    },
  });
  render.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <APP />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
  );
})('root');
