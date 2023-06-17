import React from 'react';

export type AppContextValue = {
  theme: string;
};

export const AppContext = React.createContext<AppContextValue>({} as AppContextValue);
