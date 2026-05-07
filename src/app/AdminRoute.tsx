import { Navigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  // if we are loading auth

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if user is not ADMIN

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
