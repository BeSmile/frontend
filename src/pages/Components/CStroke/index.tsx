/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-06-18 13:51:32
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-06-18 18:13:16
 */
import React, { useRef } from "react";
import img from "./Building_Mini-Pod.png";
import { useMount } from "ahooks";

enum Direction {
  Top = "↑",
  Left = "←",
  Right = "→",
  Down = "↓",
  X = "*",
}

const CStroke = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrix: Array<Array<number>> = [];
  // 获得方向
  const getPixelDirection: (
    imageData: Array<Array<number>>,
    x: number,
    y: number
  ) => Direction = (imageData: Array<Array<number>>, x, y) => {
    const top = imageData[x][y - 1];
    const leftTop = imageData[x - 1][y - 1];
    const left = imageData[x - 1][y];
    const active = imageData[x][y];
    // console.log('-----');
    // console.log(`┏ ${leftTop} | ${top} ┓`);
    // console.log(`┗ ${left} | ${active} ┛`);
    // console.log('-----');

    if (
      (!leftTop && !top && !left && !active) ||
      (leftTop && top && !left && !active) ||
      (leftTop && top && left && !active) ||
      (!leftTop && top && !left && !active)
    )
      return Direction.Right;
    if (
      (!leftTop && !top && left && active) ||
      (!leftTop && top && left && active) ||
      (!leftTop && top && left && !active) ||
      (!leftTop && !top && left && !active)
    )
      return Direction.Left;

    if (
      (leftTop && !top && !left && !active) ||
      (leftTop && !top && left && active) ||
      (leftTop && !top && !left && active) ||
      (leftTop && !top && left && !active)
    )
      return Direction.Top;

    if (
      (!leftTop && top && !left && active) ||
      (!leftTop && !top && !left && active) ||
      (leftTop && top && !left && active)
    )
      return Direction.Down;

    return Direction.X;
  };

  useMount(() => {
    const { current: canvas } = canvasRef;
    const ctx: CanvasRenderingContext2D = canvas?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const width = canvas?.width || 0;
    const height = canvas?.height || 0;
    const image = new Image();
    image.src = img;
    image.onload = () => {
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        image.width * 2,
        image.height * 2
      );

      const imageData = ctx.getImageData(0, 0, width, height).data;
      // for (var i=0;i<imgData.data.length;i+=4) {
      //   imgData.data[i]=255-imgData.data[i];
      //   imgData.data[i+1]=255-imgData.data[i+1];
      //   imgData.data[i+2]=255-imgData.data[i+2];
      //   imgData.data[i+3]=0;
      // }

      ctx.clearRect(0, 0, width, height);
      for (let x = 0; x < height; x++) {
        matrix.push(new Array(width));
      }
      let startX: number = -1,
        startY: number = -1;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // todo 需要将imageData转换成x、y坐标
          const position = (x + y * width) * 4;
          var r = imageData[position],
            g = imageData[position + 1],
            b = imageData[position + 2];
          if (r + g + b !== 0) {
            ctx.fillStyle = "#dede";
            ctx.fillRect(x, y, 1, 1);
            matrix[y][x] = 1;
            // console.log(y, x);
            if (startX < 0) {
              startX = y;
              startY = x;
            }
          } else {
            matrix[y][x] = 0;
          }
        }
      }
      // console.log(matrix, start, end);
      // todo 进行描边
      // 先获得第一个位置
      // const prefix = getPixelDirection(matrix, startX, startY);
      // console.log("prefix", prefix, startX, startY);
      const walk = (x: number, y: number, direction?: string) => {
        let dir: Direction;
        switch (direction) {
          case Direction.Left:
            x--;
            break;
          case Direction.Top:
            y--;
            break;
          case Direction.Right:
            x++;
            break;
          case Direction.Down:
            y++;
            break;
          default:
            break;
        }
        dir = getPixelDirection(matrix, x, y);
        ctx.fillStyle = "#ff0033";
        ctx.fillRect(y, x, 1, 1);
        // console.log(x, y, dir);
        walk(x, y, dir);
        if (x == startX && y === startY) {
          return;
          // console.log('终止', dir, x, y);
        }
      };
      walk(startX, startY);
      // ctx.putImageData(imageData,0,0);
    };
  });

  return <canvas width="400" height="300" ref={canvasRef}></canvas>;
};

export default CStroke;
