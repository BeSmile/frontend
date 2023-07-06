import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { createStyles } from '@mui/styles';
import { CSSProperties } from '@mui/material/styles/createMixins';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { useUnmount } from 'ahooks';
import IconButton from '@mui/material/IconButton';
import NoteModal from '@/pages/rocket/components/NoteModal';
import { useDictionaryContext } from '@/pages/rocket/context';
type SelectorProps = {
  // onSelector: (context: string) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
    },
    tools: {
      position: 'absolute',
    },
  }),
);

const Selector: React.FC<PropsWithChildren<SelectorProps>> = ({ children }) => {
  const { setFocus } = useDictionaryContext();
  const [position, setPosition] = useState<null | CSSProperties>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [context, setContext] = useState<string>('');
  const startEventRef = useRef<React.MouseEvent>();
  const targetRef = useRef<DOMRect>();
  const containerRef = useRef<HTMLParagraphElement>(null);
  const styles = useStyles();
  const handleMouseUp = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    const selection = window.getSelection();
    const { current: startEvent } = startEventRef;
    const { current: targetDom } = targetRef;
    if (!(startEvent && targetDom && selection)) {
      return;
    }
    const context = selection.toString();
    if (context && selection.anchorNode && selection.focusNode) {
      setContext(context);
      const dom = event.currentTarget.getBoundingClientRect();

      const range = document.createRange();
      range.setStart(selection.anchorNode, selection.anchorOffset);
      range.setEnd(selection.focusNode, selection.focusOffset);
      // 向右选中
      if (range.collapsed) {
        setPosition({
          left: startEvent.pageX - targetDom.left,
          bottom: dom.height,
        });
      } else {
        setPosition({
          left: event.pageX - dom.left,
          bottom: dom.height,
        });
      }
    }
  };
  useUnmount(() => {
    setPosition(null);
  });

  const handleClick = (event: MouseEvent) => {
    if (!containerRef.current?.contains(event?.target as Node)) {
      setPosition(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    setPosition(null);
    startEventRef.current = event;
    targetRef.current = event.currentTarget.getBoundingClientRect();
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  const handleEdit = useCallback(() => {
    setModalVisible(true);
    setFocus(true);
  }, [setFocus]);

  const handleCancel = () => {
    setModalVisible(false);
    setFocus(false);
  };

  return (
    <p ref={containerRef} className={styles.container}>
      <span onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
        {children}
      </span>
      {position && (
        <span style={position} className={styles.tools}>
          <IconButton onClick={handleEdit}>
            <CreateTwoToneIcon fontSize="small" />
          </IconButton>
        </span>
      )}
      <NoteModal open={modalVisible} context={context} onClose={handleCancel} />
    </p>
  );
};

export default Selector;
