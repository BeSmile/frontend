/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-05-28 14:34:23
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-09-17 15:28:48
 */
import React, { useEffect, useRef } from 'react';
// import { useSelector } from "react-redux";
import P5Editor from '@components/P5/Editor';
import _ from 'lodash';

var inc = 0.1;
var scl = 10;
var cols = 0;
var rows = 0;
var start = 0;

const NoiseMap: React.FC = () => {
    const p5Ref: {
        current;
    } = useRef<React.Ref<HTMLDivElement | null>>(null);
    // const { products } = useSelector((state: any) => state.product);
    const setup = (p5: any) => {
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;
        const canvas = p5.createCanvas(w, h);
        cols = p5.floor(p5.width / scl);
        rows = p5.floor(p5.height / scl);
        canvas.parent('p5');
    };

    const draw = (p5: any) => {
        p5.background(220);
        p5.clear();
        p5.noStroke();
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
                var color = '0';
                const or = Math.random();
                const opacity = or < 0.1 ? or : 0;
                if (r > 0.8) {
                    // color = `rgba(${255},${255}, ${255}, ${opacity})`;
                    color = `rgba(${0},${0}, ${0}, ${opacity})`;
                } else if (r > 0.6) {
                    // color = `rgba(${255},${0}, ${0}, ${opacity})`;
                    color = `rgba(${0},${0}, ${0}, ${opacity * 1.1})`;
                } else if (r > 0.4) {
                    // color = `rgba(${0},${200}, ${255}, ${opacity})`;
                    color = `rgba(${0},${0}, ${0}, ${opacity * 1.2})`;
                } else {
                    // color = `rgba(${0},${0}, ${255}, ${opacity})`;
                    color = `rgba(${0},${0}, ${0}, ${opacity * 1.3})`;
                }
                p5.fill(color);
                p5.rect(x * scl, y * scl, scl, scl);
            }
            yoff += inc;
        }
        // start += inc;
        // p5.noLoop();
        p5.frameRate();
    };

    useEffect(() => {
        const { current: p5Container } = p5Ref;
        if (!p5Container) return;
        const debounceMouse = _.throttle((e: MouseEvent) => {
            start = Math.sqrt(Math.pow(e.offsetX, 2) + Math.pow(e.offsetY, 2)) / 10;
        }, 1000 / 60);
        p5Container.addEventListener('mousemove', debounceMouse);
    }, [p5Ref]);

    return (
        <div ref={p5Ref}>
            <P5Editor draw={draw} setup={setup}>
                <div id="p5" />
            </P5Editor>
        </div>
    );
};

export default NoiseMap;
