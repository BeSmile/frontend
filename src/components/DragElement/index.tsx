/*
 * @Description: 拖动组件
 * @Version: v1.0.0
 * @Author: BeSmile
 * @Date: 2021-01-25 14:50:34
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:50:05
 */
import React, { createRef, DragEvent, memo, MouseEvent, useEffect } from 'react';

interface DragComponentProps {
    children: React.ReactNode;
    offset: number; // 需要扣除的起始偏移量
    elementId: string; // 创建的元素的id
    onDragStart?: (e: DragEvent<HTMLDivElement>) => void; // 拖动开始事件
    onDrag?: (e: DragEvent<HTMLDivElement>) => void; // 拖动过程中事件
    onDragEnd?: (e: DragEvent<HTMLDivElement>) => void; // 拖动结束时间
}

const DragComponentFC = memo((props: DragComponentProps) => {
    const {
        children,
        offset = 0,
        onDragStart = () => {},
        onDragEnd = () => {},
        onDrag = () => {},
        elementId
    } = props;
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        // const target = e.target as HTMLDivElement;

        // console.log(e.clientY, e.pageY, e.movementY, e.screenY, target.offsetTop, target.scrollTop,' e');
    };
    const forwardRef: React.Ref<HTMLDivElement> = createRef();

    /**
     * 拖动开始、记录点击的位置
     * @param e callback event
     */
    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        // e.preventDefault();
        // console.log(e.clientY, e.screenY);
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const clickOffsetX = e.clientX - offset; // 获取元素内点击的相对坐标
        const clickOffsetY = e.clientY - rect.top; // 屏幕内的相对坐标

        e.dataTransfer.setData('offset', String(offset));
        e.dataTransfer.setData('elementId', elementId);
        e.dataTransfer.setData('clickOffsetX', String(clickOffsetX));
        e.dataTransfer.setData('clickOffsetY', String(clickOffsetY));
        onDragStart(e);
    };

    /**
     * 拖动过程中的事件
     * @param e callback event
     */
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        onDrag(e);
    };

    /**
     * 拖动结束
     * @param e callback event
     */
    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        onDragEnd(e);
    };

    useEffect(() => {
        if (!forwardRef.current) return;
        // console.log(forwardRef.current);
    }, [forwardRef]);

    return (
        <div
            onMouseMove={handleClick}
            draggable={true}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            ref={forwardRef}
        >
            {children}
        </div>
    );
});
export default DragComponentFC;
