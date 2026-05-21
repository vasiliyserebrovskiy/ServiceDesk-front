import type { Role } from "../types/roleTypes";

export function getRoleDisplayName(
  roleId: string | undefined,
  roles: Role[],
): string {
  return roles.find((role) => role.id === roleId)?.displayName ?? "UNKNOWN";
}
