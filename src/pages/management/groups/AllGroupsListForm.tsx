import { useEffect } from "react";
import { useGroups } from "../../../shared/hooks/useGroups";
import { DataTable } from "../../../components/tables/DataTable";
import { groupColumns } from "./groupColumns";

export default function AllGroupsListForm() {
  const { groups, loading, loadGroups } = useGroups();

  // 1. we load the data once when mounting
  useEffect(() => {
    if (!groups.length) {
      loadGroups();
    }
  }, [groups.length, loadGroups]);

  // 2. loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <h2 className="text-gray-500">All Groups</h2>
      <div className="flex">
        <DataTable
          data={groups}
          columns={groupColumns}
          getRowId={(group) => group.id}
          getDetailsLink={(group) => `/groups/${group.id}`}
        />
      </div>
    </div>
  );
}
