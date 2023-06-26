import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
//import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";

import studentClient from "@/clients/studentClient";
import staffClient from "@/clients/staffClient";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedStudentReducer = persistReducer(persistConfig, studentClient);
const persistedStaffReducer = persistReducer(persistConfig, staffClient);

const rootReducer = combineReducers({
  student: persistedStudentReducer,
  staff: persistedStaffReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
