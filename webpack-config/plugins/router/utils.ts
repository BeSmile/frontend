/**
 * 转换chunkName
 * @param name    src/pages/home
 * @returns {*}   src__pages__home
 */
export const convertChunkName = (name: string) => {
  return name.replace(/[[/_\].]/g, '__');
};

/**
 * 转换成react-router需要的变量
 * @param path          页面path名
 * @returns {string|*}
 */
export const convertRoutePath = (path: string) => {
  if(path === '404') {
    return '*';
  }
  return path;
};

export const getNoFileSuffix = (path: string) => {
  const routerPath = path.replace(/\/index/gi, '').replace(/.ts(x)/gi, '');
  return routerPath === '/404' ? '*' : routerPath === '' ? '/' : routerPath;
};

export const getLazyComponentPath = (componentPath: string) => `^React.lazy(() => import(/* webpackChunkName: "${convertChunkName(componentPath)}" */'@/${componentPath}'))$`;