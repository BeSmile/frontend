/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:50:30
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Snackbar from "@atom/Snackbar";

const mapRouteToProps = (state) => ({
  toasts: state.msmq.toasts,
});

const startMSMQ = (dispatch) => {
  dispatch({
    type: "msmq/messageWatcher",
  });
  dispatch({
    type: "msmq/messageScheduler",
  });
  dispatch = null;
};

const ToastUI = (props: any) => {
  const { toasts, dispatch } = props;
  useEffect(
    () => {
      startMSMQ(dispatch);
    },
    []
  );
  return (
    <React.Fragment>
      {toasts.map((
        toast,
        index
      ) => (
        <Snackbar index={index} toast={toast} key={toast}/>
      ))}
    </React.Fragment>
  );
};
const Toast = connect(mapRouteToProps)(ToastUI);

export default Toast;
