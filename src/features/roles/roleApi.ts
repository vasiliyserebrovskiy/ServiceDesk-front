import { api } from "../../api/axios";
import type { RoleDTO } from "../../shared/types/roleTypes";

// Get request for getting roles list
export const fetchRolesApi = async () => {
  const { data } = await api.get<RoleDTO[]>("/v1/roles");
  return data.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    defaultRole: role.default_role,
  }));
};
