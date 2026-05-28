import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useRoles } from "../shared/hooks/useRoles";

export default function ManagementRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { roles, isLoading: rolesLoading } = useRoles();

  if (isLoading || rolesLoading) {
    return <div>Loading...</div>;
  }

  const role = roles?.find((r) => r.id === user?.roleId);

  if (role?.name !== "ADMIN" && role?.name !== "MANAGER") {
    return <Navigate to="/" replace />;
  }

  return children;
}
