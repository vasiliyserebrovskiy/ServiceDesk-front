import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useAuthBootstrap } from "./features/auth/useAuthBootstrap";
import ErrorToast from "./shared/ui/ErrorToast";

export default function App() {
  useAuthBootstrap();
  return (
    <>
      <ErrorToast />
      <RouterProvider router={router} />
    </>
  );
}
