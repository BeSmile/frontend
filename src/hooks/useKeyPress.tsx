import { useCallback, useEffect } from 'react';
import { isArray, isEmpty } from 'lodash';

const useKeyPress = (keyCombine: string[] | string, event: (code: string) => void) => {
  const isCurrentKey = useCallback((combineKey: string, e: KeyboardEvent): boolean => {
    if (isEmpty(combineKey)) {
      return true;
    }
    const keys = combineKey.split('.');
    if (isEmpty(keys)) {
      return true;
    }
    if (keys.length === 1) return keys[0] === e.key;
    const code = keys.splice(-1, 1);
    const comKey = keys.every((key) => e[`${key as 'alt' | 'shift' | 'meta'}Key`]);
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
  }, [handleKeyDown]);

  return [];
};

export default useKeyPress;
