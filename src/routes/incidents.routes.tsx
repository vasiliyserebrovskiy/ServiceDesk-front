import OpenIncidentsPage from "../pages/tickets/incidents/OpenIncidentsPage";
import CreateIncidentPage from "../pages/tickets/incidents/CreateIncidentPage";
import ClosedIncidentsPage from "../pages/tickets/incidents/ClosedIncidentsPage";
import AllIncidentsPage from "../pages/tickets/incidents/AllIncidentsPage";
import DetailsIncidentPage from "../pages/tickets/incidents/DetailsIncidentPage";

export const incidentRoutes = [
  {
    path: "/incidents/open",
    element: <OpenIncidentsPage />,
  },
  {
    path: "/incidents/create",
    element: <CreateIncidentPage />,
  },
  {
    path: "/incidents/closed",
    element: <ClosedIncidentsPage />,
  },
  {
    path: "/incidents/all",
    element: <AllIncidentsPage />,
  },
  {
    path: "/incidents/:id",
    element: <DetailsIncidentPage />,
  },
];
