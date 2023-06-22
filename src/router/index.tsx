/*
 * @Description: 根据route文件生成路由文件
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-19 10:23:52
 */
import React, { memo, useId } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getRoutes } from './router';
import LazyRoute from '@/router/components/LazyRoute';

type Router = {
  path: string;
  // 文件路径
  component: any;
  routes?: Router[];
};

const generateRouterUI = (routes: Router[]) => {
  return routes.map((route) => {
    return (
      <Route path={route.path} key={useId()} element={route?.component ? <LazyRoute source={route?.component} /> : undefined}>
        {generateRouterUI(route?.routes || [])}
      </Route>
    );
  });
};

// 这是主路由
const RouteUI = function () {
  const routes = getRoutes() as Router[];

  return <Routes>{generateRouterUI(routes)}</Routes>;
};

export default memo(RouteUI);
