import React, { memo, Suspense } from "react";


const HomeFC = memo(() => {
  return <Suspense fallback={<div>11223</div>}/>;
});

export default HomeFC;
