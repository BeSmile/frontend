import React from 'react';
import { Outlet } from 'react-router-dom';

export default function _layout() {
  return (
    <div>
      <div>1234</div>
      <Outlet />
    </div>
  );
}
