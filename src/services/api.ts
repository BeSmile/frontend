import request, { POST } from '../utils/request';
export * from './dictionary';

export async function fetchBook() {
  return request('https://novel.juhe.im/book/reviews?book=51060c88bb1c67cf28000035', {});
}
export type UserValue = {
  name: string;
  password: string;
};

export const fakeLogin = (data: UserValue) => {
  return POST('/user/login', data);
};
