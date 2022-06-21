/*
 * @Description: 根据route文件生成路由文件
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-19 10:23:52
 */
import React, { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet, useRoutes } from "react-router-dom";
import routes from "./config";
import CubeGridLoading from "@components/Loading/cubeGrid";
import SafeComponent from "@components/SafeComponent";
import { Route } from "route";

// 404 页面
const NotFound = lazy(() => import("../pages/NotFound/index"));

// lazyRoute
const SuspenseRoute = (Wrapper: React.FunctionComponent) => {
  return ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<Wrapper/>}>{children}</Suspense>
  );
};

const CubeLoadingRoute = SuspenseRoute(CubeGridLoading);

//父路由-使用懒加载
const generateRouter = (
  root: string,
  routes: Array<Route>
): RouteObject[] => {
  // {generateChildRouter(route.path, route.routes)}
  return routes.map((route: Route) => {
    // 获取页面的路由
    const RouteComponent = lazy(() => import(`../pages/${route.component}`));
    let ele = (
      <Suspense fallback={<CubeGridLoading/>}>
        <SafeComponent component={RouteComponent}/>
      </Suspense>
    );
    // 查看配置的菜单页面路由
    if (route?.layout) {
      const LayoutComponent = lazy(() => import(`../${route.layout}`));
      ele = (
        <CubeLoadingRoute>
          <LayoutComponent/>
        </CubeLoadingRoute>
      );
    }
    // 配置节点未分配布局的路由
    if (!route?.layout && route?.routes) {
      ele = (
        <CubeLoadingRoute>
          <Outlet/>
        </CubeLoadingRoute>
      );
    }
    const prefixPath = `${root}${route.path}`;
    
    return {
      path: prefixPath,
      element: ele, //
      children: generateRouter(
        prefixPath,
        route.routes || []
      ),
    };
  });
};

// 这是主路由
// 切换useRoutes模式
const RouteUI = function () {
  const rts = generateRouter("", routes);
  const baseRoute: RouteObject[] = [
    ...rts,
    {
      path: "*",
      element: (
        <CubeLoadingRoute>
          <NotFound/>
        </CubeLoadingRoute>
      ),
    }, // 配置404页面
  ];
  return useRoutes(baseRoute);
};

export default RouteUI;
