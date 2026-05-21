import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUsersThunk,
  createUserThunk,
} from "../../features/users/usersSlice";
import type { CreateUserDto } from "../../shared/types/usersTypes";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  /**
   * Load all users
   */
  const loadUsers = useCallback(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  /**
   * Create new user
   */
  const createUser = useCallback(
    async (data: CreateUserDto) => {
      return await dispatch(createUserThunk(data)).unwrap();
    },
    [dispatch],
  );

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
  };
};
