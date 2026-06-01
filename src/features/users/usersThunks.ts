import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  User,
  CreateUserDto,
  UpdateUserDto,
  ChangeUserPasswordDto,
  ResetUserPasswordDto,
} from "../../shared/types/usersTypes";
import {
  fetchUsers,
  createNewUser,
  fetchUser,
  updateUser,
  changeUserPassword,
  resetUserPassword,
} from "./usersApi";

/**
 * Load all users
 */
export const getUsersThunk = createAsyncThunk<User[]>(
  "users/getAll",
  async () => {
    return await fetchUsers();
  },
);

/**
 * Create new user
 */
export const createUserThunk = createAsyncThunk<User, CreateUserDto>(
  "users/create",
  async (newUser) => {
    return await createNewUser(newUser);
  },
);

/**
 * Load user by id
 */
export const getUserByIdThunk = createAsyncThunk<User, string>(
  "users/getById",
  async (id) => {
    return await fetchUser(id);
  },
);

/**
 * Update user by id
 */
export const updateUserThunk = createAsyncThunk<
  User,
  { id: string; data: UpdateUserDto }
>("users/update", async ({ id, data }) => {
  return await updateUser(id, data);
});

/**
 * Change user password by id
 */
export const changeUserPasswordThunk = createAsyncThunk<
  void,
  { id: string; data: ChangeUserPasswordDto }
>("users/changePassword", async ({ id, data }) => {
  await changeUserPassword(id, data);
});

/**
 * Reset user password by id
 */
export const resetUserPasswordThunk = createAsyncThunk<
  void,
  { id: string; data: ResetUserPasswordDto }
>("users/resetPassword", async ({ id, data }) => {
  await resetUserPassword(id, data);
});
