import { useRoles } from "../../../shared/hooks/useRoles";
import { DataTable } from "../../../components/tables/DataTable";
import { roleColumns } from "./roleColumns";

export const RolesList = () => {
  const { roles, isLoading } = useRoles();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading roles...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <div className="flex items-center justify-between p-1.5">
        <h2 className="text-gray-500">Roles List</h2>
      </div>
      <DataTable
        data={roles}
        columns={roleColumns}
        getRowId={(roles) => roles.id}
      />
    </div>
  );
};
