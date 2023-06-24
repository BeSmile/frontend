import React, { useCallback, useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { createStyles } from '@mui/styles';
import en from '@/assets/json/Level8luan_2_T.json';
import { Container } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useKeyPress from '@/hooks/useKeyPress';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import Progress from './components/Progress';
import ToolsBar from './components/ToolsBar';
import useControls from './useControls';
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';
import { useUpdateEffect } from 'ahooks';
import { LENGTH } from '@/pages/rocket/constants';
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100vw',
      height: '100vh',
      fontFamily: 'RobotoMono MediumItalic',
    },
    coding: {
      width: '100%',
      height: 320,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      letterSpacing: 6,
      flexDirection: 'column',
    },
    voice: {
      position: 'absolute',
      top: 16,
      cursor: 'pointer',
      border: 'none',
      boxShadow: 'none',
      background: 'transparent',
    },
    word: {
      fontWeight: 600,
      fontSize: 42,
      position: 'relative',
    },
    pronounce: {
      fontSize: 12,
      marginTop: theme.spacing(3),
    },
    trans: {
      fontSize: 16,
      marginTop: theme.spacing(2),
    },
    character: {
      '&.success': {
        color: 'green',
      },
      '&.error': {
        color: 'red',
      },
    },
  }),
);

const Rocket = () => {
  const styles = useStyle();
  const [controls, toggleControls] = useControls();
  const [pause, setPause] = useState<boolean>(true);
  const [wordNum, setWordNum] = useState<number>(0);
  const [characters, setCharacters] = useState<string[]>([]);
  const chapter = en.slice(LENGTH * controls.chapterNum, LENGTH * (controls.chapterNum + 1));

  useEffect(() => {
    setWordNum(0);
  }, [controls.chapterNum]);

  useKeyPress('', (code: string) => {
    if (pause) {
      setPause(!pause);
      return;
    }
    const print = characters.join('');
    const effectiveCode = /^[a-zA-Z]$/g;
    if (!word || word.name.indexOf(print) != 0 || !effectiveCode.exec(code)) {
      return;
    }
    setCharacters([...characters, code]);
  });

  const word = chapter?.[wordNum] || '';

  useEffect(() => {
    if (isEmpty(characters) || !word) {
      return;
    }
    const printWord = characters.join('');
    const name = word.name;
    if (name.indexOf(printWord) !== 0) {
      setTimeout(() => {
        setCharacters([]);
      }, 100);
      return;
    }
    // 进行调词操作
    if (name === printWord) {
      setTimeout(() => {
        setCharacters([]);
        setWordNum((num) => {
          if (num == LENGTH - 1) {
            if (!controls.loop) {
              toggleControls('chapterNum', controls.chapterNum + 1);
            }
            return 0;
          }
          return num + 1;
        });
      }, 300);
    }
  }, [controls.chapterNum, characters, controls.loop, word, toggleControls]);

  const handlePlay = useCallback(() => {
    if (!word || pause || !controls.voice) {
      return;
    }
    const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${word.name}&type=2`);
    // const audio = new Audio('https://dictionary.cambridge.org/media/english-chinese-simplified/us_pron/k/kee/keel_/keel.mp3');
    audio.oncanplay = function () {
      audio.play();
    };
  }, [controls.voice, pause, word]);

  useUpdateEffect(() => {
    handlePlay();
  }, [handlePlay]);

  if (!word) {
    return null;
  }

  const words = word.name.split('');

  const renderStatus = (index: number): string => {
    if (characters.length <= index) {
      return '';
    }
    return words[index] === characters[index] ? 'success' : 'error';
  };

  return (
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <ToolsBar controls={controls} dataSource={en} toggleControls={toggleControls} />
        <Container maxWidth="md">
          <div className={styles.coding}>
            <div className={styles.word}>
              {words.map((word: string, index: number) => (
                <span key={index} className={classNames(styles.character, renderStatus(index))}>
                  {word}
                </span>
              ))}
              <button onClick={handlePlay} className={styles.voice}>
                <VolumeUpTwoToneIcon />
              </button>
            </div>
            <div className={styles.pronounce}>AmE: [{word.usphone}]</div>
            {controls.paraphrase && <div className={styles.trans}>{word.trans}</div>}
          </div>
          <Progress total={LENGTH} num={wordNum} />
        </Container>
      </Container>
    </div>
  );
};

export default Rocket;
