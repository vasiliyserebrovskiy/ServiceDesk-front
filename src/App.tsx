import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { useAuthBootstrap } from "./features/auth/useAuthBootstrap";

export default function App() {
  useAuthBootstrap();
  return <RouterProvider router={router} />;
}
