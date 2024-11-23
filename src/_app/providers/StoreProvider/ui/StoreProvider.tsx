"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { FC, ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
