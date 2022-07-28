/*
 * @Description: 显示面板
 * @Version: v1.0.0
 * @Author: BeSmile
 * @Date: 2021-01-25 15:07:08
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-27 16:02:26
 */
import React, { DragEvent, memo, useContext, useRef } from 'react';
import DesignContext from '../DesignContext';
import styles from './index.less';

// const cx = classnames.bind(styles)

interface DesignPanelProps {
    children: React.ReactNode;
}

const DesignPanelFC = memo((props: DesignPanelProps) => {
    const { children } = props;
    const { handleDragElement } = useContext(DesignContext);

    const panelRef: React.Ref<HTMLDivElement | null> = useRef<HTMLDivElement>();

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log(e);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log(e);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log(e, 'e', e.pageX, e.screenX, e.movementX);

        // const target: HTMLDivElement = e.target as HTMLDivElement;
        // const offsetX = e.screenX - target.offsetLeft;
        // const offsetY = e.screenY - target.offsetTop;
        // console.log('容器内偏移量', offsetX, offsetY);
        const offset = Number(e.dataTransfer.getData('offset'));
        const clickOffsetX = Number(e.dataTransfer.getData('clickOffsetX'));
        const clickOffsetY = Number(e.dataTransfer.getData('clickOffsetY'));
        const elementId = e.dataTransfer.getData('elementId');

        const positionOffsetX = e.clientX - offset - clickOffsetX - panelRef.current.offsetLeft;
        const positionOffsetY = e.clientY - clickOffsetY;
        console.log('结束时候的坐标', positionOffsetX, positionOffsetY);

        handleDragElement({
            x: positionOffsetX,
            y: positionOffsetY,
            elementId
        });
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragEnter}
            ref={panelRef}
            onDrop={handleDrop}
            className={styles.designPanelContentPanel}
        >
            {children}
        </div>
    );
});
export default DesignPanelFC;
