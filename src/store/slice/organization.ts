import {
  createAsyncThunk,
  buildCreateSlice,
  asyncThunkCreator,
} from "@reduxjs/toolkit";
import axiosInstance from "../axios";

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
  loading: false,
  organizations: null,
};

export const getOrganization = createAsyncThunk(
  "/organizations/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/organizations");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const organizationSlice = createAppSlice({
  name: "organization",
  initialState,
  reducers: {
    getOrganizations: (state, action) => {
      state.organizations = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganization.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getOrganization.fulfilled, (state, action) => {
      state.organizations = action.payload;
      state.loading = false;
    });
  },
});

export const { getOrganizations } = organizationSlice.actions;

export default organizationSlice.reducer;
