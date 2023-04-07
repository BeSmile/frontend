import React, { Suspense } from 'react';
import { CubeGrid } from '@/components/Loading';

const LazyRoute = ({ source }: { source: React.FunctionComponent }) => {
  const Component = source;
  return (
    <Suspense fallback={<CubeGrid />}>
      <Component />
    </Suspense>
  );
};

export default LazyRoute;
