import React, { memo, Suspense } from 'react';

const HomeFC = () => {
  return <Suspense fallback={<div>11223</div>} />;
};

export default memo(HomeFC);
