import type { Role, RoleDto } from "../types/roleTypes";

export function mapRole(dto: RoleDto): Role {
  return {
    id: dto.id,
    name: dto.name,
    displayName: dto.display_name,
    description: dto.description,
    defaultRole: dto.default_role,
  };
}
