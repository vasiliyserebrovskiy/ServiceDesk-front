import { NavLink } from "react-router-dom";

import AllMenu from "./AllMenu";
import AdminMenu from "./AdminMenu";

import { useAppSelector } from "../../app/hooks";
import { useRoles } from "../../shared/hooks/useRoles";

export default function NavigationMenu() {
  const { user } = useAppSelector((state) => state.auth);
  const { roles } = useRoles();

  const roleName = roles?.find((r) => r.id === user?.roleId)?.name;

  return (
    <nav className="flex gap-4 items-center">
      <NavLink to="/" className="text-white select-none hover:text-blue-600">
        Home
      </NavLink>

      <AllMenu />

      {roleName === "ADMIN" && <AdminMenu />}

      <NavLink
        to="/profile"
        className="text-white select-none hover:text-blue-600"
      >
        Profile
      </NavLink>
    </nav>
  );
}
