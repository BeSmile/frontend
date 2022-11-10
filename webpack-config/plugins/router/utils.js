/**
 * 转换chunkName
 * @param name    src/pages/home
 * @returns {*}   src__pages__home
 */
const convertChunkName = (name) => {
  return name.replace(/[[/_\].]/g, '__');
};

/**
 * 转换成react-router需要的变量
 * @param path          页面path名
 * @returns {string|*}
 */
const convertRoutePath = (path) => {
  if(path === '404') {
    return '*';
  }
  return path;
};

const getNoFileSuffix = (path) => {
  return path.replace(/\/index/gi, '').replace(/.ts(x)/gi, '');
};

module.exports = {
  convertRoutePath,
  convertChunkName,
  getNoFileSuffix,
};