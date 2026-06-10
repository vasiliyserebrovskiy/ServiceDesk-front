import AllCategoriesListForm from "../pages/management/categories/AllCategoriesListForm";
import CategoryDetails from "../pages/management/categories/CategoryDetails";
import CreateCategoryForm from "../pages/management/categories/CreateCategoryForm";
import AllGroupsListForm from "../pages/management/groups/AllGroupsListForm";
import CreateGroupForm from "../pages/management/groups/CreateGroupForm";
import GroupDetails from "../pages/management/groups/GroupDetails";
import AllSubcategoriesListForm from "../pages/management/subcategories/AllSubcategoriesListForm";
import CreateSubcategoryForm from "../pages/management/subcategories/CreateSubcategoryForm";
import SubcategoryDetails from "../pages/management/subcategories/SubcategoryDetails";
import ManagementRoute from "./ManagementRoute";

export const managementRoutes = [
  {
    path: "/groups/create",
    element: (
      <ManagementRoute>
        <CreateGroupForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/groups/all",
    element: (
      <ManagementRoute>
        <AllGroupsListForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/groups/:id",
    element: (
      <ManagementRoute>
        <GroupDetails />
      </ManagementRoute>
    ),
  },
  {
    path: "/categories/create",
    element: (
      <ManagementRoute>
        <CreateCategoryForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/categories/all",
    element: (
      <ManagementRoute>
        <AllCategoriesListForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/categories/:id",
    element: (
      <ManagementRoute>
        <CategoryDetails />
      </ManagementRoute>
    ),
  },
  {
    path: "/subcategories/create",
    element: (
      <ManagementRoute>
        <CreateSubcategoryForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/subcategories/all",
    element: (
      <ManagementRoute>
        <AllSubcategoriesListForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/subcategories/:id",
    element: (
      <ManagementRoute>
        <SubcategoryDetails />
      </ManagementRoute>
    ),
  },
];
