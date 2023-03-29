import React from 'react';
// import Md from './数值.md';

// console.log(Md, 'Md');

const WuDao = () => {
  const dte = '<a οnclick="alert(1)">test demo</a>';

  function dump(strings: any, ...values: any[]) {
    console.log(strings, values);
    return JSON.stringify(
      {
        strings,
        values,
      },
      undefined,
      4,
    );
  }
  const what = 'ram';
  const where = 'rama lama ding dong';
  // `Who put the ${what} in the ${where}?`;
  // "Who put the ram in the rama lama ding dong?"
  const result = dump`Who put the ${what} in the ${where}?`;
  console.log(result);
  const suffix = 10;

  const calc = new Function('x', 'y', `return x + y * ${suffix}`);
  console.log(calc(2, 4));

  return (
    <div>
      <div>{`The only thing we have to fear is ${dte}.`}</div>
    </div>
  );
};

export default WuDao;
