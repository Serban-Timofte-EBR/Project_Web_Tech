import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Bug {
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
  bugs: Bug[];
  loading: boolean;
  error: string | null;
}

const initialState: BugState = {
  bugs: [],
  loading: false,
  error: null,
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
      return data as Bug[];
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
      if (!response.ok) throw new Error("Failed to create bug");
      return (await response.json()) as Bug;
    } catch (error) {
      return rejectWithValue("Failed to create bug");
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
      .addCase(fetchBugs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBugs.fulfilled, (state, action: PayloadAction<Bug[]>) => {
        state.bugs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBug.fulfilled, (state, action: PayloadAction<Bug>) => {
        state.bugs.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createBug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBug.fulfilled, (state, action: PayloadAction<Bug>) => {
        const index = state.bugs.findIndex(
          (bug) => bug.id === action.payload.id
        );
        if (index !== -1) {
          state.bugs[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bugSlice.reducer;
