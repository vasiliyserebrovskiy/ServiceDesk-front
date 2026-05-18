// api/usersApi.ts
import { api } from "../../api/axios";
import type { CreateUserDto, User } from "../../shared/types/usersTypes";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get("/api/v1/users");
  return res.data;
};

export const createNewUser = async (newUser: CreateUserDto): Promise<User> => {
  const res = await api.post("/api/v1/users/create", newUser);
  return res.data;
};
