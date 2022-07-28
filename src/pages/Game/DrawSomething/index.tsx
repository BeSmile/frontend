/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-06-07 11:38:13
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-03 15:55:16
 */
import React, { useEffect, useRef, useState } from 'react';
import { useMount } from 'ahooks';
import { fromEvent, map, merge } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import styles from './index.module.less';

export default () => {
    const MOVE_MODE: number = 0; // 移动模式
    const LINE_MODE: number = 1; // 划线模式
    const ERASER_MODE: number = 2; // 橡皮擦模式
    const [mouseMode, setMouseMode] = useState<number>(LINE_MODE); // 模式
    const drawRef = useRef<HTMLDivElement>();
    const eraserRef = useRef<HTMLDivElement>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [canvasScale] = useState<number>(1);
    const context2dRef = useRef<CanvasRenderingContext2D>(null);
    const ratio = window.devicePixelRatio; // 屏幕的像素比

    const socketIoRef = useRef<Socket>(null);

    // 当前位移的距离
    const translatePointXRef = useRef<number>(0); //
    const translatePointYRef = useRef<number>(0);
    // 上一次位移结束的位移距离
    const fillStartPointXRef = useRef<number>(0);
    const fillStartPointYRef = useRef<number>(0);

    /**
     * 返回生成对应像素比的点
     * @param point 点位
     * @returns 与像素比乘积
     */
    const getPixelPoint = (point: number) => {
        return point * ratio;
    };

    // 拖动地图
    const handleMoveMode = (downX: number, downY: number) => {
        const { current: wrapper } = wrapperRef;
        const { current: canvas } = canvasRef;
        const { current: fillStartPointX } = fillStartPointXRef;
        const { current: fillStartPointY } = fillStartPointYRef;
        const mouseMove = (event: MouseEvent) => {
            const moveX: number = event.pageX;
            const moveY: number = event.pageY;

            // 更新现在的位移距离，值为：上一次位移结束的坐标+移动的距离
            translatePointXRef.current = fillStartPointX + (moveX - downX);
            translatePointYRef.current = fillStartPointY + (moveY - downY);

            // 更新画布的css变化
            canvas.style.transform = `scale(${canvasScale},${canvasScale}) translate(${translatePointXRef.current}px,${translatePointYRef.current}px)`;
        };
        wrapper.removeEventListener('mousemove', mouseMove);
        wrapper.addEventListener('mousemove', mouseMove);
        const mouseUp = (event: MouseEvent) => {
            const upX: number = event.pageX;
            const upY: number = event.pageY;

            // 鼠标抬起时候，更新“上一次唯一结束的坐标”
            fillStartPointXRef.current = fillStartPointX + (upX - downX);
            fillStartPointYRef.current = fillStartPointY + (upY - downY);
            wrapper.removeEventListener('mousemove', mouseMove);
            wrapper.removeEventListener('mouseup', mouseUp);
        };
        wrapper.addEventListener('mouseup', mouseUp);
    };

    // io 发送
    const ioLineEmit = (type, action, data) => {
        const { current: socket } = socketIoRef;
        console.log(
            {
                type,
                action,
                data: data
            },
            'data'
        );
        socket.emit(
            'line',
            JSON.stringify({
                type,
                action,
                data: data
            })
        );
    };

    // 利用公式转换一下坐标
    const generateLinePoint = (x: number, y: number) => {
        const { current: wrap } = wrapperRef;
        const { current: translatePointX } = translatePointXRef;
        const { current: translatePointY } = translatePointYRef;
        const wrapWidth: number = wrap?.offsetWidth || 0;
        const wrapHeight: number = wrap?.offsetHeight || 0;
        // 缩放位移坐标变化规律
        // (transformOrigin - downX) / scale * (scale-1) + downX - translateX = pointX
        const pointX: number =
            ((wrapWidth / 2 - x) / canvasScale) * (canvasScale - 1) + x - translatePointX;
        const pointY: number =
            ((wrapHeight / 2 - y) / canvasScale) * (canvasScale - 1) + y - translatePointY;

        return {
            pointX,
            pointY
        };
    };

    // 画线
    const handleLineMove = (downX: number, downY: number, type: any) => {
        const { current: wrapper } = wrapperRef;
        const { current: canvas } = canvasRef;
        const { current: context } = context2dRef;
        const offsetLeft: number = canvas.offsetLeft;
        const offsetTop: number = canvas.offsetTop;
        // 减去画布偏移的距离（以画布为基准进行计算坐标）
        downX = downX - offsetLeft;
        downY = downY - offsetTop;

        const { pointX, pointY } = generateLinePoint(downX, downY);
        context.globalCompositeOperation = type;
        context.beginPath();
        // 设置画笔起点
        context.moveTo(getPixelPoint(pointX), getPixelPoint(pointY));

        // socket推送画线数据
        ioLineEmit(LINE_MODE, 'start', {
            x: pointX,
            y: pointY
        });
        const mouseMove = (event: MouseEvent) => {
            const moveX: number = event.pageX - offsetLeft;
            const moveY: number = event.pageY - offsetTop;
            const { pointX, pointY } = generateLinePoint(moveX, moveY);
            // 开始绘制画笔线条~
            context.lineTo(getPixelPoint(pointX), getPixelPoint(pointY));
            ioLineEmit(LINE_MODE, 'move', {
                x: pointX,
                y: pointY
            });
            context.stroke();
        };
        wrapper.removeEventListener('mousemove', mouseMove);
        wrapper.addEventListener('mousemove', mouseMove);
        const mouseUp = () => {
            context.closePath();
            ioLineEmit(LINE_MODE, 'close', {
                x: pointX,
                y: pointY
            });
            wrapper.removeEventListener('mousemove', mouseMove);
            wrapper.removeEventListener('mouseup', mouseUp);
        };
        wrapper.addEventListener('mouseup', mouseUp);
    };

    // 鼠标按下操作
    const mouseDown = (event: MouseEvent) => {
        event.stopPropagation();
        const { current: canvas } = canvasRef;
        const { current: wrap } = wrapperRef;
        const downX: number = event.pageX;
        const downY: number = event.pageY;
        switch (mouseMode) {
            case MOVE_MODE:
                handleMoveMode(downX, downY);
                break;
            case LINE_MODE:
                handleLineMove(downX, downY, 'source-over');
                canvas.style.cursor = 'url("http://cdn.algbb.cn/pencil.ico") 6 26, pointer';
                wrap.style.cursor = 'default';
                break;
            case ERASER_MODE:
                handleLineMove(downX, downY, 'destination-out');
                canvas.style.cursor = 'url("http://cdn.algbb.cn/eraser.ico") 6 26, pointer';
                wrap.style.cursor = 'default';
                break;
            default:
                break;
        }
    };

    // const handleWheel = () => {
    // const { deltaY } = e
    // // 这里要注意一下，我是0.1来递增递减，但是因为JS使用IEEE 754，来计算，所以精度有问题，我们自己处理一下
    // const newScale: number = deltaY > 0
    //   ? (canvasScale * 10 - 0.1 * 10) / 10
    //   : (canvasScale * 10 + 0.1 * 10) / 10
    // if (newScale < 0.1 || newScale > 2) return
    // setCanvasScale(newScale)
    // };

    const initCanvasEvent = () => {
        const { current: wrapper } = wrapperRef;
        wrapper.removeEventListener('mousedown', mouseDown);
        wrapper.addEventListener('mousedown', mouseDown);
    };

    /**
     * 初始化canvas
     */
    const initCanvas = () => {
        // const ratio = window.devicePixelRatio;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const clientWidth = canvas.clientWidth,
            clientHeight = canvas.clientHeight;
        console.log(ratio);
        canvas.width = clientWidth * ratio;
        canvas.height = clientHeight * ratio;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        context2dRef.current = ctx;
        // ctx.fillStyle = "#000";
        // ctx.fillRect(0,0,canvas.width, canvas.height);
        initCanvasEvent();
    };

    const initSocket = () => {
        const socket: Socket = io('ws://192.168.0.114:3000/stuff', {
            reconnectionDelayMax: 10000,
            auth: {
                token: '123'
            },
            query: {
                username: '牛子华'
            }
        });
        socket.on('connect', () => {
            console.log(socket.connected); // false
        });
        socket.on('welcome', (msg) => {
            console.log(msg); // false
        });
        socket.on('line', (msg) => {
            const msgObject = JSON.parse(msg);
            // const { current: wrapper } = wrapperRef;
            // const { current: canvas } = canvasRef;
            const { current: context } = context2dRef;
            const handleLineMoveListen = (data) => {
                const point = msgObject.data;
                switch (data.action) {
                    case 'start':
                        context.globalCompositeOperation =
                            msgObject.type === LINE_MODE ? 'source-over' : 'color';
                        context.beginPath();
                        // 设置画笔起点
                        context.moveTo(getPixelPoint(point.x), getPixelPoint(point.y));
                        break;
                    case 'move':
                        // 设置画笔起点
                        context.lineTo(getPixelPoint(point.x), getPixelPoint(point.y));
                        context.stroke();
                        break;
                    case 'close':
                        context.closePath();
                        break;
                    default:
                        break;
                }
            };

            switch (msgObject.type) {
                case LINE_MODE:
                    handleLineMoveListen(msgObject);
                    break;
            }
        });
        socketIoRef.current = socket;
    };

    useMount(() => {
        initCanvas();
        initSocket();
    });

    useEffect(() => {
        const draw$: any = fromEvent(drawRef.current, 'click');
        const eraser$: any = fromEvent(eraserRef.current, 'click');
        const drawPipe$ = draw$.pipe(map(() => LINE_MODE));
        const eraserPipe$ = eraser$.pipe(map(() => ERASER_MODE));
        const combine$ = merge(drawPipe$, eraserPipe$).subscribe(setMouseMode);
        return () => {
            combine$.unsubscribe();
            draw$.unsubscribe();
            eraser$.unsubscribe();
        };
    }, []);

    return (
        <>
            <div ref={wrapperRef} className={styles.wrapper}>
                <canvas ref={canvasRef} className={styles.canvas} />
            </div>
            <div className={styles.tWrapper}>
                <div className={styles.tool}>
                    <div ref={drawRef}>
                        <img alt="pencil" src="http://cdn.algbb.cn/pencil.ico" />
                    </div>
                    <div ref={eraserRef}>
                        <img alt="pencil" src="http://cdn.algbb.cn/eraser.ico" />
                    </div>
                </div>
            </div>
        </>
    );
};
