import AllCategoriesListForm from "../pages/management/categories/AllCategoriesListForm";
import CategoryDetails from "../pages/management/categories/CategoryDetails";
import CreateCategoryForm from "../pages/management/categories/CreateCategoryForm";
import AllCIsListForm from "../pages/management/CIs/AllCIsListForm";
import CIDetails from "../pages/management/CIs/CIDetails";
import CreateCIForm from "../pages/management/CIs/CreateCIForm";
import AllGroupsListForm from "../pages/management/groups/AllGroupsListForm";
import CreateGroupForm from "../pages/management/groups/CreateGroupForm";
import GroupDetails from "../pages/management/groups/GroupDetails";
import AllStatusesListForm from "../pages/management/statuses/AllStatusesListForm";
import CreateStatusForm from "../pages/management/statuses/CreateStatusForm";
import StatusDetails from "../pages/management/statuses/StatusDetails";
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
  {
    path: "/statuses/create",
    element: (
      <ManagementRoute>
        <CreateStatusForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/statuses/all",
    element: (
      <ManagementRoute>
        <AllStatusesListForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/statuses/:id",
    element: (
      <ManagementRoute>
        <StatusDetails />
      </ManagementRoute>
    ),
  },
  {
    path: "/cis/create",
    element: (
      <ManagementRoute>
        <CreateCIForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/cis/all",
    element: (
      <ManagementRoute>
        <AllCIsListForm />
      </ManagementRoute>
    ),
  },
  {
    path: "/cis/:id",
    element: (
      <ManagementRoute>
        <CIDetails />
      </ManagementRoute>
    ),
  },
];
