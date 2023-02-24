import React from 'react';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';
import IdeaMd from './idea.md';

const Idea = () => {
  return <MarkdownPreview dangerouslySetInnerHTML={IdeaMd()} />;
};

export default Idea;
