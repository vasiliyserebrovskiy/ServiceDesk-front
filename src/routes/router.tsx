import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import { incidentRoutes } from "./incidents.routes";
import { problemRoutes } from "./problems.routes";
import { adminRoutes } from "./admin.routes";

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

      ...incidentRoutes,
      ...problemRoutes,
      ...adminRoutes,
    ],
  },
]);
