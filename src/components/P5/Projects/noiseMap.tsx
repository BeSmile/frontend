import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import P5Editor from '@/components/P5/Editor';

const NoiseMap = forwardRef<{
  up: () => void;
  down: () => void;
}>((_, ref) => {
  const inc = 0.1;
  const scl = 10;
  let cols = 0;
  let rows = 0;
  let start = 0;

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const p5Ref = useRef<P5 | null>(null);
  const setup = (p5: P5) => {
    p5Ref.current = p5;
    const { current: dom } = canvasRef;
    const w = dom?.clientWidth || 0;
    const h = dom?.clientHeight || 0;
    const canvas = p5.createCanvas(w, h);
    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);
    canvas.parent('p5');
  };

  const draw = (p5: P5) => {
    p5.background(220);
    let yoff = start;
    for (let y = 0; y < rows; y++) {
      // loadPixels();
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        // var index = (x + y * p5.width);
        const r = p5.noise(xoff, yoff);
        xoff += inc;
        let color = '0';
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
    // p5.noLoop();
    p5.frameRate();
  };

  const up = () => {
    start += inc;
    p5Ref.current?.frameRate();
  };

  const down = () => {
    start -= inc;
    p5Ref.current?.frameRate();
  };

  useImperativeHandle(ref, () => ({
    up,
    down,
  }));

  return (
    <P5Editor draw={draw} setup={setup}>
      <div ref={canvasRef} id="p5" style={{ width: '100%', height: '100%' }} />
    </P5Editor>
  );
});

export default NoiseMap;
