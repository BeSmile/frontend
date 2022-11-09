import React from "react";

export type AppContextValue = {};

export const AppContext = React.createContext<AppContextValue>(
  {} as AppContextValue
);
