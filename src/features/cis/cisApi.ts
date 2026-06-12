import { api } from "../../api/axios";
import type { CI, CreateCIDto, UpdateCIDto } from "../../shared/types/cisTypes";

// Get all CIs
export const fetchCIs = async (): Promise<CI[]> => {
  const { data } = await api.get<CI[]>("/v1/cis");
  return data;
};

// Create new status
export const createNewCI = async (newCI: CreateCIDto): Promise<CI> => {
  const { data } = await api.post("/v1/cis", newCI);
  return data;
};

// Update CI by id
export const updateCI = async (
  id: string,
  payload: UpdateCIDto,
): Promise<CI> => {
  const { data } = await api.put(`/v1/cis/${id}`, payload);
  return data;
};

// Delete CI by id
export const deleteCI = async (id: string): Promise<void> => {
  await api.delete(`/v1/cis/${id}`);
};

// Get CI by id
export const fetchCIById = async (id: string): Promise<CI> => {
  const { data } = await api.get(`/v1/cis/${id}`);
  return data;
};
