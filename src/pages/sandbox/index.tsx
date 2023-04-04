import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { FILE_STAT } from '@/pages/idea/models/file';
import { FILE_TYPE } from '@/pages/idea/const';
import { CodeIframe, forwardRefProps } from '@/pages/sandbox/components';
import { TreeNodeType } from '../idea/types';

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  height: '100vh',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      flex: 1,
      height: '100%',
      overflow: 'hidden',
    },
    iframe: {
      border: 'none',
    },
  }),
);

const defaultCode: TreeNodeType = {
  children: [],
  key: '129387987',
  stat: FILE_STAT.NEW_FILE,
  type: FILE_TYPE.FILE,
  path: 'index.tsx',
  code: `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
ReactDOM.render(
  <React.StrictMode>
    <App/>
    <div>Hello, Sandbox!</div>
  </React.StrictMode>,
  document.getElementById('root')
);
`,
};

const Sandbox = () => {
  const styles = useStyles();
  let editor: monaco.editor.IStandaloneCodeEditor;
  const editorRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<forwardRefProps>(null);
  useEffect(() => {
    if (editorRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      editor = monaco.editor.create(editorRef.current, {
        value: defaultCode.code,
        language: 'typescript',
        theme: 'vs-dark',
        roundedSelection: false,
        scrollBeyondLastLine: false,
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);

  // const compiledCode = Babel.transform(code, {
  //   plugins: [
  //     ['transform-modules-commonjs'],
  //     ['transform-react-jsx'],
  //   ]
  // }).code;

  // console.log(compiledCode, 'compiledCode');

  // eval(compiledCode);
  const handleExecCode = () => {
    if (!iframeRef.current) {
      return;
    }
    iframeRef.current?.iframe?.contentWindow?.postMessage({
      entry: 'index.tsx',
      source: [
        {
          ...defaultCode,
          code: editor.getValue(),
        },
        {
          path: './App.tsx',
          code: 'import React from "react";const App = () => ( <div>3245</div> ); console.log(12345);;export default App;',
        },
      ],
    });
  };

  return (
    <Grid container spacing={0}>
      <Grid xs={6}>
        <Item>
          <Grid xs={12}>
            <IconButton onClick={handleExecCode}>
              <PlayCircleFilledWhiteIcon />
            </IconButton>
          </Grid>
          <Grid xs={12}>
            <div className={styles.root} ref={editorRef} />
          </Grid>
        </Item>
      </Grid>
      <Grid xs={6}>
        <Item>
          <CodeIframe ref={iframeRef} />
        </Item>
      </Grid>
    </Grid>
  );
};

export default Sandbox;
