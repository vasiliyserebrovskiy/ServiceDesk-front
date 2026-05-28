import OpenProblemsPage from "../pages/tickets/problems/OpenProblemsPage";
import CreateProblemPage from "../pages/tickets/problems/CreateProblemPage";
import ClosedProblemsPage from "../pages/tickets/problems/ClosedProblemsPage";

export const problemRoutes = [
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
];
