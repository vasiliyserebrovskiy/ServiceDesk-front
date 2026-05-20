import { useEffect, useMemo } from "react";
import { useRoles } from "../../shared/hooks/useRoles";
import { useUsers } from "../../shared/hooks/useUsers";
import { DataTable } from "../../components/tables/DataTable";
import { userColumns } from "../../features/users/userColumns";
import type { User } from "../../shared/types/usersTypes";

export default function AllUsersListForm() {
  const { users, loading, loadUsers } = useUsers();
  const { roles, isLoading } = useRoles();

  // 1. we load the data once when mounting
  useEffect(() => {
    if (!users.length) {
      loadUsers();
    }
  }, [users.length, loadUsers]);

  // 2. gluing users + roles in the view model
  const enrichedUsers = useMemo(() => {
    if (!users.length || !roles.length) return [];

    return users.map((user: User) => {
      const role = roles.find((r) => r.id === user.roleId);

      return {
        ...user,
        roleName: role ? role.name : "Unknown",
      };
    });
  }, [users, roles]);

  // 3. loading state
  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>All Users</h2>

      <DataTable data={enrichedUsers} columns={userColumns} />
    </div>
  );
}
