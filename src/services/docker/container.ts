import { GET, POST, PUT, DELETE } from '@/utils/request';

export const getContainerList = () => {
  return GET<any>('/api/docker/containers');
};

export const removeContainerById = (id: string) => {
  return DELETE(`/api/docker/container/${id}`, {});
};

export const stopContainerById = (id: string) => {
  return PUT(`/api/docker/container/${id}`, {});
};

export const startContainerById = (id: string, data: any) => {
  return POST(`/api/docker/container/${id}`, data);
};
