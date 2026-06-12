import { useNavigate } from "react-router-dom";
import { useCIs } from "../../../shared/hooks/useCIs";
import { useEffect } from "react";
import { CIColumns } from "./CIColumns";
import { DataTable } from "../../../components/tables/DataTable";

export default function AllCIsListForm() {
  const { cis, loading, loadCIs } = useCIs();
  const navigate = useNavigate();

  // 1. we load the data once when mounting
  useEffect(() => {
    if (!cis.length) {
      loadCIs();
    }
  }, [cis.length, loadCIs]);

  // 2. loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <div className="flex items-center justify-between p-1">
        <h2 className="text-gray-500">All Configuration Items</h2>
        <div className="flex gap-2">
          {/* New */}
          <button
            onClick={() => navigate("/cis/create")}
            className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
          >
            New
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable
          data={cis}
          columns={CIColumns}
          getRowId={(ci) => ci.id}
          getDetailsLink={(ci) => `/cis/${ci.id}`}
        />
      </div>
    </div>
  );
}
