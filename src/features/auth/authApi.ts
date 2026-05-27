import { api } from "../../api/axios";

export const loginRequest = async (email: string, password: string) => {
  await api.post(
    "/v1/auth/login",
    {
      email,
      password,
    },
    {
      meta: {
        skipToast: true,
      },
    },
  );
};

export const meRequest = async () => {
  const { data } = await api.get("/v1/users/me");
  return data;
};

export const logoutRequest = async () => {
  await api.post("/v1/auth/logout");
};
