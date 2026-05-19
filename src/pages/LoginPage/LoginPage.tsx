import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { loginRequest, meRequest } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import EmailField from "../../components/form/EmailField";
import PasswordField from "../../components/form/PasswordField";

type ErrorResponse = {
  message: string;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError(null);

      if (!email || !password) {
        setError("Email and password are required");
        return;
      }

      await loginRequest(email, password);

      const user = await meRequest();
      dispatch(setAuth(user));

      navigate("/");
    } catch (e: unknown) {
      if (axios.isAxiosError<ErrorResponse>(e)) {
        const message = e.response?.data?.message || "Login failed";
        const status = e.response?.status;

        /**
         * IMPORTANT:
         * 403 auth state errors must NOT be shown here
         * (they are handled by global toast)
         */
        if (status === 403) {
          const isAuthStateError =
            message.includes("not active") || message.includes("locked");

          if (isAuthStateError) {
            return;
          }
        }

        setError(message);
      } else {
        setError("Unexpected error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d2b5c]">
      <form
        onSubmit={handleLogin}
        className="bg-white flex flex-col gap-4 p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-center">Service Desk</h2>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <EmailField value={email} onChange={setEmail} />

        <PasswordField value={password} onChange={setPassword} />

        <button
          type="submit"
          className="bg-blue-700 text-white p-2 rounded hover:bg-blue-900 transition"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
