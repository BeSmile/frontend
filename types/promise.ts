/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2022-01-17 16:42:03
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-17 16:56:01
 */

const fakeUserMenu = <T>(value: T): Promise<T> => {
  return Promise.resolve(value);
};

fakeUserMenu<string>('User');
