import OpenProblemsPage from "../pages/problems/OpenProblemsPage";
import CreateProblemPage from "../pages/problems/CreateProblemPage";
import ClosedProblemsPage from "../pages/problems/ClosedProblemsPage";

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
