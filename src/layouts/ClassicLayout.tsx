/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-21 17:16:16
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-27 15:44:01
 */
import React, { memo } from 'react';
// import ReactDOM from 'react-dom';
// import classnames from 'classnames/bind';
import ClassicMenu from './components/ClassicMenu';

import styles from './index.module.less';
// const cx = classnames.bind(styles);

const ClassicLayout = memo((props: { children: React.ReactNode }) => {
    return (
        <section className={styles.classicLayout}>
            <ClassicMenu />
            <div className={styles.classicLayoutContent}>{props.children}</div>
        </section>
    );
});

export default ClassicLayout;
