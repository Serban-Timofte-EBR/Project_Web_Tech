import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamsState {
  teams: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    fetchTeamsStart(state) {
      state.loading = true;
    },
    fetchTeamsSuccess(state, action: PayloadAction<string[]>) {
      state.teams = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTeamsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTeamsStart, fetchTeamsSuccess, fetchTeamsFailure } =
  teamsSlice.actions;

export const fetchTeams = () => async (dispatch: any) => {
  dispatch(fetchTeamsStart());

  try {
    const hardcodedTeams = ["Team Alpha", "Team Beta", "Team Gamma"];
    setTimeout(() => {
      dispatch(fetchTeamsSuccess(hardcodedTeams));
    }, 1000);
  } catch (error) {
    dispatch(fetchTeamsFailure("Failed to load teams"));
  }
};

export default teamsSlice.reducer;
