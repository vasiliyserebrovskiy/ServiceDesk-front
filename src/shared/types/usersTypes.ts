import type { Role } from "./roleTypes";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  active: boolean;
  block: boolean;
  description: string;
  avatarUrl: string;
}

export type CreateUserDto = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  description: string;
  avatarUrl: string;
};

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export type UserFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  description: string;
  avatarUrl: string;
};
