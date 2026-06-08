import { api } from "../../api/axios";
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../../shared/types/categoryTypes";

// Get all incident categories
export const fetchIncidentsCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>("/v1/categories?type=INCIDENT");
  return data;
};

// Create new category
export const createNewCategory = async (
  newCategory: CreateCategoryDto,
): Promise<Category> => {
  const { data } = await api.post("/v1/categories", newCategory);
  return data;
};

// Update category by id
export const updateCategory = async (
  id: string,
  payload: UpdateCategoryDto,
): Promise<Category> => {
  const { data } = await api.put(`/v1/categories/${id}`, payload);
  return data;
};

// Delete category by id
export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/v1/categories/${id}`);
};

// Get category by id
export const fetchCategory = async (id: string): Promise<Category> => {
  const { data } = await api.get(`/v1/categories/${id}`);
  return data;
};
