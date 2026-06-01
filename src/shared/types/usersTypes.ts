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

export type UsersList = {
  name: string;
  email: string;
  roleName: string;
  isActive: boolean;
  isBlocked: boolean;
};

export type UpdateUserDto = {
  firstname: string;
  lastname: string;
  email: string;
  roleId: string;
  isActive: boolean;
  isBlocked: boolean;
  description: string;
  avatarUrl: string;
};

export type ChangeUserPasswordDto = {
  oldPassword: string;
  newPassword: string;
};

export type ResetUserPasswordDto = {
  newPassword: string;
};
