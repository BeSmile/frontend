import React from 'react';
import md from './md';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';

const TsFC = () => {
  return <MarkdownPreview dangerouslySetInnerHTML={md.ReactTS()} />;
};

export default TsFC;
