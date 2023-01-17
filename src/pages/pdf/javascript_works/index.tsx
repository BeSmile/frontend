import React from 'react';
import Md from './数值.md';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';

const WuDao = () => {
  return <MarkdownPreview dangerouslySetInnerHTML={Md()} />;
};

export default WuDao;
