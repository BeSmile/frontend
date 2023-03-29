import React from 'react';
import { ActivityBar, SideBar, MenuBar, Tabbar } from './components';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { getThemeMedia } from '@/utils/theme';
import { CodeEditor, CodePreview, Terminal } from '@/pages/idea/components';
import Box from '@mui/material/Box';

// pallete 调色盘地址
const ideaTheme = createTheme({
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
    },
  });
});

export const PrimaryTheme = () => {
  const styles = useStyles();

  return (
    <ThemeProvider<Theme> theme={ideaTheme}>
      <section className={styles.root}>
        <div className={styles.menuBar}>
          <MenuBar />
        </div>
        <section className={styles.body}>
          <ActivityBar />
          <SideBar />
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Tabbar />
            <CodeEditor value="" />
            <Terminal />
          </Box>
          <CodePreview />
        </section>
      </section>
    </ThemeProvider>
  );
};

export default PrimaryTheme;
