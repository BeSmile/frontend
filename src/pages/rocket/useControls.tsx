import { useState } from 'react';
import { isBoolean, isNumber } from 'lodash';

export type Controls = {
  voice: boolean;
  loop: boolean;
  // 释意
  paraphrase: boolean;
  us: boolean;
  chapterNum: number;
};

const useControls = () => {
  const [controls, setControls] = useState<Controls>({
    voice: true,
    loop: false,
    paraphrase: true,
    us: true,
    chapterNum: 0,
  });
  const toggleControls = (key: keyof Controls, flag?: boolean | number) => {
    const value = Object.assign(controls, {
      [key]: isBoolean(flag) ? flag : isNumber(flag) ? flag : !controls[key],
    });
    setControls({ ...value });
  };
  return [controls, toggleControls] as const;
};

export default useControls;
