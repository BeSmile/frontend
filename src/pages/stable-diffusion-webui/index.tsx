import React from 'react';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';
import UiMD from './index.md';

const WebUI: React.FC = () => {
  return <MarkdownPreview dangerouslySetInnerHTML={UiMD()} />;
};

export default WebUI;
