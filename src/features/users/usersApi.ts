// api/usersApi.ts
import { api } from "../../api/axios";
import { mapUser } from "../../shared/mappers/userMapper";
import type { CreateUserDto, User } from "../../shared/types/usersTypes";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get("/v1/users");
  return res.data.map(mapUser);
};

export const createNewUser = async (newUser: CreateUserDto): Promise<User> => {
  const res = await api.post("/v1/users/create", newUser);
  return res.data;
};
