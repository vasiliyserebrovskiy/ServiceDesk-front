import AllUsersListFormAdmin from "../pages/administration/users/AllUsersListFormAdmin";
import CreateNewUser from "../pages/administration/users/CreateNewUserForm";
import { RolesList } from "../pages/administration/roles/RoleList";
import AdminRoute from "./AdminRoute";
import UserDetailsAdmin from "../pages/administration/users/UserDetailsAdmin";

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
        <AllUsersListFormAdmin />
      </AdminRoute>
    ),
  },
  {
    path: "admin/users/:id",
    element: (
      <AdminRoute>
        <UserDetailsAdmin />
      </AdminRoute>
    ),
  },
];
