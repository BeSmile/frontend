import fs from 'fs';

/**
 * 是否是全局的css样式
 * @param resourcePath
 * @returns {boolean}
 */
export const isGlobalCssRule = (resourcePath: string) => {
    // antd样式与global.css, index.css走全局样式
    const Global_Style = [/antd/i, /global.css$/i, /index.css$/i, /monaco-editor/i, /(\w+).css/i];
    return Global_Style.some((reg) => reg.test(resourcePath));
};

export const mkdir = (pathName: string) => {
    const isExist =  fs.existsSync(pathName);
    if(isExist) {
        return;
    }
    fs.mkdirSync(pathName);
};