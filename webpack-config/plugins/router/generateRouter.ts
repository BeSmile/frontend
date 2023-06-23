import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { getLazyComponentPath, getNoFileSuffix } from './utils';

const PROJECT_PATH = process.cwd();
const ROUTER_PATH = `${PROJECT_PATH}/src/router`;

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
  const routers: Router[] = [{
    path: '/',
    component: getLazyComponentPath('layouts/index'),
    routes: generateRoutes({
      files,
      dirName: '/',
      absolutePagesPath : FULL_PAGE_DIR
    })
  }];
  // 处理404页面
  const handleRoutes = routers.map(route => route.path === '/404' ? { ...route, path: '&'} : route);
  // 生成icons的页面
  handleRoutes.push({
    path: '/components/icons',
    component: getLazyComponentPath('.runtime/plugin-icons/page'),
  } as Router);
  // const routerComponents = convertLazyRoute(files, FULL_PAGE_DIR, config.PAGE_DIR);
  // const routers = convertFileNameToRouteStruct(routerComponents);
  fs.writeFile(`${ROUTER_PATH}/router.tsx`, `
// @ts-nocheck
import React from 'react';
export function getRoutes() {
  return ${JSON.stringify(handleRoutes).replace(/"\^/g,'').replace(/\$"/g, '').replace(/\\"/g, '\'')};
}
  `, {
    encoding: 'utf8',
  }, (err) => {
    if(err) {
      console.error(err);
    }
  });
};

type Router = {
  path: string;
  // 文件路径
  component: string | undefined;
  routes?: Router[]
}

type RoutesOptions = {
  // 文件夹目录
  dirName: string;
  // 所有的文件目录
  files: string[];
  // path的绝对路径
  absolutePagesPath: string;
}
const generateRoutes = ( {
  dirName,
  files,
  absolutePagesPath,
}: RoutesOptions): Router[] => {
  const pagesDir = path.join(absolutePagesPath, dirName);
  const paths = fs.readdirSync(pagesDir);
  // console.log(paths, 'paths', pagesDir);
  const getAbsolutePath = (absolutePagesPath: string, dirName: string, name:string) => {
    return path.join(absolutePagesPath, dirName, name);
  };
  // 目录
  const childDirs = paths.filter(p =>  fs.lstatSync(getAbsolutePath(absolutePagesPath, dirName, p)).isDirectory()).filter(path => path!=='components');
  const jsxFiles = paths.filter(p =>  fs.lstatSync(getAbsolutePath(absolutePagesPath, dirName, p)).isFile()).filter(path => /.tsx$/.exec(path) && path!=='_layout');
  const rootName = dirName === '/' ? '' : dirName;
  const getComponentPath = (pathName: string): string | undefined => {
    const layoutPath = `${pathName}/_layout.tsx`;
    // React.lazy(() => import(/* webpackChunkName: "__web-containers____layout__tsx" */"@/pages/web-containers/_layout.tsx"))
    // React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.tsx'))
    return fs.existsSync(path.join(absolutePagesPath, layoutPath)) ?  getLazyComponentPath(`pages${layoutPath}`) : undefined;
  };
  return [
    ...childDirs.map(dirPath => ({
      path: rootName + '/' + dirPath,
      component: getComponentPath(`${rootName}/${dirPath}`),
      routes: generateRoutes({
        dirName: rootName + '/' + dirPath,
        files,
        absolutePagesPath: absolutePagesPath,
      })
    })),
    ...jsxFiles.map(jsxPath => ({
      path: getNoFileSuffix(rootName + '/' + jsxPath),
      component: getLazyComponentPath(`pages${rootName}/${jsxPath}`),
    }))
  ];
};

export default generateRouter;