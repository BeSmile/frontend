/*
 * @Description: 根据route文件生成路由文件
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-19 10:23:52
 */
import React from "react";
import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { getRoutes } from "./router";
import LazyRoute from "@/router/components/LazyRoute";
import { useMount, useSafeState } from "ahooks";

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
const generateRouter = (root: string, router: GRouter): RouteObject[] => {
  const routes = Object.values(router.routes || {});

  return routes.map((route) => {
    return {
      path: `${root}/${route.path}`,
      element: <LazyRoute source={router.routerComponents[route.parentId]} />,
      children: [
        {
          path: "",
          element: <LazyRoute source={router.routerComponents[route.path]} />,
        },
      ],
    };
  });
};

// 这是主路由
const RouteUI = function () {
  const [routes, setRoutes] = useSafeState<RouteObject[]>([]);
  useMount(async () => {
    const rs = (await getRoutes()) as unknown as GRouter;
    const rts = generateRouter("", rs);
    const baseRoute: RouteObject[] = [
      ...rts,
      // {
      // 	path: '*',
      // 	element: (
      // 		<CubeLoadingRoute>
      // 			<NotFound/>
      // 		</CubeLoadingRoute>
      // 	)
      // }
    ];
    setRoutes(baseRoute);
  });

  return <div>{useRoutes(routes)}</div>;
};

export default RouteUI;
