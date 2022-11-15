import { isArray } from 'lodash';
import { useMatch as isCurrentPath } from 'react-router-dom';

export const matchRoutePath = (paths: string | string[]): boolean => {
  if (isArray(paths)) {
    return paths.some((path) => isCurrentPath(path));
  }
  return !!isCurrentPath(paths);
};
