import React from 'react';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';
import GitMD from './git.md';

const Git = () => {
  return <MarkdownPreview dangerouslySetInnerHTML={GitMD()} />;
};

export default Git;
