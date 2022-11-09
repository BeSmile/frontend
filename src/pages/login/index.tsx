/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 23:29:12
 */
import React from "react";
import { Button, Form, Input } from "antd";

const BaseLogin = () => {
  return (
    <Form>
      <Form.Item
        required
        rules={[{ required: true, message: "用户名不3能为空" }]}
        label="用户名12"
        name="name"
      >
        <Input />
      </Form.Item>
      <Form.Item required label="用户名" name="name">
        <Button type="primary" htmlType="submit">
          login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BaseLogin;
