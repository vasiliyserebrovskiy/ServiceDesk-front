export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  roleId: string;
  isActive: boolean;
  isBlocked: boolean;
  description: string;
  avatarUrl: string;
}

export interface UserDto {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  is_active: boolean;
  is_blocked: boolean;
  description: string;
  avatar_url: string;
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
