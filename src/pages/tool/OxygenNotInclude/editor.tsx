/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-06-08 11:10:19
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-06-18 11:43:58
 */
import React, { useState } from "react";
import EditorMenu from "./components/Menu";
import EditorCanvas from "./components/Canvas";
import styles from "./index.module.less";

const Editor: React.FC = () => {
  const [active, setActive] = useState<any>();
  return (
    <div className={styles.container}>
      <div className={styles.containerMenu}>
        <EditorMenu handleDesign={setActive}/>
      </div>
      <div className={styles.containerBody}>
        <EditorCanvas active={active}/>
      </div>
    </div>
  );
};

export default Editor;
