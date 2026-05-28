import AllGroupsListForm from "../pages/management/groups/AllGroupsListForm";
import CreateGroupPage from "../pages/management/groups/CreateGroupPage";
import GroupDetails from "../pages/management/groups/GroupDetails";
import ManagementRoute from "./ManagementRoute";

export const managementRoutes = [
  {
    path: "/groups/create",
    element: (
      <ManagementRoute>
        <CreateGroupPage />
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
