import { WebContainer, WebContainerProcess } from '@webcontainer/api';
import { Terminal } from 'xterm';
import { TabType, TreeNodeType } from '@/pages/idea/types';

export type IdeaContextType = {
  // tabbar打开的文件id,
  tabBarIds: string[];
  // webContainer容器
  webContainerInstance?: WebContainer;
  terminalInstance?: Terminal;
  startShell: (terminal: Terminal) => Promise<WebContainerProcess>;
  // 是否加载完成
  sdkInited: boolean;
  serverUrl: string;

  projectFiles: TreeNodeType[];
  activeTabs: TabType[];
};
