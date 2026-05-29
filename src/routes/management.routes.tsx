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
];
