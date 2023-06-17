import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export const CubeGrid: React.FC = () => {
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
