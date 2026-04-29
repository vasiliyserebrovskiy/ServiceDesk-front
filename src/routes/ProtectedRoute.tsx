import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
