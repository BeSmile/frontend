import React from 'react';
import styles from './index.less';

type MarkdownPreviewType = React.HTMLAttributes<HTMLDivElement>;

const MarkdownPreview: React.FC<MarkdownPreviewType> = ({ children, ...props }) => {
  return (
    <div className={styles.markdownBody} {...props}>
      {children}
    </div>
  );
};

export default MarkdownPreview;
