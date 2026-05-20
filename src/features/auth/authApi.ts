import { api } from "../../api/axios";
import { mapUser } from "../../shared/mappers/userMapper";

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
  return mapUser(data);
};

export const logoutRequest = async () => {
  await api.post("/v1/auth/logout");
};
