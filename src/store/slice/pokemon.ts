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
  pokemons: null,
  pokemonsMeta: null,
};

export const getOrganizationPokemons = createAsyncThunk(
  "/pokemons/all",
  async (payload: { organizationId: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/pokemons/${payload.organizationId}/all`,
        {
          params: {
            ...payload,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const pokemonSlice = createAppSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getPokemons: (state, action) => {
      state.pokemons = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrganizationPokemons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizationPokemons.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getOrganizationPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload.data;
      state.pokemonsMeta = action.payload.meta;
      state.loading = false;
    });
  },
});

export const { getPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;
