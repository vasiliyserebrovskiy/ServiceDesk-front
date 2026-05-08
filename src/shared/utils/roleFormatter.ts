export function formatRole(role?: string): string {
  switch (role) {
    case "ADMIN":
      return "Administrator";

    case "MANAGER":
      return "Manager";

    case "USER":
      return "User";

    default:
      return "Unknown";
  }
}
