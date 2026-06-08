import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getIncidentsCategoriesThunk,
  getCategoriesThunk,
  createCategoryThunk,
  updateCategoryByIdThunk,
  deleteCategoryByIdThunk,
  getCategoryByIdThunk,
} from "../../features/categories/categoriesSlice";
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/categoryTypes";

export const useCategories = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories.categories);
  const incidentCategories = useAppSelector(
    (state) => state.categories.incidentCategories,
  );
  const loading = useAppSelector((state) => state.categories.loading);
  const error = useAppSelector((state) => state.categories.error);

  /**
   * Load all incidents categories
   */
  const loadIncidentCategories = useCallback(() => {
    dispatch(getIncidentsCategoriesThunk());
  }, [dispatch]);

  /**
   * Load all categories
   */
  const loadCategories = useCallback(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  /**
   * Create new category
   */
  const createCategory = useCallback(
    async (data: CreateCategoryDto) => {
      return await dispatch(createCategoryThunk(data)).unwrap();
    },
    [dispatch],
  );
  /**
   * Update category by id
   */
  const updateCategoryById = useCallback(
    async (id: string, data: UpdateCategoryDto) => {
      return await dispatch(updateCategoryByIdThunk({ id, data })).unwrap();
    },
    [dispatch],
  );

  /**
   * Delete category by id
   */
  const deleteCategoryById = useCallback(
    async (id: string) => {
      return await dispatch(deleteCategoryByIdThunk(id)).unwrap();
    },
    [dispatch],
  );

  /**
   * Get category by id
   */
  const getCategoryById = useCallback(
    async (id: string) => {
      return await dispatch(getCategoryByIdThunk(id)).unwrap();
    },
    [dispatch],
  );
  return {
    categories,
    incidentCategories,
    loading,
    error,
    loadIncidentCategories,
    loadCategories,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
    getCategoryById,
  };
};
