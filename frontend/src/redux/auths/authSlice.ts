import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: number;
  email: string;
  role: number; // 0=PM, 1=TST
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const API_URL = "http://localhost:8000/api";

// Check if there's a stored token and user data
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null,
};

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      const { token, user } = response.data;

      // Store token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { email: string; password: string; role: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      const { token, user } = response.data;

      // Store token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
