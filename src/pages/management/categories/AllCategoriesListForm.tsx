import { useEffect } from "react";
import { useCategories } from "../../../shared/hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../components/tables/DataTable";
import { categoriesColumns } from "./categoryColumns";

export default function AllCategoriesListForm() {
  const { categories, loading, loadCategories } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories.length) {
      loadCategories();
    }
  }, [categories.length, loadCategories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <div className="flex items-center justify-between p-1">
        <h2 className="text-gray-500">All Categories</h2>
        <div className="flex gap-2">
          {/* New */}
          <button
            onClick={() => navigate("/categories/create")}
            className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
          >
            New
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable
          data={categories}
          columns={categoriesColumns}
          getRowId={(category) => category.id}
          getDetailsLink={(category) => `/categories/${category.id}`}
        />
      </div>
    </div>
  );
}
