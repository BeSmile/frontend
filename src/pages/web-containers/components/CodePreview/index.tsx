import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import { useIdeaContext } from '@/pages/web-containers/context';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      flex: '0 0 400px',
      backgroundColor: theme.palette.common.white,
      boxShadow: 'none',
      border: 0,
      margin: 0,
      padding: 0,
    },
  }),
);

export const CodePreview = () => {
  const previewRef = useRef<HTMLIFrameElement>();
  const { serverUrl } = useIdeaContext();
  const styles = useStyles();

  return <Box className={styles.root} component="iframe" ref={previewRef} src={serverUrl} />;
};

export default CodePreview;
