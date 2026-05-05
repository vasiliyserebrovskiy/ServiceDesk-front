import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  // 🔥 1. Ждём bootstrap
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 🔥 2. Только потом решаем редирект
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
