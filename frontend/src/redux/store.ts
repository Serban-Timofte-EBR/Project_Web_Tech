import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from "./projects/projectSlice";
import authReducer from "./auths/authSlice";

const store = configureStore({
  reducer: {
    projects: teamsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
