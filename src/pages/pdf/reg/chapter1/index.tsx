import React from 'react';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';
import Chapter1Md from './1.md';

const newChapter = (chapterName: string) => {
  console.group(`-------- Chapter: ${chapterName} started ------`);

  return (cb: () => void) => {
    cb();
    console.groupEnd();
  };
};

const Chapter1 = () => {
  const chapter1 = newChapter('1');

  chapter1(function () {
    const reg = /([A-Za-z]+).+\1/;
    console.log(reg, 'reg');
    // `\1`与`RegExp.$1`含义相同,上述正则表示表示`([A-Za-z]+).+\([A-Za-z]+)`
    console.log('the*thde'.match(reg));
  });

  return <MarkdownPreview dangerouslySetInnerHTML={Chapter1Md()} />;
};

export default Chapter1;
