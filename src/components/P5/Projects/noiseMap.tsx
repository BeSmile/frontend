// @ts-nocheck
/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-05-28 14:34:23
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 22:15:21
 */
import React, { useRef } from "react";
// import { useSelector } from "react-redux";
import P5Editor from "@/components/P5/Editor";

var inc = 0.1;
var scl = 10;
var cols = 0;
var rows = 0;
var start = 0;

const NoiseMap: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  // const { products } = useSelector((state: any) => state.product);
  const setup = (p5: P5) => {
    const { current: dom } = canvasRef;
    const w = dom.clientWidth;
    const h = dom.clientHeight;
    const canvas = p5.createCanvas(w, h);
    console.log(p5.width, canvas);
    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);
    canvas.parent("p5");
  };

  const draw = (p5: P5) => {
    p5.background(220);
    console.log(rows, "rows");
    var yoff = start;
    for (var y = 0; y < rows; y++) {
      // loadPixels();
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        // var index = (x + y * p5.width);
        var r = p5.noise(xoff, yoff);
        xoff += inc;
        // pixels[index + 0] = r;
        // pixels[index + 1] = r;
        // pixels[index + 2] = r;
        // pixels[index + 0] = 255;
        var color = "0";
        if (r > 0.8) {
          color = `rgba(${255},${255}, ${255}, 1)`;
        } else if (r > 0.6) {
          color = `rgba(${255},${0}, ${0}, 1)`;
        } else if (r > 0.4) {
          color = `rgba(${0},${200}, ${255}, 1)`;
        } else {
          color = `rgba(${0},${0}, ${255}, 1)`;
        }
        p5.fill(color);
        p5.rect(x * scl, y * scl, scl, scl);
        // stroke(255)
      }
      yoff += inc;
    }
    start += inc;
    // p5.noLoop();
    p5.frameRate();
  };
  return (
    <P5Editor draw={draw} setup={setup}>
      <div ref={canvasRef} id="p5" style={{ width: "100%", height: "100%" }} />
    </P5Editor>
  );
};

export default NoiseMap;
