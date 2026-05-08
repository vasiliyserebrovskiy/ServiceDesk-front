import CreateNewUser from "../pages/administration/CreateNewUser";
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
];
