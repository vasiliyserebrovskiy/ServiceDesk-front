import type { Role } from "../types/roleTypes";

export function getRoleName(roleId: string | undefined, roles: Role[]): string {
  return roles.find((role) => role.id === roleId)?.name ?? "UNKNOWN";
}
