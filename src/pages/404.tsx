import React from 'react';
import { Link } from 'react-router-dom';
import styles from './404.module.less';

function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.catContainer}>
        <div className={styles.catEar}></div>
        <div className={styles.catFace}>
          <div className={styles.catEyes}></div>

          <div className={styles.catMouth}></div>

          <div className={styles.catWhiskers}></div>
        </div>
        <div className={styles.catBody}>
          <div className={styles.catLeg}></div>
          <div className={styles.catLeg}></div>
          <div className={styles.catTail}></div>
        </div>
      </div>
      <h1>Oops! Page not found!</h1>
      <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link to="/">返回首页</Link>
    </div>
  );
}

export default PageNotFound;
