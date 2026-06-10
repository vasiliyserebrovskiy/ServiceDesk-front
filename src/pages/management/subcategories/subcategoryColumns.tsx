import type { SubcategoryList } from "../../../shared/types/sybcategoryTypes";

export const subcategoriesColumns = [
  {
    title: "Name",
    render: (subcategory: SubcategoryList) => subcategory.name,
  },
  {
    title: "Description",
    render: (subcategory: SubcategoryList) => subcategory.description,
  },
  {
    title: "Category Name",
    render: (subcategory: SubcategoryList) => subcategory.categoryName,
  },
];
