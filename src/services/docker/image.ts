import { GET } from '@/utils/request';
import { FetchResponse } from '@/utils/request/fetch/types';

export type ImageListParams = {
  pageNo?: number;
};

export type ImageListType = {
  Created?: string;
  Id: string;
  Size: string;
  RepoTags: string[];
}[];

export const getImageList = (data: ImageListParams) => {
  return GET<FetchResponse<ImageListType>>('/api/docker/images', data);
};
