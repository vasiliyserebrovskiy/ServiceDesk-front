import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSubcategoriesByCategoryIdThunk,
  getSubcategoriesThunk,
  createSubcategoryThunk,
  updateSubcategoryByIdThunk,
  deleteSybcategoryByIdThunk,
  getSubcategoryByIdThunk,
} from "../../features/sybcategories/sybcategoriesSlice";
import type {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from "../../shared/types/sybcategoryTypes";

export const useSubcategories = () => {
  const dispatch = useAppDispatch();

  const subcategories = useAppSelector(
    (state) => state.subcategories.subcategories,
  );
  const subcategoriesByCategoryId = useAppSelector(
    (state) => state.subcategories.subcategoriesByCategoryId,
  );
  const loading = useAppSelector((state) => state.subcategories.loading);
  const error = useAppSelector((state) => state.subcategories.error);

  /**
   * Load all subcategories by category id
   */
  const loadSubcategoriesByCategoryId = useCallback(
    async (id: string) => {
      return await dispatch(getSubcategoriesByCategoryIdThunk(id)).unwrap();
    },
    [dispatch],
  );

  /**
   * Load all subcategories
   */
  const loadSubcategories = useCallback(() => {
    dispatch(getSubcategoriesThunk());
  }, [dispatch]);

  /**
   * Create new subcategory
   */
  const createSubcategory = useCallback(
    async (data: CreateSubcategoryDto) => {
      return await dispatch(createSubcategoryThunk(data)).unwrap();
    },
    [dispatch],
  );

  /**
   * Update subcategory by id
   */
  const updateSubcategoryById = useCallback(
    async (id: string, data: UpdateSubcategoryDto) => {
      return await dispatch(updateSubcategoryByIdThunk({ id, data })).unwrap();
    },
    [dispatch],
  );

  /**
   * Delete subcategory by id
   */
  const deleteSubcategoryById = useCallback(
    async (id: string) => {
      return await dispatch(deleteSybcategoryByIdThunk(id)).unwrap();
    },
    [dispatch],
  );

  /**
   * Get subcategory by id
   */
  const getSubcategoryById = useCallback(
    async (id: string) => {
      return await dispatch(getSubcategoryByIdThunk(id)).unwrap();
    },
    [dispatch],
  );
  return {
    subcategories,
    subcategoriesByCategoryId,
    loading,
    error,
    loadSubcategoriesByCategoryId,
    loadSubcategories,
    createSubcategory,
    updateSubcategoryById,
    deleteSubcategoryById,
    getSubcategoryById,
  };
};
