import React, { Suspense } from 'react';
import CubeGridLoading from '@/components/Loading/cubeGrid';

const LazyRoute = ({ source }: { source: React.FunctionComponent }) => {
  const Component = source;
  return (
    <Suspense fallback={<CubeGridLoading />}>
      <Component />
    </Suspense>
  );
};

export default LazyRoute;
