import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './projects/projectSlice';

const store = configureStore({
  reducer: {
    projects: teamsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;