import { useNavigate } from "react-router-dom";
import { useStatuses } from "../../../shared/hooks/useStatuses";
import { useEffect } from "react";
import { DataTable } from "../../../components/tables/DataTable";
import { statusColumns } from "./statusColumns";

export default function AllStatusesListForm() {
  const { statuses, loading, loadStatuses } = useStatuses();
  const navigate = useNavigate();

  useEffect(() => {
    if (!statuses.length) {
      loadStatuses();
    }
  }, [statuses.length, loadStatuses]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <div className="flex items-center justify-between p-1">
        <h2 className="text-gray-500">All Statuses</h2>
        <div className="flex gap-2">
          {/* New */}
          <button
            onClick={() => navigate("/statuses/create")}
            className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
          >
            New
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable
          data={statuses}
          columns={statusColumns}
          getRowId={(status) => status.id}
          getDetailsLink={(status) => `/statuses/${status.id}`}
        />
      </div>
    </div>
  );
}
