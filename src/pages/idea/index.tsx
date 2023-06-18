import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityBar, SideBar, MenuBar, Tabbar, CodeEditor } from './components';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { getThemeMedia } from '@/utils/theme';
import Box from '@mui/material/Box';
import { CodeIframe, forwardRefProps } from '@/pages/sandbox/components';
import TabsUnstyled, { tabsUnstyledClasses } from '@mui/base/TabsUnstyled';
import TabPanelUnstyled, { tabPanelUnstyledClasses } from '@mui/base/TabPanelUnstyled';
import { TreeNodeType } from '@/pages/idea/types';
import { iniRemoteFiles } from '@/pages/idea/helpers';
import { useCreation, useSelections, useUnmount, useMount } from 'ahooks';
import { files } from '../idea/templates/files';
import { SingleSelectTreeViewProps } from '@mui/lab/TreeView/TreeView';
import EmptyTab from '@/pages/idea/components/EmptyTab';
import { findIndex } from 'lodash';

// pallete 调色盘地址
export const ideaTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#232730',
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});

const useStyles = makeStyles((theme: Theme) => {
  const toolStyle = getThemeMedia('toolbar', theme);
  return createStyles({
    root: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      flexDirection: 'column',
      '& .margin-view-overlays': {
        borderRight: `1PX solid ${theme.palette.grey.A700}`,
        right: theme.spacing(0.5),
      },
      // '& .view-lines': {
      //   paddingLeft: theme.spacing(0.5)
      // }
    },
    menuBar: {
      height: toolStyle?.minHeight || 48,
    },
    body: {
      flex: 1,
      height: '100%',
      display: 'flex',
      // backgroundColor: ideaTheme.palette.primary.dark,
      [`& .${tabsUnstyledClasses.root}`]: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      [`& .${tabPanelUnstyledClasses.root}`]: {
        height: '100%',
      },
    },
  });
});

export const IdeaLayout = () => {
  const styles = useStyles();
  const [projectFiles, setProjectFiles] = useState<TreeNodeType[]>([]);
  const [value, setValue] = useState<TreeNodeType | undefined>(undefined);
  const { select: triggerNodeSelect, selected, unSelect, setSelected } = useSelections<TreeNodeType>([]);
  const globalGraphRef = useRef({});

  useMount(() => {
    globalGraphRef.current = {};
    setProjectFiles(iniRemoteFiles(files, globalGraphRef.current));
  });

  useUnmount(() => {
    setProjectFiles([]);
    setSelected([]);
  });

  useEffect(() => {
    if (!selected.length) {
      setValue(undefined);
    }
  }, [selected]);

  const handleChange = (tab: TreeNodeType) => {
    setValue(tab);
  };

  const iframeRef = useRef<forwardRefProps>(null);

  // const handleExecCode = () => {
  //   if (!iframeRef.current) {
  //     return;
  //   }
  //   iframeRef.current?.iframe?.contentWindow?.postMessage({
  //     entry: 'index.tsx',
  //     source: [],
  //   });
  // };
  //
  const handleNodeSelect: SingleSelectTreeViewProps['onNodeSelect'] = useCreation(
    () => (_, nodeIds) => {
      const activatedNode = globalGraphRef.current[nodeIds];
      activatedNode && triggerNodeSelect(activatedNode);
      setValue(activatedNode || undefined);
    },
    [globalGraphRef.current],
  );

  const handleRemoveItem = useCallback(
    (tab: TreeNodeType) => {
      const subIndex = findIndex(selected, tab);
      const activeTab = selected.length > 1 ? (subIndex === 0 ? selected[1] : selected[subIndex - 1]) : undefined;
      setValue(activeTab);
      unSelect(tab);
    },
    [unSelect, selected],
  );

  return (
    <ThemeProvider<Theme> theme={ideaTheme}>
      <section className={styles.root}>
        <div className={styles.menuBar}>
          <MenuBar />
        </div>
        <section className={styles.body}>
          <ActivityBar />
          <SideBar projectFiles={projectFiles} activated={value} onNodeSelect={handleNodeSelect} />
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <TabsUnstyled value={value?.key || ''}>
              <Tabbar activated={value} onRemoveItem={handleRemoveItem} activeTabs={selected} onChange={handleChange} />
              {selected.map((item) => (
                <TabPanelUnstyled key={`tab-${item.key}`} value={item.key}>
                  <CodeEditor value={item.code} />
                </TabPanelUnstyled>
              ))}
              <TabPanelUnstyled key="tab-0" value="">
                <EmptyTab />
              </TabPanelUnstyled>
            </TabsUnstyled>
          </Box>
          <CodeIframe ref={iframeRef} />
        </section>
      </section>
    </ThemeProvider>
  );
};

export default IdeaLayout;
