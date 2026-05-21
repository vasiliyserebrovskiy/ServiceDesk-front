import { api } from "../../api/axios";
import type { Role, RoleDto } from "../../shared/types/roleTypes";
import { mapRole } from "../../shared/mappers/roleMapper";

// Get request for getting roles list
export const fetchRolesApi = async (): Promise<Role[]> => {
  const { data } = await api.get<RoleDto[]>("/v1/roles");
  return data.map(mapRole);
};
