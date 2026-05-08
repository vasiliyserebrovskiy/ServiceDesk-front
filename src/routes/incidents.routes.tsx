import OpenIncidentsPage from "../pages/incidents/OpenIncidentsPage";
import CreateIncidentPage from "../pages/incidents/CreateIncidentPage";
import ClosedIncidentsPage from "../pages/incidents/ClosedIncidentsPage";

export const incidentRoutes = [
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
];
