import { useEffect, useMemo } from "react";
import { useRoles } from "../../../shared/hooks/useRoles";
import { useUsers } from "../../../shared/hooks/useUsers";
import { DataTable } from "../../../components/tables/DataTable";
import { userColumns } from "./userColumns";
import type { User } from "../../../shared/types/usersTypes";

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
      const name = user.firstname + " " + user.lastname;

      return {
        ...user,
        roleName: role ? role.displayName : "Unknown",
        name: name,
      };
    });
  }, [users, roles]);

  // 3. loading state
  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <h2 className="text-gray-500">All Users</h2>
      <div className="flex">
        <DataTable data={enrichedUsers} columns={userColumns} />
      </div>
    </div>
  );
}
