import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = true; // will be replaced with Redux

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
