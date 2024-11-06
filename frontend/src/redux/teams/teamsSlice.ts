import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Team {
  id: number;
  name: string;
  description: string;
  repository: string;
  createdAt: Date;
  updatedAr: Date;
}

export type Team_No_Secrets = Omit<
  Team,
  "description" | "repository" | "createdAt" | "updatedAr"
>;

interface TeamsState {
  teams: Team[];
  teams_no_secrets: Team_No_Secrets[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: TeamsState = {
  teams: [],
  teams_no_secrets: [],
  loading: false,
  error: null,
  success: null,
};

export const fetchTeamsNoSecrets = createAsyncThunk<
  Team_No_Secrets[],
  void,
  { rejectValue: string }
>("teams/fetchTeamsNoSecrets", async (_, thunkApi) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/teams/no-secrets"
    );
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response?.data?.message);
  }
});

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsNoSecrets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTeamsNoSecrets.fulfilled,
        (state, action: PayloadAction<Team_No_Secrets[]>) => {
          state.loading = false;
          state.teams_no_secrets = action.payload;
        }
      )
      .addCase(fetchTeamsNoSecrets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch teams without secrets";
      });
  },
});

export const {resetMessage} = teamsSlice.actions;

export default teamsSlice.reducer;
