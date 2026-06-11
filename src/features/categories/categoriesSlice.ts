import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Category,
  type CreateCategoryDto,
  type UpdateCategoryDto,
  initialState,
} from "../../shared/types/categoryTypes";
import {
  fetchIncidentsCategories,
  fetchCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  fetchCategoryById,
} from "./categoriesApi";

/**
 * Load all incident categories
 */
export const getIncidentsCategoriesThunk = createAsyncThunk<Category[]>(
  "categories/getIncidentAll",
  async () => {
    return await fetchIncidentsCategories();
  },
);

/**
 * Load all  categories
 */
export const getCategoriesThunk = createAsyncThunk<Category[]>(
  "categories/getAll",
  async () => {
    return await fetchCategories();
  },
);

/**
 * Create new category
 */
export const createCategoryThunk = createAsyncThunk<
  Category,
  CreateCategoryDto
>("categories/create", async (newCategory) => {
  return await createNewCategory(newCategory);
});

/**
 * Update category by id
 */
export const updateCategoryByIdThunk = createAsyncThunk<
  Category,
  { id: string; data: UpdateCategoryDto }
>("categories/update", async ({ id, data }) => {
  return await updateCategory(id, data);
});

/**
 * Delete categoru by id
 */
export const deleteCategoryByIdThunk = createAsyncThunk<string, string>(
  "categories/deleteById",
  async (id) => {
    await deleteCategory(id);
    return id;
  },
);

/**
 * Get category by id
 */
export const getCategoryByIdThunk = createAsyncThunk<Category, string>(
  "categories/getById",
  async (id) => {
    return await fetchCategoryById(id);
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET INCIDENT CATEGORIES
     */
    builder.addCase(getIncidentsCategoriesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getIncidentsCategoriesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.incidentCategories = action.payload;
    });

    builder.addCase(getIncidentsCategoriesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ?? "Failed to fetch incidents categories";
    });

    /**
     * GET ALL CATEGORIES
     */
    builder.addCase(getCategoriesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });

    builder.addCase(getCategoriesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch categories";
    });

    /**
     * CREATE CATEGORY
     */
    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });

    builder.addCase(createCategoryThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to create category";
    });

    /**
     * UPDATE CATEGORY BY ID
     */
    builder.addCase(updateCategoryByIdThunk.fulfilled, (state, action) => {
      const updatedCategory = action.payload;

      const index = state.categories.findIndex(
        (c) => c.id === updatedCategory.id,
      );

      if (index !== -1) {
        state.categories[index] = updatedCategory;
      }
    });

    builder.addCase(updateCategoryByIdThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to update category";
    });

    /**
     * DELETE CATEGORY BY ID
     */
    builder.addCase(deleteCategoryByIdThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
      state.loading = false;
    });

    builder.addCase(deleteCategoryByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete category";
    });
    builder.addCase(deleteCategoryByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    /**
     * GET CATEGORY BY ID
     */
    builder.addCase(getCategoryByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCategoryByIdThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getCategoryByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch category by id";
    });
  },
});

export default categoriesSlice.reducer;
