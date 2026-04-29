import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { loginRequest } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginRequest(email, password);

      dispatch(setAuth());
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-gray-200 flex flex-col gap-3 p-6 rounded-2xl border-2 border-green-600 shadow-2xl w-full max-w-md">
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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition"
          onClick={handleLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
