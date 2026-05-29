import { useEffect } from "react";
import { useGroups } from "../../../shared/hooks/useGroups";
import { DataTable } from "../../../components/tables/DataTable";
import { groupColumns } from "./groupColumns";
import { useNavigate } from "react-router-dom";

export default function AllGroupsListForm() {
  const { groups, loading, loadGroups } = useGroups();
  const navigate = useNavigate();

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
      <div className="flex items-center justify-between p-1">
        <h2 className="text-gray-500">All Groups</h2>
        <div className="flex gap-2">
          {/* New */}
          <button
            onClick={() => navigate("/groups/create")}
            className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
          >
            New
          </button>
        </div>
      </div>
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
