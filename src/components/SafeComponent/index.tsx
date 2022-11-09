/*
 * @Description: safeComponent
 * @Version: 1.0.0
 * @Author: BeSmile
 * @Date: 2021-12-14 13:59:31
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-18 11:26:04
 */
import React, { Component } from 'react';

type SafeComponentProps = {
  component: React.FunctionComponent | React.ComponentClass;
};

type SafeComponentState = {
  hasError: boolean;
};

class SafeComponent extends Component<SafeComponentProps, SafeComponentState> {
  constructor(props: SafeComponentProps | Readonly<SafeComponentProps>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // 渲染备用ui
  static getDerivedStateFromError() {
    return { hasError: false };
  }

  componentDidUpdate() {}

  render() {
    const { hasError } = this.state;
    const { component: Component } = this.props;
    if (hasError) return <h1>something has Error</h1>;
    return <Component />;
  }
}

export default SafeComponent;
