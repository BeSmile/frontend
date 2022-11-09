import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";

const Hooks = () => {
  const [count, setCount] = useState(0);
  const childFn = () => {
    console.log("childFn  112233");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const FN1 = useMemo(() => {
    // console.log(11244);
    return debounce(() => {
      childFn();
      return 111;
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(count);
    }, 1000 * 2);
  }, [count]);

  // const Fn = useCallback(
  //   debounce((...args) => {
  //     console.log(args);
  //   }, 300),
  //   []
  // );

  return (
    <>
      <div onClick={FN1}>点击测试-{11}</div>
      <div onClick={() => setCount((count) => ++count)}>点击测试count</div>
    </>
  );
};

export default Hooks;
