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
  page: "register",
  token: null,
  user: null,
  loading: false,
  email: null,
};

export const login = createAsyncThunk(
  "/auth/signin",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", payload);
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
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
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
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { setToken, clearToken, getUser } = authSlice.actions;

export default authSlice.reducer;
