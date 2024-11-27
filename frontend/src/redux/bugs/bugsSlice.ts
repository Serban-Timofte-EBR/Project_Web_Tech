import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Bug {
  id: number;
  team_id: number;
  reporter_id: number;
  assignee_id: number | null;
  severity: string;
  description: string;
  commit_link: string;
  status: string;
  fix_commit_link: string | null;
  createdAt: string;
  updatedAt: string;
  reporter: {
    id: number;
    email: string;
  };
  assignee: {
    id: number;
    email: string;
  } | null;
}

interface BugState {
  bugsByTeam: Record<number, Bug[]>;
  loading: Record<number, boolean>;
  error: Record<number, string | null>;
}

const initialState: BugState = {
  bugsByTeam: {},
  loading: {},
  error: {},
};

export const fetchBugs = createAsyncThunk(
  "bugs/fetchBugs",
  async (teamId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/bugs/team/${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch bugs");
      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      return rejectWithValue("Failed to load bugs");
    }
  }
);

export const createBug = createAsyncThunk(
  "bugs/createBug",
  async (
    newBug: Omit<
      Bug,
      "id" | "reporter" | "assignee" | "createdAt" | "updatedAt"
    >,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:8000/api/bugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newBug),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create bug");
      }
      return (await response.json()) as Bug;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred while creating the bug"
      );
    }
  }
);

export const updateBug = createAsyncThunk(
  "bugs/updateBug",
  async (
    {
      bugId,
      status,
      fix_commit_link,
    }: {
      bugId: number;
      status: string;
      fix_commit_link?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/bugs/${bugId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status, fix_commit_link }),
        }
      );
      if (!response.ok) throw new Error("Failed to update bug");
      return (await response.json()) as Bug;
    } catch (error) {
      return rejectWithValue("Failed to update bug");
    }
  }
);

const bugSlice = createSlice({
  name: "bugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBugs.pending, (state, action) => {
        const teamId = action.meta.arg;
        state.loading[teamId] = true;
        state.error[teamId] = null;
      })
      .addCase(fetchBugs.fulfilled, (state, action) => {
        const teamId = action.meta.arg;
        console.log(action.payload);
        state.bugsByTeam[teamId] = action.payload;
        state.loading[teamId] = false;
        state.error[teamId] = null;
      })
      .addCase(fetchBugs.rejected, (state, action) => {
        const teamId = action.meta.arg;
        state.loading[teamId] = false;
        state.error[teamId] = action.payload as string;
      })
      .addCase(createBug.pending, (state, action) => {
        const teamId = action.meta.arg.team_id;
        state.loading[teamId] = true;
        state.error[teamId] = null;
      })
      .addCase(createBug.fulfilled, (state, action) => {
        const { team_id } = action.payload;

        state.loading[team_id] = false;
        state.error[team_id] = null;

        if (!state.bugsByTeam[team_id]) {
          state.bugsByTeam[team_id] = [];
        }
        state.bugsByTeam[team_id].push(action.payload);
      })
      .addCase(createBug.rejected, (state, action) => {
        const teamId = action.meta.arg.team_id;
        state.loading[teamId] = false;
        state.error[teamId] = action.payload as string;
      })
      .addCase(updateBug.pending, (state) => {
        state.loading[-1] = true;
        state.error[-1] = null;
      })
      .addCase(updateBug.fulfilled, (state, action: PayloadAction<Bug>) => {
        const teamId = action.payload.team_id;
        const bugId = action.payload.id;
        if (state.bugsByTeam[teamId]) {
          const index = state.bugsByTeam[teamId].findIndex(
            (bug) => bug.id === bugId
          );
          if (index !== -1) {
            state.bugsByTeam[teamId][index] = action.payload;
          }
        }
        state.loading[-1] = false;
        state.error[-1] = null;
      })
      .addCase(updateBug.rejected, (state, action) => {
        state.loading[-1] = false;
        state.error[-1] = action.payload as string;
      });
  },
});

export default bugSlice.reducer;
