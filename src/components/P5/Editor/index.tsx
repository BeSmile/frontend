/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-05-27 11:29:00
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 22:17:15
 */
import React, { createContext } from "react";
import { useMount } from "ahooks";
// import CubeGrid from '../Loading/cubeGrid';

export const p5Context = createContext({});
let p5: P5;

interface P5Props {
  children: React.ReactNode;
  setup?: (fn: any) => void;
  draw?: (fn: any) => void;
}

const P5Editor: React.FC<P5Props> = (props) => {
  const { Provider } = p5Context;
  const { children, setup, draw } = props;
  const drawCallback = function () {
    draw?.(p5);
  };

  useMount(() => {
    const script = document.createElement("script");
    script.src = "/assets/js/p5/p5.min.js";
    window.setup = function () {
      const _this: any = window;
      p5 = {
        createCanvas: function (w: number, h: number) {
          p5.width = w;
          p5.height = h;
          return _this.createCanvas(w, h);
        },
        floor: _this.floor,
        background: _this.background,
        noLoop: _this.noLoop,
        frameRate: _this.frameRate,
        noise: _this.noise,
        // width: _this.width,
        // height: _this.height,
        rect: _this.rect,
        fill: _this.fill,
      };
      setup?.(p5);
    };
    script.onload = function () {
      window.draw = drawCallback;
      window.setup();
    };
    document.head.append(script);
    return () => {
      document.head.removeChild(script);
      window.draw = () => {};
      window.setup = () => {};
    };
  });

  return <Provider value={{}}>{children}</Provider>;
};

export default P5Editor;
