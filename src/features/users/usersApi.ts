import { api } from "../../api/axios";
import type {
  CreateUserDto,
  User,
  UpdateUserDto,
} from "../../shared/types/usersTypes";

// Get all users
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/v1/users");
  return data;
};

// Create new user
export const createNewUser = async (newUser: CreateUserDto): Promise<User> => {
  const { data } = await api.post<User>("/v1/users", newUser);
  return data;
};

// Get user by id
export const fetchUser = async (id: string): Promise<User> => {
  const { data } = await api.get<User>(`/v1/users/${id}`);
  return data;
};

// Update user by id
export const updateUser = async (
  id: string,
  payload: UpdateUserDto,
): Promise<User> => {
  const { data } = await api.patch<User>(`/v1/users/${id}`, payload);
  return data;
};
