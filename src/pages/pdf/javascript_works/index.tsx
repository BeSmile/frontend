import React from 'react';
import Md from './数值.md';

const WuDao = () => {
  return <div dangerouslySetInnerHTML={Md()}></div>;
};

export default WuDao;
