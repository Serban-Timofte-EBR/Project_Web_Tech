import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  projects: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsStart(state) {
      state.loading = true;
    },
    fetchTProjectSuccess(state, action: PayloadAction<string[]>) {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProjectFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProjectsStart, fetchTProjectSuccess, fetchProjectFailure } =
  projectSlice.actions;

export const fetchProjects = () => async (dispatch: any) => {
  dispatch(fetchProjectsStart());

  try {
    const hardcodedProjects = ["Team Alpha", "Team Beta", "Team Gamma"];
    setTimeout(() => {
      dispatch(fetchTProjectSuccess(hardcodedProjects));
    }, 1000);
  } catch (error) {
    dispatch(fetchProjectFailure("Failed to load teams"));
  }
};

export default projectSlice.reducer;
