import { api } from "../../api/axios";
import type {
  Status,
  CreateStatusDto,
  UpdateStatusDto,
} from "../../shared/types/statusTypes";

// Get all incident statuses
export const fetchIncidentsStatuses = async (): Promise<Status[]> => {
  const { data } = await api.get<Status[]>("/v1/statuses?type=INCIDENT");
  return data;
};

// Get all statuses
export const fetchStatuses = async (): Promise<Status[]> => {
  const { data } = await api.get<Status[]>("/v1/statuses");
  return data;
};

// Create new status
export const createNewStatus = async (
  newStatus: CreateStatusDto,
): Promise<Status> => {
  const { data } = await api.post("/v1/statuses", newStatus);
  return data;
};

// Update status by id
export const updateStatus = async (
  id: string,
  payload: UpdateStatusDto,
): Promise<Status> => {
  const { data } = await api.put(`/v1/statuses/${id}`, payload);
  return data;
};

// Delete status by id
export const deleteStatus = async (id: string): Promise<void> => {
  await api.delete(`/v1/statuses/${id}`);
};

// Get status by id
export const fetchStatusById = async (id: string): Promise<Status> => {
  const { data } = await api.get(`/v1/statuses/${id}`);
  return data;
};
