import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { createStyles, makeStyles } from '@mui/styles';

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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      flex: 1,
      height: '100%',
      overflow: 'hidden',
    },
  }),
);

type CodeEditorType = {
  value: string;
};

export const CodeEditor: React.FC<CodeEditorType> = ({ value }) => {
  const styles = useStyles();
  let editor: monaco.editor.IStandaloneCodeEditor;

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      editor = monaco.editor.create(editorRef.current, {
        value,
        language: 'typescript',
        theme: 'vs-dark',
        roundedSelection: true,
        scrollBeyondLastLine: true,
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return <div className={styles.root} ref={editorRef} />;
};

export default CodeEditor;
