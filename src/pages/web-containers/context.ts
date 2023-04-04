import { createContext, useContext } from 'react';
import { IdeaContextType } from './types';

const ideaDefaultValue: IdeaContextType = {
  tabBarIds: [],
  sdkInited: false,
  activeTabs: [],
} as unknown as IdeaContextType;

export const IdeaContext = createContext<IdeaContextType>(ideaDefaultValue);

export const IdeaContextProvider = IdeaContext.Provider;

export const useTerminalContext = () => {
  const { terminalInstance } = useContext(IdeaContext);
  return terminalInstance;
};

export const useWebContainerContext = () => {
  const { webContainerInstance } = useContext(IdeaContext);
  return webContainerInstance;
};

export const useIdeaContext = () => {
  return useContext(IdeaContext);
};

/**
 * 左侧条context
 * 会增加其他额外的组合
 */
export const useSideBarContext = () => {
  const { projectFiles } = useContext(IdeaContext);
  // 增加比如文件类型,icon
  // 文件是否被编辑

  return {
    projectFiles,
  };
};

export const useIdeaTabsContext = () => {
  const { activeTabs } = useIdeaContext();
  return activeTabs;
};
