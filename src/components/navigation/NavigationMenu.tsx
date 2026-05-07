import { NavLink } from "react-router-dom";

import AllMenu from "./AllMenu";
import AdminMenu from "./AdminMenu";

import { useAppSelector } from "../../app/hooks";

export default function NavigationMenu() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="flex gap-4 items-center">
      <NavLink to="/" className="text-white select-none hover:text-blue-600">
        Home
      </NavLink>

      <AllMenu />

      {user?.role === "ADMIN" && <AdminMenu />}

      <NavLink
        to="/profile"
        className="text-white selectnone hover:text-blue-600"
      >
        Profile
      </NavLink>
    </nav>
  );
}
