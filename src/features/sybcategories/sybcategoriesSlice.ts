import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Subcategory,
  type CreateSubcategoryDto,
  type UpdateSubcategoryDto,
  initialState,
} from "../../shared/types/sybcategoryTypes";
import {
  fetchSubcategoriesByCategoryId,
  fetchSubcategories,
  createNewSubcategory,
  UpdateSubcategory,
  deleteSubcategory,
  fetchSubcategoryById,
} from "./sybcategoriesApi";

/**
 * Load all subcategories by category id
 */
export const getSubcategoriesByCategoryIdThunk = createAsyncThunk<
  Subcategory[],
  { id: string }
>("subcategories/getByCategoryId", async ({ id }) => {
  return await fetchSubcategoriesByCategoryId(id);
});

/**
 * Load all subcategories
 */
export const getSubcategoriesThunk = createAsyncThunk<Subcategory[]>(
  "subcategories/getAll",
  async () => {
    return await fetchSubcategories();
  },
);

/**
 * Create new subcategory
 */
export const createSubcategoryThunk = createAsyncThunk<
  Subcategory,
  CreateSubcategoryDto
>("subcategories/create", async (newSubcategory) => {
  return await createNewSubcategory(newSubcategory);
});

/**
 * Update subcategory by id
 */
export const updateSubcategoryByIdThunk = createAsyncThunk<
  Subcategory,
  { id: string; data: UpdateSubcategoryDto }
>("subcategories/update", async ({ id, data }) => {
  return await UpdateSubcategory(id, data);
});

/**
 * Delete subcategory by id
 */
export const deleteSybcategoryByIdThunk = createAsyncThunk<string, string>(
  "sybcategory/deleteById",
  async (id) => {
    await deleteSubcategory(id);
    return id;
  },
);

/**
 * Get subcategory by id
 */
export const getSubcategoryByIdThunk = createAsyncThunk<Subcategory, string>(
  "subcategories/getById",
  async (id) => {
    return await fetchSubcategoryById(id);
  },
);

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET SUBCATEGORIES BY CATEGORY ID
     */
    builder.addCase(getSubcategoriesByCategoryIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      getSubcategoriesByCategoryIdThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.subcategoriesByCategoryId = action.payload;
      },
    );

    builder.addCase(
      getSubcategoriesByCategoryIdThunk.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ??
          "Failed to fetch subcategories by category id";
      },
    );

    /**
     * GET ALL SUBCATEGORIES
     */
    builder.addCase(getSubcategoriesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getSubcategoriesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.subcategories = action.payload;
    });

    builder.addCase(getSubcategoriesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch sybcategories";
    });

    /**
     * CREATE CATEGORY
     */
    builder.addCase(createSubcategoryThunk.fulfilled, (state, action) => {
      state.subcategories.push(action.payload);
    });

    builder.addCase(createSubcategoryThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to create subcategory";
    });

    /**
     * UPDATE SUBCATEGORY BY ID
     */
    builder.addCase(updateSubcategoryByIdThunk.fulfilled, (state, action) => {
      const updatedSubcategory = action.payload;

      const index = state.subcategories.findIndex(
        (s) => s.id === updatedSubcategory.id,
      );

      if (index !== -1) {
        state.subcategories[index] = updatedSubcategory;
      }
    });

    builder.addCase(updateSubcategoryByIdThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to update subcategory";
    });

    /**
     * DELETE GROUP BY ID
     */
    builder.addCase(deleteSybcategoryByIdThunk.fulfilled, (state, action) => {
      state.subcategories = state.subcategories.filter(
        (s) => s.id !== action.payload,
      );
      state.loading = false;
    });

    builder.addCase(deleteSybcategoryByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete subcategory";
    });
    builder.addCase(deleteSybcategoryByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    /**
     * GET GROUP BY ID
     */
    builder.addCase(getSubcategoryByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getSubcategoryByIdThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getSubcategoryByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch subcategory by id";
    });
  },
});

export default subcategoriesSlice.reducer;
