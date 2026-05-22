// api/usersApi.ts
import { api } from "../../api/axios";
import { mapUser } from "../../shared/mappers/userMapper";
import type {
  CreateUserDto,
  User,
  UserDto,
  UpdateUserDto,
} from "../../shared/types/usersTypes";

// Get all users
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<UserDto[]>("/v1/users");
  return data.map(mapUser);
};

// Create new user
export const createNewUser = async (newUser: CreateUserDto): Promise<User> => {
  const { data } = await api.post<UserDto>("/v1/users/create", newUser);
  return mapUser(data);
};

// Get user by id
export const fetchUser = async (id: string): Promise<User> => {
  const { data } = await api.get<UserDto>(`/v1/users/${id}`);
  return mapUser(data);
};

// update user by id
export const updateUser = async (id: string, data: UpdateUserDto) => {
  const { data: response } = await api.patch(`/v1/users/${id}`, data);
  return mapUser(response);
};
