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
  organizationInfo: null,
};

export const getOrganizationAll = createAsyncThunk(
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

export const getOrganizationDetails = createAsyncThunk(
  "/organizations/id",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/organizations/${id}`);
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
    builder.addCase(getOrganizationAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizationAll.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getOrganizationAll.fulfilled, (state, action) => {
      state.organizations = action.payload;
      state.loading = false;
    });

    builder.addCase(getOrganizationDetails.fulfilled, (state, action) => {
      state.organizationInfo = action.payload;
    });
  },
});

export const { getOrganizations } = organizationSlice.actions;

export default organizationSlice.reducer;
