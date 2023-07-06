import React, { useCallback, useEffect, useRef, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { createStyles } from '@mui/styles';
import en from '@/assets/json/Level8luan_2_T.json';
import { Container } from '@mui/material';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import useKeyPress from '@/hooks/useKeyPress';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import Progress from './components/Progress';
import ToolsBar from './components/ToolsBar';
import useControls from './useControls';
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';
import { useRequest, useUpdateEffect } from 'ahooks';
import { LENGTH } from '@/pages/rocket/constants';
import { getCambridgeWord } from '@/services/dictionary';
import Examples from '@/pages/rocket/components/Examples';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import PauseMask from '@/pages/rocket/components/PauseMask';
import { DictionaryProvider } from '@/pages/rocket/context';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100vw',
      height: '100vh',
      fontFamily: 'RobotoMono MediumItalic',
    },
    coding: {
      width: '100%',
      height: 240,
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
    loadingContainer: {
      minHeight: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    character: {
      '&.success': {
        color: 'green',
      },
      '&.error': {
        color: 'red',
      },
    },
    container: {
      marginTop: theme.spacing(2),
      boxShadow: 'none!important',
    },
    content: {
      padding: theme.spacing(2),
      boxShadow: 'none',
      '&:last-child': {
        paddingBottom: `${theme.spacing(1)}!important`,
      },
      // backgroundColor: '#F5F8FA',
    },
    header: {
      fontSize: 14,
    },
  }),
);

/**
 * 艾宾浩斯记忆法（Ebbinghaus Forgetting Curve）是一种帮助人们记忆信息并长期保持记忆的方法。这种方法最初由德国心理学家赫尔曼·艾宾浩斯（Hermann Ebbinghaus）在19世纪末发明。
 *
 * 根据艾宾浩斯的研究，人们在学习新信息后很快就会忘记大部分内容，而这种遗忘的速度非常快。他创造了一个被称为“遗忘曲线”的模型，来描述人们在学习后忘记信息的速度。该曲线显示，人们在学习后的第一天就会忘记大约50％的信息，之后每过一段时间就会忘记更多的信息。但是，如果在学习后重新复习信息，就可以帮助记忆保持更长时间。
 *
 * 基于这些发现，艾宾浩斯提出了一个记忆方法，即通过反复学习和复习来帮助长期记忆。他提出了一个复习计划，即在学习后的20分钟、8小时、1天、2天、4天、7天、15天和30天之后分别进行复习。这个计划被称为“艾宾浩斯记忆曲线”。
 *
 * 艾宾浩斯记忆法的核心思想是在学习新信息后立即进行反复复习，以帮助记忆保持更长时间。这可以通过多次重复学习、编写笔记、使用闪卡和测试等方式来实现。此外，还可以利用记忆宫殿、联想和其他记忆技巧来帮助记忆。
 */
const theme = createTheme({
  typography: {
    fontFamily: 'RobotoMono MediumItalic',

    subtitle2: {
      // color: '#68747F'
    },
  },
  palette: {
    action: {
      // active: '#0052D9',
    },
    background: {
      paper: '#F5F8FA', // 您想要的颜色
    },
    text: {
      primary: '#1D2B3A',
      secondary: '#68747F',
    },
  },
});

type AudioCache = {
  [key: string]: HTMLAudioElement;
};

const Rocket = () => {
  const styles = useStyle();
  const {
    loading,
    data: trans,
    run: fakeWord,
  } = useRequest(getCambridgeWord, {
    manual: true,
  });
  const [focus, setFocus] = useState(false);

  const [controls, toggleControls] = useControls();
  const audioCache = useRef<AudioCache>({});
  const [pause, setPause] = useState<boolean>(true);
  const [wordNum, setWordNum] = useState<number>(0);
  const [characters, setCharacters] = useState<string[]>([]);
  const chapter = en.slice(LENGTH * controls.chapterNum, LENGTH * (controls.chapterNum + 1));

  useEffect(() => {
    setWordNum(0);
  }, [controls.chapterNum]);

  const word = chapter?.[wordNum] || '';

  useKeyPress(
    '',
    (code: string) => {
      if (focus) {
        return;
      }
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
    },
    [pause, focus, word],
  );

  useEffect(() => {
    if (!word) {
      return;
    }
    fakeWord(word.name);
  }, [fakeWord, word]);

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
    const { current: caches } = audioCache;
    if (caches[word.name]) {
      caches[word.name].play();
      return;
    }
    const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${word.name}&type=2`);
    // const audio = new Audio('https://dictionary.cambridge.org/media/english-chinese-simplified/us_pron/k/kee/keel_/keel.mp3');
    audio.oncanplay = function () {
      audioCache.current[word.name] = audio;
      audio.play();
    };
  }, [controls.voice, pause, word]);

  useUpdateEffect(() => {
    handlePlay();
  }, [handlePlay]);

  // useMount( () => {
  //   setInterval(() => {
  //     setWordNum(num => num +1);
  //   }, 1500);
  // });

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

  const blocks = trans?.data?.data?.blocks || [];

  return (
    <DictionaryProvider value={{ setFocus }}>
      <ThemeProvider theme={theme}>
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
            <Container maxWidth="md">
              {loading ? (
                <div className={styles.loadingContainer}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {blocks.map((block, i) => (
                    <Card key={`block-${i}`} className={styles.container}>
                      <CardContent className={styles.content}>
                        <Typography className={styles.header} variant="subtitle2" component="div">
                          {block.trans}
                        </Typography>
                        <Examples highlighted={word.name} dataSource={block.examples || []} />
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </Container>
          </Container>
        </div>
        <PauseMask open={pause} />
      </ThemeProvider>
    </DictionaryProvider>
  );
};

export default Rocket;
