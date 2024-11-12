import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../auths/authSlice";
import axios from "axios";

export interface Team {
  id: number;
  name: string;
  description: string;
  repository: string;
  createdAt: Date;
  updatedAr: Date;
  users: User[];
}

export type Team_No_Secrets = Omit<
  Team,
  "description" | "repository" | "createdAt" | "updatedAr" | "users"
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
    const error_message =
      error.response?.data?.message || "An unknown error occurred.";
    return thunkApi.rejectWithValue(error_message);
  }
});

export const fetchTeams = createAsyncThunk<
  Team[],
  void,
  { rejectValue: string }
>("teams/fetchTeams", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/teams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to fetch teams"
    );
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
        state.error =
          (action.payload as string) || "Failed to fetch teams without secrets";
      })
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch teams";
      });
  },
});

export const { resetMessage } = teamsSlice.actions;

export default teamsSlice.reducer;
