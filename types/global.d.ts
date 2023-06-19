/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:41:28
 */

interface Constructable<T> {
  new (...args: any): T;
}

interface Window {
  //在这里声明xxx之后就能在文件中 window.xxx这样调用了
  luckysheet?: any;
  p5: Constructable<P5>;
  Babel: any;
}

declare module '*.svg';
declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.md';

declare module '*.less';
declare module '*.json';

// declare var process: any;
// declare var require: any;
declare let ENV_PATH: string;

declare let MODELS_PATH: Array<string>;

declare module 'less-vars-to-js';
