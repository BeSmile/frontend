import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { convertChunkName, convertRoutePath, getNoFileSuffix } from './utils';

const PROJECT_PATH = process.cwd();
const ROUTER_PATH = `${PROJECT_PATH}/src/router`;
const LAYOUT_PATH  = `${PROJECT_PATH}/src/layouts`;
const layoutKey = '@@/global-layout';

/**
 * 是否存在默认文件
 */
const isExistDefaultLayout = fs.existsSync(`${LAYOUT_PATH}/index.tsx`);

type Options = {
  // pages的目录
  PAGE_DIR: string;
}

const generateRouter = (options?: Options) => {
  const config = Object.assign({
    PAGE_DIR: 'src/pages',
  }, options);
  const FULL_PAGE_DIR = `${PROJECT_PATH}/${config.PAGE_DIR}`;
  
  const pattern = `${FULL_PAGE_DIR}/**/*.tsx`;

  const files = glob.sync(pattern).filter(file => !file.includes('/components/'));
  
  const routerComponents = convertLazyRoute(files, FULL_PAGE_DIR, config.PAGE_DIR);
  
  const routers = convertFileNameToRouteStruct(routerComponents);
  
  fs.writeFile(`${ROUTER_PATH}/router.tsx`, `
// @ts-nocheck
import React from 'react';
export async function getRoutes() {
  return {
    routes: ${JSON.stringify(routers).replace(/"/g, '\'')},
    routerComponents: {${Object.keys(routerComponents).map(id =>
    `'${id}': React.lazy(() => import(/* webpackChunkName: "${routerComponents[id].chunkName}" */'${routerComponents[id].relativeRouterPath}'))`
  )}},
  };
}
  `, {
    encoding: 'utf8',
  }, (err) => {
    if(err) {
      console.error(err);
    }
  });
};

const getPathParent = (path: string) => {
  return path.split('/').slice(0, -1).join('/');
};

type RouterComponent = {
  [key: string]: {
    path?: string;
    chunkName: string;
    relativeRouterPath: string;
  }
}

type Routers ={
  [key:string]:{
    path: string;
    id: string;
    file: string;
    parentId: string;
  }
}

/**
 * 转换文件名至router对象
 * @param routerComponents routers数组对象
 * @returns {{}}
 */
const convertFileNameToRouteStruct = (routerComponents: RouterComponent) => {
  const ids =  Object.keys(routerComponents);
  return ids.reduce((routes: Routers, id: string) => {
    // 获取父目录,并判断是否存在_layout文件
    const layoutPath = `${getPathParent(id)}/_layout`;
    // 去除文件后缀
    routes[id] = {
      // 供react-router-dom使用的path
      path: convertRoutePath(id),
      id,
      // 判断是否存在layout目录文件
      parentId: ids.includes(layoutPath) && layoutPath !== id ? layoutPath : layoutKey,
      file: routerComponents[id].relativeRouterPath,
    };
    return routes;
  }, {} as Routers);
};

const getPagePath = (prefix: string, absolutePath: string) => {
  return absolutePath.replace(`${path.normalize(prefix)}/`, '');
};

/**
 * 将文件名转换为 id => component 集合
 * @param files   文件数组
 * @param absolutePagePath  页面路径在文件系统的绝对路径   ${Local}/src/pages
 * @param pageDir   src/pages
 * @returns {*}
 */
const convertLazyRoute = (files: string[], absolutePagePath: string, pageDir: string): RouterComponent => {
  const routesComponents =  files.reduce((prev: RouterComponent, fileName: string) => {
    // 获取页面文件至router文件的相对路径 ../../等等
    const relativeRouterPath = path.relative(ROUTER_PATH, fileName);
    // 获得页面路径相对src/pages的路径
    const relativePagesPath = getPagePath(absolutePagePath, fileName);
    // 取得以src/pages/文件名下的chunkName
    const chunkName = convertChunkName(getNoFileSuffix(`${pageDir}/${relativePagesPath}`));
    // 通过文件路径获得id, 去除后缀的文件名
    const pathId =  getNoFileSuffix(relativePagesPath);
    const name = pathId === 'index' ? '/' : pathId;
    prev[name] = {
      chunkName,
      relativeRouterPath,
    };
    return prev;
  }, {} as RouterComponent);
  
  if(isExistDefaultLayout) {
    // React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.tsx'))
    routesComponents[layoutKey] = {
      path: layoutKey,
      chunkName: 'layouts__index',
      relativeRouterPath: '@/layouts/index.tsx',
    };
  }
  
  return routesComponents;
};

export default generateRouter;