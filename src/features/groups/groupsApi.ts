import { api } from "../../api/axios";
import type {
  Group,
  CreateGroupDto,
  UpdateGroupDto,
} from "../../shared/types/groupsTypes";

// Get all groups
export const fetchGroups = async (): Promise<Group[]> => {
  const { data } = await api.get<Group[]>("/v1/groups");
  return data;
};

// Create new group
export const createNewGroup = async (
  newGroup: CreateGroupDto,
): Promise<Group> => {
  const { data } = await api.post("/v1/groups", newGroup);
  return data;
};

// Update group by id
export const updateGroup = async (
  id: string,
  payload: UpdateGroupDto,
): Promise<Group> => {
  const { data } = await api.put(`/v1/groups/${id}`, payload);
  return data;
};

// Delete group by id
export const deleteGroup = async (id: string): Promise<void> => {
  await api.delete(`/v1/groups/${id}`);
};

// Get group by id
export const fetchGroup = async (id: string): Promise<Group> => {
  const { data } = await api.get(`/v1/groups/${id}`);
  return data;
};
