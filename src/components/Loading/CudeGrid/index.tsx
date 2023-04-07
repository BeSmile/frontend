/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-05-27 11:51:38
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 15:15:01
 */
import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

interface CubeGridProps {}

export const CubeGrid: React.FC<CubeGridProps> = () => {
  return (
    <div className={styles.skContainer}>
      <div className={styles.skCubeGrid}>
        <div className={classNames(styles.skCube, styles.skCube1)} />
        <div className={classNames(styles.skCube, styles.skCube2)} />
        <div className={classNames(styles.skCube, styles.skCube3)} />
        <div className={classNames(styles.skCube, styles.skCube4)} />
        <div className={classNames(styles.skCube, styles.skCube5)} />
        <div className={classNames(styles.skCube, styles.skCube6)} />
        <div className={classNames(styles.skCube, styles.skCube7)} />
        <div className={classNames(styles.skCube, styles.skCube8)} />
        <div className={classNames(styles.skCube, styles.skCube9)} />
      </div>
    </div>
  );
};
export default CubeGrid;
