export type Word = {
  usphone: string;
  ukphone: string;
  name: string;
  trans: string[];
};

export type Record = {
  // 时间戳
  timestamp: number;
  // date
  date: string;
  // 单词
  word: Word;
  // 输入错误的单词
  typing: string;
};
