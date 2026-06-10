import { useNavigate } from "react-router-dom";
import { useSubcategories } from "../../../shared/hooks/useSubcategories";
import { useEffect, useMemo } from "react";
import { DataTable } from "../../../components/tables/DataTable";
import { subcategoriesColumns } from "./subcategoryColumns";
import { useCategories } from "../../../shared/hooks/useCategories";
import type { Subcategory } from "../../../shared/types/sybcategoryTypes";

export default function AllSubcategoriesListForm() {
  const {
    subcategories,
    loading: subcategoriesLoading,
    loadSubcategories,
  } = useSubcategories();
  const {
    categories,
    loading: categoriesLoading,
    loadCategories,
  } = useCategories();
  const navigate = useNavigate();

  // Load subcategories or categories if they are did not loaded
  useEffect(() => {
    if (!subcategories.length) {
      loadSubcategories();
    }
  }, [subcategories.length, loadSubcategories]);

  useEffect(() => {
    if (!categories.length) {
      loadCategories();
    }
  }, [categories.length, loadCategories]);

  // Form subcategories with category name
  const enrichedSubcategories = useMemo(() => {
    if (!subcategories.length || !categories.length) return [];

    return subcategories.map((subcategory: Subcategory) => {
      const category = categories.find(
        (cat) => cat.id == subcategory.categoryId,
      );

      return {
        ...subcategory,
        categoryName: category ? category.name : "Unknown",
      };
    });
  }, [subcategories, categories]);

  if (subcategoriesLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <div className="flex items-center justify-between p-1">
        <h2 className="text-gray-500">All Subcategories</h2>
        <div className="flex gap-2">
          {/* New */}
          <button
            onClick={() => navigate("/subcategories/create")}
            className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
          >
            New
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable
          data={enrichedSubcategories}
          columns={subcategoriesColumns}
          getRowId={(subcategory) => subcategory.id}
          getDetailsLink={(subcategory) => `/subcategories/${subcategory.id}`}
        />
      </div>
    </div>
  );
}
