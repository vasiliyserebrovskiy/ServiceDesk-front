import { api } from "../../api/axios";
import type {
  Subcategory,
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from "../../shared/types/sybcategoryTypes";

// Get all subcategories by category id
export const fetchSubcategoriesByCategoryId = async (
  categoryId: string,
): Promise<Subcategory[]> => {
  const { data } = await api.get<Subcategory[]>(
    `/v1/subcategories?categoryId=${categoryId}`,
  );
  return data;
};

// Get all subcategories
export const fetchSubcategories = async (): Promise<Subcategory[]> => {
  const { data } = await api.get<Subcategory[]>("/v1/subcategories");
  return data;
};

// Create new subcategory
export const createNewSubcategory = async (
  newSubcategory: CreateSubcategoryDto,
): Promise<Subcategory> => {
  const { data } = await api.post("/v1/subcategories", newSubcategory);
  return data;
};

// Update subcategory by id
export const UpdateSubcategory = async (
  id: string,
  payload: UpdateSubcategoryDto,
): Promise<Subcategory> => {
  const { data } = await api.put(`/v1/subcategories/${id}`, payload);
  return data;
};

// Delete sybcategory
export const deleteSubcategory = async (id: string): Promise<void> => {
  await api.delete(`/v1/subcategories/${id}`);
};

// Get sybcategory by id
export const fetchSubcategoryById = async (
  id: string,
): Promise<Subcategory> => {
  const { data } = await api.get(`/v1/subcategories/${id}`);
  return data;
};
