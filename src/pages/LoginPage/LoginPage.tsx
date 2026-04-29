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
    <div>
      <h2>Login</h2>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
