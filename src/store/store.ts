import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice.ts';
import sessionReducer from '../features/sessionSlice.ts';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
