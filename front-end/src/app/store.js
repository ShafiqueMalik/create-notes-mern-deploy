import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./slices/globalSlice";
import { notesApi } from './api/notesApi';
import { usersApi } from './api/usersApi';

export default configureStore({
  reducer: {
    global:globalReducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(notesApi.middleware,usersApi.middleware),
})