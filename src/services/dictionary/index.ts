import { GET, POST } from '@/utils/request';
import { FetchResponse } from '@/utils/request/fetch/types';

export type Dictionary = {
  header: string;
  blocks: DictionaryBlocks[];
};
export type DictionaryBlocksExamples = {
  eg: string;
  trans: string;
};
export type DictionaryBlocks = {
  trans: string;
  examples: DictionaryBlocksExamples[];
};

export type Note = {
  english: string;
  chinese: string;
};

export const getCambridgeWord = (word: string) => {
  return GET<FetchResponse<Dictionary>>(`/api/dictionary/cambridge/${word}`);
};
export const postCambridgeWord = (data: Note) => {
  return POST<FetchResponse<Note>>('/api/dictionary/note', data);
};
