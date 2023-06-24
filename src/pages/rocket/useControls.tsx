import { useState } from 'react';
import { isBoolean, isNumber } from 'lodash';
import { CONTROLS_DEFAULT_VALUES } from '@/pages/rocket/constants';

export type Controls = {
  voice: boolean;
  loop: boolean;
  // 释意
  paraphrase: boolean;
  us: boolean;
  chapterNum: number;
};

const useControls = () => {
  const [controls, setControls] = useState<Controls>(CONTROLS_DEFAULT_VALUES);
  const toggleControls = (key: keyof Controls, flag?: boolean | number) => {
    const value = Object.assign(controls, {
      [key]: isBoolean(flag) ? flag : isNumber(flag) ? flag : !controls[key],
    });
    setControls({ ...value });
  };
  return [controls, toggleControls] as const;
};

export default useControls;
