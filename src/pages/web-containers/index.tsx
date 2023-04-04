import React, { useRef, useCallback } from 'react';
import { WebContainer } from '@webcontainer/api';
import PrimaryTheme from './Primary';
import { files } from '../idea/templates/files';
import { IdeaContextProvider } from './context';
import { Terminal } from 'xterm';
import { useMount, useBoolean, useSafeState } from 'ahooks';
import { iniRemoteFiles } from '../idea/helpers';
import { TreeNodeType } from '../idea/types';

const Idea = () => {
  const containerRef = useRef<WebContainer>();
  const terminalRef = useRef<Terminal>();
  const [projectFiles, setProjectFiles] = useSafeState<TreeNodeType[]>([]);
  const [serverUrl, setServerUrl] = useSafeState<string>('');
  const [sdkInited, { toggle: toggleSdkInited, setFalse }] = useBoolean(false);

  const initBackground = useCallback(async () => {
    // Call only once
    if (!containerRef.current) {
      containerRef.current = await WebContainer.boot();
    }
    return containerRef.current;
  }, []);

  useMount(() => {
    // 初始化文件数据
    setProjectFiles(iniRemoteFiles(files));

    initBackground().then((r) => {
      containerRef.current = r;
      toggleSdkInited();
    });
    return () => {
      containerRef.current?.teardown();
      containerRef.current = undefined;
      setFalse();
    };
  });

  async function startDevServer() {
    const { current: webContainerInstance } = containerRef;
    if (!webContainerInstance) {
      return;
    }

    await webContainerInstance.mount(files);
    // const packageJSON = await webContainerInstance.fs.readFile('package.json', 'utf-8');
    const installProcess = await webContainerInstance.spawn('npm', ['install']);

    const installExitCode = await installProcess.exit;

    if (installExitCode !== 0) {
      throw new Error('Unable to run npm install');
    }

    // `npm run dev`
    await webContainerInstance.spawn('npm', ['run', 'start']);

    // Wait for `server-ready` event
    webContainerInstance.on('server-ready', (_, url: string) => {
      setServerUrl(url);
    });
  }

  /**
   * 注册响应式terminal
   * @param terminal
   */
  const startShell = async (terminal: Terminal) => {
    const { current: webContainerInstance } = containerRef;

    terminalRef.current = terminal;

    const shellProcess = await webContainerInstance!.spawn('jsh', {
      terminal: {
        cols: terminal.cols,
        rows: terminal.rows,
      },
    });
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      }),
    );

    const input = shellProcess.input.getWriter();
    terminal.onData((data) => {
      input.write(data);
    });
    startDevServer();
    return shellProcess;
  };

  return (
    <IdeaContextProvider
      value={{
        projectFiles,
        tabBarIds: [],
        sdkInited,
        serverUrl,
        activeTabs: [],
        webContainerInstance: containerRef.current,
        terminalInstance: terminalRef.current,
        startShell,
      }}
    >
      <PrimaryTheme />
    </IdeaContextProvider>
  );
};

export default Idea;
