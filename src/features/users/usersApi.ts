// api/usersApi.ts
import { api } from "../../api/axios";
import { mapUser } from "../../shared/mappers/userMapper";
import type {
  CreateUserDto,
  User,
  UserDto,
} from "../../shared/types/usersTypes";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<UserDto[]>("/v1/users");
  return data.map(mapUser);
};

export const createNewUser = async (newUser: CreateUserDto): Promise<User> => {
  const { data } = await api.post<UserDto>("/v1/users/create", newUser);
  return mapUser(data);
};
