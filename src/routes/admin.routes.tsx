import AllUsersListForm from "../pages/administration/AllUsersListForm";
import CreateNewUser from "../pages/administration/CreateNewUserForm";
import { RolesList } from "../pages/roles/RoleList";
import AdminRoute from "./AdminRoute";

export const adminRoutes = [
  {
    path: "admin/create-user",
    element: (
      <AdminRoute>
        <CreateNewUser />
      </AdminRoute>
    ),
  },
  {
    path: "admin/roles",
    element: (
      <AdminRoute>
        <RolesList />
      </AdminRoute>
    ),
  },
  {
    path: "admin/users",
    element: (
      <AdminRoute>
        <AllUsersListForm />
      </AdminRoute>
    ),
  },
];
