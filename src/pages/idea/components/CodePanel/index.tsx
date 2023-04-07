import React from 'react';
import { CodePanelProps } from './types';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { CodeEditor } from '../CodeEditor';

export const CodePanel = ({ activeTabs }: CodePanelProps) => {
  return activeTabs.map((item) => (
    <TabPanelUnstyled key={`tab-${item.id}`} value={item.id}>
      <CodeEditor value="" />
    </TabPanelUnstyled>
  ));
};

export default CodePanel;
