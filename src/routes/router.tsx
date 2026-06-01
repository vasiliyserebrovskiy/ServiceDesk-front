import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/Profile/ProfilePage";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import { incidentRoutes } from "./incidents.routes";
import { problemRoutes } from "./problems.routes";
import { adminRoutes } from "./admin.routes";
import { managementRoutes } from "./management.routes";
import ProfileEditPage from "../pages/Profile/ProfileEditPage";
import ProfileChangePasswordPage from "../pages/Profile/ProfileChangePasswordPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "profile",
        element: <ProfilePage />,
      },

      {
        path: "profile/edit",
        element: <ProfileEditPage />,
      },

      {
        path: "profile/change-password",
        element: <ProfileChangePasswordPage />,
      },

      ...incidentRoutes,
      ...problemRoutes,
      ...adminRoutes,
      ...managementRoutes,
    ],
  },
]);
