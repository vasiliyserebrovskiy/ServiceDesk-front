import { api } from "../../api/axios";

export const loginRequest = async (email: string, password: string) => {
  await api.post("/v1/auth/login", {
    email,
    password,
  });
};
