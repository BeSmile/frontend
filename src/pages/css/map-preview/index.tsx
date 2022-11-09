// @ts-nocheck
/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-06-01 09:57:49
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-06-03 10:24:57
 */
import React, { MutableRefObject, useRef, useState } from "react";
import styles from "./index.module.less";
import { useMount, useUpdateEffect } from "ahooks";

const clickArea = [
  {
    groupID: 6,
    top: "0.4rem",
    coords: [0, 80],
  },
  {
    groupID: 6,
    top: "0.4rem",
    coords: [107, 187],
  },
];

export default () => {
  // let tMatrix = [1, 0, 0, 1, 0, 0]; //x缩放，无，无，y缩放，x平移，y平移
  let offsetX = 0,
    offsetY = 0;
  // let upX = 0;
  // let upY = 0;
  // let isDoubleTouch = false; //是否为多触点
  let start = null;

  // 当前位移的距离
  const translatePointXRef: MutableRefObject<number> = useRef(0);
  const translatePointYRef: MutableRefObject<number> = useRef(0);
  // 上一次位移结束的位移距离
  const fillStartPointXRef: MutableRefObject<number> = useRef(0);
  const fillStartPointYRef: MutableRefObject<number> = useRef(0);
  const [canvasScale, setCanvasScale] = useState<number>(1);
  // const gestureend: any = new CustomEvent('gestureend');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<null | HTMLImageElement>(null);
  // const posRef = useRef<any>(null);
  const getPixelRatio = () => {
    // const backingStore =
    // context?.backingStorePixelRatio ||
    // context?.webkitBackingStorePixelRatio ||
    // context?.mozBackingStorePixelRatio ||
    // context?.msBackingStorePixelRatio ||
    // context?.oBackingStorePixelRatio ||
    // context?.backingStorePixelRatio ||
    // 1;
    return window.devicePixelRatio;
  };

  /*
   * 获取中点
   */
  // function getMidpoint(p1, p2) {
  //   var x = (p1.clientX + p2.clientX) / 2,
  //       y = (p1.clientY + p2.clientY) / 2;
  //   return [x, y];
  // }

  // /*坐标转换*/
  // function windowToCanvas(canvas, x,y) {
  //   var box = canvas.getBoundingClientRect();  //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
  //   return {
  //       x: x - box.left - (box.width - canvas.width) / 2,
  //       y: y - box.top - (box.height - canvas.height) / 2
  //   };
  // }

  const handleMoveMode = (downX: number, downY: number) => {
    const { current: canvas } = canvasRef;
    const { current: wrapper } = wrapperRef;
    const { current: fillStartPointX } = fillStartPointXRef;
    const { current: fillStartPointY } = fillStartPointYRef;

    let upX = downX;
    let upY = downY;
    const touchMove = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        var now = event.touches; //得到第二组两个点
        var scale =
          getDistance(now[0], now[1]) / getDistance(start[0], start[1]); //得到缩放比例
        // alert(scale);
        setCanvasScale(scale);
        return;
      }
      const moveX: number = event.touches[0].clientX;
      const moveY: number = event.touches[0].clientY;
      // // 更新现在的位移距离，值为：上一次位移结束的坐标+移动的距离
      translatePointXRef.current = fillStartPointX + (moveX - downX);
      translatePointYRef.current = fillStartPointY + (moveY - downY);
      // // 更新画布的css变化
      canvas.style.transform = `scale(${canvasScale},${canvasScale}) translate(${translatePointXRef.current}px,${translatePointYRef.current}px)`;
      upX = moveX;
      upY = moveY;
    };
    // 取消事件监听
    wrapper.removeEventListener("touchmove", touchMove);
    wrapper.addEventListener("touchmove", touchMove);
    const touchEnd = () => {
      // 鼠标抬起时候，更新“上一次唯一结束的坐标”
      console.log("touch");
      fillStartPointXRef.current = fillStartPointX + (upX - downX);
      fillStartPointYRef.current = fillStartPointY + (upY - downY);

      // 取消事件监听
      wrapper.removeEventListener("touchmove", touchMove);
      wrapper.removeEventListener("touchend", touchEnd);
    };
    wrapper.addEventListener("touchend", touchEnd);
  };

  const handleCanvas = () => {
    const { current: wrapper } = wrapperRef;
    const touchStart = (event: TouchEvent) => {
      // event.preventDefault();
      event.stopPropagation();
      const downX: number = event.touches[0].clientX;
      const downY: number = event.touches[0].clientY;
      if (event.touches.length >= 2) {
        start = event.touches; //得到第一组两个点
        return;
      }
      handleMoveMode(downX, downY);
    };
    wrapper.removeEventListener("touchstart", touchStart);
    wrapper.addEventListener("touchstart", touchStart);
  };

  function getDistance(p1: Touch, p2: Touch) {
    var x = p2.clientX - p1.clientX,
      y = p2.clientY - p1.clientY;
    return Math.sqrt(x * x + y * y);
  }

  //监听缩放画布
  useUpdateEffect(() => {
    const { current: canvas } = canvasRef;
    const { current: translatePointX } = translatePointXRef;
    const { current: translatePointY } = translatePointYRef;
    canvas &&
      (canvas.style.transform = `scale(${canvasScale},${canvasScale}) translate(${translatePointX}px,${translatePointY}px)`);
    return () => {
      handleCanvas();
    };
  }, [canvasScale]);

  useMount(() => {
    const h = canvasRef.current.clientHeight,
      w = canvasRef.current.clientWidth;
    const ctx = canvasRef.current.getContext("2d");

    const rt = getPixelRatio(ctx); // 屏幕像素比
    canvasRef.current.width = w * rt; // canvas的宽高要设置像素比 不然模糊
    canvasRef.current.height = h * rt;

    const img = new Image();
    img.src = "https://www.hnznit.com/jf_dev_lzl/static/6001.f09de894.png";
    img.onload = () => {
      const WIDTH = 300 * rt; // 设置固定要显示的内容宽高
      const scaleRatio = img.width / WIDTH; // 图片宽度缩放比
      imgRef.current = img;
      // 居中显示，计算原始左侧
      offsetX = Math.abs(WIDTH - w * rt) / 2; // 左侧原始偏移量
      // 图片的像素 需要 通过像素比绘制至地图内。
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        offsetX,
        offsetY,
        WIDTH,
        img.height / scaleRatio
      );
      // canvasEventsInit(ctx);
      canvasRef.current.style.transformOrigin = `${w / 2}px ${h / 2}px`;
      // 清除上一次变化的效果
      canvasRef.current.style.transform = "";
      ctx.font = "20px Georgia";
      ctx.fillText("Hello World!", 10, 50);
      ctx.font = "30px Verdana";
      // 创建一个渐变
      // 填充一个渐变
      ctx.fillText("Big smile!", 10, 90);
    };
    // canvasRef.current.addEventListener('touchstart', touchStart, false);
    // canvasRef.current.addEventListener('touchmove', mouseMove, false);
    // canvasRef.current.addEventListener('touchend', touchEnd, false);
    handleCanvas();
    canvasRef.current.addEventListener(
      "click",
      function (e) {
        console.log(e.offsetY);
        const group = clickArea.filter(
          (area) => e.offsetY >= area.coords[0] && e.offsetY <= area.coords[1]
        );
        console.log(group, "group");
      },
      false
    );
    // return () => {
    //   canvasRef.current.removeEventListener('touchstart', touchStart);
    //   canvasRef.current.removeEventListener('touchmove', mouseMove);

    //   canvasRef.current.removeEventListener('touchend', touchEnd);
    // }
  });

  return (
    <div className={styles.div} ref={wrapperRef}>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
};
