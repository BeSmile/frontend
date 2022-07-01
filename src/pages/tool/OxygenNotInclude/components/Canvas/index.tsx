/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-06-09 10:11:29
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-06-21 16:26:44
 */
import React, { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import classnames from "classnames";
import { useMemoizedFn, useMount, useUpdateEffect } from "ahooks";
import styles from "./index.module.less";

// 这是生成后的图层属性
interface LayerState {
    canvas: HTMLCanvasElement | null; //画布内容
    visible: boolean; // 是否显示隐藏
    matrix: Array<Array<number>>;
    items: Array<any>;
    name: string;
}

interface LayerAlias {
    waterPipe?: LayerState; // 水管
    ventilationPipe?: LayerState; // 通风
    grid?: LayerState;
    building?: LayerState;
}

type ID = number;

// state专用的config
interface LayerConfig {
    alias: string;
    name: string;
    visible: boolean;
}

// todo 多个类
/*
  图层类
  实体类
*/
class Vertex {
    x: number;
    y: number;
}

class Material {
    id: ID;
    image: null | HTMLImageElement;
    url: string;
}

type Matrix = Array<Array<number>>;

export class Element {
    pos: Vertex; // 这是坐标
    material: Material; // 这是材质属性
    matrix: Matrix; // 矩阵排列
    dimensions: Array<number>; // 占地
    type: string; // 类型名称
    category: "Plumbing";
    name: string; // 类型名称

    constructor(type: string, name: string, pos: Vertex, material: Material) {
        this.type = type;
        this.name = name;
        this.pos = pos;
        this.material = material;
    }
}

// 画布组件
const Canvas = ({ active }: any) => {
    // 初始化数据
    const WaterPipe: LayerConfig = {
        alias: "水管",
        visible: false,
        name: "waterPipe"
    };
    const VentilationPipe: LayerConfig = {
        alias: "通风",
        visible: false,
        name: "ventilationPipe"
    };
    const Grid: LayerConfig = {
        alias: "栅格",
        visible: true,
        name: "grid"
    };
    const Building: LayerConfig = {
        alias: "建筑",
        visible: true,
        name: "building"
    };

    const Layers = [Grid, WaterPipe, VentilationPipe, Building]; // 默认要显示的组件

    const [layersConfig, setLayersConfig] = useState<Array<LayerConfig>>(() => {
        return Layers.map((layer: LayerConfig) => {
            return layer;
        });
    });

    const drawLayer = useRef<HTMLCanvasElement>();
    const wrapperRef = useRef<HTMLDivElement>();
    const imagesCacheRef = useRef<any>({});
    const canvasRef = useRef<HTMLCanvasElement>();
    const layersRef = useRef<LayerAlias>({});
    const ratio = window.devicePixelRatio;
    const rowsRef = useRef<number>(0); // 列数
    const colsRef = useRef<number>(0); // 列数
    const requestAnimationRef = useRef<number>();
    const moveRef = useRef<any>(null);
    const PIXEL_WIDTH = 40; // 一格子占的数量

    /**
     * 获得经过屏幕比计算后的坐标
     * @param point
     * @returns 返回缩放的的坐标
     */
    const getPixelWithRatio = (point: number) => {
        return point * ratio;
    };

    // 多个图层
    // 建筑图层-通风图层-水管图层-自动化图层
    const initCanvas = () => {
        const { current: canvas } = canvasRef;
        const ctx: CanvasRenderingContext2D = canvas?.getContext("2d");
        const w = canvas.clientWidth,
            h = canvas.clientHeight;
        // 设置像素比
        canvas.width = getPixelWithRatio(w);
        canvas.height = getPixelWithRatio(h);
        ctx.fillStyle = "#dedede";
        const rows = Math.ceil(w / PIXEL_WIDTH);
        const cols = Math.ceil(h / PIXEL_WIDTH);
        ctx.strokeRect(
            0,
            0,
            getPixelWithRatio(rows * PIXEL_WIDTH),
            getPixelWithRatio(cols * PIXEL_WIDTH)
        );
        return [rows, cols];
    };

    /**
     * grid表格
     * @param rows 宽
     * @param cols 高
     */
    const initGrid = (rows: number, cols: number) => {
        const { current: layers } = layersRef;
        const grid = layers?.grid;
        if (!grid) return;
        const ctx: CanvasRenderingContext2D = grid?.canvas?.getContext("2d");

        for (let i = 0; i < rows; i++) {
            for (let y = 0; y < cols; y++) {
                const px = i * PIXEL_WIDTH;
                const py = y * PIXEL_WIDTH;
                ctx.save();
                ctx.strokeStyle = "#888888";
                ctx.strokeRect(
                    px,
                    py,
                    getPixelWithRatio(PIXEL_WIDTH),
                    getPixelWithRatio(PIXEL_WIDTH)
                );

                // ctx.fillStyle='hsla(200,100%,50%,.5)';
                ctx.fillStyle = "#dedede";
                ctx.fillRect(
                    px,
                    py,
                    getPixelWithRatio(PIXEL_WIDTH),
                    getPixelWithRatio(PIXEL_WIDTH)
                );
                ctx.restore();
            }
        }
    };

    const renderMatrix = (rows: number, cols: number) => {
        const matrix = [];
        for (let i = 0; i < cols; i++) {
            matrix.push(new Array(rows));
        }
        return matrix;
    };

    // 初始化图层
    const initLayers = (rows: number, cols: number) => {
        layersConfig.forEach((layer: LayerConfig) => {
            const layerCanvas = document.createElement("canvas");
            layerCanvas.width = rows * PIXEL_WIDTH;
            layerCanvas.height = cols * PIXEL_WIDTH;
            layersRef.current[layer.name] = {
                canvas: layerCanvas,
                visible: layer.visible,
                matrix: renderMatrix(rows, cols), // 每个图层的栅格
                items: [],
                name: layer.name
            };
        });
    };

    // 生成图片
    const renderImage = (id: string, url: string) => {
        return new Promise((resolve, reject) => {
            if (imagesCacheRef.current[id]) {
                resolve(imagesCacheRef.current[id]);
            } else {
                const image = new Image();
                image.src = url;
                image.onload = function () {
                    imagesCacheRef.current[id] = image;
                    resolve(image);
                };
                image.onerror = () => {
                    reject(null);
                };
            }
        });
    };

    // // 建议生成电池图层
    // const renderBox = () => {
    //   const {
    //     current: {
    //       building,
    //     },
    //   } = layersRef;
    //   const ctx: CanvasRenderingContext2D = building?.canvas?.getContext('2d');
    //   if(imagesCacheRef.current) {
    //     ctx.drawImage(imagesCacheRef.current, 0, 0, PIXEL_WIDTH * 2 * ratio, PIXEL_WIDTH * 2 * ratio)
    //     return;
    //   }

    //   const image = new Image();
    //   image.src = BuildingSmartBattery;
    //   image.onload = function(event) {
    //     console.log(event);
    //     imagesCacheRef.current = image;
    //     ctx.drawImage(image, 0, 0, PIXEL_WIDTH * 2 * ratio, PIXEL_WIDTH * 2 * ratio)
    //   }
    // }

    const animate = () => {
        const { current: canvas } = canvasRef;
        const ctx: CanvasRenderingContext2D = canvas?.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Object.values(layersRef.current).forEach((layer: LayerState) => {
            // const layerCtx: CanvasRenderingContext2D = layer?.getContext('2d');
            // ctx.save()//用来显示的canvas
            // ctx.globalCompositeOperation="destination-over";//设置多个图层如何混合，这个可以百度canvas混合模式，这个和PS是相近的
            if (!layer.canvas || !layer.visible) return;
            if (layer.name !== "grid") {
                layer.canvas
                    .getContext("2d")
                    .clearRect(0, 0, layer.canvas.width, layer.canvas.height);
            }
            layer.items.forEach((item: any) => {
                const tmpCtx = layer?.canvas?.getContext("2d");
                tmpCtx.save();
                tmpCtx.drawImage(
                    item.material.image,
                    0,
                    0,
                    item.material.image.width,
                    item.material.image.height,
                    item.pos.x * PIXEL_WIDTH,
                    item.pos.y * PIXEL_WIDTH,
                    PIXEL_WIDTH * item.dimensions[0],
                    PIXEL_WIDTH * item.dimensions[1]
                );
                tmpCtx.restore();
            });
            ctx.drawImage(
                layer?.canvas,
                0,
                0,
                canvas.width,
                canvas.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
        });

        // 绘制设计图层
        ctx.drawImage(
            drawLayer.current,
            0,
            0,
            canvas.width,
            canvas.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
        // renderBox();

        requestAnimationRef.current = requestAnimationFrame(animate);
    };

    // 利用公式转换一下坐标
    const generateLinePoint = (x: number, y: number) => {
        const scale = 1;
        const { current: wrap } = wrapperRef;
        const wrapWidth: number = wrap?.offsetWidth || 0;
        const wrapHeight: number = wrap?.offsetHeight || 0;
        // 缩放位移坐标变化规律
        // (transformOrigin - downX) / scale * (scale-1) + downX - translateX = pointX
        const pointX: number = ((wrapWidth / 2 - x) / 1) * (1 - scale) + x;
        const pointY: number = ((wrapHeight / 2 - y) / 1) * (1 - scale) + y;

        return {
            pointX,
            pointY
        };
    };

    // 生成材质
    const handleMaterial = async () => {
        if (!moveRef.current) return;
        moveRef.current.material.image = await renderImage(
            moveRef.current.material.id,
            moveRef.current.material.url
        );
    };

    /**
     * 清除画布内容
     * @param canvas canvas对象
     */
    const clearCanvas = (canvas: HTMLCanvasElement) => {
        const ctx: CanvasRenderingContext2D = canvas?.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    /**
     * 监听鼠标移动，绘制画布
     * @param x x坐标
     * @param y y坐标
     * @returns void
     */
    const handleMoveDesignLayer: (x: number, y: number) => void = (x, y) => {
        const ctx: CanvasRenderingContext2D = drawLayer.current?.getContext("2d");
        const { current: move } = moveRef;
        if (!move) return; // 材质未
        // todo 计算材质的宽高，进行材质的移动
        const image = move.material.image;
        const offsetX = Math.floor(move.matrix[0].length / 2);
        const offsetY = Math.floor(move.matrix.length / 2);
        // todo 需要进行矩阵判断是否可以绘制，不可以绘制进行边框标红
        clearCanvas(drawLayer.current); // 清除内容
        const ix = x - offsetX;
        const iy = y - offsetY;
        if (ix < 0) return;
        ctx.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            ix * PIXEL_WIDTH,
            iy * PIXEL_WIDTH,
            PIXEL_WIDTH * move.dimensions[0],
            PIXEL_WIDTH * move.dimensions[1]
        );
        move.pos = {
            x: ix,
            y: iy
        };
    };

    // 组件点击确定时调用
    const handleSingleDesignComplete = () => {
        // todo 判断是否可以确定
        clearCanvas(drawLayer.current);
        const { current: move } = moveRef;
        const { current: layers } = layersRef;
        // console.log(move);
        const type = move.type;
        const layer = layers[type];
        const ctx: CanvasRenderingContext2D = layer?.canvas?.getContext("2d");

        ctx.drawImage(
            move.material.image,
            0,
            0,
            move.material.image.width,
            move.material.image.height,
            move.pos.x * PIXEL_WIDTH,
            move.pos.y * PIXEL_WIDTH,
            PIXEL_WIDTH * 2,
            PIXEL_WIDTH * 2
        );

        layer.items.push(cloneDeep(move));
        console.log(layer);
        // todo 点击确定要进行矩阵的计算，并标记是否需要进行更新，以便绘制时进行优化
        // 确定重置状态
    };

    // 监听移动事件
    const handleMove: React.EffectCallback = useMemoizedFn(() => {
        const { current: wrap } = wrapperRef;
        const { current: move } = moveRef;
        const offsetLeft = wrap.offsetLeft;
        const offsetTop = wrap.offsetTop;
        handleMaterial(); // 生成移动绘制的材质
        const mouseMove = (event: MouseEvent) => {
            const moveX: number = event.pageX - offsetLeft; // 屏幕点击的坐标 - 容器偏移量
            const moveY: number = event.pageY - offsetTop;
            const { pointX, pointY } = generateLinePoint(moveX, moveY);
            const x = Math.floor(pointX / PIXEL_WIDTH);
            const y = Math.floor(pointY / PIXEL_WIDTH);
            // console.log(x, y, moveRef.current.material);
            handleMoveDesignLayer(x, y);
        };
        const mouseUp = () => {
            if (move) {
                handleSingleDesignComplete();
            }
        };
        wrap.addEventListener("mousemove", mouseMove);
        wrap.addEventListener("mouseup", mouseUp);
        return () => {
            wrap.removeEventListener("mousemove", mouseMove);
            wrap.removeEventListener("mouseup", mouseUp);
        };
    });

    // 初始化绘制图层
    const initDrawLayer = (rows, cols) => {
        const layerCanvas = document.createElement("canvas");
        layerCanvas.width = rows * PIXEL_WIDTH;
        layerCanvas.height = cols * PIXEL_WIDTH;
        drawLayer.current = layerCanvas;
    };

    useMount(() => {
        const [rows, cols] = initCanvas();
        initLayers(rows, cols); // 初始化所有基础图层
        initGrid(rows, cols); // 初始化表格图层
        initDrawLayer(rows, cols); // 初始化绘制图层
        rowsRef.current = rows;
        colsRef.current = cols;

        requestAnimationRef.current = requestAnimationFrame(animate);
    });

    useEffect(() => {
        moveRef.current = active;
    }, [active]);

    useUpdateEffect(() => {
        handleMove();
    }, [handleMove]);

    const triggerLayerConfig = (layer: LayerConfig) => {
        const la = layersConfig.map((lay: LayerConfig) => ({
            ...lay,
            visible: lay.name === layer.name ? !lay.visible : lay.visible
        }));
        setLayersConfig(la);
    };

    useEffect(() => {
        layersConfig.forEach((layer: LayerConfig) => {
            layersRef.current[layer.name].visible = layer.visible;
        });
    }, [layersConfig]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperBtnGroup}>
                {layersConfig.map((layer: LayerConfig) => (
                    <span
                        className={classnames({ active: layer.visible })}
                        onClick={triggerLayerConfig.bind(null, layer)}
                        key={layer.name}
                    >
                        {layer.alias}
                    </span>
                ))}
            </div>
            <div ref={wrapperRef} className={styles.wrapperCanvas}>
                <canvas width="800" height="600" ref={canvasRef} className={styles.canvas} />
            </div>
        </div>
    );
};

export default Canvas;
