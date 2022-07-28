/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-27 12:00:26
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:50:20
 */
import React, { memo, useRef } from 'react';
// import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import DesignIcon from '@assets/icons/design.png';
import styles from '../../index.module.less';
import { useUpdateEffect } from 'ahooks';

// const cx = classnames.bind(styles)

// Fix: https://github.com/facebook/react/issues/18706
// 在lazy下最上层的组件无法或组件的宽度 为0
const ClassMenuFC = memo(() => {
    const menuRef: React.Ref<HTMLDivElement | null> = useRef(null);
    const dispatch = useDispatch();

    useUpdateEffect(() => {
        // const d = ReactDOM.findDOMNode(menuRef.current) as HTMLDivElement;
        // console.log(menuRef.current.getBoundingClientRect().width);
        dispatch({
            type: 'theme/updateBuildTheme',
            payload: {
                menuSpace: 60
            }
        });
    }, [menuRef]);

    return (
        <div ref={menuRef} className={styles.classicLayoutMenu}>
            <div>
                <img alt="design" src={DesignIcon} />
                <p>Design</p>
            </div>
            <div>
                <img alt="workflow" src={DesignIcon} />
                <p>WorkFlow</p>
            </div>
            <div>
                <img alt="data" src={DesignIcon} />
                <p>Data</p>
            </div>
        </div>
    );
});
export default ClassMenuFC;
