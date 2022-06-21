/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 23:29:12
 */
import React from "react";
import { useSafeState } from "ahooks";

const BaseLogin = (props: any) => {
  const [name, setName] = useSafeState("");
  const [password, setPassword] = useSafeState("");
  
  function handleName(e) {
    setName(e.target.value);
  }
  
  function handlePassword(e: any): void {
    setPassword(e.target.value);
  }
  
  const { dispatch, history } = props;
  // console.log(history, 'history');
  return (
    <div>
      <div>
        name:
        <br />
        <input onChange={handleName.bind(this)} value={name} />
      </div>
      <div>
        password:{" "}
        <input onChange={handlePassword.bind(this)} value={password} />
      </div>

      <div
        onClick={() => {
          dispatch({
            type: "login/login",
            callback: function () {
              history.push("/domain");
            },
          });
        }}
      >
        点击登录
      </div>
    </div>
  );
};

// const Login = connect()(withRouter(BaseLogin));

export default BaseLogin;
