/*
 * @Description: 左侧menu右键菜单
 * @Version: v1.0.0
 * @Author: BeSmile
 * @Date: 2021-01-19 17:18:30
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-01-19 18:06:30
 */
import React, { isValidElement, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMount } from 'ahooks';

interface ContextMenuProps {
    children: React.ReactElement | string;
    offsetX: number;
    offsetY: number;
}

const useMenuContextMenu = (id: string) => {
    const portalRef = useRef(document.createElement('div'));
    portalRef.current.id = `menu-context-${new Date().valueOf()}`;

    const ele = document.getElementById(id);

    useMount(() => {
        ele.appendChild(portalRef.current);
        return () => {
            ele.removeChild(portalRef.current);
        };
    });

    return (props: ContextMenuProps) => {
        const { children, offsetX, offsetY, ...otherProps } = props;
        portalRef.current.style.position = 'fixed';
        portalRef.current.style.left = `${offsetX}px`;
        portalRef.current.style.top = `${offsetY}px`;

        return createPortal(
            isValidElement(children)
                ? React.cloneElement(children, {
                      ...otherProps
                  })
                : children,
            portalRef.current
        );
    };
};
export default useMenuContextMenu;
