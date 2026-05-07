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
    <header className="flex items-center gap-4 p-3 bg-[#0d2b5c]">
      <img src="/logo.svg" alt="Service Desk" className="h-10" />

      <nav className="flex gap-2.5">
        <button>Home</button>
        <button>All</button>
        <button>Profile</button>
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <span className="text-white">
          {user?.firstname ?? "Guest"} {user?.lastname}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded-md border border-white/30 text-white text-sm bg-white/5 hover:bg-white/15 hover:border-white/50 shadow-sm hover:shadow transition active:scale-95 active:shadow-none"
      >
        Logout
      </button>
    </header>
  );
}
