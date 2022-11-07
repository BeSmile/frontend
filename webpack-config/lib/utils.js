/**
 * 是否是全局的css样式
 * @param resourcePath
 * @returns {boolean}
 */
const isGlobalCssRule = (resourcePath) => {
    // antd样式与global.css, index.css走全局样式
    const Global_Style = [/antd.css$/i, /global.css$/i, /index.css$/i];
    // console.log(resourcePath, 'global', Global_Style.some(reg => reg.test(resourcePath)));
    return Global_Style.some((reg) => reg.test(resourcePath));
};

module.exports = {
    isGlobalCssRule
};
