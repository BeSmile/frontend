import React from 'react';
import styles from './index.less';

const MarkdownPreview: React.FC<any> = ({ children, ...props }) => {
  return (
    <div className={styles.markdownBody} {...props}>
      {children}
    </div>
  );
};

export default MarkdownPreview;
