import React, { useCallback, useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { createStyles } from '@mui/styles';
import en from '@/assets/json/Level8luan_2_T.json';
import { Container } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useKeyPress from '@/hooks/useKeyPress';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import Progress from '@/pages/rocket/components/Progress';

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
    word: {
      fontWeight: 600,
      fontSize: 42,
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

const LENGTH = 20;

const Rocket = () => {
  const styles = useStyle();
  const [pause, setPause] = useState<boolean>(true);
  const [chapterNum, setChapterNum] = useState<number>(0);
  const [wordNum, setWordNum] = useState<number>(0);
  const [characters, setCharacters] = useState<string[]>([]);
  const chapter = en.slice(LENGTH * chapterNum, LENGTH * (chapterNum + 1));

  useEffect(() => {
    setWordNum(0);
  }, [chapterNum]);

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
    if (name === printWord) {
      setTimeout(() => {
        setCharacters([]);
        setWordNum((num) => {
          if (num == LENGTH - 1) {
            setChapterNum(chapterNum + 1);
            return 0;
          }
          return num + 1;
        });
      }, 300);
    }
  }, [chapterNum, characters, word]);

  const handlePlay = useCallback(() => {
    if (!word || pause) {
      return;
    }
    const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${word.name}&type=2`);
    audio.play();
  }, [pause, word]);

  useEffect(() => {
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
      <Container maxWidth="md">
        <div className={styles.coding}>
          <div className={styles.word}>
            {words.map((word: string, index: number) => (
              <span key={index} className={classNames(styles.character, renderStatus(index))}>
                {word}
              </span>
            ))}
            <button onClick={handlePlay}>
              <i className="icon fa anchor-icon medium-yellow" />
            </button>
          </div>
          <div className={styles.pronounce}>AmE: [{word.usphone}]</div>
          <div className={styles.trans}>{word.trans}</div>
        </div>
        <Progress total={LENGTH} num={wordNum} />
      </Container>
    </div>
  );
};

export default Rocket;
