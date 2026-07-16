import CreateIncidentPage from "../pages/tickets/incidents/CreateIncidentPage";
import AllIncidentsPage from "../pages/tickets/incidents/AllIncidentsPage";
import DetailsIncidentPage from "../pages/tickets/incidents/DetailsIncidentPage";

export const incidentRoutes = [
  {
    path: "/incidents/open",
    element: <AllIncidentsPage filter="open" />,
  },
  {
    path: "/incidents/create",
    element: <CreateIncidentPage />,
  },
  {
    path: "/incidents/closed",
    element: <AllIncidentsPage filter="closed" />,
  },
  {
    path: "/incidents/all",
    element: <AllIncidentsPage />,
  },
  {
    path: "/incidents/:id",
    element: <DetailsIncidentPage />,
  },
  {
    path: "/incidents/my/open",
    element: <AllIncidentsPage filter="my-open" />,
  },
  {
    path: "/incidents/my/assigned",
    element: <AllIncidentsPage filter="my-assigned" />,
  },
  {
    path: "/incidents/my/closed",
    element: <AllIncidentsPage filter="my-closed" />,
  },
];
