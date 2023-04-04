import React, { useRef } from 'react';
import { useIdeaContext, useWebContainerContext } from '@/pages/web-containers/context';
import { Terminal as XTerminal } from 'xterm';
import 'xterm/css/xterm.css';
import { useEventListener, useUpdateEffect } from 'ahooks';
import Box from '@mui/material/Box';
import { FitAddon } from 'xterm-addon-fit';
import { WebContainerProcess } from '@webcontainer/api';

export const Terminal = () => {
  const terminalElRef = useRef<HTMLDivElement>(null);
  const webContainer = useWebContainerContext();
  const fitAddonRef = useRef<FitAddon>();
  const shellProcessRef = useRef<WebContainerProcess>();
  const { startShell, terminalInstance } = useIdeaContext();

  useUpdateEffect(() => {
    initTerminal().then((shellProcess) => {
      shellProcessRef.current = shellProcess;
    });
  }, [webContainer]);

  const initTerminal = async () => {
    const { current: terminalEl } = terminalElRef;

    fitAddonRef.current = new FitAddon();

    const terminal = new XTerminal({
      convertEol: true,
      rows: 10,
    });
    terminal.loadAddon(fitAddonRef.current);
    terminal.open(terminalEl!);

    fitAddonRef.current.fit();

    console.log('init terminal successfully');
    // 调用全局初始化,与code编辑器结合
    return startShell?.(terminal);
  };

  useEventListener('resize', () => {
    fitAddonRef.current?.fit();
    shellProcessRef.current?.resize({
      cols: terminalInstance?.cols || 20,
      rows: terminalInstance?.rows || 20,
    });
  });

  return <Box ref={terminalElRef} component="div" sx={{ height: 'auto', flex: '0 0 auto' }} />;
};

export default Terminal;
