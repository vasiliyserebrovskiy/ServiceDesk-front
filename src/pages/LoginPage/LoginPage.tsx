import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { loginRequest } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { meRequest } from "../../features/auth/authApi";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginRequest(email, password);

      const user = await meRequest();
      dispatch(setAuth(user));
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d2b5c]">
      <div className="bg-white flex flex-col gap-3 p-6 rounded-2xl border border-gray-200 shadow-md w-full max-w-md">
        <h2 className="text-black text-xl font-semibold text-center">
          Service Desk
        </h2>

        <input
          className="border p-2 rounded"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-700 text-white p-2 rounded hover:bg-blue-900 transition"
          onClick={handleLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
