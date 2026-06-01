import { api } from "../../api/axios";
import type {
  CreateUserDto,
  User,
  UpdateUserDto,
  ChangeUserPasswordDto,
  ResetUserPasswordDto,
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

// Change user password
export const changeUserPassword = async (
  id: string,
  payload: ChangeUserPasswordDto,
): Promise<void> => {
  await api.patch(`/v1/users/${id}/password`, payload);
};

// Reset user password
export const resetUserPassword = async (
  id: string,
  payload: ResetUserPasswordDto,
): Promise<void> => {
  await api.post(`/v1/users/${id}/reset-password`, payload);
};
