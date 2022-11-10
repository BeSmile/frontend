/*
 * @Description: 根据route文件生成路由文件
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-19 10:23:52
 */
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { getRoutes } from './router';
import LazyRoute from '@/router/components/LazyRoute';
import { useMount, useSafeState } from 'ahooks';

type IRouter = {
  path: string;
  id: string;
  parentId: string;
  file: string;
};

type GRouter = {
  routes: {
    [path: string]: IRouter;
  };
  routerComponents: {
    [path: string]: React.LazyExoticComponent<any>;
  };
};

// 父路由-使用懒加载
const generateRouter = (root: string, router: GRouter): RouteObject => {
  const routes = Object.values(router.routes || {});
  // 根据parentId过滤出数组
  // const parentId = root ? root : '@@/global-layout';
  const routeComponentId = root || '@@/global-layout';

  if (root === '@@/global-layout') {
    return {
      path: root,
      children: [],
    };
  }
  const childrenRoutes = routes.filter((route) => route.parentId === routeComponentId);
  const rootPath = root ? router.routes[root].path.replace('/_layout', '') : '';
  return {
    path: root ? rootPath : '',
    element: <LazyRoute source={router.routerComponents[routeComponentId]} />,
    children:
      childrenRoutes.length <= 0
        ? []
        : childrenRoutes.map((route) => {
            // 根据root获取route的下一个
            const gRouter = generateRouter(route.id, router);
            return {
              ...gRouter,
              path: !rootPath ? gRouter.path : gRouter.path?.replace(`${rootPath}/`, ''),
            };
          }),
  } as RouteObject;
};

// 这是主路由
const RouteUI = function () {
  const [routes, setRoutes] = useSafeState<RouteObject[]>([]);
  useMount(async () => {
    const originRoutes = (await getRoutes()) as unknown as GRouter;
    const baseRoute: RouteObject[] = [generateRouter('', originRoutes)];
    setRoutes(baseRoute);
  });

  return <div>{useRoutes(routes)}</div>;
};

export default RouteUI;
