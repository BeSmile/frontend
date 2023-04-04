import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import iframeInit from './iframe';

const useStyles = makeStyles(() =>
  createStyles({
    iframe: {
      border: 'none',
    },
  }),
);

export type forwardRefProps = {
  iframe: HTMLIFrameElement | null;
};

export type CodeIframeProps = {};

// eslint-disable-next-line react/display-name
export const CodeIframe = forwardRef<forwardRefProps, CodeIframeProps>((_, forwardedRef) => {
  const styles = useStyles();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const initEnv = useCallback(iframeInit, []);

  useEffect(() => {
    const { current: iframe } = iframeRef;

    if (!iframe || !iframe.contentDocument || !iframe.contentWindow) {
      return;
    }
    return initEnv(iframe.contentWindow, iframe.contentDocument);
  }, [initEnv]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      iframe: iframeRef.current,
    }),
    [],
  );

  return <iframe ref={iframeRef} className={styles.iframe} />;
});

export default CodeIframe;
