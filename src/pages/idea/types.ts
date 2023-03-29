import { FILE_TYPE } from './const';
import { FILE_STAT } from '@/pages/idea/models/file';
import { WebContainer, WebContainerProcess } from '@webcontainer/api';
import { Terminal } from 'xterm';

export type TreeNodeType = {
  label: string;
  // 内容
  contents: string;
  path: string;
  key: string;
  type: FILE_TYPE;
  stat: FILE_STAT;
  children: TreeNodeType[];
};

export type TabType = {
  id: string;
  // 文件内容
  fileContent: TreeNodeType;
};

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
