import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

import OpenIncidentsPage from "../pages/incidents/OpenIncidentsPage";
import CreateIncidentPage from "../pages/incidents/CreateIncidentPage";
import ClosedIncidentsPage from "../pages/incidents/ClosedIncidentsPage";

import OpenProblemsPage from "../pages/problems/OpenProblemsPage";
import CreateProblemPage from "../pages/problems/CreateProblemPage";
import ClosedProblemsPage from "../pages/problems/ClosedProblemsPage";

import ProtectedRoute from "../routes/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import CreateNewUser from "../pages/administration/CreateNewUser";
import AdminRoute from "./AdminRoute";

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

      // INCIDENTS

      {
        path: "incidents/open",
        element: <OpenIncidentsPage />,
      },

      {
        path: "incidents/create",
        element: <CreateIncidentPage />,
      },

      {
        path: "incidents/closed",
        element: <ClosedIncidentsPage />,
      },

      // PROBLEMS

      {
        path: "problems/open",
        element: <OpenProblemsPage />,
      },

      {
        path: "problems/create",
        element: <CreateProblemPage />,
      },

      {
        path: "problems/closed",
        element: <ClosedProblemsPage />,
      },

      // ADMINISTRATION
      {
        path: "admin/create-user",
        element: (
          <AdminRoute>
            <CreateNewUser />
          </AdminRoute>
        ),
      },
    ],
  },
]);
