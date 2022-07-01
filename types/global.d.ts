/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:41:28
 */
interface Window {
    //在这里声明xxx之后就能在文件中 window.xxx这样调用了
    // xxx: any;
    setup: () => void;
    draw: () => void;
}

declare module "*.svg";
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare module "*.less";
declare module "*.json";

// declare var process: any;
// declare var require: any;
declare var ENV_PATH: string;

declare var MODELS_PATH: Array<string>;
