import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearAuth } from "../features/auth/authSlice";
import { logoutRequest } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <header>
        <div>Loading...</div>
      </header>
    );
  }

  const handleLogout = async () => {
    try {
      await logoutRequest();
      dispatch(clearAuth());
      navigate("/login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <header className="flex gap-4 p-3 bg-[#0d2b5c]">
      <div>Service Desk</div>

      <nav className="flex gap-2.5">
        <button>Dashboard</button>
        <button>Tickets</button>
        <button>Projects</button>
      </nav>

      <div className="ml-auto">
        {user?.firstname ?? "Guest"} {user?.lastname}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
