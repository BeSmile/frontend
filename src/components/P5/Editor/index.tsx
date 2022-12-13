/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-05-27 11:29:00
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 22:17:15
 */
import React, { createContext } from 'react';
import { useUpdateEffect } from 'ahooks';
import useScript, { StatusEnum } from '@/hooks/useScript';

export const p5Context = createContext({});

const P5Editor: React.FC<any> = (props) => {
  const { Provider } = p5Context;
  const { children, setup, draw, width, height } = props;
  const loaded = useScript('/assets/js/p5/p5.min.js');

  const initP5 = (sketch: P5) => {
    sketch.setup = () => {
      sketch.createCanvas(width, height);
      setup(sketch);
    };
    sketch.draw = () => {
      draw?.(sketch);
    };
  };

  useUpdateEffect(() => {
    const p5 = window.p5;
    if (loaded !== StatusEnum.READY) return;
    new p5(initP5);
  }, [loaded]);

  return <Provider value={{}}>{children}</Provider>;
};

export default P5Editor;
