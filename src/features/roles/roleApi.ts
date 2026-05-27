import { api } from "../../api/axios";
import type { Role } from "../../shared/types/roleTypes";

export const fetchRolesApi = async (): Promise<Role[]> => {
  const { data } = await api.get<Role[]>("/v1/roles");
  return data;
};
