import { GET } from "@/utils/request";

export type ImageListParams = {};

export type ImageListType = {
  from?: string;
  to: string;
  num: string;
  money: string;
  energy: string;
}[];

export const getImageList = (params: ImageListParams) => {
  return GET<ImageListType>("/api/docker/images", params);
};
