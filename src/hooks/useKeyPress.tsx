import { DependencyList, useCallback, useEffect } from 'react';
import { isArray, isEmpty } from 'lodash';

const getKeyMap = (key: string): 'alt' | 'shift' | 'meta' | 'ctrl' => {
  switch (key) {
    case 'Control':
      return 'ctrl';
    default:
      return key.toLowerCase() as 'alt' | 'shift' | 'meta' | 'ctrl';
  }
};

export type Options = {
  hotKey?: boolean;
};

const useKeyPress = (keyCombine: string[] | string, event: (code: string) => void, depends: DependencyList) => {
  const isCurrentKey = useCallback((combineKey: string, e: KeyboardEvent): boolean => {
    if (isEmpty(combineKey)) {
      return true;
    }
    // 是否是组合key
    const keys = combineKey.split('.');
    if (isEmpty(keys)) {
      return true;
    }
    if (keys.length === 1) return keys[0] === e.key;
    const code = keys.splice(-1, 1);
    const comKey = keys.every((key) => e[`${getKeyMap(key)}Key`]);
    return comKey && e.key === code[0];
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const exec = isArray(keyCombine) ? keyCombine.every((com) => isCurrentKey(com, e)) : isCurrentKey(keyCombine, e);
      exec && event(e.key);
    },
    [event, isCurrentKey, keyCombine],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKeyDown, ...depends]);

  return [];
};

export default useKeyPress;
