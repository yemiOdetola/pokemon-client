import {
  createAsyncThunk,
  buildCreateSlice,
  asyncThunkCreator,
} from "@reduxjs/toolkit";
import axiosInstance from "../axios";

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

interface LoginPayload {
  email: string;
  password: string;
}

const initialState = {
  token: null,
  user: null,
  loading: false,
};

export const signup = createAsyncThunk(
  "/auth/signup",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  "/auth/signin",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signin", payload);
      localStorage.setItem("email", payload.email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state) => {
      let payload;
      const data: any = localStorage.getItem("userData");
      if (data) {
        payload = JSON.parse(data);
        state.user = payload;
      }
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.access_token);
      state.token = action.payload.access_token;
      state.user = action.payload.user;
      state.loading = false;
    });
  },
});

export const { clearToken, getUser } = authSlice.actions;

export default authSlice.reducer;
