const glob = require('glob');
const path = require('path');
const fs = require('fs');

const PROJECT_PATH = process.cwd();
const ROUTER_PATH = `${PROJECT_PATH}/src/router`;
const LAYOUT_PATH  = `${PROJECT_PATH}/src/layouts`;
const layoutKey = '@@/global-layout';

const existBaseLayout = (path) => {
  return fs.existsSync(path);
};

const isExistDefaultLayout = existBaseLayout(`${LAYOUT_PATH}/index.tsx`);

const generateRouter = (options) => {
  const config = Object.assign({
    PAGE_DIR: 'src/pages',
  }, options);
  const FULL_PAGE_DIR = `${PROJECT_PATH}/${config.PAGE_DIR}`
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
    routerComponents: {${Object.values(routerComponents).map(item =>
  `'${item.path}': React.lazy(() => import(/* webpackChunkName: "${item.chunkName}" */'${item.relativeRouterPath}'))`
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

const getPathParent = (path) => {
  return path.split('/').slice(0, -1).join('/');
};

const getNoFileSuffix = (path) => {
  return path.replace(/\/index/gi, '').replace(/.ts(x)/gi, '');
};

// 转换文件名至router对象
const convertFileNameToRouteStruct = (routerComponents) => {
  const ids =  Object.keys(routerComponents);
  return ids.reduce((routes, component) => {
    // 获取layout文件
    const layoutPath = `${getPathParent(component)}/_layout`;
    // 去除文件后缀
    const noFileSuffix = getNoFileSuffix(component);
    routes[noFileSuffix] = {
      // 供react-router-dom使用的path
      path: noFileSuffix,
      id: component.replace(/.ts(x)/gi, ''),
      // 判断是否存在layout目录文件
      parentId: ids.includes(layoutPath) && layoutPath !== noFileSuffix ? layoutPath : layoutKey,
      file: component,
    };
    return routes;
  }, {});
};

const getPagePath = (prefix, absolutePath) => {
  return absolutePath.replace(`${path.normalize(prefix)}/`, '');
};


// 'hub/event/form/$id/components/PropertiesTableFormItem': React.lazy(() => import(/* webpackChunkName: "src__pages__hub__event__form__$id__components__PropertiesTableFormItem" */'../../../src/pages/hub/event/form/$id/components/PropertiesTableFormItem.tsx')),
const convertLazyRoute = (files, pagesDirPath, pageDir) => {
  const routesComponents =  files.reduce((prev, fileName) => {
    const relativeRouterPath = path.relative(ROUTER_PATH, fileName);
    const relativePagesPath = getPagePath(pagesDirPath, fileName);
    const chunkName = getNoFileSuffix(`${pageDir}/${relativePagesPath}`).replace(/[[/_\].]/g, '__');
    const pathKey =  getNoFileSuffix(relativePagesPath);
    prev[pathKey] = {
      path: pathKey,
      // src__pages__build__Data
      chunkName,
      relativeRouterPath,
    };
    return prev;
  }, {});
  
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

module.exports = generateRouter;