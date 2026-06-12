import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type CI,
  type CreateCIDto,
  type UpdateCIDto,
  initialState,
} from "../../shared/types/cisTypes";
import {
  fetchCIs,
  createNewCI,
  updateCI,
  deleteCI,
  fetchCIById,
} from "./cisApi";

/**
 * Load all  CIs
 */
export const getCIsThunk = createAsyncThunk<CI[]>("cis/getAll", async () => {
  return await fetchCIs();
});

/**
 * Create new CI
 */
export const createCIThunk = createAsyncThunk<CI, CreateCIDto>(
  "cis/create",
  async (newCI) => {
    return await createNewCI(newCI);
  },
);

/**
 * Update CI by id
 */
export const updateCIByIdThunk = createAsyncThunk<
  CI,
  { id: string; data: UpdateCIDto }
>("cis/update", async ({ id, data }) => {
  return await updateCI(id, data);
});

/**
 * Delete CI by id
 */
export const deleteCIByIdThunk = createAsyncThunk<string, string>(
  "cis/deleteById",
  async (id) => {
    await deleteCI(id);
    return id;
  },
);

/**
 * Get CI by id
 */
export const getCIByIdThunk = createAsyncThunk<CI, string>(
  "cis/getById",
  async (id) => {
    return await fetchCIById(id);
  },
);

const cisSlice = createSlice({
  name: "cis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET ALL CI
     */
    builder.addCase(getCIsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCIsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.cis = action.payload;
    });

    builder.addCase(getCIsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ?? "Failed to fetch Configuration items";
    });

    /**
     * CREATE CI
     */
    builder.addCase(createCIThunk.fulfilled, (state, action) => {
      state.cis.push(action.payload);
    });

    builder.addCase(createCIThunk.rejected, (state, action) => {
      state.error =
        action.error.message ?? "Failed to create configuration item";
    });

    /**
     * UPDATE CI BY ID
     */
    builder.addCase(updateCIByIdThunk.fulfilled, (state, action) => {
      const updatedCI = action.payload;

      const index = state.cis.findIndex((ci) => ci.id === updatedCI.id);

      if (index !== -1) {
        state.cis[index] = updatedCI;
      }
    });

    builder.addCase(updateCIByIdThunk.rejected, (state, action) => {
      state.error =
        action.error.message ?? "Failed to update configuration item";
    });

    /**
     * DELETE CI BY ID
     */
    builder.addCase(deleteCIByIdThunk.fulfilled, (state, action) => {
      state.cis = state.cis.filter((ci) => ci.id !== action.payload);
      state.loading = false;
    });

    builder.addCase(deleteCIByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete status";
    });
    builder.addCase(deleteCIByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    /**
     * GET CI BY ID
     */
    builder.addCase(getCIByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCIByIdThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getCIByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ?? "Failed to fetch configuration item by id";
    });
  },
});

export default cisSlice.reducer;
