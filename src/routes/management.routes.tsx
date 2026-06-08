import AllCategoriesListForm from "../pages/management/categories/AllCategoriesListForm";
import CategoryDetails from "../pages/management/categories/CategoryDetails";
import CreateCategoryForm from "../pages/management/categories/CreateCategoryForm";
import AllGroupsListForm from "../pages/management/groups/AllGroupsListForm";
import CreateGroupForm from "../pages/management/groups/CreateGroupForm";
import GroupDetails from "../pages/management/groups/GroupDetails";
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
];
