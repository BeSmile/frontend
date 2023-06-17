/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:49:11
 */
import { delay } from 'redux-saga/effects';
import without from 'lodash/without';

let toastPools: string | any[] = []; // 消息池
let activeToasts: string[] = []; // 活跃消息
const MAXTIME = 10000; //消息持续时间
const MAXTOTAL = 3;

interface MsmqState {
  toasts: Array<any>;
}

const initialState = {
  toasts: [],
};

async function getSocket(options: { onmessage: ((this: WebSocket, ev: MessageEvent<any>) => any) | null }) {
  let socket: WebSocket;
  if (typeof WebSocket == 'undefined') {
    console.log('您的浏览器不支持WebSocket');
  } else {
    console.log('您的浏览器支持WebSocket');
    //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
    socket = new WebSocket(`ws://localhost:8080/ws/${new Date().valueOf()}`);
    //打开事件
    socket.onopen = function () {
      console.log('Socket 已打开');
      return socket;
      //socket.send("这是来自客户端的消息" + location.href + new Date());
    };
    //获得消息事件
    socket.onmessage = options.onmessage;
    //关闭事件
    socket.onclose = function () {
      console.log('Socket已关闭');
    };
    //发生了错误事件
    socket.onerror = function () {
      // alert("Socket发生了错误");
      //此时可以尝试刷新页面
    };
  }
}

export default {
  namespace: 'msmq',
  state: initialState,
  effects: {
    *displayToast(toast: any | string, { put }: any) {
      activeToasts = [...activeToasts, toast];
      yield put({
        type: 'addMessage',
        payload: toast,
      }); //消息塞到活跃消息
      yield delay(MAXTIME); //消息展示时间
      activeToasts = without(activeToasts, toast); //消息移出
      yield put({
        type: 'destroyMessage',
        payload: toast,
      });
    },
    // 生成消息提示
    *messageWatcher(
      // eslint-disable-next-line no-empty-pattern
      {},
      { call }: any,
    ) {
      //启动socket
      yield call(getSocket, {
        onmessage: function (msg: { data: any | string }) {
          toastPools = [...toastPools, msg.data];
        },
      });
    },
    //调度器
    // eslint-disable-next-line no-empty-pattern
    *messageScheduler(
      // eslint-disable-next-line no-empty-pattern
      {},
      { put, call, fork }: any,
    ) {
      while (true) {
        if (toastPools.length > 0 && activeToasts.length <= MAXTOTAL) {
          const [fistMessage, ...remainingMessages] = toastPools;
          toastPools = remainingMessages;
          yield fork(this.displayToast, fistMessage, { put, call });
          yield delay(300);
        } else {
          yield delay(50);
        }
      }
    },
  },
  reducers: {
    // 添加消息
    addMessage: (state: MsmqState, action: any) => {
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    },
    // 销毁消息
    destroyMessage: (state: MsmqState, action: any) => {
      return {
        ...state,
        toasts: without(state.toasts, action.payload),
      };
    },
  },
};
