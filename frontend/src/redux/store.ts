import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from "./teams/teamsSlice";
import authReducer from "./auths/authSlice";
import buugReducer from "./bugs/bugsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamsReducer,
    bugs: buugReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
