import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ReducersMapObject,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { StateSchema } from "../config/StateSchema";
import { PassServiceReducer } from "@/entities/PasswordService/model/slice/slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  WebStorage,
  Storage,
} from "redux-persist";
import { useDispatch } from "react-redux";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  passService: PassServiceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useThunkDispatch: () => AppThunkDispatch = useDispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;
